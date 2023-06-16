"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function NavBar() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-evenly",
        margin: "0 auto",
        width: "100%",
        marginTop: "50px",
      }}
    >
      <Link href="/" style={{ color: pathname === "/" ? "white" : "grey" }}>
        All Products
      </Link>
      <Link
        href="/post/create"
        style={{ color: pathname === "/post/create" ? "white" : "grey" }}
      >
        Add a product
      </Link>
    </nav>
  );
}

export default NavBar;
