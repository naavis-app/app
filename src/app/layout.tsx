/* components here are for site-wide layout */

import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { TRPCReactProvider } from "~/trpc/react";

import "@radix-ui/themes/styles.css";
import Navbar from "./_components/navbar/Navbar";
import { Providers } from "./providers";
import React from "react";

export const metadata = {
    title: "Naavis ⛵️",
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
                <body
                    className="flex min-h-[100vh] w-full 
                flex-col overflow-scroll"
                >
                    <Providers>
                        <TRPCReactProvider>
                            {<Navbar />}
                            {children}
                        </TRPCReactProvider>
                    </Providers>
                </body>
            </html>
        </>
    );
}
