/**
 * @file Header.mobile.tsx
 * @description Componente Visual Mobile do Cabeçalho.
 * @author Senior Engineer Logic
 * 
 * Responsável por renderizar a interface de navegação em telas pequenas (celulares/tablets verticais).
 * Implementa um padrão de "Drawer" (gaveta lateral) e um botão "Hamburger".
 * 
 * Funcionalidades:
 * 1. Botão Hamburger animado (Ícones Menu/X).
 * 2. Drawer lateral com animação de entrada/saída (Slide In).
 * 3. Backdrop (fundo escuro) para focar a atenção e permitir fechar ao clicar fora.
 * 4. Fecha automaticamente ao clicar em um link.
 * 
 * @library framer-motion - Biblioteca poderosa para animações complexas em React (AnimatePresence, motion.div).
 * @library lucide-react - Conjunto de ícones leves e modernos (Menu, X).
 * @library react - Hooks (useRef, useEffect) para interações com o DOM.
 */

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { NAVIGATION_LINKS } from './types/header.types'; // Importa a lista de links (Single Source of Truth)
import { Menu, X } from 'lucide-react'; // Ícones
import { motion, AnimatePresence } from 'framer-motion'; // Animações
import styles from './header.mobile.module.css'; // Estilos isolados

// Interface de Props: Define contratualmente o que este componente precisa receber do Pai.
interface HeaderMobileProps {
    isOpen: boolean;             // O menu está aberto?
    onToggle: () => void;        // Função para inverter o estado (abrir <-> fechar)
    onClose: () => void;         // Função para fechar explicitamente
    onInteraction?: () => void;  // (Opcional) Função chamada ao interagir, para resetar timers de auto-close
}

export const HeaderMobile = ({ isOpen, onToggle, onClose, onInteraction }: HeaderMobileProps) => {
    // useRef: Cria uma referência direta a um elemento do DOM (neste caso, o Drawer).
    // Usamos isso para detectar cliques FORA do menu.
    const drawerRef = useRef<HTMLDivElement>(null);

    // --- Efeito: Click Outside (Fechar ao clicar fora) ---
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Se o menu estiver aberto E o clique foi em um elemento existente...
            // E o elemento clicado NÃO está dentro do drawer...
            if (isOpen && drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
                // ...então o usuário clicou fora! Fechamos o menu.
                onClose();
            }
        };

        // Adiciona o ouvinte de evento global ao documento se o menu estiver aberto
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Cleanup: Remove o ouvinte quando o componente desmontar ou o menu fechar.
        // Isso previne "Memory Leaks" e comportamentos estranhos.
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onClose]); // Dependências: re-executa se isOpen ou onClose mudarem.

    return (
        <div
            className={styles.mobileContainer}
            // Eventos de Interação: Qualquer movimento ou toque aqui avisa ao pai que o usuário está ativo.
            onMouseMove={onInteraction}
            onTouchStart={onInteraction}
            onClick={onInteraction}
        >
            {/* --- Botão Hamburger --- */}
            <button
                onClick={onToggle}
                className={styles.hamburgerButton}
                // Acessibilidade (ARIA): Explica para leitores de tela o que o botão faz.
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-menu-drawer"
            >
                {/* Renderização Condicional do Ícone: Mostra X se aberto, Menu se fechado */}
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* --- Área Animada (Drawer + Backdrop) --- */}
            {/* AnimatePresence: Permite animar componentes quando eles são REMOVIDOS da árvore DOM (unmount) */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* 1. Backdrop (Fundo Escuro) */}
                        <motion.div
                            initial={{ opacity: 0 }}      // Estado inicial (invisível)
                            animate={{ opacity: 1 }}      // Estado animado (visível)
                            exit={{ opacity: 0 }}         // Estado de saída (desaparece suavemente)
                            transition={{ duration: 0.2 }} // Duração da animação
                            className={styles.backdrop}
                            onClick={onClose}             // Clicar no escuro fecha o menu
                            aria-hidden="true"            // Esconde do leitor de tela (é puramente visual/funcional)
                        />

                        {/* 2. Drawer (O Menu Lateral) */}
                        <motion.div
                            id="mobile-menu-drawer"
                            ref={drawerRef}               // Conecta nossa referência para o "Click Outside"
                            role="dialog"                 // Semântica: é um diálogo/janela modal
                            aria-modal="true"             // Semântica: é modal (bloqueia o resto)
                            aria-label="Mobile Navigation"
                            // Animação de Slide: Vem da esquerda (x: -50) para o centro (x: 0)
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.2, ease: "easeOut" }} // Curva de animação suave
                            className={styles.mobileDrawer}
                        >
                            <div className={styles.drawerHeader}>
                                {/* Espaço reservado para cabeçalho interno do menu (ex: Logo interna) */}
                            </div>

                            {/* Lista de Links de Navegação */}
                            <nav className={styles.mobileNav}>
                                {/* Mapeamos o array NAVIGATION_LINKS para gerar os links dinamicamente.
                                    Isso facilita a manutenção: adicionar um link novo só requer mexer no arquivo de types. */}
                                {NAVIGATION_LINKS.map((link) => (
                                    <Link
                                        key={link.href}         // Key única é obrigatória em listas React
                                        href={link.href}
                                        onClick={onClose}       // IMPORTANTE: Fecha o menu ao clicar em um link
                                        className={styles.mobileNavLink}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>

                            {/* Botão de Ação (CTA) - Separado para destaque */}
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
