"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginCallback() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");
    const email = params.get("email");
    const name = params.get("name");
    const profile = params.get("profile") || params.get("picture") || null;
    const authToken = params.get("authToken");

    if (error) {
      console.error("Google login error:", error);
      try {
        // Let the login page know Google auth failed
        localStorage.setItem("googleAuthError", "true");
      } catch {
        // ignore storage errors
      }
      router.replace("/login?error=" + encodeURIComponent(error));
      return;
    }

    if (!email) {
      // Cannot create a user object without an email; treat as error
      router.replace("/login?error=" + encodeURIComponent("Missing email from Google login"));
      return;
    }

    try {
      const userData = {
        email,
        name: name || email.split("@")[0] || "User",
        profile,
        isLoggedIn: true,
        loginMethod: "google",
        authToken: authToken || null,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      if (authToken) {
        localStorage.setItem("authToken", authToken);
      }
    } catch (e) {
      console.error("Unable to store Google user in localStorage", e);
      router.replace("/login?error=" + encodeURIComponent("Unable to store user locally"));
      return;
    }

    // Redirect to home so Navbar can immediately show the profile
    router.replace("/");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-700 text-sm">Signing you in with Google...</p>
    </div>
  );
}
