import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

const config = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts', 'public/**'],
  },
  {
    rules: {
      // Deuda técnica conocida (validadores de /api y MDXContent): se muestra
      // como aviso para no bloquear el CI mientras se tipa poco a poco.
      '@typescript-eslint/no-explicit-any': 'warn',
      // Regla nueva de React 19: los efectos marcados reinician el estado de
      // carga al cambiar de pestaña a propósito, no son bugs.
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
  {
    // Componentes generados por shadcn/ui.
    files: ['components/ui/**'],
    rules: { '@typescript-eslint/no-empty-object-type': 'off' },
  },
  {
    // Archivos de configuración en CommonJS.
    files: ['**/*.config.{js,cjs,ts}'],
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
];

export default config;
