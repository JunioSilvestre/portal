/**
 * @file Hero.tsx
 * @description Componente da Seção Hero (Corporate Finance Style).
 * @author Senior Engineer Logic
 * 
 * Atualizações:
 * 1. Conteúdo focado em "Assessoria Financeira".
 * 2. Visual corporativo com cards brancos e métricas de impacto.
 * 3. Elementos de confiança (CVM, SOC2).
 */

'use client';

import Link from 'next/link';
import styles from './hero.module.css';
import { motion } from 'framer-motion';
import { Lock, BadgeCheck } from 'lucide-react';

export const Hero = () => {
  return (
    <section className={styles.heroContainer} aria-label="Introduction">
      {/* Background Sutil */}
      <div className={styles.backgroundOverlay} />
      <div className={`${styles.decorationBlob} ${styles.blob1}`} />
      <div className={`${styles.decorationBlob} ${styles.blob2}`} />

      <div className={styles.content}>

        {/* Título */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.title}
        >
          Assessoria Financeira <br />
          Estratégica
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={styles.subtitle}
        >
          Soluções corporativas para otimização de capital,
          gestão de riscos e planejamento financeiro de alta performance.
        </motion.p>

        {/* Metrics Card (White Box) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={styles.metricsCard}
        >
          <div className={styles.metricItem}>
            <span className={styles.metricValue}>R$ 3Bi+</span>
            <span className={styles.metricLabel}>Sob Gestão</span>
          </div>

          <div className={styles.metricDivider} />

          <div className={styles.metricItem}>
            <span className={styles.metricValue}>25</span>
            <span className={styles.metricLabel}>Anos de Mercado</span>
          </div>

          <div className={styles.metricDivider} />

          <div className={styles.metricItem}>
            <span className={styles.metricValue}>AAA</span>
            <span className={styles.metricLabel}>Rating Global</span>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={styles.ctaGroup}
        >
          <Link href="/contact">
            <button className={styles.primaryButton}>
              Solicitar Proposta
            </button>
          </Link>

          <Link href="/#about">
            <button className={styles.secondaryButton}>
              Falar com Time
            </button>
          </Link>
        </motion.div>

        {/* Certifications Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className={styles.certifications}
        >
          <div className={styles.certItem}>
            <BadgeCheck size={16} />
            <span>Certificado CVM</span>
          </div>
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#cbd5e1' }}></div>
          <div className={styles.certItem}>
            <Lock size={16} />
            <span>Auditado SOC2</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
