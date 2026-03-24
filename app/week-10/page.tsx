"use client";

import { useEffect } from "react";
import { useUserAuth } from "./_utils/auth-context";
import { useRouter } from "next/navigation";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
  const router = useRouter();

  async function signIn() {
    await gitHubSignIn();
  }

  async function signOut() {
    await firebaseSignOut();
  }


  useEffect(() => {
    if (user) {
      router.push("./week-10");
    }
  }, [user, router]);

  if (!user) {
    return (


      <div className=" flex w-screen h-screen bg-amber-50 items-center justify-center gap-20">
        <p className="text-black font-bold text-3xl animate-spin">🛍️Shopping List</p>
        <p className="text-black font-bold text-3xl">Please login</p>
        <button onClick={signIn} className=" bg-amber-700  p-5 text-white rounded-2xl cursor-pointer hover:opacity-40 animate-bounce ">Sign in with GitHub</button>
      </div>

    );
  }

  return (
    <div className=" flex flex-col w-screen h-screen bg-amber-50 items-center justify-center gap-20">
      <p className="text-black font-bold text-3xl">Welcome, {user.displayName}</p>
      <div className="flex flex-row gap-20" >
        <button onClick={signOut} className=" bg-amber-700  p-5 text-white rounded-2xl cursor-pointer hover:opacity-40 animate-bounce ">Sign out</button>
        <button onClick={() => router.push("./week-10/shopping-list")} className=" bg-amber-700  p-5 text-white rounded-2xl cursor-pointer hover:opacity-40 animate-bounce ">Shopping List</button>
      </div>
    </div>
  );
}