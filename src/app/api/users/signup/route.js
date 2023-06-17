import { NextResponse } from "next/server";
import connectToDB from "../../../../../utlis/connectMongo";
import userModal from "../../../../../utlis/model/user";
import bcrypt from "bcryptjs";

export async function POST(request) {
  if (request.method !== "POST") {
    return NextResponse.json({ message: "invalid request" }, { status: 500 });
  }

  connectToDB();

  const { username, email, password } = await request.json();

  try {
    const alreadyExistsEmail = await userModal.findOne({ email: email });

    if (alreadyExistsEmail) {
      return NextResponse.json(
        { message: "Email is already registered!" },
        { status: 409 },
      );
    }
  } catch (err) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 },
    );
  }

  try {
    const alreadyExistsName = await userModal.findOne({ username: username });

    if (alreadyExistsName) {
      return NextResponse.json(
        { message: "Name is already registered!" },
        { status: 409 },
      );
    }
  } catch (err) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 },
    );
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const newUser = new userModal({
      username: username,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();
  } catch (err) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { message: "User created successfully!" },
    { status: 201 },
  );
}
