function clothingProduct() {
    return {
        product: {
            // Basic Information
            id: 2501,
            name: "Premium Cotton Graphic T-Shirt",
            description: "Ultra-soft premium cotton t-shirt with original graphic designs. Pre-shrunk fabric with modern fit and reinforced stitching for durability.",
            base_price: 24.99,
            base_shipping_cost: 4.99,
            free_shipping: false,
            sku: "APPRL-TS-2501",
            slug: "premium-cotton-graphic-tshirt",
            brand: "Urban Threads",
            rating: 4.8,
            reviews_count: 236,

            // Status Information
            status: "active",
            isFeatured: true,
            isOnSale: false,
            requiresShipping: true,

            // Stock Management
            requiresInventoryTracking: true,
            stock: 25, // Default stock for Medium White Mountain design
            hasVariants: true,
            totalVariantStock: 485,
            lowStockThreshold: 10,

            // Product Details
            features: {
                material: "100% Ringspun Cotton, 180gsm",
                fit: "Modern fit, slightly tapered",
                neckline: "Reinforced crew neck",
                care: "Machine wash cold, tumble dry low",
                printing: "Water-based eco-friendly inks",
                origin: "Ethically manufactured",
                sustainability: "GOTS certified organic cotton"
            },

            // Main product images
            images: [
                "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop"
            ],

            // Product Configuration
            options: {
                "size": ["xs", "s", "m", "l", "xl", "2xl"],
                "color": ["white", "black", "navy", "heather gray"],
                "design": ["mountain", "wave", "sunset", "minimal"]
            },

            // Option Images
            option_images: {
                "color": {
                    "white": ["https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop"],
                    "black": ["https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop"],
                    "navy": ["https://images.unsplash.com/photo-1618354691438-25bc04584c23?w=800&auto=format&fit=crop"],
                    "heather gray": ["https://images.unsplash.com/photo-1618354691229-a8f91e7a3eb9?w=800&auto=format&fit=crop"]
                },
                "design": {
                    "mountain": ["https://images.unsplash.com/photo-1564412811189-a6d55a176f6c?w=800&auto=format&fit=crop"],
                    "wave": ["https://images.unsplash.com/photo-1533577116850-9cc66cad8a9b?w=800&auto=format&fit=crop"],
                    "sunset": ["https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=800&auto=format&fit=crop"],
                    "minimal": ["https://images.unsplash.com/photo-1567632661587-deaffec88b38?w=800&auto=format&fit=crop"]
                }
            },

            // Variant Images - Images for specific combinations of options
            variant_images: {
                "white|mountain": "https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=800&auto=format&fit=crop",
                "black|mountain": "https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=800&auto=format&fit=crop",
                "white|wave": "https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?w=800&auto=format&fit=crop",
                "navy|sunset": ["https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1622445275576-721325763afe?w=800&auto=format&fit=crop"],
                "heather gray|minimal": "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop"
            },

            // Option Variants Stock
            option_variants_stock: {
                "xs|white|mountain": 20,
                "s|white|mountain": 30,
                "m|white|mountain": 25,
                "l|white|mountain": 20,
                "xl|white|mountain": 15,
                "2xl|white|mountain": 10,
                "xs|black|mountain": 15,
                "s|black|mountain": 25,
                "m|black|mountain": 30,
                "l|black|mountain": 25,
                "xl|black|mountain": 15,
                "2xl|black|mountain": 10,
                "xs|navy|mountain": 10,
                "s|navy|mountain": 15,
                "m|navy|mountain": 20,
                "l|navy|mountain": 15,
                "xl|navy|mountain": 10,
                "2xl|navy|mountain": 5,
                "xs|white|wave": 10,
                "s|white|wave": 15,
                "m|white|wave": 20,
                "l|white|wave": 15,
                "xl|white|wave": 10,
                "2xl|white|wave": 5,
                "s|black|wave": 10,
                "m|black|wave": 15,
                "l|black|wave": 15,
                "xl|black|wave": 10,
                "s|navy|sunset": 10,
                "m|navy|sunset": 15,
                "l|navy|sunset": 15,
                "xl|navy|sunset": 10,
                "s|heather gray|minimal": 15,
                "m|heather gray|minimal": 20,
                "l|heather gray|minimal": 15,
                "xl|heather gray|minimal": 10
            },

            // Option Price Adjustments
            option_price_adjustments: {
                "size:xl": 2.00,
                "size:2xl": 4.00,
                "color:heather gray": 1.50,
                "design:sunset": 2.00
            },

            // Option Shipping Adjustments
            option_shipping_adjustments: {
                "size:xl": 2.00,
                "size:2xl": 3.50
            },

            // Physical Attributes
            weight: {
                value: 0.22,
                unit: 'kg'
            },
            dimensions: {
                length: 30,
                width: 25,
                height: 2,
                unit: 'cm'
            },

            // Option Dimension Overrides
            option_dimension_overrides: {
                "size:2xl": {
                    weight: {value: 0.28, unit: 'kg'},
                    dimensions: {length: 35, width: 30, height: 2, unit: 'cm'}
                }
            },

            // Categories
            categories: [101, 105, 110], // Apparel, T-Shirts, Graphic Tees

            // Related Products
            upselling: [2510, 2515], // Premium hoodie, long sleeve version
            crossSelling: [2601, 2701], // Joggers, hat with matching designs
            relatedProducts: [2502, 2503], // Other t-shirt designs

            // Timestamps
            createdAt: "2025-02-15T10:20:00Z",
            updatedAt: "2025-04-01T16:45:00Z"
        },

        // Product state
        selectedSize: "m",
        selectedColor: "white",
        selectedDesign: "mountain",
        selectedImage: '',
        isScrollLeftEnd: true,
        isScrollRightEnd: false,
        isOnSale: false,

        // Image zoom properties
        zoomed: false,
        isTouchDevice: false,
        scale: 2,
        origin: '50% 50%',
        panX: 0,
        panY: 0,
        minPanX: 0,
        maxPanX: 0,
        minPanY: 0,
        maxPanY: 0,
        dragStartX: 0,
        dragStartY: 0,
        dragging: false,
        lastTap: 0,
        imgStyle: '',

        init() {
            // Set initial selected image
            this.selectedImage = this.product.images[0];

            // Initialize zoom features
            this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            this.imgStyle = 'transform: scale(1); transform-origin: 50% 50%;';

            this.$nextTick(() => {
                this.checkScrollPosition();
            });
        },

        // Image zoom functions for desktop
        mouseMove(e) {
            if (!this.zoomed && !this.isTouchDevice) return;
            const img = this.$refs.mainImage;
            const rect = img.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            this.origin = `${x}% ${y}%`;
            this.updateZoomStyle();
        },

        mouseEnter(e) {
            if (this.isTouchDevice) return;
            this.zoomed = true;
            this.mouseMove(e);
        },

        mouseLeave() {
            if (this.isTouchDevice) return;
            this.zoomed = false;
            this.resetZoom();
        },

        // Image zoom functions for mobile
        touchStart(e) {
            const now = Date.now();
            if (e.touches.length > 1) return;

            if (now - this.lastTap < 350) {
                // Double tap detected
                if (!this.zoomed) {
                    // Zoom in centered on tap point
                    const img = this.$refs.mainImage;
                    const rect = img.getBoundingClientRect();
                    const touch = e.touches[0];
                    const percentX = (touch.clientX - rect.left) / rect.width;
                    const percentY = (touch.clientY - rect.top) / rect.height;
                    this.origin = `${percentX * 100}% ${percentY * 100}%`;
                    this.zoomed = true;
                    this.updateZoomStyle();
                    this.calcPanBounds();
                } else {
                    // Zoom out
                    this.zoomed = false;
                    this.panX = 0;
                    this.panY = 0;
                    this.resetZoom();
                }
                this.lastTap = 0;
                e.preventDefault();
            } else {
                // First tap or potential pan start
                this.lastTap = now;
                if (this.zoomed) {
                    this.dragging = true;
                    this.dragStartX = e.touches[0].clientX - this.panX;
                    this.dragStartY = e.touches[0].clientY - this.panY;
                }
            }
        },

        touchMove(e) {
            if (!this.zoomed || !this.dragging || e.touches.length !== 1) return;

            const x = e.touches[0].clientX - this.dragStartX;
            const y = e.touches[0].clientY - this.dragStartY;

            this.calcPanBounds();
            this.panX = Math.max(this.minPanX, Math.min(this.maxPanX, x));
            this.panY = Math.max(this.minPanY, Math.min(this.maxPanY, y));

            this.updateZoomStyle();
            e.preventDefault();
        },

        touchEnd() {
            this.dragging = false;
        },

        // Helper functions for image zoom
        updateZoomStyle() {
            if (this.zoomed) {
                if (this.isTouchDevice) {
                    this.imgStyle = `transform: scale(${this.scale}) translate(${this.panX / this.scale}px,${this.panY / this.scale}px); transform-origin: ${this.origin}; touch-action: none;`;
                } else {
                    this.imgStyle = `transform: scale(${this.scale}); transform-origin: ${this.origin};`;
                }
            } else {
                this.resetZoom();
            }
        },

        resetZoom() {
            this.imgStyle = 'transform: scale(1); transform-origin: 50% 50%;';
        },

        calcPanBounds() {
            const img = this.$refs.mainImage;
            const rect = img.getBoundingClientRect();
            const moveX = Math.max(0, (rect.width * (this.scale - 1)) / 2);
            const moveY = Math.max(0, (rect.height * (this.scale - 1)) / 2);
            this.minPanX = -moveX;
            this.maxPanX = moveX;
            this.minPanY = -moveY;
            this.maxPanY = moveY;
        },

        // Original product functions
        getShippingInfo() {
            if (this.product.free_shipping) {
                return "Free Shipping";
            }
            let shippingCost = this.product.base_shipping_cost;

            // Add shipping adjustments based on selected options
            const sizeKey = `size:${this.selectedSize}`;
            if (this.product.option_shipping_adjustments[sizeKey]) {
                shippingCost += this.product.option_shipping_adjustments[sizeKey];
            }

            if (shippingCost <= 0) {
                return "Free Shipping";
            }
            return `$${shippingCost.toFixed(2)}`;
        },

        selectSize(size) {
            this.selectedSize = size;
            // Update image if needed based on variant
            this.updateVariantImage();
        },

        selectColor(color) {
            this.selectedColor = color;
            // Find the corresponding image and display it
            if (this.product.option_images.color[color] && this.product.option_images.color[color].length > 0) {
                this.selectedImage = this.product.option_images.color[color][0];
                this.$nextTick(() => {
                    this.scrollToOptionThumbnails('color', color);
                });
            }
            // Update image if needed based on variant
            this.updateVariantImage();
        },

        selectDesign(design) {
            this.selectedDesign = design;
            // Find the corresponding image and display it
            if (this.product.option_images.design[design] && this.product.option_images.design[design].length > 0) {
                this.selectedImage = this.product.option_images.design[design][0];
                this.$nextTick(() => {
                    this.scrollToOptionThumbnails('design', design);
                });
            }
            // Update image if needed based on variant
            this.updateVariantImage();
        },

        selectImage(image) {
            this.selectedImage = image;
            // Check if image belongs to a specific color
            for (const color in this.product.option_images.color) {
                if (this.product.option_images.color[color].includes(image)) {
                    this.selectedColor = color;
                    return;
                }
            }
            // Check if image belongs to a specific design
            for (const design in this.product.option_images.design) {
                if (this.product.option_images.design[design].includes(image)) {
                    this.selectedDesign = design;
                    return;
                }
            }
            // Check if image belongs to a specific variant
            for (const key in this.product.variant_images) {
                if (Array.isArray(this.product.variant_images[key])) {
                    if (this.product.variant_images[key].includes(image)) {
                        this.selectVariantFromKey(key);
                        return;
                    }
                } else if (this.product.variant_images[key] === image) {
                    this.selectVariantFromKey(key);
                    return;
                }
            }
        },

        selectVariantFromKey(key) {
            const parts = key.split('|');
            if (parts.length === 2) {
                // For cases like "white|mountain"
                this.selectedColor = parts[0];
                this.selectedDesign = parts[1];
            }
        },

        updateVariantImage() {
            // Check if there's a specific image for the current color+design combo
            const variantKey = `${this.selectedColor}|${this.selectedDesign}`;
            if (this.product.variant_images[variantKey]) {
                const variantImage = Array.isArray(this.product.variant_images[variantKey])
                    ? this.product.variant_images[variantKey][0]
                    : this.product.variant_images[variantKey];
                this.selectedImage = variantImage;
            }
        },

        currentStock() {
            const variantKey = `${this.selectedSize}|${this.selectedColor}|${this.selectedDesign}`;
            return this.product.option_variants_stock[variantKey] || 0;
        },

        isVariantAvailable() {
            return this.currentStock() > 0;
        },

        isSizeAvailable(size) {
            // Check if any color/design combination is available with this size
            return Object.keys(this.product.option_variants_stock).some(key => {
                const parts = key.split('|');
                return parts[0] === size && this.product.option_variants_stock[key] > 0;
            });
        },

        isColorAvailable(color) {
            // Check if any size/design combination is available with this color
            return Object.keys(this.product.option_variants_stock).some(key => {
                const parts = key.split('|');
                return parts[1] === color && this.product.option_variants_stock[key] > 0;
            });
        },

        isDesignAvailable(design) {
            // Check if any size/color combination is available with this design
            return Object.keys(this.product.option_variants_stock).some(key => {
                const parts = key.split('|');
                return parts[2] === design && this.product.option_variants_stock[key] > 0;
            });
        },

        calculatePrice() {
            let price = this.product.base_price;

            // Add size price adjustment if applicable
            const sizeKey = `size:${this.selectedSize}`;
            if (this.product.option_price_adjustments[sizeKey]) {
                price += this.product.option_price_adjustments[sizeKey];
            }

            // Add color price adjustment if applicable
            const colorKey = `color:${this.selectedColor}`;
            if (this.product.option_price_adjustments[colorKey]) {
                price += this.product.option_price_adjustments[colorKey];
            }

            // Add design price adjustment if applicable
            const designKey = `design:${this.selectedDesign}`;
            if (this.product.option_price_adjustments[designKey]) {
                price += this.product.option_price_adjustments[designKey];
            }

            return price;
        },

        formatPrice(price) {
            return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },

        getColorHex(color) {
            // Return corresponding hex color code
            const colorMap = {
                'white': '#ffffff',
                'black': '#000000',
                'navy': '#000080',
                'heather gray': '#D3D3D3'
            };
            return colorMap[color] || '#cccccc';
        },

        scrollThumbnails(direction) {
            const container = this.$refs.thumbnailsContainer;
            const scrollAmount = container.clientWidth * 0.75;

            if (direction === 'left') {
                container.scrollLeft -= scrollAmount;
            } else {
                container.scrollLeft += scrollAmount;
            }
        },

        scrollToOptionThumbnails(optionType, optionValue) {
            const container = this.$refs.thumbnailsContainer;
            const thumbnails = container.querySelectorAll('div');

            // Find the first thumbnail of the selected option
            let targetThumbnail = null;
            for (let i = 0; i < thumbnails.length; i++) {
                const thumbnail = thumbnails[i];
                const indicator = thumbnail.querySelector('.option-indicator');
                if (indicator && indicator.textContent === optionValue) {
                    targetThumbnail = thumbnail;
                    break;
                }
            }

            if (targetThumbnail) {
                const containerWidth = container.clientWidth;
                const thumbnailLeft = targetThumbnail.offsetLeft;
                const thumbnailWidth = targetThumbnail.clientWidth;

                // Calculate the scroll position to center the thumbnail
                const scrollLeft = thumbnailLeft - (containerWidth / 2) + (thumbnailWidth / 2);
                container.scrollTo({left: scrollLeft, behavior: 'smooth'});
            }
        },

        checkScrollPosition() {
            const container = this.$refs.thumbnailsContainer;
            this.isScrollLeftEnd = container.scrollLeft <= 0;
            this.isScrollRightEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 5;
        }
    }
}