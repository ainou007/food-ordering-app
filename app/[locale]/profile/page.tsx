import { login as loginRoute } from "@/constants/routes";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const ProfilePage = async () => {
  return (
    <main className="flex h-[calc(100vh-72px-105px)] select-none flex-col items-center justify-center text-center text-3xl text-gray-300">
      <div className="container text-center text-5xl font-bold text-primary">
        Profile
      </div>
    </main>
  );
};

export default ProfilePage;
