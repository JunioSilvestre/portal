/**
 * ============================================================================
 * FILE: Footer.tsx
 * LAYER: ui
 * TYPE: component
 * ============================================================================
 *
 * PURPOSE:
 * -> Display site footer with global links and copyright.
 * -> Ensure consistent branding at the bottom of every page.
 *
 * RESPONSIBILITY:
 * -> Render Desktop/Mobile variants.
 * -> specific logic (e.g., dynamic year).
 *
 * ARCHITECTURE POSITION:
 * -> Placed at the bottom of the root layout.
 *
 * DATA FLOW:
 * -> Static Content -> Render.
 *
 * SECURITY:
 * -> Public component, low risk.
 *
 * PERFORMANCE:
 * -> Static rendering mostly.
 *
 * IMPROVEMENTS:
 * -> Add newsletter subscription form integration.
 *
 * STATUS:
 * -> Stable
 *
 * ============================================================================
 */

'use client';

import { useFooter } from './hooks/useFooter';
import { FooterDesktop } from './Footer.desktop';
import { FooterMobile } from './Footer.mobile';

export const Footer = () => {
  // Hook customizado que fornece dados necessários (Year, etc.)
  const { currentYear } = useFooter();

  return (
    // Wrapper semântico
    // O Footer deve estar no final do layout (rootLayout).
    <>
      {/* Versão Desktop (Hidden on Mobile via CSS interno do componente) */}
      <FooterDesktop year={currentYear} />

      {/* Versão Mobile (Hidden on Desktop via CSS interno do componente) */}
      <FooterMobile year={currentYear} />
    </>
  );
};
