/**
 * Sendell-Trix React Components
 * React wrappers for sendell-trix Web Components
 *
 * @packageDocumentation
 */

import { createComponent, EventName } from '@lit/react';
import * as React from 'react';

// Import Web Components
import { StButton } from 'sendell-trix/button';
import { StInput } from 'sendell-trix/input';
import { StTerminalWindow } from 'sendell-trix/terminal-window';
import { StMatrixRain } from 'sendell-trix/matrix-rain';
import { StGlitchText } from 'sendell-trix/glitch-text';
import { StCard } from 'sendell-trix/card';
import { StBadge } from 'sendell-trix/badge';
import { StSpinner } from 'sendell-trix/spinner';
import { StModal } from 'sendell-trix/modal';
import { StTooltip } from 'sendell-trix/tooltip';

/**
 * Matrix-styled button component
 *
 * @example
 * ```tsx
 * import { Button } from '@sendell-trix/react';
 *
 * function App() {
 *   return (
 *     <Button
 *       variant="filled"
 *       onStClick={() => console.log('clicked')}
 *     >
 *       Enter the Matrix
 *     </Button>
 *   );
 * }
 * ```
 */
export const Button = createComponent({
  tagName: 'st-button',
  elementClass: StButton,
  react: React,
  events: {
    onStClick: 'st-click' as EventName<CustomEvent<{ originalEvent: MouseEvent }>>,
  },
});

/**
 * Matrix-styled input component
 *
 * @example
 * ```tsx
 * import { Input } from '@sendell-trix/react';
 *
 * function App() {
 *   const [value, setValue] = useState('');
 *
 *   return (
 *     <Input
 *       label="Username"
 *       value={value}
 *       onStInput={(e) => setValue(e.detail.value)}
 *     />
 *   );
 * }
 * ```
 */
export const Input = createComponent({
  tagName: 'st-input',
  elementClass: StInput,
  react: React,
  events: {
    onStInput: 'st-input' as EventName<CustomEvent<{ value: string }>>,
    onStChange: 'st-change' as EventName<CustomEvent<{ value: string }>>,
    onStFocus: 'st-focus' as EventName<CustomEvent>,
    onStBlur: 'st-blur' as EventName<CustomEvent>,
  },
});

/**
 * Terminal-style window component
 *
 * @example
 * ```tsx
 * import { TerminalWindow } from '@sendell-trix/react';
 *
 * function App() {
 *   return (
 *     <TerminalWindow title="system@matrix">
 *       <p>Wake up, Neo...</p>
 *     </TerminalWindow>
 *   );
 * }
 * ```
 */
export const TerminalWindow = createComponent({
  tagName: 'st-terminal-window',
  elementClass: StTerminalWindow,
  react: React,
  events: {
    onStClose: 'st-close' as EventName<CustomEvent>,
    onStMinimize: 'st-minimize' as EventName<CustomEvent>,
    onStMaximize: 'st-maximize' as EventName<CustomEvent<{ fullscreen: boolean }>>,
  },
});

/**
 * Matrix rain animation component
 *
 * @example
 * ```tsx
 * import { MatrixRain } from '@sendell-trix/react';
 *
 * function App() {
 *   return (
 *     <MatrixRain
 *       style={{ width: '100%', height: '400px' }}
 *       speed={1.5}
 *       density={7}
 *     />
 *   );
 * }
 * ```
 */
export const MatrixRain = createComponent({
  tagName: 'st-matrix-rain',
  elementClass: StMatrixRain,
  react: React,
});

/**
 * Glitch text effect component
 *
 * @example
 * ```tsx
 * import { GlitchText } from '@sendell-trix/react';
 *
 * function App() {
 *   return (
 *     <GlitchText intensity="high">
 *       SYSTEM ERROR
 *     </GlitchText>
 *   );
 * }
 * ```
 */
export const GlitchText = createComponent({
  tagName: 'st-glitch-text',
  elementClass: StGlitchText,
  react: React,
});

/**
 * Card component
 *
 * @example
 * ```tsx
 * import { Card } from '@sendell-trix/react';
 *
 * function App() {
 *   return (
 *     <Card variant="glow" interactive>
 *       <span slot="header">Card Title</span>
 *       <p>Card content</p>
 *     </Card>
 *   );
 * }
 * ```
 */
export const Card = createComponent({
  tagName: 'st-card',
  elementClass: StCard,
  react: React,
  events: {
    onStClick: 'st-click' as EventName<CustomEvent>,
  },
});

/**
 * Badge component
 *
 * @example
 * ```tsx
 * import { Badge } from '@sendell-trix/react';
 *
 * function App() {
 *   return (
 *     <Badge variant="success" dot pulse>
 *       ONLINE
 *     </Badge>
 *   );
 * }
 * ```
 */
export const Badge = createComponent({
  tagName: 'st-badge',
  elementClass: StBadge,
  react: React,
});

/**
 * Spinner/loading component
 *
 * @example
 * ```tsx
 * import { Spinner } from '@sendell-trix/react';
 *
 * function App() {
 *   return <Spinner variant="matrix" label="Loading..." />;
 * }
 * ```
 */
export const Spinner = createComponent({
  tagName: 'st-spinner',
  elementClass: StSpinner,
  react: React,
});

/**
 * Modal dialog component
 *
 * @example
 * ```tsx
 * import { Modal, Button } from '@sendell-trix/react';
 * import { useState } from 'react';
 *
 * function App() {
 *   const [open, setOpen] = useState(false);
 *
 *   return (
 *     <>
 *       <Button onStClick={() => setOpen(true)}>Open Modal</Button>
 *       <Modal
 *         open={open}
 *         onStClose={() => setOpen(false)}
 *       >
 *         <span slot="header">Confirm</span>
 *         <p>Are you ready to enter the Matrix?</p>
 *       </Modal>
 *     </>
 *   );
 * }
 * ```
 */
export const Modal = createComponent({
  tagName: 'st-modal',
  elementClass: StModal,
  react: React,
  events: {
    onStOpen: 'st-open' as EventName<CustomEvent>,
    onStClose: 'st-close' as EventName<CustomEvent>,
    onStCancel: 'st-cancel' as EventName<CustomEvent>,
  },
});

/**
 * Tooltip component
 *
 * @example
 * ```tsx
 * import { Tooltip, Button } from '@sendell-trix/react';
 *
 * function App() {
 *   return (
 *     <Tooltip content="Click to proceed">
 *       <Button>Hover me</Button>
 *     </Tooltip>
 *   );
 * }
 * ```
 */
export const Tooltip = createComponent({
  tagName: 'st-tooltip',
  elementClass: StTooltip,
  react: React,
});

// Re-export types
export type { StButton, StInput, StTerminalWindow, StMatrixRain, StGlitchText, StCard, StBadge, StSpinner, StModal, StTooltip };
