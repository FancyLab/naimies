import { defineSection, colorScheme } from '../../ds/schema/index.js';

export default defineSection({
  name: 'Fancyfy — Cart Upsell',
  class: 'fcy-cart-upsell',
  tag: 'section',
  settings: [
    { type: 'header', content: 'General' },
    colorScheme({ default: 'scheme-1' }),
    {
      type: 'text',
      id: 'heading',
      label: 'Heading',
      default: 'You might also like',
    },
    {
      type: 'checkbox',
      id: 'show_price',
      label: 'Show price',
      default: true,
    },
  ],
  blocks: [{ type: 'fcy-cu-item', name: 'Upsell item', limit: 3 }],
  max_blocks: 3,
  presets: [{ name: 'Fancyfy — Cart Upsell' }],
});
