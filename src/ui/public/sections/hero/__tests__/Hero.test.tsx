/**
 * @file Hero.test.tsx
 * @description Testes Unitários para a Seção Hero (Refined).
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Hero } from '../Hero';

// Mock do framer-motion para evitar erros de animação no JSDOM
jest.mock('framer-motion', () => ({
    motion: {
        div: ({ children, className }: { children: React.ReactNode; className?: string }) => <div className={className}>{children}</div>,
        h1: ({ children, className }: { children: React.ReactNode; className?: string }) => <h1 className={className}>{children}</h1>,
        p: ({ children, className }: { children: React.ReactNode; className?: string }) => <p className={className}>{children}</p>,
    },
}));

describe('Hero Section', () => {
    it('renders the main heading', () => {
        render(<Hero />);
        // Verifica se o título principal está presente (Regex flexível para quebra de linha)
        const heading = screen.getByRole('heading', { level: 1, name: /Intelligence for Modern Business/i });
        expect(heading).toBeInTheDocument();
    });

    it('renders the call to action buttons', () => {
        render(<Hero />);
        // Verifica se os botões existem (Start for free / Learn more)
        const startBtn = screen.getByRole('button', { name: /Start for free/i });
        const learnBtn = screen.getByRole('button', { name: /Learn more/i });

        expect(startBtn).toBeInTheDocument();
        expect(learnBtn).toBeInTheDocument();
    });

    it('renders the welcome/new badge', () => {
        render(<Hero />);
        expect(screen.getByText(/Portal v2.0 is now live/i)).toBeInTheDocument();
    });

    it('renders the dashboard preview', () => {
        render(<Hero />);
        expect(screen.getByText(/Interactive Dashboard UI/i)).toBeInTheDocument();
    });
});
