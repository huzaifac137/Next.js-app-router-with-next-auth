"use client";
import { signIn } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

import React from "react";

function SignIn() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        onClick={() =>
          signIn("google", {
            callbackUrl: "http://localhost:3000",
          })
        }
        style={{
          border: "1px solid white",
          width: "200px",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        Login with Google
      </div>
    </div>
  );
}

export default SignIn;
