import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer/footer";
import WhatsAppButton from "@/components/whatsapp/WhatsAppButton";
import Header from "@/components/header/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CIATOB - Clínica Integral Avanzada de Tratamiento de Obesidades",
  description: "Equipo multidisciplinario especializado en el tratamiento integral de la obesidad. Endocrinología, Nutrición, Psicología y Prescripción del ejercicio en Lima, Perú.",
  keywords: ["obesidad", "endocrinología", "nutrición", "psicología", "medicina deportiva", "Lima", "Perú"],
  authors: [{ name: "CIATOB" }],
  creator: "CIATOB",
  publisher: "CIATOB",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  robots: {
    index: true,
    follow: true,
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
       
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        {/* Botón de WhatsApp - Reemplaza el número con tu número real */}
        <WhatsAppButton phoneNumber="+51948213270" />
      </body>
    </html>
  );
}
