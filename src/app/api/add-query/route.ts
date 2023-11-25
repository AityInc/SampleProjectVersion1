import { request } from "http";
import { createQuery } from "@/lib/provider";

const origin = process.env.NEXTAUTH_URL;

export const POST = async (req: Request) => {
  const request = await req.text();
  
  const body = Object.fromEntries(new URLSearchParams(request));
  const content = body.content;
  const userid = body.userid;
  const caseId = body.caseid;

  const responseUrl = `${new URL(origin!)}view/${userid}/${caseId}`;
  await createQuery({
    createdAt: new Date(),
    content: content,
    caseId: caseId,
    updatedAt: new Date(),
  });
  return Response.redirect(responseUrl);
};
