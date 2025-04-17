const PRODUCTS = [
    // Product 1: Whey Protein Isolate
    {
        id: 5001,
        name: "Pure Whey Isolate",
        description: "Ultra-filtered whey protein isolate for rapid absorption and lean muscle growth. Low in carbs and fat, perfect post-workout.",
        base_price: 49.99,
        base_shipping_cost: 6.99,
        free_shipping: false,
        sku: "PRO-WHI-001",
        slug: "pure-whey-isolate",
        brand: "FitFuel",
        rating: 4.8,
        reviews_count: 512,
        status: "active",
        isFeatured: true,
        isOnSale: false,
        requiresShipping: true,
        requiresInventoryTracking: true,
        stock: 0, // Must select options
        hasVariants: true,
        totalVariantStock: 450, // Example total stock
        lowStockThreshold: 20,
        features: {
            proteinPerServing: "25g",
            caloriesPerServing: "110",
            bcaas: "5.5g",
            lactoseFree: "Yes (typically <1g)",
            mixability: "Excellent"
        },
        images: [
            "https://images.unsplash.com/photo-1627734819944-b98b139097a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Generic protein tub
            "https://images.unsplash.com/photo-1602175689919-68d3e8c2670b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Scoop with powder
            "https://images.unsplash.com/photo-1541591224894-4fc8ce8a0a69?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"  // Protein shake
        ],
        options: {
            "Flavor": ["Chocolate Fudge", "Vanilla Bean", "Strawberry Cream"],
            "Size": ["2lb", "5lb"]
        },
        option_images: {
            "Flavor": {
                "Chocolate Fudge": ["https://images.unsplash.com/photo-1636503240072-3a504b5b5059?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"], // Chocolate themed
                "Vanilla Bean": ["https://images.unsplash.com/photo-1559443913-c791938f3649?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"], // Vanilla themed
                "Strawberry Cream": ["https://images.unsplash.com/photo-1575367281074-cabf59c1f6a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"] // Strawberry themed
            }
        },
        variant_images: {}, // No specific combo images needed here
        option_variants_stock: {
            "Chocolate Fudge|2lb": 100, "Chocolate Fudge|5lb": 50,
            "Vanilla Bean|2lb": 90, "Vanilla Bean|5lb": 60,
            "Strawberry Cream|2lb": 80, "Strawberry Cream|5lb": 70
        },
        option_price_adjustments: {
            "Size": { "5lb": 35.00 } // 5lb costs $35 more than base (2lb)
        },
        option_shipping_adjustments: {
            "Size": { "5lb": 3.00 } // 5lb adds $3 to shipping
        },
        weight: { value: 2, unit: 'lb' }, // Base weight
        dimensions: { length: 8, width: 8, height: 10, unit: 'in' }, // Base dimensions
        option_dimension_overrides: {
            "Size": {
                "5lb": {
                    weight: { value: 5, unit: 'lb' },
                    dimensions: { length: 10, width: 10, height: 12, unit: 'in' }
                }
            }
        },
        categories: [101],
        upselling: [5002, 5006], // Suggest Casein and Creatine
        crossSelling: [5010], // Suggest Amino Recovery
        relatedProducts: [5003], // Suggest Vegan Protein
        createdAt: "2025-04-10T09:00:00Z",
        updatedAt: "2025-04-17T11:00:00Z"
    },

    // Product 2: Casein Protein
    {
        id: 5002,
        name: "Slow Release Casein",
        description: "Micellar casein protein for sustained amino acid release, ideal for overnight recovery and muscle preservation.",
        base_price: 44.99,
        base_shipping_cost: 6.99,
        free_shipping: false,
        sku: "PRO-CAS-001",
        slug: "slow-release-casein",
        brand: "NightGainz",
        rating: 4.7,
        reviews_count: 380,
        status: "active",
        isFeatured: false,
        isOnSale: true,
        requiresShipping: true,
        requiresInventoryTracking: true,
        stock: 0,
        hasVariants: true,
        totalVariantStock: 300,
        lowStockThreshold: 15,
        features: {
            proteinPerServing: "24g",
            caloriesPerServing: "120",
            digestionSpeed: "Slow (up to 7 hours)",
            useCase: "Nighttime / Between meals"
        },
        images: [
            "https://images.unsplash.com/photo-1610402231013-4093f45e3c44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Another protein tub
            "https://images.unsplash.com/photo-1557823766-9678aa8a5e34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"  // Milk/slow digestion concept
        ],
        options: {
            "Flavor": ["Cookies & Cream", "Chocolate Peanut Butter"],
            "Size": ["2lb", "4lb"]
        },
        option_images: {}, // Can reuse general images
        variant_images: {},
        option_variants_stock: {
            "Cookies & Cream|2lb": 90, "Cookies & Cream|4lb": 60,
            "Chocolate Peanut Butter|2lb": 85, "Chocolate Peanut Butter|4lb": 65
        },
        option_price_adjustments: {
            "Size": { "4lb": 30.00 }
        },
        option_shipping_adjustments: {
            "Size": { "4lb": 2.50 }
        },
        weight: { value: 2, unit: 'lb' },
        dimensions: { length: 8, width: 8, height: 10, unit: 'in' },
        option_dimension_overrides: {
            "Size": {
                "4lb": {
                    weight: { value: 4, unit: 'lb' },
                    dimensions: { length: 9, width: 9, height: 11, unit: 'in' }
                }
            }
        },
        categories: [101],
        upselling: [5001, 5007], // Suggest Whey, Multivitamin
        crossSelling: [],
        relatedProducts: [5003],
        createdAt: "2025-04-11T11:00:00Z",
        updatedAt: "2025-04-17T11:10:00Z"
    },

    // Product 3: Vegan Protein
    {
        id: 5003,
        name: "Vegan Plant Power Protein",
        description: "A smooth blend of pea, brown rice, and hemp protein providing a complete amino acid profile. Dairy-free, soy-free, and gluten-free.",
        base_price: 54.99,
        base_shipping_cost: 6.99,
        free_shipping: false,
        sku: "PRO-VEG-001",
        slug: "vegan-plant-power-protein",
        brand: "EarthStrong",
        rating: 4.6,
        reviews_count: 295,
        status: "active",
        isFeatured: false,
        isOnSale: false,
        requiresShipping: true,
        requiresInventoryTracking: true,
        stock: 0,
        hasVariants: true,
        totalVariantStock: 250,
        lowStockThreshold: 10,
        features: {
            proteinPerServing: "22g",
            caloriesPerServing: "130",
            proteinSources: "Pea, Brown Rice, Hemp",
            certifications: "Vegan, Non-GMO"
        },
        images: [
            "https://images.unsplash.com/photo-1630478300654-bd821bd89f11?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Plant-based protein visual
            "https://images.unsplash.com/photo-1610173825703-7519ed8f161a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" // Green/natural vibe
        ],
        options: {
            "Flavor": ["Natural Vanilla", "Rich Chocolate"],
            "Size": ["1.5lb", "3lb"]
        },
        option_images: {},
        variant_images: {},
        option_variants_stock: {
            "Natural Vanilla|1.5lb": 80, "Natural Vanilla|3lb": 50,
            "Rich Chocolate|1.5lb": 75, "Rich Chocolate|3lb": 45
        },
        option_price_adjustments: {
            "Size": { "3lb": 30.00 }
        },
        option_shipping_adjustments: {
            "Size": { "3lb": 2.00 }
        },
        weight: { value: 1.5, unit: 'lb' },
        dimensions: { length: 7, width: 7, height: 9, unit: 'in' },
        option_dimension_overrides: {
            "Size": {
                "3lb": {
                    weight: { value: 3, unit: 'lb' },
                    dimensions: { length: 8, width: 8, height: 10, unit: 'in' }
                }
            }
        },
        categories: [101],
        upselling: [5001, 5008], // Suggest Whey, Omega-3
        crossSelling: [],
        relatedProducts: [5002],
        createdAt: "2025-04-12T14:00:00Z",
        updatedAt: "2025-04-17T11:15:00Z"
    },

    // Product 4: High-Stim Pre-Workout
    {
        id: 5004,
        name: "Ignite Pre-Workout Fury",
        description: "Explosive energy, laser focus, and intense pumps for your most demanding workouts. High-stimulant formula.",
        base_price: 39.99,
        base_shipping_cost: 5.99,
        free_shipping: false,
        sku: "PRE-IGN-001",
        slug: "ignite-pre-workout-fury",
        brand: "AmpedUp",
        rating: 4.5,
        reviews_count: 620,
        status: "active",
        isFeatured: true,
        isOnSale: false,
        requiresShipping: true,
        requiresInventoryTracking: true,
        stock: 0,
        hasVariants: true,
        totalVariantStock: 500,
        lowStockThreshold: 25,
        features: {
            caffeinePerServing: "350mg",
            keyIngredients: "Beta-Alanine, L-Citrulline, Caffeine Anhydrous",
            servingsPerContainer: "30",
            intensity: "High"
        },
        images: [
            "https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Dynamic fitness image
            "https://images.unsplash.com/photo-1637430300943-969bca81c56f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Powder/scoop close up
            "https://images.unsplash.com/photo-1549476464-373921717565?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"  // Energy concept
        ],
        options: {
            "Flavor": ["Blue Raspberry", "Watermelon Wave", "Fruit Punch Blast"]
        },
        option_images: {},
        variant_images: {},
        option_variants_stock: {
            "Blue Raspberry": 180,
            "Watermelon Wave": 170,
            "Fruit Punch Blast": 150
        },
        option_price_adjustments: {}, // No price change for flavor
        option_shipping_adjustments: {},
        weight: { value: 0.8, unit: 'lb' },
        dimensions: { length: 5, width: 5, height: 6, unit: 'in' },
        option_dimension_overrides: {},
        categories: [102],
        upselling: [5006, 5001], // Suggest Creatine, Whey
        crossSelling: [5005], // Suggest Stim-Free Pump
        relatedProducts: [5010], // Suggest Aminos
        createdAt: "2025-04-13T08:30:00Z",
        updatedAt: "2025-04-17T11:20:00Z"
    },

    // Product 5: Stim-Free Pre-Workout
    {
        id: 5005,
        name: "Pump Focus (Stim-Free)",
        description: "Enhance muscle pumps, vascularity, and mental focus without the jitters. Perfect for late-night training or stimulant sensitivity.",
        base_price: 37.99,
        base_shipping_cost: 5.99,
        free_shipping: false,
        sku: "PRE-PMP-001",
        slug: "pump-focus-stim-free",
        brand: "FlowState",
        rating: 4.6,
        reviews_count: 310,
        status: "active",
        isFeatured: false,
        isOnSale: false,
        requiresShipping: true,
        requiresInventoryTracking: true,
        stock: 0,
        hasVariants: true,
        totalVariantStock: 280,
        lowStockThreshold: 15,
        features: {
            caffeinePerServing: "0mg",
            keyIngredients: "L-Citrulline Malate, Nitrosigine, Alpha-GPC",
            servingsPerContainer: "25",
            benefit: "Pump & Focus"
        },
        images: [
            "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Focus/pump gym image
            "https://images.unsplash.com/photo-1517964603305-1a14f415a5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" // Clear focus concept
        ],
        options: {
            "Flavor": ["Unflavored", "Peach Mango"]
        },
        option_images: {},
        variant_images: {},
        option_variants_stock: {
            "Unflavored": 150,
            "Peach Mango": 130
        },
        option_price_adjustments: {},
        option_shipping_adjustments: {},
        weight: { value: 0.7, unit: 'lb' },
        dimensions: { length: 5, width: 5, height: 6, unit: 'in' },
        option_dimension_overrides: {},
        categories: [102],
        upselling: [5006, 5010], // Suggest Creatine, Aminos
        crossSelling: [5004], // Suggest Stim Pre-Workout
        relatedProducts: [5001],
        createdAt: "2025-04-14T10:00:00Z",
        updatedAt: "2025-04-17T11:25:00Z"
    },

    // Product 6: Creatine Monohydrate
    {
        id: 5006,
        name: "Micronized Creatine Monohydrate",
        description: "Pure micronized creatine monohydrate for increased strength, power output, and muscle volume. Mixes easily.",
        base_price: 24.99, // Base price for 300g
        base_shipping_cost: 4.99,
        free_shipping: false,
        sku: "PER-CRE-001",
        slug: "micronized-creatine-monohydrate",
        brand: "StrengthLab",
        rating: 4.9,
        reviews_count: 1150,
        status: "active",
        isFeatured: true,
        isOnSale: false,
        requiresShipping: true,
        requiresInventoryTracking: true,
        stock: 0,
        hasVariants: true,
        totalVariantStock: 700,
        lowStockThreshold: 50,
        features: {
            type: "Creatine Monohydrate",
            form: "Micronized Powder",
            purity: "99.9%+",
            flavor: "Unflavored"
        },
        images: [
            "https://images.unsplash.com/photo-1632158111769-6612a1c6b162?ixlib=rb-4.0.3&auto=format=fit&crop&w=800&q=80", // Simple powder tub
            "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" // Strength training image
        ],
        options: {
            "Size": ["300g", "500g", "1kg"]
        },
        option_images: {},
        variant_images: {},
        option_variants_stock: {
            "300g": 300,
            "500g": 250,
            "1kg": 150
        },
        option_price_adjustments: {
            "Size": { "500g": 10.00, "1kg": 25.00 }
        },
        option_shipping_adjustments: {
            "Size": { "1kg": 2.00 }
        },
        weight: { value: 0.66, unit: 'lb' }, // 300g
        dimensions: { length: 4, width: 4, height: 5, unit: 'in' },
        option_dimension_overrides: {
            "Size": {
                "500g": { weight: { value: 1.1, unit: 'lb' }, dimensions: { length: 5, width: 5, height: 6, unit: 'in' } },
                "1kg": { weight: { value: 2.2, unit: 'lb' }, dimensions: { length: 6, width: 6, height: 7, unit: 'in' } }
            }
        },
        categories: [102],
        upselling: [5001, 5004], // Suggest Whey, Pre-Workout
        crossSelling: [],
        relatedProducts: [5010],
        createdAt: "2025-04-01T12:00:00Z",
        updatedAt: "2025-04-17T11:30:00Z"
    },

    // Product 7: Multivitamin
    {
        id: 5007,
        name: "Active Multi-Vitamin",
        description: "Comprehensive daily multivitamin and mineral complex designed for active individuals to support energy levels, immunity, and overall wellness.",
        base_price: 29.99, // Base for 60 tablets
        base_shipping_cost: 3.99,
        free_shipping: true, // Often smaller/lighter
        sku: "VIT-MUL-001",
        slug: "active-multi-vitamin",
        brand: "Vitality Core",
        rating: 4.7,
        reviews_count: 415,
        status: "active",
        isFeatured: false,
        isOnSale: false,
        requiresShipping: true,
        requiresInventoryTracking: true,
        stock: 0,
        hasVariants: true,
        totalVariantStock: 600,
        lowStockThreshold: 30,
        features: {
            keyNutrients: "Vitamins A, C, D, E, K, B-Complex, Zinc, Magnesium",
            targetAudience: "Athletes & Active Lifestyles",
            form: "Tablets"
        },
        images: [
            "https://images.unsplash.com/photo-1584515933487-be7267184a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Vitamin bottle image
            "https://images.unsplash.com/photo-1607619056574-7484ec7f0738?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"  // Assortment of pills
        ],
        options: {
            "Count": ["60 Tablets", "120 Tablets"]
        },
        option_images: {},
        variant_images: {},
        option_variants_stock: {
            "60 Tablets": 350,
            "120 Tablets": 250
        },
        option_price_adjustments: {
            "Count": { "120 Tablets": 20.00 }
        },
        option_shipping_adjustments: {}, // Still free shipping
        weight: { value: 0.3, unit: 'lb' }, // 60 tablets
        dimensions: { length: 3, width: 3, height: 5, unit: 'in' },
        option_dimension_overrides: {
            "Count": {
                "120 Tablets": { weight: { value: 0.5, unit: 'lb' }, dimensions: { length: 3.5, width: 3.5, height: 5.5, unit: 'in' } }
            }
        },
        categories: [103],
        upselling: [5008, 5009], // Suggest Fish Oil, Vitamin D3
        crossSelling: [5001], // Suggest Protein
        relatedProducts: [],
        createdAt: "2025-04-05T15:00:00Z",
        updatedAt: "2025-04-17T11:35:00Z"
    },

    // Product 8: Omega-3 Fish Oil
    {
        id: 5008,
        name: "Omega-3 Fish Oil EPA/DHA",
        description: "High-potency fish oil softgels rich in EPA and DHA to support heart health, brain function, and joint comfort.",
        base_price: 22.99, // Base for 90 softgels
        base_shipping_cost: 3.99,
        free_shipping: true,
        sku: "VIT-OMG-001",
        slug: "omega-3-fish-oil-epa-dha",
        brand: "OceanPure",
        rating: 4.8,
        reviews_count: 550,
        status: "active",
        isFeatured: false,
        isOnSale: true,
        requiresShipping: true,
        requiresInventoryTracking: true,
        stock: 0,
        hasVariants: true,
        totalVariantStock: 550,
        lowStockThreshold: 25,
        features: {
            epaPerServing: "600mg",
            dhaPerServing: "400mg",
            source: "Wild-Caught Fish",
            form: "Softgels"
        },
        images: [
            "https://images.unsplash.com/photo-1625862288110-a9c4734a404e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Fish oil capsules
            "https://images.unsplash.com/photo-1617887364397-557ef636158b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"  // Bottle of fish oil
        ],
        options: {
            "Count": ["90 Softgels", "180 Softgels"]
        },
        option_images: {},
        variant_images: {},
        option_variants_stock: {
            "90 Softgels": 300,
            "180 Softgels": 250
        },
        option_price_adjustments: {
            "Count": { "180 Softgels": 18.00 }
        },
        option_shipping_adjustments: {},
        weight: { value: 0.4, unit: 'lb' }, // 90 softgels
        dimensions: { length: 3, width: 3, height: 5, unit: 'in' },
        option_dimension_overrides: {
            "Count": {
                "180 Softgels": { weight: { value: 0.7, unit: 'lb' }, dimensions: { length: 3.5, width: 3.5, height: 6, unit: 'in' } }
            }
        },
        categories: [103],
        upselling: [5007, 5009],
        crossSelling: [],
        relatedProducts: [],
        createdAt: "2025-04-06T16:00:00Z",
        updatedAt: "2025-04-17T11:40:00Z"
    },

    // Product 9: Vitamin D3
    {
        id: 5009,
        name: "Vitamin D3 5000 IU",
        description: "High-potency Vitamin D3 supplement to support bone health, immune function, and mood. Easy-to-swallow softgels.",
        base_price: 14.99, // Base for 120 softgels
        base_shipping_cost: 3.49,
        free_shipping: true,
        sku: "VIT-VD3-001",
        slug: "vitamin-d3-5000-iu",
        brand: "Sunshine Caps",
        rating: 4.9,
        reviews_count: 720,
        status: "active",
        isFeatured: false,
        isOnSale: false,
        requiresShipping: true,
        requiresInventoryTracking: true,
        stock: 0,
        hasVariants: true,
        totalVariantStock: 800,
        lowStockThreshold: 40,
        features: {
            potency: "5000 IU per Softgel",
            keyBenefits: "Bone Health, Immune Support",
            form: "Softgels"
        },
        images: [
            "https://images.unsplash.com/photo-1628102491629-5a14743c4ab0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Vitamin D bottle/softgels
            "https://images.unsplash.com/photo-1604935020889-9489f7e14a1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" // Sun/light concept
        ],
        options: {
            "Count": ["120 Softgels", "240 Softgels"]
        },
        option_images: {},
        variant_images: {},
        option_variants_stock: {
            "120 Softgels": 450,
            "240 Softgels": 350
        },
        option_price_adjustments: {
            "Count": { "240 Softgels": 10.00 }
        },
        option_shipping_adjustments: {},
        weight: { value: 0.25, unit: 'lb' }, // 120 softgels
        dimensions: { length: 2.5, width: 2.5, height: 4.5, unit: 'in' },
        option_dimension_overrides: {
            "Count": {
                "240 Softgels": { weight: { value: 0.4, unit: 'lb' }, dimensions: { length: 3, width: 3, height: 5, unit: 'in' } }
            }
        },
        categories: [103],
        upselling: [5007, 5008],
        crossSelling: [],
        relatedProducts: [],
        createdAt: "2025-04-07T09:30:00Z",
        updatedAt: "2025-04-17T11:45:00Z"
    },

    // Product 10: BCAA/EAA Blend
    {
        id: 5010,
        name: "Amino Recovery EAA+BCAA",
        description: "Complete Essential Amino Acid (EAA) and Branched-Chain Amino Acid (BCAA) blend to fuel muscle recovery, reduce soreness, and support hydration.",
        base_price: 34.99,
        base_shipping_cost: 5.99,
        free_shipping: false,
        sku: "REC-AMI-001",
        slug: "amino-recovery-eaa-bcaa",
        brand: "Rebuild Pro",
        rating: 4.7,
        reviews_count: 490,
        status: "active",
        isFeatured: false,
        isOnSale: false,
        requiresShipping: true,
        requiresInventoryTracking: true,
        stock: 0,
        hasVariants: true,
        totalVariantStock: 400,
        lowStockThreshold: 20,
        features: {
            eaaPerServing: "8g",
            bcaaRatio: "2:1:1",
            electrolytes: "Yes (Sodium, Potassium)",
            useCase: "Intra/Post-Workout"
        },
        images: [
            "https://images.unsplash.com/photo-1605296867424-35fc25c9212a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Person drinking supplement
            "https://images.unsplash.com/photo-1625978842719-9a1901f7b6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Amino powder tub
            "https://images.unsplash.com/photo-1584863431194-c7950e5d3c38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" // Brightly colored drink
        ],
        options: {
            "Flavor": ["Tropical Punch", "Lemon Lime Twist", "Grape Glacier"]
        },
        option_images: {},
        variant_images: {},
        option_variants_stock: {
            "Tropical Punch": 150,
            "Lemon Lime Twist": 130,
            "Grape Glacier": 120
        },
        option_price_adjustments: {},
        option_shipping_adjustments: {},
        weight: { value: 0.9, unit: 'lb' },
        dimensions: { length: 5, width: 5, height: 6, unit: 'in' },
        option_dimension_overrides: {},
        categories: [101], // Could also be 102, placing in protein/recovery
        upselling: [5001, 5006], // Suggest Whey, Creatine
        crossSelling: [5004], // Suggest Pre-Workout
        relatedProducts: [5005],
        createdAt: "2025-04-15T13:00:00Z",
        updatedAt: "2025-04-17T11:50:00Z"
    }
];
