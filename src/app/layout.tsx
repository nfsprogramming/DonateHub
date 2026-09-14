import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "DonateHub — India's Trusted Giving & Social Impact Platform",
  description:
    "Give with confidence. DonateHub connects donors with 100% verified Indian NGOs, offering radical fund transparency, real-time milestone tracking, and Section 80G tax benefits.",
  keywords: "donation, NGO, charity, crowdfunding, transparent, campaigns, India, 80G tax exemption",
  openGraph: {
    title: "DonateHub — India's Trusted Giving Platform",
    description: "Support verified Indian NGOs with 100% transparency on fund usage and real-world impact.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AppProviders>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
