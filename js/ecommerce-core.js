// ecommerce-core.js - Alpine.js Components for E-commerce

document.addEventListener('alpine:init', () => {
    /**
     * Product Catalog Component
     * Handles product filtering, sorting, and view options
     */
    Alpine.data('productCatalog', (config = {}) => {
        return {
            // State
            searchQuery: '',
            selectedCategory: null,
            view: config.defaultView || 'grid', // grid or list
            sortBy: config.defaultSort || 'featured', // featured, price-asc, price-desc, name, rating

            // Config
            productData: config.products || [],
            categoryData: config.categories || [],

            // Initialize from URL parameters
            init() {
                const categoryParam = this.getUrlParameter('category');
                if (categoryParam) {
                    this.selectedCategory = parseInt(categoryParam);
                }

                // Set view from localStorage if available
                const savedView = localStorage.getItem('preferredView');
                if (savedView) {
                    this.view = savedView;
                }
            },

            // Helper to get URL parameters
            getUrlParameter(name) {
                const urlParams = new URLSearchParams(window.location.search);
                return urlParams.get(name);
            },

            // Get category name by ID
            getCategoryName(categoryId) {
                const category = this.categoryData.find(cat => cat.id === categoryId);
                return category ? category.name : 'All Products';
            },

            // Save view preference
            saveViewPreference() {
                localStorage.setItem('preferredView', this.view);
            },

            // Set view with save
            setView(viewType) {
                this.view = viewType;
                this.saveViewPreference();
            },

            // Filter and sort products
            getFilteredProducts() {
                // First filter by category and search query
                let filtered = this.productData.filter(product =>
                    (this.selectedCategory === null || product.categoryId === this.selectedCategory) &&
                    (this.searchQuery === '' ||
                        product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                        product.description.toLowerCase().includes(this.searchQuery.toLowerCase()))
                );

                // Then sort
                switch(this.sortBy) {
                    case 'price-asc':
                        filtered.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
                        break;
                    case 'price-desc':
                        filtered.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
                        break;
                    case 'name':
                        filtered.sort((a, b) => a.name.localeCompare(b.name));
                        break;
                    case 'rating':
                        filtered.sort((a, b) => b.rating - a.rating);
                        break;
                    case 'featured':
                    default:
                        // Featured first, then new arrivals, then the rest
                        filtered.sort((a, b) => {
                            if (a.featured && !b.featured) return -1;
                            if (!a.featured && b.featured) return 1;
                            if (a.new && !b.new) return -1;
                            if (!a.new && b.new) return 1;
                            return 0;
                        });
                }

                return filtered;
            },

            // Clear all filters
            clearFilters() {
                this.searchQuery = '';
                this.selectedCategory = null;
            }
        };
    });

    /**
     * Shopping Cart Store
     * Handles cart functionality
     */
    Alpine.store('cart', {
        items: [],

        init() {
            // Load cart from localStorage if available
            const savedCart = localStorage.getItem('cartItems');
            if (savedCart) {
                try {
                    this.items = JSON.parse(savedCart);
                } catch (e) {
                    console.error('Failed to parse saved cart:', e);
                    this.items = [];
                }
            }
        },

        saveCart() {
            localStorage.setItem('cartItems', JSON.stringify(this.items));
        },

        addItem(product, quantity = 1, options = {}) {
            // Check if product with the same options already exists
            const existingItemIndex = this.items.findIndex(item =>
                item.id === product.id &&
                JSON.stringify(item.options) === JSON.stringify(options)
            );

            if (existingItemIndex >= 0) {
                // Update quantity of existing item
                this.items[existingItemIndex].quantity += quantity;
            } else {
                // Add new item
                this.items.push({
                    id: product.id,
                    name: product.name,
                    price: product.salePrice || product.price,
                    image: Array.isArray(product.images) ? product.images[0] : product.images,
                    quantity: quantity,
                    options: options
                });
            }

            this.saveCart();
            Alpine.store('ui').showCartNotification();
        },

        updateItemQuantity(index, quantity) {
            if (index >= 0 && index < this.items.length) {
                if (quantity <= 0) {
                    this.removeItem(index);
                } else {
                    this.items[index].quantity = quantity;
                    this.saveCart();
                }
            }
        },

        removeItem(index) {
            if (index >= 0 && index < this.items.length) {
                this.items.splice(index, 1);
                this.saveCart();
            }
        },

        clearCart() {
            this.items = [];
            this.saveCart();
        },

        getTotalItems() {
            return this.items.reduce((total, item) => total + item.quantity, 0);
        },

        getTotalPrice() {
            return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        },

        getFormattedTotal() {
            return '$' + this.getTotalPrice().toFixed(2);
        }
    });

    /**
     * UI Utilities Store
     * Handles common UI interactions
     */
    Alpine.store('ui', {
        isMenuOpen: false,
        showCartNotification: false,
        notificationTimeout: null,

        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        },

        closeMenu() {
            this.isMenuOpen = false;
        },

        showCartNotification() {
            // Clear any existing timeout
            if (this.notificationTimeout) {
                clearTimeout(this.notificationTimeout);
            }

            // Show notification
            this.showCartNotification = true;

            // Auto-hide after 3 seconds
            this.notificationTimeout = setTimeout(() => {
                this.showCartNotification = false;
            }, 3000);
        },

        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        },

        openWhatsApp(message = 'Hello, I have a question about your products.') {
            // This can be configured with the business phone number
            const phoneNumber = '9701234567'; // Replace with actual business number
            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
        }
    });

    /**
     * Product Detail Component
     * Handles product variants, options selection
     */
    Alpine.data('productDetail', (config = {}) => {
        return {
            product: config.product || {},
            selectedOptions: {},
            quantity: 1,

            init() {
                // Initialize default option selections
                if (this.product.options) {
                    Object.keys(this.product.options).forEach(optionName => {
                        if (this.product.options[optionName].length > 0) {
                            this.selectedOptions[optionName] = this.product.options[optionName][0];
                        }
                    });
                }
            },

            // Get current variant key based on selected options
            getVariantKey() {
                const optionValues = Object.values(this.selectedOptions);
                return optionValues.join('|');
            },

            // Check if current variant is in stock
            isVariantInStock() {
                const variantKey = this.getVariantKey();
                if (this.product.option_variants_stock && this.product.option_variants_stock[variantKey]) {
                    return this.product.option_variants_stock[variantKey] > 0;
                }
                return this.product.stock > 0;
            },

            // Get stock level for current variant
            getVariantStock() {
                const variantKey = this.getVariantKey();
                if (this.product.option_variants_stock && this.product.option_variants_stock[variantKey]) {
                    return this.product.option_variants_stock[variantKey];
                }
                return this.product.stock;
            },

            // Get price for current variant
            getVariantPrice() {
                let price = this.product.base_price || this.product.price || 0;

                // Apply price adjustments based on selected options
                if (this.product.option_price_adjustments) {
                    Object.entries(this.selectedOptions).forEach(([optionName, optionValue]) => {
                        if (
                            this.product.option_price_adjustments[optionName] &&
                            this.product.option_price_adjustments[optionName][optionValue]
                        ) {
                            price += this.product.option_price_adjustments[optionName][optionValue];
                        }
                    });
                }

                return price;
            },

            // Get shipping cost for current variant
            getVariantShippingCost() {
                let shippingCost = this.product.base_shipping_cost || 0;

                if (this.product.free_shipping) {
                    return 0;
                }

                // Apply shipping adjustments based on selected options
                if (this.product.option_shipping_adjustments) {
                    Object.entries(this.selectedOptions).forEach(([optionName, optionValue]) => {
                        if (
                            this.product.option_shipping_adjustments[optionName] &&
                            this.product.option_shipping_adjustments[optionName][optionValue] !== undefined
                        ) {
                            shippingCost += this.product.option_shipping_adjustments[optionName][optionValue];
                        }
                    });
                }

                return shippingCost;
            },

            // Get images for current variant
            getVariantImages() {
                const variantKey = this.getVariantKey();

                // Check if there's a specific image for this exact variant combination
                if (this.product.variant_images && this.product.variant_images[variantKey]) {
                    const variantImage = this.product.variant_images[variantKey];
                    return Array.isArray(variantImage) ? variantImage : [variantImage];
                }

                // Check for option-specific images
                let optionImages = [];
                if (this.product.option_images) {
                    Object.entries(this.selectedOptions).forEach(([optionName, optionValue]) => {
                        if (
                            this.product.option_images[optionName] &&
                            this.product.option_images[optionName][optionValue]
                        ) {
                            const images = this.product.option_images[optionName][optionValue];
                            optionImages = optionImages.concat(images);
                        }
                    });
                }

                // If option-specific images found, return those
                if (optionImages.length > 0) {
                    return optionImages;
                }

                // Otherwise return default product images
                return Array.isArray(this.product.images) ? this.product.images : [this.product.images];
            },

            // Add current product configuration to cart
            addToCart() {
                Alpine.store('cart').addItem(
                    this.product,
                    this.quantity,
                    this.selectedOptions
                );
            },

            // Decrease quantity
            decreaseQuantity() {
                if (this.quantity > 1) {
                    this.quantity--;
                }
            },

            // Increase quantity
            increaseQuantity() {
                const maxStock = this.getVariantStock();
                if (this.quantity < maxStock) {
                    this.quantity++;
                }
            }
        };
    });
});