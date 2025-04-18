// cart-page.js - Alpine.js Components for Cart Page

document.addEventListener('alpine:init', () => {
    /**
     * Shopping Cart Page Component
     * Handles cart page functionality
     */
    Alpine.data('cartPage', () => {
        return {
            // State
            couponCode: '',
            shippingMethod: 'standard',
            estimatedDelivery: '',

            init() {
                this.updateEstimatedDelivery();
            },

            // Shipping methods and their costs
            shippingMethods: {
                standard: { name: 'Standard Shipping', cost: 4.99, days: '3-5' },
                express: { name: 'Express Shipping', cost: 9.99, days: '1-2' },
                free: { name: 'Free Shipping', cost: 0, days: '5-7', minimumOrder: 50 }
            },

            // Get current shipping method details
            getCurrentShippingMethod() {
                return this.shippingMethods[this.shippingMethod] || this.shippingMethods.standard;
            },

            // Update estimated delivery based on selected shipping method
            updateEstimatedDelivery() {
                const method = this.getCurrentShippingMethod();

                // Calculate delivery date range
                const today = new Date();
                const minDays = parseInt(method.days.split('-')[0]);
                const maxDays = parseInt(method.days.split('-')[1]);

                const minDate = new Date(today);
                minDate.setDate(today.getDate() + minDays);

                const maxDate = new Date(today);
                maxDate.setDate(today.getDate() + maxDays);

                // Format dates
                const options = { month: 'short', day: 'numeric' };
                const minDateStr = minDate.toLocaleDateString('en-US', options);
                const maxDateStr = maxDate.toLocaleDateString('en-US', options);

                this.estimatedDelivery = `${minDateStr} - ${maxDateStr}`;
            },

            // Check if the cart qualifies for free shipping
            qualifiesForFreeShipping() {
                const freeShippingMinimum = this.shippingMethods.free.minimumOrder;
                return Alpine.store('cart').getTotalPrice() >= freeShippingMinimum;
            },

            // Apply coupon (this would typically check with a backend)
            applyCoupon() {
                if (!this.couponCode.trim()) {
                    alert('Please enter a coupon code');
                    return;
                }

                // This is just a placeholder. In a real app, you'd validate with the server
                if (this.couponCode.toLowerCase() === 'welcome10') {
                    alert('Coupon applied: 10% discount!');
                    // Implementation would vary based on how you handle discounts
                } else {
                    alert('Invalid coupon code');
                }
            },

            // Get final total including shipping
            getFinalTotal() {
                const subtotal = Alpine.store('cart').getTotalPrice();
                const shippingCost = this.qualifiesForFreeShipping() ? 0 : this.getCurrentShippingMethod().cost;
                // Add tax calculation if needed
                return subtotal + shippingCost;
            },

            // Format currency
            formatPrice(price) {
                return '$' + parseFloat(price).toFixed(2);
            },

            // Proceed to checkout
            proceedToCheckout() {
                // Save shipping method to localStorage or session
                localStorage.setItem('selectedShippingMethod', this.shippingMethod);

                // Redirect to checkout page
                window.location.href = 'checkout.html';
            }
        };
    });
});