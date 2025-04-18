document.addEventListener('alpine:init', () => {
    Alpine.data('productViewer', function(product) {
        return {
            product: product,
            selectedImage: '',
            selectedOptions: {},
            isScrollLeftEnd: true,
            isScrollRightEnd: false,

            // Image zoom properties
            zoomed: false,
            isTouchDevice: false,
            scale: 2,
            origin: '50% 50%',
            panX: 0,
            panY: 0,
            minPanX: 0,
            maxPanX: 0,
            minPanY: 0,
            maxPanY: 0,
            dragStartX: 0,
            dragStartY: 0,
            dragging: false,
            lastTap: 0,
            imgStyle: '',

            init() {
                if (this.product) {
                    // Initialize selected image
                    this.selectedImage = this.product.images && this.product.images.length > 0 ? this.product.images[0] : '';

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

                    // Initialize zoom features
                    this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
                    this.imgStyle = 'transform: scale(1); transform-origin: 50% 50%;';
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

            // NEW FEATURE: Check if an option value leads to available stock
            isOptionValueAvailable(optionType, optionValue) {
                if (!this.product || !this.product.hasVariants) return true;

                // Create a temporary selection with the current options
                const tempSelection = {...this.selectedOptions};
                tempSelection[optionType] = optionValue;

                // Check if this combination has stock
                const parts = [];
                let complete = true;

                for (const option in this.product.options) {
                    if (!tempSelection[option]) {
                        complete = false;
                        break;
                    }
                    parts.push(tempSelection[option]);
                }

                if (!complete) return true; // If incomplete, assume available

                const key = parts.join('|');
                return (this.product.option_variants_stock[key] || 0) > 0;
            },

            // NEW FEATURE: Get class for option buttons based on availability
            getOptionButtonClass(optionType, optionValue) {
                const isSelected = this.selectedOptions[optionType] === optionValue;
                const isAvailable = this.isOptionValueAvailable(optionType, optionValue);

                if (isSelected && isAvailable) {
                    return 'border-indigo-500 bg-indigo-50 text-indigo-700';
                } else if (isSelected && !isAvailable) {
                    return 'border-red-500 bg-red-50 text-red-700';
                } else if (!isSelected && isAvailable) {
                    return 'border-gray-300 text-gray-700 hover:border-indigo-500';
                } else {
                    return 'border-gray-300 text-gray-400 bg-gray-50 cursor-not-allowed';
                }
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
                    return this.product.images && this.product.images.length > 0 ? this.product.images[0] : '';
                } catch (error) {
                    console.error("Error in getSelectedImage:", error);
                    return this.product.images && this.product.images.length > 0 ? this.product.images[0] : '';
                }
            },

            selectImage(image) {
                this.selectedImage = image;
                this.resetZoom(); // Reset zoom when changing images
            },

            selectOption(option, value) {
                this.selectedOptions[option] = value;
                // Reset selected image to force selection based on variant
                this.selectedImage = '';
                this.resetZoom(); // Reset zoom when changing options

                // Scroll to the thumbnail related to this option
                this.$nextTick(() => {
                    this.scrollToOptionThumbnails();
                });
            },

            selectOptionFromImage(optionType, optionValue) {
                this.selectedOptions[optionType] = optionValue;

                // Scroll to the thumbnail related to this option
                this.$nextTick(() => {
                    this.scrollToOptionThumbnails();
                });
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

                // Scroll to the thumbnail related to these options
                this.$nextTick(() => {
                    this.scrollToOptionThumbnails();
                });
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
            },

            // Scroll to Option Thumbnails
            scrollToOptionThumbnails() {
                const container = this.$refs.thumbnailsContainer;
                if (!container) return;

                // Find which thumbnail corresponds to the currently selected options
                let targetThumbnail = null;
                const thumbnails = container.querySelectorAll('div[class*="cursor-pointer"]');

                // Check for variant images first (color + design combinations)
                if (this.product.variant_images) {
                    const colorOption = this.selectedOptions['color'];
                    const designOption = this.selectedOptions['design'];

                    if (colorOption && designOption) {
                        const variantKey = `${colorOption}|${designOption}`;

                        // Look for a thumbnail with the matching variant
                        thumbnails.forEach(thumb => {
                            // Check if this thumbnail is for a variant
                            const thumbnailText = thumb.textContent.trim().toLowerCase();
                            if (thumbnailText.includes(colorOption) && thumbnailText.includes(designOption)) {
                                targetThumbnail = thumb;
                                return; // Break out of forEach
                            }
                        });
                    }
                }

                // If no variant match, look for option-specific thumbnails
                if (!targetThumbnail && this.product.option_images) {
                    for (const option in this.selectedOptions) {
                        const value = this.selectedOptions[option];

                        if (
                            this.product.option_images[option] &&
                            this.product.option_images[option][value]
                        ) {
                            // Look for a thumbnail with matching option value
                            thumbnails.forEach(thumb => {
                                const thumbnailText = thumb.textContent.trim().toLowerCase();
                                if (thumbnailText === value.toLowerCase()) {
                                    targetThumbnail = thumb;
                                    return; // Break out of forEach
                                }
                            });

                            if (targetThumbnail) break; // Found a match, so stop looking
                        }
                    }
                }

                // If we found a matching thumbnail, scroll to it
                if (targetThumbnail) {
                    const containerRect = container.getBoundingClientRect();
                    const thumbnailRect = targetThumbnail.getBoundingClientRect();

                    // Calculate position to center the thumbnail in the container
                    const scrollLeftPosition = container.scrollLeft + (thumbnailRect.left - containerRect.left) -
                        (containerRect.width / 2 - thumbnailRect.width / 2);

                    container.scrollTo({
                        left: scrollLeftPosition,
                        behavior: 'smooth'
                    });
                }
            },

            // Image Zoom Functionality
            // Desktop zoom handlers
            mouseMove(e) {
                if (!this.zoomed || this.isTouchDevice) return;

                const img = this.$refs.mainImage;
                if (!img) return;

                const rect = img.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;

                this.origin = `${x}% ${y}%`;
                this.updateZoomStyle();
            },

            mouseEnter(e) {
                if (this.isTouchDevice) return;
                this.zoomed = true;
                this.mouseMove(e);
            },

            mouseLeave() {
                if (this.isTouchDevice) return;
                this.zoomed = false;
                this.resetZoom();
            },

            // Mobile zoom and drag handlers
            touchStart(e) {
                if (e.touches.length > 1) return;

                const now = Date.now();

                // Double tap detection
                if (now - this.lastTap < 300) {
                    // Toggle zoom state
                    this.zoomed = !this.zoomed;

                    if (this.zoomed) {
                        // Set zoom origin to touch point
                        const img = this.$refs.mainImage;
                        if (!img) return;

                        const rect = img.getBoundingClientRect();
                        const touch = e.touches[0];
                        const x = ((touch.clientX - rect.left) / rect.width) * 100;
                        const y = ((touch.clientY - rect.top) / rect.height) * 100;

                        this.origin = `${x}% ${y}%`;
                        this.panX = 0;
                        this.panY = 0;
                        this.calculatePanLimits();
                        this.updateZoomStyle();
                    } else {
                        this.resetZoom();
                    }

                    e.preventDefault();
                } else if (this.zoomed) {
                    // Start dragging
                    this.dragging = true;
                    this.dragStartX = e.touches[0].clientX - this.panX;
                    this.dragStartY = e.touches[0].clientY - this.panY;
                }

                this.lastTap = now;
            },

            touchMove(e) {
                if (!this.zoomed || !this.dragging || e.touches.length > 1) return;

                const touchX = e.touches[0].clientX;
                const touchY = e.touches[0].clientY;

                this.panX = touchX - this.dragStartX;
                this.panY = touchY - this.dragStartY;

                // Limit panning to within image bounds
                this.panX = Math.max(this.minPanX, Math.min(this.maxPanX, this.panX));
                this.panY = Math.max(this.minPanY, Math.min(this.maxPanY, this.panY));

                this.updateZoomStyle();
                e.preventDefault();
            },

            touchEnd() {
                this.dragging = false;
            },

            // Helper functions for zoom behavior
            updateZoomStyle() {
                if (!this.zoomed) {
                    this.imgStyle = 'transform: scale(1); transform-origin: 50% 50%; transition: transform 0.3s ease;';
                    return;
                }

                if (this.isTouchDevice) {
                    const transform = `scale(${this.scale}) translate(${this.panX}px, ${this.panY}px)`;
                    this.imgStyle = `transform: ${transform}; transform-origin: ${this.origin}; transition: none;`;
                } else {
                    this.imgStyle = `transform: scale(${this.scale}); transform-origin: ${this.origin}; transition: transform-origin 0.1s ease;`;
                }
            },

            resetZoom() {
                this.zoomed = false;
                this.panX = 0;
                this.panY = 0;
                this.origin = '50% 50%';
                this.updateZoomStyle();
            },

            calculatePanLimits() {
                const img = this.$refs.mainImage;
                if (!img) return;

                const rect = img.getBoundingClientRect();

                // Calculate how much the image can be panned
                // This is half the difference between the zoomed size and the container size
                this.maxPanX = (rect.width * (this.scale - 1)) / 2;
                this.minPanX = -this.maxPanX;
                this.maxPanY = (rect.height * (this.scale - 1)) / 2;
                this.minPanY = -this.maxPanY;
            }
        };
    });
});