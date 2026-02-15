/**
 * @file Footer.tsx
 * @description Componente Principal do Rodapé (Footer).
 * @author Senior Engineer Logic
 * 
 * Funcionalidades:
 * 1. Orquestração: Renderiza versões Desktop e Mobile.
 * 2. Lógica de Negócio: Obtém o ano atual via hook `useFooter`.
 * 3. Separação de Responsabilidades: O visual fica nos sub-componentes.
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
