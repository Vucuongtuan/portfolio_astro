
export type Locale = 'vi' | 'en';

export const languages = {
  vi: 'Tiếng Việt',
  en: 'English',
};

export const defaultLang = 'en';

export const ui = {
  vi: {
    'nav.home': 'Trang chủ',
    'nav.about': 'Giới thiệu',
    'nav.projects': 'Dự án',
    'nav.contact': 'Liên hệ',
    'hero.greeting': 'Tôi là Vũ Tuấn Cường.',
    'hero.role': 'Software Engineer',
    'hero.desc': 'Ham học hỏi, tìm tòi công nghệ mới để xây dựng những sản phẩm web chất lượng lấy người dùng làm trung tâm.',
    'hero.contact': 'Liên hệ',
    'spacer.scroll': 'Cuộn để khám phá',
    // AboutMe
    'about.heading': 'About Me',
    'about.version': 'v1.0',
    'about.card1.title': 'Tôi Là Ai',
    'about.card1.content': 'Xuất phát là một lập trình viên Frontend chuyên về React với gần 2 năm kinh nghiệm, tôi đã mở rộng năng lực của mình sang phát triển Backend thông qua những dự án thực tế đầy thách thức. Tôi đam mê xây dựng các ứng dụng web hiệu quả, có khả năng mở rộng — và không ngừng cải thiện bản thân mỗi ngày.',
    'about.card1.highlight': 'không ngừng cải thiện',
    'about.card1.quote': 'Mục tiêu trong những năm tới: trở thành Senior Developer bằng cách tích lũy kinh nghiệm chuyên sâu, đóng góp vào các dự án lớn và liên tục mở rộng cả kỹ năng kỹ thuật lẫn kỹ năng mềm.',
    'about.card2.title': 'Công Nghệ',
    'about.card3.title': 'Nguồn Gốc',
    'about.card3.content': 'Đến từ Nam Định, Việt Nam. Nền tảng vững chắc về nhiều ngôn ngữ lập trình và framework, luôn sẵn sàng chinh phục những thử thách mới.',
    'about.card3.cta': 'Bắt Đầu Dự Án',
    // LandingHero
    'landing.title':'Xin chào mọi người',
    'landing.name': 'Vũ Tuấn Cường',
    'landing.role': 'là một software engineer đam mê xây dựng những sản phẩm web & app chất lượng cao.',
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
    'hero.role': 'Software Engineer',
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
    'about.card1.highlight': 'constantly pushing myself',
    'about.card1.quote': 'Goal for the next 3 years: become a Senior Developer by accumulating deep expertise, contributing to ambitious projects, and continuously expanding both technical and soft skills.',
    'about.card2.title': 'The Stack',
    'about.card3.title': 'Origin',
    'about.card3.content': 'From Nam Dinh, Vietnam. Strong foundation across multiple programming languages and frameworks, always ready to tackle new challenges.',
    'about.card3.cta': 'Start a Project',
    // LandingHero
    'landing.title':'Hello everyone',
    'landing.name': 'Vu Tuan Cuong',
    'landing.role': 'is a software engineer passionate about building high-quality web or app products.',
    'landing.desc': 'Fullstack Developer — crafting digital experiences from frontend to backend',
    'landing.featured': 'FEATURED WORKS',
    'landing.email': 'vucuongtuan00@gmail.com',
    'landing.location': 'Vietnam',
    'landing.year': '2026',
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
