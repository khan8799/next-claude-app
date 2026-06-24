import { NavItem } from "../interfaces/navbar.interface";

export const navItems: NavItem[] = [
  {
    label: 'Solutions',
    dropdown: [
      { label: 'AI & Machine Learning', href: '/solutions/ai-ml', description: 'Intelligent automation and predictive analytics' },
      { label: 'Cloud & DevOps', href: '/solutions/cloud', description: 'Scalable architecture and CI/CD pipelines' },
      { label: 'Digital Platforms', href: '/solutions/digital', description: 'End-to-end digital transformation' },
      { label: 'Data & Analytics', href: '/solutions/data', description: 'Data engineering and business intelligence' },
    ],
  },
  {
    label: 'Industries',
    dropdown: [
      { label: 'Financial Services', href: '/industries/financial', description: 'FinTech, banking, and insurance solutions' },
      { label: 'Healthcare & Life Sciences', href: '/industries/healthcare', description: 'Digital health and medical software' },
      { label: 'Retail & Consumer Goods', href: '/industries/retail', description: 'Omnichannel commerce platforms' },
      { label: 'Technology & Telecom', href: '/industries/technology', description: 'Software products for tech companies' },
    ],
  },
  { label: 'About', href: '/about' },
  { label: 'Insights', href: '/insights' },
  { label: 'Careers', href: '/careers' },
]