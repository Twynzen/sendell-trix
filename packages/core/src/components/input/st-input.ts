import { LitElement, html, css } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';

/**
 * Matrix-styled input component with glowing focus states.
 *
 * @slot prefix - Content to display before the input
 * @slot suffix - Content to display after the input
 *
 * @csspart input - The native input element
 * @csspart label - The label element
 * @csspart help-text - The help text element
 * @csspart error-text - The error message element
 *
 * @fires st-input - Fired when the input value changes (on input)
 * @fires st-change - Fired when the input value changes (on change/blur)
 * @fires st-focus - Fired when the input receives focus
 * @fires st-blur - Fired when the input loses focus
 *
 * @example
 * ```html
 * <st-input label="Username" placeholder="Enter username"></st-input>
 * <st-input type="password" label="Password"></st-input>
 * <st-input label="Email" type="email" invalid error-message="Invalid email"></st-input>
 * ```
 */
@customElement('st-input')
export class StInput extends LitElement {
  static override styles = css`
    :host {
      display: block;
      --_border: var(--st-input-border-color, var(--st-color-border-default, #00ff41));
      --_text: var(--st-input-color, var(--st-color-text-primary, #00ff41));
      --_bg: var(--st-input-background, var(--st-color-background, #000000));
      --_glow: var(--st-color-glow, #00ff41);
      --_muted: var(--st-color-text-muted, #006600);
      --_danger: var(--st-color-state-danger, #ff0000);
    }

    .field {
      position: relative;
    }

    label {
      display: block;
      color: var(--_text);
      font-family: 'Fira Code', monospace;
      font-size: 12px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 8px;
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      background: var(--_bg);
      border: 1px solid var(--_border);
      transition: box-shadow 0.3s, border-color 0.3s;
    }

    .input-wrapper:focus-within {
      border-color: var(--_glow);
      box-shadow:
        0 0 5px var(--_glow),
        inset 0 0 5px rgba(0, 255, 65, 0.1);
    }

    input {
      flex: 1;
      width: 100%;
      padding: 12px 16px;
      font-size: 16px;
      font-family: 'Fira Code', monospace;
      background: transparent;
      border: none;
      color: var(--_text);
      outline: none;
      box-sizing: border-box;
    }

    input::placeholder {
      color: var(--_muted);
    }

    input:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    ::slotted([slot="prefix"]),
    ::slotted([slot="suffix"]) {
      display: flex;
      align-items: center;
      color: var(--_muted);
      padding: 0 12px;
    }

    .help-text,
    .error-text {
      font-family: 'Fira Code', monospace;
      font-size: 12px;
      margin-top: 4px;
    }

    .help-text {
      color: var(--_muted);
    }

    .error-text {
      color: var(--_danger);
    }

    /* Invalid state */
    :host([invalid]) .input-wrapper {
      border-color: var(--_danger);
    }

    :host([invalid]) .input-wrapper:focus-within {
      box-shadow: 0 0 5px var(--_danger);
    }

    :host([invalid]) label {
      color: var(--_danger);
    }

    /* Required indicator */
    .required {
      color: var(--_danger);
      margin-left: 4px;
    }

    /* Clearable */
    .clear-button {
      padding: 8px 12px;
      background: none;
      border: none;
      color: var(--_muted);
      cursor: pointer;
      font-family: 'Fira Code', monospace;
      font-size: 16px;
      transition: color 0.2s;
    }

    .clear-button:hover {
      color: var(--_text);
    }

    /* Character count */
    .char-count {
      font-family: 'Fira Code', monospace;
      font-size: 11px;
      color: var(--_muted);
      text-align: right;
      margin-top: 4px;
    }

    .char-count.warning {
      color: var(--st-color-state-warning, #ffff00);
    }

    .char-count.danger {
      color: var(--_danger);
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .input-wrapper,
      .clear-button {
        transition: none;
      }
    }
  `;

  /**
   * The input label
   * @attr label
   */
  @property({ type: String })
  label = '';

  /**
   * The input type
   * @attr type
   */
  @property({ type: String })
  type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' = 'text';

  /**
   * The input placeholder
   * @attr placeholder
   */
  @property({ type: String })
  placeholder = '';

  /**
   * The input value
   * @attr value
   */
  @property({ type: String })
  value = '';

  /**
   * Input name for form submission
   * @attr name
   */
  @property({ type: String })
  name = '';

  /**
   * Help text displayed below the input
   * @attr help-text
   */
  @property({ type: String, attribute: 'help-text' })
  helpText = '';

  /**
   * Error message displayed when invalid
   * @attr error-message
   */
  @property({ type: String, attribute: 'error-message' })
  errorMessage = '';

  /**
   * Whether the input is in an invalid state
   * @attr invalid
   */
  @property({ type: Boolean, reflect: true })
  invalid = false;

  /**
   * Whether the input is disabled
   * @attr disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the input is readonly
   * @attr readonly
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * Whether the input is required
   * @attr required
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Whether to show a clear button
   * @attr clearable
   */
  @property({ type: Boolean })
  clearable = false;

  /**
   * Maximum length of input
   * @attr maxlength
   */
  @property({ type: Number })
  maxlength?: number;

  /**
   * Minimum length of input
   * @attr minlength
   */
  @property({ type: Number })
  minlength?: number;

  /**
   * Pattern for validation
   * @attr pattern
   */
  @property({ type: String })
  pattern?: string;

  /**
   * Autocomplete hint
   * @attr autocomplete
   */
  @property({ type: String })
  autocomplete = 'off';

  /**
   * Whether to show character count
   * @attr show-count
   */
  @property({ type: Boolean, attribute: 'show-count' })
  showCount = false;

  @query('input')
  private _input!: HTMLInputElement;

  @state()
  private _focused = false;

  override render() {
    const charCount = this.value.length;
    const charCountClass = this.maxlength
      ? charCount >= this.maxlength ? 'danger'
        : charCount >= this.maxlength * 0.9 ? 'warning'
        : ''
      : '';

    return html`
      <div class="field">
        ${this.label ? html`
          <label part="label">
            ${this.label}
            ${this.required ? html`<span class="required">*</span>` : ''}
          </label>
        ` : ''}

        <div class="input-wrapper">
          <slot name="prefix"></slot>
          <input
            part="input"
            type=${this.type}
            .value=${live(this.value)}
            placeholder=${this.placeholder}
            name=${this.name}
            ?disabled=${this.disabled}
            ?readonly=${this.readonly}
            ?required=${this.required}
            maxlength=${ifDefined(this.maxlength)}
            minlength=${ifDefined(this.minlength)}
            pattern=${ifDefined(this.pattern)}
            autocomplete=${this.autocomplete}
            aria-invalid=${this.invalid}
            aria-describedby=${this.helpText || this.errorMessage ? 'helper' : undefined}
            @input=${this._onInput}
            @change=${this._onChange}
            @focus=${this._onFocus}
            @blur=${this._onBlur}
          />
          ${this.clearable && this.value && !this.disabled ? html`
            <button
              class="clear-button"
              type="button"
              tabindex="-1"
              @click=${this._onClear}
              aria-label="Clear input"
            >×</button>
          ` : ''}
          <slot name="suffix"></slot>
        </div>

        ${this.invalid && this.errorMessage ? html`
          <div class="error-text" part="error-text" id="helper" role="alert">
            ${this.errorMessage}
          </div>
        ` : this.helpText ? html`
          <div class="help-text" part="help-text" id="helper">
            ${this.helpText}
          </div>
        ` : ''}

        ${this.showCount && this.maxlength ? html`
          <div class="char-count ${charCountClass}">
            ${charCount} / ${this.maxlength}
          </div>
        ` : ''}
      </div>
    `;
  }

  private _onInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;

    this.dispatchEvent(new CustomEvent('st-input', {
      bubbles: true,
      composed: true,
      detail: { value: this.value }
    }));
  }

  private _onChange(e: Event) {
    this.dispatchEvent(new CustomEvent('st-change', {
      bubbles: true,
      composed: true,
      detail: { value: this.value }
    }));
  }

  private _onFocus(e: FocusEvent) {
    this._focused = true;
    this.dispatchEvent(new CustomEvent('st-focus', {
      bubbles: true,
      composed: true
    }));
  }

  private _onBlur(e: FocusEvent) {
    this._focused = false;
    this.dispatchEvent(new CustomEvent('st-blur', {
      bubbles: true,
      composed: true
    }));
  }

  private _onClear() {
    this.value = '';
    this._input?.focus();

    this.dispatchEvent(new CustomEvent('st-input', {
      bubbles: true,
      composed: true,
      detail: { value: '' }
    }));

    this.dispatchEvent(new CustomEvent('st-change', {
      bubbles: true,
      composed: true,
      detail: { value: '' }
    }));
  }

  /**
   * Focuses the input
   */
  public override focus(options?: FocusOptions) {
    this._input?.focus(options);
  }

  /**
   * Blurs the input
   */
  public override blur() {
    this._input?.blur();
  }

  /**
   * Selects all text in the input
   */
  public select() {
    this._input?.select();
  }

  /**
   * Reports validity of the input
   */
  public reportValidity(): boolean {
    return this._input?.reportValidity() ?? true;
  }

  /**
   * Checks validity of the input
   */
  public checkValidity(): boolean {
    return this._input?.checkValidity() ?? true;
  }

  /**
   * Sets a custom validity message
   */
  public setCustomValidity(message: string) {
    this._input?.setCustomValidity(message);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'st-input': StInput;
  }
}
