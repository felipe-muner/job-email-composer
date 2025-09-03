# Job Email Composer

A Next.js application that transforms job descriptions into professionally crafted job application emails. Simply paste a job description and get a complete email with subject line, recipient extraction, and personalized content.

## Features

- 🎯 **Smart Email Extraction** - Automatically finds email addresses in job descriptions
- 📝 **Subject Line Generation** - Creates professional subject lines based on job titles
- 🌟 **HackerNoon Discovery Story** - Adds a personalized paragraph about discovering the company
- 💼 **Portfolio Showcase** - Highlights your 5 latest projects with technologies used
- ✍️ **Professional Signature** - Includes complete contact information
- 📋 **One-Click Copy** - Copy individual fields or complete email
- 🎨 **Modern UI** - Built with Shadcn/UI components and Tailwind CSS
- ⚡ **Fast Development** - Powered by Next.js with Turbopack

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/felipe-muner/job-email-composer.git
cd job-email-composer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## How to Use

1. **Paste Job Description**: Copy and paste any job description into the text area
2. **Generate Email**: Click "Compose Email" to process the job description
3. **Copy Content**: Use the copy buttons to grab individual fields or the complete email
4. **Send Application**: Paste into your email client and send!

## What Gets Generated

### Email Structure
- **To**: Extracted email address from job description
- **Subject**: Professional subject line based on job title
- **Body**: Two main paragraphs + signature

### Content Breakdown

**Paragraph 1 - Discovery Story (~100 words)**
- How you found the company through HackerNoon
- Your appreciation for their technical content
- Alignment with company values

**Paragraph 2 - Portfolio Showcase**
- Overview of your technical expertise
- 5 latest projects with technologies:
  - E-commerce Platform (React, Node.js, PostgreSQL, Stripe)
  - Task Management App (Next.js, Socket.io, MongoDB, Tailwind CSS)
  - Analytics Dashboard (React, D3.js, Python, FastAPI)
  - Mobile Banking App (React Native, TypeScript, Redux, Firebase)
  - AI Content Generator (Next.js, OpenAI API, Prisma, TailwindCSS)

**Signature**
- Professional closing with contact information
- Portfolio and social media links
- Personal tagline

## Customization

### Updating Portfolio Projects
Edit the `portfolioProjects` array in `/src/app/api/compose-email/route.ts`:

```typescript
const portfolioProjects: PortfolioProject[] = [
  {
    name: "Your Project Name",
    description: "Brief description of the project",
    tech: ["Tech1", "Tech2", "Tech3"]
  },
  // Add your projects here
];
```

### Modifying the Signature
Update the `generateSignature()` function in `/src/app/api/compose-email/route.ts`:

```typescript
function generateSignature(): string {
  return `Best regards,
Your Name
Your Title
Portfolio: https://yourwebsite.com
LinkedIn: https://linkedin.com/in/yourprofile
GitHub: https://github.com/yourusername

"Your personal tagline here."`;
}
```

### Changing Discovery Source
Modify the `generateHackerNoonParagraph()` function to reference a different platform or customize the discovery story.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI
- **Build Tool**: Turbopack (for development)
- **Deployment**: Vercel-ready

## API Endpoints

### POST `/api/compose-email`

Processes a job description and returns a composed email.

**Request Body:**
```json
{
  "jobDescription": "string"
}
```

**Response:**
```json
{
  "success": true,
  "email": {
    "to": "recruiter@company.com",
    "subject": "Application for Frontend Developer Position",
    "body": "Complete email body with paragraphs and signature"
  },
  "extractedInfo": {
    "emailFound": true,
    "subjectGenerated": true,
    "paragraphsAdded": 2
  }
}
```

## Deployment

### Deploy to Vercel

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with one click

### Other Platforms

This Next.js application can be deployed to any platform that supports Node.js:
- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you find this project helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting issues
- 💡 Suggesting improvements
- 🔄 Contributing code

---

**Built with ❤️ by Felipe Muner**

**Dedicated to Meron 🙌 (https://github.com/meronogbai/) My friend who always motivates me**

*Making job applications easier, one email at a time.*
