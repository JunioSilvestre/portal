/**
 * @file Header.tsx
 * @description Main Header container component.
 * Orchestrates Desktop and Mobile views, handles state (scroll, menu), and applies structural styles.
 */

'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useHeader } from './hooks/useHeader';
import { HeaderDesktop } from './Header.desktop';
import { HeaderMobile } from './Header.mobile';
import styles from './header.module.css'; // Import the CSS module

export const Header = () => {
  const { isScrolled, isMobileMenuOpen, toggleMobileMenu, closeMobileMenu, resetAutoCloseTimer } = useHeader();

  return (
    <header
      className={cn(
        styles.header, // Base header styles
        isScrolled ? styles.headerScrolled : styles.headerUnscrolled // Conditional styles
      )}
    >
      <div className={styles.headerContainer}> {/* Container styles */}
        {/* Logo Section */}
        <Link href="/" className={styles.logo} onClick={closeMobileMenu}>
          <div className={cn(
            styles.logo,
            styles.logoWrapper // Extra wrapper class if needed, or rely on div inside
          )}>
            JS
          </div>
        </Link>

        {/* Desktop Navigation (Hidden on Mobile via CSS) */}
        <HeaderDesktop />

        {/* Mobile Navigation (Hidden on Desktop via CSS) */}
        <HeaderMobile
          isOpen={isMobileMenuOpen}
          onToggle={toggleMobileMenu}
          onClose={closeMobileMenu}
          onInteraction={resetAutoCloseTimer}
        />
      </div>
    </header>
  );
};
