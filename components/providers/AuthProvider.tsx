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
    const res = await axios.post("/api/users", {
      name: user?.fullName,
      email: user?.primaryEmailAddress?.emailAddress,
    });
    console.log(res.data);
  };
  return <div>{children}</div>;
}

export default AuthProvider;
