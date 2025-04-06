import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import Header from "@/components/Header";
import { Toaster } from "sonner";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Career Coach AI",
  description: ""
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{
      baseTheme: dark
    }}>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${inter.className}`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors/>
            <footer>
              <div className="container mx-auto px-4 py-8 text-center
                    text-gray-200">
                <Link href='https://www.linkedin.com/in/oshan-pandit-b45709217/'>
                  <p>Made With 🧡 By Oshan Pandit</p>
                </Link>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
