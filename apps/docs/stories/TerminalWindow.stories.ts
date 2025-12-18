import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import 'sendell-trix/terminal-window';

interface TerminalWindowArgs {
  title: string;
  noFlicker: boolean;
  noScanlines: boolean;
  showCursor: boolean;
  fullscreen: boolean;
  showButtons: boolean;
}

const meta: Meta<TerminalWindowArgs> = {
  title: 'Components/TerminalWindow',
  tags: ['autodocs'],
  component: 'st-terminal-window',
  argTypes: {
    title: {
      control: 'text',
      description: 'The terminal window title',
    },
    noFlicker: {
      control: 'boolean',
      description: 'Disable the CRT flicker effect',
    },
    noScanlines: {
      control: 'boolean',
      description: 'Disable the scanline overlay',
    },
    showCursor: {
      control: 'boolean',
      description: 'Show a blinking cursor',
    },
    fullscreen: {
      control: 'boolean',
      description: 'Enable fullscreen mode',
    },
    showButtons: {
      control: 'boolean',
      description: 'Show window control buttons',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Terminal-style window component with Matrix aesthetic.
Includes window chrome (traffic light buttons), scanline effects, and optional CRT flicker.

## Features
- Window control buttons (close, minimize, maximize)
- Scanline overlay effect
- CRT flicker animation
- Blinking cursor option
- Fullscreen mode
- Respects \`prefers-reduced-motion\`

## Usage
\`\`\`html
<st-terminal-window title="system@sendell-trix">
  <p>Wake up, Neo...</p>
  <p>The Matrix has you...</p>
</st-terminal-window>
\`\`\`
        `,
      },
    },
  },
  render: (args) => html`
    <st-terminal-window
      title=${args.title}
      ?no-flicker=${args.noFlicker}
      ?no-scanlines=${args.noScanlines}
      ?show-cursor=${args.showCursor}
      ?fullscreen=${args.fullscreen}
      .showButtons=${args.showButtons}
    >
      <p>Wake up, Neo...</p>
      <p>The Matrix has you...</p>
      <p>Follow the white rabbit.</p>
      <p>Knock, knock, Neo.</p>
    </st-terminal-window>
  `,
};

export default meta;
type Story = StoryObj<TerminalWindowArgs>;

export const Default: Story = {
  args: {
    title: 'terminal@sendell-trix',
    noFlicker: false,
    noScanlines: false,
    showCursor: false,
    fullscreen: false,
    showButtons: true,
  },
};

export const WithCursor: Story = {
  args: {
    title: 'neo@matrix',
    showCursor: true,
  },
};

export const NoEffects: Story = {
  args: {
    title: 'clean-terminal',
    noFlicker: true,
    noScanlines: true,
  },
};

export const CustomContent: Story = {
  render: () => html`
    <st-terminal-window title="morpheus@nebuchadnezzar">
      <pre style="margin: 0; color: #00ff41;">
$ ./decrypt_matrix.sh

Decrypting Matrix feed...
[████████████████████████████████] 100%

Connection established.
Agent activity detected in sector 7.

WARNING: Sentinels approaching.
EMP charged and ready.

> _
      </pre>
    </st-terminal-window>
  `,
};

export const CodeExample: Story = {
  render: () => html`
    <st-terminal-window title="code-example.ts" no-flicker>
      <pre style="margin: 0; font-size: 13px; line-height: 1.5;">
<span style="color: #ff79c6;">import</span> { Matrix } <span style="color: #ff79c6;">from</span> <span style="color: #f1fa8c;">'@sendell/trix'</span>;

<span style="color: #ff79c6;">const</span> neo = <span style="color: #ff79c6;">new</span> <span style="color: #50fa7b;">Matrix</span>.<span style="color: #8be9fd;">Entity</span>({
  name: <span style="color: #f1fa8c;">'Neo'</span>,
  role: <span style="color: #f1fa8c;">'The One'</span>,
  abilities: [
    <span style="color: #f1fa8c;">'bullet_dodge'</span>,
    <span style="color: #f1fa8c;">'flight'</span>,
    <span style="color: #f1fa8c;">'code_vision'</span>
  ]
});

<span style="color: #6272a4;">// Initialize the Matrix</span>
neo.<span style="color: #50fa7b;">awaken</span>();
      </pre>
    </st-terminal-window>
  `,
};

export const SystemLogs: Story = {
  render: () => html`
    <st-terminal-window title="system.log" show-cursor>
      <div style="font-size: 12px; line-height: 1.8;">
        <div>[<span style="color: #50fa7b;">INFO</span>] System initialized</div>
        <div>[<span style="color: #50fa7b;">INFO</span>] Loading Matrix construct...</div>
        <div>[<span style="color: #f1fa8c;">WARN</span>] Agent Smith detected in sector 4</div>
        <div>[<span style="color: #50fa7b;">INFO</span>] Dispatching countermeasures</div>
        <div>[<span style="color: #ff5555;">ERROR</span>] Connection to Zion interrupted</div>
        <div>[<span style="color: #50fa7b;">INFO</span>] Establishing backup route...</div>
        <div>[<span style="color: #50fa7b;">INFO</span>] Connection restored</div>
      </div>
    </st-terminal-window>
  `,
};
