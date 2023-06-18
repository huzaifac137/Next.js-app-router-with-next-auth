import { headers } from "next/dist/client/components/headers";
import { NextResponse } from "next/server";
import connectToDB from "../../../../../utlis/connectMongo";
import productModal from "../../../../../utlis/model/product";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";

export async function DELETE(request) {
  if (request.method !== "DELETE") {
    return NextResponse.json({ message: "invalid request" }, { status: 409 });
  }

  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ message: "Not authorized!" }, { status: 401 });
  }

  try {
    connectToDB();

    const token = await getToken({ req: request });

    let decoded, creator;
    if (token.idToken) {
      decoded = jwt.decode(token.idToken);
      creator = decoded.sub;
    }

    if (!token.idToken) {
      decoded = jwt.verify(token.jwt, process.env.NEXTAUTH_SECRET);
      creator = decoded.sub;
    }

    const head = headers();
    const id = head.get("x-id");

    const product = await productModal.deleteOne({ _id: id, creator: creator });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      message: "SUCCESSFULLY DELETED DATA",
    },
    { status: 201 },
  );
}
