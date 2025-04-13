import type {Metadata} from "next";
import {Inter} from "next/font/google";
import ThemeProvider from './providers/ThemeProvider';

const inter = Inter({
    subsets: ["latin"],
    weight: ['300', '400', '500', '600', '700'],
    display: 'swap',
    variable: '--font-inter',
});

export const metadata: Metadata = {
    title: "Auto Parts Shop",
    description: "Premium quality auto parts for your vehicle's performance and style",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={inter.variable}>
            <body>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}