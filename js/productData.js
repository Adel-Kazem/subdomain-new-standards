/**
 * Product data and functionality module
 */
import { formatPrice, logCartAddition, showNotification } from './utils.js';

/**
 * Product data structure and methods
 */
export const createProductData = () => {
    return {
        // Product information
        productName: 'Premium Coffee Maker',
        description: 'Experience barista-quality coffee at home with our premium coffee maker. Features programmable brewing, temperature control, and a sleek design that complements any kitchen decor.',
        basePrice: 89.99,
        selectedOption: 'standard',
        options: {
            standard: {
                name: 'Standard Edition',
                priceModifier: 0,
                description: 'Our classic model with all essential features.'
            },
            deluxe: {
                name: 'Deluxe Edition',
                priceModifier: 30,
                description: 'Enhanced with double thermal insulation and premium stainless steel finish.'
            }
        },
        quantity: 1,

        // Utility methods
        formatPrice,

        // Computed properties
        get currentOption() {
            return this.options[this.selectedOption];
        },

        get finalPrice() {
            return (this.basePrice + this.currentOption.priceModifier).toFixed(2);
        },

        get totalPrice() {
            return (this.quantity * (this.basePrice + this.currentOption.priceModifier)).toFixed(2);
        },

        // Action methods
        increaseQuantity() {
            this.quantity++;
        },

        decreaseQuantity() {
            if (this.quantity > 1) {
                this.quantity--;
            }
        },

        addToCart() {
            const cartData = {
                product: this.productName,
                option: this.selectedOption,
                optionName: this.currentOption.name,
                quantity: this.quantity,
                unitPrice: this.finalPrice,
                totalPrice: this.totalPrice
            };

            const message = `Added to cart: ${this.quantity} ${this.productName} (${this.currentOption.name}) for ${this.formatPrice(this.totalPrice)}`;
            showNotification(message);
            logCartAddition(cartData);

            // In a real app, you would likely call an API to add the product to the cart
            // or update a cart state in localStorage, etc.
        }
    };
};
