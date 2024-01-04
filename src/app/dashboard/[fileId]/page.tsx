import ChatWrapper from "@/components/ChatWrapper";
import PdfRenderer from "@/components/PdfRenderer";
import { db } from "@/db";
import { currentUser } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";

interface PageProps {
  params: {
    // fileId: string also works
    [key: string]: string;
  };
}
// Retrieve file id
const page = async ({ params: { fileId } }: PageProps) => {
  // Ensure user is logged in and registered
  const user = await currentUser();

  // redirects them back to this page after signing in
  if (!user || !user.id) redirect(`/auth-callback?origin=dashboard/${fileId}`);

  // Make database call where user can only view their own files
  const file = await db.file.findFirst({
    where: {
      id: fileId,
      userId: user.id,
    },
  });

  if (!file) notFound();

  return (
    <div className="flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="mx-auto w-full max-w-8xl grow lg:flex xl:px-2">
        {/* left side */}
        <div className="flex-1 xl:flex">
          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            <PdfRenderer url={file.url} />
          </div>
        </div>

        {/* right side */}
        <div className="shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0">
          {/* Wraps both the chat box and the input */}
          <ChatWrapper />
        </div>
      </div>
    </div>
  );
};

export default page;
