/**
 * @file Footer.desktop.tsx
 * @description Componente Visual Desktop do Rodapé.
 * @author Senior Engineer Logic
 * 
 * Exibe os links sociais e copyright em uma linha horizontal organizada.
 */


import { SOCIAL_LINKS, COPYRIGHT_TEXT, DEVELOPER_TEXT } from './types/footer.types';
import styles from './footer.module.css';

interface FooterDesktopProps {
  year: number;
}

export const FooterDesktop = ({ year }: FooterDesktopProps) => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.contentWrapper}>

        {/* Esquerda: Copyright */}
        <div className={styles.copyright}>
          {COPYRIGHT_TEXT.replace('{year}', year.toString())}
        </div>

        {/* Centro: Redes Sociais */}
        <ul className={styles.socialList}>
          {SOCIAL_LINKS.map((social) => {
            const Icon = social.icon;
            return (
              <li key={social.label} className={styles.socialItem}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={`Visit our ${social.label}`}
                  // Truque CSS-in-JS: Variáveis CSS dinâmicas para o hover
                  style={{
                    '--hover-color': social.color
                  } as React.CSSProperties}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = social.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = ''; // Reseta para o CSS (branco)
                  }}
                >
                  <Icon size={20} />
                </a>
              </li>
            );
          })}
        </ul>

        {/* Direita: Desenvolvedor */}
        <div className={styles.developer}>
          {DEVELOPER_TEXT}
        </div>

      </div>
    </footer>
  );
};
