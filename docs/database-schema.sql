-- =====================================================
-- MAISON Luxury Fashion E-Commerce
-- MySQL Database Schema v2.0
-- Full Arabic Language Support (RTL)
-- =====================================================

-- Set character set and collation for Arabic support
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
SET collation_connection = 'utf8mb4_unicode_ci';

-- Drop existing tables (in reverse order of dependencies)
DROP TABLE IF EXISTS translations;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS wishlist_items;
DROP TABLE IF EXISTS wishlists;
DROP TABLE IF EXISTS cart_items;
DROP TABLE IF EXISTS carts;
DROP TABLE IF EXISTS product_images;
DROP TABLE IF EXISTS product_sizes;
DROP TABLE IF EXISTS product_colors;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS addresses;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS site_settings;
DROP TABLE IF EXISTS languages;

-- =====================================================
-- LANGUAGES TABLE
-- Supported languages for the platform
-- =====================================================
CREATE TABLE languages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(5) NOT NULL UNIQUE,    -- e.g., 'en', 'ar'
    name VARCHAR(50) NOT NULL,           -- e.g., 'English', 'العربية'
    native_name VARCHAR(50) NOT NULL,    -- e.g., 'English', 'العربية'
    direction ENUM('ltr', 'rtl') NOT NULL DEFAULT 'ltr',
    is_active BOOLEAN DEFAULT TRUE,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- SITE_SETTINGS TABLE
-- Global site configuration including language preferences
-- =====================================================
CREATE TABLE site_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT,
    setting_value_ar TEXT,  -- Arabic translation
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- USERS TABLE
-- Stores customer and admin user information
-- =====================================================
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    first_name_ar VARCHAR(100),          -- Arabic name (optional)
    last_name VARCHAR(100) NOT NULL,
    last_name_ar VARCHAR(100),           -- Arabic last name (optional)
    phone VARCHAR(20),
    preferred_language ENUM('en', 'ar') DEFAULT 'en',
    role ENUM('customer', 'admin') DEFAULT 'customer',
    is_active BOOLEAN DEFAULT TRUE,
    email_verified_at TIMESTAMP NULL,
    remember_token VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_users_email (email),
    INDEX idx_users_role (role),
    INDEX idx_users_language (preferred_language)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- ADDRESSES TABLE
-- Stores shipping and billing addresses for users
-- =====================================================
CREATE TABLE addresses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    type ENUM('shipping', 'billing') NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    first_name VARCHAR(100) NOT NULL,
    first_name_ar VARCHAR(100),
    last_name VARCHAR(100) NOT NULL,
    last_name_ar VARCHAR(100),
    company VARCHAR(255),
    company_ar VARCHAR(255),
    address_line_1 VARCHAR(255) NOT NULL,
    address_line_1_ar VARCHAR(255),
    address_line_2 VARCHAR(255),
    address_line_2_ar VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    city_ar VARCHAR(100),                -- Arabic city name
    state VARCHAR(100) NOT NULL,
    state_ar VARCHAR(100),               -- Arabic state/region
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL DEFAULT 'United States',
    country_ar VARCHAR(100),             -- Arabic country name
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_addresses_user (user_id),
    INDEX idx_addresses_type (type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- CATEGORIES TABLE
-- Product categories with hierarchical support
-- =====================================================
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    parent_id INT NULL,
    name VARCHAR(100) NOT NULL,
    name_ar VARCHAR(100) NOT NULL,       -- Arabic translation (required)
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    description_ar TEXT,                  -- Arabic description
    meta_title VARCHAR(255),
    meta_title_ar VARCHAR(255),
    meta_description TEXT,
    meta_description_ar TEXT,
    image_url VARCHAR(500),
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL,
    INDEX idx_categories_slug (slug),
    INDEX idx_categories_parent (parent_id),
    FULLTEXT INDEX idx_categories_search (name, name_ar, description, description_ar)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- PRODUCTS TABLE
-- Main product information with full bilingual support
-- =====================================================
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT NOT NULL,
    sku VARCHAR(50) NOT NULL UNIQUE,
    
    -- English content
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    short_description VARCHAR(500),
    
    -- Arabic content (required for RTL support)
    name_ar VARCHAR(255) NOT NULL,
    description_ar TEXT,
    short_description_ar VARCHAR(500),
    
    -- Pricing
    price DECIMAL(10, 2) NOT NULL,
    original_price DECIMAL(10, 2),        -- For showing discounts
    cost_price DECIMAL(10, 2),            -- For profit calculation
    currency ENUM('USD', 'SAR', 'AED', 'KWD', 'QAR', 'BHD', 'OMR', 'EGP') DEFAULT 'USD',
    
    -- Stock
    stock_quantity INT DEFAULT 0,
    low_stock_threshold INT DEFAULT 5,
    
    -- Status flags
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    is_new BOOLEAN DEFAULT FALSE,
    is_bestseller BOOLEAN DEFAULT FALSE,
    
    -- SEO - English
    meta_title VARCHAR(255),
    meta_description TEXT,
    
    -- SEO - Arabic
    meta_title_ar VARCHAR(255),
    meta_description_ar TEXT,
    
    -- Product details - Bilingual
    care_instructions TEXT,
    care_instructions_ar TEXT,
    material VARCHAR(255),
    material_ar VARCHAR(255),
    made_in VARCHAR(100),
    made_in_ar VARCHAR(100),
    
    -- Additional attributes
    weight DECIMAL(8, 2),
    dimensions VARCHAR(100),              -- e.g., "50x30x10 cm"
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT,
    INDEX idx_products_category (category_id),
    INDEX idx_products_slug (slug),
    INDEX idx_products_sku (sku),
    INDEX idx_products_featured (is_featured),
    INDEX idx_products_new (is_new),
    INDEX idx_products_active (is_active),
    INDEX idx_products_price (price),
    FULLTEXT INDEX idx_products_search (name, name_ar, description, description_ar, short_description, short_description_ar)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- PRODUCT_IMAGES TABLE
-- Supports multiple images per product (for hover effects)
-- =====================================================
CREATE TABLE product_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(255),
    alt_text_ar VARCHAR(255),             -- Arabic alt text for accessibility
    sort_order INT DEFAULT 0,
    is_primary BOOLEAN DEFAULT FALSE,
    is_hover BOOLEAN DEFAULT FALSE,       -- Secondary image shown on hover
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_product_images_product (product_id),
    INDEX idx_product_images_primary (is_primary)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- PRODUCT_COLORS TABLE
-- Available colors for each product (bilingual)
-- =====================================================
CREATE TABLE product_colors (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    name_ar VARCHAR(50) NOT NULL,         -- Arabic color name (required)
    hex_code VARCHAR(7) NOT NULL,         -- e.g., #FFFFFF
    image_url VARCHAR(500),               -- Optional color swatch image
    sort_order INT DEFAULT 0,
    is_available BOOLEAN DEFAULT TRUE,
    
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_product_colors_product (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- PRODUCT_SIZES TABLE
-- Available sizes for each product with stock tracking
-- =====================================================
CREATE TABLE product_sizes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    size VARCHAR(20) NOT NULL,            -- e.g., XS, S, M, L, XL
    size_label VARCHAR(50),               -- e.g., "Extra Small"
    size_label_ar VARCHAR(50),            -- Arabic size label
    stock_quantity INT DEFAULT 0,
    sort_order INT DEFAULT 0,
    
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_product_sizes_product (product_id),
    UNIQUE KEY unique_product_size (product_id, size)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- CARTS TABLE
-- Shopping carts for users (and guests via session)
-- =====================================================
CREATE TABLE carts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NULL,                     -- NULL for guest carts
    session_id VARCHAR(255) NULL,         -- For guest carts
    currency ENUM('USD', 'SAR', 'AED', 'KWD', 'QAR', 'BHD', 'OMR', 'EGP') DEFAULT 'USD',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_carts_user (user_id),
    INDEX idx_carts_session (session_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- CART_ITEMS TABLE
-- Individual items in shopping carts
-- =====================================================
CREATE TABLE cart_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cart_id INT NOT NULL,
    product_id INT NOT NULL,
    size VARCHAR(20) NOT NULL,
    color VARCHAR(50) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_cart_items_cart (cart_id),
    UNIQUE KEY unique_cart_item (cart_id, product_id, size, color)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- WISHLISTS TABLE
-- User wishlists
-- =====================================================
CREATE TABLE wishlists (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    name VARCHAR(100) DEFAULT 'My Wishlist',
    name_ar VARCHAR(100) DEFAULT 'قائمة أمنياتي',
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_wishlists_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- WISHLIST_ITEMS TABLE
-- Products in wishlists
-- =====================================================
CREATE TABLE wishlist_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    wishlist_id INT NOT NULL,
    product_id INT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (wishlist_id) REFERENCES wishlists(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_wishlist_items_wishlist (wishlist_id),
    UNIQUE KEY unique_wishlist_item (wishlist_id, product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- ORDERS TABLE
-- Customer orders with bilingual address support
-- =====================================================
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded') DEFAULT 'pending',
    status_ar ENUM('قيد الانتظار', 'قيد المعالجة', 'تم الشحن', 'تم التسليم', 'ملغي', 'مسترد') DEFAULT 'قيد الانتظار',
    
    -- Pricing
    subtotal DECIMAL(10, 2) NOT NULL,
    shipping_cost DECIMAL(10, 2) DEFAULT 0.00,
    tax DECIMAL(10, 2) DEFAULT 0.00,
    discount DECIMAL(10, 2) DEFAULT 0.00,
    total DECIMAL(10, 2) NOT NULL,
    currency ENUM('USD', 'SAR', 'AED', 'KWD', 'QAR', 'BHD', 'OMR', 'EGP') DEFAULT 'USD',
    
    -- Shipping address snapshot (English)
    shipping_first_name VARCHAR(100) NOT NULL,
    shipping_last_name VARCHAR(100) NOT NULL,
    shipping_address_line_1 VARCHAR(255) NOT NULL,
    shipping_address_line_2 VARCHAR(255),
    shipping_city VARCHAR(100) NOT NULL,
    shipping_state VARCHAR(100) NOT NULL,
    shipping_postal_code VARCHAR(20) NOT NULL,
    shipping_country VARCHAR(100) NOT NULL,
    shipping_phone VARCHAR(20),
    
    -- Shipping address snapshot (Arabic)
    shipping_first_name_ar VARCHAR(100),
    shipping_last_name_ar VARCHAR(100),
    shipping_address_line_1_ar VARCHAR(255),
    shipping_address_line_2_ar VARCHAR(255),
    shipping_city_ar VARCHAR(100),
    shipping_state_ar VARCHAR(100),
    shipping_country_ar VARCHAR(100),
    
    -- Billing address snapshot (English)
    billing_first_name VARCHAR(100),
    billing_last_name VARCHAR(100),
    billing_address_line_1 VARCHAR(255),
    billing_address_line_2 VARCHAR(255),
    billing_city VARCHAR(100),
    billing_state VARCHAR(100),
    billing_postal_code VARCHAR(20),
    billing_country VARCHAR(100),
    
    -- Billing address snapshot (Arabic)
    billing_first_name_ar VARCHAR(100),
    billing_last_name_ar VARCHAR(100),
    billing_address_line_1_ar VARCHAR(255),
    billing_city_ar VARCHAR(100),
    billing_country_ar VARCHAR(100),
    
    notes TEXT,
    notes_ar TEXT,
    shipped_at TIMESTAMP NULL,
    delivered_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT,
    INDEX idx_orders_user (user_id),
    INDEX idx_orders_number (order_number),
    INDEX idx_orders_status (status),
    INDEX idx_orders_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- ORDER_ITEMS TABLE
-- Individual items in orders (bilingual snapshots)
-- =====================================================
CREATE TABLE order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    
    -- Product snapshot at time of purchase (English)
    product_name VARCHAR(255) NOT NULL,
    product_sku VARCHAR(50) NOT NULL,
    
    -- Product snapshot at time of purchase (Arabic)
    product_name_ar VARCHAR(255),
    
    size VARCHAR(20) NOT NULL,
    color VARCHAR(50) NOT NULL,
    color_ar VARCHAR(50),                 -- Arabic color name snapshot
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT,
    INDEX idx_order_items_order (order_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- PAYMENTS TABLE
-- Payment transactions for orders
-- =====================================================
CREATE TABLE payments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    payment_method ENUM('credit_card', 'paypal', 'apple_pay', 'google_pay', 'bank_transfer', 'mada', 'stc_pay', 'tamara', 'tabby') NOT NULL,
    payment_provider VARCHAR(50),         -- e.g., 'stripe', 'paypal', 'moyasar', 'hyperpay'
    transaction_id VARCHAR(255),          -- External payment ID
    status ENUM('pending', 'completed', 'failed', 'refunded', 'partially_refunded') DEFAULT 'pending',
    amount DECIMAL(10, 2) NOT NULL,
    currency ENUM('USD', 'SAR', 'AED', 'KWD', 'QAR', 'BHD', 'OMR', 'EGP') DEFAULT 'USD',
    
    -- Card info (masked/partial for display)
    card_last_four VARCHAR(4),
    card_brand VARCHAR(20),               -- Visa, Mastercard, mada, etc.
    
    paid_at TIMESTAMP NULL,
    refunded_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE RESTRICT,
    INDEX idx_payments_order (order_id),
    INDEX idx_payments_transaction (transaction_id),
    INDEX idx_payments_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- REVIEWS TABLE
-- Product reviews and ratings (bilingual)
-- =====================================================
CREATE TABLE reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    order_id INT NULL,                    -- Link to verified purchase
    rating TINYINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    
    -- Review content (English)
    title VARCHAR(255),
    content TEXT,
    
    -- Review content (Arabic)
    title_ar VARCHAR(255),
    content_ar TEXT,
    
    is_verified_purchase BOOLEAN DEFAULT FALSE,
    is_approved BOOLEAN DEFAULT FALSE,
    helpful_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL,
    INDEX idx_reviews_product (product_id),
    INDEX idx_reviews_user (user_id),
    INDEX idx_reviews_rating (rating),
    INDEX idx_reviews_approved (is_approved),
    UNIQUE KEY unique_user_product_review (user_id, product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TRANSLATIONS TABLE
-- Dynamic translations for UI elements
-- =====================================================
CREATE TABLE translations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    language_code VARCHAR(5) NOT NULL,
    translation_key VARCHAR(255) NOT NULL,
    translation_value TEXT NOT NULL,
    context VARCHAR(100),                 -- e.g., 'navigation', 'product', 'checkout'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    UNIQUE KEY unique_translation (language_code, translation_key),
    INDEX idx_translations_key (translation_key),
    INDEX idx_translations_context (context)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- =====================================================
-- SAMPLE DATA INSERTION
-- =====================================================

-- Insert supported languages
INSERT INTO languages (code, name, native_name, direction, is_active, is_default) VALUES
('en', 'English', 'English', 'ltr', TRUE, TRUE),
('ar', 'Arabic', 'العربية', 'rtl', TRUE, FALSE);

-- Insert site settings
INSERT INTO site_settings (setting_key, setting_value, setting_value_ar) VALUES
('site_name', 'MAISON', 'ميزون'),
('site_tagline', 'Luxury Fashion', 'أزياء فاخرة'),
('currency_default', 'USD', 'USD'),
('shipping_text', 'Free shipping on orders over $500', 'شحن مجاني للطلبات التي تزيد عن 500 دولار'),
('return_policy', '30-day returns', 'سياسة إرجاع 30 يوم');

-- Insert sample categories
INSERT INTO categories (name, name_ar, slug, description, description_ar) VALUES
('Dresses', 'فساتين', 'dresses', 'Elegant dresses for every occasion', 'فساتين أنيقة لكل مناسبة'),
('Outerwear', 'الملابس الخارجية', 'outerwear', 'Luxurious coats and jackets', 'معاطف وجاكيتات فاخرة'),
('Tops', 'القمصان', 'tops', 'Refined blouses and shirts', 'بلوزات وقمصان راقية'),
('Bottoms', 'البناطيل والتنانير', 'bottoms', 'Tailored trousers and skirts', 'بناطيل وتنانير مفصلة'),
('Accessories', 'الإكسسوارات', 'accessories', 'Luxury bags, scarves and jewelry', 'حقائب وأوشحة ومجوهرات فاخرة');

-- Insert sample admin user (password: Admin123!)
INSERT INTO users (email, password_hash, first_name, first_name_ar, last_name, last_name_ar, role, preferred_language) VALUES
('admin@maison.com', '$2b$10$rQZ5YqHh4.8L.3CXdCVnZONBYXW3x8y1K2.3Z4B5C6D7E8F9G0H1', 'Admin', 'مدير', 'User', 'المستخدم', 'admin', 'en');

-- Insert sample products with full Arabic support
INSERT INTO products (category_id, sku, name, name_ar, slug, description, description_ar, short_description, short_description_ar, price, original_price, is_featured, is_new, material, material_ar, made_in, made_in_ar) VALUES
(3, 'SKU-001', 'Ethereal Silk Blouse', 'بلوزة حرير أثيرية', 'ethereal-silk-blouse', 
    'Crafted from the finest mulberry silk, this blouse drapes beautifully with a relaxed yet refined silhouette. Features mother-of-pearl buttons and French seams throughout.', 
    'مصنوعة من أجود أنواع حرير التوت، تتميز هذه البلوزة بانسدالها الجميل مع قصة مريحة وأنيقة. تتميز بأزرار من عرق اللؤلؤ ودرزات فرنسية في جميع أنحائها.',
    'Luxurious silk blouse with elegant draping',
    'بلوزة حرير فاخرة بانسدال أنيق',
    385.00, NULL, TRUE, TRUE, '100% Mulberry Silk', '100% حرير التوت', 'Italy', 'إيطاليا'),
    
(2, 'SKU-002', 'Cashmere Cocoon Coat', 'معطف كشمير الشرنقة', 'cashmere-cocoon-coat', 
    'Envelop yourself in unparalleled softness with this double-faced cashmere coat. The cocoon silhouette offers both comfort and sophistication for the modern woman.', 
    'احتضني نفسك بنعومة لا مثيل لها مع معطف الكشمير ذو الوجهين. تقدم قصة الشرنقة الراحة والأناقة للمرأة العصرية.',
    'Double-faced cashmere coat with cocoon silhouette',
    'معطف كشمير ذو وجهين بقصة الشرنقة',
    1250.00, 1450.00, TRUE, FALSE, '100% Cashmere', '100% كشمير', 'Italy', 'إيطاليا'),
    
(1, 'SKU-003', 'Botanical Linen Dress', 'فستان الكتان النباتي', 'botanical-linen-dress', 
    'A celebration of understated elegance in premium European linen. This midi dress features a flattering A-line cut with thoughtful details including hidden pockets.', 
    'احتفاء بالأناقة الهادئة في الكتان الأوروبي الفاخر. يتميز هذا الفستان الميدي بقصة A-line المحببة مع تفاصيل مدروسة تشمل جيوب مخفية.',
    'Premium linen midi dress with A-line silhouette',
    'فستان ميدي من الكتان الفاخر بقصة A-line',
    445.00, NULL, FALSE, TRUE, '100% European Linen', '100% كتان أوروبي', 'France', 'فرنسا'),
    
(4, 'SKU-004', 'Palazzo Wide-Leg Trousers', 'بنطال بالازو واسع الساق', 'palazzo-wide-leg-trousers', 
    'These high-waisted trousers are tailored from Italian wool blend fabric. The flowing wide-leg silhouette creates an effortlessly elegant line from day to evening.', 
    'هذا البنطال عالي الخصر مفصل من قماش الصوف الإيطالي المخلوط. تخلق قصة الساق الواسعة المنسدلة خطاً أنيقاً بلا عناء من النهار إلى المساء.',
    'High-waisted Italian wool wide-leg trousers',
    'بنطال واسع الساق من الصوف الإيطالي عالي الخصر',
    295.00, NULL, TRUE, FALSE, '95% Wool, 5% Elastane', '95% صوف، 5% إيلاستين', 'Italy', 'إيطاليا'),
    
(2, 'SKU-005', 'Sculptural Wrap Blazer', 'سترة لف منحوتة', 'sculptural-wrap-blazer', 
    'Architecture meets fashion in this impeccably constructed blazer. The wrap design cinches at the waist for a flattering fit, crafted from Japanese wool crepe.', 
    'تلتقي العمارة بالأزياء في هذه السترة المصممة بإتقان. يضيق تصميم اللف عند الخصر لقصة محببة، مصنوعة من كريب الصوف الياباني.',
    'Architectural blazer with wrap design',
    'سترة معمارية بتصميم لف',
    685.00, NULL, FALSE, FALSE, '100% Japanese Wool Crepe', '100% كريب الصوف الياباني', 'Japan', 'اليابان'),
    
(3, 'SKU-006', 'Cloud Cashmere Sweater', 'سترة كشمير السحابة', 'cloud-cashmere-sweater', 
    'Sink into pure luxury with this oversized cashmere sweater. Knitted from Grade-A Mongolian cashmere, it offers incomparable warmth without weight.', 
    'انغمسي في الفخامة المطلقة مع سترة الكشمير الفضفاضة هذه. محاكة من كشمير منغولي درجة A، توفر دفئاً لا يضاهى بدون ثقل.',
    'Oversized Grade-A Mongolian cashmere sweater',
    'سترة كشمير منغولي فضفاضة درجة A',
    525.00, NULL, TRUE, TRUE, '100% Grade-A Mongolian Cashmere', '100% كشمير منغولي درجة A', 'Scotland', 'اسكتلندا');

-- Insert product images
INSERT INTO product_images (product_id, image_url, alt_text, alt_text_ar, is_primary, is_hover, sort_order) VALUES
(1, '/images/products/silk-blouse-1.jpg', 'Ethereal Silk Blouse - Front View', 'بلوزة حرير أثيرية - منظر أمامي', TRUE, FALSE, 1),
(1, '/images/products/silk-blouse-1-hover.jpg', 'Ethereal Silk Blouse - Back View', 'بلوزة حرير أثيرية - منظر خلفي', FALSE, TRUE, 2),
(2, '/images/products/cashmere-coat-1.jpg', 'Cashmere Cocoon Coat - Front View', 'معطف كشمير الشرنقة - منظر أمامي', TRUE, FALSE, 1),
(2, '/images/products/cashmere-coat-1-hover.jpg', 'Cashmere Cocoon Coat - Back View', 'معطف كشمير الشرنقة - منظر خلفي', FALSE, TRUE, 2),
(3, '/images/products/linen-dress-1.jpg', 'Botanical Linen Dress - Front View', 'فستان الكتان النباتي - منظر أمامي', TRUE, FALSE, 1),
(3, '/images/products/linen-dress-1-hover.jpg', 'Botanical Linen Dress - Back View', 'فستان الكتان النباتي - منظر خلفي', FALSE, TRUE, 2),
(4, '/images/products/tailored-trousers-1.jpg', 'Palazzo Trousers - Front View', 'بنطال بالازو - منظر أمامي', TRUE, FALSE, 1),
(4, '/images/products/tailored-trousers-1-hover.jpg', 'Palazzo Trousers - Side View', 'بنطال بالازو - منظر جانبي', FALSE, TRUE, 2),
(5, '/images/products/wrap-blazer-1.jpg', 'Sculptural Wrap Blazer - Front View', 'سترة لف منحوتة - منظر أمامي', TRUE, FALSE, 1),
(5, '/images/products/wrap-blazer-1-hover.jpg', 'Sculptural Wrap Blazer - Back View', 'سترة لف منحوتة - منظر خلفي', FALSE, TRUE, 2),
(6, '/images/products/knit-sweater-1.jpg', 'Cloud Cashmere Sweater - Front View', 'سترة كشمير السحابة - منظر أمامي', TRUE, FALSE, 1),
(6, '/images/products/knit-sweater-1-hover.jpg', 'Cloud Cashmere Sweater - Side View', 'سترة كشمير السحابة - منظر جانبي', FALSE, TRUE, 2);

-- Insert product colors with Arabic translations
INSERT INTO product_colors (product_id, name, name_ar, hex_code, sort_order) VALUES
(1, 'Ivory', 'عاجي', '#FFFEF5', 1),
(1, 'Champagne', 'شمبانيا', '#F7E7CE', 2),
(1, 'Noir', 'أسود', '#1a1a1a', 3),
(2, 'Camel', 'جملي', '#C19A6B', 1),
(2, 'Charcoal', 'فحمي', '#36454F', 2),
(3, 'Sage', 'أخضر رمادي', '#9DC183', 1),
(3, 'Sand', 'رملي', '#C2B280', 2),
(3, 'Ecru', 'إكرو', '#F5F5DC', 3),
(4, 'Charcoal', 'فحمي', '#36454F', 1),
(4, 'Ivory', 'عاجي', '#FFFEF5', 2),
(4, 'Navy', 'كحلي', '#1B2A4A', 3),
(5, 'Noir', 'أسود', '#1a1a1a', 1),
(5, 'Burgundy', 'عنابي', '#722F37', 2),
(6, 'Oatmeal', 'شوفاني', '#D3C4A5', 1),
(6, 'Heather Grey', 'رمادي خلنجي', '#9E9E9E', 2),
(6, 'Blush', 'وردي فاتح', '#E8C4C4', 3);

-- Insert product sizes with Arabic labels
INSERT INTO product_sizes (product_id, size, size_label, size_label_ar, stock_quantity, sort_order) VALUES
(1, 'XS', 'Extra Small', 'صغير جداً', 10, 1), 
(1, 'S', 'Small', 'صغير', 15, 2), 
(1, 'M', 'Medium', 'وسط', 20, 3), 
(1, 'L', 'Large', 'كبير', 15, 4), 
(1, 'XL', 'Extra Large', 'كبير جداً', 10, 5),
(2, 'XS', 'Extra Small', 'صغير جداً', 5, 1), 
(2, 'S', 'Small', 'صغير', 8, 2), 
(2, 'M', 'Medium', 'وسط', 10, 3), 
(2, 'L', 'Large', 'كبير', 8, 4),
(3, 'XS', 'Extra Small', 'صغير جداً', 12, 1), 
(3, 'S', 'Small', 'صغير', 18, 2), 
(3, 'M', 'Medium', 'وسط', 20, 3), 
(3, 'L', 'Large', 'كبير', 15, 4), 
(3, 'XL', 'Extra Large', 'كبير جداً', 10, 5),
(4, 'XS', 'Extra Small', 'صغير جداً', 10, 1), 
(4, 'S', 'Small', 'صغير', 15, 2), 
(4, 'M', 'Medium', 'وسط', 18, 3), 
(4, 'L', 'Large', 'كبير', 12, 4),
(5, 'S', 'Small', 'صغير', 8, 1), 
(5, 'M', 'Medium', 'وسط', 12, 2), 
(5, 'L', 'Large', 'كبير', 10, 3), 
(5, 'XL', 'Extra Large', 'كبير جداً', 6, 4),
(6, 'XS', 'Extra Small', 'صغير جداً', 15, 1), 
(6, 'S', 'Small', 'صغير', 20, 2), 
(6, 'M', 'Medium', 'وسط', 25, 3), 
(6, 'L', 'Large', 'كبير', 20, 4), 
(6, 'XL', 'Extra Large', 'كبير جداً', 15, 5);

-- Insert common UI translations
INSERT INTO translations (language_code, translation_key, translation_value, context) VALUES
-- Navigation
('ar', 'nav.home', 'الرئيسية', 'navigation'),
('ar', 'nav.shop', 'تسوق', 'navigation'),
('ar', 'nav.collections', 'المجموعات', 'navigation'),
('ar', 'nav.about', 'من نحن', 'navigation'),
('ar', 'nav.contact', 'اتصل بنا', 'navigation'),
('ar', 'nav.search', 'بحث', 'navigation'),
('ar', 'nav.wishlist', 'قائمة الأمنيات', 'navigation'),
('ar', 'nav.cart', 'سلة التسوق', 'navigation'),
('ar', 'nav.account', 'حسابي', 'navigation'),

-- Product
('ar', 'product.add_to_cart', 'أضف إلى السلة', 'product'),
('ar', 'product.add_to_wishlist', 'أضف إلى قائمة الأمنيات', 'product'),
('ar', 'product.size', 'المقاس', 'product'),
('ar', 'product.color', 'اللون', 'product'),
('ar', 'product.quantity', 'الكمية', 'product'),
('ar', 'product.in_stock', 'متوفر', 'product'),
('ar', 'product.out_of_stock', 'غير متوفر', 'product'),
('ar', 'product.new', 'جديد', 'product'),
('ar', 'product.sale', 'تخفيض', 'product'),
('ar', 'product.description', 'الوصف', 'product'),
('ar', 'product.details', 'التفاصيل', 'product'),
('ar', 'product.material', 'الخامة', 'product'),
('ar', 'product.care', 'العناية', 'product'),
('ar', 'product.made_in', 'صنع في', 'product'),
('ar', 'product.reviews', 'التقييمات', 'product'),

-- Cart
('ar', 'cart.title', 'سلة التسوق', 'cart'),
('ar', 'cart.empty', 'سلة التسوق فارغة', 'cart'),
('ar', 'cart.subtotal', 'المجموع الفرعي', 'cart'),
('ar', 'cart.shipping', 'الشحن', 'cart'),
('ar', 'cart.total', 'المجموع', 'cart'),
('ar', 'cart.checkout', 'إتمام الشراء', 'cart'),
('ar', 'cart.continue_shopping', 'متابعة التسوق', 'cart'),
('ar', 'cart.remove', 'إزالة', 'cart'),

-- Checkout
('ar', 'checkout.title', 'إتمام الشراء', 'checkout'),
('ar', 'checkout.shipping_address', 'عنوان الشحن', 'checkout'),
('ar', 'checkout.billing_address', 'عنوان الفوترة', 'checkout'),
('ar', 'checkout.payment', 'الدفع', 'checkout'),
('ar', 'checkout.place_order', 'تأكيد الطلب', 'checkout'),
('ar', 'checkout.order_summary', 'ملخص الطلب', 'checkout'),

-- Account
('ar', 'account.login', 'تسجيل الدخول', 'account'),
('ar', 'account.register', 'إنشاء حساب', 'account'),
('ar', 'account.logout', 'تسجيل الخروج', 'account'),
('ar', 'account.my_orders', 'طلباتي', 'account'),
('ar', 'account.my_wishlist', 'قائمة أمنياتي', 'account'),
('ar', 'account.my_addresses', 'عناويني', 'account'),
('ar', 'account.settings', 'الإعدادات', 'account'),

-- Orders
('ar', 'order.pending', 'قيد الانتظار', 'orders'),
('ar', 'order.processing', 'قيد المعالجة', 'orders'),
('ar', 'order.shipped', 'تم الشحن', 'orders'),
('ar', 'order.delivered', 'تم التسليم', 'orders'),
('ar', 'order.cancelled', 'ملغي', 'orders'),
('ar', 'order.refunded', 'مسترد', 'orders'),

-- Common
('ar', 'common.free_shipping', 'شحن مجاني للطلبات أكثر من', 'common'),
('ar', 'common.currency', 'العملة', 'common'),
('ar', 'common.language', 'اللغة', 'common'),
('ar', 'common.filter', 'تصفية', 'common'),
('ar', 'common.sort', 'ترتيب', 'common'),
('ar', 'common.view_all', 'عرض الكل', 'common'),
('ar', 'common.loading', 'جاري التحميل...', 'common'),
('ar', 'common.error', 'حدث خطأ', 'common'),
('ar', 'common.success', 'تمت العملية بنجاح', 'common');

-- =====================================================
-- STORED PROCEDURES FOR BILINGUAL QUERIES
-- =====================================================

DELIMITER //

-- Get product by language
CREATE PROCEDURE GetProductByLanguage(
    IN p_product_id INT,
    IN p_language VARCHAR(5)
)
BEGIN
    IF p_language = 'ar' THEN
        SELECT 
            id,
            sku,
            COALESCE(name_ar, name) AS name,
            slug,
            COALESCE(description_ar, description) AS description,
            COALESCE(short_description_ar, short_description) AS short_description,
            price,
            original_price,
            COALESCE(material_ar, material) AS material,
            COALESCE(made_in_ar, made_in) AS made_in,
            is_featured,
            is_new,
            created_at
        FROM products
        WHERE id = p_product_id;
    ELSE
        SELECT 
            id,
            sku,
            name,
            slug,
            description,
            short_description,
            price,
            original_price,
            material,
            made_in,
            is_featured,
            is_new,
            created_at
        FROM products
        WHERE id = p_product_id;
    END IF;
END //

-- Get categories by language
CREATE PROCEDURE GetCategoriesByLanguage(
    IN p_language VARCHAR(5)
)
BEGIN
    IF p_language = 'ar' THEN
        SELECT 
            id,
            parent_id,
            COALESCE(name_ar, name) AS name,
            slug,
            COALESCE(description_ar, description) AS description,
            image_url,
            sort_order
        FROM categories
        WHERE is_active = TRUE
        ORDER BY sort_order;
    ELSE
        SELECT 
            id,
            parent_id,
            name,
            slug,
            description,
            image_url,
            sort_order
        FROM categories
        WHERE is_active = TRUE
        ORDER BY sort_order;
    END IF;
END //

-- Search products (bilingual)
CREATE PROCEDURE SearchProducts(
    IN p_search_term VARCHAR(255),
    IN p_language VARCHAR(5),
    IN p_limit INT,
    IN p_offset INT
)
BEGIN
    IF p_language = 'ar' THEN
        SELECT 
            id,
            sku,
            COALESCE(name_ar, name) AS name,
            slug,
            COALESCE(short_description_ar, short_description) AS short_description,
            price,
            original_price,
            is_featured,
            is_new
        FROM products
        WHERE is_active = TRUE
          AND (
              name_ar LIKE CONCAT('%', p_search_term, '%')
              OR description_ar LIKE CONCAT('%', p_search_term, '%')
              OR name LIKE CONCAT('%', p_search_term, '%')
              OR description LIKE CONCAT('%', p_search_term, '%')
          )
        ORDER BY 
            CASE WHEN name_ar LIKE CONCAT('%', p_search_term, '%') THEN 1 ELSE 2 END,
            is_featured DESC,
            created_at DESC
        LIMIT p_limit OFFSET p_offset;
    ELSE
        SELECT 
            id,
            sku,
            name,
            slug,
            short_description,
            price,
            original_price,
            is_featured,
            is_new
        FROM products
        WHERE is_active = TRUE
          AND (
              name LIKE CONCAT('%', p_search_term, '%')
              OR description LIKE CONCAT('%', p_search_term, '%')
          )
        ORDER BY 
            CASE WHEN name LIKE CONCAT('%', p_search_term, '%') THEN 1 ELSE 2 END,
            is_featured DESC,
            created_at DESC
        LIMIT p_limit OFFSET p_offset;
    END IF;
END //

DELIMITER ;

-- =====================================================
-- VIEWS FOR COMMON QUERIES
-- =====================================================

-- Product listing view with primary image
CREATE VIEW v_product_listing AS
SELECT 
    p.id,
    p.sku,
    p.name,
    p.name_ar,
    p.slug,
    p.short_description,
    p.short_description_ar,
    p.price,
    p.original_price,
    p.is_featured,
    p.is_new,
    p.is_bestseller,
    c.name AS category_name,
    c.name_ar AS category_name_ar,
    c.slug AS category_slug,
    pi.image_url AS primary_image,
    pih.image_url AS hover_image
FROM products p
JOIN categories c ON p.category_id = c.id
LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = TRUE
LEFT JOIN product_images pih ON p.id = pih.product_id AND pih.is_hover = TRUE
WHERE p.is_active = TRUE;

-- Order summary view
CREATE VIEW v_order_summary AS
SELECT 
    o.id,
    o.order_number,
    o.status,
    o.status_ar,
    o.total,
    o.currency,
    o.created_at,
    u.email,
    u.first_name,
    u.first_name_ar,
    u.last_name,
    u.last_name_ar,
    COUNT(oi.id) AS item_count
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN order_items oi ON o.id = oi.order_id
GROUP BY o.id;
