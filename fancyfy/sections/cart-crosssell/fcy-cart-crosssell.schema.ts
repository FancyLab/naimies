import { defineSection, colorScheme } from '../../ds/schema/index.js';

export default defineSection({
  name: 'Fancyfy — Cart Cross-sell',
  class: 'fcy-cart-crosssell',
  tag: 'section',
  settings: [
    { type: 'header', content: 'General' },
    colorScheme({ default: 'scheme-1' }),
    {
      type: 'text',
      id: 'heading',
      label: 'Heading',
      default: 'Pair it with',
    },
    {
      type: 'checkbox',
      id: 'show_price',
      label: 'Show price',
      default: true,
    },
  ],
  blocks: [{ type: 'fcy-ccs-rule', name: 'Cross-sell rule', limit: 6 }],
  max_blocks: 6,
  presets: [{ name: 'Fancyfy — Cart Cross-sell' }],
});
