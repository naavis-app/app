import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { TRPCReactProvider } from "~/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import { Theme } from "@radix-ui/themes";

import "@radix-ui/themes/styles.css";
import Navbar from "./_components/Navbar";

export const metadata = {
  title: "Location App",
  description: "Location sharing, reimagined.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body className="flex min-h-[100vh] w-full flex-col bg-main-bg">
          <Theme>
            <ClerkProvider>
              <TRPCReactProvider>
                {<Navbar />}
                {children}
              </TRPCReactProvider>
            </ClerkProvider>
          </Theme>
        </body>
      </html>
    </>
  );
}
