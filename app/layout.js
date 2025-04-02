import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import Header from "@/components/Header";


const inter=Inter({subsets:["latin"]});

export const metadata={
  title:"Career Coach AI",
  description:""
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{
       baseTheme:dark
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
             <footer className="bg-gradient-to-r from-gray-900 to-[#2C1A47] py-6">
                <div className="container mx-auto px-4 text-center
                    text-gray-200">
                   <p>Made With 🧡 By Oshan Pandit</p>
                </div>
             </footer>
          </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
