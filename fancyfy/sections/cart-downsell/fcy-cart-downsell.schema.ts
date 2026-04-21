import { defineSection, colorScheme } from '../../ds/schema/index.js';

export default defineSection({
  name: 'Fancyfy — Cart Downsell',
  class: 'fcy-cart-downsell',
  tag: 'section',
  settings: [
    { type: 'header', content: 'General' },
    colorScheme({ default: 'scheme-1' }),
    {
      type: 'text',
      id: 'heading',
      label: 'Heading',
      default: 'A more affordable option',
    },
    {
      type: 'number',
      id: 'threshold',
      label: 'Show below cart total (in cents)',
      default: 5000,
      info: 'Enter the amount in your store currency × 100. E.g. $50.00 = 5000.',
    },
    {
      type: 'checkbox',
      id: 'show_price',
      label: 'Show price',
      default: true,
    },
  ],
  blocks: [{ type: 'fcy-cds-option', name: 'Downsell option', limit: 3 }],
  max_blocks: 3,
  presets: [{ name: 'Fancyfy — Cart Downsell' }],
});
