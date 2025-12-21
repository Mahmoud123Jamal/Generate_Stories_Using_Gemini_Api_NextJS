"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect } from "react";
type providerProps = {
  children: React.ReactNode;
};
function AuthProvider({ children }: providerProps) {
  const { user } = useUser();
  useEffect(() => {
    if (user) {
      createUser();
    }
  }, [user]);
  const createUser = async () => {
    const email = user?.primaryEmailAddress?.emailAddress;
    const name = user?.fullName || user?.firstName || "User";

    if (!email) return;
    try {
      const res = await axios.post("/api/users", {
        name: user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return <div>{children}</div>;
}

export default AuthProvider;
