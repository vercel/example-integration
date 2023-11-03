import { Metadata } from "next";
import Image from "next/image";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vercel Example Integration",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <div className="flex-1 flex items-center justify-center">
          {children}
        </div>
        <footer className="mt-12 flex items-center justify-center w-full h-24 border-t">
          <a
            className="flex items-center justify-center"
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="ml-2"
              width="70"
              height="16"
            />
          </a>
        </footer>
      </body>
    </html>
  );
}
