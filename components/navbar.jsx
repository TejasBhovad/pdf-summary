"use client";
import Link from "next/link";
import React from "react";
import SignInButton from "./auth/sign-in";
import PDFButton from "./pdf-button";
import SignOutButton from "./auth/sign-out";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { getUserByEmail } from "@/db/queries/user";

const Navbar = () => {
  const { data: session } = useSession();
  const [userID, setUserID] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  const [email, setEmail] = useState(null);

  useEffect(() => {
    if (session) {
      setEmail(session?.user.email);
    }
  }, [session]);
  useEffect(() => {
    if (email) {
      getUserByEmail(email).then((user) => {
        setUserID(user?.$id);
        setIsMounted(true);
      });
    }
  }, [email]);

  return (
    <div className="z-10 bg-white absolute flex gap-5 h-16 items-center w-full justify-between py-1 px-2 shadow-sm border-black border-opacity-10 border-b-[1px]">
      <Link
        href="/"
        className="bg-black bg-opacity-0 hover:bg-opacity-5 transition-all px-6 py-2 rounded-sm font-semibold"
      >
        Your logo
      </Link>
      <div className="w-1/2 flex justify-end h-full items-center">
        {session ? (
          <div className="flex gap-4 h-full items-center">
            <PDFButton userID={userID} />
            <SignOutButton />
          </div>
        ) : (
          <SignInButton />
        )}
      </div>
    </div>
  );
};

export default Navbar;
