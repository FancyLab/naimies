import { FcyElement } from '../../shared/FcyElement.js';

class FcyShoppableImageElement extends FcyElement {
  static override sectionId = 'shoppable-image';

  protected override connected(): void {
    const pins = Array.from(this.querySelectorAll<HTMLButtonElement>('.fcy-shoppable-image__pin'));

    for (const pin of pins) {
      this.on(pin, 'click', () => this.#togglePin(pin));
      this.on(pin, 'keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.#togglePin(pin);
        }
      });
    }

    this.on(document, 'click', this.#handleOutsideClick);
    this.on(document, 'keydown', this.#handleEscape);
  }

  #togglePin(pin: HTMLButtonElement): void {
    const blockId = pin.dataset.blockId;
    const popup = this.querySelector<HTMLElement>(`#fcy-si-popup-${blockId}`);
    const isOpen = pin.getAttribute('aria-expanded') === 'true';

    this.#closeAll();

    if (!isOpen && popup) {
      popup.removeAttribute('hidden');
      pin.setAttribute('aria-expanded', 'true');
      this.log.debug('pin opened', { blockId });
    }
  }

  #closeAll(): void {
    const pins = this.querySelectorAll<HTMLButtonElement>('.fcy-shoppable-image__pin[aria-expanded="true"]');
    const popups = this.querySelectorAll<HTMLElement>('.fcy-shoppable-image__popup:not([hidden=""])');

    for (const p of pins) p.setAttribute('aria-expanded', 'false');
    for (const p of popups) p.setAttribute('hidden', '');
  }

  #handleOutsideClick = (event: MouseEvent): void => {
    const target = event.target as Node;
    if (!this.contains(target)) this.#closeAll();
  };

  #handleEscape = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') this.#closeAll();
  };
}

customElements.define('fcy-shoppable-image', FcyShoppableImageElement);
