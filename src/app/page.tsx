"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ComposedEmail {
  to: string;
  subject: string;
  body: string;
}

interface ApiResponse {
  success: boolean;
  email: ComposedEmail;
  extractedInfo: {
    emailFound: boolean;
    subjectGenerated: boolean;
    paragraphsAdded: number;
  };
  error?: string;
}

export default function Home() {
  const [jobDescription, setJobDescription] = useState("");
  const [composedEmail, setComposedEmail] = useState<ComposedEmail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setComposedEmail(null);

    try {
      const response = await fetch("/api/compose-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobDescription }),
      });

      const data: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to compose email");
      }

      setComposedEmail(data.email);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Job Email Composer
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Transform job descriptions into professional application emails
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Compose Your Job Application Email</CardTitle>
            <CardDescription>
              Paste the job description below and get a professionally crafted email with subject line and content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="job-description">Job Description</Label>
                <Textarea
                  id="job-description"
                  placeholder="Paste the job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="min-h-[200px]"
                  required
                />
              </div>
              <Button type="submit" disabled={isLoading || !jobDescription.trim()}>
                {isLoading ? "Composing..." : "Compose Email"}
              </Button>
            </form>

            {error && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                <p className="text-red-800 dark:text-red-200">{error}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {composedEmail && (
          <Card>
            <CardHeader>
              <CardTitle>Your Composed Email</CardTitle>
              <CardDescription>
                Copy the fields below and paste them into your email client
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="to-email">To</Label>
                <div className="flex gap-2">
                  <Input
                    id="to-email"
                    value={composedEmail.to || "No email found in job description"}
                    readOnly
                    className="flex-1"
                  />
                  {composedEmail.to && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(composedEmail.to)}
                    >
                      Copy
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <div className="flex gap-2">
                  <Input
                    id="subject"
                    value={composedEmail.subject}
                    readOnly
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(composedEmail.subject)}
                  >
                    Copy
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-body">Email Body</Label>
                <div className="space-y-2">
                  <Textarea
                    id="email-body"
                    value={composedEmail.body}
                    readOnly
                    className="min-h-[300px]"
                  />
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(composedEmail.body)}
                  >
                    Copy Email Body
                  </Button>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button
                  onClick={() => copyToClipboard(`To: ${composedEmail.to}\nSubject: ${composedEmail.subject}\n\n${composedEmail.body}`)}
                  className="w-full"
                >
                  Copy Complete Email
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
