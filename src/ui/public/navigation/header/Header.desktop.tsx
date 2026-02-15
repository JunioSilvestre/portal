/**
 * @file Header.desktop.tsx
 * @description Componente Visual Desktop do Cabeçalho.
 * @author Senior Engineer Logic
 * 
 * Responsável por renderizar a navegação em telas grandes (Laptop/Monitores).
 * Foca em desenhar os links horizontalmente e destacar a página atual.
 * 
 * Funcionalidades:
 * 1. Lista de Links Horizontal.
 * 2. Estado "Ativo" (Active Link) - destaca visualmente onde o usuário está.
 * 3. Botão de Ação "Get Starting" sempre visível.
 * 
 * @library next/navigation - Hook 'usePathname' para saber a URL atual (/about, /, etc).
 * @library next/link - Navegação otimizada.
 */

import Link from 'next/link';
import { NAVIGATION_LINKS } from './types/header.types'; // Lista de links (Fonte da Verdade)
import styles from './header.module.css'; // Estilos CSS Modules
import { usePathname } from 'next/navigation'; // Hook do Next.js App Router para ler a URL

export const HeaderDesktop = () => {
  // usePathname: Retorna a rota atual (ex: '/about').
  // Usamos isso para comparar com o href do link e saber se ele está "ativo".
  const pathname = usePathname();

  return (
    // Container Desktop: Escondido em mobile (display: none) via CSS Module.
    <div className={styles.desktopNavContainer}>

      {/* Wrapper de Navegação (Semantic <nav>) */}
      <nav className={styles.navLinksWrapper}>
        {/* Renderização de Lista: Mapeamos o array de dados para componentes JSX. */}
        {NAVIGATION_LINKS.map((link) => {
          // Lógica de Estado Ativo:
          // Se a URL atual for igual ao link, isActive é true.
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href} // 'key' ajuda o React a rastrear alterações na lista de forma eficiente.
              href={link.href}
              // Estilo Condicional:
              // Sempre tem a classe 'navLink'. Adiciona 'activeNavLink' APENAS se isActive for true.
              // Template Literals (``) facilitam essa concatenação de strings.
              className={`${styles.navLink} ${isActive ? styles.activeNavLink : ''}`}

              // Acessibilidade (A11y):
              // Avisa leitores de tela que este é o link da página atual.
              aria-current={isActive ? 'page' : undefined}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Botão de Call to Action (CTA) */}
      <Link href="/get-starting">
        <button
          className={styles.getStartingButton} // Estilo de botão primário
        >
          Get Starting
        </button>
      </Link>
    </div>
  );
};
