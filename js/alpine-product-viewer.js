document.addEventListener('alpine:init', () => {
    Alpine.data('productViewer', function(product) {
        return {
            product: product,
            selectedImage: '',
            selectedOptions: {},
            isScrollLeftEnd: true,
            isScrollRightEnd: false,

            init() {
                if (this.product) {
                    // Initialize selected image
                    this.selectedImage = this.product.images && this.product.images.length > 0
                        ? this.product.images[0]
                        : '';

                    // Initialize selected options
                    this.selectedOptions = {};
                    if (this.product.options) {
                        for (const option in this.product.options) {
                            if (this.product.options[option] && this.product.options[option].length > 0) {
                                this.selectedOptions[option] = this.product.options[option][0];
                            }
                        }
                    }

                    // Initialize scroll position check
                    setTimeout(() => {
                        this.checkScrollPosition();
                    }, 100);
                }
            },

            hasThumbnails() {
                let count = 0;

                // Count main images
                count += this.product.images ? this.product.images.length : 0;

                // Count option images
                if (this.product.option_images) {
                    for (const optionType in this.product.option_images) {
                        for (const optionValue in this.product.option_images[optionType]) {
                            count += this.product.option_images[optionType][optionValue].length;
                        }
                    }
                }

                // Count variant images
                if (this.product.variant_images) {
                    for (const key in this.product.variant_images) {
                        if (Array.isArray(this.product.variant_images[key])) {
                            count += this.product.variant_images[key].length;
                        } else {
                            count += 1;
                        }
                    }
                }

                return count > 1;
            },

            formatPrice(price) {
                return '$' + parseFloat(price).toFixed(2);
            },

            formatOptionName(name) {
                return name.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
            },

            formatFeatureKey(key) {
                return key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
            },

            formatVariantName(variant) {
                return variant
                    .split('|')
                    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
                    .join(' + ');
            },

            calculateCurrentPrice() {
                if (!this.product) return 0;
                let price = parseFloat(this.product.base_price);

                // Add option price adjustments
                if (this.product.option_price_adjustments) {
                    for (const option in this.selectedOptions) {
                        const value = this.selectedOptions[option];
                        const key = `${option}:${value}`;
                        if (this.product.option_price_adjustments[key] !== undefined) {
                            price += parseFloat(this.product.option_price_adjustments[key]);
                        }
                    }
                }

                return price;
            },

            getShippingInfo() {
                if (!this.product) return '';
                if (this.product.free_shipping) {
                    return "Free Shipping";
                }

                let shippingCost = parseFloat(this.product.base_shipping_cost);

                // Add shipping adjustments
                if (this.product.option_shipping_adjustments) {
                    for (const option in this.selectedOptions) {
                        const value = this.selectedOptions[option];
                        const key = `${option}:${value}`;
                        if (this.product.option_shipping_adjustments[key] !== undefined) {
                            shippingCost += parseFloat(this.product.option_shipping_adjustments[key]);
                        }
                    }
                }

                if (shippingCost <= 0) {
                    return "Free Shipping";
                }

                return `$${shippingCost.toFixed(2)} Shipping`;
            },

            getInventoryForSelection() {
                if (!this.product) return 0;
                if (!this.product.hasVariants) {
                    return this.product.stock;
                }

                const parts = [];
                let complete = true;

                for (const option in this.product.options) {
                    if (!this.selectedOptions[option]) {
                        complete = false;
                        break;
                    }
                    parts.push(this.selectedOptions[option]);
                }

                if (!complete) return 0;

                const key = parts.join('|');
                return this.product.option_variants_stock[key] || 0;
            },

            getSelectedImage() {
                if (!this.product) return '';

                try {
                    // If an image has been manually selected, use that
                    if (this.selectedImage) {
                        return this.selectedImage;
                    }

                    // Check if there's a specific variant image
                    if (this.product.variant_images) {
                        // Try different combinations for variant images
                        const colorOption = this.selectedOptions['color'];
                        const designOption = this.selectedOptions['design'];

                        // Try color + design combination
                        if (colorOption && designOption) {
                            const key = `${colorOption}|${designOption}`;
                            if (this.product.variant_images[key]) {
                                const variantImage = this.product.variant_images[key];
                                return Array.isArray(variantImage) ? variantImage[0] : variantImage;
                            }
                        }
                    }

                    // Check for option-specific images
                    if (this.product.option_images) {
                        for (const option in this.selectedOptions) {
                            const value = this.selectedOptions[option];
                            if (
                                this.product.option_images[option] &&
                                this.product.option_images[option][value] &&
                                this.product.option_images[option][value].length > 0
                            ) {
                                return this.product.option_images[option][value][0];
                            }
                        }
                    }

                    // Default to first product image
                    return this.product.images && this.product.images.length > 0
                        ? this.product.images[0]
                        : '';
                } catch (error) {
                    console.error("Error in getSelectedImage:", error);
                    return this.product.images && this.product.images.length > 0
                        ? this.product.images[0]
                        : '';
                }
            },

            selectImage(image) {
                this.selectedImage = image;
            },

            selectOption(option, value) {
                this.selectedOptions[option] = value;
                // Reset selected image to force selection based on variant
                this.selectedImage = '';
            },

            selectOptionFromImage(optionType, optionValue) {
                this.selectedOptions[optionType] = optionValue;
            },

            selectVariantFromKey(key) {
                const parts = key.split('|');

                // For t-shirt assume color|design format
                if (parts.length >= 2) {
                    if (this.product.options['color'] && this.product.options['color'].includes(parts[0])) {
                        this.selectedOptions['color'] = parts[0];
                    }

                    if (this.product.options['design'] && this.product.options['design'].includes(parts[1])) {
                        this.selectedOptions['design'] = parts[1];
                    }
                }
            },

            handleImageError(event) {
                event.target.src = "https://via.placeholder.com/400x300?text=Image+Not+Available";
            },

            // Thumbnail scrolling
            scrollThumbnails(direction) {
                const container = this.$refs.thumbnailsContainer;
                if (!container) return;

                const scrollAmount = container.clientWidth * 0.75;

                if (direction === 'left') {
                    container.scrollLeft -= scrollAmount;
                } else {
                    container.scrollLeft += scrollAmount;
                }

                setTimeout(() => {
                    this.checkScrollPosition();
                }, 100);
            },

            checkScrollPosition() {
                const container = this.$refs.thumbnailsContainer;
                if (!container) return;

                this.isScrollLeftEnd = container.scrollLeft <= 0;
                this.isScrollRightEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 5;
            }
        };
    });
});