"use client";
import { useState, useEffect } from "react";
import { getUserByEmail } from "@/db/queries/user";
import { useSession } from "next-auth/react";
import { data } from "autoprefixer";

const Page = () => {
  const { data: session } = useSession();
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    if (session) {
      setEmail(session.user.email);
    }
  }, [session]);

  useEffect(() => {
    if (email) {
      getUserByEmail(email).then((user) => {
        setUser(user);
        setIsMounted(true);
      });
    }
  }, [email]);

  return (
    <div>
      Page
      {isMounted && user && <div>{JSON.stringify(user)}</div>}
    </div>
  );
};

export default Page;
