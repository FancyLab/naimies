# Sticky ATC — Horizon reuse strategy

**Phase**: F2
**Decision date**: 2026-04-21
**Status**: Live — no fancyfy section created; Horizon's component reused as-is.

---

## Decision

Horizon v3.4.0 ships a complete `sticky-add-to-cart` custom element in
`assets/sticky-add-to-cart.js`. It handles:

- IntersectionObserver on buy buttons (shows/hides the sticky bar)
- Variant-selected event updates (image + title + quantity sync)
- Bottom-of-page detection (hides bar when checkout button is visible)
- Quantity display and sync with the main quantity selector

A `<sticky-add-to-cart>` element is already rendered by Horizon's product
section when the merchant enables it via the "Sticky add to cart" block in
the PDP section schema.

**fancyfy does not create a `sections/sticky-atc/` directory.**
The Horizon component is sufficient for all current client use cases.

---

## Where Horizon wires it up

- `blocks/add-to-cart.liquid` contains the `<sticky-add-to-cart>` custom
  element markup and is rendered from the main product section when the
  merchant adds the "Add to cart" block.
- `assets/sticky-add-to-cart.js` is loaded by the block's inline `<script>`.
- The sticky bar observes the block's `#BuyButtons` section anchor to decide
  when to appear.

---

## fancyfy interactions

### Hidden prices (ADR-009, F2)
When `fcy_hide_prices = true` and `settings.fancyfy_hide_prices_hide_cart_totals = true`:

- The main ATC button in `blocks/buy-buttons.liquid` should be replaced with
  a Contact CTA (implemented as part of P7 in `docs/horizon-patches.md`).
- The sticky bar will mirror the main button state because Horizon syncs it
  via `data-cart-button-state`. When the main button is hidden/replaced, the
  sticky bar reflects the same state automatically.

No additional patching is needed on `assets/sticky-add-to-cart.js`.

### fancyfy-exclusive PDP enhancements
If a future section or block needs to extend the sticky bar behavior (e.g.,
show a "Contact us" CTA in the bar instead of ATC), the recommended approach
is:

1. Add a Liquid snippet (`snippets/fcy-sticky-atc-override.liquid`) that
   conditionally renders a replacement sticky bar when `fcy_hide_prices`.
2. Register it in `docs/horizon-patches.md` as a new structural patch.

---

## Revisit criteria

Reopen this decision if:
- A client needs sticky ATC behavior not available in Horizon's component
  (e.g., sticky bar with upsell product, or cross-section sticky bar).
- Horizon removes or significantly rewrites `sticky-add-to-cart.js` in a
  future merge.

---

## References

- `assets/sticky-add-to-cart.js` — Horizon's component source
- `blocks/add-to-cart.liquid` — Horizon block that mounts the component
- `docs/horizon-patches.md` P7 — buy-buttons patch (handles ATC replacement)
- `docs/roadmap.md` F2 — phase context
