"use client";
import useToast from "@/app/hooks/useToast";
import { Session } from "next-auth";

export const handleAuthentication = (session: Session) => {
  if (session?.user?.token === undefined) {
    return false;
  }
  return true;
};
