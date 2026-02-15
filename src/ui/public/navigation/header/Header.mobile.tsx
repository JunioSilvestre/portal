/**
 * @file Header.mobile.tsx
 * @description Mobile view of the Header. Displays a Hamburger menu that opens a content sheet/drawer.
 * @usage Imported and used in `Header.tsx` to display on small screens (md:hidden).
 * 
 * @senior_improvements
 * 1. Accessibility: Consider using `Radix UI Dialog` or `Headless UI` for robust focus management and screen reader support (Dialog Primitive).
 * 2. Performance: Add `will-change: transform` to the drawer CSS class to hint the browser about incoming animations.
 * 3. UX: Implement a "Swipe to Close" gesture using `framer-motion` drag constraints.
 * 4. Structure: Extract the `Backdrop` and `Drawer` into separate sub-components if they grow in complexity.
 */

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { NAVIGATION_LINKS } from './types/header.types';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './header.mobile.module.css';

interface HeaderMobileProps {
    isOpen: boolean;
    onToggle: () => void;
    onClose: () => void;
    onInteraction?: () => void; // Optional callback to reset auto-close timer
}

export const HeaderMobile = ({ isOpen, onToggle, onClose, onInteraction }: HeaderMobileProps) => {
    // Ref for detecting clicks outside the drawer
    const drawerRef = useRef<HTMLDivElement>(null);

    // Click Outside Logic
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isOpen && drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
                // Check if the click was on the hamburger button (which is outside the drawer)
                // We assume the hamburger button handles its own toggle, prevent double-close if needed
                // But strictly, clicking outside drawer should close it.
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onClose]);

    return (
        <div
            className={styles.mobileContainer}
            // Reset timer on any interaction within this container
            onMouseMove={onInteraction}
            onTouchStart={onInteraction}
            onClick={onInteraction}
        >
            {/* Hamburger Button */}
            <button
                onClick={onToggle}
                className={styles.hamburgerButton}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-menu-drawer"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop - Clicks here close the menu */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className={styles.backdrop}
                            onClick={onClose}
                            aria-hidden="true"
                        />

                        {/* Drawer - The actual menu content */}
                        <motion.div
                            id="mobile-menu-drawer"
                            ref={drawerRef}
                            role="dialog"
                            aria-modal="true"
                            aria-label="Mobile Navigation"
                            initial={{ opacity: 0, x: -50 }} /* Slide from left or just fade */
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className={styles.mobileDrawer}
                        >
                            <div className={styles.drawerHeader}>
                                {/* Optional: Close button inside drawer or Logo */}
                            </div>

                            <nav className={styles.mobileNav}>
                                {NAVIGATION_LINKS.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={onClose}
                                        className={styles.mobileNavLink}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>

                            <Link href="/get-starting" onClick={onClose} className="w-full">
                                <button className={styles.mobileGetStartingButton}>
                                    Get Starting
                                </button>
                            </Link>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};
