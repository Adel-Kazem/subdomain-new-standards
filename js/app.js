'use strict';

window.PRODUCTS = window.PRODUCTS || [];
window.CATEGORIES = window.CATEGORIES || [];

const Core = (function() {
    'use strict';

    const init = function() {
        if (window.Alpine) {
            _initializeAlpine();
        } else {
            document.addEventListener('alpine:init', _initializeAlpine);
        }
        _setupEventListeners();
    };

    const _initializeAlpine = function() {
        console.log("Initializing Alpine stores");
        if (!window.PRODUCTS) {
            console.error("PRODUCTS data is not available!");
            window.PRODUCTS = window.PRODUCTS || [];
        }
        if (!window.CATEGORIES) {
            console.error("CATEGORIES data is not available!");
            window.CATEGORIES = window.CATEGORIES || [];
        }
        Cart.initializeStore();
        UI.initializeStore();
        Product.init();
        console.log("Alpine stores initialized");
    };

    const _setupEventListeners = function() {
        document.addEventListener('product:added-to-cart', (e) => {
            UI.showCartNotification();
        });
    };

    const getUrlParameter = function(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    return {
        init,
        getUrlParameter
    };
})();


const Product = (function() {
    'use strict';

    const init = function() {

    };

    const getById = function(id) {
        return (window.PRODUCTS || []).find(product => product.id === parseInt(id)) || null;
    };

    const getByCategoryId = function(categoryId) {
        return (window.PRODUCTS || []).filter(product => product.categoryId === parseInt(categoryId));
    };

    const getFeatured = function() {
        return (window.PRODUCTS || []).filter(product => product.featured);
    };

    const getNew = function() {
        return (window.PRODUCTS || []).filter(product => product.new);
    };

    const getSale = function() {
        return (window.PRODUCTS || []).filter(product => product.sale);
    };

    const filter = function(criteria = {}) {
        let filtered = window.PRODUCTS || [];

        if (criteria.categoryId) {
            filtered = filtered.filter(product => product.categoryId === parseInt(criteria.categoryId));
        }

        if (criteria.query) {
            const query = criteria.query.toLowerCase();
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query)
            );
        }

        if (criteria.featured) {
            filtered = filtered.filter(product => product.featured);
        }

        if (criteria.new) {
            filtered = filtered.filter(product => product.new);
        }

        if (criteria.sale) {
            filtered = filtered.filter(product => product.sale);
        }

        if (criteria.sortBy) {
            switch(criteria.sortBy) {
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
                    filtered.sort((a, b) => {
                        if (a.featured && !b.featured) return -1;
                        if (!a.featured && b.featured) return 1;
                        if (a.new && !b.new) return -1;
                        if (!a.new && b.new) return 1;
                        return 0;
                    });
            }
        }
        return filtered;
    };


    const calculatePrice = function(product, selectedOptions = {}) {
        let finalPrice = product.salePrice || product.price;
        if (product.base_price !== undefined) {
            finalPrice = product.base_price;
        }
        if (product.option_price_adjustments && Object.keys(selectedOptions).length > 0) {
            Object.keys(selectedOptions).forEach(optionName => {
                const optionValue = selectedOptions[optionName];
                if (product.option_price_adjustments[optionName] && product.option_price_adjustments[optionName][optionValue]) {
                    finalPrice += product.option_price_adjustments[optionName][optionValue];
                }
            });
        }
        return finalPrice;
    };


    const isVariantInStock = function(product, selectedOptions = {}) {
        if (!product.hasVariants || !product.option_variants_stock) {
            return product.stock > 0;
        }
        const variantKey = Object.values(selectedOptions).join('|');
        return product.option_variants_stock[variantKey] > 0;
    };


    const getProductImage = function(product, selectedOptions = {}) {
        if (!selectedOptions || Object.keys(selectedOptions).length === 0) {
            return product.images;
        }
        if (product.variant_images) {
            const variantKey = Object.values(selectedOptions).join('|');
            if (product.variant_images[variantKey]) {
                return product.variant_images[variantKey];
            }
        }
        if (product.option_images) {
            for (const [optionName, optionValue] of Object.entries(selectedOptions)) {
                if (product.option_images[optionName] && product.option_images[optionName][optionValue]) {
                    return product.option_images[optionName][optionValue];
                }
            }
        }
        return product.images;
    };


    return {
        init,
        getById,
        getByCategoryId,
        getFeatured,
        getNew,
        getSale,
        filter,
        calculatePrice,
        isVariantInStock,
        getProductImage
    };
})();


const Cart = (function() {
    'use strict';

    let _items = [];
    const STORAGE_KEY = 'ecommerce_cart';

    // Immediately initialize if Alpine is available
    if (window.Alpine) {
        setupAlpineStore();
    } else {
        document.addEventListener('alpine:init', setupAlpineStore);
    }


    function setupAlpineStore() {
        Alpine.store('cart', {
            items: [],
            init() {
                const savedCart = localStorage.getItem(STORAGE_KEY);
                if (savedCart) {
                    this.items = JSON.parse(savedCart);
                    _items = this.items;
                }
            },
            saveCart() {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
                _items = this.items;
            },
            addItem(product, quantity = 1, selectedOption = null) {
                const productToAdd = { ...product, quantity, selectedOption };
                const existingIndex = this.items.findIndex(item => {
                    if (item.id !== product.id) return false;
                    if (item.selectedOption !== selectedOption) return false;
                    return true;
                });
                if (existingIndex >= 0) {
                    this.items[existingIndex].quantity += quantity;
                } else {
                    this.items.push(productToAdd);
                }
                this.saveCart();
                document.dispatchEvent(new CustomEvent('product:added-to-cart', { detail: { product: productToAdd } }));
            },
            removeItem(productId, selectedOption = null) {
                this.items = this.items.filter(item => {
                    if (item.id !== productId) return true;
                    if (selectedOption !== null && item.selectedOption !== selectedOption) return true;
                    return false;
                });
                this.saveCart();
            },
            updateQuantity(productId, quantity, selectedOption = null) {
                const item = this.items.find(item => {
                    if (item.id !== productId) return false;
                    if (selectedOption !== null && item.selectedOption !== selectedOption) return false;
                    return true;
                });
                if (item) {
                    if (quantity > 0) {
                        item.quantity = quantity;
                        this.saveCart();
                    } else {
                        this.removeItem(productId, selectedOption);
                    }
                }
            },
            increaseQuantity(productId, selectedOption = null) {
                const item = this.items.find(item => {
                    if (item.id !== productId) return false;
                    if (selectedOption !== null && item.selectedOption !== selectedOption) return false;
                    return true;
                });
                if (item) {
                    item.quantity++;
                    this.saveCart();
                }
            },
            decreaseQuantity(productId, selectedOption = null) {
                const item = this.items.find(item => {
                    if (item.id !== productId) return false;
                    if (selectedOption !== null && item.selectedOption !== selectedOption) return false;
                    return true;
                });
                if (item) {
                    if (item.quantity > 1) {
                        item.quantity--;
                        this.saveCart();
                    } else {
                        this.removeItem(productId, selectedOption);
                    }
                }
            },
            getTotalPrice() {
                return this.items.reduce((total, item) => {
                    const price = item.salePrice || item.price;
                    return total + (price * item.quantity);
                }, 0).toFixed(2);
            },
            getTotalItems() {
                return this.items.reduce((total, item) => total + item.quantity, 0);
            },
            clearCart() {
                this.items = [];
                this.saveCart();
            },
            openWhatsApp(purchaseDetails = true) {
                let message = 'Hello, I would like to make an inquiry.';
                if (purchaseDetails && this.items.length > 0) {
                    message = 'Hello, I would like to place the following order:\n\n';
                    this.items.forEach(item => {
                        const itemPrice = item.salePrice || item.price;
                        message += `• ${item.name} ${item.selectedOption ? `(${item.selectedOption})` : ''} (${item.quantity} × $${itemPrice.toFixed(2)})\n`;
                    });
                    message += `\nTotal: $${this.getTotalPrice()}\n`;
                    message += `\nPlease contact me to confirm my order.`;
                }
                const encodedMessage = encodeURIComponent(message);
                window.open(`https://wa.me/96170608543?text=${encodedMessage}`, '_blank');
            }
        });
    }


    const initializeStore = function() {
        if (window.Alpine) {
            setupAlpineStore();
        } else {
            document.addEventListener('alpine:init', setupAlpineStore);
        }
    };


    const getItems = () => _items;
    const getTotalPrice = () => _items.reduce((total, item) => {
        const price = item.salePrice || item.price;
        return total + (price * item.quantity);
    }, 0).toFixed(2);
    const getTotalItems = () => _items.reduce((total, item) => total + item.quantity, 0);

    return {
        initializeStore,
        getItems,
        getTotalPrice,
        getTotalItems
    };
})();


const UI = (function() {
    'use strict';

    const initializeStore = function() {
        Alpine.store('ui', {
            isMenuOpen: false,
            showCartNotification: false,
            scrollToTop() {
                window.scrollTo({top: 0, behavior: 'smooth'});
            },
            openWhatsApp() {
                window.open('https://wa.me/96170608543', '_blank');
            }
        });
    };

    const showCartNotification = function() {
        Alpine.store('ui').showCartNotification = true;
        setTimeout(() => {
            Alpine.store('ui').showCartNotification = false;
        }, 3000);
    };

    const toggleMobileMenu = function() {
        Alpine.store('ui').isMenuOpen = !Alpine.store('ui').isMenuOpen;
    };

    return {
        initializeStore,
        showCartNotification,
        toggleMobileMenu
    };
})();


const Category = (function() {
    'use strict';

    const getById = function(id) {
        return (window.CATEGORIES || []).find(category => category.id === parseInt(id)) || null;
    };

    const getBySlug = function(slug) {
        return (window.CATEGORIES || []).find(category => category.slug === slug) || null;
    };

    const getFeatured = function() {
        return (window.CATEGORIES || []).filter(category => category.featured);
    };

    return {
        getById,
        getBySlug,
        getFeatured
    };
})();


const Adapters = (function() {
    'use strict';

    const adaptNewProductToOld = function(product) {
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.base_price,
            salePrice: product.isOnSale ? calculateSalePrice(product) : null,
            rating: product.rating,
            stock: product.totalVariantStock || product.stock,
            categoryId: Array.isArray(product.categories) && product.categories.length ? product.categories[0] : null,
            featured: !!product.isFeatured,
            new: product.createdAt && isNewProduct(product.createdAt),
            sale: !!product.isOnSale,
            images: getProductImages(product),
            options: getProductOptions(product)
        };
    };

    const calculateSalePrice = function(product) {
        return product.base_price * 0.9;
    };

    const isNewProduct = function(createdAt) {
        const created = new Date(createdAt);
        const now = new Date();
        const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
        return (now - created) < thirtyDaysInMs;
    };

    const getProductImages = function(product) {
        if (Array.isArray(product.images)) {
            return product.images;
        }
        const allImages = [];
        if (product.images) {
            allImages.push(...product.images);
        }
        return allImages;
    };

    const getProductOptions = function(product) {
        if (!product.options) return [];
        const firstOptionName = Object.keys(product.options)[0];
        if (firstOptionName && Array.isArray(product.options[firstOptionName])) {
            return product.options[firstOptionName];
        }
        return [];
    };

    return {
        adaptNewProductToOld
    };
})();

document.addEventListener('alpine:init', () => {
    // Initialize your stores here
    Cart.initializeStore();
    UI.initializeStore();
    Product.init();
    console.log("Alpine stores initialized");
});
