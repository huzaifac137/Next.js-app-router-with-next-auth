import { headers } from "next/dist/client/components/headers";
import { NextResponse } from "next/server";
import connectToDB from "../../../../../utlis/connectMongo";
import productModal from "../../../../../utlis/model/product";

export async function DELETE(request) {
  try {
    connectToDB();

    const head = headers();
    const id = head.get("x-id");

    const product = await productModal.deleteOne({ id: id });
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
