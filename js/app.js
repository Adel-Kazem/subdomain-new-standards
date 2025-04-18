// app.js - Shared Alpine.js Components for E-commerce

document.addEventListener('alpine:init', () => {
    /**
     * Shopping Cart Store
     * Handles cart functionality across all pages
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
                item.id === product.id && JSON.stringify(item.options) === JSON.stringify(options)
            );

            if (existingItemIndex >= 0) {
                // Update quantity of existing item
                this.items[existingItemIndex].quantity += quantity;
            } else {
                // Add new item
                this.items.push({
                    id: product.id,
                    name: product.name,
                    price: product.salePrice || product.base_price || product.price,
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
     * Handles common UI interactions across all pages
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
     * Utility functions for formatting
     */
    Alpine.data('utilities', () => {
        return {
            formatPrice(price) {
                return '$' + parseFloat(price).toFixed(2);
            },

            formatOptionName(name) {
                return name.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
            },

            formatFeatureKey(key) {
                return key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
            }
        };
    });
});