"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const user = useUser(); // <-- Use the hook to get the user's authentication status
  const router = useRouter();

  useEffect(() => {
    if (user.isSignedIn) {
      router.push("/dashboard");
    }
  }, [router, user]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-100 to-red-100">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-center text-5xl font-semibold">
          AI-powered{" "}
          <span className="font-bold text-slate-600">
            Player Name Generator.
          </span>
        </h1>
        <div className="flex justify-center space-x-6 p-6">
          <Button className="rounded-2xl bg-slate-900 text-white hover:bg-slate-700">
            <SignInButton />
          </Button>
          <Button className="rounded-2xl bg-slate-900 text-white hover:bg-slate-700">
            <SignUpButton />
          </Button>
          {/* <Button className="rounded-2xl bg-slate-900 text-white hover:bg-slate-700">
            <Link href="/dashboard">Dashboard</Link>
          </Button> */}
        </div>
      </div>
    </div>
  );
}
