"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import React, { useState } from "react";
import Link from "next/link";

function SignUp(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { status } = useSession();

  if (status === "loading") {
    return (
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>Loading...</h2>
    );
  }

  if (status === "authenticated") {
    return (
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>
        Already Logged In , visit the{" "}
        <Link style={{ color: "gray" }} href="/">
          Home Page
        </Link>{" "}
      </h2>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    });

    const responseData = await response.json();

    console.log(responseData);
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "50px",
        marginTop: "150px",
      }}
    >
      <h2>Create new Account </h2>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button>Signup</button>
    </form>
  );
}

export default SignUp;
