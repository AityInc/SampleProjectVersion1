import { updateQuery } from "@/lib/provider";
import { NextRequest } from "next/server";

const origin = process.env.NEXTAUTH_URL;

export const POST = async (req: NextRequest) => {
  const request = await req.text();
  const body = Object.fromEntries(new URLSearchParams(request));
  const queryid = body.queryid;
  const userid = body.userid;
  const responseText = body.responsetext;
  await updateQuery(queryid, {
    response: responseText,
    updatedAt: new Date(),
  });
  const responseUrl = `${new URL(origin!)}view-queries/${userid}`;

  return Response.redirect(responseUrl);
};
