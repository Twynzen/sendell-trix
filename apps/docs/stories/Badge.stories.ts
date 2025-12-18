import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import 'sendell-trix/badge';

interface BadgeArgs {
  variant: 'default' | 'success' | 'danger' | 'warning' | 'info';
  size: 'small' | 'medium' | 'large';
  dot: boolean;
  pulse: boolean;
  filled: boolean;
  glow: boolean;
  label: string;
}

const meta: Meta<BadgeArgs> = {
  title: 'Components/Badge',
  tags: ['autodocs'],
  component: 'st-badge',
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'danger', 'warning', 'info'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    dot: { control: 'boolean' },
    pulse: { control: 'boolean' },
    filled: { control: 'boolean' },
    glow: { control: 'boolean' },
    label: { control: 'text' },
  },
  render: (args) => html`
    <st-badge
      variant=${args.variant}
      size=${args.size}
      ?dot=${args.dot}
      ?pulse=${args.pulse}
      ?filled=${args.filled}
      ?glow=${args.glow}
    >
      ${args.label}
    </st-badge>
  `,
};

export default meta;
type Story = StoryObj<BadgeArgs>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'medium',
    dot: false,
    pulse: false,
    filled: false,
    glow: false,
    label: 'ONLINE',
  },
};

export const WithDot: Story = {
  args: {
    variant: 'success',
    dot: true,
    label: 'CONNECTED',
  },
};

export const PulsingDot: Story = {
  args: {
    variant: 'danger',
    dot: true,
    pulse: true,
    label: 'ALERT',
  },
};

export const Filled: Story = {
  args: {
    variant: 'default',
    filled: true,
    label: 'ACTIVE',
  },
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 12px; flex-wrap: wrap;">
      <st-badge>DEFAULT</st-badge>
      <st-badge variant="success">SUCCESS</st-badge>
      <st-badge variant="danger">DANGER</st-badge>
      <st-badge variant="warning">WARNING</st-badge>
      <st-badge variant="info">INFO</st-badge>
    </div>
  `,
};

export const StatusIndicators: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <st-badge variant="success" dot pulse>SYSTEM ONLINE</st-badge>
      <st-badge variant="warning" dot>MAINTENANCE MODE</st-badge>
      <st-badge variant="danger" dot pulse>CRITICAL ERROR</st-badge>
      <st-badge variant="info" dot>UPDATING</st-badge>
    </div>
  `,
};
