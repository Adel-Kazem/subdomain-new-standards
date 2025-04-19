// ecommerce-whatsapp.js - WhatsApp Checkout Module for E-commerce

document.addEventListener('alpine:init', () => {
    // Alpine Checkout Component
    Alpine.data('checkoutWhatsApp', () => ({
        businessPhone: '96170608543', // Default business WhatsApp number from instructions

        sendToWhatsApp(phoneNumber = null) {
            if (!Alpine.store('cart').items.length) {
                Alpine.store('ui').showNotification('Your cart is empty', 'error');
                return;
            }

            let message = 'Hello, I would like to place the following order:\n\n';

            // Add items details
            Alpine.store('cart').items.forEach(item => {
                const price = item.price;
                message += `• ${item.name}`;

                // Add selected option if present
                if (item.selectedOption) {
                    message += ` (${item.selectedOption})`;
                }

                message += ` - ${item.quantity} × $${price.toFixed(2)}\n`;
            });

            // Add subtotal
            const subtotal = Alpine.store('cart').getTotalPrice();
            message += `\nSubtotal: $${subtotal.toFixed(2)}`;

            // Add discount if applied (if coupon store exists)
            if (Alpine.store('coupon') && Alpine.store('coupon').applied) {
                const discountAmount = Alpine.store('coupon').getDiscountAmount(subtotal);
                message += `\nDiscount (${Alpine.store('coupon').code}): -$${discountAmount}`;
            }

            // Add total
            let total = subtotal;
            if (Alpine.store('coupon') && Alpine.store('coupon').applied) {
                total = Alpine.store('coupon').getTotal(subtotal);
            }
            message += `\nTotal: $${parseFloat(total).toFixed(2)}\n`;

            // Add closing message
            message += `\nPlease contact me to confirm my order.`;

            // Use provided phone or default
            const phone = phoneNumber || this.businessPhone;

            // Encode the message for URL
            const encodedMessage = encodeURIComponent(message);

            // Open WhatsApp with the message
            window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
        }
    }));

    // Extend UI store with notification functionality if needed
    if (!Alpine.store('ui').showNotification) {
        Alpine.store('ui').notification = {
            show: false,
            message: '',
            type: 'info',
            timeout: null
        };

        Alpine.store('ui').showNotification = function(message, type = 'info', duration = 3000) {
            // Clear any existing timeout
            if (this.notification.timeout) {
                clearTimeout(this.notification.timeout);
            }

            // Set notification
            this.notification.message = message;
            this.notification.type = type;
            this.notification.show = true;

            // Auto-hide after duration
            this.notification.timeout = setTimeout(() => {
                this.notification.show = false;
            }, duration);
        };
    }
});