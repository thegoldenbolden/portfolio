import { NextResponse } from "next/server";
import mail from "@sendgrid/mail";

export async function POST(request: Request) {
 const body = await request.json();
 const { email, subject, message, name } = body;

 try {
  if (!email || !name || !message) throw new Error(`An email, name, and message must be provided.`);

  mail.setApiKey(process.env.SENDGRID_KEY);
  await mail.send({
   to: "jlbolden9@gmail.com",
   from: "contact@jacobbolden.com",
   subject,
   text: `${email}\n\n${message}`,
  });

  return new Response("Thanks for messaging me!", { status: 200 });
 } catch (error) {
  console.error(error);
  return NextResponse.json(
   { ok: false, error: error.message || "An error occurred." },
   { status: 400 }
  );
 }
}
