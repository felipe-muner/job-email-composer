import { NextRequest, NextResponse } from 'next/server';

interface PortfolioProject {
  name: string;
  description: string;
  tech: string[];
}

const portfolioProjects: PortfolioProject[] = [
  {
    name: "E-commerce Platform",
    description: "Full-stack marketplace with React, Node.js, and PostgreSQL",
    tech: ["React", "Node.js", "PostgreSQL", "Stripe"]
  },
  {
    name: "Task Management App",
    description: "Real-time collaboration tool with WebSocket integration",
    tech: ["Next.js", "Socket.io", "MongoDB", "Tailwind CSS"]
  },
  {
    name: "Analytics Dashboard",
    description: "Data visualization platform with interactive charts",
    tech: ["React", "D3.js", "Python", "FastAPI"]
  },
  {
    name: "Mobile Banking App",
    description: "Cross-platform mobile app with secure authentication",
    tech: ["React Native", "TypeScript", "Redux", "Firebase"]
  },
  {
    name: "AI Content Generator",
    description: "AI-powered content creation tool with OpenAI integration",
    tech: ["Next.js", "OpenAI API", "Prisma", "TailwindCSS"]
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
  const projectDescriptions = portfolioProjects.map(project => 
    `${project.name} (${project.tech.join(', ')}): ${project.description}`
  ).join('. ');

  return `I bring extensive experience in full-stack development with a proven track record of delivering scalable solutions. My recent portfolio includes: ${projectDescriptions}. These projects demonstrate my expertise in modern web technologies, database design, and user experience optimization. I consistently focus on writing clean, maintainable code while implementing best practices for performance and security. My diverse technical background enables me to adapt quickly to new technologies and contribute effectively to cross-functional teams.`;
}

function generateSignature(): string {
  return `Best regards,
Felipe Muner
Full Stack Developer
Portfolio: https://felipemuner.dev
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