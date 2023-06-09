import { NextResponse } from "next/server";
import productModal from "../../../../../utlis/model/product";
import connectToDB from "../../../../../utlis/connectMongo";

export async function POST(request) {
  await connectToDB();
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
