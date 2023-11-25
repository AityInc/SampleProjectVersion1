import { request } from "http";
import { createCase } from "@/lib/provider";

const origin = process.env.NEXTAUTH_URL;

export const POST = async (req: Request) => {
  const request = await req.text();
  const body = Object.fromEntries(new URLSearchParams(request));
  const userid = body.userid;
  const description = body.description;
  const title = body.title;

  const responseUrl = `${new URL(origin!)}view-cases/${userid}`;
  await createCase({
    createdAt: new Date(),
    description: description,
    title: title,
    userId: userid,
    updatedAt: new Date(),
  });
  return Response.redirect(responseUrl);
};
