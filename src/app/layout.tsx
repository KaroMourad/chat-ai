// app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Chat AI",
  description: "A chat application powered by Next.js, Gemini API, and MongoDB",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <div className="flex flex-col h-screen">
          <header className="bg-blue-500 text-white p-4">
            <h1 className="text-xl font-bold">Chat AI</h1>
          </header>
          <main className="flex-grow flex flex-1 max-h-full w-full overflow-hidden max-w-7xl">
            {children}
          </main>
          <footer className="bg-gray-800 text-white p-2 text-center">
            <p>© {new Date().getFullYear()} Chat AI. All rights reserved.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
