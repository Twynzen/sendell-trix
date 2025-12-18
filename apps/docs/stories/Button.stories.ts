import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import 'sendell-trix/button';

interface ButtonArgs {
  variant: 'outline' | 'filled' | 'danger' | 'ghost';
  size: 'small' | 'medium' | 'large';
  disabled: boolean;
  loading: boolean;
  label: string;
}

const meta: Meta<ButtonArgs> = {
  title: 'Components/Button',
  tags: ['autodocs'],
  component: 'st-button',
  argTypes: {
    variant: {
      control: 'select',
      options: ['outline', 'filled', 'danger', 'ghost'],
      description: 'The visual style variant of the button',
      table: {
        defaultValue: { summary: 'outline' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the button',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button shows a loading spinner',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
      description: 'The button label text',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Matrix-styled button component with neon glow effects.

## Features
- Multiple variants: outline, filled, danger, ghost
- Three sizes: small, medium, large
- Loading state with spinner
- Full keyboard accessibility
- Respects \`prefers-reduced-motion\`

## Usage
\`\`\`html
<st-button>Enter the Matrix</st-button>
<st-button variant="filled">Take the Red Pill</st-button>
<st-button variant="danger">System Override</st-button>
\`\`\`
        `,
      },
    },
  },
  render: (args) => html`
    <st-button
      variant=${args.variant}
      size=${args.size}
      ?disabled=${args.disabled}
      ?loading=${args.loading}
    >
      ${args.label}
    </st-button>
  `,
};

export default meta;
type Story = StoryObj<ButtonArgs>;

export const Primary: Story = {
  args: {
    variant: 'outline',
    size: 'medium',
    label: 'ENTER THE MATRIX',
    disabled: false,
    loading: false,
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    label: 'TAKE THE RED PILL',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    label: 'SYSTEM OVERRIDE',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    label: 'GHOST BUTTON',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'SMALL',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'LARGE BUTTON',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'outline',
    label: 'ACCESS DENIED',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    variant: 'filled',
    label: 'PROCESSING',
    loading: true,
  },
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
      <st-button variant="outline">Outline</st-button>
      <st-button variant="filled">Filled</st-button>
      <st-button variant="danger">Danger</st-button>
      <st-button variant="ghost">Ghost</st-button>
    </div>
  `,
};

export const AllSizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
      <st-button size="small">Small</st-button>
      <st-button size="medium">Medium</st-button>
      <st-button size="large">Large</st-button>
    </div>
  `,
};
