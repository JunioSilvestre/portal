/**
 * @file Header.tsx
 * @description Componente Principal do Cabeçalho (Header).
 * @author Senior Engineer Logic
 * 
 * Este componente atua como o "Container" ou "Orquestrador" da navegação.
 * Ele não contém toda a lógica visual, mas decide O QUE mostrar e QUANDO.
 * 
 * Funcionalidades:
 * 1. Gerencia o estado de scroll (rolagem) para mudar o estilo do cabeçalho.
 * 2. Gerencia o estado do menu mobile (aberto/fechado).
 * 3. Renderiza a versão Desktop ou Mobile dependendo do tamanho da tela (via CSS).
 * 
 * @library next/link - Componente otimizado do Next.js para navegação entre páginas sem recarregar (SPA).
 * @library @/lib/utils - Utilitário 'cn' (clsx + tailwind-merge) para combinar classes CSS condicionalmente.
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
