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

function generateHackerNoonParagraph(): string {
  return `I discovered your company through HackerNoon, where I regularly follow technology trends and industry insights. Your organization's commitment to innovation and technical excellence immediately caught my attention. As an active member of the tech community, I appreciate companies that share knowledge and contribute to the broader developer ecosystem. The way your team approaches problem-solving and your focus on cutting-edge technologies align perfectly with my professional values and career aspirations. I'm particularly impressed by your company's transparency in sharing technical challenges and solutions with the community.`;
}

function generatePortfolioParagraph(): string {
  const projectUrls = portfolioProjects.map(project => project.url).join(', ');

  return `I bring extensive experience in full-stack development with a proven track record of delivering scalable solutions. My recent portfolio includes: ${projectUrls}. These projects demonstrate my expertise in modern web technologies, database design, and user experience optimization. I consistently focus on writing clean, maintainable code while implementing best practices for performance and security. My diverse technical background enables me to adapt quickly to new technologies and contribute effectively to cross-functional teams.`;
}

function generateSignature(): string {
  return `Best regards,
Felipe Muner
Full Stack Developer
Portfolio: https://felipemuner.work
LinkedIn: https://linkedin.com/in/felipemuner
GitHub: https://github.com/felipe-muner

"Building the future, one line of code at a time."`;
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
    const hackerNoonParagraph = generateHackerNoonParagraph();
    const portfolioParagraph = generatePortfolioParagraph();
    const signature = generateSignature();

    const composedEmail = {
      to: email,
      subject: subject,
      body: `${hackerNoonParagraph}\n\n${portfolioParagraph}\n\n${signature}`
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