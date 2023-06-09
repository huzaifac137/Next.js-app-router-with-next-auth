import "./globals.css";
import { Metadata } from "next";
import { Fragment } from "react";
import NavBar from "../../components/navBar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
