import Dashboard from "@/components/Dashboard";
import { db } from "@/db";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await currentUser();
  const email = user?.emailAddresses[0].emailAddress;

  // If user is not logged in send them here and then have them come back
  if (!user || !user.id) redirect("/auth-callback?origin=dashboard");

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) redirect("/auth-callback?origin=dashboard");

  return <Dashboard />;
};

export default Page;
