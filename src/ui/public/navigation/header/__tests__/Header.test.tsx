import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Header } from '../Header';
import { usePathname } from 'next/navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
    useRouter: jest.fn(() => ({
        push: jest.fn(),
    })),
}));

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('Header Component', () => {
    beforeEach(() => {
        (usePathname as jest.Mock).mockReturnValue('/');
    });

    it('renders the logo', () => {
        render(<Header />);
        expect(screen.getByText('JS')).toBeInTheDocument();
    });

    it('renders desktop navigation links', () => {
        render(<Header />);
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('About')).toBeInTheDocument();
        expect(screen.getByText('Works')).toBeInTheDocument();
        expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    it('highlights the active link', () => {
        (usePathname as jest.Mock).mockReturnValue('/about');
        render(<Header />);

        const aboutLink = screen.getByText('About');
        // Check if the link has the active class (mocked or checked via class presence)
        // Since we use CSS modules, checking strictly for class name might be brittle without identity-obj-proxy
        // But we check for aria-current which we added
        expect(aboutLink).toHaveAttribute('aria-current', 'page');
    });

    it('toggles mobile menu on interaction', () => {
        // Mock window.innerWidth to simulate mobile if needed, though our CSS hides things
        // Tests run in JSDOM, CSS isn't fully parsed, so we might see both desktop and mobile elements
        // unless we mock the CSS module or media queries.
        // For this test, we assume the mobile button is rendered (it is always rendered but hidden via CSS)

        render(<Header />);

        // Find hamburger button (aria-label="Open menu")
        const openButton = screen.getByLabelText('Open menu');
        expect(openButton).toBeInTheDocument();

        // Click to open
        fireEvent.click(openButton);

        // Check if menu is open (hamburger button label changes to "Close menu")
        const closeButton = screen.getByLabelText('Close menu');
        expect(closeButton).toBeInTheDocument();

        // Check if drawer content is visible
        const mobileNav = screen.getByLabelText('Mobile Navigation');
        expect(mobileNav).toBeInTheDocument();
    });
});
