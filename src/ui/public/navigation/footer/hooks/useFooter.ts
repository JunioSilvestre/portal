/**
 * @file useFooter.ts
 * @description Hook de Lógica para o Footer.
 * @author Senior Engineer Logic
 * 
 * Responsabilidades:
 * 1. Fornecer o ano atual dinamicamente para o Copyright.
 * 2. (Futuro) Gerenciar botão "Back to Top".
 */

import { useMemo } from 'react';

export const useFooter = () => {
    // useMemo: Memoriza o valor do ano atual.
    // Embora o ano mude raramente (uma vez por ano!), é uma boa prática 
    // para evitar recálculos desnecessários se o hook crescer.
    const currentYear = useMemo(() => new Date().getFullYear(), []);

    return {
        currentYear,
    };
};
