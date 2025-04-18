// product-logic.js

// Define the function that Alpine will call for x-data
function clothingProduct() {
    // --- Product Data ---
    // (This object is now inside the function, but that's fine for this setup)
    const productData = {
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
        isOnSale: false, // Can be overridden by logic later if needed
        requiresShipping: true,
        // Stock Management
        requiresInventoryTracking: true,
        stock: 25, // Default stock - often overridden by variants
        hasVariants: true,
        totalVariantStock: 485,
        lowStockThreshold: 10,
        // Product Details
        features: { material: "100% Ringspun Cotton, 180gsm", fit: "Modern fit, slightly tapered", neckline: "Reinforced crew neck", care: "Machine wash cold, tumble dry low", printing: "Water-based eco-friendly inks", origin: "Ethically manufactured", sustainability: "GOTS certified organic cotton" },
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
            "xs|white|mountain": 20, "s|white|mountain": 30, "m|white|mountain": 25, "l|white|mountain": 20, "xl|white|mountain": 15, "2xl|white|mountain": 10,
            "xs|black|mountain": 15, "s|black|mountain": 25, "m|black|mountain": 30, "l|black|mountain": 25, "xl|black|mountain": 15, "2xl|black|mountain": 10,
            "xs|navy|mountain": 10, "s|navy|mountain": 15, "m|navy|mountain": 20, "l|navy|mountain": 15, "xl|navy|mountain": 10, "2xl|navy|mountain": 5,
            "xs|white|wave": 10, "s|white|wave": 15, "m|white|wave": 20, "l|white|wave": 15, "xl|white|wave": 10, "2xl|white|wave": 5,
            "s|black|wave": 10, "m|black|wave": 15, "l|black|wave": 15, "xl|black|wave": 10,
            "s|navy|sunset": 10, "m|navy|sunset": 15, "l|navy|sunset": 15, "xl|navy|sunset": 10,
            "s|heather gray|minimal": 15, "m|heather gray|minimal": 20, "l|heather gray|minimal": 15, "xl|heather gray|minimal": 10
        },
        // Option Price Adjustments
        option_price_adjustments: { "size:xl": 2.00, "size:2xl": 4.00, "color:heather gray": 1.50, "design:sunset": 2.00 },
        // Option Shipping Adjustments
        option_shipping_adjustments: { "size:xl": 2.00, "size:2xl": 3.50 },
        // Physical Attributes
        weight: { value: 0.22, unit: 'kg' },
        dimensions: { length: 30, width: 25, height: 2, unit: 'cm' },
        // Option Dimension Overrides
        option_dimension_overrides: { "size:2xl": { weight: { value: 0.28, unit: 'kg' }, dimensions: { length: 35, width: 30, height: 2, unit: 'cm' } } },
        // Categories
        categories: [101, 105, 110], // Apparel, T-Shirts, Graphic Tees
        // Related Products
        upselling: [2510, 2515], // Premium hoodie, long sleeve version
        crossSelling: [2601, 2701], // Joggers, hat with matching designs
        relatedProducts: [2502, 2503], // Other t-shirt designs
        // Timestamps
        createdAt: "2025-02-15T10:20:00Z",
        updatedAt: "2025-04-01T16:45:00Z"
    };

    // --- Alpine Component Return Object ---
    // This is the object Alpine will use for its data scope
    return {
        // -- State --
        product: productData, // Reference the data object defined above
        selectedSize: "m",    // Initial default state
        selectedColor: "white", // Initial default state
        selectedDesign: "mountain", // Initial default state
        selectedImage: '',    // Will be set in init
        isScrollLeftEnd: true,
        isScrollRightEnd: false,
        isOnSale: productData.isOnSale, // Use initial value from data

        // -- Image zoom properties --
        zoomed: false,
        isTouchDevice: false,
        scale: 2,
        origin: '50% 50%',
        panX: 0, panY: 0,
        minPanX: 0, maxPanX: 0, minPanY: 0, maxPanY: 0,
        dragStartX: 0, dragStartY: 0, dragging: false,
        lastTap: 0,
        imgStyle: '',

        // -- Methods --

        init() {
            // Set initial selected image
            this.selectedImage = this.product.images[0];
            // Initialize zoom features
            this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            this.imgStyle = 'transform: scale(1); transform-origin: 50% 50%;';
            // Use $nextTick provided by Alpine
            this.$nextTick(() => {
                this.checkScrollPosition();
            });
        },

        // Image zoom functions for desktop
        mouseMove(e) {
            if (!this.zoomed && !this.isTouchDevice) return;
            // Use $refs provided by Alpine
            const img = this.$refs.mainImage;
            if (!img) return; // Guard clause
            const rect = img.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            this.origin = `${x}% ${y}%`;
            this.updateZoomStyle();
        },
        mouseEnter(e) {
            if (this.isTouchDevice) return;
            this.zoomed = true;
            this.mouseMove(e); // Pass event to set initial origin
        },
        mouseLeave() {
            if (this.isTouchDevice) return;
            this.zoomed = false;
            this.resetZoom();
        },

        // Image zoom functions for mobile
        touchStart(e) {
            const now = Date.now();
            if (e.touches.length > 1) return; // Ignore multi-touch gestures for now

            // Use $refs provided by Alpine
            const img = this.$refs.mainImage;
            if (!img) return; // Guard clause

            if (now - this.lastTap < 350) { // Double tap
                e.preventDefault(); // Prevent default zoom/scroll
                if (!this.zoomed) { // Zoom in
                    const rect = img.getBoundingClientRect();
                    const touch = e.touches[0];
                    const percentX = (touch.clientX - rect.left) / rect.width;
                    const percentY = (touch.clientY - rect.top) / rect.height;
                    this.origin = `${percentX * 100}% ${percentY * 100}%`;
                    this.zoomed = true;
                    this.updateZoomStyle();
                    this.calcPanBounds();
                } else { // Zoom out
                    this.zoomed = false;
                    this.panX = 0;
                    this.panY = 0;
                    this.resetZoom();
                }
                this.lastTap = 0; // Reset tap timer
            } else { // First tap or potential drag start
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
            e.preventDefault(); // Prevent page scrolling while panning
            this.calcPanBounds(); // Recalculate bounds (might change if layout shifts)
            const x = e.touches[0].clientX - this.dragStartX;
            const y = e.touches[0].clientY - this.dragStartY;
            this.panX = Math.max(this.minPanX, Math.min(this.maxPanX, x));
            this.panY = Math.max(this.minPanY, Math.min(this.maxPanY, y));
            this.updateZoomStyle();
        },
        touchEnd() {
            this.dragging = false;
        },

        // Helper functions for image zoom
        updateZoomStyle() {
            if (this.zoomed) {
                if (this.isTouchDevice) {
                    // Panning logic for touch
                    this.imgStyle = `transform: scale(${this.scale}) translate(${this.panX / this.scale}px, ${this.panY / this.scale}px); transform-origin: ${this.origin}; touch-action: none;`;
                } else {
                    // Origin logic for mouse hover
                    this.imgStyle = `transform: scale(${this.scale}); transform-origin: ${this.origin};`;
                }
            } else {
                this.resetZoom();
            }
        },
        resetZoom() {
            this.imgStyle = 'transform: scale(1); transform-origin: 50% 50%; touch-action: manipulation;'; // Reset touch-action too
            this.panX = 0;
            this.panY = 0;
            this.zoomed = false; // Ensure zoom state is reset
        },
        calcPanBounds() {
            // Use $refs provided by Alpine
            const img = this.$refs.mainImage;
            if (!img) return; // Guard clause
            const rect = img.getBoundingClientRect();
            // Calculate how much the scaled image exceeds the container bounds
            const extraWidth = Math.max(0, (rect.width * this.scale) - rect.width);
            const extraHeight = Math.max(0, (rect.height * this.scale) - rect.height);
            // Pan limits are half the extra dimension (allows moving edge to edge)
            // Corrected calculation: use the scaled dimensions for panning range
            this.minPanX = -extraWidth / 2; // How far left can the center move (image moves right)
            this.maxPanX = extraWidth / 2;  // How far right can the center move (image moves left)
            this.minPanY = -extraHeight / 2; // How far up can the center move (image moves down)
            this.maxPanY = extraHeight / 2;  // How far down can the center move (image moves up)
        },

        // Product logic functions
        getShippingInfo() {
            if (this.product.free_shipping) {
                return "Free Shipping";
            }
            let shippingCost = this.product.base_shipping_cost;
            const sizeKey = `size:${this.selectedSize}`;
            if (this.product.option_shipping_adjustments[sizeKey]) {
                shippingCost += this.product.option_shipping_adjustments[sizeKey];
            }
            if (shippingCost <= 0) {
                return "Free Shipping"; // Handle cases where adjustments make it free
            }
            return `$${shippingCost.toFixed(2)}`;
        },
        selectSize(size) {
            this.selectedSize = size;
            this.updateVariantImage(); // Update image if a specific variant image exists
            this.resetZoom(); // Reset zoom when options change
        },
        selectColor(color) {
            this.selectedColor = color;
            // Attempt to select the first option image for this color
            if (this.product.option_images.color[color]?.[0]) {
                this.selectedImage = this.product.option_images.color[color][0];
                // Use $nextTick provided by Alpine
                this.$nextTick(() => { this.scrollToOptionThumbnails('color', color); });
            }
            this.updateVariantImage(); // Check if a more specific variant image exists
            this.resetZoom(); // Reset zoom when options change
        },
        selectDesign(design) {
            this.selectedDesign = design;
            // Attempt to select the first option image for this design
            if (this.product.option_images.design[design]?.[0]) {
                this.selectedImage = this.product.option_images.design[design][0];
                // Use $nextTick provided by Alpine
                this.$nextTick(() => { this.scrollToOptionThumbnails('design', design); });
            }
            this.updateVariantImage(); // Check if a more specific variant image exists
            this.resetZoom(); // Reset zoom when options change
        },
        selectImage(image) {
            this.selectedImage = image;
            this.resetZoom(); // Reset zoom when main image changes

            // Attempt to update selected options based on the clicked thumbnail
            // Check option images (color)
            for (const color in this.product.option_images.color) {
                if (this.product.option_images.color[color].includes(image)) {
                    this.selectedColor = color;
                    // Don't return immediately, design or variant might be more specific
                }
            }
            // Check option images (design)
            for (const design in this.product.option_images.design) {
                if (this.product.option_images.design[design].includes(image)) {
                    this.selectedDesign = design;
                    // Don't return immediately
                }
            }
            // Check variant images (most specific)
            for (const key in this.product.variant_images) {
                const variantImageSource = this.product.variant_images[key];
                const isMatch = Array.isArray(variantImageSource) ? variantImageSource.includes(image) : variantImageSource === image;
                if (isMatch) {
                    this.selectVariantFromKey(key); // This updates color/design/size if applicable
                    return; // Found the most specific match
                }
            }
            // If only color/design matched but not a specific variant, call update to ensure consistency
            this.updateVariantImage();
        },
        selectVariantFromKey(key) {
            const parts = key.split('|');
            // Assuming structure like "color|design" or maybe "size|color|design"
            if (parts.length >= 2) {
                // Determine indices based on key structure (simple examples assumed here)
                let size, color, design;
                if (this.product.options.size.includes(parts[0]) && parts.length === 3) {
                    // Assume size|color|design
                    size = parts[0];
                    color = parts[1];
                    design = parts[2];
                } else {
                    // Assume color|design (or handle other potential structures)
                    color = parts[0];
                    design = parts[1];
                }

                if (size && this.product.options.size.includes(size)) this.selectedSize = size;
                if (color && this.product.options.color.includes(color)) this.selectedColor = color;
                if (design && this.product.options.design.includes(design)) this.selectedDesign = design;
            }
            // No need to call updateVariantImage here typically, as selectImage triggers this
        },
        updateVariantImage() {
            // Check if a specific image exists for the Size|Color|Design combo first
            const specificVariantKey = `${this.selectedSize}|${this.selectedColor}|${this.selectedDesign}`;
            if (this.product.variant_images[specificVariantKey]) {
                const img = this.product.variant_images[specificVariantKey];
                this.selectedImage = Array.isArray(img) ? img[0] : img;
                return; // Found most specific
            }
            // Check for Color|Design combo (if Size wasn't specific)
            const colorDesignKey = `${this.selectedColor}|${this.selectedDesign}`;
            if (this.product.variant_images[colorDesignKey]) {
                const img = this.product.variant_images[colorDesignKey];
                this.selectedImage = Array.isArray(img) ? img[0] : img;
                return; // Found color/design specific
            }
            // Fallback: Use the first image associated with the selected color, if any
            if(this.product.option_images.color[this.selectedColor]?.[0]) {
                this.selectedImage = this.product.option_images.color[this.selectedColor][0];
                return; // Found color specific
            }
            // Fallback: Use the first image associated with the selected design, if any
            if(this.product.option_images.design[this.selectedDesign]?.[0]) {
                this.selectedImage = this.product.option_images.design[this.selectedDesign][0];
                return; // Found design specific
            }
            // Ultimate fallback: Revert to the very first product image if no relevant variant/option image found
            this.selectedImage = this.product.images[0];
        },
        currentStock() {
            const variantKey = `${this.selectedSize}|${this.selectedColor}|${this.selectedDesign}`;
            return this.product.option_variants_stock[variantKey] ?? 0; // Use ?? for cleaner fallback
        },
        isVariantAvailable() {
            return this.currentStock() > 0;
        },
        isSizeAvailable(size) {
            return Object.keys(this.product.option_variants_stock).some(key => {
                const parts = key.split('|');
                return parts[0] === size && this.product.option_variants_stock[key] > 0;
            });
        },
        isColorAvailable(color) {
            return Object.keys(this.product.option_variants_stock).some(key => {
                const parts = key.split('|');
                return parts.length > 1 && parts[1] === color && this.product.option_variants_stock[key] > 0;
            });
        },
        isDesignAvailable(design) {
            return Object.keys(this.product.option_variants_stock).some(key => {
                const parts = key.split('|');
                return parts.length > 2 && parts[2] === design && this.product.option_variants_stock[key] > 0;
            });
        },
        calculatePrice() {
            let price = this.product.base_price;
            const sizeKey = `size:${this.selectedSize}`;
            price += this.product.option_price_adjustments[sizeKey] ?? 0;
            const colorKey = `color:${this.selectedColor}`;
            price += this.product.option_price_adjustments[colorKey] ?? 0;
            const designKey = `design:${this.selectedDesign}`;
            price += this.product.option_price_adjustments[designKey] ?? 0;
            return price;
        },
        formatPrice(price) {
            const numPrice = Number(price);
            if (isNaN(numPrice)) {
                return 'N/A';
            }
            return numPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        getColorHex(color) {
            const colorMap = { 'white': '#ffffff', 'black': '#000000', 'navy': '#000080', 'heather gray': '#D3D3D3' };
            return colorMap[color.toLowerCase()] || '#cccccc'; // Handle potential casing issues
        },

        // Thumbnail scrolling functions
        scrollThumbnails(direction) {
            const container = this.$refs.thumbnailsContainer;
            if (!container) return;
            const scrollAmount = container.clientWidth * 0.75; // Scroll 75% of visible width
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        },
        scrollToOptionThumbnails(optionType, optionValue) {
            const container = this.$refs.thumbnailsContainer;
            if (!container) return;
            // Use data attributes for reliable selection
            const thumbnails = container.querySelectorAll(`div[data-option-type="${optionType}"][data-option-value="${optionValue}"]`);
            const targetThumbnail = thumbnails[0]; // Get the first match

            if (targetThumbnail) {
                const containerRect = container.getBoundingClientRect();
                const targetRect = targetThumbnail.getBoundingClientRect();
                const scrollLeftTarget = container.scrollLeft + targetRect.left - containerRect.left - (containerRect.width / 2) + (targetRect.width / 2);

                container.scrollTo({
                    left: scrollLeftTarget,
                    behavior: 'smooth'
                });
            }
        },
        checkScrollPosition() {
            const container = this.$refs.thumbnailsContainer;
            if (!container) return;
            // Add tolerance for floating point inaccuracies
            this.isScrollLeftEnd = container.scrollLeft <= 1;
            this.isScrollRightEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 1;
        }
    }; // End of return object
} // End of clothingProduct function
