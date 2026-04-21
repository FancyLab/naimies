import { defineSection, colorScheme } from '../../ds/schema/index.js';

export default defineSection({
  name: 'Fancyfy — Cart Rewards Bar',
  class: 'fcy-cart-rewards-bar',
  tag: 'section',
  settings: [
    { type: 'header', content: 'General' },
    colorScheme({ default: 'scheme-1' }),
    {
      type: 'select',
      id: 'reward_type',
      label: 'Reward type',
      options: [
        { value: 'free_shipping', label: 'Free shipping' },
        { value: 'gift', label: 'Gift' },
      ],
      default: 'free_shipping',
    },
    {
      type: 'number',
      id: 'threshold',
      label: 'Threshold (in cents)',
      default: 5000,
      info: 'The cart total needed to unlock the reward. E.g. $50.00 = 5000.',
    },
    {
      type: 'text',
      id: 'progress_message',
      label: 'Progress message',
      default: 'Spend __REMAINING__ more for free shipping',
      info: 'Use __REMAINING__ as a placeholder for the remaining amount.',
    },
    {
      type: 'text',
      id: 'reward_message',
      label: 'Reward unlocked message',
      default: "You've unlocked free shipping!",
    },
  ],
  presets: [{ name: 'Fancyfy — Cart Rewards Bar' }],
});
