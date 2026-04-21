import { FcyElement } from '../../shared/FcyElement.js';

class FcyCartRewardsBarElement extends FcyElement {
  static override sectionId = 'cart-rewards-bar';

  #fill: HTMLElement | null = null;
  #message: HTMLElement | null = null;

  protected override connected(): void {
    this.#fill = this.querySelector<HTMLElement>('.fcy-cart-rewards-bar__fill');
    this.#message = this.querySelector<HTMLElement>('.fcy-cart-rewards-bar__message');

    this.on(document, 'cart:updated' as keyof HTMLElementEventMap, this.#handleCartUpdate as EventListener);
  }

  #handleCartUpdate = (event: Event): void => {
    const detail = (event as CustomEvent<{ total_price: number }>).detail;
    if (!detail?.total_price) return;
    this.#update(detail.total_price);
  };

  #update(cartTotal: number): void {
    const threshold = Number(this.dataset.threshold ?? 0);
    if (!threshold) return;

    const progress = Math.min((cartTotal / threshold) * 100, 100);
    const isUnlocked = cartTotal >= threshold;

    if (this.#fill) {
      this.#fill.style.setProperty('--fcy-crb-progress', `${progress}%`);
      this.#fill.classList.toggle('fcy-cart-rewards-bar__fill--complete', isUnlocked);
    }

    const track = this.querySelector('[role="progressbar"]');
    if (track) {
      track.setAttribute('aria-valuenow', String(cartTotal));
    }

    if (this.#message) {
      if (isUnlocked) {
        this.#message.textContent = this.dataset.rewardMessage ?? '';
      } else {
        const remaining = threshold - cartTotal;
        const remainingFormatted = this.#formatMoney(remaining);
        const template = this.dataset.progressMessage ?? '';
        this.#message.textContent = template.replace('__REMAINING__', remainingFormatted);
      }
    }
  }

  #formatMoney(cents: number): string {
    const amount = cents / 100;
    return new Intl.NumberFormat(document.documentElement.lang || 'en', {
      style: 'currency',
      currency: window.Shopify?.currency?.active ?? 'USD',
    }).format(amount);
  }
}

customElements.define('fcy-cart-rewards-bar', FcyCartRewardsBarElement);
