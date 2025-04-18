/**
 * Main application entry point
 */
import { createProductData } from './productData.js';

// Wait for Alpine.js to initialize
document.addEventListener('alpine:init', () => {
    // Register our data component with Alpine
    Alpine.data('productData', createProductData);

    // You could initialize other Alpine components here

    console.log('Product page initialized');
});

// You could add other initialization code here
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');
});
