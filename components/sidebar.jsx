"use client";
import { useState, useEffect } from "react";
import PDFButton from "./pdf-button";
import { getUserByEmail } from "@/db/queries/user";
import { useSession } from "next-auth/react";
import Link from "next/link";
import History from "./logos/History";
const Sidebar = () => {
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
    <div className="hidden lg:flex pt-20 absolute w-48 h-full px-4 flex flex-col gap-1.5 border-r-[1.5px] border-black border-opacity-20">
      <div className="font-semibold text-xs flex items-center gap-1 px-1 opacity-60">
        <History />
        HISTORY
      </div>

      {user?.sessions &&
        user?.sessions?.map((session) => (
          <Link
            className="overflow-hidden overflow-ellipsis whitespace-nowrap w-full h-10 flex items-center justify-center bg-transparent hover:bg-black/5 transition-all rounded-sm"
            href={`/chat/${session.page_id}`}
            key={session.$id}
          >
            <div
              key={session.$id}
              className="overflow-hidden overflow-ellipsis whitespace-nowrap px-1.5"
            >
              {session.title}
            </div>
          </Link>
        ))}
    </div>
  );
};

export default Sidebar;
