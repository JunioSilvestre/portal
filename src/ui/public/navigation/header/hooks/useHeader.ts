/**
 * @file useHeader.ts
 * @description Hook Customizado (Custom Hook) para a Lógica do Cabeçalho.
 * @author Senior Engineer Logic
 * 
 * Por que criar um Hook?
 * Para separar a LÓGICA (estado, efeitos, regras) da APRESENTAÇÃO (JSX, CSS).
 * Isso torna o componente visual mais limpo e a lógica mais testável e reutilizável.
 * 
 * Responsabilidades:
 * 1. Monitorar o Scroll da janela (para efeitos visuais).
 * 2. Controlar o abrir/fechar do Menu Mobile.
 * 3. Gerenciar o timer de inatividade (fechar menu automaticamente).
 */

import { useState, useEffect, useRef, useCallback } from 'react';

export const useHeader = () => {
    // --- ESTADOS (State) ---
    // useState: Guarda valores que, quando mudam, causam uma re-renderização do componente.
    const [isScrolled, setIsScrolled] = useState(false); // True se rolou > 50px
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // True se menu lateral aberto

    // --- REFS (Referência Mutável) ---
    // useRef: Guarda valores que persistem entre renderizações MAS NÃO causam re-render visual.
    // Perfeito para guardar IDs de timers, elementos DOM, ou valores "invisíveis".
    const autoCloseTimerRef = useRef<NodeJS.Timeout | null>(null);

    // --- EFEITO 1: Detecção de Scroll Otimizada ---
    useEffect(() => {
        let ticking = false; // Flag para controlar o Throttling (evitar execuções excessivas)

        const handleScroll = () => {
            // Se já existe um pedido de atualização agendado, ignoramos novos eventos de scroll
            // até que o navegador desenhe o quadro atual.
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    // Lógica real: verifica se o scroll Y é maior que 50 pixels
                    setIsScrolled(window.scrollY > 50);
                    ticking = false; // Libera a flag para o próximo quadro
                });
                ticking = true; // Bloqueia novas execuções imediatas
            }
        };

        // Adiciona o ouvinte ao evento 'scroll' da janela
        window.addEventListener('scroll', handleScroll);

        // Cleanup Function: Sempre remova listeners ao desmontar o componente!
        // Evita erros e memory leaks quando o usuário muda de página.
        return () => window.removeEventListener('scroll', handleScroll);
    }, [setIsScrolled]); // Dependência: recria o efeito apenas se setIsScrolled mudar (o que é raro/nunca acontece para setState)

    // --- AÇÕES DO MENU (Actions) ---
    // useCallback: Memoriza a função. Ela não é recriada em toda renderização, 
    // a menos que suas dependências mudem. Essencial quando passamos funções para useEffect ou filhos.

    // Ação: Fechar Menu
    const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

    // Ação: Alternar Menu (Toggle)
    const toggleMobileMenu = useCallback(() => setIsMobileMenuOpen((prev) => !prev), []);

    /**
     * Reseta o temporizador de auto-fechamento (10 segundos).
     * Deve ser chamado sempre que o usuário toca ou move o mouse no menu.
     */
    const resetAutoCloseTimer = useCallback(() => {
        // Se já existe um timer rodando, cancela ele antes de criar um novo.
        if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);

        // Só agendamos o timer se o menu estiver realmente aberto.
        if (isMobileMenuOpen) {
            autoCloseTimerRef.current = setTimeout(() => {
                console.log('Auto-closing mobile menu due to inactivity.');
                closeMobileMenu(); // Chama a ação de fechar
            }, 10000); // 10000ms = 10 segundos
        }
    }, [isMobileMenuOpen, closeMobileMenu]); // Dependências: precisa saber o estado atual e ter a função de fechar.

    // --- EFEITO 2: Gestão do Menu Mobile (Side Effects) ---
    useEffect(() => {
        if (isMobileMenuOpen) {
            // 1. Bloqueia o Scroll da página principal (Body Lock)
            // Impede que o fundo role enquanto o usuário tenta rolar o menu.
            document.body.style.overflow = 'hidden';

            // 2. Inicia o Timer de Segurança
            resetAutoCloseTimer();

            // 3. Ouve a tecla ESC para acessibilidade (fechar via teclado)
            const handleEsc = (e: KeyboardEvent) => {
                if (e.key === 'Escape') closeMobileMenu();
            };
            window.addEventListener('keydown', handleEsc);

            // Cleanup Function (Executa ao fechar o menu ou desmontar)
            return () => {
                // Restaura o scroll da página
                document.body.style.overflow = '';
                // Limpa o timer pendente
                if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);
                // Remove o listener de teclado
                window.removeEventListener('keydown', handleEsc);
            };
        }
    }, [isMobileMenuOpen, resetAutoCloseTimer, closeMobileMenu]); // Dependências completas

    // Retorna (Expoe) apenas o necessário para a View (Componente JSX)
    return {
        isScrolled,
        isMobileMenuOpen,
        toggleMobileMenu,
        closeMobileMenu,
        resetAutoCloseTimer,
    };
};
