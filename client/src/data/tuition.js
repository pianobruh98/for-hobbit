// Single source of truth for lesson tiers, used by the policies, rates, and
// booking pages.
export const LESSON_TIERS = [
  {
    minutes: 30,
    name: 'Beginners',
    rate: 175,
    summerRate: 140,
    description: 'For beginners and children under eight years old.',
  },
  {
    minutes: 45,
    name: 'Intermediate',
    rate: 250,
    summerRate: 200,
    description: 'The standard track for the majority of developing students.',
  },
  {
    minutes: 60,
    name: 'Advanced',
    rate: 325,
    summerRate: 260,
    description: 'For students preparing for competitions and auditions.',
  },
];
