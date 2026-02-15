/**
 * @file page.tsx
 * @description Página Inicial (Home Page).
 * @author Senior Engineer Logic
 * 
 * Estrutura:
 * No Next.js App Router, `page.tsx` define a UI de uma rota específica.
 * Como este arquivo está na raiz de `/app`, ele representa a rota `/` (Home).
 * 
 * Server Component:
 * Por padrão, páginas são Server Components. Isso significa que renderizam no servidor,
 * enviando menos JavaScript para o navegador (ótimo para performance e SEO).
 */

export default function Home() {
  return (
    // Estrutura Flexbox centralizada para demonstrar o layout
    <div className="flex flex-col min-h-screen items-center justify-center gap-10 py-20">

      {/* Título Principal */}
      <h1 className="text-4xl font-bold">Hello World</h1>

      {/* Conteúdo de Texto */}
      <div className="max-w-2xl text-center space-y-4">
        <p>Scroll down to test the header effect.</p>

        {/* Geramos parágrafos falsos para forçar o scroll e testar a animação do Header */}
        {Array.from({ length: 20 }).map((_, i) => (
          <p key={i} className="text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        ))}
      </div>
    </div>
  );
}
