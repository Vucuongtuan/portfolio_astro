# Tất cả dự án

## 1 WowWeekend Website Migration (Works)

    - Team size: 3
    - Role: Full stack developer
    - Duration: 6 months
    - Category: Blog website & E-commerce website
    - Tech stack: Next.js,Payloadcms,TypeScript,TailwindCSS,MongoDB,Richtext(SlateJS),Docusaurus,Docker
    - Mục tiêu:
        - Migration website từ hệ thống cũ sử dụng php(fe) và asp(backend) sang hệ thống mới sử dụng Nextjs và payloadcms
        - Viết tool crawl api bài viết để lấy data từ hệ thông cũ và optimize field qua hệ thông mới sử dụng mongodb  và hình ảnh từ lưu trực tiếp trên hệ thống cũ qua aws s3
    - Features:
        - Admin Dashboard Schema Management sử dụng PayloadCms
        - Quản lý sản phẩm, danh mục, bài viết, hình ảnh,...
        - Sử dụng full cấu trúc ISR để tối ưu SEO
        - Sử dụng unstable_cache đẻ cache các function fetch api và revalidate thông qua revalidateTag or revalidatePath để cập nhật các dữ liệu khi có thay đổi thông qua trigger trong admin dashboard
        - Thiết kế ui và cấu trúc database theo cấu trúc chuẩn dễ sử dụng và dễ mở rộng
        - Tạo các component có đọ tái sử dụng cao và dễ dàng thay đổi
        - Viết các unit test cho các function và component
        - Tối ưu hóa tốc độ tải trang và SEO
        - Tối ưu hóa chi phí hosting và phí revalidate thông qua việc sử dụng các tính năng của vercel
        - Tối ưu hóa storage cũ sử dụng AWS S3 chuyển qua Cloudflare Storage và cdn
        - Tạo project riêng cho phần document sử dụng docusaurus
        ...

## 2 WowBuilder Website (Works)

    - Team size: 2
    - Role: Full stack developer
    - Duration: 6 months
    - Category: Website builder ui Kéo thả
    - Tech stack: Next.js,Express.js,CraftJS(thư viện hỗ trợ kéo thả),typescript,tailwindcss,Docusaurus,Richtext(QuillJS)
    - Mục tiêu:
        - Website Wowweekend có cateegory LongForm chuyên về các bài viết dài và có ui dạng langdingPage được custom riêng theo nhu cầu của khách hàng book bài .
        - Tạo ra 1 web site có thể kéo thả để Designer có thể tạo ui trực tiếp mà không cần phải đưa design từ adobe cho IT code nữa.
        - Giảm thiểu thời gian và bàn giao cho khách hàng nhanh hơn.
        - Đày đủ các thành phần SEO
        - builder phải export các file html và các file css và js riêng biệt để It đẩy vào website wowweekend thông qua git folder public
    - Features:
        - Sử dụng Craftjs để tạo khung ui kéo thả
        - Tạo các component phục vụ cho builder web : spacer,container,button,Hero,Text,Image,Column,...
        - Xử lý các event và state cục bọ thông qua context react
        - Các State data json được lưu vào localstorage và indexDB chuyển quá trình lưu trữ dữ liệu trong phiên làm việc và hình ảnh cho Browser Storeage của client chỉ lưu cấu trúc json khi save
        - Viết Docs cho các component và tính năng của builder
        ...

## 3 Jewellery Wowweekend website (Works)

    - Team size: 3
    - Role: Full stack developer
    - Duration: 3 months
    - Category: Trang bài viết và nhận book banner quảng cáo
    - Tech stack: Next.js,Payloadcms,TypeScript,TailwindCSS,MongoDB,Docker
    - Mục tiêu:
        - Tạo ra 1 website có ui Đẹp và truyền tải tốt các thông tin của trang sức
        - Website SEO tốt và có tốc độ tải trang nhanh
        - Đây là 1 category được tách ra từ website wowweekend nhằm tập trung vào các sản phẩm trang sức và các thông tin liên quan đến trang sức
        - Migration các article từ website wowweekend sang website jewellry wowweekend thông qua các api của payloadcms
        - nhiều template cho cách render bài viết
    - Features:
        - Admin Dashboard Schema Management sử dụng PayloadCms
        - Quản lý danh mục, bài viết, hình ảnh,...
        - Sử dụng full cấu trúc ISR để tối ưu SEO
        - Sử dụng unstable_cache đẻ cache các function fetch api và revalidate thông qua revalidateTag or revalidatePath để cập nhật các dữ liệu khi có thay đổi thông qua trigger trong admin dashboard
        - Thiết kế ui và cấu trúc database theo cấu trúc chuẩn dễ sử dụng và dễ mở rộng
        - Tạo các component có đọ tái sử dụng cao và dễ dàng thay đổi
        - Viết các unit test cho các function và component
        - Tối ưu hóa tốc độ tải trang và SEO
        - Tối ưu hóa chi phí hosting và phí revalidate thông qua việc sử dụng các tính năng của vercel
        ...

## 4 IDM Website and Mobile app (Works)

    - Team size:3
    - Tech stack:
        - Website: Next.js,Payloadcms,TypeScript,TailwindCSS,MongoDB,
        - Mobile app: React Native,TypeScript,Expo,Tanstack query,
        - Docker
    - Mục tiêu:
        - Cập nhật UI và công nghệ cho website cũ
        - Ui đẹp mắt dẽ nhìn và cáu trúc tốt nhằm lôi kéo khách hàng đến website và sử dụng dịch vụ của IDM
        - Có Ai Chat bot để hỗ trợ khách hàng sử dụng RAG để huấn luyện model cho các câu hỏi liên quan đến brand IDM sử dụng ChatKit AI builder của OpenAI or Gemini Vertex AI
    - Feature:
        - Tạo các template cho các bài viết và các component có thể tái sử dụng cao để tối ưu tốc độ code và giảm thiểu thời gian code\
        - Tối ưu hóa tốc độ tải trang và SEO
        ...

## 5 Laptop TC Store (Personal)

    - Team size: 1
    - Role: Full stack developer
    - Duration: 1 month
    - Category: E-commerce website
    - Tech stack:
            - Frontend: Nextjs,TypeScript,TailwindCSS,ShadcnUI
            - Backend: Node.js,Express.js,TypeScript,MongoDb,Redis,Firebase Storage
    - Mục tiêu:
        - Tạo ra 1 website thương mại điện tử về laptop
        - Website SEO tốt và có tốc độ tải trang nhanh
        ...
    - Features:
        - Admin dashboard quản lý sản phẩm, danh mục, banner,...
        - Quản lý danh mục, bài viết, hình ảnh,...
        - Sử dụng cấu trúc SSR và SSG để tối ưu SEO
        - Thiết kế ui và cấu trúc database
        - Tạo các component có đọ tái sử dụng cao và dễ dàng thay đổi
        - Tối ưu hóa tốc độ tải trang và SEO
        ...

## 6 TC Phim (Personal)

    - Team size: 1
    - Role: Frontend developer
    - Duration: 1 month
    - Category: Movie website
    - Tech stack: Nextjs,TypeScript,TailwindCSS,...
    - Mục tiêu:
        - TÌm hiểu cấu trúc PPR cache component mới của nextjs 16
        ...
    - Features:
        - Tạo các component có đọ tái sử dụng cao và dễ dàng thay đổi
        - Tối ưu hóa tốc độ tải trang và SEO
        - Sử dụng reactCompiler và use memo tự động tối ưu hóa hiệu năng trong cấu trúc page tree component
        - Sử dụng các function và cách cache mới trong nextjs 16 bằng `use cache` và các func như cacheLife , cacheTags
        - Custom ui control video player bằng hls.js
        ...

## 7 AUth module (personal)

    - Team size: 1
    - Role: Full stack developer
    - Duration: 1 month
    - Category: Auth module
    - Tech stack: Asp.net web api,Entity Framework,PostgreSQL,JWT,Asp.net razor page,Docker
    - Mục tiêu:
        - Tạo ra 1 auth module để tái sử dụng xử lý auth cho các dự án cá nhân của tôi.
        - Auth module có các tính năng như:
            - Đăng ký, đăng nhập, quên mật khẩu, thay đổi mật khẩu
            - Quản lý vai trò, quyền hạn
            - Quản lý người dùng
            - Quản lý thông tin công ty
            - Quản lý thông tin dự án
        ...
    - Features:
        - Ui sử dụng Razor page
        - Backend sử dụng Asp.net web api
        - Entity Framework để quản lý database
        - JWT để xác thực
        - Project được viết theo mô hình MVC và bóc tách các thành phần DTO và Entity
        - note: `có thể diễn giải là tôi có sử dụng docker trong quá trình làm từ db đén project vì tôi deploy project này thông qua docker hub `
        ...

## 8 Website Chia sẻ Hình ảnh (Personal)

    - Team size: 1
    - Role: Full stack developer
    - Duration: 3 months
    - Category: Image sharing website
    - Tech stack: Nuxtjs, Vue, Typescript, TailwindCSS, Pinia, Vite, Go, Gin-gonic, Gorm, Mongodb, WebSocket (gorilla), Firebase Storage, Docker
    - Mục tiêu:
        - Tạo ra một nền tảng chia sẻ hình ảnh với khả năng SEO tốt và tốc độ tải trang nhanh.
        - Xây dựng hệ thống tương tác thời gian thực giữa người dùng.
        ...
    - Features:
        - Authentication: Đăng ký/Đăng nhập (JWT), Refresh token và quản lý phân quyền người dùng.
        - Quản lý hình ảnh: Upload Firebase Storage, tự động nén/tối ưu ảnh (WebP) và phân loại theo tag.
        - Tương tác Social: Like, Comment (nested), Follow và thông báo Realtime qua WebSocket.
        - Tối ưu SEO & Performance: Server-side rendering (SSR), Dynamic meta tags, Lazy loading và CDN.
        - Admin Panel: Quản lý người dùng, kiểm duyệt nội dung và thống kê số liệu hệ thống.
        ...

## 9 Football Player Value Prediction - Cây Quyết Định (Learning Project)

    - Team size: 1
    - Role: Data Analyst / Machine Learning Learner
    - Duration: 1 month
    - Category: Machine Learning / Data Science
    - Tech stack: Python, Pandas, Scikit-learn, Matplotlib, Seaborn, Jupyter Notebook, Requests
    - Mục tiêu:
        - Học cách thu thập dữ liệu (crawl data) bằng Python thông qua API của cộng đồng (Transfermarkt API).
        - Thực hành làm sạch dữ liệu, EDA (Phân tích khám phá dữ liệu) và huấn luyện mô hình học máy cơ bản.
        - Xây dựng mô hình Cây Quyết Định (Decision Tree) để dự đoán phân khúc giá trị thị trường của các cầu thủ bóng đá.
        ...
    - Features:
        - Script `crawl_data.py` tự động cào dữ liệu từ API và lưu trữ dưới dạng file `.csv`.
        - Jupyter Notebook `player_value_prediction.ipynb` chứa toàn bộ quá trình xử lý: Load dữ liệu, làm sạch, phân tích bằng biểu đồ (Matplotlib, Seaborn) và Train mô hình Decision Tree với Scikit-learn.
        - Hiểu và diễn giải được cách hoạt động của Cây Quyết Định (Decision Tree) đối với tập dữ liệu thực tế liên quan đến bóng đá, biết cách đánh giá và tối ưu mô hình.
        ...

## 10 Moon App (Learning Project)

    - Team size: 1
    - Role: Mobile Developer Learner
    - Duration: 1 month
    - Category: Mobile Application
    - Tech stack: React Native, Expo, Expo Router, TypeScript, NativeWind, Zustand, TanStack Query, React Hook Form, Zod.
    - Mục tiêu:
        - Xây dựng một ứng dụng di động đa nền tảng bằng hệ sinh thái React Native và Expo (SDK 54).
        - Thực hành quản lý state hiệu quả (Zustand) và quản lý server state (TanStack Query) kết hợp Async Storage Persister đẻ hỗ trợ Offline.
        - Thiết kế UI tối ưu với NativeWind (Tailwind CSS cho RN) và cấu trúc ứng dụng với Expo Router.
        ...
    - Features:
        - Sử dụng mô hình File-based Routing của `expo-router` cho trải nghiệm điều hướng mượt mà trên Mobile.
        - Tối ưu hóa việc gọi API và lưu bộ nhớ đệm với TanStack Query, cho phép ứng dụng phản hồi nhanh và hỗ trợ khi không có kết nối tốt.
        - Validation form phức tạp kết hợp `react-hook-form` và `zod`.
        - Cấu trúc ứng dụng module hóa, strict Type-Safe với TypeScript.
        ...

## 11 Eco App (Payload CMS v3 + Next.js E-commerce)

    - Team size: 1
    - Role: Full stack developer
    - Category: E-commerce Website / Boilerplate
    - Tech stack: Next.js (App Router), Payload CMS v3 (MongoDB), Tailwind CSS 4, Radix UI, Framer Motion, TypeScript, Stripe, Zustand, TanStack Query, Next-Intl.
    - Mục tiêu:
        - Xây dựng một boilerplate thương mại điện tử hoàn chỉnh với phiên bản Payload CMS thế hệ mới (v3) chạy trực tiếp trên Next.js 15+.
        - Tích hợp hệ thống Stripe để xử lý thanh toán, Vercel Blob để lưu trữ hình ảnh.
        ...
    - Features:
        - Quản trị nội dung và sản phẩm trực tiếp bằng Dashboard của Payload CMS v3.
        - Xử lý Checkout và thanh toán thông qua cấu hình @payloadcms/plugin-ecommerce và Stripe.
        - Tối ưu UI/UX với Radix UI Primitives và hiệu ứng mượt mà từ Framer Motion.
        - Cấu trúc hỗ trợ đa ngôn ngữ (i18n) bằng Next-Intl.
        ...

## 12 Portfolio Website (Personal)

    - Team size: 1
    - Role: Frontend Developer / Designer
    - Duration: 1 month
    - Category: Personal Portfolio
    - Tech stack: Astro, React, TypeScript, Tailwind CSS, SCSS Modules, GSAP / ScrollTrigger.
    - Mục tiêu:
        - Xây dựng một trang web portfolio cá nhân hiện đại, tốc độ tải trang cực nhanh và có độ tương tác cao để giới thiệu thông tin, kỹ năng và các dự án đã làm.
        - Tích hợp đa ngôn ngữ (Tiếng Anh, Tiếng Việt) mà không làm suy giảm trải nghiệm SEO.
        - Áp dụng triết lý "Islands Architecture" của Astro để tối ưu hiệu suất, chỉ load React khi cần thiết.
        - Đạt chuẩn hoạt họa "Awwwards" thông qua GSAP.
        ...
    - Features:
        - Hệ thống routing kết hợp View Transitions của Astro cho trải nghiệm chuyển trang mượt mà như SPA (Single Page Application).
        - Quản lý nội dung dự án thông qua Astro Content Collections, giúp kiểm soát Type-safe cho file JSON.
        - Component giao diện kết nối giữa React (để quản lý filter state phức tạp) và Astro.
        - Hiệu ứng (Animations) phức tạp: Scroll reveal, Staggering elements, Parallax,... tích hợp thư viện GSAP ScrollTrigger và hook `@gsap/react`.
        - System UI với Dark/Light Mode và Responsive trên mọi thiết bị.
        ...
