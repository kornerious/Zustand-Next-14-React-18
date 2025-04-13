const JSONBIN_API_KEY = process.env.NEXT_PUBLIC_JSONBIN_API_KEY || "";

const cars = [
    {
        id: 1,
        title: "Tesla Model S",
        price: 79990,
        image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg",
        category: "electric",
        description: "The Tesla Model S is a full-size electric sedan with exceptional performance and range. Features include Autopilot, premium interior, and up to 405 miles of range.",
        specs: {
            range: "405 miles",
            acceleration: "3.1s 0-60 mph",
            topSpeed: "155 mph",
            seating: "5 adults"
        }
    },
    {
        id: 2,
        title: "Porsche 911",
        price: 101200,
        image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg",
        category: "sports",
        description: "The iconic Porsche 911 combines timeless design with cutting-edge technology. Known for its exceptional handling and performance.",
        specs: {
            engine: "3.0L Twin-Turbo Flat-6",
            horsepower: "379 hp",
            acceleration: "4.0s 0-60 mph",
            topSpeed: "182 mph"
        }
    },
    {
        id: 3,
        title: "BMW M5",
        price: 103500,
        image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg",
        category: "luxury",
        description: "The BMW M5 combines luxury with high performance. Features a powerful V8 engine and advanced driving dynamics.",
        specs: {
            engine: "4.4L V8 Twin-Turbo",
            horsepower: "600 hp",
            acceleration: "3.2s 0-60 mph",
            topSpeed: "190 mph"
        }
    },
    {
        id: 4,
        title: "Mercedes-Benz E-Class",
        price: 54950,
        image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg",
        category: "luxury",
        description: "The Mercedes-Benz E-Class offers a perfect balance of luxury, technology, and performance.",
        specs: {
            engine: "2.0L Turbo Inline-4",
            horsepower: "255 hp",
            acceleration: "5.9s 0-60 mph",
            topSpeed: "130 mph"
        }
    },
    {
        id: 5,
        title: "Audi RS6",
        price: 109000,
        image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg",
        category: "performance",
        description: "The Audi RS6 combines wagon practicality with supercar performance.",
        specs: {
            engine: "4.0L V8 Twin-Turbo",
            horsepower: "591 hp",
            acceleration: "3.5s 0-60 mph",
            topSpeed: "190 mph"
        }
    }
];

const createBin = async () => {
    try {
        const response = await fetch('https://api.jsonbin.io/v3/b', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': JSONBIN_API_KEY
            },
            body: JSON.stringify({
                products: cars,
                orders: []
            })
        });

        if (!response.ok) {
            throw new Error('Failed to create JSONBin');
        }

        const data = await response.json();
        console.log('Successfully created JSONBin:', data);
        console.log('Bin ID:', data.metadata.id);
    } catch (error) {
        console.error('Error creating JSONBin:', error);
    }
};

createBin(); 