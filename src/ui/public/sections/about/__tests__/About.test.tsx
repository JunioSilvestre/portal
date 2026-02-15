/**
 * @file About.test.tsx
 * @description Testes Unitários para a Seção About (Refined).
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../About';

// Mock Framer Motion
jest.mock('framer-motion', () => ({
    motion: {
        div: ({ children, className }: { children: React.ReactNode; className?: string }) => <div className={className}>{children}</div>,
    },
}));

// Mock Lucide Icons (já que são usados no componente)
jest.mock('lucide-react', () => ({
    BarChart3: () => <svg data-testid="icon-analytics" />,
    Users: () => <svg data-testid="icon-users" />,
    Zap: () => <svg data-testid="icon-zap" />,
}));

describe('About Section', () => {
    it('renders the section title', () => {
        render(<About />);
        expect(screen.getByText('Built for Scale')).toBeInTheDocument();
    });

    it('renders the rich cards with titles', () => {
        render(<About />);
        expect(screen.getByText('Real-time Analytics')).toBeInTheDocument();
        expect(screen.getByText('Team Management')).toBeInTheDocument();
        expect(screen.getByText('Lightning Fast')).toBeInTheDocument();
    });

    it('renders the descriptive text', () => {
        render(<About />);
        expect(screen.getByText(/Our platform processes millions of data points/i)).toBeInTheDocument();
    });
});
