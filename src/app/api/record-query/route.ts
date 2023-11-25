import { request } from "http";
import { createQuery } from "@/lib/provider";

const origin = process.env.NEXTAUTH_URL;

export const POST = async (req: Request) => {
  const request = await req.text();
  const body = Object.fromEntries(new URLSearchParams(request));
  const content = body.content;
  const response = body.response;
  const caseId = body.caseId;

  const responseUrl = `${new URL(origin!)}view/${caseId}`;
  await createQuery({
    createdAt: new Date(),
    content: content,
    response: response,
    caseId: caseId,
    updatedAt: new Date(),
  });
  return Response.redirect(responseUrl);
};
