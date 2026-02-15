/**
 * @file Header.desktop.tsx
 * @description Desktop view of the Header. Displays the Logo and Navigation Links horizontally.
 * @usage Imported and used in `Header.tsx` to display on large screens (hidden on mobile).
 * 
 * @senior_improvements
 * 1. Active State: Implement `usePathname` to highlight the active link (e.g., bold or different color when on '/about').
 * 2. Scalability: If the menu items come from an API (CMS), consider passing them as props rather than importing a constant.
 * 3. Interaction: Add a `HoverCard` or Dropdown menu for nested navigation items if the site grows.
 * 4. Memoization: If the list is large, `useMemo` for the mapped links could prevent unnecessary re-renders (premature opt here, but good practice for large lists).
 */

import Link from 'next/link';
import { NAVIGATION_LINKS } from './types/header.types';
import styles from './header.module.css'; // Import the CSS module

import { usePathname } from 'next/navigation';

export const HeaderDesktop = () => {
  const pathname = usePathname();

  return (
    <div className={styles.desktopNavContainer}>
      <nav className={styles.navLinksWrapper}>
        {NAVIGATION_LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${isActive ? styles.activeNavLink : ''}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* "Get Starting" Button - styling based on header state */}
      <Link href="/get-starting">
        <button
          className={styles.getStartingButton}
        >
          Get Starting
        </button>
      </Link>
    </div>
  );
};
