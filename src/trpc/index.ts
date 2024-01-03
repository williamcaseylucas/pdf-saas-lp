import { auth, currentUser } from "@clerk/nextjs";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";
import { z } from "zod";

export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    // const {} = auth()
    const user = await currentUser();
    const email = user?.emailAddresses[0].emailAddress;

    // If they don't exist, we throw an error to avoid edge cases down the road
    if (!user?.id || !email) throw new TRPCError({ code: "UNAUTHORIZED" });

    // Check if the user is in the database
    const dbUser = await db.user.findFirst({
      where: {
        id: user.id,
      },
    });

    // Need to create user
    if (!dbUser) {
      // create user in db
      await db.user.create({
        data: {
          id: user.id,
          email: email,
        },
      });
    }

    return { success: true }; // tells frontend there is a user in the db
  }),
  getUserFiles: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;
    // could have just passed user and grabbed user.id, but typescript wouldn't have known that the user would have an id

    return await db.file.findMany({
      where: {
        userId,
      },
    });
  }),
  deleteFile: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // We have ctx because we passed in middleware
      const { userId } = ctx;

      // Only grabs files the user currently owns and that exists
      const file = await db.file.findFirst({
        where: {
          id: input.id,
          userId,
        },
      });

      if (!file) throw new TRPCError({ code: "NOT_FOUND" });

      await db.file.delete({
        where: {
          id: input.id,
          userId,
        },
      });

      return file;
    }),
});

export type AppRouter = typeof appRouter;
