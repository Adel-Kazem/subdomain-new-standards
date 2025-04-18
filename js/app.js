'use strict';

// --- Ensure Data Availability (Optional Check) ---
// These should be loaded by preceding <script> tags
window.PRODUCTS = window.PRODUCTS || [];
window.CATEGORIES = window.CATEGORIES || [];

// --- Global Utility Functions ---

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// --- Global Product Functions ---

function getProductById(id) {
    if (!id) return null;
    return (window.PRODUCTS || []).find(product => product.id === parseInt(id)) || null;
}

function getProductsByCategoryId(categoryId) {
    if (!categoryId) return [];
    return (window.PRODUCTS || []).filter(product => {
        // Check direct categoryId or if it's in a categories array
        if (product.categoryId) {
            return product.categoryId === parseInt(categoryId);
        } else if (Array.isArray(product.categories)) {
            return product.categories.includes(parseInt(categoryId));
        }
        return false;
    });
}

function getFeaturedProducts() {
    // Adapt logic based on product data structure (featured or isFeatured)
    return (window.PRODUCTS || []).filter(product => product.featured || product.isFeatured);
}

function getNewProducts() {
    // Adapt logic based on product data structure (new or createdAt)
    return (window.PRODUCTS || []).filter(product => product.new || isNewProduct(product.createdAt));
}

function getSaleProducts() {
    // Adapt logic based on product data structure (sale or isOnSale)
    return (window.PRODUCTS || []).filter(product => product.sale || product.isOnSale);
}

/**
 * Filters products based on criteria.
 * Example: filterProducts({ categoryId: 5, query: 'whey', sortBy: 'price-asc' })
 */
function filterProducts(criteria = {}) {
    let filtered = window.PRODUCTS || [];

    if (criteria.categoryId) {
        const catId = parseInt(criteria.categoryId);
        filtered = filtered.filter(product => {
            if (product.categoryId) {
                return product.categoryId === catId;
            } else if (Array.isArray(product.categories)) {
                return product.categories.includes(catId);
            }
            return false;
        });
    }

    if (criteria.query) {
        const query = criteria.query.toLowerCase();
        filtered = filtered.filter(product =>
            (product.name && product.name.toLowerCase().includes(query)) ||
            (product.description && product.description.toLowerCase().includes(query))
        );
    }

    // Add filters for featured, new, sale if needed, adapting to data structure
    if (criteria.featured) {
        filtered = filtered.filter(product => product.featured || product.isFeatured);
    }
    if (criteria.new) {
        filtered = filtered.filter(product => product.new || isNewProduct(product.createdAt));
    }
    if (criteria.sale) {
        filtered = filtered.filter(product => product.sale || product.isOnSale);
    }

    // Sorting
    if (criteria.sortBy) {
        filtered.sort((a, b) => {
            const priceA = a.salePrice ?? a.price ?? a.base_price ?? 0;
            const priceB = b.salePrice ?? b.price ?? b.base_price ?? 0;
            const ratingA = a.rating ?? 0;
            const ratingB = b.rating ?? 0;
            const nameA = a.name || '';
            const nameB = b.name || '';

            switch(criteria.sortBy) {
                case 'price-asc': return priceA - priceB;
                case 'price-desc': return priceB - priceA;
                case 'name-asc': return nameA.localeCompare(nameB);
                case 'name-desc': return nameB.localeCompare(nameA);
                case 'rating': return ratingB - ratingA; // Higher rating first
                case 'featured': // Example: Featured first, then New, then others
                    const featuredA = a.featured || a.isFeatured;
                    const featuredB = b.featured || b.isFeatured;
                    const newA = a.new || isNewProduct(a.createdAt);
                    const newB = b.new || isNewProduct(b.createdAt);
                    if (featuredA && !featuredB) return -1;
                    if (!featuredA && featuredB) return 1;
                    if (newA && !newB) return -1;
                    if (!newA && newB) return 1;
                    return 0; // Default fallback sort (e.g., by name or ID)
                default: return 0;
            }
        });
    }

    return filtered;
}


/**
 * Calculates the final price of a product, considering options.
 * Adapts based on different product data structures.
 */
function calculateProductPrice(product, selectedOptions = {}) {
    if (!product) return 0;

    let finalPrice = product.salePrice ?? product.price ?? product.base_price ?? 0;

    // Handle option_price_adjustments (new structure)
    if (product.option_price_adjustments && typeof selectedOptions === 'object' && selectedOptions !== null) {
        Object.entries(selectedOptions).forEach(([optionKey, optionValue]) => {
            // Handle adjustments like "size:xl": 2.00
            const adjustmentKeyDirect = `${optionKey}:${optionValue}`;
            if (product.option_price_adjustments[adjustmentKeyDirect] !== undefined) {
                finalPrice += product.option_price_adjustments[adjustmentKeyDirect];
            }
            // Handle adjustments like "size": { "xl": 2.00 } (older structure?)
            else if (product.option_price_adjustments[optionKey] && typeof product.option_price_adjustments[optionKey] === 'object') {
                if (product.option_price_adjustments[optionKey][optionValue] !== undefined) {
                    finalPrice += product.option_price_adjustments[optionKey][optionValue];
                }
            }
        });
    }
    // Handle older price calculation if needed based on 'options' array? (Less likely needed now)

    return finalPrice;
}

/**
 * Checks if a specific product variant (based on selected options) is in stock.
 * Adapts based on different product data structures.
 */
function isProductVariantInStock(product, selectedOptions = {}) {
    if (!product) return false;

    // New structure with hasVariants and option_variants_stock
    if (product.hasVariants && product.option_variants_stock) {
        // Assumes selectedOptions is an object like { size: 'm', color: 'black' }
        // We need to construct the key based on the order defined in product.options
        // This part is complex without knowing the exact intended key format for option_variants_stock
        // Let's assume a simple '|' join based on product.options keys order if possible
        let variantKey = '';
        if (product.options && typeof product.options === 'object') {
            variantKey = Object.keys(product.options)
                .map(key => selectedOptions[key])
                .filter(val => val !== undefined) // Handle missing options
                .join('|');
        } else {
            // Fallback if product.options isn't defined - might be inaccurate
            variantKey = Object.values(selectedOptions).join('|');
        }

        if (variantKey && product.option_variants_stock[variantKey] !== undefined) {
            return product.option_variants_stock[variantKey] > 0;
        } else {
            // If specific variant key not found, maybe check total stock? Or assume unavailable.
            console.warn(`Variant key "${variantKey}" not found in option_variants_stock for product ${product.id}`);
            // Fallback: Check general stock if totalVariantStock exists, otherwise product.stock
            return (product.totalVariantStock ?? product.stock ?? 0) > 0;
        }
    }

    // Older structure or simple products: check product.stock
    return (product.stock ?? 0) > 0;
}


/**
 * Gets the appropriate image(s) for a product, considering selected options.
 * Returns an array of image URLs or a single URL string.
 * Adapts based on different product data structures.
 */
function getProductImage(product, selectedOptions = {}) {
    if (!product) return product?.images?.[0] || '/api/placeholder/300/300'; // Default placeholder

    selectedOptions = selectedOptions || {};

    // 1. Check variant_images (new structure: e.g., "white|mountain")
    if (product.variant_images && typeof product.variant_images === 'object') {
        // Try to construct the key based on relevant options (e.g., color|design)
        // This needs knowledge of which options variant_images uses (often color/design)
        const color = selectedOptions.color;
        const design = selectedOptions.design; // Assuming 'design' is the other key
        if (color && design) {
            const variantKey = `${color}|${design}`;
            if (product.variant_images[variantKey]) {
                return product.variant_images[variantKey]; // Can be string or array
            }
        }
    }

    // 2. Check option_images (new structure: e.g., "color": { "white": [...] })
    if (product.option_images && typeof product.option_images === 'object') {
        // Prioritize options like color or design if they exist in selectedOptions
        const priorityOptions = ['color', 'design']; // Add others if needed
        for (const optionName of priorityOptions) {
            const optionValue = selectedOptions[optionName];
            if (optionValue && product.option_images[optionName] && product.option_images[optionName][optionValue]) {
                return product.option_images[optionName][optionValue]; // Can be string or array
            }
        }
    }

    // 3. Fallback to product.images (can be string or array in new structure)
    if (product.images && product.images.length > 0) {
        return product.images; // Return the array (or first image if needed: product.images[0])
    }

    // 4. Final fallback placeholder
    return '/api/placeholder/300/300';
}


// --- Global Category Functions ---

function getCategoryById(id) {
    if (!id) return null;
    return (window.CATEGORIES || []).find(category => category.id === parseInt(id)) || null;
}

function getCategoryBySlug(slug) {
    if (!slug) return null;
    return (window.CATEGORIES || []).find(category => category.slug === slug) || null;
}

function getFeaturedCategories() {
    return (window.CATEGORIES || []).filter(category => category.featured);
}


// --- Helper for Product Functions ---
function isNewProduct(createdAt) {
    if (!createdAt) return false;
    try {
        const created = new Date(createdAt);
        const now = new Date();
        const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
        return (now - created) < thirtyDaysInMs;
    } catch (e) {
        return false; // Invalid date format
    }
}


// --- Alpine.js Initialization ---
document.addEventListener('alpine:init', () => {
    console.log("Initializing Alpine stores...");

    // --- Cart Store ---
    const STORAGE_KEY = 'ecommerce_cart_v2'; // Use a distinct key if format changes
    let initialCartItems = [];
    const savedCart = localStorage.getItem(STORAGE_KEY);
    if (savedCart) {
        try {
            initialCartItems = JSON.parse(savedCart);
            // Optional: Validate saved items structure here
        } catch (e) {
            console.error("Error parsing saved cart:", e);
            localStorage.removeItem(STORAGE_KEY); // Clear invalid data
        }
    }

    Alpine.store('cart', {
        items: initialCartItems,

        saveCart() {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
            } catch (e) {
                console.error("Error saving cart to localStorage:", e);
            }
        },

        /**
         * Adds a product to the cart.
         * @param {object} product The full product object or product data.
         * @param {number} quantity Quantity to add.
         * @param {object|null} selectedOptions Object representing chosen variants (e.g., { size: 'M', color: 'Red' }).
         */
        addItem(product, quantity = 1, selectedOptions = null) {
            if (!product || typeof product !== 'object') {
                console.error("addItem: Invalid product data provided.", product);
                return;
            }
            quantity = Math.max(1, parseInt(quantity) || 1); // Ensure positive integer quantity

            // Generate a unique key for the variant based on ID and options
            // Sort option keys for consistency: {color:'red', size:'M'} -> "color:red|size:M"
            const variantKey = selectedOptions
                ? Object.keys(selectedOptions).sort().map(key => `${key}:${selectedOptions[key]}`).join('|')
                : 'default';
            const itemIdentifier = `${product.id}-${variantKey}`;

            const existingItemIndex = this.items.findIndex(item => item.identifier === itemIdentifier);

            if (existingItemIndex > -1) {
                // Update quantity of existing item
                this.items[existingItemIndex].quantity += quantity;
            } else {
                // Add new item - store only necessary info to keep localStorage small
                const priceInfo = {
                    price: product.price ?? product.base_price ?? 0,
                    salePrice: product.salePrice // null if not on sale
                };
                // Calculate price considering options (use global function)
                const finalPrice = calculateProductPrice(product, selectedOptions);
                // Determine if the final price is a sale price
                const effectivePrice = finalPrice; // Store the calculated price
                const basePrice = product.price ?? product.base_price ?? 0; // Base price for comparison/display


                const newItem = {
                    identifier: itemIdentifier, // Unique ID for this specific variant
                    id: product.id,
                    name: product.name || 'Unknown Product',
                    quantity: quantity,
                    options: selectedOptions, // Store selected options
                    // Store calculated price for this variant
                    price: effectivePrice, // The price this item adds to the cart total
                    baseDisplayPrice: basePrice, // Original price for potential strikethrough
                    image: (getProductImage(product, selectedOptions) || [''])[0] || '/api/placeholder/100/100' // Get first image URL
                };
                this.items.push(newItem);
            }

            this.saveCart();
            // Dispatch event for UI updates (like notification)
            document.dispatchEvent(new CustomEvent('product:added-to-cart', { detail: { itemIdentifier: itemIdentifier } }));
        },

        /**
         * Removes an item/variant from the cart using its unique identifier.
         * @param {string} itemIdentifier The unique identifier (e.g., "123-size:M|color:Red")
         */
        removeItem(itemIdentifier) {
            this.items = this.items.filter(item => item.identifier !== itemIdentifier);
            this.saveCart();
        },

        /**
         * Updates the quantity of a specific item/variant in the cart.
         * @param {string} itemIdentifier Unique identifier.
         * @param {number} quantity New quantity. If <= 0, removes the item.
         */
        updateQuantity(itemIdentifier, quantity) {
            const itemIndex = this.items.findIndex(item => item.identifier === itemIdentifier);
            if (itemIndex > -1) {
                const newQuantity = parseInt(quantity);
                if (newQuantity > 0) {
                    this.items[itemIndex].quantity = newQuantity;
                } else {
                    // Remove item if quantity is zero or less
                    this.items.splice(itemIndex, 1);
                }
                this.saveCart();
            }
        },

        // Helper methods using updateQuantity
        increaseQuantity(itemIdentifier) {
            const item = this.items.find(item => item.identifier === itemIdentifier);
            if (item) {
                this.updateQuantity(itemIdentifier, item.quantity + 1);
            }
        },
        decreaseQuantity(itemIdentifier) {
            const item = this.items.find(item => item.identifier === itemIdentifier);
            if (item) {
                this.updateQuantity(itemIdentifier, item.quantity - 1);
            }
        },

        // Calculation methods based on stored item price
        getTotalPrice() {
            return this.items.reduce((total, item) => {
                // Use the pre-calculated price stored with the item
                return total + (item.price * item.quantity);
            }, 0).toFixed(2);
        },
        getTotalItems() {
            return this.items.reduce((total, item) => total + item.quantity, 0);
        },

        clearCart() {
            this.items = [];
            this.saveCart();
        },

        // Generates WhatsApp message from cart contents
        openWhatsApp(purchaseDetails = true) {
            const whatsAppNumber = "96112345678"; // Use correct number found in original HTML
            let message = 'Hello Optimen, I would like to make an inquiry.';

            if (purchaseDetails && this.items.length > 0) {
                message = 'Hello Optimen, I would like to place the following order:\n\n';
                this.items.forEach(item => {
                    let optionString = '';
                    if (item.options && Object.keys(item.options).length > 0) {
                        optionString = ` (${Object.entries(item.options).map(([k, v]) => `${k}: ${v}`).join(', ')})`;
                    }
                    // Use the stored price for the message
                    message += `• ${item.name}${optionString} (${item.quantity} × $${item.price.toFixed(2)})\n`;
                });
                message += `\nTotal: $${this.getTotalPrice()}\n`;
                message += `\nPlease contact me to confirm my order.`;
            }
            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/${whatsAppNumber}?text=${encodedMessage}`, '_blank');
        }
    }); // End Alpine.store('cart')


    // --- UI Store ---
    Alpine.store('ui', {
        mobileMenuOpen: false,
        cartNotificationVisible: false,

        toggleMobileMenu() {
            this.mobileMenuOpen = !this.mobileMenuOpen;
        },

        scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },

        showCartNotification() {
            this.cartNotificationVisible = true;
            // Automatically hide after 3 seconds
            setTimeout(() => {
                this.cartNotificationVisible = false;
            }, 3000);
        },

        // General WhatsApp opener (no cart details)
        openWhatsApp() {
            const whatsAppNumber = "96112345678"; // Use correct number
            const message = "Hello Optimen, I'm interested in your products.";
            window.open(`https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(message)}`, '_blank');
        }
    }); // End Alpine.store('ui')


    // --- Event Listener for Cart Notification ---
    // Listens for the custom event dispatched by cart.addItem
    document.addEventListener('product:added-to-cart', () => {
        Alpine.store('ui').showCartNotification();
    });


    console.log("Alpine stores initialized successfully.");

}); // End alpine:init listener
