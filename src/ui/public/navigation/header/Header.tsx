/**
 * ============================================================================
 * FILE: Header.tsx
 * LAYER: ui
 * TYPE: component
 * ============================================================================
 *
 * PURPOSE:
 * -> Main Navigation Orchestrator.
 * -> Swaps between Desktop and Mobile views based on viewport.
 * -> Manages visual state transitions (scroll effect).
 *
 * RESPONSIBILITY:
 * -> Render the site header.
 * -> Coordinate specific logic like "scrolled" state.
 * -> Contain the Logo and Navigation Links.
 *
 * ARCHITECTURE POSITION:
 * -> Placed at the top of the root layout.
 * -> Parent to Header.desktop and Header.mobile.
 *
 * DATA FLOW:
 * -> Window Scroll Event -> useHeader Hook -> State -> UI Style Change.
 *
 * SECURITY:
 * -> Public component, no specific security risks.
 *
 * PERFORMANCE:
 * -> Uses scroll listener (throttled in useHeader) to prevent layout thrashing.
 * -> "use client" directive required for event listeners.
 *
 * IMPROVEMENTS:
 * -> Add mega-menu support if navigation grows.
 *
 * STATUS:
 * -> Stable
 *
 * ============================================================================
 */

'use client'; // Diretiva do Next.js para indicar que este componente roda no navegador (tem interatividade/hooks).

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useHeader } from './hooks/useHeader'; // Hook customizado onde toda a lógica (regras de negócio) reside.
import { HeaderDesktop } from './Header.desktop'; // Sub-componente visual para Desktop.
import { HeaderMobile } from './Header.mobile';   // Sub-componente visual para Mobile.
import styles from './header.module.css'; // CSS Modules para estilização encapsulada e segura.

export const Header = () => {
  // Extraímos a lógica e o estado do nosso Hook customizado (Separation of Concerns).
  // Isso deixa o componente JSX limpo e focado apenas em "renderizar".
  const {
    isScrolled,           // Booleano: true se o usuário rolou a página para baixo (> 50px).
    isMobileMenuOpen,     // Booleano: true se o menu lateral (drawer) estiver aberto.
    toggleMobileMenu,     // Função: alterna o estado do menu (abre/fecha).
    closeMobileMenu,      // Função: força o fechamento do menu (usado ao clicar em links).
    resetAutoCloseTimer   // Função: reseta o temporizador de auto-fechamento (UX de segurança).
  } = useHeader();

  return (
    // <header>: Tag semântica HTML5 para cabeçalhos de página ou seção.
    <header
      className={cn(
        styles.header, // Classe base (fixed, z-index, width-full)
        // Lógica Condicional de Estilo:
        // Se 'isScrolled' for true, aplica 'headerScrolled' (fundo com blur/cor).
        // Se false, aplica 'headerUnscrolled' (transparente).
        isScrolled ? styles.headerScrolled : styles.headerUnscrolled
      )}
    >
      {/* Container Centralizado: Limita a largura do conteúdo para não "estourar" em telas ultra-wide */}
      <div className={styles.headerContainer}>

        {/* --- Área da Logo --- */}
        {/* Envolvemos a logo em um Link para que clicar nela sempre leve à Home ('/') */}
        <Link href="/" className={styles.logo} onClick={closeMobileMenu}>
          <div className={cn(
            styles.logo,
            styles.logoWrapper // Wrapper opcional para animações ou alinhamento fino da logo
          )}>
            JS {/* Texto da Logo - poderia ser uma tag <Image /> do Next.js se fosse um arquivo SVG/PNG */}
          </div>
        </Link>

        {/* --- Navegação Desktop --- */}
        {/* Renderiza os links horizontais. Oculto em telas menores via CSS Module (display: none em mobile) */}
        <HeaderDesktop />

        {/* --- Navegação Mobile --- */}
        {/* Renderiza o botão Hamburger e o Drawer lateral. Oculto em telas maiores via CSS Module. */}
        <HeaderMobile
          isOpen={isMobileMenuOpen}       // Estado controlado pelo pai (Header.tsx)
          onToggle={toggleMobileMenu}     // Passa a função de controle para o filho
          onClose={closeMobileMenu}       // Passa a função de fechar para o filho (usado no backdrop e links)
          onInteraction={resetAutoCloseTimer} // Passa o reset do timer para manter o menu aberto se o usuário estiver interagindo
        />
      </div>
    </header>
  );
};
