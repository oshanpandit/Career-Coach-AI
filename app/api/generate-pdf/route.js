import puppeteer from 'puppeteer';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/prisma';
export async function POST(request) {
  const { userId } = await auth();
  if (!userId) {
      throw new Error("Unauthorized");
  }

  const user = await db.User.findUnique({
      where: {
          clerkUserId: userId
      },
  });

  if (!user) {
      throw new Error("User not found");
  }
  const { html } = await request.json();

  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    await browser.close();

    return new Response(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="resume.pdf"',
      },
    });
  } catch (error) {
    console.error('PDF generation failed:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate PDF' }), {
      status: 500,
    });
  }
}
