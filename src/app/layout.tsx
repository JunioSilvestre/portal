/**
 * ============================================================================
 * FILE: layout.tsx
 * LAYER: app
 * TYPE: layout
 * ============================================================================
 *
 * PURPOSE:
 * -> Root Layout (The Shell) of the application.
 * -> Define the <html> and <body> structure shared by all pages.
 *
 * RESPONSIBILITY:
 * -> Inject global fonts (Geist, Inter).
 * -> Apply global CSS (Tailwind).
 * -> Provide React Contexts (Theme, Auth, etc.) if needed.
 * -> Render the site-wide Header and Footer.
 *
 * ARCHITECTURE POSITION:
 * -> Top-level wrapper for the entire Next.js app.
 *
 * DATA FLOW:
 * -> Props (children) -> Render Wrapper -> Render Children.
 *
 * SECURITY:
 * -> CSP (Content Security Policy) headers are typically injected here or in middleware.
 *
 * PERFORMANCE:
 * -> Must be lightweight.
 * -> Fonts should be optimized (next/font).
 *
 * IMPROVEMENTS:
 * -> Add OpenGraph/Twitter metadata for SEO.
 *
 * STATUS:
 * -> Stable
 *
 * ============================================================================
 
 * O que é um Layout no Next.js ?
 * É a "casca" da aplicação.Ele define a estrutura HTML que se repete em TODAS as páginas (<html>, <body>).
  * Aqui é onde configuramos fontes globais, metadados de SEO e Providers (Context API).
  *
  * Funcionalidades:
  * 1. Configuração de Fontes (Next/Font) para performance.
  * 2. Definição de Metadados (Título, Descrição) para SEO.
  * 3. Envolve toda a aplicação com "Providers" (Tema, Contextos).
  * 4. Renderiza o Cabeçalho (Header) fixo.
  */

import type { Metadata } from "next";
import localFont from "next/font/local"; // Otimização de fontes locais (sem requisições externas ao Google Fonts)
import "./globals.css"; // Estilos Globais (Tailwind + CSS Variables)
import { Providers } from "@/components/providers"; // Wrapper de Contextos (Theme Provider, etc)
import { Header } from "@/ui/public/navigation/header/Header";
import { Footer } from "@/ui/public/navigation/footer/Footer"; // Nosso Header principal

// --- Configuração de Fontes ---
// Carregamos as fontes locais para evitar "Layout Shift" (CLS) e melhorar performance.
// Elas são injetadas como variáveis CSS (--font-geist-sans) para uso no Tailwind.

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans", // Variável CSS disponível globalmente
  weight: "100 900", // Fonte variável suporta múltiplos pesos num único arquivo
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// --- Metadados (SEO) ---
// O Next.js usa essa constante para gerar as tags <title> e <meta> no <head> do HTML.
export const metadata: Metadata = {
  title: "Portal - Advanced Header",
  description: "Demonstrating senior-level header implementation",
};

// --- Componente Layout Raiz ---
// Todo componente dentro de `src/app` será renderizado DENTRO deste <RootLayout>.
export default function RootLayout({
  children, // 'children' representa a página atual que está sendo visitada (Page.tsx)
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: Necessário para Theme Providers que alteram atributos no HTML/Body,
    // evitando erros de mismatch entre Servidor e Cliente.
    <html lang="en" suppressHydrationWarning>
      <body
        // Injetamos as variáveis das fontes e definimos classes base (antialiased para fontes mais nítidas)
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f5f5f5]`}
      >
        {/* Providers: Envolvem a aplicação para compartilhar estado (ex: Dark Mode) */}
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Header Fixo: Aparece em todas as páginas */}
          <Header />

          {/* Spacer for fixed header */}
          {/* Main Content (Hero should handle top padding) */}
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
