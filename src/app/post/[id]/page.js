"use client";

import { useParams, usePathname } from "next/navigation";

import React, { Fragment, useEffect, useState } from "react";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";

function page({}) {
  const params = useParams();
  const [query, setQuery] = useState({
    title: "",
    price: 0,
    creatorName: "",
    creator: "",
  });
  const [id, setId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  const { data: session } = useSession();

  useEffect(() => {
    const urlparams = new URLSearchParams(window.location.search);

    let qry = {};
    for (const [key, value] of urlparams.entries()) {
      qry[key] = value;
    }

    setQuery(qry);
  }, [params.id]);

  async function handleDelete() {
    let responseData;
    try {
      setResponseMsg("");
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/products/delete`,
        {
          method: "DELETE",

          headers: {
            "Content-Type": "application/json",
            "X-ID": params.id,
          },
        },
      );

      responseData = await response.json();
      if (response.status !== 201) {
        throw new Error(responseData.message);
      }

      setIsLoading(false);
    } catch (error) {
      setResponseMsg(error.message);
      setIsLoading(false);
      return;
    }

    setResponseMsg(responseData.message);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "50px",
        marginTop: "50px",
      }}
    >
      {isLoading && <h2>Deleting data...</h2>}

      {responseMsg !== "" ? (
        <h2>{responseMsg}</h2>
      ) : (
        <div className={styles.card}>
          {" "}
          <h2> "name" : "{query.title}"</h2>
          <h3 style={{ color: "green" }}> "price" : "{query.price}"</h3>
          <h4> "creator" : "{query.creatorName}"</h4>
          {query.creator === session?.sub ? (
            <button onClick={handleDelete}>Delete</button>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default page;
