import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import 'sendell-trix/card';

interface CardArgs {
  variant: 'flat' | 'elevated' | 'glow';
  interactive: boolean;
}

const meta: Meta<CardArgs> = {
  title: 'Components/Card',
  tags: ['autodocs'],
  component: 'st-card',
  argTypes: {
    variant: {
      control: 'select',
      options: ['flat', 'elevated', 'glow'],
      description: 'Card visual style',
    },
    interactive: {
      control: 'boolean',
      description: 'Whether the card is clickable',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Matrix-styled card component with neon border glow.

## Features
- Three variants: flat, elevated, glow
- Interactive (hoverable) mode
- Header and footer slots

## Usage
\`\`\`html
<st-card>
  <div slot="header">Card Title</div>
  <p>Card content goes here...</p>
  <div slot="footer">Footer actions</div>
</st-card>
\`\`\`
        `,
      },
    },
  },
  render: (args) => html`
    <st-card variant=${args.variant} ?interactive=${args.interactive}>
      <span slot="header">SYSTEM STATUS</span>
      <p style="margin: 0;">All systems operational. Matrix connection stable.</p>
      <span slot="footer">Last updated: now</span>
    </st-card>
  `,
};

export default meta;
type Story = StoryObj<CardArgs>;

export const Default: Story = {
  args: {
    variant: 'flat',
    interactive: false,
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
  },
};

export const Glow: Story = {
  args: {
    variant: 'glow',
  },
};

export const Interactive: Story = {
  args: {
    variant: 'flat',
    interactive: true,
  },
};

export const CardGrid: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; max-width: 800px;">
      <st-card variant="glow" interactive>
        <span slot="header">NEO</span>
        <p style="margin: 0; font-size: 14px;">Status: Awake<br/>Location: Construct</p>
      </st-card>
      <st-card variant="glow" interactive>
        <span slot="header">MORPHEUS</span>
        <p style="margin: 0; font-size: 14px;">Status: Active<br/>Location: Nebuchadnezzar</p>
      </st-card>
      <st-card variant="glow" interactive>
        <span slot="header">TRINITY</span>
        <p style="margin: 0; font-size: 14px;">Status: Active<br/>Location: The Matrix</p>
      </st-card>
    </div>
  `,
};
