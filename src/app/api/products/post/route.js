import { NextResponse } from "next/server";
import productModal from "../../../../../utlis/model/product";
import connectToDB from "../../../../../utlis/connectMongo";
import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";

export async function POST(request) {
  if (request.method !== "POST") {
    return NextResponse.json({ message: "invalid request" }, { status: 409 });
  }
  await connectToDB();

  const token = await getToken({ req: request });

  let decoded;
  if (token.idToken) {
    decoded = jwt.decode(token.idToken);
    console.log(decoded);
  }

  const { title, price } = await request.json();

  try {
    const products = new productModal({
      title: title,
      price: price,
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
