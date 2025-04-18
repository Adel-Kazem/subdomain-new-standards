/**
 * Utility functions for the product page
 */

/**
 * Format a number as a price with dollar sign
 * @param {number|string} price - The price to format
 * @returns {string} Formatted price string
 */
export function formatPrice(price) {
    return '$' + Number(price).toFixed(2);
}

/**
 * Log cart additions for analytics or debugging
 * @param {Object} cartData - Data about the cart addition
 */
export function logCartAddition(cartData) {
    console.log('Cart addition:', cartData);
    // In a real app, you might send this to an analytics service
}

/**
 * Show notification to user
 * @param {string} message - Message to display
 */
export function showNotification(message) {
    alert(message);
}
