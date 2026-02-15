/**
 * @file Hero.tsx
 * @description Componente da Seção Hero (Refinado).
 * @author Senior Engineer Logic
 * 
 * Atualizações:
 * 1. Estilo "Big Tech" Clean (Fundo claro, tipografia suíça).
 * 2. Visual "Mockup" de Dashboard para tangibilizar o produto.
 * 3. Cores neutras e profissionais.
 */

'use client';

import Link from 'next/link';
import styles from './hero.module.css';
import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <section className={styles.heroContainer} aria-label="Introduction">
      {/* Background Sutil */}
      <div className={styles.backgroundOverlay} />
      <div className={`${styles.decorationBlob} ${styles.blob1}`} />
      <div className={`${styles.decorationBlob} ${styles.blob2}`} />

      <div className={styles.content}>

        {/* Badge "New" */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.badge}
        >
          <span className="mr-2">🎉</span>
          <span className="font-semibold text-black">New:</span> &nbsp; Portal v2.0 is now live
        </motion.div>

        {/* Título */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={styles.title}
        >
          Intelligence for <br />
          Modern Business.
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={styles.subtitle}
        >
          Experience the next generation of business management.
          Powerful, intuitive, and designed to help you scale effortlessly.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={styles.ctaGroup}
        >
          <Link href="/get-starting">
            <button className={styles.primaryButton}>
              Start for free
            </button>
          </Link>

          <Link href="/#about">
            <button className={styles.secondaryButton}>
              Learn more
            </button>
          </Link>
        </motion.div>

        {/* Dashboard Visual Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className={styles.dashboardPreview}
        >
          <div className={styles.mockupContent}>
            {/* Simulação de Interface (Pode ser uma imagem real aqui) */}
            <span>Interactive Dashboard UI</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
