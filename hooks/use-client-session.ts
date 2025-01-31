import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const UseClientSession = (initialSession: Session | null) => {
  const { data: session, status } = useSession();
  const [currentSession, setCurrentSession] = useState(initialSession);
  useEffect(() => {
    if (session) {
      setCurrentSession(session);
    }
  }, [session]);

  useEffect(() => {
    if (initialSession) {
      setCurrentSession(initialSession);
    }
  }, [currentSession]);

  return { data: currentSession, status };
};

export default UseClientSession;
