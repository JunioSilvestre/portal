/**
 * @file Footer.mobile.tsx
 * @description Componente Visual Mobile do Rodapé.
 * @author Senior Engineer Logic
 * 
 * Layout em pilha (column) otimizado para telas verticais.
 * Ícones maiores para toque e texto centralizado.
 */

import { SOCIAL_LINKS, COPYRIGHT_TEXT, DEVELOPER_TEXT } from './types/footer.types';
import styles from './footer.mobile.module.css';

interface FooterMobileProps {
  year: number;
}

export const FooterMobile = ({ year }: FooterMobileProps) => {
  return (
    <footer className={styles.mobileFooterContainer}>

      {/* 1. Redes Sociais (Destaque em Mobile) */}
      <div className={styles.socialList}>
        {SOCIAL_LINKS.map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label={`Visit our ${social.label}`}
            // Em mobile, talvez não tenhamos hover, mas mantemos a cor se pressionado (active)
            >
              <Icon size={24} /> {/* Ícone um pouco maior que desktop */}
            </a>
          );
        })}
      </div>

      {/* 2. Blocos de Texto */}
      <div className={styles.textBlock}>
        <div>{DEVELOPER_TEXT}</div>
        <div>{COPYRIGHT_TEXT.replace('{year}', year.toString())}</div>
      </div>

    </footer>
  );
};
