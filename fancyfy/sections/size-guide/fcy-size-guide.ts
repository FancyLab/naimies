import { FcyElement } from '../../shared/FcyElement.js';

class FcySizeGuideElement extends FcyElement {
  static override sectionId = 'size-guide';

  #modal: HTMLDialogElement | null = null;
  #trigger: HTMLButtonElement | null = null;
  #focusableSelectors =
    'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

  protected override connected(): void {
    this.#modal = this.querySelector<HTMLDialogElement>('[ref="modal"]');
    this.#trigger = this.querySelector<HTMLButtonElement>('[ref="trigger"]');
    const closeBtn = this.querySelector<HTMLButtonElement>('[ref="closeButton"]');

    if (!this.#modal || !this.#trigger) return;

    this.on(this.#trigger, 'click', this.#openModal);
    if (closeBtn) this.on(closeBtn, 'click', this.#closeModal);
    this.on(this.#modal, 'click', this.#handleBackdropClick);
    this.on(document, 'keydown', this.#handleKeyDown);
  }

  #openModal = (): void => {
    if (!this.#modal || !this.#trigger) return;
    this.#modal.showModal();
    this.#trigger.setAttribute('aria-expanded', 'true');
    const firstFocusable = this.#modal.querySelector<HTMLElement>(this.#focusableSelectors);
    firstFocusable?.focus();
    this.log.debug('modal opened');
  };

  #closeModal = (): void => {
    if (!this.#modal || !this.#trigger) return;
    this.#modal.close();
    this.#trigger.setAttribute('aria-expanded', 'false');
    this.#trigger.focus();
    this.log.debug('modal closed');
  };

  #handleBackdropClick = (event: MouseEvent): void => {
    if (!this.#modal) return;
    const rect = this.#modal.getBoundingClientRect();
    const isOutside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;
    if (isOutside) this.#closeModal();
  };

  #handleKeyDown = (event: KeyboardEvent): void => {
    if (!this.#modal?.open) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      this.#closeModal();
      return;
    }

    if (event.key === 'Tab') {
      this.#trapFocus(event);
    }
  };

  #trapFocus = (event: KeyboardEvent): void => {
    if (!this.#modal) return;
    const focusables = Array.from(
      this.#modal.querySelectorAll<HTMLElement>(this.#focusableSelectors),
    );
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };
}

customElements.define('fcy-size-guide', FcySizeGuideElement);
