/**
 * @file Footer.test.tsx
 * @description Testes Unitários para o componente Footer.
 * Verifica se o Copyright, Desenvolvedor e Ícones sociais são renderizados corretamente.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from '../Footer';
import { SOCIAL_LINKS } from '../types/footer.types';

// Mock dos sub-componentes para focar no teste de integração ou lógica principal?
// Na verdade, como Footer compõe Desktop e Mobile que são escondidos via CSS,
// o JSDOM vai renderizar AMBOS. O teste vai ver duplicatas se buscarmos por texto genérico.
// Vamos testar se os elementos essenciais estão presentes no documento.

describe('Footer Component', () => {
    it('renders the developer credit', () => {
        render(<Footer />);
        // Como temos versão mobile e desktop, esperamos ver o texto 2 vezes.
        const developerTexts = screen.getAllByText(/Developed by JCSCode/i);
        expect(developerTexts.length).toBeGreaterThanOrEqual(1);
    });

    it('renders the copyright with current year', () => {
        render(<Footer />);
        const currentYear = new Date().getFullYear();
        // Regex para encontrar o Copyright com o ano dinâmico
        const copyrightPattern = new RegExp(`© ${currentYear} Portal`, 'i');
        const copyrights = screen.getAllByText(copyrightPattern);
        expect(copyrights.length).toBeGreaterThanOrEqual(1);
    });

    it('renders all social media links', () => {
        render(<Footer />);

        SOCIAL_LINKS.forEach(social => {
            // Buscamos pelo aria-label ou href
            // getAllByRole 'link' pode ser muitos, melhor filtrar.
            const links = screen.getAllByRole('link', { name: new RegExp(social.label, 'i') });
            expect(links.length).toBeGreaterThanOrEqual(1);
            expect(links[0]).toHaveAttribute('href', social.href);
        });
    });
});
