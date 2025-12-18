import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

/**
 * Matrix-styled modal dialog component.
 *
 * @slot - Default slot for modal content
 * @slot header - Modal header content
 * @slot footer - Modal footer content (usually actions)
 *
 * @csspart modal - The modal container
 * @csspart backdrop - The backdrop overlay
 * @csspart dialog - The dialog element
 * @csspart header - The header section
 * @csspart body - The body section
 * @csspart footer - The footer section
 * @csspart close-button - The close button
 *
 * @fires st-open - Fired when the modal opens
 * @fires st-close - Fired when the modal closes
 * @fires st-cancel - Fired when the modal is cancelled (ESC or backdrop click)
 *
 * @example
 * ```html
 * <st-modal id="my-modal">
 *   <span slot="header">System Alert</span>
 *   <p>The Matrix has you...</p>
 *   <div slot="footer">
 *     <st-button variant="danger" onclick="document.getElementById('my-modal').close()">
 *       Red Pill
 *     </st-button>
 *   </div>
 * </st-modal>
 * ```
 */
@customElement('st-modal')
export class StModal extends LitElement {
  static override styles = css`
    :host {
      --_bg: var(--st-modal-background, var(--st-color-surface, #0d0d0d));
      --_border: var(--st-modal-border-color, var(--st-color-primary, #00ff41));
      --_text: var(--st-color-text-primary, #00ff41);
      --_backdrop: var(--st-modal-backdrop, rgba(0, 0, 0, 0.85));
      --_glow: var(--st-color-glow, #00ff41);
    }

    .modal {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 1050;
      overflow: auto;
      font-family: 'Fira Code', monospace;
    }

    .modal.open {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .backdrop {
      position: fixed;
      inset: 0;
      background: var(--_backdrop);
      animation: fadeIn 0.2s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .dialog {
      position: relative;
      background: var(--_bg);
      border: 1px solid var(--_border);
      color: var(--_text);
      width: 90%;
      max-width: 500px;
      max-height: 90vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      animation: slideIn 0.3s ease;
      box-shadow:
        0 0 30px rgba(0, 255, 65, 0.3),
        0 0 60px rgba(0, 255, 65, 0.1);
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-20px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    /* Scanline effect */
    .dialog::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        transparent 50%,
        rgba(0, 0, 0, 0.02) 50%
      );
      background-size: 100% 4px;
      pointer-events: none;
      z-index: 10;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      border-bottom: 1px solid var(--_border);
      background: rgba(0, 255, 65, 0.05);
    }

    .header-content {
      font-size: 14px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    .close-button {
      background: none;
      border: 1px solid var(--_border);
      color: var(--_text);
      width: 32px;
      height: 32px;
      cursor: pointer;
      font-family: 'Fira Code', monospace;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s, box-shadow 0.2s;
    }

    .close-button:hover {
      background: var(--_border);
      color: var(--_bg);
      box-shadow: 0 0 10px var(--_glow);
    }

    .close-button:focus {
      outline: 2px solid var(--_glow);
      outline-offset: 2px;
    }

    .body {
      padding: 20px;
      overflow-y: auto;
      flex: 1;
      font-size: 14px;
      line-height: 1.6;
    }

    .footer {
      padding: 16px 20px;
      border-top: 1px solid var(--_border);
      display: flex;
      gap: 12px;
      justify-content: flex-end;
    }

    .footer:empty {
      display: none;
    }

    /* Size variants */
    :host([size="small"]) .dialog {
      max-width: 350px;
    }

    :host([size="large"]) .dialog {
      max-width: 700px;
    }

    :host([size="fullscreen"]) .dialog {
      width: 100%;
      height: 100%;
      max-width: none;
      max-height: none;
      border: none;
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .backdrop,
      .dialog,
      .close-button {
        animation: none;
        transition: none;
      }
    }
  `;

  /**
   * Whether the modal is open
   * @attr open
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * Modal size
   * @attr size
   */
  @property({ type: String, reflect: true })
  size: 'small' | 'medium' | 'large' | 'fullscreen' = 'medium';

  /**
   * Whether clicking the backdrop closes the modal
   * @attr close-on-backdrop
   */
  @property({ type: Boolean, attribute: 'close-on-backdrop' })
  closeOnBackdrop = true;

  /**
   * Whether pressing ESC closes the modal
   * @attr close-on-escape
   */
  @property({ type: Boolean, attribute: 'close-on-escape' })
  closeOnEscape = true;

  /**
   * Whether to show the close button
   * @attr show-close
   */
  @property({ type: Boolean, attribute: 'show-close' })
  showClose = true;

  /**
   * Whether to prevent body scroll when open
   * @attr prevent-scroll
   */
  @property({ type: Boolean, attribute: 'prevent-scroll' })
  preventScroll = true;

  @query('.dialog')
  private _dialog!: HTMLElement;

  private _previousActiveElement?: Element | null;

  override connectedCallback() {
    super.connectedCallback();
    this._handleKeydown = this._handleKeydown.bind(this);
  }

  override updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('open')) {
      if (this.open) {
        this._onOpen();
      } else {
        this._onClose();
      }
    }
  }

  private _onOpen() {
    this._previousActiveElement = document.activeElement;

    if (this.preventScroll) {
      document.body.style.overflow = 'hidden';
    }

    document.addEventListener('keydown', this._handleKeydown);

    // Focus the dialog
    this.updateComplete.then(() => {
      const focusable = this._dialog?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      (focusable || this._dialog)?.focus();
    });

    this.dispatchEvent(new CustomEvent('st-open', {
      bubbles: true,
      composed: true
    }));
  }

  private _onClose() {
    if (this.preventScroll) {
      document.body.style.overflow = '';
    }

    document.removeEventListener('keydown', this._handleKeydown);

    // Restore focus
    if (this._previousActiveElement instanceof HTMLElement) {
      this._previousActiveElement.focus();
    }

    this.dispatchEvent(new CustomEvent('st-close', {
      bubbles: true,
      composed: true
    }));
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && this.closeOnEscape) {
      e.preventDefault();
      this._cancel();
    }

    // Trap focus within modal
    if (e.key === 'Tab') {
      this._trapFocus(e);
    }
  }

  private _trapFocus(e: KeyboardEvent) {
    const focusableElements = this._dialog?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (!focusableElements?.length) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }

  private _handleBackdropClick() {
    if (this.closeOnBackdrop) {
      this._cancel();
    }
  }

  private _cancel() {
    this.dispatchEvent(new CustomEvent('st-cancel', {
      bubbles: true,
      composed: true
    }));
    this.open = false;
  }

  override render() {
    return html`
      <div class="modal ${this.open ? 'open' : ''}" part="modal">
        <div
          class="backdrop"
          part="backdrop"
          @click=${this._handleBackdropClick}
        ></div>
        <div
          class="dialog"
          part="dialog"
          role="dialog"
          aria-modal="true"
          tabindex="-1"
        >
          <div class="header" part="header">
            <div class="header-content">
              <slot name="header"></slot>
            </div>
            ${this.showClose ? html`
              <button
                class="close-button"
                part="close-button"
                @click=${() => this._cancel()}
                aria-label="Close modal"
              >×</button>
            ` : ''}
          </div>
          <div class="body" part="body">
            <slot></slot>
          </div>
          <div class="footer" part="footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Opens the modal
   */
  public show() {
    this.open = true;
  }

  /**
   * Closes the modal
   */
  public close() {
    this.open = false;
  }

  /**
   * Toggles the modal
   */
  public toggle() {
    this.open = !this.open;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'st-modal': StModal;
  }
}
