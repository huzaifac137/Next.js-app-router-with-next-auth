"use client";

import { useParams, usePathname } from "next/navigation";

import React, { Fragment, useEffect, useState } from "react";

function page({}) {
  const params = useParams();
  const [query, setQuery] = useState({ title: "", price: 0 });
  const [id, setId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  useEffect(() => {
    const urlparams = new URLSearchParams(window.location.search);

    let qry = {};
    for (const [key, value] of urlparams.entries()) {
      qry[key] = value;
    }

    setQuery(qry);
    setId(params.id);
  }, []);

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
            "X-ID": id,
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
        <Fragment>
          {" "}
          <h2>{query.title}</h2>
          <h3 style={{ color: "green" }}>{query.price}</h3>
          <h4>{params.id}</h4>
          <button onClick={handleDelete}>Delete</button>
        </Fragment>
      )}
    </div>
  );
}

export default page;
