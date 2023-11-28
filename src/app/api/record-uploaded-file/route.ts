import { request } from "http";
import { createFile, updateCase } from "@/lib/provider";
import { NextRequest, NextResponse } from "next/server";

const origin = process.env.NEXTAUTH_URL;

export const POST = async (req: NextRequest) => {
  const { caseid, filename, filetype } = await req.json();

  const createdAt = new Date();
  const fileData = await createFile({
    caseId: caseid,
    url: filename,
    filetype: filetype,
    createdAt: createdAt,
    updatedAt: createdAt,
    tags: "",
  });

  return NextResponse.json({ status: "success" });
};
