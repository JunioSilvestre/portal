/**
 * @file header.types.ts
 * @description Type definitions and Constants for the Header component.
 * @usage Imported in `Header.tsx`, `Header.mobile.tsx`, and `Header.desktop.tsx` for type safety and data.
 * 
 * @senior_improvements
 * 1. Type Safety: Use a Template Literal Type or Union Type for `href` to strictly enforce valid routes (e.g., `type Route = '/' | '/about' | ...`) ensuring broken links are caught at compile time.
 * 2. Scalability: Group links by region (e.g., `HEADER_LINKS`, `FOOTER_LINKS`) or user role (e.g., `GUEST_LINKS`, `USER_LINKS`).
 * 3. Iconography: Extend `NavLink` interface to include an optional `icon` (LucideIcon) for richer menus.
 */

export type AppRoute = '/' | '/about' | '/works' | '/contact' | '/get-starting';

export interface NavLink {
    label: string;
    href: AppRoute;
}

export interface HeaderProps {
    /**
     * Transparent header on top of hero section?
     * @default true
     */
    transparent?: boolean;
}

export const NAVIGATION_LINKS: NavLink[] = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Works', href: '/works' },
    { label: 'Contact', href: '/contact' },
];
