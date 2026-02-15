/**
 * @file header.types.ts
 * @description Definições de Tipos (TypeScript) e Constantes.
 * @author Senior Engineer Logic
 * 
 * Por que arquivos de tipos separados?
 * 1. Organização: Mantém interfaces e tipos complexos fora dos componentes.
 * 2. Reutilização: Vários arquivos podem importar os mesmos tipos.
 * 3. Type Safety: Define regras estritas para evitar erros de digitação (ex: rotas inválidas).
 */

// Union Type: Define EXATAMENTE quais strings são permitidas como rota.
// Se tentar usar '/contactt' (erro de digitação), o TypeScript vai gritar.
export type AppRoute = '/' | '/about' | '/works' | '/contact' | '/get-starting';

// Interface: Contrato que define a estrutura de um objeto "Link de Navegação".
export interface NavLink {
    label: string;      // O texto que aparece na tela (ex: "About")
    href: AppRoute;     // O destino, deve ser uma das rotas válidas acima
}

export interface HeaderProps {
    /**
     * Define se o header deve ser transparente inicialmente.
     * O '?' indica que é opcional.
     * @default true
     */
    transparent?: boolean;
}

// Constante: Single Source of Truth (Fonte Única de Verdade) para os links.
// Se precisarmos mudar a ordem, adicionar ou remover links, fazemos AQUI.
// Todos os componentes (Mobile, Desktop, Footer) que usarem essa lista serão atualizados automaticamente.
export const NAVIGATION_LINKS: NavLink[] = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Works', href: '/works' },
    { label: 'Contact', href: '/contact' },
    // Adicione novos links aqui...
];
