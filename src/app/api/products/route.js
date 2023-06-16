import { NextResponse } from "next/server";
import connectToDB from "../../../../utlis/connectMongo";
import productModal from "../../../../utlis/model/product";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { getToken } from "next-auth/jwt";

export async function GET(req) {
  await connectToDB();

  let products;
  try {
    products = await productModal.find({});
  } catch (error) {
    console.log("ERROR" + error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }

  console.log(products);

  return NextResponse.json(
    {
      products: products,
    },
    { status: 200 },
  );
}
