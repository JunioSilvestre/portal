/**
 * @file footer.types.ts
 * @description Definições de Tipos e Constantes para o componente Footer.
 * @author Senior Engineer Logic
 * 
 * Este arquivo centraliza os dados e tipos do rodapé, facilitando a manutenção.
 * Se precisarmos adicionar uma nova rede social, basta alterar este arquivo.
 */

import { LucideIcon, Linkedin, Github, Instagram, Twitter } from 'lucide-react';

// Interface para Links de Navegação (se houver, além dos sociais)
export interface FooterLink {
    label: string;
    href: string;
}

// Interface para Redes Sociais
// Inclui a cor da marca para o efeito de hover "original color".
export interface SocialLink {
    label: string;
    href: string;
    icon: LucideIcon;
    color: string; // Cor original da marca (ex: #0077b5 para LinkedIn)
}

// Constante: Redes Sociais
// Single Source of Truth para os ícones e links sociais.
export const SOCIAL_LINKS: SocialLink[] = [
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/juniosilvestre/',
        icon: Linkedin,
        color: '#0077b5' // Azul LinkedIn
    },
    {
        label: 'GitHub',
        href: 'https://github.com/JunioSilvestre',
        icon: Github,
        color: '#ffffff' // Branco/Preto GitHub (vamos usar branco para contraste no fundo preto, ou roxo #6e5494)
    },
    {
        label: 'Instagram',
        href: 'https://instagram.com',
        icon: Instagram,
        color: '#E1306C' // Gradiente/Rosa Instagram
    },
    {
        label: 'Twitter',
        href: 'https://twitter.com',
        icon: Twitter,
        color: '#1DA1F2' // Azul Twitter
    }
];

// Constante: Texto de Copyright
// Usaremos um getter ou função no hook para pegar o ano atual dinamicamente, mas o texto base fica aqui.
export const COPYRIGHT_TEXT = "© {year} Portal. All rights reserved.";
export const DEVELOPER_TEXT = "Developed by JCSCode";
