import { NextResponse } from "next/server";
import productModal from "../../../../../utlis/model/product";
import connectToDB from "../../../../../utlis/connectMongo";
import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";
import { getServerSession } from "next-auth";

export async function POST(request) {
  if (request.method !== "POST") {
    return NextResponse.json({ message: "invalid request" }, { status: 409 });
  }

  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ message: "Not authorized!" }, { status: 401 });
  }

  await connectToDB();

  const token = await getToken({ req: request });

  let decoded, creator, creatorName;
  if (token.idToken) {
    decoded = jwt.decode(token.idToken);

    creatorName = decoded.given_name;
    creator = decoded.sub;
  }

  if (!token.idToken) {
    decoded = jwt.verify(token.jwt, process.env.NEXTAUTH_SECRET);
    creator = decoded.sub;
    creatorName = decoded.name;
  }

  const { title, price } = await request.json();

  try {
    const products = new productModal({
      title: title,
      price: price,
      creator: creator,
      creatorName: creatorName,
    });

    await products.save();
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      message: "SUCCESSFULLY POSTED DATA",
    },
    { status: 201 },
  );
}
