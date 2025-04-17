const CATEGORIES = [
    {
        id: 101,
        name: 'Proteins',
        slug: 'proteins',
        description: 'High-quality protein powders for muscle growth and recovery, including whey, casein, and plant-based options.',
        imageUrl: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // Protein tub image
        featured: true,
        parent_id: null,
        active: true,
        display_order: 10,
        productIds: [5001, 5002, 5003, 5010], // Corresponds to Whey, Casein, Vegan Protein, Amino Recovery
        created_at: '2025-04-17T10:00:00Z',
        updated_at: '2025-04-17T10:00:00Z'
    },
    {
        id: 102,
        name: 'Pre-Workouts & Performance',
        slug: 'pre-workouts-performance',
        description: 'Boost your energy, focus, and endurance for intense training sessions. Includes stimulant and stimulant-free options, plus performance staples like creatine.',
        imageUrl: 'https://images.unsplash.com/photo-1594737625781-9a17feb5b8a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // Gym/energy related image
        featured: true,
        parent_id: null,
        active: true,
        display_order: 20,
        productIds: [5004, 5005, 5006], // Corresponds to Ignite Pre-Workout, Pump Focus, Creatine
        created_at: '2025-04-17T10:05:00Z',
        updated_at: '2025-04-17T10:05:00Z'
    },
    {
        id: 103,
        name: 'Vitamins & Wellness',
        slug: 'vitamins-wellness',
        description: 'Essential vitamins, minerals, and wellness supplements to support overall health, immunity, and recovery.',
        imageUrl: 'https://images.unsplash.com/photo-1607619056574-7484ec7f0738?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // Vitamin bottles image
        featured: false,
        parent_id: null,
        active: true,
        display_order: 30,
        productIds: [5007, 5008, 5009], // Corresponds to Multivitamin, Omega-3, Vitamin D3
        created_at: '2025-04-17T10:10:00Z',
        updated_at: '2025-04-17T10:10:00Z'
    }
];
