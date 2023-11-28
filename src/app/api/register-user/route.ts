import { createUser } from "@/lib/provider";
import bcrypt from "bcrypt";

const origin = process.env.NEXTAUTH_URL;

export const POST = async (req: Request) => {
  try {
    console.log("In register-user/route.ts");
    const { email, password, first_name, last_name } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({
      email: email,
      password: hashedPassword,
      name: first_name + " " + last_name,
      image: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      admin: false,
      emailVerified: null,
    });
    return Response.json({ message: "user created", status: "success" });
  } catch (err) {
    console.log(err);
    return Response.json({ message: "user not created", status: "failure" });
  }
};
