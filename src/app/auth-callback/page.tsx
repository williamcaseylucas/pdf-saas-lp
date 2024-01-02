import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "../(trpc)/client";

const AuthCallback = () => {
  // important to send user back
  const router = useRouter();
  const searchParams = useSearchParams();

  const origin = searchParams.get("origin");

  return <div>AuthCallback</div>;
};

export default AuthCallback;
