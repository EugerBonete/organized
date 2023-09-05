import Navbar from "@/components/navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/footer";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Organizify",
  description: "Organize and schedule your tasks.",
  icons: {
    icon: "/calendar.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        // baseTheme: neobrutalism,
        elements: {
          formButtonPrimary:
            "bg-primary hover:bg-primary/90 text-primary-foreground text-sm normal-case",
          card: "bg-background text-foreground border-2 shadow-none",
          headerSubtitle: "text-foreground",
          socialButtonsBlockButton: "text-foreground dark:border-white",
          dividerText: "text-foreground",
          dividerLine: "bg-foreground",
          formFieldLabel: "text-foreground",
          footerActionLink: "text-foreground hover:text-foreground/90",
          footerActionText: "text-foreground",
          headerTitle: "text-foreground",
          formFieldInput: "dark:border-white text-foreground bg-background",
        },
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Toaster />
            <Navbar />
            <Separator />
            <main className="min-h-screen p-5 flex justify-center">
              {children}
            </main>
            <Separator />
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
