import { FcyElement } from '../../shared/FcyElement.js';

const MAPLIBRE_CSS = 'https://unpkg.com/maplibre-gl@4/dist/maplibre-gl.css';
const MAPLIBRE_JS = 'https://unpkg.com/maplibre-gl@4/dist/maplibre-gl.js';

type MapLibreMap = {
  addControl(ctrl: unknown, pos?: string): void;
  flyTo(opts: { center: [number, number]; zoom: number }): void;
  remove(): void;
};

type MapLibreMarker = {
  setLngLat(coords: [number, number]): MapLibreMarker;
  addTo(map: MapLibreMap): MapLibreMarker;
  getElement(): HTMLElement;
  remove(): void;
};

type MapLibreStatic = {
  Map: new (opts: Record<string, unknown>) => MapLibreMap;
  Marker: new (opts?: Record<string, unknown>) => MapLibreMarker;
  NavigationControl: new () => unknown;
};

declare global {
  interface Window { maplibregl: MapLibreStatic; }
}

class FcyStoreLocatorElement extends FcyElement {
  static override sectionId = 'store-locator';

  #map: MapLibreMap | null = null;
  #markers = new Map<string, MapLibreMarker>();
  #cards: HTMLElement[] = [];
  #searchInput: HTMLInputElement | null = null;
  #countEl: HTMLElement | null = null;

  protected override connected(): void {
    this.#cards = Array.from(this.querySelectorAll<HTMLElement>('.fcy-store-locator__card'));
    this.#searchInput = this.querySelector<HTMLInputElement>('.fcy-store-locator__search');
    this.#countEl = this.querySelector<HTMLElement>('.fcy-store-locator__count');

    this.#updateCount();

    if (this.#searchInput) {
      this.on(this.#searchInput, 'input', this.#handleSearch);
    }

    for (const card of this.#cards) {
      this.on(card, 'click', () => this.#focusCard(card));
      this.on(card, 'keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.#focusCard(card);
        }
      });
    }

    this.#loadMap();
  }

  protected override disconnected(): void {
    this.#map?.remove();
    this.#map = null;
  }

  async #loadMap(): Promise<void> {
    const mapId = this.dataset.mapId;
    const container = mapId ? document.getElementById(mapId) : null;
    if (!container) return;

    if (!window.maplibregl) {
      await this.#loadCSS(MAPLIBRE_CSS);
      await this.#loadScript(MAPLIBRE_JS);
    }

    const ml = window.maplibregl;
    const lat = parseFloat(this.dataset.mapLat ?? '40.7128');
    const lng = parseFloat(this.dataset.mapLng ?? '-74.006');
    const zoom = parseFloat(this.dataset.mapZoom ?? '9');
    const style = this.dataset.mapStyle ?? 'https://tiles.openfreemap.org/styles/liberty';

    this.#map = new ml.Map({ container, style, center: [lng, lat], zoom });
    this.#map.addControl(new ml.NavigationControl(), 'top-right');

    this.#addMarkers();
    this.log.debug('map initialised');
  }

  #addMarkers(): void {
    if (!this.#map) return;
    const ml = window.maplibregl;

    for (const card of this.#cards) {
      const lat = parseFloat(card.dataset.lat ?? '');
      const lng = parseFloat(card.dataset.lng ?? '');
      const id = card.dataset.id ?? '';
      if (isNaN(lat) || isNaN(lng)) continue;

      const el = document.createElement('div');
      el.className = 'fcy-sl-marker';
      el.setAttribute('aria-label', card.querySelector('.fcy-store-locator__card-name')?.textContent?.trim() ?? '');

      const marker = new ml.Marker({ element: el })
        .setLngLat([lng, lat])
        .addTo(this.#map!);

      el.addEventListener('click', () => this.#focusCard(card, false));
      this.#markers.set(id, marker);
    }
  }

  #focusCard(card: HTMLElement, flyMap = true): void {
    for (const c of this.#cards) {
      c.setAttribute('aria-pressed', 'false');
    }
    for (const [, m] of this.#markers) {
      m.getElement().classList.remove('fcy-sl-marker--active');
    }

    card.setAttribute('aria-pressed', 'true');
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    const id = card.dataset.id ?? '';
    this.#markers.get(id)?.getElement().classList.add('fcy-sl-marker--active');

    if (flyMap && this.#map) {
      const lat = parseFloat(card.dataset.lat ?? '');
      const lng = parseFloat(card.dataset.lng ?? '');
      if (!isNaN(lat) && !isNaN(lng)) {
        this.#map.flyTo({ center: [lng, lat], zoom: 14 });
      }
    }
  }

  #handleSearch = (): void => {
    const query = (this.#searchInput?.value ?? '').toLowerCase().trim();

    for (const card of this.#cards) {
      const haystack = card.dataset.search ?? '';
      const visible = query === '' || haystack.includes(query);
      card.toggleAttribute('hidden', !visible);

      const id = card.dataset.id ?? '';
      const markerEl = this.#markers.get(id)?.getElement();
      if (markerEl) markerEl.style.display = visible ? '' : 'none';
    }

    this.#updateCount();
  };

  #updateCount(): void {
    if (!this.#countEl) return;
    const visible = this.#cards.filter(c => !c.hasAttribute('hidden')).length;
    this.#countEl.textContent = visible === 1
      ? '1 store'
      : `${visible} stores`;
  }

  #loadCSS(href: string): Promise<void> {
    return new Promise((resolve) => {
      if (document.querySelector(`link[href="${href}"]`)) { resolve(); return; }
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.onload = () => resolve();
      document.head.appendChild(link);
    });
  }

  #loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
}

customElements.define('fcy-store-locator', FcyStoreLocatorElement);
