import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Glitch text effect component with customizable intensity.
 * Creates a cyberpunk-style text distortion effect.
 *
 * @slot - Text content to apply the glitch effect to
 *
 * @csspart text - The main text element
 *
 * @cssprop [--st-glitch-color=var(--st-color-text-primary)] - Main text color
 * @cssprop [--st-glitch-color-1=#0ff] - First glitch layer color (cyan)
 * @cssprop [--st-glitch-color-2=#f0f] - Second glitch layer color (magenta)
 *
 * @example
 * ```html
 * <st-glitch-text>ENTER THE MATRIX</st-glitch-text>
 * <st-glitch-text intensity="high">SYSTEM FAILURE</st-glitch-text>
 * <st-glitch-text text="HELLO WORLD"></st-glitch-text>
 * ```
 */
@customElement('st-glitch-text')
export class StGlitchText extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
      --_color: var(--st-glitch-color, var(--st-color-text-primary, #00ff41));
      --_glitch-1: var(--st-glitch-color-1, #0ff);
      --_glitch-2: var(--st-glitch-color-2, #f0f);
    }

    .glitch {
      position: relative;
      font-family: 'Fira Code', 'Share Tech Mono', monospace;
      font-size: inherit;
      font-weight: inherit;
      color: var(--_color);
      letter-spacing: 0.1em;
    }

    .glitch::before,
    .glitch::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.8;
    }

    .glitch::before {
      animation: glitch-1 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
      color: var(--_glitch-1);
      z-index: -1;
      clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
    }

    .glitch::after {
      animation: glitch-2 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both infinite;
      color: var(--_glitch-2);
      z-index: -2;
      clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
    }

    @keyframes glitch-1 {
      0% { transform: translate(0); }
      20% { transform: translate(-3px, 3px); }
      40% { transform: translate(-3px, -3px); }
      60% { transform: translate(3px, 3px); }
      80% { transform: translate(3px, -3px); }
      100% { transform: translate(0); }
    }

    @keyframes glitch-2 {
      0% { transform: translate(0); }
      20% { transform: translate(3px, -3px); }
      40% { transform: translate(3px, 3px); }
      60% { transform: translate(-3px, -3px); }
      80% { transform: translate(-3px, 3px); }
      100% { transform: translate(0); }
    }

    /* Intensity: low */
    :host([intensity="low"]) .glitch::before,
    :host([intensity="low"]) .glitch::after {
      animation-duration: 0.6s;
      opacity: 0.5;
    }

    :host([intensity="low"]) .glitch::before {
      animation-name: glitch-low-1;
    }

    :host([intensity="low"]) .glitch::after {
      animation-name: glitch-low-2;
    }

    @keyframes glitch-low-1 {
      0%, 100% { transform: translate(0); }
      50% { transform: translate(-1px, 1px); }
    }

    @keyframes glitch-low-2 {
      0%, 100% { transform: translate(0); }
      50% { transform: translate(1px, -1px); }
    }

    /* Intensity: high */
    :host([intensity="high"]) .glitch::before,
    :host([intensity="high"]) .glitch::after {
      animation-duration: 0.1s;
    }

    :host([intensity="high"]) .glitch::before {
      animation-name: glitch-high-1;
    }

    :host([intensity="high"]) .glitch::after {
      animation-name: glitch-high-2;
    }

    @keyframes glitch-high-1 {
      0% { transform: translate(0); clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%); }
      10% { transform: translate(-5px, 5px); clip-path: polygon(0 20%, 100% 20%, 100% 50%, 0 50%); }
      20% { transform: translate(5px, -5px); clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%); }
      30% { transform: translate(-3px, 0); clip-path: polygon(0 0, 100% 0, 100% 20%, 0 20%); }
      40% { transform: translate(3px, 3px); clip-path: polygon(0 40%, 100% 40%, 100% 60%, 0 60%); }
      50% { transform: translate(0, -5px); clip-path: polygon(0 80%, 100% 80%, 100% 100%, 0 100%); }
      60% { transform: translate(-5px, 5px); clip-path: polygon(0 10%, 100% 10%, 100% 30%, 0 30%); }
      70% { transform: translate(5px, 0); clip-path: polygon(0 50%, 100% 50%, 100% 70%, 0 70%); }
      80% { transform: translate(0, 5px); clip-path: polygon(0 70%, 100% 70%, 100% 90%, 0 90%); }
      90% { transform: translate(-3px, -3px); clip-path: polygon(0 30%, 100% 30%, 100% 50%, 0 50%); }
      100% { transform: translate(0); clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%); }
    }

    @keyframes glitch-high-2 {
      0% { transform: translate(0); clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%); }
      10% { transform: translate(5px, -5px); clip-path: polygon(0 50%, 100% 50%, 100% 80%, 0 80%); }
      20% { transform: translate(-5px, 5px); clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%); }
      30% { transform: translate(3px, 0); clip-path: polygon(0 80%, 100% 80%, 100% 100%, 0 100%); }
      40% { transform: translate(-3px, -3px); clip-path: polygon(0 40%, 100% 40%, 100% 60%, 0 60%); }
      50% { transform: translate(0, 5px); clip-path: polygon(0 0%, 100% 0%, 100% 20%, 0 20%); }
      60% { transform: translate(5px, -5px); clip-path: polygon(0 70%, 100% 70%, 100% 90%, 0 90%); }
      70% { transform: translate(-5px, 0); clip-path: polygon(0 30%, 100% 30%, 100% 50%, 0 50%); }
      80% { transform: translate(0, -5px); clip-path: polygon(0 10%, 100% 10%, 100% 30%, 0 30%); }
      90% { transform: translate(3px, 3px); clip-path: polygon(0 50%, 100% 50%, 100% 70%, 0 70%); }
      100% { transform: translate(0); clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%); }
    }

    /* Intensity: extreme */
    :host([intensity="extreme"]) .glitch::before,
    :host([intensity="extreme"]) .glitch::after {
      animation-duration: 0.05s;
    }

    /* No effect / static */
    :host([intensity="none"]) .glitch::before,
    :host([intensity="none"]) .glitch::after {
      animation: none;
      display: none;
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .glitch::before,
      .glitch::after {
        animation: none;
        display: none;
      }
    }
  `;

  /**
   * The text to display (alternative to slot)
   * @attr text
   */
  @property({ type: String })
  text = '';

  /**
   * The intensity of the glitch effect
   * @attr intensity
   */
  @property({ type: String, reflect: true })
  intensity: 'none' | 'low' | 'medium' | 'high' | 'extreme' = 'medium';

  override render() {
    const displayText = this.text || this.textContent || '';

    return html`
      <span class="glitch" part="text" data-text=${displayText}>
        <slot>${displayText}</slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'st-glitch-text': StGlitchText;
  }
}
