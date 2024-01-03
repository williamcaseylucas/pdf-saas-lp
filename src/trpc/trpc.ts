import { currentUser } from "@clerk/nextjs";
import { TRPCError, initTRPC } from "@trpc/server";

const t = initTRPC.create();

// to create private procedures
const middleware = t.middleware;
const isAuth = middleware(async (opts) => {
  const user = await currentUser();

  if (!user || !user.id) throw new TRPCError({ code: "UNAUTHORIZED" });

  return opts.next({
    ctx: {
      userId: user.id,
      user,
    },
  }); // could chain another middleware
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);