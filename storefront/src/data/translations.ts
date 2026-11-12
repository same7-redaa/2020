export type Language = "ar" | "en";

export interface Translations {
  common: {
    name: string;
    nameHighlight: string;
    contactNow: string;
    connectWithIbrahim: string;
    rights: string;
  };
  nav: {
    home: string;
    services: string;
    clients: string;
    portfolio: string;
    certificates: string;
    stats: string;
    contact: string;
  };
  hero: {
    fullNameFirst: string;
    fullNameLast: string;
    headline: string;
    headlineLine2: string;
    bio: string;
    servicesBtn: string;
    portfolioBtn: string;
    tickerRow1: { text: string }[];
    tickerRow2: { text: string }[];
  };
  clients: {
    titlePrefix: string;
    titleHighlight: string;
    subtitle: string;
  };
  leaderboard: {
    titlePrefix: string;
    titleHighlight: string;
    subtitle: string;
    rankBadge: string;
    platformName: string;
    platformDesc: string;
    officialRank: string;
    achievement: string;
  };
  services: {
    titlePrefix: string;
    titleHighlight: string;
    subtitle: string;
    viewAllWork: string;
    items: {
      id: string;
      title: string;
      subtitle: string;
      description: string;
    }[];
  };
  portfolio: {
    titlePrefix: string;
    titleHighlight: string;
    subtitle: string;
    viewGallery: string;
    departments: {
      slug: string;
      departmentNumber: string;
      field: string;
      category: string;
      subtitle: string;
      title: string;
      description: string;
      ctaText: string;
    }[];
  };
  portfolioPage: {
    breadcrumbHome: string;
    breadcrumbTitle: string;
    tagline: string;
    titlePrefix: string;
    titleHighlight: string;
    subtitle: string;
    caseStudiesCount: string;
    exploreAll: string;
    viewGallery: string;
    otherDepartmentsBadge: string;
    otherDepartmentsTitle: string;
    howIWorkTitlePrefix: string;
    howIWorkTitleHighlight: string;
    visitStore: string;
    close: string;
    prev: string;
    next: string;
    noProjects: string;
    ctaPrefix: string;
    ctaHighlight: string;
    ctaLines: string[];
    platforms: {
      shopify: { name: string; enName: string; description: string };
      easyOrders: { name: string; enName: string; description: string };
      vondera: { name: string; enName: string; description: string };
    };
    categoryData: Record<string, { title: string; heroDescription: string; categoryName: string }>;
    workflowSteps: Record<string, {
      number: string;
      title: string;
      subtitle: string;
      description: string;
      chips: string[];
    }[]>;
  };
  certificates: {
    titlePrefix: string;
    titleHighlight: string;
    subtitle: string;
    verifiedBadge: string;
    items: {
      id: string;
      title: string;
      issuer: string;
      org: string;
      year: string;
      badge: string;
      skills: string[];
      description: string;
    }[];
  };
  stats: {
    titlePrefix: string;
    titleHighlight: string;
    subtitle: string;
    items: {
      id: string;
      label: string;
      subtitle: string;
      prefix?: string;
      suffix?: string;
    }[];
  };
  newsletter: {
    titlePrefix: string;
    titleHighlight: string;
    subtitle: string;
    placeholder: string;
    submitBtn: string;
    successMessage: string;
  };
  social: {
    titlePrefix: string;
    titleHighlight: string;
    descriptionLines: string[];
    buttons: {
      facebook: string;
      instagram: string;
      whatsapp: string;
      tiktok: string;
      linkedin: string;
    };
  };
  footer: {
    bio: string;
    provenResults: string;
    servicesTitle: string;
    servicesLinks: string[];
    quickLinksTitle: string;
    contactTitle: string;
    availableForConsultations: string;
  };
  whatsapp: {
    tooltip: string;
    defaultMessage: string;
  };
}

export const translations: Record<Language, Translations> = {
  ar: {
    common: {
      name: "ابراهيم علي",
      nameHighlight: "سليم",
      contactNow: "تـــواصـــل الآن",
      connectWithIbrahim: "تـــواصـــل مـــع إبـــراهـــيـــم",
      rights: "جميع الحقوق محفوظة",
    },
    nav: {
      home: "الـرئـيـسـيـة",
      services: "خـدمـاتـي",
      clients: "عـمـلائـي",
      portfolio: "أعـمـالـي",
      certificates: "شـهـاداتـي",
      stats: "خـبـراتـي بـالأرقـام",
      contact: "تـواصـل مـعـي",
    },
    hero: {
      fullNameFirst: "ابـــراهـــيـــم عـــلـــي",
      fullNameLast: "ســـلـــيـــم",
      headline: "أفـــكـــار إبـــداعـــيـــة.",
      headlineLine2: "نـــتـــائـــج مـــلـــمـــوســـة.",
      bio: "أنا إبراهيم علي سليم، خبير تسويق أداء واستراتيجي إبداعي بخبرة 10 سنوات في العمل مع العلامات التجارية. أساعد المتاجر الإلكترونية في تحديد العقبات التي تعيق المبيعات وبناء استراتيجيات تهدف إلى تحقيق العائد المستهدف على الإنفاق الإعلاني (Target ROAS). يربط نهجي بين إدارة الإعلانات الممولة، صناعة المحتوى الإبداعي، وتطوير الموقع لتحويل الزوار إلى عملاء ودعم النمو المربح.",
      servicesBtn: "خـــدمـــاتـــي",
      portfolioBtn: "مـــعـــرض أعـــمـــالـــي",
      tickerRow1: [
        { text: "أعـــلـــى عـــائـــد اســـتـــثـــمـــاري ROAS" },
        { text: "خـــبـــرة 10+ ســـنـــوات فـــي الـــســـوق" },
        { text: "اســـتـــهـــداف جـــمـــاهـــيـــر دقـــيـــق 100%" },
        { text: "تـــصـــامـــيـــم إعـــلانـــيـــة فـــائـــقـــة الـــتـــأثـــيـــر" },
        { text: "نـــمـــو مـــتـــســـارع لـــلـــمـــتـــاجـــر" },
        { text: "حـــلـــول بـــرمـــجـــيـــة وتـــتـــبـــع احـــتـــرافـــي" },
        { text: "اســـتـــشـــارات تـــســـويـــقـــيـــة مـــتـــقـــدمـــة" },
      ],
      tickerRow2: [
        { text: "شـــراء وإدارة الـــحـــمـــلات الإعـــلانـــيـــة" },
        { text: "تـــوســـيـــع الـــمـــتـــاجـــر الإلـــكـــتـــرونـــيـــة" },
        { text: "إعـــلانـــات مـــيـــتـــا وتـــيـــك تـــوك" },
        { text: "تـــحـــســـيـــن مـــعـــدلات الـــتـــحـــويـــل CRO" },
        { text: "اســـتـــراتـــيـــجـــيـــة الـــبـــرانـــد والـــهـــويـــة" },
        { text: "إعـــلانـــات جـــوجـــل والـــبـــحـــث" },
        { text: "خـــفـــض تـــكـــلـــفـــة الـــطـــلـــب CPP" },
        { text: "تـــحـــلـــيـــل وتـــتـــبـــع الـــبـــيـــانـــات" },
      ],
    },
    clients: {
      titlePrefix: "شُـــرَكَـــاء",
      titleHighlight: "الـــنَّـــجَـــاح",
      subtitle: "علامات تجارية ومنصات عالمية تشرفت بالتعاون معها وإدارة حملاتها",
    },
    leaderboard: {
      titlePrefix: "صَـــدَارَةُ",
      titleHighlight: "الـــمـــنـــصَّـــات",
      subtitle: "المرتبة الأولى رسمياً بين مسوقي وميديا بايرز منصة Vondera",
      rankBadge: "المرتبة #1 رسميًا",
      platformName: "منصة Vondera للتجارة الإلكترونية",
      platformDesc: "تكريم الإنجاز الإعلاني وتحقيق أعلى حجم مبيعات وعائد استثماري معتمد",
      officialRank: "المركز الأول على مستوى مصر والشرق الأوسط",
      achievement: "أعلى نسبة مبيعات محققة وأسرع معدل توسع للمتاجر",
    },
    services: {
      titlePrefix: "حُـــلُـــولُ",
      titleHighlight: "الـــنُّـــمُـــوّ",
      subtitle: "استراتيجيات إعلانية وتسويقية متكاملة مصممة خصيصاً لمضاعفة مبيعاتك وأرباحك",
      viewAllWork: "عرض الأعمال السابقة",
      items: [
        {
          id: "meta-ads",
          title: "إدارة إعـــلانـــات مـــيـــتـــا",
          subtitle: "Meta Ads Management",
          description: "إطلاق وتوسيع حملات Facebook & Instagram Ads الشاملة (Full-Funnel) مع إعادة الاستهداف الذكي والـ Scaling لتحقيق أعلى عائد استثماري (ROAS).",
        },
        {
          id: "tiktok-ads",
          title: "إعـــلانـــات تـــيـــك تـــوك الـــمـــمـــولـــة",
          subtitle: "TikTok Ads Specialist",
          description: "استراتيجيات إعلانية متخصصة لمنصة TikTok مع استهداف الشرائح الأعلى تفاعلاً، إدارة Spark Ads، وحملات تحويل ومبيعات سريعة الانتشار.",
        },
        {
          id: "google-ads",
          title: "إعـــلانـــات جـــوجـــل والـــبـــحـــث",
          subtitle: "Google Ads & Search",
          description: "إدارة حملات Google Search و Performance Max و YouTube Ads لاستهداف العملاء ذوي النوايا الشرائية المباشرة وتخفيض تكلفة الاقتناء (CPP).",
        },
        {
          id: "ecommerce-scaling",
          title: "تـــوســـيـــع الـــمـــتـــاجـــر وتـــحـــســـيـــن CRO",
          subtitle: "E-Commerce Scaling & CRO",
          description: "تحسين مسار الشراء وصفحات الهبوط لرفع معدل التحويل الشرائي (CRO) ومضاعفة مبيعات وأرباح المتاجر الإلكترونية لمعالجة آلاف الطلبات شهرياً.",
        },
        {
          id: "motion-video",
          title: "الـــمـــوشـــن والـــفـــيـــديـــوهـــات الإعـــلانـــيـــة",
          subtitle: "Motion Graphics & Video Ads",
          description: "صناعة ومونتاج فيديوهات إعلانية سينمائية وموشن جرافيك للريلز وتيك توك بـ Premiere Pro و After Effects تخطف الانتباه وتحفز الشراء الفوري.",
        },
        {
          id: "graphic-design",
          title: "الـــتـــصـــمـــيـــم والـــهـــويـــة الـــبـــصـــريـــة",
          subtitle: "Graphic Design & Creatives",
          description: "تصميم بوستات، بانرات، وهوية بصرية كاملة بـ Photoshop و Illustrator توقف التمرير وتحقق أعلى تفاعل ومعدل نقر إعلاني (CTR).",
        },
      ],
    },
    portfolio: {
      titlePrefix: "مَـــعْـــرَضُ",
      titleHighlight: "الأَعْـــمَـــال",
      subtitle: "نماذج حية لحملات إعلانية وتصاميم وفيديوهات حققت نتائج استثنائية",
      viewGallery: "تصفح القسم بالكامل",
      departments: [
        {
          slug: "media-buying",
          departmentNumber: "قسم 01",
          field: "Meta & TikTok & Google Ads",
          category: "معرض الميديا باينج",
          subtitle: "Media Buying · Scaling Success",
          title: "إدارة وتـــوســـيـــع الـــحـــمـــلات الـــمـــمـــولـــة",
          description: "إطلاق وإدارة حملات Meta و TikTok و Google Ads بميزانيات ضخمة وتحقيق أعلى عائد إعلاني (ROAS).",
          ctaText: "معرض الميديا باينج",
        },
        {
          slug: "motion-video",
          departmentNumber: "قسم 02",
          field: "Motion Graphics & Reels",
          category: "الموشن جرافيك والفيديو",
          subtitle: "Motion Graphics · Video Ads",
          title: "الـــمـــوشـــن ومـــونـــتـــاج الـــفـــيـــديـــوهـــات",
          description: "إنتاج فيديوهات إعلانية وموشن جرافيك للريلز وتيك توك تخطف الانتباه وتحفز الشراء الفوري.",
          ctaText: "معرض الموشن والفيديو",
        },
        {
          slug: "social-designs",
          departmentNumber: "قسم 03",
          field: "Social Media & Ads",
          category: "تصميمات سوشيال",
          subtitle: "Visual Ads · High Converting",
          title: "تـــصـــامـــيـــم الـــســـوشـــيـــال مـــيـــديـــا",
          description: "تصميمات إعلانية احترافية وبوستات سوشيال ميديا مخصصة لتوقف التمرير وترفع التفاعل والمبيعات.",
          ctaText: "معرض تصميمات السوشيال",
        },
        {
          slug: "ecommerce-scaling",
          departmentNumber: "قسم 04",
          field: "CRO & Store Funnels",
          category: "توسيع المتاجر الإلكترونية",
          subtitle: "Store Optimization · Scaling",
          title: "تـــوســـيـــع وتـــطـــويـــر الـــمـــتـــاجـــر",
          description: "دراسات حالة موثقة لتوسيع متاجر سلة وشوبيفاي وفونديرا ومضاعفة المبيعات اليومية والأرباح.",
          ctaText: "معرض توسيع المتاجر",
        },
      ],
    },
    portfolioPage: {
      breadcrumbHome: "الرئيسية",
      breadcrumbTitle: "معرض الأعمال والنتائج",
      tagline: "سِـــجِـــلّ الـــنـــجـــاحـــات والأرقــــام",
      titlePrefix: "معرض",
      titleHighlight: "الأعمال والنتائج",
      subtitle: "اختر القسم المتخصص للاطلاع على دراسات الحالة المفصلة، الاستراتيجيات التسويقية، والنماذج الحية الموثقة بالأرقام.",
      caseStudiesCount: "دراسات حالة",
      exploreAll: "استكشف جميع الأعمال والدراسات",
      viewGallery: "عرض المعرض",
      otherDepartmentsBadge: "أقسام أخرى",
      otherDepartmentsTitle: "استكشف بقية معارض الأعمال",
      howIWorkTitlePrefix: "خـــطـــوات",
      howIWorkTitleHighlight: "الـــعـــمـــل",
      visitStore: "زيارة المتجر",
      close: "إغلاق",
      prev: "السابق",
      next: "التالي",
      noProjects: "لا توجد أعمال معروضة في هذا القسم حالياً.",
      ctaPrefix: "جاهز لرفع أداء متجرك؟",
      ctaHighlight: "تواصل مع إبراهيم علي سليم",
      ctaLines: [
        "متاح فوراً لدراسة حملاتك التسويقية وتطبيق استراتيجيات موثقة",
        "لتحقيق أعلى عائد ونمو مستدام لمتجرك.",
      ],
      platforms: {
        shopify: {
          name: "مـــعـــرض مـــتـــاجـــر شـــوبـــيـــفـــاي",
          enName: "Shopify E-Commerce Stores",
          description: "متاجر عالمية احترافية مبنية على منصة Shopify مجهزة بأعلى معايير الـ UI/UX، سرعة التحميل، وتطبيقات زيادة متوسط قيمة الطلب (AOV).",
        },
        easyOrders: {
          name: "مـــعـــرض مـــتـــاجـــر إيـــزي أوردرز",
          enName: "Easy Orders Stores",
          description: "متاجر متخصصة في الدفع عند الاستلام (COD) مع صفحات هبوط وفورم طلبات سريع بنقرة واحدة لتحقيق أعلى معدل تحويل مبيعات.",
        },
        vondera: {
          name: "مـــعـــرض مـــتـــاجـــر فـــونـــديـــرا",
          enName: "Vondera Platform Stores",
          description: "متاجر وسلاسل إمداد متكاملة على منصة Vondera لإدارة المخزون، الفواتير، والشحن الذكي لأكبر المتاجر والمشاريع المتوسعة.",
        },
      },
      categoryData: {
        "media-buying": {
          title: "إدارة وتـــوســـيـــع الـــحـــمـــلات الـــمـــمـــولـــة",
          heroDescription: "إطلاق وإدارة حملات Meta و TikTok و Google Ads بميزانيات ضخمة وتحقيق أعلى عائد إعلاني (ROAS).",
          categoryName: "معرض الميديا باينج",
        },
        "motion-video": {
          title: "الـــمـــوشـــن ومـــونـــتـــاج الـــفـــيـــديـــوهـــات",
          heroDescription: "إنتاج فيديوهات إعلانية وموشن جرافيك للريلز وتيك توك تخطف الانتباه وتحفز الشراء الفوري.",
          categoryName: "الموشن جرافيك والفيديو",
        },
        "social-designs": {
          title: "تـــصـــامـــيـــم الـــســـوشـــيـــال مـــيـــديـــا",
          heroDescription: "تصميمات إعلانية احترافية وبوستات سوشيال ميديا مخصصة لتوقف التمرير وترفع التفاعل والمبيعات.",
          categoryName: "تصميمات سوشيال",
        },
        "ecommerce-scaling": {
          title: "تـــوســـيـــع وتـــطـــويـــر الـــمـــتـــاجـــر",
          heroDescription: "دراسات حالة موثقة لتوسيع متاجر سلة وشوبيفاي وفونديرا ومضاعفة المبيعات اليومية والأرباح.",
          categoryName: "توسيع المتاجر الإلكترونية",
        },
      },
      workflowSteps: {
        "media-buying": [
          {
            number: "01",
            title: "البحث والتحليل أولاً",
            subtitle: "بيانات دقيقة مش افتراضات",
            description: "كل حملة ناجحة تبدأ بفهم عميق لزوايا الجمهور المستهدف وسلوك المنافسين. أحلل الحساب الإعلاني وأحدد الفرص الأعلى عائداً قبل صرف جنيه واحد.",
            chips: ["تحليل الحساب وتدقيق البكسل", "دراسة زوايا المنافسين", "خريطة الجماهير المخصصة"],
          },
          {
            number: "02",
            title: "هندسة القمع الإعلاني",
            subtitle: "استراتيجية تلتقي بالذكاء",
            description: "أصمم مسار شراء متكامل (Full-Funnel) من خطاف الفيديو (Hook) مروراً بصفحة الهبوط وحتى إعادة الاستهداف الديناميكي لضمان أعلى تحويل.",
            chips: ["هيكلة الـ Full-Funnel", "اختبار زوايا الكرييتف A/B", "ربط وتفعيل Meta CAPI"],
          },
          {
            number: "03",
            title: "الإطلاق والتوسع الذكي",
            subtitle: "سرعة في التنفيذ ودقة مالية",
            description: "أطلق الحملات باختبارات سريعة. وبمجرد اكتشاف الإعلان الفائز، نبدأ بالتوسع الأفقي والعمودي لمضاعفة المبيعات مع خفض تكلفة الطلب.",
            chips: ["توسع مالي آمن (Scaling)", "تخفيض تكلفة الطلب (CPP)", "إدارة الميزانيات الكبيرة"],
          },
          {
            number: "04",
            title: "القياس والتحسين المستمر",
            subtitle: "قرارات مبنية على الـ ROAS",
            description: "متابعة دقيقة لكل مؤشر: CTR، CPC، CPP، والعائد الصافي ROAS. نعتمد على البيانات الحية لتطوير الأداء وزيادة الأرباح يومياً.",
            chips: ["تحليل العائد الصافي ROAS", "لوحة بيانات وتقارير مباشرة", "تطوير مستمر للأداء"],
          },
        ],
        "motion-video": [
          {
            number: "01",
            title: "كتابة السيناريو والخطاف",
            subtitle: "أول 3 ثوانٍ تصنع الفارق",
            description: "كتابة سكريبت إعلاني يركز على المشكلة، الحل، والخطاف البصري الذي يمنع العميل من التمرير ويحفزه على إكمال الفيديو.",
            chips: ["خطافات بصرية قوية (Hooks)", "سيناريو إعلاني مباشر", "دراسة سلوك الجمهور"],
          },
          {
            number: "02",
            title: "التحريك والموشن جرافيك",
            subtitle: "إتقان Adobe After Effects",
            description: "تحريك العناصر والشعارات ونصوص العروض باحترافية وسلاسة تجذب العين وتبرز الميزات التنافسية للمنتج.",
            chips: ["تحريك نصوص ومؤثرات", "انتقالات سينمائية سريعة", "إبراز العروض والخصومات"],
          },
          {
            number: "03",
            title: "المونتاج والمؤثرات الصوتية",
            subtitle: "إيقاع حماسي يرفع التفاعل",
            description: "تركيب المؤثرات الصوتية الحماسية (SFX) وموسيقى تناسب تريندات التيك توك والإنستجرام مع ألوان سينمائية مبهجة.",
            chips: ["هندسة ومؤثرات صوتية SFX", "تلوين سينمائي للمنتجات", "توليد نداء شراء واضح CTA"],
          },
          {
            number: "04",
            title: "التصدير واختبار المشاهدة",
            subtitle: "أعلى جودة وأعلى تحويل",
            description: "تصدير الفيديوهات بأبعاد مثالية للريلز والتيك توك (9:16) ومتابعة الـ Retention Rate لضمان أعلى مبيعات.",
            chips: ["تصدير مخصص للإعلانات", "متابعة معدل الاحتفاظ", "زيادة معدل الشراء الفوري"],
          },
        ],
        "social-designs": [
          {
            number: "01",
            title: "دراسة البراند والجمهور",
            subtitle: "بناء أسس الهوية البصرية",
            description: "دراسة ألوان وهوية البراند ونبرة صوته لابتكار تصاميم توقف التمرير (Thumb-Stopping) وتعبر عن قيمة المنتج الحقيقية.",
            chips: ["دراسة هوية البراند", "أفكار تصاميم تكسر الروتين", "تناسق الألوان والخطوط"],
          },
          {
            number: "02",
            title: "التصميم والدمج الرقمي",
            subtitle: "إتقان أدوات Adobe Photoshop",
            description: "دمج صور المنتجات مع خلفيات احترافية، ضبط الإضاءات والظلال، وتوزيع النصوص لتوجيه عين العميل نحو زر الشراء.",
            chips: ["دمج فوتوشوب احترافي", "فيكتور ورسومات Illustrator", "تصحيح إضاءة وظلال المنتج"],
          },
          {
            number: "03",
            title: "تجهيز البوستات والإعلانات",
            subtitle: "تنسيق متكامل لكافة المنصات",
            description: "توفير كافة المقاسات المطلوبة للإنستجرام والفيسبوك والتيك توك (سكوير، ستوري، بنرات) جاهزة للنشر المباشر.",
            chips: ["مقاسات لجميع المنصات", "تصاميم كروت وبوسترات", "أعلى دقة تصدير ممكنة"],
          },
          {
            number: "04",
            title: "اختبار نسب النقر CTR",
            subtitle: "تصاميم تحقق نتائج",
            description: "متابعة معدل النقر على الإعلان (CTR) للتأكد من أن التصميم يحقق أعلى جذب بأقل تكلفة ممكنة.",
            chips: ["رفع معدل النقر CTR", "تصاميم إعلانية رابحة", "مخرجات بصرية تلائم العصر"],
          },
        ],
        "ecommerce-scaling": [
          {
            number: "01",
            title: "تدقيق المتجر ومسار الشراء",
            subtitle: "اكتشاف تسربات المبيعات",
            description: "فحص صفحات الهبوط وسرعة التحميل وتجربة الموبايل لتحديد سبب خروج الزوار قبل إتمام عمليات الدفع.",
            chips: ["فحص تجربة المستخدم UI/UX", "تسريع تحميل الصفحات", "تسهيل خطوات الدفع"],
          },
          {
            number: "02",
            title: "هندسة العروض ورفع السلة",
            subtitle: "زيادة متوسط قيمة الطلب AOV",
            description: "بناء عروض الباقات، البيع المتقاطع (Cross-sell)، والـ Upsell لدفع العميل لشراء أكثر من منتج في الطلب الواحد.",
            chips: ["بناء باقات وعروض مغرية", "تفعيل الـ Upsell والـ Bundles", "رفع متوسط قيمة السلة AOV"],
          },
          {
            number: "03",
            title: "تحسين معدل التحويل CRO",
            subtitle: "مضاعفة الشراء من نفس الزوار",
            description: "إعادة صياغة النصوص الإعلانية، إضافة تقييمات العملاء الموثوقة، وتسهيل زر الشراء لتحويل الزوار العاديين لمشترين.",
            chips: ["صفحات هبوط عالية التحويل", "إثباتات اجتماعية وتقييمات", "تقليل سلات الشراء المتروكة"],
          },
          {
            number: "04",
            title: "الربط التقني والتوسع",
            subtitle: "معالجة آلاف الطلبات بنجاح",
            description: "ربط البكسل بدقة 100% عبر Conversions API وأتمتة تأكيد الطلبات عبر واتساب لتقليل المرتجعات وضمان تسليم ناجح.",
            chips: ["تتبع كامل عبر Meta CAPI", "أتمتة تأكيد الطلبات بالواتساب", "توسيع المبيعات 3x باستدامة"],
          },
        ],
      },
    },
    certificates: {
      titlePrefix: "الاعْـــتِـــمَـــادَاتُ",
      titleHighlight: "الـــمِـــهْـــنِـــيَّـــة",
      subtitle: "شهادات معتمدة دولياً من كبرى شركات التكنولوجيا والتسويق الرقمي في العالم",
      verifiedBadge: "شهادة معتمدة ورسمية",
      items: [
        {
          id: "adobe-certified",
          title: "خبير معتمد من أدوبي (Adobe Expert)",
          issuer: "فوتوشوب وإليستريتور",
          org: "Adobe Systems",
          year: "معتمد دولياً",
          badge: "Expert Design",
          skills: ["فوتوشوب", "إليستريتور", "تصميم إعلاني", "هويات بصرية"],
          description: "شهادة اعتماد تخصصية في أدوات التصميم الإبداعي المتقدمة، إنتاج الهويات البصرية، والتصميم الإعلاني عالي التحويل.",
        },
        {
          id: "google-ads",
          title: "شهادة إعلانات جوجل المعتمدة",
          issuer: "Google Skillshop",
          org: "Google",
          year: "معتمد",
          badge: "Search & Display Ads",
          skills: ["حملات البحث", "شبكة العرض", "المزايدة الذكية", "تتبع التحويلات"],
          description: "اعتماد رسمي في تخطيط، إدارة وتحسين الحملات الإعلانية على شبكة بحث جوجل والشبكة الإعلانية الذكية.",
        },
        {
          id: "udacity-nanodegree",
          title: "نانوديجري التسويق الرقمي",
          issuer: "Udacity · 2021",
          org: "Udacity Global",
          year: "2021",
          badge: "Nanodegree Graduate",
          skills: ["تسويق النمو", "تحليل البيانات", "الأتمتة التسويقية", "استراتيجيات المحتوى"],
          description: "درجة النانو الاحترافية العالمية في التسويق الرقمي وبناء استراتيجيات النمو المعتمدة على البيانات الحية.",
        },
        {
          id: "egypt-fwd",
          title: "مسار التحدي - مبادرة مصر الرقمية",
          issuer: "Udacity / Egypt FWD · 2021",
          org: "وزارة الاتصالات (MCIT)",
          year: "2021",
          badge: "Challenger Track",
          skills: ["أبحاث السوق", "استراتيجيات الاستهداف", "إعلانات السوشيال", "تحسين القمع الإعلاني"],
          description: "تخرج معتمد من مبادرة مصر الرقمية المستقبلية بالتعاون مع Udacity لتطوير حلول التسويق الرقمي وإدارة الحملات.",
        },
        {
          id: "greaters-diploma",
          title: "دبلومة التسويق الرقمي المتقدمة",
          issuer: "Greaters Marketing Solutions · 2021",
          org: "Greaters Academy",
          year: "2021",
          badge: "Advanced Diploma",
          skills: ["ميديا باينج متكامل", "كتابة الإعلانات", "ربط البكسل و CAPI", "توسيع المتاجر"],
          description: "دبلومة متقدمة ومكثفة في الشراء الإعلاني المباشر، تحسين معدلات التحويل، ومضاعفة مبيعات المتاجر الإلكترونية.",
        },
        {
          id: "hubspot-inbound",
          title: "شهادة التسويق الداخلي (HubSpot)",
          issuer: "HubSpot Academy",
          org: "HubSpot Certified",
          year: "معتمد",
          badge: "Inbound Certified",
          skills: ["استراتيجية الجذب", "رعاية العملاء", "رحلة العميل", "زيادة معدل التحويل"],
          description: "شهادة معتمدة في جذب العملاء المحتملين وبناء مسارات تسويقية آلية لزيادة ولاء العملاء والقيمة الدائمة (LTV).",
        },
      ],
    },
    stats: {
      titlePrefix: "خِـــبْـــرَاتٌ",
      titleHighlight: "بِـــالأَرْقَـــام",
      subtitle: "أرقام وإحصائيات حقيقية تم تحقيقها عبر مئات الحملات الإعلانية الناجحة",
      items: [
        {
          id: "experience",
          label: "ســـنـــوات خـــبـــرة",
          subtitle: "في التسويق الرقمي وتوسيع المتاجر",
          suffix: "+",
        },
        {
          id: "revenue",
          label: "إيـــرادات مـــحـــقـــقـــة",
          subtitle: "مبيعات موثقة ومحققة للمتاجر",
          prefix: "EGP ",
          suffix: "M+",
        },
        {
          id: "orders",
          label: "طـــلـــب مـــعـــالـــج",
          subtitle: "طلبات معالجة وناجحة (Fulfilled)",
          suffix: "K+",
        },
        {
          id: "roas",
          label: "مـــتـــوســـط ROAS",
          subtitle: "عائد الاستثمار الإعلاني المحقق",
          prefix: "X",
          suffix: "",
        },
      ],
    },
    newsletter: {
      titlePrefix: "احصل على أحدث",
      titleHighlight: "استراتيجيات النمو والتوسع",
      subtitle: "اشترك لتصلك تحليلات الأداء ودراسات الحالة الحصرية واستراتيجيات الحملات المتقدمة وتوسيع المتاجر مباشرة.",
      placeholder: "البريد الإلكتروني أو رقم الهاتف",
      submitBtn: "اشترك الآن مجاناً",
      successMessage: "تم استلام طلبك بنجاح! سنتواصل معك بأحدث الاستراتيجيات التسويقية.",
    },
    social: {
      titlePrefix: "تواصل مع",
      titleHighlight: "إبراهيم علي سليم",
      descriptionLines: [
        "متاح للاستشارات التسويقية، إدارة وتوسيع الحملات الإعلانية،",
        "وبناء الشراكات الاستراتيجية لنمو المتاجر الإلكترونية.",
      ],
      buttons: {
        facebook: "فيسبوك",
        instagram: "انستجرام",
        whatsapp: "واتساب",
        tiktok: "تيك توك",
        linkedin: "لينكد إن",
      },
    },
    footer: {
      bio: "خبير تسويق رقمي، إدارة الحملات وتوسيع المتاجر الإلكترونية. بناء استراتيجيات نمو تعتمد على تحليل البيانات لتعظيم العائد الاستثماري (ROAS).",
      provenResults: "نتائج موثقة بالأرقام ومعدلات تحويل قياسية",
      servicesTitle: "خـــدمـــاتـــي",
      servicesLinks: [
        "شراء وإدارة الحملات (Media Buying)",
        "تحسين معدلات التحويل (CRO)",
        "إعلانات تيك توك وميتا وجوجل",
        "الموشن جرافيك والفيديوهات الإعلانية",
      ],
      quickLinksTitle: "روابـــط ســـريـــعـــة",
      contactTitle: "تـــواصـــل مـــعـــي",
      availableForConsultations: "متاح للاستشارات وحجز الحملات الإعلانية",
    },
    whatsapp: {
      tooltip: "تحدث مع إبراهيم مباشرة",
      defaultMessage: "مرحباً إبراهيم، أود الاستفسار بخصوص خدمات التسويق وإدارة الحملات",
    },
  },
  en: {
    common: {
      name: "Ibrahim Ali",
      nameHighlight: "Slim",
      contactNow: "Contact Now",
      connectWithIbrahim: "Connect with Ibrahim",
      rights: "All rights reserved",
    },
    nav: {
      home: "Home",
      services: "Services",
      clients: "Clients",
      portfolio: "Portfolio",
      certificates: "Certificates",
      stats: "Impact & Numbers",
      contact: "Contact Me",
    },
    hero: {
      fullNameFirst: "Ibrahim Ali",
      fullNameLast: "Slim",
      headline: "Creative Ideas.",
      headlineLine2: "Measurable Results.",
      bio: "I’m Ibrahim Ali Slim, a Performance Marketer and Creative Strategist with 10 years of experience working with brands. I help e-commerce businesses identify what’s holding back sales and build strategies aimed at achieving their target ROAS. My approach connects media buying, ad creatives, content, and website improvements to turn traffic into customers and support profitable growth.",
      servicesBtn: "My Services",
      portfolioBtn: "My Portfolio",
      tickerRow1: [
        { text: "Highest Return on Ad Spend (ROAS)" },
        { text: "10+ Years of Market Experience" },
        { text: "100% Laser-Targeted Audiences" },
        { text: "High-Impact Ad Creatives" },
        { text: "Fast-Track eCommerce Scaling" },
        { text: "Advanced Tracking & Tech Solutions" },
        { text: "High-Level Growth Consulting" },
      ],
      tickerRow2: [
        { text: "Performance Media Buying & Scaling" },
        { text: "Full eCommerce Funnel Optimization" },
        { text: "Meta & TikTok Ads Specialist" },
        { text: "Conversion Rate Optimization (CRO)" },
        { text: "Brand Strategy & Positioning" },
        { text: "Google Ads & Intent Search" },
        { text: "Lowest Acquisition Cost (CPP)" },
        { text: "Data Analytics & Attribution" },
      ],
    },
    clients: {
      titlePrefix: "Success",
      titleHighlight: "Partners",
      subtitle: "Leading brands, global platforms, and eCommerce businesses I've scaled",
    },
    leaderboard: {
      titlePrefix: "Platform",
      titleHighlight: "Leadership",
      subtitle: "Officially Ranked #1 Marketer & Media Buyer on Vondera Platform",
      rankBadge: "Officially Ranked #1",
      platformName: "Vondera eCommerce Platform",
      platformDesc: "Honored for exceptional media buying performance and record sales volume",
      officialRank: "Rank #1 across Egypt & Middle East",
      achievement: "Highest revenue generated and fastest verified scaling rate",
    },
    services: {
      titlePrefix: "Growth",
      titleHighlight: "Solutions",
      subtitle: "Integrated marketing and advertising systems built to scale sales and profitability",
      viewAllWork: "View Case Studies",
      items: [
        {
          id: "meta-ads",
          title: "Meta Ads Management",
          subtitle: "Facebook & Instagram Scaling",
          description: "Full-funnel campaign architecture on Facebook & Instagram with hyper-targeted retargeting, creative testing, and aggressive scaling for maximum ROAS.",
        },
        {
          id: "tiktok-ads",
          title: "TikTok Ads Specialist",
          subtitle: "Viral Growth & Spark Ads",
          description: "High-converting TikTok ad strategies leveraging Spark Ads, trending creator styles, and algorithmic bidding to unlock explosive sales.",
        },
        {
          id: "google-ads",
          title: "Google Ads & Search",
          subtitle: "PMax, Search & YouTube",
          description: "Intent-driven Google Search, Performance Max, and YouTube campaigns capturing ready-to-buy customers while driving down Cost Per Purchase (CPP).",
        },
        {
          id: "ecommerce-scaling",
          title: "eCommerce Scaling & CRO",
          subtitle: "Conversion Optimization",
          description: "Streamlining customer checkout journeys and landing pages to boost conversion rates (CRO) and profitably handle thousands of orders monthly.",
        },
        {
          id: "motion-video",
          title: "Motion Graphics & Video Ads",
          subtitle: "Cinematic Reels & Short-form",
          description: "Attention-grabbing motion graphics and cinematic short-form video ads for Reels and TikTok crafted with Premiere Pro and After Effects to spark instant action.",
        },
        {
          id: "graphic-design",
          title: "Graphic Design & Creatives",
          subtitle: "Scroll-Stopping Visuals",
          description: "High-impact social banners, performance ad creatives, and complete visual identities designed with Photoshop and Illustrator to maximize Click-Through Rates (CTR).",
        },
      ],
    },
    portfolio: {
      titlePrefix: "Featured",
      titleHighlight: "Portfolio",
      subtitle: "Real case studies, high-performing campaigns, and creatives that delivered records",
      viewGallery: "Explore Full Department",
      departments: [
        {
          slug: "media-buying",
          departmentNumber: "Dept 01",
          field: "Meta & TikTok & Google Ads",
          category: "Media Buying Gallery",
          subtitle: "Media Buying · Scaling Success",
          title: "Media Buying & Paid Ad Scaling",
          description: "Deploying and scaling multi-channel Meta, TikTok, and Google Ads campaigns with 7-figure budgets delivering peak ROAS.",
          ctaText: "Media Buying Gallery",
        },
        {
          slug: "motion-video",
          departmentNumber: "Dept 02",
          field: "Motion Graphics & Reels",
          category: "Motion Graphics & Video",
          subtitle: "Motion Graphics · Video Ads",
          title: "Motion Graphics & Video Editing",
          description: "Producing cinematic, scroll-stopping video ads and motion graphics that capture immediate attention and drive conversions.",
          ctaText: "Motion & Video Gallery",
        },
        {
          slug: "social-designs",
          departmentNumber: "Dept 03",
          field: "Social Media & Ads",
          category: "Social Media Design",
          subtitle: "Visual Ads · High Converting",
          title: "Social Media Ad Creatives",
          description: "Scroll-stopping performance designs and branded ad creatives engineered to maximize engagement and purchase conversions.",
          ctaText: "Social Designs Gallery",
        },
        {
          slug: "ecommerce-scaling",
          departmentNumber: "Dept 04",
          field: "CRO & Store Funnels",
          category: "eCommerce Scaling",
          subtitle: "Store Optimization · Scaling",
          title: "Store Optimization & Scaling",
          description: "Verified case studies scaling stores across Shopify, Salla, and Vondera to record daily order volumes and profitable returns.",
          ctaText: "eCommerce Scaling Gallery",
        },
      ],
    },
    portfolioPage: {
      breadcrumbHome: "Home",
      breadcrumbTitle: "Portfolio & Results",
      tagline: "Track Record of Wins & Numbers",
      titlePrefix: "Portfolio &",
      titleHighlight: "Proven Results",
      subtitle: "Select a specialized department to explore detailed case studies, marketing strategies, and live proof with numbers.",
      caseStudiesCount: "Case Studies",
      exploreAll: "Explore all projects & studies",
      viewGallery: "View Gallery",
      otherDepartmentsBadge: "Other Departments",
      otherDepartmentsTitle: "Explore Other Galleries",
      howIWorkTitlePrefix: "My",
      howIWorkTitleHighlight: "Process",
      visitStore: "Visit Store",
      close: "Close",
      prev: "Previous",
      next: "Next",
      noProjects: "No projects currently displayed in this section.",
      ctaPrefix: "Ready to scale your store?",
      ctaHighlight: "Connect with Ibrahim Ali Slim",
      ctaLines: [
        "Available immediately to audit your ad campaigns and deploy proven frameworks",
        "to guarantee peak ROAS and sustainable eCommerce growth.",
      ],
      platforms: {
        shopify: {
          name: "Shopify E-Commerce Stores",
          enName: "Shopify E-Commerce Stores",
          description: "World-class eCommerce stores built on Shopify engineered with modern UI/UX, instant page speed, and high-AOV checkout optimizations.",
        },
        easyOrders: {
          name: "Easy Orders COD Stores",
          enName: "Easy Orders Stores",
          description: "Cash-on-Delivery (COD) optimized landing pages and 1-click checkout funnels driving unmatched sales conversion rates.",
        },
        vondera: {
          name: "Vondera Platform Stores",
          enName: "Vondera Platform Stores",
          description: "Omnichannel inventory, automated invoicing, and intelligent logistics integrated on Vondera for high-volume scaling brands.",
        },
      },
      categoryData: {
        "media-buying": {
          title: "Paid Media Buying & Scaling",
          heroDescription: "Launching and scaling Meta, TikTok, and Google Ads campaigns with 7-figure ad spend delivering peak ROAS.",
          categoryName: "Media Buying Gallery",
        },
        "motion-video": {
          title: "Motion Graphics & Video Editing",
          heroDescription: "Producing cinematic, scroll-stopping video ads and motion graphics that capture immediate attention and drive conversions.",
          categoryName: "Motion Graphics & Video",
        },
        "social-designs": {
          title: "Social Media Ad Creatives",
          heroDescription: "Scroll-stopping performance designs and branded ad creatives engineered to maximize engagement and purchase conversions.",
          categoryName: "Social Media Design",
        },
        "ecommerce-scaling": {
          title: "Store Optimization & Scaling",
          heroDescription: "Verified case studies scaling stores across Shopify, Salla, and Vondera to record daily order volumes and profitable returns.",
          categoryName: "eCommerce Scaling",
        },
      },
      workflowSteps: {
        "media-buying": [
          {
            number: "01",
            title: "Research & Data First",
            subtitle: "Hard facts, not assumptions",
            description: "Every winning campaign begins with deep audience intelligence and competitive angle analysis. We audit the account and identify highest-ROAS opportunities before spending $1.",
            chips: ["Pixel & CAPI Audit", "Competitor Angle Analysis", "Custom Audience Map"],
          },
          {
            number: "02",
            title: "Full-Funnel Architecture",
            subtitle: "Strategy meets creative execution",
            description: "Designing an end-to-end buyer journey from thumb-stopping video hooks to optimized landing pages and dynamic retargeting.",
            chips: ["Full-Funnel Setup", "A/B Creative Testing", "Meta CAPI Integration"],
          },
          {
            number: "03",
            title: "Launch & Smart Scaling",
            subtitle: "Speed in execution, precision in budget",
            description: "Rapid testing to uncover winning ads. Once validated, we scale horizontally and vertically to maximize volume while driving down Cost Per Purchase.",
            chips: ["Safe Budget Scaling", "Lower Cost Per Purchase (CPP)", "Large Budget Management"],
          },
          {
            number: "04",
            title: "Attribution & Continuous Growth",
            subtitle: "Decisions powered by ROAS",
            description: "Tracking key metrics: CTR, CPC, CPP, and net ROAS. Using real-time analytics to optimize performance and compound profits daily.",
            chips: ["Net ROAS Tracking", "Live Reporting Dashboards", "Non-stop Optimization"],
          },
        ],
        "motion-video": [
          {
            number: "01",
            title: "Scriptwriting & The 3-Second Hook",
            subtitle: "First 3 seconds dictate conversion",
            description: "Direct-response scripts focused on problem, solution, and visual hooks that stop scrolling and hold viewer retention.",
            chips: ["Thumb-Stopping Hooks", "Direct-Response Script", "Audience Psychology"],
          },
          {
            number: "02",
            title: "Motion Graphics & Animation",
            subtitle: "Mastery of Adobe After Effects",
            description: "Crafting dynamic motion graphics, typography kinetic bursts, and product highlights that elevate perceived brand value.",
            chips: ["Dynamic Kinetic Text", "Fast Cinematic Cuts", "Offer Highlighting"],
          },
          {
            number: "03",
            title: "Audio Engineering & Trend Pacing",
            subtitle: "High-energy soundscapes",
            description: "Sound design with trending audio and sound effects (SFX) that stimulate excitement and guide the viewer to immediate action.",
            chips: ["Sound Design & SFX", "Color Grading", "High-Converting Call to Action"],
          },
          {
            number: "04",
            title: "Multi-Platform Export & Testing",
            subtitle: "Peak resolution & high retention",
            description: "Optimized 9:16 vertical exports designed for TikTok and Reels with retention rate tracking to ensure maximum sales.",
            chips: ["Ad-Ready Exports", "Retention Optimization", "Instant Purchase Conversions"],
          },
        ],
        "social-designs": [
          {
            number: "01",
            title: "Brand Anatomy & Psychology",
            subtitle: "Establishing visual authority",
            description: "Deconstructing your brand colors, typography, and voice to produce thumb-stopping creatives that clearly communicate value.",
            chips: ["Brand Guidelines", "Scroll-Stopping Concepts", "Color Harmony"],
          },
          {
            number: "02",
            title: "Photoshop Compositing & Retouching",
            subtitle: "Mastering Adobe Photoshop",
            description: "Seamless product compositing, advanced lighting, custom shadows, and layout design directing customer eyes to the CTA.",
            chips: ["High-End Compositing", "Illustrator Vectors", "Lighting & Shadows"],
          },
          {
            number: "03",
            title: "Omnichannel Asset Delivery",
            subtitle: "Every platform covered",
            description: "Delivering all required specs for Instagram, Facebook, and TikTok (1:1 Square, 9:16 Stories, Banners) ready to deploy.",
            chips: ["All Aspect Ratios", "Carousel Cards & Banners", "Lossless Ultra HD Exports"],
          },
          {
            number: "04",
            title: "Click-Through Rate (CTR) Testing",
            subtitle: "Designs engineered for results",
            description: "A/B testing visual variants to guarantee peak click-through rates and lowest cost per click across your ad accounts.",
            chips: ["CTR Optimization", "Winning Creatives", "Modern Visual Standards"],
          },
        ],
        "ecommerce-scaling": [
          {
            number: "01",
            title: "Funnel & Friction Audit",
            subtitle: "Spotting revenue leaks",
            description: "Deep audit of landing pages, mobile speed, and user checkout flow to eliminate drop-offs and friction points.",
            chips: ["UI/UX Optimization", "Page Speed Acceleration", "Frictionless Checkout"],
          },
          {
            number: "02",
            title: "Offer Engineering & AOV Boost",
            subtitle: "Increasing Average Order Value",
            description: "Crafting bundle offers, tiered discounts, and one-click post-purchase upsells that compel customers to buy more per transaction.",
            chips: ["Irresistible Bundles", "Post-Purchase Upsells", "Average Order Value (AOV) Boost"],
          },
          {
            number: "03",
            title: "Conversion Rate Optimization (CRO)",
            subtitle: "More sales from existing traffic",
            description: "Refining copy, adding verified social proof, and optimizing payment buttons to turn casual browsers into paying customers.",
            chips: ["High-Converting Pages", "Verified Social Proof", "Abandoned Cart Recovery"],
          },
          {
            number: "04",
            title: "Tracking Infrastructure & Scaling",
            subtitle: "Processing thousands of orders smoothly",
            description: "100% accurate Meta Conversions API (CAPI), automated WhatsApp confirmations, and logistics integration to reduce returns.",
            chips: ["Meta CAPI Full Tracking", "Automated WhatsApp Confirmations", "3x Sustainable Scaling"],
          },
        ],
      },
    },
    certificates: {
      titlePrefix: "Professional",
      titleHighlight: "Credentials",
      subtitle: "Globally accredited certifications from the world's leading technology and marketing giants",
      verifiedBadge: "Verified Official Credential",
      items: [
        {
          id: "adobe-certified",
          title: "Adobe Certified Expert",
          issuer: "Photoshop & Illustrator",
          org: "Adobe Systems",
          year: "International",
          badge: "Expert Design",
          skills: ["Photoshop", "Illustrator", "Ad Creatives", "Brand Identity"],
          description: "Advanced certification in professional creative design tools, brand identity engineering, and high-converting marketing creative production.",
        },
        {
          id: "google-ads",
          title: "Google Ads Certified Professional",
          issuer: "Google Skillshop",
          org: "Google",
          year: "Certified",
          badge: "Search & Display Ads",
          skills: ["Search Ads", "Display Network", "Smart Bidding", "Conversion Tracking"],
          description: "Official credential in architecting, managing, and optimizing advanced ad campaigns across Google Search and Smart Display networks.",
        },
        {
          id: "udacity-nanodegree",
          title: "Digital Marketing Nanodegree",
          issuer: "Udacity · 2021",
          org: "Udacity Global",
          year: "2021",
          badge: "Nanodegree Graduate",
          skills: ["Growth Marketing", "Data Analytics", "Marketing Automation", "Content Strategy"],
          description: "World-class professional Nanodegree credential in digital marketing and data-driven growth strategies.",
        },
        {
          id: "egypt-fwd",
          title: "Challenger Track - Digital Egypt (FWD)",
          issuer: "Udacity / Egypt FWD · 2021",
          org: "Ministry of Communications (MCIT)",
          year: "2021",
          badge: "Challenger Track",
          skills: ["Market Research", "Targeting Strategies", "Social Ads", "Funnel Optimization"],
          description: "Official graduation from Digital Egypt Future Work is Digital initiative in partnership with Udacity.",
        },
        {
          id: "greaters-diploma",
          title: "Advanced Digital Marketing Diploma",
          issuer: "Greaters Marketing Solutions · 2021",
          org: "Greaters Academy",
          year: "2021",
          badge: "Advanced Diploma",
          skills: ["Full Media Buying", "Copywriting", "Pixel & CAPI Tracking", "Store Scaling"],
          description: "Advanced intensive diploma in direct media buying, conversion optimization, and profitable eCommerce scaling.",
        },
        {
          id: "hubspot-inbound",
          title: "HubSpot Inbound Marketing Certified",
          issuer: "HubSpot Academy",
          org: "HubSpot Certified",
          year: "Certified",
          badge: "Inbound Certified",
          skills: ["Inbound Strategy", "Lead Nurturing", "Buyer Journey", "Conversion Boosting"],
          description: "Official credential in customer acquisition, automated nurture funnels, customer loyalty, and lifetime value (LTV).",
        },
      ],
    },
    stats: {
      titlePrefix: "Proven",
      titleHighlight: "Impact",
      subtitle: "Verified milestones and real performance figures achieved across hundreds of winning campaigns",
      items: [
        {
          id: "experience",
          label: "Years of Experience",
          subtitle: "In Performance Marketing & eCommerce Scaling",
          suffix: "+",
        },
        {
          id: "revenue",
          label: "Revenue Generated",
          subtitle: "Verified sales generated for brands",
          prefix: "EGP ",
          suffix: "M+",
        },
        {
          id: "orders",
          label: "Orders Fulfilled",
          subtitle: "Processed and successfully delivered orders",
          suffix: "K+",
        },
        {
          id: "roas",
          label: "Average ROAS",
          subtitle: "Return on Advertising Spend achieved",
          prefix: "X",
          suffix: "",
        },
      ],
    },
    newsletter: {
      titlePrefix: "Get the latest",
      titleHighlight: "eCommerce Growth Strategies",
      subtitle: "Subscribe to receive exclusive performance teardowns, scaling case studies, and advanced ad strategies directly to your inbox.",
      placeholder: "Email address or phone number",
      submitBtn: "Subscribe for Free",
      successMessage: "Subscription received! We'll share our latest growth playbooks with you.",
    },
    social: {
      titlePrefix: "Connect with",
      titleHighlight: "Ibrahim Ali Slim",
      descriptionLines: [
        "Available for marketing consultations, paid media management & scaling,",
        "and strategic partnerships to accelerate e-commerce brand growth.",
      ],
      buttons: {
        facebook: "Facebook",
        instagram: "Instagram",
        whatsapp: "WhatsApp",
        tiktok: "TikTok",
        linkedin: "LinkedIn",
      },
    },
    footer: {
      bio: "Performance Marketer & Creative Strategist helping e-commerce brands scale profitably through data-driven paid advertising and conversion optimization.",
      provenResults: "Verified track record with record conversion rates",
      servicesTitle: "Services",
      servicesLinks: [
        "Paid Media Buying & Scaling",
        "Conversion Rate Optimization (CRO)",
        "Meta, TikTok & Google Ads",
        "Motion Graphics & Video Ads",
      ],
      quickLinksTitle: "Quick Links",
      contactTitle: "Contact Me",
      availableForConsultations: "Available for consultations and campaign bookings",
    },
    whatsapp: {
      tooltip: "Chat directly with Ibrahim",
      defaultMessage: "Hello Ibrahim, I'd like to inquire about your marketing and media buying services.",
    },
  },
};
