import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import './st-input.js';
import type { StInput } from './st-input.js';

describe('st-input', () => {
  it('renders with default properties', async () => {
    const el = await fixture<StInput>(html`<st-input></st-input>`);

    expect(el.type).to.equal('text');
    expect(el.value).to.equal('');
    expect(el.disabled).to.be.false;
    expect(el.invalid).to.be.false;
  });

  it('renders label when provided', async () => {
    const el = await fixture<StInput>(html`<st-input label="Username"></st-input>`);

    const label = el.shadowRoot?.querySelector('label');
    expect(label).to.exist;
    expect(label?.textContent).to.include('Username');
  });

  it('renders placeholder', async () => {
    const el = await fixture<StInput>(
      html`<st-input placeholder="Enter text..."></st-input>`
    );

    const input = el.shadowRoot?.querySelector('input');
    expect(input?.placeholder).to.equal('Enter text...');
  });

  it('updates value on input', async () => {
    const el = await fixture<StInput>(html`<st-input></st-input>`);

    const input = el.shadowRoot?.querySelector('input')!;
    input.value = 'test value';
    input.dispatchEvent(new Event('input'));

    expect(el.value).to.equal('test value');
  });

  it('dispatches st-input event on input', async () => {
    const el = await fixture<StInput>(html`<st-input></st-input>`);

    const input = el.shadowRoot?.querySelector('input')!;
    setTimeout(() => {
      input.value = 'hello';
      input.dispatchEvent(new Event('input'));
    });

    const event = await oneEvent(el, 'st-input');
    expect(event.detail.value).to.equal('hello');
  });

  it('dispatches st-change event on change', async () => {
    const el = await fixture<StInput>(html`<st-input></st-input>`);

    const input = el.shadowRoot?.querySelector('input')!;
    setTimeout(() => {
      input.value = 'changed';
      input.dispatchEvent(new Event('change'));
    });

    const event = await oneEvent(el, 'st-change');
    expect(event.detail.value).to.equal('changed');
  });

  it('dispatches st-focus and st-blur events', async () => {
    const el = await fixture<StInput>(html`<st-input></st-input>`);

    const input = el.shadowRoot?.querySelector('input')!;

    setTimeout(() => input.dispatchEvent(new FocusEvent('focus')));
    await oneEvent(el, 'st-focus');

    setTimeout(() => input.dispatchEvent(new FocusEvent('blur')));
    await oneEvent(el, 'st-blur');
  });

  it('renders help text', async () => {
    const el = await fixture<StInput>(
      html`<st-input help-text="This is help text"></st-input>`
    );

    const helpText = el.shadowRoot?.querySelector('.help-text');
    expect(helpText).to.exist;
    expect(helpText?.textContent).to.equal('This is help text');
  });

  it('renders error message when invalid', async () => {
    const el = await fixture<StInput>(
      html`<st-input invalid error-message="Invalid input"></st-input>`
    );

    const errorText = el.shadowRoot?.querySelector('.error-text');
    expect(errorText).to.exist;
    expect(errorText?.textContent).to.equal('Invalid input');
  });

  it('shows required indicator', async () => {
    const el = await fixture<StInput>(
      html`<st-input label="Email" required></st-input>`
    );

    const required = el.shadowRoot?.querySelector('.required');
    expect(required).to.exist;
    expect(required?.textContent).to.equal('*');
  });

  it('shows clear button when clearable and has value', async () => {
    const el = await fixture<StInput>(
      html`<st-input clearable value="test"></st-input>`
    );

    const clearButton = el.shadowRoot?.querySelector('.clear-button');
    expect(clearButton).to.exist;
  });

  it('clears value when clear button clicked', async () => {
    const el = await fixture<StInput>(
      html`<st-input clearable value="test"></st-input>`
    );

    const clearButton = el.shadowRoot?.querySelector('.clear-button')!;
    (clearButton as HTMLButtonElement).click();

    expect(el.value).to.equal('');
  });

  it('shows character count', async () => {
    const el = await fixture<StInput>(
      html`<st-input show-count maxlength="100" value="hello"></st-input>`
    );

    const charCount = el.shadowRoot?.querySelector('.char-count');
    expect(charCount).to.exist;
    expect(charCount?.textContent).to.include('5');
    expect(charCount?.textContent).to.include('100');
  });

  it('disables input when disabled', async () => {
    const el = await fixture<StInput>(html`<st-input disabled></st-input>`);

    const input = el.shadowRoot?.querySelector('input');
    expect(input?.disabled).to.be.true;
  });

  it('sets input readonly', async () => {
    const el = await fixture<StInput>(html`<st-input readonly></st-input>`);

    const input = el.shadowRoot?.querySelector('input');
    expect(input?.readOnly).to.be.true;
  });

  it('exposes focus and blur methods', async () => {
    const el = await fixture<StInput>(html`<st-input></st-input>`);

    el.focus();
    const input = el.shadowRoot?.querySelector('input');
    expect(el.shadowRoot?.activeElement).to.equal(input);

    el.blur();
  });

  it('exposes select method', async () => {
    const el = await fixture<StInput>(html`<st-input value="select me"></st-input>`);

    el.select();
    // Verify select was called (browser handles selection)
  });

  it('exposes validation methods', async () => {
    const el = await fixture<StInput>(html`<st-input required></st-input>`);

    expect(el.checkValidity()).to.be.false;
    expect(el.reportValidity()).to.be.false;

    el.setCustomValidity('Custom error');
  });

  it('passes accessibility audit', async () => {
    const el = await fixture<StInput>(
      html`<st-input label="Email" placeholder="Enter email"></st-input>`
    );
    await expect(el).to.be.accessible();
  });
});
