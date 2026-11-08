import type { Question, QuestionOption } from '../models/question.model';

export const QUESTIONS: Question[] = [
  {
    id: 'occasion',
    eyebrow: 'The occasion',
    title: 'What brings you to a café today?',
    subtitle: 'No wrong answers — just point us in the right direction.',
    multi: false,
    options: [
      {
        value: 'study',
        label: 'A study session',
        description: 'Books open, headphones on.',
        icon: 'book',
      },
      {
        value: 'work',
        label: 'Getting work done',
        description: 'Laptop out, deadline near.',
        icon: 'laptop',
      },
      {
        value: 'relax',
        label: 'Some time to unwind',
        description: 'A pause in the day, just for you.',
        icon: 'leaf',
      },
      {
        value: 'social',
        label: 'Meeting friends',
        description: 'Catching up over something warm.',
        icon: 'users',
      },
      {
        value: 'quick',
        label: 'Just grabbing a coffee',
        description: 'In, caffeinated, and on your way.',
        icon: 'coffee',
      },
    ],
  },
  {
    id: 'mood',
    eyebrow: 'Your mood',
    title: 'How are you feeling right now?',
    subtitle: "We'll match the room to your energy.",
    multi: false,
    options: [
      {
        value: 'focused',
        label: 'Focused',
        description: 'Clear head, steady pace.',
        icon: 'target',
      },
      {
        value: 'tired',
        label: 'A little tired',
        description: 'Running on low battery.',
        icon: 'moon',
      },
      {
        value: 'social',
        label: 'Sociable',
        description: 'Up for conversation and company.',
        icon: 'chat',
      },
      {
        value: 'stressed',
        label: 'Stressed',
        description: 'In need of a soft landing.',
        icon: 'wind',
      },
      {
        value: 'adventurous',
        label: 'Adventurous',
        description: 'Surprise me with something new.',
        icon: 'compass',
      },
    ],
  },
  {
    id: 'atmosphere',
    eyebrow: 'The vibe',
    title: 'What kind of room feels right?',
    subtitle: 'Picture yourself walking in — what do you hear?',
    multi: false,
    options: [
      {
        value: 'quiet',
        label: 'Quiet & calm',
        description: 'Soft chatter, no rush.',
        icon: 'mute',
      },
      {
        value: 'cozy',
        label: 'Cozy & warm',
        description: 'Wood tones, worn armchairs.',
        icon: 'home',
      },
      {
        value: 'lively',
        label: 'Lively & buzzing',
        description: 'A little energy in the air.',
        icon: 'sparkles',
      },
      {
        value: 'modern',
        label: 'Modern & minimal',
        description: 'Clean lines, good light.',
        icon: 'grid',
      },
      {
        value: 'aesthetic',
        label: 'Aesthetic & photogenic',
        description: 'Every corner a photo op.',
        icon: 'camera',
      },
    ],
  },
  {
    id: 'essentials',
    eyebrow: 'The essentials',
    title: "What can't you do without?",
    subtitle: 'Pick everything that would make or break the visit.',
    multi: true,
    options: [
      {
        value: 'wifi',
        label: 'Reliable Wi-Fi',
        description: 'Strong enough to work on.',
        icon: 'wifi',
      },
      {
        value: 'power',
        label: 'Power outlets',
        description: 'Keep the laptop alive.',
        icon: 'bolt',
      },
      {
        value: 'quietCorners',
        label: 'A quiet corner',
        description: 'Away from the rush.',
        icon: 'mute',
      },
      {
        value: 'outdoorSeating',
        label: 'Outdoor seating',
        description: 'Fresh air and people-watching.',
        icon: 'sun',
      },
      {
        value: 'food',
        label: 'Something to eat',
        description: 'More than a pastry, ideally.',
        icon: 'utensils',
      },
      {
        value: 'laptopFriendly',
        label: 'Laptop-friendly',
        description: 'Nobody minding your screen.',
        icon: 'laptop',
      },
    ],
  },
  {
    id: 'drink',
    eyebrow: 'Your order',
    title: "What's usually in your cup?",
    subtitle: "We're not judging if it's the same thing every time.",
    multi: false,
    options: [
      {
        value: 'espresso',
        label: 'Espresso or cortado',
        description: 'Short, strong, no fuss.',
        icon: 'coffee',
      },
      {
        value: 'latte',
        label: 'Latte or flat white',
        description: 'Silky milk, easy drinking.',
        icon: 'coffee',
      },
      {
        value: 'pourOver',
        label: 'Filter or pour-over',
        description: 'Single origin, taken seriously.',
        icon: 'coffee',
      },
      {
        value: 'coldBrew',
        label: 'Cold brew or iced coffee',
        description: 'Always iced, always smooth.',
        icon: 'coffee',
      },
      {
        value: 'matcha',
        label: 'Matcha & green things',
        description: 'Grassy, bright, calming.',
        icon: 'leaf',
      },
      {
        value: 'tea',
        label: 'Tea, properly brewed',
        description: 'A pot, a strainer, a moment.',
        icon: 'leaf',
      },
      {
        value: 'chai',
        label: 'Chai & spiced drinks',
        description: 'Warm spice, a little sweetness.',
        icon: 'coffee',
      },
    ],
  },
  {
    id: 'budget',
    eyebrow: 'Your budget',
    title: 'What feels reasonable for a coffee?',
    subtitle: 'Per person, for a drink and maybe a snack.',
    multi: false,
    options: [
      {
        value: 'low',
        label: 'Under $5',
        description: 'Keep it simple.',
        icon: 'wallet',
      },
      {
        value: 'mid',
        label: '$5–8',
        description: 'A drink and a small treat.',
        icon: 'wallet',
      },
      {
        value: 'high',
        label: '$8–12',
        description: 'Happy to spend a little more.',
        icon: 'wallet',
      },
      {
        value: 'any',
        label: "I'm flexible",
        description: 'Experience over price.',
        icon: 'sparkles',
      },
    ],
  },
  {
    id: 'distance',
    eyebrow: 'The distance',
    title: 'How far are you willing to wander?',
    subtitle: "We'll keep it realistic — no cross-city pilgrimages.",
    multi: false,
    options: [
      {
        value: '5',
        label: 'Under 5 minutes',
        description: 'Practically around the corner.',
        icon: 'mapPin',
      },
      {
        value: '10',
        label: '5–10 minutes',
        description: 'A short walk.',
        icon: 'mapPin',
      },
      {
        value: '20',
        label: '10–20 minutes',
        description: 'Worth a little trip.',
        icon: 'mapPin',
      },
      {
        value: 'any',
        label: 'As far as it takes',
        description: 'The right place is the right place.',
        icon: 'compass',
      },
    ],
  },
  {
    id: 'seating',
    eyebrow: 'Your seat',
    title: 'Where would you rather sit?',
    subtitle: "Think about where you'd feel most at ease.",
    multi: false,
    options: [
      {
        value: 'indoor',
        label: 'Indoors',
        description: 'Cosy, controlled, comfy.',
        icon: 'home',
      },
      {
        value: 'outdoor',
        label: 'Outdoors',
        description: 'Open air, street sounds.',
        icon: 'sun',
      },
      {
        value: 'any',
        label: 'No preference',
        description: 'Wherever feels right.',
        icon: 'sparkles',
      },
    ],
  },
  {
    id: 'priority',
    eyebrow: 'What matters most',
    title: 'If you could only have one thing…',
    subtitle: 'Choose what would make you come back.',
    multi: false,
    options: [
      {
        value: 'coffee',
        label: 'Exceptional coffee',
        description: 'The cup comes first.',
        icon: 'coffee',
      },
      {
        value: 'atmosphere',
        label: 'A great atmosphere',
        description: 'The room sets the mood.',
        icon: 'sparkles',
      },
      {
        value: 'seating',
        label: 'Comfortable seating',
        description: 'Somewhere to settle in.',
        icon: 'home',
      },
      {
        value: 'price',
        label: 'Affordable prices',
        description: 'A habit, not a splurge.',
        icon: 'wallet',
      },
      {
        value: 'location',
        label: 'An easy location',
        description: 'Close and convenient.',
        icon: 'mapPin',
      },
    ],
  },
  {
    id: 'extras',
    eyebrow: 'The little things',
    title: 'Any extras that would win you over?',
    subtitle: "Optional — skip ahead if you're easy to please.",
    multi: true,
    optional: true,
    options: [
      {
        value: 'plants',
        label: 'Plants everywhere',
        description: 'A little green with your coffee.',
        icon: 'leaf',
      },
      {
        value: 'petFriendly',
        label: 'Pet-friendly',
        description: 'Your dog is welcome too.',
        icon: 'paw',
      },
      {
        value: 'food',
        label: 'Great food',
        description: 'A proper bite to eat.',
        icon: 'utensils',
      },
      {
        value: 'lateHours',
        label: 'Open late',
        description: 'For the evening crowd.',
        icon: 'clock',
      },
      {
        value: 'rooftop',
        label: 'A rooftop or terrace',
        description: 'A view with your cup.',
        icon: 'building',
      },
      {
        value: 'bikeParking',
        label: 'Bike parking',
        description: 'Somewhere safe to lock up.',
        icon: 'bike',
      },
    ],
  },
];

export function findQuestion(questionId: string): Question | undefined {
  return QUESTIONS.find((question) => question.id === questionId);
}

export function findOption(questionId: string, value: string): QuestionOption | undefined {
  return findQuestion(questionId)?.options.find((option) => option.value === value);
}

export function optionLabel(questionId: string, value: string): string {
  return findOption(questionId, value)?.label ?? value;
}
