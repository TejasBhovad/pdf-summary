"use client";
import { getSessionByPageId } from "@/db/queries/session";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Send from "@/components/logos/Send";
const Page = ({ params }) => {
  const [session, setSession] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [userData, setUserData] = useState([
    {
      question: "What is the capital of Nigeria?",
      answer: "Abuja",
    },
    {
      question: "What is the capital of Ghana?",
      answer: "Accra",
    },
    {
      question: "What is the capital of Kenya?",
      answer: "Nairobi",
    },
  ]);

  useEffect(() => {
    getSessionByPageId(params.page_id).then((session) => {
      setSession(session);
      setIsMounted(true);
    });
  }, [params.page_id]);

  const { data: sessionAuth, status } = useSession();
  const [email, setEmail] = useState(null);

  useEffect(() => {
    if (sessionAuth) {
      setEmail(sessionAuth.user.email);
    }
  }, [sessionAuth]);
  if (status === "loading") {
    return <div className="px-8 py-6">Loading...</div>;
  }

  return (
    <div className="px-4 py-2 w-full h-full">
      {isMounted && session && session.users && (
        <div className="w-full h-full">
          <div key={session.users.$id} className="w-full h-full">
            {session.users.email === email ? (
              <div className="p-4 w-full h-full flex flex-col">
                <div className="w-full h-full flex flex-col gap-4 px-2">
                  {userData.map((data, index) => (
                    <div
                      key={index}
                      className="w-full h-auto bg-black/5 rounded-md flex px-4 py-2 flex flex-col"
                    >
                      <div className="w-full h-1/2 py-1">
                        <span className="">{data.question}</span>
                      </div>
                      <div className="w-full h-1/2 py-1">
                        <span className="">{data.answer}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="w-full h-14 bg-black/5 rounded-md flex px-4 py-2">
                  <div className="w-full h-full">
                    <Input
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      className="w-full h-full bg-transparent border-none focus:ring-0 outline-none"
                      placeholder="Type your question"
                    />
                  </div>
                  <Button className="h-full aspect-square bg-black/0 hover:bg-black/10 transition-all flex items-center justify-center rounded-lg p-0">
                    <Send className="w-8 h-8" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4 p-4">
                <span className="text-4xl font-bold">Access Denied</span>
                <p>The chat you are trying to access does not belong to you</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
