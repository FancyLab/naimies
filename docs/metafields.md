# Naimies — Custom Metafields

Create the following metafields in Shopify Admin → **Settings → Custom data**.

---

## Product metafields (namespace: `custom`)

| Metafield key | Type | Used by | Description |
|---|---|---|---|
| `custom.is_bestseller` | Boolean | PDP meta row | Shows the "Industry Bestseller" pill next to the product rating when `true`. Toggle per product from the product admin page. |
| `custom.is_most_loved` | Boolean | PDP media gallery | Overlays a "Our most-loved product" badge on the main gallery image when `true`. Toggle per product. |
| `custom.spec_table` | JSON / List of mixed references | PDP accordion — "About the Product" | Array of `{ "label": string, "value": string }` objects rendered as a spec table. If absent, the table is not shown. |

### `custom.spec_table` format

Create it as a **JSON** metafield (type: `json`). Example value:

```json
[
  { "label": "Finish", "value": "Matte" },
  { "label": "Coverage", "value": "Medium–Full" },
  { "label": "Formula", "value": "Liquid" },
  { "label": "Size", "value": "30 ml / 1 fl oz" },
  { "label": "Skin type", "value": "Oily, Combination" }
]
```

---

## Variant metafields (namespace: `custom`)

| Metafield key | Type | Used by | Description |
|---|---|---|---|
| `custom.size_label` | Single-line text | PDP variant picker | Sub-label shown under the variant button name (e.g. `"0.28 oz"`). If absent, only the variant option name is shown. |

---

## Notes

- All namespace values above use `custom` — the default Shopify custom namespace.
- Verify the actual namespace/key in Shopify Admin before coding references; the client may have set different keys.
- Every metafield used in this theme is consumed with a safe fallback so missing metafields never cause errors.
