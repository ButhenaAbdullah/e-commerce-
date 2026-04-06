export interface Product {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  originalPrice?: number;
  category: string;
  categoryAr: string;
  categorySlug: string;
  images: {
    main: string;
    hover: string;
  };
  sizes: string[];
  colors: { name: string; nameAr: string; hex: string }[];
  isNew?: boolean;
  isFeatured?: boolean;
  rating: number;
  reviews: number;
  material?: string;
  materialAr?: string;
  madeIn?: string;
  madeInAr?: string;
}

export interface Category {
  id: string;
  name: string;
  nameAr: string;
  slug: string;
  description: string;
  descriptionAr: string;
  image: string;
  productCount: number;
}

export const categories: Category[] = [
  {
    id: "1",
    name: "Dresses",
    nameAr: "فساتين",
    slug: "dresses",
    description: "Elegant dresses for every occasion",
    descriptionAr: "فساتين أنيقة لكل مناسبة",
    image: "/images/collections/evening-wear.jpg",
    productCount: 24,
  },
  {
    id: "2",
    name: "Outerwear",
    nameAr: "الملابس الخارجية",
    slug: "outerwear",
    description: "Luxurious coats and jackets",
    descriptionAr: "معاطف وجاكيتات فاخرة",
    image: "/images/collections/autumn-essentials.jpg",
    productCount: 18,
  },
  {
    id: "3",
    name: "Tops",
    nameAr: "القمصان",
    slug: "tops",
    description: "Refined blouses and shirts",
    descriptionAr: "بلوزات وقمصان راقية",
    image: "/images/collections/modern-classics.jpg",
    productCount: 32,
  },
  {
    id: "4",
    name: "Bottoms",
    nameAr: "البناطيل والتنانير",
    slug: "bottoms",
    description: "Tailored trousers and skirts",
    descriptionAr: "بناطيل وتنانير مفصلة",
    image: "/images/products/tailored-trousers-1.jpg",
    productCount: 21,
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Ethereal Silk Blouse",
    nameAr: "بلوزة حرير أثيرية",
    description:
      "Crafted from the finest mulberry silk, this blouse drapes beautifully with a relaxed yet refined silhouette. Features mother-of-pearl buttons and French seams throughout.",
    descriptionAr:
      "مصنوعة من أجود أنواع حرير التوت، تتميز هذه البلوزة بانسدالها الجميل مع قصة مريحة وأنيقة. تتميز بأزرار من عرق اللؤلؤ ودرزات فرنسية في جميع أنحائها.",
    price: 385,
    category: "Tops",
    categoryAr: "القمصان",
    categorySlug: "tops",
    images: {
      main: "/images/products/silk-blouse-1.jpg",
      hover: "/images/products/silk-blouse-1-hover.jpg",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Ivory", nameAr: "عاجي", hex: "#FFFEF5" },
      { name: "Champagne", nameAr: "شمبانيا", hex: "#F7E7CE" },
      { name: "Noir", nameAr: "أسود", hex: "#1a1a1a" },
    ],
    isNew: true,
    isFeatured: true,
    rating: 4.9,
    reviews: 47,
    material: "100% Mulberry Silk",
    materialAr: "100% حرير التوت",
    madeIn: "Italy",
    madeInAr: "إيطاليا",
  },
  {
    id: "2",
    name: "Cashmere Cocoon Coat",
    nameAr: "معطف كشمير الشرنقة",
    description:
      "Envelop yourself in unparalleled softness with this double-faced cashmere coat. The cocoon silhouette offers both comfort and sophistication for the modern woman.",
    descriptionAr:
      "احتضني نفسك بنعومة لا مثيل لها مع معطف الكشمير ذو الوجهين. تقدم قصة الشرنقة الراحة والأناقة للمرأة العصرية.",
    price: 1250,
    originalPrice: 1450,
    category: "Outerwear",
    categoryAr: "الملابس الخارجية",
    categorySlug: "outerwear",
    images: {
      main: "/images/products/cashmere-coat-1.jpg",
      hover: "/images/products/cashmere-coat-1-hover.jpg",
    },
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Camel", nameAr: "جملي", hex: "#C19A6B" },
      { name: "Charcoal", nameAr: "فحمي", hex: "#36454F" },
    ],
    isFeatured: true,
    rating: 5.0,
    reviews: 28,
    material: "100% Cashmere",
    materialAr: "100% كشمير",
    madeIn: "Italy",
    madeInAr: "إيطاليا",
  },
  {
    id: "3",
    name: "Botanical Linen Dress",
    nameAr: "فستان الكتان النباتي",
    description:
      "A celebration of understated elegance in premium European linen. This midi dress features a flattering A-line cut with thoughtful details including hidden pockets.",
    descriptionAr:
      "احتفاء بالأناقة الهادئة في الكتان الأوروبي الفاخر. يتميز هذا الفستان الميدي بقصة A-line المحببة مع تفاصيل مدروسة تشمل جيوب مخفية.",
    price: 445,
    category: "Dresses",
    categoryAr: "فساتين",
    categorySlug: "dresses",
    images: {
      main: "/images/products/linen-dress-1.jpg",
      hover: "/images/products/linen-dress-1-hover.jpg",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Sage", nameAr: "أخضر رمادي", hex: "#9DC183" },
      { name: "Sand", nameAr: "رملي", hex: "#C2B280" },
      { name: "Ecru", nameAr: "إكرو", hex: "#F5F5DC" },
    ],
    isNew: true,
    rating: 4.8,
    reviews: 63,
    material: "100% European Linen",
    materialAr: "100% كتان أوروبي",
    madeIn: "France",
    madeInAr: "فرنسا",
  },
  {
    id: "4",
    name: "Palazzo Wide-Leg Trousers",
    nameAr: "بنطال بالازو واسع الساق",
    description:
      "These high-waisted trousers are tailored from Italian wool blend fabric. The flowing wide-leg silhouette creates an effortlessly elegant line from day to evening.",
    descriptionAr:
      "هذا البنطال عالي الخصر مفصل من قماش الصوف الإيطالي المخلوط. تخلق قصة الساق الواسعة المنسدلة خطاً أنيقاً بلا عناء من النهار إلى المساء.",
    price: 295,
    category: "Bottoms",
    categoryAr: "البناطيل والتنانير",
    categorySlug: "bottoms",
    images: {
      main: "/images/products/tailored-trousers-1.jpg",
      hover: "/images/products/tailored-trousers-1-hover.jpg",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Charcoal", nameAr: "فحمي", hex: "#36454F" },
      { name: "Ivory", nameAr: "عاجي", hex: "#FFFEF5" },
      { name: "Navy", nameAr: "كحلي", hex: "#1B2A4A" },
    ],
    isFeatured: true,
    rating: 4.7,
    reviews: 89,
    material: "95% Wool, 5% Elastane",
    materialAr: "95% صوف، 5% إيلاستين",
    madeIn: "Italy",
    madeInAr: "إيطاليا",
  },
  {
    id: "5",
    name: "Sculptural Wrap Blazer",
    nameAr: "سترة لف منحوتة",
    description:
      "Architecture meets fashion in this impeccably constructed blazer. The wrap design cinches at the waist for a flattering fit, crafted from Japanese wool crepe.",
    descriptionAr:
      "تلتقي العمارة بالأزياء في هذه السترة المصممة بإتقان. يضيق تصميم اللف عند الخصر لقصة محببة، مصنوعة من كريب الصوف الياباني.",
    price: 685,
    category: "Outerwear",
    categoryAr: "الملابس الخارجية",
    categorySlug: "outerwear",
    images: {
      main: "/images/products/wrap-blazer-1.jpg",
      hover: "/images/products/wrap-blazer-1-hover.jpg",
    },
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Noir", nameAr: "أسود", hex: "#1a1a1a" },
      { name: "Burgundy", nameAr: "عنابي", hex: "#722F37" },
    ],
    rating: 4.9,
    reviews: 34,
    material: "100% Japanese Wool Crepe",
    materialAr: "100% كريب الصوف الياباني",
    madeIn: "Japan",
    madeInAr: "اليابان",
  },
  {
    id: "6",
    name: "Cloud Cashmere Sweater",
    nameAr: "سترة كشمير السحابة",
    description:
      "Sink into pure luxury with this oversized cashmere sweater. Knitted from Grade-A Mongolian cashmere, it offers incomparable warmth without weight.",
    descriptionAr:
      "انغمسي في الفخامة المطلقة مع سترة الكشمير الفضفاضة هذه. محاكة من كشمير منغولي درجة A، توفر دفئاً لا يضاهى بدون ثقل.",
    price: 525,
    category: "Tops",
    categoryAr: "القمصان",
    categorySlug: "tops",
    images: {
      main: "/images/products/knit-sweater-1.jpg",
      hover: "/images/products/knit-sweater-1-hover.jpg",
    },
    sizes: ["XS/S", "M/L", "XL"],
    colors: [
      { name: "Oatmeal", nameAr: "شوفاني", hex: "#D3C4A5" },
      { name: "Heather Grey", nameAr: "رمادي خلنجي", hex: "#9E9E9E" },
      { name: "Blush", nameAr: "وردي فاتح", hex: "#E8C4C4" },
    ],
    isNew: true,
    isFeatured: true,
    rating: 5.0,
    reviews: 72,
    material: "100% Grade-A Mongolian Cashmere",
    materialAr: "100% كشمير منغولي درجة A",
    madeIn: "Scotland",
    madeInAr: "اسكتلندا",
  },
];

export const getFeaturedProducts = () => products.filter((p) => p.isFeatured);
export const getNewProducts = () => products.filter((p) => p.isNew);
export const getProductsByCategory = (slug: string) =>
  products.filter((p) => p.categorySlug === slug);
export const getProductById = (id: string) => products.find((p) => p.id === id);
