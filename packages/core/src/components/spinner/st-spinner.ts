import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Matrix-styled loading spinner component.
 *
 * @csspart spinner - The spinner container
 *
 * @cssprop [--st-spinner-color=var(--st-color-primary)] - Spinner color
 * @cssprop [--st-spinner-size=40px] - Spinner size
 * @cssprop [--st-spinner-thickness=3px] - Spinner border thickness
 *
 * @example
 * ```html
 * <st-spinner></st-spinner>
 * <st-spinner size="large" variant="dots"></st-spinner>
 * <st-spinner label="Loading system..."></st-spinner>
 * ```
 */
@customElement('st-spinner')
export class StSpinner extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      --_color: var(--st-spinner-color, var(--st-color-primary, #00ff41));
      --_size: var(--st-spinner-size, 40px);
      --_thickness: var(--st-spinner-thickness, 3px);
    }

    /* Ring spinner (default) */
    .ring {
      width: var(--_size);
      height: var(--_size);
      border: var(--_thickness) solid rgba(0, 255, 65, 0.2);
      border-top-color: var(--_color);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* Dots variant */
    .dots {
      display: flex;
      gap: 8px;
    }

    .dots span {
      width: calc(var(--_size) / 4);
      height: calc(var(--_size) / 4);
      background: var(--_color);
      border-radius: 50%;
      animation: bounce 1.4s ease-in-out infinite;
    }

    .dots span:nth-child(1) { animation-delay: 0s; }
    .dots span:nth-child(2) { animation-delay: 0.2s; }
    .dots span:nth-child(3) { animation-delay: 0.4s; }

    @keyframes bounce {
      0%, 80%, 100% {
        transform: scale(0);
        opacity: 0.5;
      }
      40% {
        transform: scale(1);
        opacity: 1;
      }
    }

    /* Pulse variant */
    .pulse {
      width: var(--_size);
      height: var(--_size);
      background: var(--_color);
      border-radius: 50%;
      animation: pulse-grow 1.2s ease-in-out infinite;
    }

    @keyframes pulse-grow {
      0% {
        transform: scale(0);
        opacity: 1;
      }
      100% {
        transform: scale(1);
        opacity: 0;
      }
    }

    /* Matrix variant */
    .matrix {
      width: var(--_size);
      height: var(--_size);
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 3px;
    }

    .matrix span {
      background: var(--_color);
      animation: matrix-flicker 1s ease-in-out infinite;
    }

    .matrix span:nth-child(1) { animation-delay: 0.0s; }
    .matrix span:nth-child(2) { animation-delay: 0.1s; }
    .matrix span:nth-child(3) { animation-delay: 0.2s; }
    .matrix span:nth-child(4) { animation-delay: 0.3s; }
    .matrix span:nth-child(5) { animation-delay: 0.4s; }
    .matrix span:nth-child(6) { animation-delay: 0.5s; }
    .matrix span:nth-child(7) { animation-delay: 0.6s; }
    .matrix span:nth-child(8) { animation-delay: 0.7s; }
    .matrix span:nth-child(9) { animation-delay: 0.8s; }

    @keyframes matrix-flicker {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 1; }
    }

    /* Bars variant */
    .bars {
      display: flex;
      gap: 4px;
      align-items: center;
      height: var(--_size);
    }

    .bars span {
      width: calc(var(--_size) / 6);
      background: var(--_color);
      animation: bars 1s ease-in-out infinite;
    }

    .bars span:nth-child(1) { animation-delay: 0.0s; }
    .bars span:nth-child(2) { animation-delay: 0.1s; }
    .bars span:nth-child(3) { animation-delay: 0.2s; }
    .bars span:nth-child(4) { animation-delay: 0.3s; }
    .bars span:nth-child(5) { animation-delay: 0.4s; }

    @keyframes bars {
      0%, 100% { height: 20%; }
      50% { height: 100%; }
    }

    /* Label */
    .label {
      font-family: 'Fira Code', monospace;
      font-size: 12px;
      color: var(--_color);
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    /* Sizes */
    :host([size="small"]) {
      --_size: 24px;
      --_thickness: 2px;
    }

    :host([size="large"]) {
      --_size: 64px;
      --_thickness: 4px;
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .ring,
      .dots span,
      .pulse,
      .matrix span,
      .bars span {
        animation: none;
      }

      .ring {
        border: var(--_thickness) dotted var(--_color);
      }

      .dots span,
      .matrix span {
        opacity: 1;
      }

      .pulse {
        opacity: 0.5;
        transform: scale(0.5);
      }

      .bars span {
        height: 60%;
      }
    }
  `;

  /**
   * Spinner variant/style
   * @attr variant
   */
  @property({ type: String })
  variant: 'ring' | 'dots' | 'pulse' | 'matrix' | 'bars' = 'ring';

  /**
   * Spinner size
   * @attr size
   */
  @property({ type: String, reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Loading label text
   * @attr label
   */
  @property({ type: String })
  label = '';

  override render() {
    return html`
      ${this._renderSpinner()}
      ${this.label ? html`<span class="label">${this.label}</span>` : ''}
    `;
  }

  private _renderSpinner() {
    switch (this.variant) {
      case 'dots':
        return html`
          <div class="dots" part="spinner" role="status" aria-label="Loading">
            <span></span>
            <span></span>
            <span></span>
          </div>
        `;
      case 'pulse':
        return html`
          <div class="pulse" part="spinner" role="status" aria-label="Loading"></div>
        `;
      case 'matrix':
        return html`
          <div class="matrix" part="spinner" role="status" aria-label="Loading">
            <span></span><span></span><span></span>
            <span></span><span></span><span></span>
            <span></span><span></span><span></span>
          </div>
        `;
      case 'bars':
        return html`
          <div class="bars" part="spinner" role="status" aria-label="Loading">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        `;
      default:
        return html`
          <div class="ring" part="spinner" role="status" aria-label="Loading"></div>
        `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'st-spinner': StSpinner;
  }
}
