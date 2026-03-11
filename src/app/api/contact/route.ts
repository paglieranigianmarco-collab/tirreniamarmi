import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, company, email, phone, subject, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Log submission (in production, integrate with Resend or other email service)
    console.log("Contact form submission:", { name, company, email, phone, subject, message });

    // To enable email sending, uncomment and configure with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'website@tirreniamarmi.com',
    //   to: 'info@tirreniamarmi.com',
    //   subject: `[Website] ${subject} from ${name}`,
    //   html: `<p><strong>From:</strong> ${name} (${email})<br/>
    //          <strong>Company:</strong> ${company || 'N/A'}<br/>
    //          <strong>Phone:</strong> ${phone || 'N/A'}<br/>
    //          <strong>Subject:</strong> ${subject}<br/><br/>
    //          <strong>Message:</strong><br/>${message}</p>`,
    // });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
