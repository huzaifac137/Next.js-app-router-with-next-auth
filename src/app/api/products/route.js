import { NextResponse } from "next/server";
import connectToDB from "../../../../utlis/connectMongo";
import productModal from "../../../../utlis/model/product";

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
