// pages/api/mailgun/send-email.ts
import type { NextApiRequest, NextApiResponse } from "next";

import mailgun from "mailgun-js";

interface EmailRequest {
  to: string;
  from: string;
  subject: string;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await handlePost(req, res);
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { to, from, subject, message }: EmailRequest = req.body;

    const data = {
      from,
      to,
      text: message,
    };

    const mailgunApiKey = process.env.MAILGUN_API_KEY;
    const mailgunDomain = process.env.MAILGUN_DOMAIN;

    if (!mailgunApiKey || !mailgunDomain) {
      console.error("Mailgun API key or domain is missing.");
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const mailgunClient = mailgun({
      apiKey: mailgunApiKey,
      domain: mailgunDomain,
    });

    const result = await mailgunClient.messages().send(data);

    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
