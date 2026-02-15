/**
 * @file About.tsx
 * @description Componente da Seção Sobre Nós (Refinado).
 * @author Senior Engineer Logic
 * 
 * Atualizações:
 * 1. Cards "Ricos" com mini-gráficos e tabelas visuais CSS.
 * 2. Layout mais compacto e denso.
 * 3. Foco em "Data-Driven" visuals.
 */

'use client';

import styles from './about.module.css';
import { motion } from 'framer-motion';
import { BarChart3, Users, Zap } from 'lucide-react';

export const About = () => {
    return (
        <section id="about" className={styles.aboutContainer} aria-label="About Us">
            <div className={styles.contentWrapper}>

                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Built for Scale</h2>
                    <p className={styles.sectionSubtitle}>
                        Our platform processes millions of data points to give you
                        actionable insights in real-time.
                    </p>
                </div>

                <div className={styles.cardsGrid}>

                    {/* Card 1: Analytics (Bar Chart) */}
                    <motion.div
                        className={styles.richCard}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className={styles.iconBox}>
                            <BarChart3 size={20} />
                        </div>
                        <h3 className={styles.cardTitle}>Real-time Analytics</h3>
                        <p className={styles.cardDescription}>
                            Monitor your performance with precision. Live data updates every second.
                        </p>
                        {/* Visual Mini Chart */}
                        <div className={styles.chartPlaceholder}>
                            <div className={styles.bar} style={{ height: '40%' }}></div>
                            <div className={styles.bar} style={{ height: '70%' }}></div>
                            <div className={styles.bar} style={{ height: '50%' }}></div>
                            <div className={styles.bar} style={{ height: '90%' }}></div>
                            <div className={styles.bar} style={{ height: '60%' }}></div>
                        </div>
                    </motion.div>

                    {/* Card 2: Team/Management (Table) */}
                    <motion.div
                        className={styles.richCard}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className={styles.iconBox}>
                            <Users size={20} />
                        </div>
                        <h3 className={styles.cardTitle}>Team Management</h3>
                        <p className={styles.cardDescription}>
                            Organize your workforce with smart roles and permissions tables.
                        </p>
                        {/* Visual Mini Table */}
                        <div className={styles.tablePlaceholder}>
                            <div className={styles.tableRow} style={{ width: '40%' }}></div>
                            <div className={styles.tableRow} style={{ width: '80%' }}></div>
                            <div className={styles.tableRow} style={{ width: '90%' }}></div>
                            <div className={styles.tableRow} style={{ width: '70%' }}></div>
                        </div>
                    </motion.div>

                    {/* Card 3: Speed/Efficiency (Abstract) */}
                    <motion.div
                        className={styles.richCard}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className={styles.iconBox}>
                            <Zap size={20} />
                        </div>
                        <h3 className={styles.cardTitle}>Lightning Fast</h3>
                        <p className={styles.cardDescription}>
                            Optimized for speed. Load large datasets in milliseconds without lag.
                        </p>
                        {/* Visual Speed Indicator */}
                        <div className={styles.tablePlaceholder}>
                            <div style={{
                                height: '4px',
                                width: '100%',
                                background: 'linear-gradient(90deg, #3b82f6 0%, transparent 100%)',
                                borderRadius: '2px'
                            }}></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: '10px', color: '#a3a3a3' }}>
                                <span>0ms</span>
                                <span>100ms</span>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};
