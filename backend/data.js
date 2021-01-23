import bcrypt from 'bcryptjs';

const data = {
    users:[
        {
            name: 'Oreoluwa',
            email: 'admin@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true,
        },
        {
            name: 'John',
            email: 'user@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false,
        },
    ],
    products: [{
        name: 'Navy Blue Shirt',
        category: 'Shirts',
        image: '/images/product-1.jpg',
        price: 120,
        countInStock: 10,
        brand: 'Candle',
        rating: 4.5,
        numReviews: 10,
        description: 'High quality product',


    },
    {
        name: 'Blue Pattern Shirt',
        category: 'Shirts',
        image: '/images/product-2.jpg',
        price: 100,
        countInStock: 12,
        brand: 'Custom',
        rating: 4.3,
        numReviews: 12,
        description: 'High quality product',


    },
    {
        name: 'Black Pattern Shirt',
        category: 'Shirts',
        image: '/images/product-3.jpg',
        price: 150,
        countInStock: 8,
        brand: 'Custom',
        rating: 4.9,
        numReviews: 17,
        description: 'High quality product',


    },
    {
        name: 'Black & Orange Shirt',
        category: 'Shirts',
        image: '/images/product-4.jpg',
        price: 120,
        countInStock: 0,
        brand: 'Leno',
        rating: 4.0,
        numReviews: 8,
        description: 'Medium quality product',


    },
    {
        name: 'White Dotted Shirt',
        category: 'Shirts',
        image: '/images/product-5.jpg',
        price: 78,
        countInStock: 26,
        brand: 'Custom',
        rating: 3.5,
        numReviews: 5,
        description: 'Low quality product',


    },
    {
        name: 'Multi-colored Shirt',
        category: 'Shirts',
        image: '/images/product-6.jpg',
        price: 180,
        countInStock: 5,
        brand: 'MICS',
        rating: 4.6,
        numReviews: 20,
        description: 'Limited edition, High quality product',


    },
    ],
};

export default data;