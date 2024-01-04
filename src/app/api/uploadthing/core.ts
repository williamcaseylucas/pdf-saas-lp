import { db } from "@/db";
import { currentUser } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// Can change from 'pdf' to 'img' to 'video', etc
export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const user = await currentUser();

      if (!user || !user.id) {
        throw new Error("Unauthorized");
      }
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // For it to show up in db
      // Should be file.url but it sometimes doesn't work
      // `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`
      // url: file.url,
      const createdFile = await db.file.create({
        data: {
          key: file.key,
          name: file.name,
          userId: metadata.userId,
          url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
          uploadStatus: "PROCESSING",
        },
      });

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
