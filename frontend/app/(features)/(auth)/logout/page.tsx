"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

export default function LogoutPage() {
  const router = useRouter();
  const { logoutUser } = useAuth();

  useEffect(() => {
    async function performLogout() {
      await logoutUser();
      router.push("/login");
    }
    performLogout();
  }, [logoutUser, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper">
      <div className="flex flex-col items-center gap-3 text-center">
        <Loader2 className="size-8 animate-spin text-indigo-600" />
        <p className="text-sm font-semibold text-ink-soft">Logging out...</p>
      </div>
    </div>
  );
}
