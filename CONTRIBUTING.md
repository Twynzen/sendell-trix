# Contributing to sendell-trix

Thank you for your interest in contributing to sendell-trix! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+
- Git

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/sendell-trix.git
   cd sendell-trix
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Build all packages:
   ```bash
   pnpm build
   ```

## Development Workflow

### Running Storybook

```bash
pnpm storybook
```

This starts Storybook at http://localhost:6006.

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch
```

### Building

```bash
# Build all packages
pnpm build

# Build specific package
pnpm --filter sendell-trix build
```

### Linting

```bash
pnpm lint
pnpm lint:fix
```

## Project Structure

```
sendell-trix/
├── packages/
│   ├── tokens/       # Design tokens
│   ├── core/         # Web Components
│   └── react/        # React wrappers
├── apps/
│   └── docs/         # Storybook
└── tools/
    ├── tsconfig/     # Shared TypeScript config
    └── eslint-config/# Shared ESLint config
```

## Creating a New Component

1. Create component directory:
   ```bash
   mkdir packages/core/src/components/my-component
   ```

2. Create the component file (`st-my-component.ts`):
   ```typescript
   import { LitElement, html, css } from 'lit';
   import { customElement, property } from 'lit/decorators.js';

   @customElement('st-my-component')
   export class StMyComponent extends LitElement {
     static override styles = css`
       :host {
         display: block;
       }
     `;

     @property({ type: String })
     label = '';

     override render() {
       return html`<div>${this.label}</div>`;
     }
   }
   ```

3. Create tests (`st-my-component.test.ts`):
   ```typescript
   import { expect, fixture, html } from '@open-wc/testing';
   import './st-my-component.js';

   describe('st-my-component', () => {
     it('renders', async () => {
       const el = await fixture(html`<st-my-component></st-my-component>`);
       expect(el).to.exist;
     });
   });
   ```

4. Create Storybook story
5. Export from `index.ts`
6. Add React wrapper if applicable

## Commit Guidelines

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new button variant
fix: resolve focus state issue
docs: update README examples
style: format code
refactor: simplify input logic
test: add badge tests
chore: update dependencies
```

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes
3. Add tests for new functionality
4. Update documentation as needed
5. Create a changeset: `pnpm changeset`
6. Push and open a PR

### PR Checklist

- [ ] Tests pass (`pnpm test`)
- [ ] Lint passes (`pnpm lint`)
- [ ] Build succeeds (`pnpm build`)
- [ ] Accessibility checked
- [ ] Documentation updated
- [ ] Changeset added

## Design Guidelines

### Component Principles

1. **Accessibility first** - All components must be keyboard navigable and screen reader friendly
2. **Progressive enhancement** - Components should work without JavaScript where possible
3. **Respect user preferences** - Honor `prefers-reduced-motion` and color scheme preferences
4. **Framework-agnostic** - Components must work in any framework

### CSS Guidelines

- Use CSS custom properties for theming
- Prefix all custom properties with `--st-`
- Support CSS parts for styling
- Use `:host` for component-level styles

### TypeScript Guidelines

- Export types for all public APIs
- Use strict TypeScript configuration
- Document public methods and properties

## Questions?

Open an issue or discussion if you have questions.

Thank you for contributing! 🐇
