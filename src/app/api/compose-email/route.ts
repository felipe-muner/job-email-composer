import { NextRequest, NextResponse } from 'next/server';

interface PortfolioProject {
  name: string;
  description: string;
  tech: string[];
  url: string;
}

const portfolioProjects: PortfolioProject[] = [
  {
    name: "ChainAbuse.com",
    description: "Blockchain security platform for reporting and tracking cryptocurrency fraud",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Blockchain APIs"],
    url: "https://chainabuse.com"
  },
  {
    name: "Spoken.io",
    description: "AI-powered speech analysis and communication enhancement platform",
    tech: ["React", "Node.js", "AI/ML APIs", "WebRTC"],
    url: "https://spoken.io"
  },
  {
    name: "Tandem.space",
    description: "Collaborative workspace platform for remote teams and project management",
    tech: ["Next.js", "Socket.io", "MongoDB", "Real-time Collaboration"],
    url: "https://tandem.space"
  },
  {
    name: "KohPhanganGuide.com",
    description: "Comprehensive travel guide and booking platform for Koh Phangan island",
    tech: ["WordPress", "MySQL", "Booking Systems"],
    url: "https://kohphanganguide.com"
  },
  {
    name: "ReprogramAndTransform.com",
    description: "Personal development and transformation coaching platform",
    tech: ["React", "Next.js", "Tailwind", "Shadcn", 'Vercel'],
    url: "https://reprogramandtransform.com"
  }
];

function extractEmail(jobDescription: string): string {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const emails = jobDescription.match(emailRegex);
  return emails ? emails[0] : '';
}

function generateSubject(jobDescription: string): string {
  const titleMatch = jobDescription.match(/(?:job title|position|role):\s*([^\n]+)/i) ||
    jobDescription.match(/(?:seeking|hiring|looking for)(?:\s+a)?\s+([^\n]+?)(?:\s+(?:developer|engineer|specialist))/i);

  if (titleMatch) {
    const title = titleMatch[1].trim();
    return `Application for ${title} Position`;
  }

  return 'Job Application - Full Stack Developer';
}

function generateEmailBody(): string {
  return `Hello,

I saw your job post on Hacker News and I'm interested! I'm experienced in all the technologies in your stack so I'd be a good fit.

Past work:
https://www.chainabuse.com/
https://www.spoken.io/
https://tandem.space/
https://kohphanganguide.com/
https://reprogramandtransform.com/

Github: https://github.com/felipe-muner
LinkedIn: https://www.linkedin.com/in/felipe-muner


Resume attached below.

Best,
Felipe Muner`;
}

export async function POST(request: NextRequest) {
  try {
    const { jobDescription } = await request.json();

    if (!jobDescription || typeof jobDescription !== 'string') {
      return NextResponse.json(
        { error: 'Job description is required and must be a string' },
        { status: 400 }
      );
    }

    const email = extractEmail(jobDescription);
    const subject = generateSubject(jobDescription);
    const emailBody = generateEmailBody();

    const composedEmail = {
      to: email,
      subject: subject,
      body: emailBody
    };

    return NextResponse.json({
      success: true,
      email: composedEmail,
      extractedInfo: {
        emailFound: !!email,
        subjectGenerated: true,
        paragraphsAdded: 2
      }
    });

  } catch (error) {
    console.error('Error composing email:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}