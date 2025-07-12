import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Desire Music Club",
  description: "Tel Aviv's premier nightclub for electronic music lovers",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
