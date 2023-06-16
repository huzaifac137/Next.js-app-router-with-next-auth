import "./globals.css";
import { Metadata } from "next";
import { Fragment } from "react";
import NavBar from "../../components/navBar";
import Provider from "../../components/SessionProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <NavBar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
