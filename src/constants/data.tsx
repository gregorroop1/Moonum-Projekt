import { Home, Briefcase, Tag, Grid, Mail } from 'lucide-react';

export const MENU_ITEMS = [
  { translationKey: 'data:menu.home', href: '#', icon: <Home size={20} strokeWidth={1.5} /> },
  { translationKey: 'data:menu.services', href: '#services', icon: <Briefcase size={20} strokeWidth={1.5} /> },
  { translationKey: 'data:menu.pricing', href: '#pricing', icon: <Tag size={20} strokeWidth={1.5} /> },
  { translationKey: 'data:menu.works', href: '#works', icon: <Grid size={20} strokeWidth={1.5} /> },
  { translationKey: 'data:menu.contact', href: '#contact', icon: <Mail size={20} strokeWidth={1.5} /> },
];

export const CATEGORIES = ['websites', 'software', 'marketing'] as const;

export const PRICING_PLANS = [
  { id: "01", categoryId: "websites", isDark: true, price: "" },
  { id: "02", categoryId: "websites", isDark: false, price: "" },
  { id: "03", categoryId: "websites", isDark: false, price: "" },
  { id: "04", categoryId: "websites", isDark: false, price: "" },
  { id: "04-1", categoryId: "websites", isDark: false, price: "" },
  { id: "04-2", categoryId: "websites", isDark: false, price: "" },
  { id: "05", categoryId: "software", isDark: true, price: "" },
  { id: "05-1", categoryId: "software", isDark: false, price: "" },
  { id: "05-2", categoryId: "software", isDark: false, price: "" },
  { id: "06", categoryId: "marketing", isDark: false, price: "" },
  { id: "07", categoryId: "marketing", isDark: false, price: "" }
] as const;

export type Category = (typeof CATEGORIES)[number];
export type PricingPlan = (typeof PRICING_PLANS)[number];

export const PLANS_BY_CATEGORY = CATEGORIES.reduce((acc, category) => {
  acc[category] = PRICING_PLANS.filter((plan) => plan.categoryId === category);
  return acc;
}, {} as Record<Category, PricingPlan[]>);

export const PROCESS_STEPS = [
  { id: "01", isActive: true },
  { id: "02", isActive: false },
  { id: "03", isActive: false },
  { id: "04", isActive: false },
  { id: "05", isActive: false },
  { id: "06", isActive: false }
];

export const SERVICES_LIST = [
  'mobileApp',
  'webDesign',
  'branding',
  'webflow',
  'appDesign',
  'graphicDesign',
  'wordpress'
];

export const SITE_INFO = {
  email: 'hello@moonum.com',
  phone: '+372 5555 5555',
  social: {
    facebook: 'https://facebook.com/moonum',
    tiktok: 'https://tiktok.com/@moonum',
    instagram: 'https://instagram.com/moonum',
    linkedin: 'https://linkedin.com/company/moonum',
    twitter: 'https://twitter.com/moonum'
  }
};
