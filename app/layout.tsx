import type {Metadata} from "next";
import {Inter} from "next/font/google";
import ThemeProvider from './providers/ThemeProvider';

// Optimize font loading
const inter = Inter({
    subsets: ["latin"],
    weight: ['300', '400', '500', '600', '700'],
    display: 'swap',
    variable: '--font-inter',
    preload: true,
    fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
});

// Enhanced metadata for better SEO
export const metadata: Metadata = {
    title: "Auto Parts Shop | Premium Performance Parts",
    description: "Premium quality auto parts and accessories for your vehicle's performance, maintenance, and style. Free shipping on orders over $50.",
    keywords: "auto parts, car parts, vehicle accessories, performance parts, car maintenance",
    authors: [{ name: "Auto Parts Shop Team" }],
    creator: "Auto Parts Shop",
    publisher: "Auto Parts Shop",
    openGraph: {
        type: 'website',
        title: 'Auto Parts Shop | Premium Performance Parts',
        description: 'Premium quality auto parts for your vehicle\'s performance and style',
        siteName: 'Auto Parts Shop'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Auto Parts Shop | Premium Performance Parts',
        description: 'Premium quality auto parts for your vehicle\'s performance and style'
    },
    robots: {
        index: true,
        follow: true
    },
    metadataBase: new URL('https://auto-parts-shop.example.com')
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={inter.variable}>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
                <meta name="theme-color" content="#121212" />
                <link rel="icon" href="/favicon.ico" sizes="any" />
            </head>
            <body>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}