import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Terminal-style window component with Matrix aesthetic.
 * Includes window chrome (traffic light buttons), scanline effects, and optional CRT flicker.
 *
 * @slot - The terminal content
 * @slot header - Custom header content
 *
 * @csspart terminal - The outer terminal container
 * @csspart header - The terminal header bar
 * @csspart title - The terminal title
 * @csspart content - The terminal content area
 * @csspart buttons - The window button container
 *
 * @cssprop [--st-terminal-background=var(--st-color-surface)] - Terminal background
 * @cssprop [--st-terminal-border-color=var(--st-color-primary)] - Terminal border color
 * @cssprop [--st-terminal-text-color=var(--st-color-text-primary)] - Terminal text color
 *
 * @example
 * ```html
 * <st-terminal-window title="system@sendell-trix">
 *   <p>Wake up, Neo...</p>
 *   <p>The Matrix has you...</p>
 * </st-terminal-window>
 * ```
 */
@customElement('st-terminal-window')
export class StTerminalWindow extends LitElement {
  static override styles = css`
    :host {
      display: block;
      --_bg: var(--st-terminal-background, var(--st-color-surface, #0d0d0d));
      --_border: var(--st-terminal-border-color, var(--st-color-primary, #00ff41));
      --_text: var(--st-terminal-text-color, var(--st-color-text-primary, #00ff41));
      --_glow: var(--st-color-glow, #00ff41);
    }

    .terminal {
      background: var(--_bg);
      border: 1px solid var(--_border);
      border-radius: 8px;
      overflow: hidden;
      font-family: 'Fira Code', 'Source Code Pro', monospace;
      box-shadow:
        0 0 10px rgba(0, 255, 65, 0.2),
        inset 0 0 50px rgba(0, 255, 65, 0.03);
    }

    .header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      background: rgba(0, 255, 65, 0.1);
      border-bottom: 1px solid var(--_border);
    }

    .buttons {
      display: flex;
      gap: 6px;
    }

    .btn {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      transition: transform 0.1s, filter 0.1s;
    }

    .btn:hover {
      transform: scale(1.1);
      filter: brightness(1.2);
    }

    .btn:active {
      transform: scale(0.95);
    }

    .btn-close { background: #ff5f56; }
    .btn-minimize { background: #ffbd2e; }
    .btn-maximize { background: #27ca40; }

    .title {
      flex: 1;
      text-align: center;
      font-size: 12px;
      color: var(--_text);
      opacity: 0.7;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .content {
      padding: 16px;
      min-height: 200px;
      color: var(--_text);
      font-size: 14px;
      line-height: 1.6;
      position: relative;
    }

    /* Scanline overlay */
    :host(:not([no-scanlines])) .content::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        transparent 50%,
        rgba(0, 0, 0, 0.03) 50%
      );
      background-size: 100% 4px;
      pointer-events: none;
      z-index: 1;
    }

    /* CRT flicker effect */
    @keyframes flicker {
      0%, 18%, 22%, 25%, 53%, 57%, 100% {
        opacity: 1;
      }
      20%, 24%, 55% {
        opacity: 0.94;
      }
    }

    :host(:not([no-flicker])) .content {
      animation: flicker 0.15s infinite;
    }

    /* Prompt cursor */
    .prompt {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .prompt-symbol {
      color: var(--_border);
    }

    .cursor {
      display: inline-block;
      width: 8px;
      height: 16px;
      background: var(--_text);
      animation: blink 1s step-end infinite;
    }

    @keyframes blink {
      50% { opacity: 0; }
    }

    /* Fullscreen mode */
    :host([fullscreen]) {
      position: fixed;
      inset: 0;
      z-index: 9999;
    }

    :host([fullscreen]) .terminal {
      height: 100%;
      border-radius: 0;
    }

    :host([fullscreen]) .content {
      height: calc(100% - 50px);
      overflow: auto;
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      :host(:not([no-flicker])) .content {
        animation: none;
      }

      .content::before {
        display: none;
      }

      .cursor {
        animation: none;
      }

      .btn {
        transition: none;
      }
    }
  `;

  /**
   * The terminal window title
   * @attr title
   */
  @property({ type: String })
  override title = 'terminal@sendell-trix';

  /**
   * Disable the flicker animation
   * @attr no-flicker
   */
  @property({ type: Boolean, attribute: 'no-flicker', reflect: true })
  noFlicker = false;

  /**
   * Disable the scanline overlay
   * @attr no-scanlines
   */
  @property({ type: Boolean, attribute: 'no-scanlines', reflect: true })
  noScanlines = false;

  /**
   * Show the cursor
   * @attr show-cursor
   */
  @property({ type: Boolean, attribute: 'show-cursor' })
  showCursor = false;

  /**
   * Whether the terminal is in fullscreen mode
   * @attr fullscreen
   */
  @property({ type: Boolean, reflect: true })
  fullscreen = false;

  /**
   * Whether to show the window buttons
   * @attr show-buttons
   */
  @property({ type: Boolean, attribute: 'show-buttons' })
  showButtons = true;

  override render() {
    return html`
      <div class="terminal" part="terminal">
        <div class="header" part="header">
          ${this.showButtons ? html`
            <div class="buttons" part="buttons">
              <button
                class="btn btn-close"
                @click=${this._onClose}
                aria-label="Close"
                title="Close"
              ></button>
              <button
                class="btn btn-minimize"
                @click=${this._onMinimize}
                aria-label="Minimize"
                title="Minimize"
              ></button>
              <button
                class="btn btn-maximize"
                @click=${this._onMaximize}
                aria-label="Maximize"
                title="Maximize"
              ></button>
            </div>
          ` : ''}
          <slot name="header">
            <span class="title" part="title">${this.title}</span>
          </slot>
          ${this.showButtons ? html`<div class="buttons" style="visibility: hidden;"></div>` : ''}
        </div>
        <div class="content" part="content">
          <slot></slot>
          ${this.showCursor ? html`
            <div class="prompt">
              <span class="prompt-symbol">$</span>
              <span class="cursor"></span>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  private _onClose() {
    this.dispatchEvent(new CustomEvent('st-close', {
      bubbles: true,
      composed: true
    }));
  }

  private _onMinimize() {
    this.dispatchEvent(new CustomEvent('st-minimize', {
      bubbles: true,
      composed: true
    }));
  }

  private _onMaximize() {
    this.fullscreen = !this.fullscreen;
    this.dispatchEvent(new CustomEvent('st-maximize', {
      bubbles: true,
      composed: true,
      detail: { fullscreen: this.fullscreen }
    }));
  }

  /**
   * Toggle fullscreen mode
   */
  public toggleFullscreen() {
    this.fullscreen = !this.fullscreen;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'st-terminal-window': StTerminalWindow;
  }
}
