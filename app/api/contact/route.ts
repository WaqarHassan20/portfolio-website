import { NextRequest, NextResponse } from "next/server";

interface ContactBody {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function validateBody(body: Partial<ContactBody>): string | null {
  if (!body.name?.trim())                          return "Name is required.";
  if (!body.email?.trim())                         return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email ?? ""))
                                                   return "Invalid email address.";
  if (!body.subject?.trim())                       return "Subject is required.";
  if ((body.message?.trim().length ?? 0) < 20)    return "Message must be at least 20 characters.";
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<ContactBody>;
    const error = validateBody(body);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const { name, email, subject, message } = body as ContactBody;

    // TODO: install Resend → bun add resend
    // Then replace below with:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from:    "Portfolio <noreply@yourdomain.com>",
    //   to:      [process.env.CONTACT_EMAIL!],
    //   subject: `[Portfolio] ${subject}`,
    //   html:    `<b>From:</b> ${name} (${email})<br/><br/>${message}`,
    // });

    console.log("[contact] new submission:", { name, email, subject, message });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
