
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
    'spacer.scroll': 'Cuộn để khám phá',
    // AboutMe
    'about.heading': 'About Me',
    'about.version': 'v1.0',
    'about.card1.title': '---',
    'about.card1.content': 'Tôi là 1 web developer với gần 2 năm kinh nghiệm. Với niềm đam mê với công nghệ và tìm tòi những cái mới nhất trong lĩnh vực công nghệ. Tôi luôn tìm kiếm những cách mới để cải thiện trải nghiệm người dùng và tạo ra những sản phẩm chất lượng.',
    'about.card1.highlight': 'đam mê với công nghệ',
    'about.card1.quote': 'Từ chối sự giả dối bóng bẩy của thiết kế web hiện đại để ủng hộ các lớp tương tác thô và xác thực.',
    'about.card2.title': 'Công Nghệ',
    'about.card3.title': 'Nguồn Gốc',
    'about.card3.content': 'Đặt tại Việt Nam, hoạt động toàn cầu. Tôi xây dựng giao diện đòi hỏi sự chú ý thay vì lịch sự yêu cầu nó.',
    'about.card3.cta': 'Bắt Đầu Dự Án',
    // LandingHero
    'landing.name': 'CƯỜNG',
    'landing.role': 'là một software engineer với đam mê xây dựng những sản phẩm web chất lượng cao.',
    'landing.desc': 'Fullstack Developer — tạo ra những trải nghiệm kỹ thuật số từ frontend đến backend',
    'landing.featured': 'DỰ ÁN NỔI BẬT',
    'landing.email': 'vucuongtuan00@gmail.com',
    'landing.location': 'Việt Nam',
    'landing.year': '2026',
    // Works
    'works.github': 'Nguồn',
    'works.demo': 'Truy cập',
    'works.all': 'Tất cả',
    'works.personal': 'Cá nhân',
    'works.work': 'Công ty',
    'works.view': 'Xem Chi Tiết',
    // Contact
    'contact.title': 'Liên Hệ',
    'contact.subtitle': 'Hãy cùng tạo ra điều gì đó tuyệt vời.',
    'contact.name': 'Tên của bạn',
    'contact.email': 'Email của bạn',
    'contact.message': 'Tin nhắn',
    'contact.submit': 'Gửi Tin Nhắn',
    'contact.info': 'Thông Tin',
    'contact.socials': 'Mạng Xã Hội',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'hero.greeting': "I'm Vu Tuan Cuong.",
    'hero.role': "I'm a software engineer.",
    'hero.desc': 'Eager learner building user-centered web applications with modern technologies.',
    'hero.contact': 'Contact',
    'spacer.scroll': 'Scroll to explore',
    // AboutMe
    'about.heading': 'ABOUT ME',
    'about.version': 'v1.0',
    'about.card1.title': 'WHO I AM',
    'about.card1.content': `I’m a software engineer focused on building reliable, scalable systems.
                            I work across frontend and backend, caring deeply about architecture, performance, and long-term maintainability.
                            I prefer clarity over cleverness, systems over effects, and solutions that survive real-world usage.`,
    'about.card1.highlight': 'brutalist function',
    'about.card1.quote': 'Rejecting the polished lie of modern web design in favor of raw, authentic interaction layers.',
    'about.card2.title': 'The Stack',
    'about.card3.title': 'Origin',
    'about.card3.content': 'Based in Vietnam, operating globally. I build interfaces that demand attention rather than asking for it politely.',
    'about.card3.cta': 'Start a Project',
    // LandingHero
    'landing.name': 'CUONG',
    'landing.role': 'is a software engineer passionate about building high-quality web or app products.',
    'landing.desc': 'Fullstack Developer — crafting digital experiences from frontend to backend',
    'landing.featured': 'FEATURED WORKS',
    'landing.email': 'cuong@dev.com',
    'landing.location': 'Vietnam',
    'landing.year': '2025',
    // Works
    'works.github': 'Source',
    'works.demo': 'Visit',
    'works.all': 'All',
    'works.personal': 'Personal',
    'works.work': 'Work',
    'works.view': 'View Details',
    // Contact
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'Let\'s create something amazing together.',
    'contact.name': 'Your Name',
    'contact.email': 'Your Email',
    'contact.message': 'Message',
    'contact.submit': 'Send Message',
    'contact.info': 'Information',
    'contact.socials': 'Socials',
  },
} as const;
