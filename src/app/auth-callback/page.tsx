"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "../(trpc)/client";
import { Loader2 } from "lucide-react";

const AuthCallback = () => {
  // important to send user back
  const router = useRouter(); // client
  const searchParams = useSearchParams();

  const origin = searchParams.get("origin");

  // client side hooks
  const { isSuccess, isError, error } = trpc.authCallback.useQuery(undefined, {
    // Keep retrying every 500 ms to see if user is logged in
    retry: true,
    retryDelay: 500,
  });

  if (isSuccess) {
    // user is synced to db
    router.push(origin ? `/${origin}` : "/dashboard");
  }

  if (isError) {
    // We throw an error if the user isn't logged in
    if (error.message === "UNAUTHORIZED") {
      router.push("/sign-in");
    }
    // if (err.data?.code === "UNAUTHORIZED") {
    //   router.push("/sign-in");
    // }
  }

  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
        <h3 className="font-semibold text-xl">Setting up your account...</h3>
        <p>You will be redirected automatically</p>
      </div>
    </div>
  );
};

export default AuthCallback;
