import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { TRPCReactProvider } from "~/trpc/react";
import { Theme } from "@radix-ui/themes";
import Tagline from "./_components/Tagline";

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
        <body className="bg-main-bg flex min-h-[100vh] w-full flex-col">
          <Theme>
              <TRPCReactProvider>
                {<Navbar />}
                {children}
              </TRPCReactProvider>
          </Theme>
        </body>
      </html>
    </>
  );
}
