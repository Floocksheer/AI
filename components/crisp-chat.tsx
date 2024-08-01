"use client";
import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("fa4cfe6d-40f6-4ed9-a4ab-7d0dfe2bc729")
  }, []);
  return null; 
};