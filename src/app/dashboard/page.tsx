import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const user = await currentUser();
  const email = user?.emailAddresses[0].emailAddress;

  // If user is not logged in
  if (!user || !user.id) redirect("/auth-callback?origin=dashboard");

  return <div>{email}</div>;
};

export default Dashboard;
