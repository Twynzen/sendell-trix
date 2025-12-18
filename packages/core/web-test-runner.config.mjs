import { playwrightLauncher } from '@web/test-runner-playwright';

export default {
  files: 'src/**/*.test.ts',
  nodeResolve: true,

  browsers: [
    playwrightLauncher({ product: 'chromium' }),
    playwrightLauncher({ product: 'firefox' }),
    playwrightLauncher({ product: 'webkit' }),
  ],

  coverage: true,
  coverageConfig: {
    report: true,
    reportDir: 'coverage',
    reporters: ['html', 'lcov', 'text-summary'],
    threshold: {
      statements: 80,
      branches: 70,
      functions: 80,
      lines: 80,
    },
    include: ['src/**/*.ts'],
    exclude: ['**/*.stories.ts', '**/*.test.ts', '**/index.ts', '**/define.ts'],
  },

  testFramework: {
    config: {
      timeout: 5000,
    },
  },

  // Transform TypeScript
  plugins: [
    {
      name: 'transform-ts',
      async transform(context) {
        if (context.path.endsWith('.ts')) {
          const { transformSync } = await import('esbuild');
          const { code } = transformSync(context.body, {
            loader: 'ts',
            sourcemap: 'inline',
            target: 'es2022',
          });
          return code;
        }
      },
    },
  ],
};
