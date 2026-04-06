// Top categories data
export const topCategories = [
  { id: 1, name: 'Bestseller', icon: '⭐' },
  { id: 2, name: 'New releases', icon: '🚀' },
  { id: 3, name: 'Deals', icon: '🏷️' },
  { id: 4, name: 'Hindi books', icon: '📚' },
  { id: 5, name: 'Kids books', icon: '👶' },
  { id: 6, name: 'Comics', icon: '🎨' },
  { id: 7, name: 'Exam prep', icon: '📝' },
  { id: 8, name: 'Literature', icon: '📖' },
  { id: 9, name: 'Self help', icon: '💪' },
];

// Sidebar filters
export const categoryFilters = [
  { id: 'books', label: 'Books', count: 125000 },
  { id: 'literature', label: 'Literature & Fiction', count: 45000 },
  { id: 'religion', label: 'Religion & Spirituality', count: 28000 },
  { id: 'exam', label: 'Exam Preparation', count: 32000 },
  { id: 'children', label: "Children's Books", count: 18000 },
  { id: 'comics', label: 'Comics', count: 8500 },
  { id: 'business', label: 'Business & Economics', count: 22000 },
];

export const authorFilters = [
  { id: 'chetan-bhagat', label: 'Chetan Bhagat' },
  { id: 'amish-tripathi', label: 'Amish Tripathi' },
  { id: 'durjoy-datta', label: 'Durjoy Datta' },
  { id: 'ravinder-singh', label: 'Ravinder Singh' },
  { id: 'puneet-bhasin', label: 'Puneet Bhasin' },
  { id: 'arihant', label: 'Arihant Experts' },
];

export const languageFilters = [
  { id: 'english', label: 'English', count: 85000 },
  { id: 'hindi', label: 'Hindi', count: 35000 },
  { id: 'tamil', label: 'Tamil', count: 12000 },
  { id: 'telugu', label: 'Telugu', count: 8000 },
  { id: 'marathi', label: 'Marathi', count: 6500 },
];

export const priceFilters = [
  { id: 'under-99', label: 'Under ₹99', min: 0, max: 99 },
  { id: '100-299', label: '₹100 - ₹299', min: 100, max: 299 },
  { id: '300-499', label: '₹300 - ₹499', min: 300, max: 499 },
  { id: '500-999', label: '₹500 - ₹999', min: 500, max: 999 },
  { id: 'above-1000', label: 'Above ₹1000', min: 1000, max: null },
];

export const discountFilters = [
  { id: '10-off', label: '10% Off or more' },
  { id: '25-off', label: '25% Off or more' },
  { id: '35-off', label: '35% Off or more' },
  { id: '50-off', label: '50% Off or more' },
];

export const formatFilters = [
  { id: 'paperback', label: 'Paperback' },
  { id: 'hardcover', label: 'Hardcover' },
  { id: 'kindle', label: 'Kindle' },
  { id: 'audiobook', label: 'Audiobook' },
];

// Author of the month
export const authorOfMonth = {
  name: 'Chetan Bhagat',
  description: 'India\'s Most Loved Author',
  image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
  background: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
  featuredBook: {
    title: 'One Indian Girl',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=150&h=200&fit=crop',
    price: 199,
    originalPrice: 399,
    discount: 50,
  },
};

// Genre grid
export const genres = [
  { id: 'romance', name: 'Romance', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=150&h=150&fit=crop' },
  { id: 'literature', name: 'Literature & Fiction', image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=150&h=150&fit=crop' },
  { id: 'mystery', name: 'Mystery & Thriller', image: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=150&h=150&fit=crop' },
  { id: 'selfhelp', name: 'Self Help', image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=150&h=150&fit=crop' },
  { id: 'biographies', name: 'Biographies', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=150&h=150&fit=crop' },
  { id: 'religion', name: 'Religion', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop' },
  { id: 'history', name: 'History', image: 'https://images.unsplash.com/photo-1461360370896-922624d12a74?w=150&h=150&fit=crop' },
  { id: 'comics', name: 'Comics', image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=150&h=150&fit=crop' },
  { id: 'fantasy', name: 'Fantasy', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=150&h=150&fit=crop' },
  { id: 'science', name: 'Science', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=150&h=150&fit=crop' },
  { id: 'horror', name: 'Horror', image: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=150&h=150&fit=crop' },
  { id: 'children', name: "Children's Books", image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=150&h=150&fit=crop' },
];

// Exam books
export const examBooks = {
  title: 'Essential Govt Exam Books',
  subtitle: 'Up to 40% off',
  categories: [
    { name: 'UPSC', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=200&h=200&fit=crop', count: '2,500+ books' },
    { name: 'SSC', image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=200&h=200&fit=crop', count: '3,200+ books' },
    { name: 'Banking', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=200&fit=crop', count: '1,800+ books' },
    { name: 'TGT/PGT', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=200&h=200&fit=crop', count: '1,200+ books' },
  ],
};

// Deal boxes
export const dealBoxes = [
  { title: 'Up to 50% Off', subtitle: 'Fiction Books', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=200&fit=crop', color: 'from-orange-400 to-red-500' },
  { title: 'Exam Prep', subtitle: 'Top Sellers', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=200&h=200&fit=crop', color: 'from-blue-400 to-blue-600' },
  { title: 'School Books', subtitle: 'All Classes', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=200&h=200&fit=crop', color: 'from-green-400 to-green-600' },
  { title: 'Comic Books', subtitle: 'Marvel & DC', image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=200&h=200&fit=crop', color: 'from-purple-400 to-purple-600' },
  { title: 'Kids Books', subtitle: 'Age 3-12', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=200&fit=crop', color: 'from-pink-400 to-pink-600' },
];

// Book products
export const bookProducts = [
  {
    id: 1,
    title: 'The Girl Who Lives With Bears: A Gripping Thriller (English, Paperback, Javed)',
    author: 'Javed',
    rating: 4.2,
    reviews: 856,
    price: 249,
    originalPrice: 599,
    discount: 58,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=280&fit=crop',
    isPrime: true,
  },
  {
    id: 2,
    title: 'The Psychology of Money: Timeless lessons on wealth',
    author: 'Morgan Housel',
    rating: 4.5,
    reviews: 12453,
    price: 399,
    originalPrice: 799,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=200&h=280&fit=crop',
    isPrime: true,
  },
  {
    id: 3,
    title: 'Atomic Habits: An Easy & Proven Way to Build Good Habits',
    author: 'James Clear',
    rating: 4.7,
    reviews: 28945,
    price: 449,
    originalPrice: 899,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=200&h=280&fit=crop',
    isPrime: true,
  },
  {
    id: 4,
    title: 'Ikigai: The Japanese Secret to a Long and Happy Life',
    author: 'Héctor García',
    rating: 4.4,
    reviews: 15678,
    price: 299,
    originalPrice: 550,
    discount: 45,
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200&h=280&fit=crop',
    isPrime: false,
  },
  {
    id: 5,
    title: 'The Power of Now: A Guide to Spiritual Enlightenment',
    author: 'Eckhart Tolle',
    rating: 4.3,
    reviews: 9876,
    price: 349,
    originalPrice: 699,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=200&h=280&fit=crop',
    isPrime: true,
  },
  {
    id: 6,
    title: 'Rich Dad Poor Dad: What the Rich Teach Their Kids',
    author: 'Robert Kiyosaki',
    rating: 4.6,
    reviews: 45021,
    price: 399,
    originalPrice: 799,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=280&fit=crop',
    isPrime: true,
  },
  {
    id: 7,
    title: 'Wings of Fire: An Autobiography of APJ Abdul Kalam',
    author: 'A.P.J. Abdul Kalam',
    rating: 4.8,
    reviews: 67890,
    price: 199,
    originalPrice: 450,
    discount: 55,
    image: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=200&h=280&fit=crop',
    isPrime: true,
  },
  {
    id: 8,
    title: 'The Alchemist: A Fable About Following Your Dream',
    author: 'Paulo Coelho',
    rating: 4.7,
    reviews: 89234,
    price: 299,
    originalPrice: 599,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200&h=280&fit=crop',
    isPrime: true,
  },
  {
    id: 9,
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    rating: 4.6,
    reviews: 34567,
    price: 549,
    originalPrice: 1099,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=200&h=280&fit=crop',
    isPrime: false,
  },
  {
    id: 10,
    title: 'Think and Grow Rich: The Classic Bestseller',
    author: 'Napoleon Hill',
    rating: 4.5,
    reviews: 23456,
    price: 249,
    originalPrice: 499,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b4173?w=200&h=280&fit=crop',
    isPrime: true,
  },
  {
    id: 11,
    title: 'The 5 AM Club: Own Your Morning',
    author: 'Robin Sharma',
    rating: 4.4,
    reviews: 18234,
    price: 399,
    originalPrice: 799,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=200&h=280&fit=crop',
    isPrime: true,
  },
  {
    id: 12,
    title: 'Do It Today: Overcome Laziness',
    author: 'Darius Foroux',
    rating: 4.3,
    reviews: 7654,
    price: 199,
    originalPrice: 399,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=280&fit=crop',
    isPrime: false,
  },
];

// Steal deals carousel books
export const stealDeals = [
  {
    id: 1,
    title: 'Harry Potter Complete Set',
    author: 'J.K. Rowling',
    rating: 4.8,
    reviews: 45678,
    price: 2499,
    originalPrice: 4999,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=200&h=280&fit=crop',
  },
  {
    id: 2,
    title: 'Game of Thrones Complete',
    author: 'George R.R. Martin',
    rating: 4.7,
    reviews: 23456,
    price: 1899,
    originalPrice: 3799,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200&h=280&fit=crop',
  },
  {
    id: 3,
    title: 'Murder Mystery Collection',
    author: 'Agatha Christie',
    rating: 4.6,
    reviews: 12345,
    price: 999,
    originalPrice: 1999,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=200&h=280&fit=crop',
  },
  {
    id: 4,
    title: 'Indian History Compendium',
    author: 'Spectrum',
    rating: 4.5,
    reviews: 8765,
    price: 449,
    originalPrice: 899,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1461360370896-922624d12a74?w=200&h=280&fit=crop',
  },
  {
    id: 5,
    title: 'Quantitative Aptitude',
    author: 'R.S. Aggarwal',
    rating: 4.4,
    reviews: 34567,
    price: 499,
    originalPrice: 999,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=200&h=280&fit=crop',
  },
  {
    id: 6,
    title: 'The Great Indian Novel',
    author: 'Shashi Tharoor',
    rating: 4.3,
    reviews: 5432,
    price: 299,
    originalPrice: 599,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=280&fit=crop',
  },
];

// Hot off the press
export const hotPress = [
  {
    id: 1,
    title: 'The Perfect Couple',
    author: 'Jackie Kabler',
    price: 399,
    originalPrice: 799,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200&h=280&fit=crop',
  },
  {
    id: 2,
    title: 'Rising Star',
    author: 'Pranav',
    price: 299,
    originalPrice: 599,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=200&h=280&fit=crop',
  },
  {
    id: 3,
    title: 'Business Legend',
    author: 'Ratan Tata',
    price: 449,
    originalPrice: 899,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=280&fit=crop',
  },
  {
    id: 4,
    title: 'Tech Future',
    author: 'Sanjay',
    price: 349,
    originalPrice: 699,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=200&h=280&fit=crop',
  },
];

// Children books
export const childrenBooks = [
  {
    id: 1,
    title: 'Grandma\'s Bag of Stories',
    author: 'Sudha Murty',
    price: 199,
    originalPrice: 399,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=280&fit=crop',
  },
  {
    id: 2,
    title: 'Pippi Longstocking',
    author: 'Astrid Lindgren',
    price: 249,
    originalPrice: 499,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=200&h=280&fit=crop',
  },
  {
    id: 3,
    title: 'The Magic Finger',
    author: 'Roald Dahl',
    price: 199,
    originalPrice: 399,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=280&fit=crop',
  },
  {
    id: 4,
    title: 'Chacha Chaudhary',
    author: 'Puneet Bhasin',
    price: 99,
    originalPrice: 199,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=200&h=280&fit=crop',
  },
  {
    id: 5,
    title: 'Motu Patlu',
    author: 'Niraj',
    price: 149,
    originalPrice: 299,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200&h=280&fit=crop',
  },
];

// Disha exam books
export const dishaBooks = [
  { id: 1, title: 'UPSC Complete Guide', price: 899, originalPrice: 1799, discount: 50, image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=200&h=280&fit=crop' },
  { id: 2, title: 'SSC CGL Tier 1', price: 599, originalPrice: 1199, discount: 50, image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b4173?w=200&h=280&fit=crop' },
  { id: 3, title: 'Bank PO Complete', price: 699, originalPrice: 1399, discount: 50, image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=280&fit=crop' },
  { id: 4, title: 'Railway RRB Guide', price: 499, originalPrice: 999, discount: 50, image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=200&h=280&fit=crop' },
];

// Price buckets
export const priceBuckets = [
  { id: 'under-99', label: 'Under ₹99', min: 0, max: 99 },
  { id: '100-299', label: '₹100-₹299', min: 100, max: 299 },
  { id: '300-499', label: '₹300-₹499', min: 300, max: 499 },
  { id: 'above-500', label: 'Above ₹500', min: 500, max: null },
];

