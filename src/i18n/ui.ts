
export type Locale = 'vi' | 'en';

export const languages = {
  vi: 'Tiếng Việt',
  en: 'English',
};

export const defaultLang = 'vi';

export const ui = {
  vi: {
    'nav.home': 'Trang chủ',
    'nav.about': 'Giới thiệu',
    'nav.projects': 'Dự án',
    'nav.contact': 'Liên hệ',
    'hero.greeting': 'Tôi là Vũ Tuấn Cường.',
    'hero.role': 'Tôi là một người đam mê công nghệ.',
    'hero.desc': 'Đam mê tạo ra những trải nghiệm kỹ thuật số sáng tạo, bắt nguồn từ nhu cầu của người dùng.',
    'hero.contact': 'Liên hệ',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'hero.greeting': "I'm Vu Tuan Cuong.",
    'hero.role': "I'm a tech enthusiast.",
    'hero.desc': 'Passionately creating innovative digital experiences, rooted in user needs.',
    'hero.contact': 'Contact',
  },
} as const;
