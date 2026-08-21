const defaultTheme = {
  content: {
    heroKicker: 'Khu đô thị nghỉ dưỡng ven biển',
    heroTitle: 'Hồ Tràm',
    heroSubtitle: 'Santorini',
    heroScript: 'Chạm đến thiên đường nghỉ dưỡng',
    heroCopy: 'Dự án nghỉ dưỡng cao cấp tại Hồ Tràm – Vũng Tàu,\nnơi thiên nhiên hoang sơ hòa quyện cùng phong cách sống đẳng cấp.',
    aboutTitle: 'Hồ Tràm – viên ngọc\nmới của bờ biển phía Nam',
    aboutCopy: 'Hồ Tràm Santorini là tổ hợp nghỉ dưỡng – giải trí – đầu tư đẳng cấp, được quy hoạch bài bản với tầm nhìn trở thành điểm đến hàng đầu khu vực.',
    buttonHeroPrimary: 'Khám phá dự án', buttonHeroBooking: 'Booking tour', buttonAbout: 'Tìm hiểu thêm', buttonAmenities: 'Xem thêm tiện ích', buttonLocation: 'Xem bản đồ', buttonOffer: 'Đăng ký ngay', buttonContact: 'Gọi thông tin',
    imageHero: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=2200&q=90', imageAbout: 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=1200&q=85', imageHighlight1: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=900&q=85', imageHighlight2: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&w=900&q=85', imageHighlight3: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=900&q=85', imageHighlight4: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85', imageAmenity1: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=85', imageAmenity2: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=85', imageAmenity3: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=85', imageAmenity4: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=900&q=85', imageNews1: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=800&q=85', imageNews2: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=85', imageNews3: 'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=800&q=85'
  },
  theme: {
    headingFont: 'Cormorant Garamond',
    bodyFont: 'Manrope',
    ink: '#102f38',
    deep: '#082832',
    gold: '#c79d5a',
    imageRadius: 6,
    buttonRadius: 6
  }
};

const builtInTranslations = {
  en: { heroKicker: 'Luxury coastal resort township', heroTitle: 'Ho Tram', heroSubtitle: 'Santorini', heroScript: 'Touch your holiday paradise', heroCopy: 'A premium resort destination in Ho Tram – Vung Tau,\nwhere untouched nature meets an elevated way of life.', aboutTitle: 'Ho Tram – the new jewel\nof the southern coast', aboutCopy: 'Ho Tram Santorini is a refined resort, entertainment and investment destination, thoughtfully planned to become a leading destination in the region.', buttonHeroPrimary: 'Explore project', buttonHeroBooking: 'Book a tour', buttonAbout: 'Discover more', buttonAmenities: 'View amenities', buttonLocation: 'View map', buttonOffer: 'Register now', buttonContact: 'Request a call' },
  de: { heroKicker: 'Exklusive Küstenresidenz', heroTitle: 'Ho Tram', heroSubtitle: 'Santorini', heroScript: 'Ihr Paradies am Meer', heroCopy: 'Ein erstklassiges Resort in Ho Tram – Vung Tau,\nwo unberührte Natur auf einen gehobenen Lebensstil trifft.', aboutTitle: 'Ho Tram – das neue Juwel\nder Südküste', aboutCopy: 'Ho Tram Santorini vereint Resort, Unterhaltung und Investment zu einem sorgfältig geplanten Reiseziel der Extraklasse.', buttonHeroPrimary: 'Projekt entdecken', buttonHeroBooking: 'Tour buchen', buttonAbout: 'Mehr erfahren', buttonAmenities: 'Angebote ansehen', buttonLocation: 'Karte ansehen', buttonOffer: 'Jetzt anmelden', buttonContact: 'Anruf anfordern' },
  ko: { heroKicker: '해안 럭셔리 리조트 타운', heroTitle: '호 짬', heroSubtitle: '산토리니', heroScript: '당신의 휴양 낙원을 만나보세요', heroCopy: '호짬 – 붕따우의 프리미엄 리조트,\n때묻지 않은 자연과 품격 있는 라이프스타일이 만나는 곳입니다.', aboutTitle: '호 짬 – 남부 해안의\n새로운 보석', aboutCopy: '호짬 산토리니는 휴양, 엔터테인먼트와 투자가 조화를 이루는 고급 복합 리조트입니다.', buttonHeroPrimary: '프로젝트 둘러보기', buttonHeroBooking: '투어 예약', buttonAbout: '자세히 보기', buttonAmenities: '편의시설 보기', buttonLocation: '지도 보기', buttonOffer: '지금 등록', buttonContact: '상담 신청' },
  zh: { heroKicker: '海滨奢华度假小镇', heroTitle: '胡志明海滩', heroSubtitle: '圣托里尼', heroScript: '触碰您的度假天堂', heroCopy: '胡志明海滩 – 头顿高端度假项目，\n让原生态自然与优雅生活方式在此相遇。', aboutTitle: '胡志明海滩 – 南部海岸的\n全新明珠', aboutCopy: '胡志明海滩圣托里尼融合度假、娱乐与投资，精心规划为区域领先的目的地。', buttonHeroPrimary: '探索项目', buttonHeroBooking: '预约参观', buttonAbout: '了解更多', buttonAmenities: '查看设施', buttonLocation: '查看地图', buttonOffer: '立即登记', buttonContact: '申请咨询' }
};

const staticTranslations = {
  en: { '#about .eyebrow': 'Project introduction', '#highlights .eyebrow': 'A different experience', '#highlights h2': 'Project highlights', '#amenities .eyebrow': 'Enjoy every day', '#amenities h2': 'Featured amenities', '#location .eyebrow': 'Easy connections', '#location h2': 'Strategic location', '#news .eyebrow': 'Latest updates', '#news h2': 'News & offers', '#contact .eyebrow': 'Ready for a new journey?', '#contact h2': 'Leave your details,\nwe will contact you.', '#about .text-button': 'Discover more', '#amenities .text-button': 'View amenities', '.location .text-button': 'View map', '.offer p': 'Receive project information', '.offer h3': 'Special offer\nfor early\nregistrations', '.contact-intro > p:last-child': 'Get personal advice about products, policies and project visits.', '.footer-title': 'Contact information' },
  de: { '#about .eyebrow': 'Projektvorstellung', '#highlights .eyebrow': 'Ein besonderes Erlebnis', '#highlights h2': 'Projekt-Highlights', '#amenities .eyebrow': 'Jeden Tag genießen', '#amenities h2': 'Ausstattung', '#location .eyebrow': 'Bequeme Anbindung', '#location h2': 'Strategische Lage', '#news .eyebrow': 'Neueste Updates', '#news h2': 'News & Angebote', '#contact .eyebrow': 'Bereit für eine neue Reise?', '#contact h2': 'Hinterlassen Sie Ihre Daten,\nwir melden uns.', '#about .text-button': 'Mehr erfahren', '#amenities .text-button': 'Ausstattung ansehen', '.location .text-button': 'Karte ansehen', '.offer p': 'Projektinformationen erhalten', '.offer h3': 'Sonderangebot\nfür frühe\nAnmeldungen', '.contact-intro > p:last-child': 'Persönliche Beratung zu Produkten, Richtlinien und Besichtigungen.', '.footer-title': 'Kontaktinformationen' },
  ko: { '#about .eyebrow': '프로젝트 소개', '#highlights .eyebrow': '특별한 경험', '#highlights h2': '프로젝트 하이라이트', '#amenities .eyebrow': '매일 누리는 즐거움', '#amenities h2': '주요 편의시설', '#location .eyebrow': '편리한 연결', '#location h2': '전략적 입지', '#news .eyebrow': '최신 소식', '#news h2': '뉴스 및 혜택', '#contact .eyebrow': '새로운 여정을 시작하시겠어요?', '#contact h2': '정보를 남겨주시면\n연락드리겠습니다.', '#about .text-button': '자세히 보기', '#amenities .text-button': '편의시설 보기', '.location .text-button': '지도 보기', '.offer p': '프로젝트 정보 받기', '.offer h3': '조기 등록 고객을 위한\n특별 혜택', '.contact-intro > p:last-child': '상품, 정책 및 현장 방문에 대한 맞춤 상담을 받아보세요.', '.footer-title': '연락처' },
  zh: { '#about .eyebrow': '项目介绍', '#highlights .eyebrow': '非凡体验', '#highlights h2': '项目亮点', '#amenities .eyebrow': '享受每一天', '#amenities h2': '特色设施', '#location .eyebrow': '便捷连接', '#location h2': '战略位置', '#news .eyebrow': '最新资讯', '#news h2': '新闻与优惠', '#contact .eyebrow': '准备好开启新旅程了吗？', '#contact h2': '留下您的信息，\n我们将与您联系。', '#about .text-button': '了解更多', '#amenities .text-button': '查看设施', '.location .text-button': '查看地图', '.offer p': '获取项目资讯', '.offer h3': '专属特别优惠\n献给提前\n登记的客户', '.contact-intro > p:last-child': '获取产品、政策和项目参观的专属咨询。', '.footer-title': '联系信息' }
};

const pageTranslations = {
  en: {
    scroll: 'Scroll to explore', nav: ['Home', 'About', 'Amenities', 'Location', 'Products', 'News', 'Contact'],
    features: [['PRIME LOCATION', 'On Vietnam\'s most beautiful coastal route'], ['TRANSPARENT LEGAL STATUS', 'Long-term ownership for every product'], ['WORLD-CLASS AMENITIES', 'A diverse 5-star amenity system'], ['INVESTMENT POTENTIAL', 'Sustainable value growth']],
    highlights: [['Private beach', 'Over 1 km of white sand beach with crystal-clear water.'], ['Entertainment complex', 'Seaside square, walking street, restaurants and marina.'], ['18-hole golf course', 'Designed by an international name with beautiful sea views.'], ['Wellness & spa', 'A 5-star international wellness and healthcare centre.']],
    amenities: ['Infinity pool', 'Kids club', 'Restaurant & bar', 'Sport complex'],
    distances: ['From Ho Chi Minh City', 'From Long Thanh Airport', 'From Vung Tau', 'From Loc An Airport'],
    news: [['Ho Tram – the leading resort destination of 2026', 'Special sales policy for August 2026', 'Ho Tram Santorini project progress, August 2026'], 'Read more →'],
    form: { name: 'Full name', phone: 'Phone number', email: 'Email', message: 'What are you interested in?', namePlaceholder: 'Nguyen Van A', messagePlaceholder: 'I would like information about...', submit: 'Request a call' },
    locationCopy: 'Ho Tram Santorini is conveniently connected to Ho Chi Minh City, Long Thanh Airport and the region’s most popular destinations.', mapLabels: ['Ho Tram', 'Long Thanh', 'Vung Tau'], footerNav: ['About the project', 'Amenities', 'Location', 'News'], footer: { description: 'Ho Tram Santorini – creating an elevated resort lifestyle.', contact: 'Contact information', directions: 'Navigation', newsletter: 'Newsletter', newsletterCopy: 'Receive the latest offers in your inbox.', email: 'Your email', privacy: 'Privacy policy', terms: 'Terms of use' }
  },
  de: {
    scroll: 'Zum Entdecken scrollen', nav: ['Startseite', 'Projekt', 'Ausstattung', 'Lage', 'Produkte', 'News', 'Kontakt'],
    features: [['EXKLUSIVE LAGE', 'An Vietnams schönster Küstenstraße'], ['TRANSPARENTE RECHTSLAGE', 'Langfristiges Eigentum für jedes Produkt'], ['ERSTKLASSIGE AUSSTATTUNG', 'Vielfältige 5-Sterne-Einrichtungen'], ['INVESTITIONSPOTENZIAL', 'Nachhaltige Wertsteigerung']],
    highlights: [['Privatstrand', 'Über 1 km weißer Sandstrand mit kristallklarem Wasser.'], ['Unterhaltungskomplex', 'Strandplatz, Flaniermeile, Restaurants und Yachthafen.'], ['18-Loch-Golfplatz', 'Von internationalem Designteam mit Meerblick gestaltet.'], ['Wellness & Spa', 'Internationales Wellness- und Gesundheitszentrum auf 5-Sterne-Niveau.']],
    amenities: ['Infinity-Pool', 'Kinderclub', 'Restaurant & Bar', 'Sportkomplex'],
    distances: ['Von Ho-Chi-Minh-Stadt', 'Vom Flughafen Long Thanh', 'Von Vung Tau', 'Vom Flughafen Loc An'],
    news: [['Ho Tram – das führende Reiseziel 2026', 'Sonderverkaufsaktion im August 2026', 'Baufortschritt Ho Tram Santorini, August 2026'], 'Mehr erfahren →'],
    form: { name: 'Vollständiger Name', phone: 'Telefonnummer', email: 'E-Mail', message: 'Wofür interessieren Sie sich?', namePlaceholder: 'Max Mustermann', messagePlaceholder: 'Ich möchte Informationen über ...', submit: 'Rückruf anfordern' },
    locationCopy: 'Ho Tram Santorini ist bequem mit Ho-Chi-Minh-Stadt, dem Flughafen Long Thanh und den beliebtesten Zielen der Region verbunden.', mapLabels: ['Ho Tram', 'Long Thanh', 'Vung Tau'], footerNav: ['Über das Projekt', 'Ausstattung', 'Lage', 'News'], footer: { description: 'Ho Tram Santorini – ein gehobener Lebensstil am Meer.', contact: 'Kontaktinformationen', directions: 'Navigation', newsletter: 'Newsletter', newsletterCopy: 'Die neuesten Angebote direkt in Ihr Postfach.', email: 'Ihre E-Mail', privacy: 'Datenschutz', terms: 'Nutzungsbedingungen' }
  },
  ko: {
    scroll: '스크롤하여 둘러보기', nav: ['홈', '소개', '편의시설', '위치', '상품', '소식', '문의'],
    features: [['최적의 입지', '베트남에서 가장 아름다운 해안도로'], ['투명한 법적 소유권', '각 상품의 장기 소유권 보장'], ['최고급 편의시설', '다양한 5성급 편의시설'], ['높은 투자 가치', '지속 가능한 가치 상승']],
    highlights: [['프라이빗 비치', '수정처럼 맑은 물과 1km 이상의 하얀 모래사장.'], ['엔터테인먼트 단지', '해변 광장, 산책로, 레스토랑과 마리나.'], ['18홀 골프 코스', '국제적인 설계와 아름다운 바다 전망.'], ['웰니스 & 스파', '국제 기준의 5성급 웰니스 센터.']],
    amenities: ['인피니티 풀', '키즈 클럽', '레스토랑 & 바', '스포츠 콤플렉스'],
    distances: ['호치민시에서', '롱탄 공항에서', '붕따우에서', '록안 공항에서'],
    news: [['2026년 최고의 휴양지, 호짬', '2026년 8월 특별 판매 정책', '호짬 산토리니 프로젝트 진행 현황'], '자세히 보기 →'],
    form: { name: '성함', phone: '전화번호', email: '이메일', message: '관심 분야', namePlaceholder: '홍길동', messagePlaceholder: '관심 있는 상품 정보를 입력해주세요...', submit: '상담 신청' },
    locationCopy: '호짬 산토리니는 호치민시, 롱탄 공항과 지역의 주요 관광지로 편리하게 연결됩니다.', mapLabels: ['호짬', '롱탄', '붕따우'], footerNav: ['프로젝트 소개', '편의시설', '위치', '소식'], footer: { description: '호짬 산토리니 – 품격 있는 해안 휴양 라이프스타일.', contact: '연락처', directions: '빠른 메뉴', newsletter: '뉴스레터', newsletterCopy: '최신 혜택을 이메일로 받아보세요.', email: '이메일 주소', privacy: '개인정보 보호', terms: '이용 약관' }
  },
  zh: {
    scroll: '滚动探索', nav: ['首页', '项目介绍', '设施', '位置', '产品', '新闻', '联系'],
    features: [['尊贵位置', '坐落于越南最美的海滨公路'], ['产权清晰', '每项产品均享长期产权'], ['顶级设施', '丰富多样的五星级设施'], ['投资潜力', '持续稳健的价值增长']],
    highlights: [['私人海滩', '超过1公里的白色沙滩与清澈海水。'], ['娱乐综合体', '海滨广场、步行街、餐厅和游艇码头。'], ['18洞高尔夫球场', '国际团队设计，坐拥迷人海景。'], ['康养水疗中心', '国际标准的五星级健康护理中心。']],
    amenities: ['无边际泳池', '儿童俱乐部', '餐厅与酒吧', '运动中心'],
    distances: ['距胡志明市', '距隆城机场', '距头顿', '距禄安机场'],
    news: [['胡志明海滩 – 2026年度领先度假目的地', '2026年8月特别销售政策', '胡志明海滩圣托里尼项目进展'], '了解更多 →'],
    form: { name: '姓名', phone: '电话号码', email: '电子邮箱', message: '您感兴趣的内容', namePlaceholder: '王先生', messagePlaceholder: '我想了解有关……的信息', submit: '申请咨询' },
    locationCopy: '胡志明海滩圣托里尼交通便利，可轻松前往胡志明市、隆城机场及区域热门目的地。', mapLabels: ['胡志明海滩', '隆城', '头顿'], footerNav: ['项目介绍', '设施', '位置', '新闻'], footer: { description: '胡志明海滩圣托里尼 – 打造优雅的海滨度假生活。', contact: '联系信息', directions: '导航', newsletter: '订阅资讯', newsletterCopy: '最新优惠将发送至您的邮箱。', email: '您的邮箱', privacy: '隐私政策', terms: '使用条款' }
  }
};

function getSiteSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem('hotram-site-settings'));
    if (!saved) return defaultTheme;
    if (saved.content?.imageHighlight1?.includes('1605281317010')) saved.content.imageHighlight1 = defaultTheme.content.imageHighlight1;
    return { ...defaultTheme, ...saved, content: { ...defaultTheme.content, ...saved.content }, theme: { ...defaultTheme.theme, ...saved.theme } };
  } catch {
    return defaultTheme;
  }
}

function applySiteSettings(settings = getSiteSettings()) {
  const root = document.documentElement;
  const language = localStorage.getItem('hotram-language') || 'vi';
  const content = language === 'vi' ? settings.content : { ...settings.content, ...builtInTranslations[language], ...(settings.translations?.[language] || {}) };
  const { theme } = settings;
  root.style.setProperty('--heading-font', `'${theme.headingFont}', Georgia, serif`);
  root.style.setProperty('--body-font', `'${theme.bodyFont}', Arial, sans-serif`);
  root.style.setProperty('--ink', theme.ink);
  root.style.setProperty('--deep', theme.deep);
  root.style.setProperty('--gold', theme.gold);
  root.style.setProperty('--image-radius', `${theme.imageRadius}px`);
  root.style.setProperty('--button-radius', `${theme.buttonRadius}px`);

  const escapeHTML = (value) => String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
  const setText = (selector, value) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = value;
  };
  setText('.hero .eyebrow', content.heroKicker);
  const title = document.querySelector('.hero h1');
  if (title) title.innerHTML = `${escapeHTML(content.heroTitle)}<br><em>${escapeHTML(content.heroSubtitle)}</em>`;
  setText('.hero .script', content.heroScript);
  setText('.hero .hero-copy', content.heroCopy);
  const aboutTitle = document.querySelector('#about h2');
  if (aboutTitle) aboutTitle.innerHTML = escapeHTML(content.aboutTitle).replace(/\n/g, '<br>');
  setText('#about .section-copy > p:not(.eyebrow)', content.aboutCopy);
  const imageMap = { '.about-image img': content.imageAbout, '.highlight-card:nth-child(1) img': content.imageHighlight1, '.highlight-card:nth-child(2) img': content.imageHighlight2, '.highlight-card:nth-child(3) img': content.imageHighlight3, '.highlight-card:nth-child(4) img': content.imageHighlight4, '.amenity-grid figure:nth-child(1) img': content.imageAmenity1, '.amenity-grid figure:nth-child(2) img': content.imageAmenity2, '.amenity-grid figure:nth-child(3) img': content.imageAmenity3, '.amenity-grid figure:nth-child(4) img': content.imageAmenity4, '.news-card:nth-child(1) img': content.imageNews1, '.news-card:nth-child(2) img': content.imageNews2, '.news-card:nth-child(3) img': content.imageNews3 };
  Object.entries(imageMap).forEach(([selector, source]) => { const image = document.querySelector(selector); if (image && /^https?:\/\//i.test(source)) image.src = source; });
  if (/^https?:\/\//i.test(content.imageHero)) document.querySelector('.hero').style.backgroundImage = `url("${content.imageHero}")`;
  const buttonMap = { '.header-actions .outline-button': content.buttonHeroBooking, '.hero .gold-button': content.buttonHeroPrimary, '.hero .outline-button': content.buttonHeroBooking, '#about .text-button': content.buttonAbout, '#amenities .text-button': content.buttonAmenities, '.location .text-button': content.buttonLocation, '.offer .gold-button': content.buttonOffer, '#contact button[type="submit"]': content.buttonContact };
  Object.entries(buttonMap).forEach(([selector, label]) => { const button = document.querySelector(selector); if (button && label) { const icon = button.querySelector('span'); button.textContent = label; if (icon) button.append(' ', icon); } });
  document.querySelectorAll('.main-nav a').forEach((link, index) => { const labels = { en: ['Home', 'About', 'Amenities', 'Location', 'Products', 'News', 'Contact'], de: ['Startseite', 'Projekt', 'Ausstattung', 'Lage', 'Produkte', 'News', 'Kontakt'], ko: ['홈', '소개', '편의시설', '위치', '상품', '소식', '문의'], zh: ['首页', '项目介绍', '设施', '位置', '产品', '新闻', '联系'] }; if (language !== 'vi') link.textContent = labels[language][index]; });
  const staticMap = staticTranslations[language] || {};
  Object.entries(staticMap).forEach(([selector, value]) => { document.querySelectorAll(selector).forEach((element) => { element.textContent = value; }); });
  const translatedPage = pageTranslations[language];
  if (translatedPage) {
    const scrollHint = document.querySelector('.scroll-hint');
    if (scrollHint) { scrollHint.textContent = ''; const scrollLine = document.createElement('span'); scrollHint.append(scrollLine, ` ${translatedPage.scroll}`); }
    document.querySelectorAll('.feature-list > div').forEach((item, index) => { if (translatedPage.features[index]) { item.querySelector('strong').textContent = translatedPage.features[index][0]; item.querySelector('span').textContent = translatedPage.features[index][1]; } });
    document.querySelectorAll('.highlight-card').forEach((card, index) => { if (translatedPage.highlights[index]) { card.querySelector('h3').textContent = translatedPage.highlights[index][0]; card.querySelector('p').textContent = translatedPage.highlights[index][1]; } });
    document.querySelectorAll('.amenity-grid figcaption').forEach((caption, index) => { caption.textContent = translatedPage.amenities[index] || caption.textContent; });
    document.querySelectorAll('.location li').forEach((item, index) => { const textNode = Array.from(item.childNodes).find((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim()); if (textNode) textNode.textContent = ` ${translatedPage.distances[index]} `; });
    document.querySelectorAll('.map-label').forEach((label, index) => { label.textContent = ['Ho Tram', 'Long Thanh', 'Vung Tau'][index]; });
    document.querySelectorAll('.news-card h3').forEach((headline, index) => { headline.textContent = translatedPage.news[0][index] || headline.textContent; });
    document.querySelectorAll('.news-card a').forEach((link) => { link.textContent = translatedPage.news[1]; });
    const formLabels = document.querySelectorAll('#contact-form label > span');
    [translatedPage.form.name, translatedPage.form.phone, translatedPage.form.email, translatedPage.form.message].forEach((label, index) => { if (formLabels[index]) formLabels[index].textContent = label; });
    const form = document.querySelector('#contact-form');
    if (form) { form.querySelector('[name="name"]').placeholder = translatedPage.form.namePlaceholder; form.querySelector('[name="message"]').placeholder = translatedPage.form.messagePlaceholder; }
    const footer = translatedPage.footer;
    const locationDescription = document.querySelector('.location-copy > p:not(.eyebrow)'); if (locationDescription) locationDescription.textContent = translatedPage.locationCopy;
    document.querySelectorAll('.map-label').forEach((label, index) => { label.textContent = translatedPage.mapLabels[index] || label.textContent; });
    document.querySelectorAll('.site-footer > div:nth-child(3) > a').forEach((link, index) => { link.textContent = translatedPage.footerNav[index] || link.textContent; });
    setText('.footer-brand > p', footer.description);
    const footerColumns = document.querySelectorAll('.site-footer > div');
    if (footerColumns[1]) footerColumns[1].querySelector('.footer-title').textContent = footer.contact;
    if (footerColumns[2]) footerColumns[2].querySelector('.footer-title').textContent = footer.directions;
    if (footerColumns[3]) {
      footerColumns[3].querySelector('.footer-title').textContent = footer.newsletter;
      const newsletterCopy = footerColumns[3].querySelector('.muted');
      if (newsletterCopy) newsletterCopy.textContent = footer.newsletterCopy;
    }
    const newsletterInput = document.querySelector('.newsletter input'); if (newsletterInput) { newsletterInput.placeholder = footer.email; newsletterInput.setAttribute('aria-label', footer.email); }
    document.querySelector('.footer-bottom span:last-child').textContent = `${footer.privacy}  |  ${footer.terms}`;
  }
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : language;
  const picker = document.querySelector('#language-picker');
  const trigger = document.querySelector('#language-trigger');
  const languageOptions = document.querySelectorAll('[data-language]');
  const languageMeta = { vi: ['🇻🇳', 'Tiếng Việt', 'VI'], en: ['🇬🇧', 'English', 'EN'], de: ['🇩🇪', 'Deutsch', 'DE'], ko: ['🇰🇷', '한국어', 'KO'], zh: ['🇨🇳', '中文', '中文'] };
  if (picker && trigger) {
    const [flag, name, code] = languageMeta[language] || languageMeta.vi;
    trigger.querySelector('.language-flag').textContent = flag;
    trigger.querySelector('.language-name').textContent = name;
    trigger.querySelector('.language-code').textContent = code;
    trigger.onclick = () => { const open = picker.classList.toggle('open'); trigger.setAttribute('aria-expanded', String(open)); };
    languageOptions.forEach((option) => { option.onclick = () => { localStorage.setItem('hotram-language', option.dataset.language); window.location.reload(); }; });
    document.addEventListener('click', (event) => { if (!picker.contains(event.target)) { picker.classList.remove('open'); trigger.setAttribute('aria-expanded', 'false'); } });
  }
}

if (typeof document !== 'undefined') applySiteSettings();
