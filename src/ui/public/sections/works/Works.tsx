/**
 * ============================================================================
 * FILE: Works.tsx
 * LAYER: ui
 * TYPE: component
 * ============================================================================
 *
 * PURPOSE:
 * -> Showcase portfolio/projects to demonstrate expertise.
 * -> Allow users to filter/explore past work.
 *
 * RESPONSIBILITY:
 * -> Render grid of project cards.
 * -> Handle filtering logic (Category selection).
 *
 * ARCHITECTURE POSITION:
 * -> Landing Page Section.
 *
 * DATA FLOW:
 * -> Project Data Array -> Filter Logic -> Filtered Array -> Render.
 *
 * SECURITY:
 * -> Public component.
 *
 * PERFORMANCE:
 * -> Filter operations on client-side (small dataset).
 * -> Use layout animations (Framer Motion) carefully.
 *
 * IMPROVEMENTS:
 * -> Pagination if project list grows large.
 *
 * STATUS:
 * -> Stable
 *
 * ============================================================================
 */

'use client';

import { useState } from 'react';
import styles from './works.module.css';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data
const PROJECTS = [
    { id: 1, title: 'E-Commerce Dashboard', category: 'Web App' },
    { id: 2, title: 'Fitness Tracker', category: 'Mobile App' },
    { id: 3, title: 'Agency Portfolio', category: 'Landing Page' },
    { id: 4, title: 'SaaS Analytics', category: 'Web App' },
    { id: 5, title: 'Meditation Guide', category: 'Mobile App' },
    { id: 6, title: 'Restaurant Booking', category: 'Web App' },
];

const CATEGORIES = ['All', 'Web App', 'Mobile App', 'Landing Page'];

export const Works = () => {
    const [activeFilter, setActiveFilter] = useState('All');

    // Lógica de Filtro
    const filteredProjects = activeFilter === 'All'
        ? PROJECTS
        : PROJECTS.filter(p => p.category === activeFilter);

    return (
        <section id="works" className={styles.worksContainer} aria-label="Selected Works">
            <div className={styles.contentWrapper}>

                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Selected Works</h2>
                    <p className={styles.sectionSubtitle}>A showcase of our best projects.</p>
                </div>

                {/* Filtros */}
                <div className={styles.filterContainer}>
                    {CATEGORIES.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveFilter(category)}
                            className={`${styles.filterButton} ${activeFilter === category ? styles.activeFilter : ''}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Grid AnimatePresence para animações de entrada/saída */}
                <motion.div layout className={styles.projectsGrid}>
                    <AnimatePresence>
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className={styles.projectCard}
                            >
                                {/* Placeholder de Imagem */}
                                <div className={styles.projectImagePlaceholder}>
                                    Project Img
                                </div>

                                {/* Overlay de Informação (Hover) */}
                                <div className={styles.projectOverlay}>
                                    <h3 className={styles.projectTitle}>{project.title}</h3>
                                    <span className={styles.projectCategory}>{project.category}</span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

            </div>
        </section>
    );
};
