/**
 * @file Hero.test.tsx
 * @description Testes Unitários para a Seção Hero (Corporate Finance).
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Hero } from '../Hero';

// Mock do framer-motion
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
        const heading = screen.getByRole('heading', { level: 1, name: /Assessoria Financeira/i });
        expect(heading).toBeInTheDocument();
    });

    it('renders the call to action buttons', () => {
        render(<Hero />);
        const proposalBtn = screen.getByRole('button', { name: /Solicitar Proposta/i });
        const talkBtn = screen.getByRole('button', { name: /Falar com Time/i });

        expect(proposalBtn).toBeInTheDocument();
        expect(talkBtn).toBeInTheDocument();
    });

    it('renders the metrics card', () => {
        render(<Hero />);
        expect(screen.getByText(/R\$ 3Bi\+/i)).toBeInTheDocument();
        expect(screen.getByText(/Sob Gestão/i)).toBeInTheDocument();
        expect(screen.getByText(/AAA/i)).toBeInTheDocument();
    });

    it('renders certification badges', () => {
        render(<Hero />);
        expect(screen.getByText(/Certificado CVM/i)).toBeInTheDocument();
        expect(screen.getByText(/Auditado SOC2/i)).toBeInTheDocument();
    });
});
