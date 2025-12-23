import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Gift, CheckCircle, Trophy, UserCheck, Utensils, ChevronRight, Search, ShoppingCart, X } from 'lucide-react';
import menuData from '@/utils/menu.json';

export default function PicnicRegistration() {
    const [formData, setFormData] = useState({
        amount: '',
        games: [],
        starters: [],
        mainDishes: []
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showFoodModal, setShowFoodModal] = useState(false);
    const [foodType, setFoodType] = useState(''); // 'starters' or 'mainDishes'

    const [registrants] = useState([
        { name: 'Adebayo Johnson', games: ['Ludo', 'Chess', 'Scrabble'] },
        { name: 'Chioma Okafor', games: ['Monopoly', 'Card games', 'Ludo'] },
        { name: 'Emmanuel Peters', games: ['Checkers', 'Chess', 'Ayo'] },
        { name: 'Blessing Adeleke', games: ['Scrabble', 'Jenga', 'Ludo'] },
        { name: 'David Oluwaseun', games: ['Card games', 'Monopoly', 'Snake and ladder'] },
        { name: 'Grace Okonkwo', games: ['Chess', 'Scrabble', 'Checkers'] },
        { name: 'Samuel Ajayi', games: ['Ayo', 'Ludo', 'Jenga'] },
        { name: 'Faith Nwosu', games: ['Monopoly', 'Card games', 'Chess'] },
        { name: 'Tunde Bakare', games: ['Ludo', 'Ayo', 'Checkers'] },
        { name: 'Ngozi Eze', games: ['Scrabble', 'Chess', 'Card games'] },
        { name: 'Peter Obi', games: ['Monopoly', 'Jenga', 'Snake and ladder'] },
        { name: 'Mary Adeleke', games: ['Ayo', 'Checkers', 'Ludo'] },
        { name: 'John Adewale', games: ['Chess', 'Scrabble', 'Monopoly'] },
        { name: 'Funmi Oladipo', games: ['Card games', 'Jenga', 'Ludo'] },
    ]);

    const games = [
        { name: 'Checkers', image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=400&h=300&fit=crop', emoji: '🔴' },
        { name: 'Card games', image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&fit=crop', emoji: '🃏' },
        { name: 'Ludo', image: 'https://images.unsplash.com/photo-1611371805429-8b5c1b2c34ba?w=400&h=300&fit=crop', emoji: '🎲' },
        { name: 'Monopoly', image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=300&fit=crop', emoji: '🏠' },
        { name: 'Scrabble', image: 'https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=400&h=300&fit=crop', emoji: '🔤' },
        { name: 'Chess', image: 'https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=400&h=300&fit=crop', emoji: '♟️' },
        { name: 'Jenga', image: 'https://images.unsplash.com/photo-1632501641679-f9dba8a8e3f5?w=400&h=300&fit=crop', emoji: '🧱' },
        { name: 'Snake and ladder', image: 'https://images.unsplash.com/photo-1611891487232-fb7709e79d9e?w=400&h=300&fit=crop', emoji: '🐍' },
        { name: 'Ayo', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop', emoji: '🪵' }
    ];

    const calculateMainDishesTotal = () => {
        return formData.mainDishes.reduce((total, item) => total + item.price, 0);
    };

    const canAddMoreMainDishes = () => {
        return calculateMainDishesTotal() < 20000;
    };

    const getRemainingBudget = () => {
        return 20000 - calculateMainDishesTotal();
    };

    const getMainDishSelectionNote = () => {
        const total = calculateMainDishesTotal();

        if (total === 0) {
            return {
                text: "No main course yet? Remember, man shall not live by bread alone... but you still need the bread! 🍞😄",
                emoji: "📖",
                color: "blue"
            };
        } else if (total <= 5000) {
            return {
                text: "Starting small like Jesus feeding the 5,000... except you're just feeding yourself! 😇",
                emoji: "🙏",
                color: "green"
            };
        } else if (total <= 8000) {
            return {
                text: "You're pacing yourself! Even the Israelites didn't rush through the manna! ⚖️",
                emoji: "🎯",
                color: "yellow"
            };
        } else if (total <= 12000) {
            return {
                text: "Getting serious now! Solomon's feast had nothing on what you're planning! 👑",
                emoji: "👨‍🍳",
                color: "yellow"
            };
        } else if (total <= 15000) {
            return {
                text: "Abundant blessings loading! Your selections are blessed and highly favored! 🙌✨",
                emoji: "⭐",
                color: "orange"
            };
        } else if (total <= 18000) {
            return {
                text: "Going BIG! This is giving Prodigal Son's welcome feast vibes! 🎉",
                emoji: "🎊",
                color: "orange"
            };
        } else if (total < 20000) {
            return {
                text: "Almost there! You're about to max out like Paul said 'I have learned the secret of being well fed!' 😂",
                emoji: "🔥",
                color: "red"
            };
        } else {
            return {
                text: "HALLELUJAH! You've reached the promised land of good food! Well planned! 🎺",
                emoji: "✅",
                color: "purple"
            };
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleGameToggle = (gameName) => {
        setFormData(prev => ({
            ...prev,
            games: prev.games.includes(gameName) ? prev.games.filter(g => g !== gameName) : [...prev.games, gameName]
        }));
    };

    const handleFoodItemToggle = (item, type) => {
        const key = type === 'starters' ? 'starters' : 'mainDishes';
        const isSelected = formData[key].some(food => food.name === item.name);

        if (isSelected) {
            // Remove item - this works both in modal and main form
            setFormData(prev => ({
                ...prev,
                [key]: prev[key].filter(food => food.name !== item.name)
            }));
        } else {
            // Add item
            if (type === 'starters') {
                // Only allow one starter - replace existing
                setFormData(prev => ({
                    ...prev,
                    starters: [item]
                }));
            } else {
                // Check budget for main dishes
                const newTotal = calculateMainDishesTotal() + item.price;
                if (newTotal > 20000) {
                    alert('This selection would exceed the available limit. Please choose a different item or remove some items first.');
                    return;
                }
                setFormData(prev => ({
                    ...prev,
                    [key]: [...prev[key], item]
                }));
            }
        }
    };

    const openFoodModal = (type) => {
        setFoodType(type);
        setShowFoodModal(true);
        setSelectedCategory(null);
        setSearchTerm('');
    };

    const closeFoodModal = () => {
        setShowFoodModal(false);
        setSelectedCategory(null);
        setSearchTerm('');
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
    };

    const getPlayersByGame = () => {
        const gameGroups = {};
        formData.games.forEach(selectedGame => {
            const players = registrants.filter(person => person.games.includes(selectedGame)).map(person => person.name);
            if (players.length > 0) {
                gameGroups[selectedGame] = players;
            }
        });
        return gameGroups;
    };

    const getFilteredItems = () => {
        const dataSource = foodType === 'starters' ? menuData.starters : menuData.main_dishes;

        if (selectedCategory) {
            const category = dataSource.find(cat => cat.category === selectedCategory);
            const items = category?.items || [];

            if (searchTerm) {
                return items.filter(item =>
                    item.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }
            return items;
        }

        return [];
    };

    const isItemSelected = (item) => {
        const key = foodType === 'starters' ? 'starters' : 'mainDishes';
        return formData[key].some(food => food.name === item.name);
    };

    const FoodSelectionModal = () => {
        const dataSource = foodType === 'starters' ? menuData.starters : menuData.main_dishes;
        const filteredItems = getFilteredItems();

        return (
            <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className="rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold">
                                {foodType === 'starters' ? '🍴 Select Your Starter' : '🍽️ Select Main Dishes'}
                            </h2>
                            <button onClick={closeFoodModal} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        {foodType === 'starters' && (
                            <p className="text-white/90 text-sm mt-2">Choose one appetizer to start your meal</p>
                        )}
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                        {!selectedCategory ? (
                            // Category Selection View
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Choose a Category</h3>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {dataSource.map((category) => (
                                        <button
                                            key={category.category}
                                            onClick={() => setSelectedCategory(category.category)}
                                            className="bg-gradient-to-br from-gray-50 to-gray-100 hover:from-orange-50 hover:to-red-50 border-2 border-gray-200 hover:border-orange-400 rounded-xl p-6 text-left transition-all duration-200 group"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="font-bold text-gray-800 mb-1">{category.category}</h4>
                                                    <p className="text-sm text-gray-600">{category.items.length} items</p>
                                                </div>
                                                <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-orange-500 transition-colors" />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            // Items View
                            <div>
                                <div className="flex items-center gap-4 mb-6">
                                    <button
                                        onClick={() => setSelectedCategory(null)}
                                        className="text-sm text-gray-600 hover:text-gray-800 flex items-center"
                                    >
                                        ← Back to Categories
                                    </button>
                                    <h3 className="text-xl font-bold text-gray-800">{selectedCategory}</h3>
                                </div>

                                {/* Search Bar */}
                                <div className="mb-6">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            placeholder="Search items..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Items Grid */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    {filteredItems.length > 0 ? (
                                        filteredItems.map((item) => {
                                            const selected = isItemSelected(item);
                                            // Allow clicking on selected items to deselect them
                                            const canAdd = foodType === 'starters'
                                                ? (formData.starters.length === 0 || selected)
                                                : (calculateMainDishesTotal() + item.price <= 20000 || selected);

                                            return (
                                                <button
                                                    key={item.name}
                                                    onClick={() => handleFoodItemToggle(item, foodType)}
                                                    disabled={!selected && !canAdd}
                                                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left relative ${selected
                                                        ? 'bg-gradient-to-br from-orange-500 to-red-500 text-white border-transparent shadow-lg cursor-pointer'
                                                        : canAdd
                                                            ? 'bg-white border-gray-200 hover:border-orange-400 hover:shadow-md'
                                                            : 'bg-gray-100 border-gray-200 opacity-60 cursor-not-allowed'
                                                        }`}
                                                >
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <h4 className={`font-semibold mb-1 ${selected ? 'text-white' : 'text-gray-800'}`}>
                                                                {item.name}
                                                            </h4>
                                                            <p className={`text-sm font-bold ${selected ? 'text-white' : 'text-orange-600'}`}>
                                                                ₦{item.price.toLocaleString()}
                                                            </p>
                                                            {!selected && !canAdd && (
                                                                <p className="text-xs text-gray-500 mt-1">
                                                                    {foodType === 'starters'
                                                                        ? 'Remove your current starter first'
                                                                        : 'Would exceed selection limit'}
                                                                </p>
                                                            )}
                                                        </div>
                                                        {selected && (
                                                            <CheckCircle className="w-6 h-6 text-white flex-shrink-0" />
                                                        )}
                                                    </div>
                                                </button>
                                            );
                                        })
                                    ) : (
                                        <div className="col-span-2 text-center py-12 text-gray-500">
                                            No items found matching "{searchTerm}"
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-200 p-6 bg-gray-50">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">
                                    {foodType === 'starters' ? 'Selected Starter' : 'Selected Items'}
                                </p>
                                <p className="text-xl font-bold text-gray-800">
                                    {foodType === 'starters'
                                        ? (formData.starters.length > 0 ? '1 item' : 'None')
                                        : `${formData.mainDishes.length} items`}
                                </p>
                            </div>
                            <button
                                onClick={closeFoodModal}
                                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    if (isSubmitted) {
        const playersByGame = getPlayersByGame();
        const note = getMainDishSelectionNote();

        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-12 h-12 text-green-600" />
                            </div>

                            <h2 className="text-3xl font-bold text-gray-800 mb-4">Registration Successful!</h2>
                            <p className="text-gray-600 mb-8">
                                We're excited to see you at the GCCC Picnic! Check your confirmation details below.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-6">
                                <h3 className="text-lg font-semibold mb-4 flex items-center">
                                    <MapPin className="w-5 h-5 mr-2" />
                                    Event Location
                                </h3>
                                <p className="text-lg mb-1">GCCC Church Grounds</p>
                                <p className="text-blue-100 text-sm">Ibadan, Oyo State</p>
                            </div>

                            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                                    <UserCheck className="w-5 h-5 mr-2" />
                                    Seat Reservation
                                </h3>
                                <p className="text-2xl font-bold text-yellow-600 mb-1">
                                    Section B - #{Math.floor(Math.random() * 100) + 1}
                                </p>
                                <p className="text-xs text-gray-600">Arrive 15 minutes early</p>
                            </div>
                        </div>

                        {(formData.starters.length > 0 || formData.mainDishes.length > 0) && (
                            <div className="bg-orange-50 rounded-xl p-6 mb-8">
                                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                    <Utensils className="w-6 h-6 mr-2 text-orange-600" />
                                    Your Food Preferences
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {formData.starters.length > 0 && (
                                        <div>
                                            <p className="text-sm font-semibold text-gray-700 mb-2">Starter:</p>
                                            <div className="space-y-1">
                                                {formData.starters.map((item) => (
                                                    <p key={item.name} className="text-sm text-gray-600">• {item.name} <span className="text-orange-600 font-semibold">(₦{item.price.toLocaleString()})</span></p>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {formData.mainDishes.length > 0 && (
                                        <div>
                                            <p className="text-sm font-semibold text-gray-700 mb-2">Main Dishes:</p>
                                            <div className="space-y-1">
                                                {formData.mainDishes.map((item) => (
                                                    <p key={item.name} className="text-sm text-gray-600">• {item.name} <span className="text-orange-600 font-semibold">(₦{item.price.toLocaleString()})</span></p>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {Object.keys(playersByGame).length > 0 && (
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-8">
                                <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                                    <Trophy className="w-6 h-6 mr-2 text-green-600" />
                                    Your Games & Fellow Players
                                </h3>
                                <p className="text-sm text-gray-600 mb-6">
                                    Connect with these members who selected the same games as you!
                                </p>

                                <div className="space-y-6">
                                    {Object.entries(playersByGame).map(([gameName, players]) => {
                                        const game = games.find(g => g.name === gameName);
                                        return (
                                            <div key={gameName} className="bg-white rounded-lg p-5 shadow-sm border-2 border-green-100">
                                                <div className="flex items-center mb-3 pb-3 border-b border-gray-200">
                                                    <span className="text-3xl mr-3">{game?.emoji}</span>
                                                    <h4 className="text-lg font-bold text-gray-800">{gameName}</h4>
                                                    <span className="ml-auto bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                                                        {players.length} {players.length === 1 ? 'Player' : 'Players'}
                                                    </span>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {players.map((playerName, idx) => (
                                                        <span key={idx} className="bg-gray-50 text-gray-700 px-3 py-1 rounded-full text-sm font-medium border border-gray-200">
                                                            {playerName}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        <div className="flex gap-4">
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                            >
                                Register Another Person
                            </button>
                            <button
                                onClick={() => window.print()}
                                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300"
                            >
                                Print Confirmation
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const mainNote = getMainDishSelectionNote();

    return (
        <div className="min-h-screen  py-12 px-4">
            {showFoodModal && <FoodSelectionModal />}

            <div className="max-w-4xl mx-auto mt-20">
                <div className="text-center mb-10 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-10 rounded-xl">
                    <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4">
                        UPCOMING EVENT
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        GCCC Annual Picnic 2025
                    </h1>
                    {/* <p className="text-2xl font-semibold text-purple-600 mb-4">Taste and See</p> */}
                    <div className="max-w-2xl mx-auto space-y-3 mb-6">
                        <div>
                            <p className="text-lg text-gray-700 italic">
                                Taste and see that the Lord is good; blessed is the one who takes refuge in him.
                            </p>
                            <p className="text-sm text-gray-500">- Psalm 34:8</p>
                        </div>
                        <div>
                            <p className="text-lg text-gray-700 italic">
                                This is the day the Lord has made; let us rejoice and be glad in it.
                            </p>
                            <p className="text-sm text-gray-500">- Psalm 118:24</p>
                        </div>
                    </div>
                    <div className="inline-block bg-red-50 border-2 border-red-200 px-4 py-2 rounded-lg">
                        <p className="text-sm font-bold text-red-700">⚠️ ADMITTANCE IS STRICTLY BY REGISTRATION</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="flex items-center justify-center md:justify-start">
                            <div className="bg-blue-100 p-3 rounded-lg mr-4">
                                <Calendar className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Date</p>
                                <p className="font-semibold text-gray-800">Dec 28, 2025</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-center md:justify-start">
                            <div className="bg-purple-100 p-3 rounded-lg mr-4">
                                <Clock className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Time</p>
                                <p className="font-semibold text-gray-800">3:00 PM</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-center md:justify-start">
                            <div className="bg-green-100 p-3 rounded-lg mr-4">
                                <Users className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Fellowship</p>
                                <p className="font-semibold text-gray-800">All Welcome</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Join us for a day of fellowship, fun, and food as we celebrate God's goodness together.
                            Come with your family and friends for an afternoon filled with games, laughter, and
                            meaningful connections. Let us gather in unity and joy, strengthening our bonds as a church family.
                        </p>
                        <div className="bg-white rounded-lg p-4 border-2 border-dashed border-purple-300">
                            <p className="text-sm font-bold text-purple-700 mb-2">👔 DRESS CODE 👗</p>
                            <p className="text-gray-700 text-sm">
                                <span className="font-semibold">Dress well and smell HEAVENLY!</span> 😇✨
                            </p>
                            <p className="text-gray-600 text-xs mt-2 italic">
                                We want angels to be confused about whether they're in heaven or at GCCC picnic.
                                No I just woke up looks please - even your outfit should be giving testimony! 🙏😄
                            </p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Register Now</h2>

                        <div className="space-y-5 mb-8">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Gift className="w-4 h-4 inline mr-1" />
                                    Support Amount (Optional)
                                </label>
                                <input
                                    type="number"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                                    placeholder="₦ Enter amount"
                                />
                                <p className="text-xs text-gray-500 mt-1">Your contribution helps us organize this wonderful event</p>
                            </div>
                        </div>

                        <div className="mb-8">
                            <label className="block text-sm font-medium text-gray-700 mb-3">Select Games You'd Like to Participate In</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {games.map((game) => (
                                    <button
                                        key={game.name}
                                        type="button"
                                        onClick={() => handleGameToggle(game.name)}
                                        className={`relative overflow-hidden rounded-xl border-3 transition-all duration-300 ${formData.games.includes(game.name) ? 'border-blue-600 shadow-lg ring-2 ring-blue-300' : 'border-gray-200 hover:border-blue-300'
                                            }`}
                                    >
                                        <div className="relative h-32">
                                            <img src={game.image} alt={game.name} className="w-full h-full object-cover" />
                                            <div className={`absolute inset-0 transition-all duration-300 ${formData.games.includes(game.name) ? 'bg-gradient-to-t from-blue-900/90 to-blue-600/40' : 'bg-gradient-to-t from-gray-900/70 to-transparent'
                                                }`} />

                                            {formData.games.includes(game.name) && (
                                                <div className="absolute top-2 right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                                                    <CheckCircle className="w-5 h-5 text-white" />
                                                </div>
                                            )}

                                            <div className="absolute bottom-0 left-0 right-0 p-3">
                                                <p className="text-white font-semibold text-sm flex items-center">
                                                    <span className="text-2xl mr-2">{game.emoji}</span>
                                                    {game.name}
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                            <p className="text-xs text-gray-500 mt-2">Select one or more games to find your teammates and competitors!</p>
                        </div>

                        {/* Food Selection Section */}
                        <div className="mb-8 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    <Utensils className="w-4 h-4 inline mr-1" />
                                    Select Your Food Preferences (Optional)
                                </label>

                                {/* Starters Selection */}
                                <div className="mb-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="font-semibold text-gray-800">Starters / Appetizers</h3>
                                        <button
                                            onClick={() => openFoodModal('starters')}
                                            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                                        >
                                            <ShoppingCart className="w-4 h-4" />
                                            Browse Starters
                                        </button>
                                    </div>

                                    {formData.starters.length > 0 ? (
                                        <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <p className="text-sm font-semibold text-gray-700">Your Starter Selection</p>
                                                <button
                                                    onClick={() => setFormData(prev => ({ ...prev, starters: [] }))}
                                                    className="text-xs text-red-600 hover:text-red-700 font-medium"
                                                >
                                                    Clear
                                                </button>
                                            </div>
                                            <div className="space-y-2">
                                                {formData.starters.map((item) => (
                                                    <div key={item.name} className="flex items-center justify-between bg-white rounded-lg p-3 border border-orange-200">
                                                        <span className="text-sm text-gray-700">{item.name}</span>
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-sm font-semibold text-orange-600">₦{item.price.toLocaleString()}</span>
                                                            <button
                                                                onClick={() => handleFoodItemToggle(item, 'starters')}
                                                                className="text-red-500 hover:text-red-600"
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                            <p className="text-gray-500 text-sm">No starter selected yet. Pick one appetizer to start your meal! 🍴</p>
                                        </div>
                                    )}
                                </div>

                                {/* Main Dishes Selection */}
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="font-semibold text-gray-800">Main Dishes</h3>
                                        <button
                                            onClick={() => openFoodModal('mainDishes')}
                                            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                                        >
                                            <ShoppingCart className="w-4 h-4" />
                                            Browse Main Dishes
                                        </button>
                                    </div>

                                    {formData.mainDishes.length > 0 ? (
                                        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <p className="text-sm font-semibold text-gray-700">Selected Main Dishes ({formData.mainDishes.length})</p>
                                                <button
                                                    onClick={() => setFormData(prev => ({ ...prev, mainDishes: [] }))}
                                                    className="text-xs text-red-600 hover:text-red-700 font-medium"
                                                >
                                                    Clear All
                                                </button>
                                            </div>
                                            <div className="space-y-2">
                                                {formData.mainDishes.map((item) => (
                                                    <div key={item.name} className="flex items-center justify-between bg-white rounded-lg p-3 border border-blue-200">
                                                        <span className="text-sm text-gray-700">{item.name}</span>
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-sm font-semibold text-blue-600">₦{item.price.toLocaleString()}</span>
                                                            <button
                                                                onClick={() => handleFoodItemToggle(item, 'mainDishes')}
                                                                className="text-red-500 hover:text-red-600"
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                            <p className="text-gray-500 text-sm">No main dishes selected yet. Browse to build your meal! 🍽️</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {formData.mainDishes.length > 0 && (
                                <div className={`bg-gradient-to-r ${mainNote.color === 'blue' ? 'from-blue-50 to-cyan-50 border-blue-200' :
                                    mainNote.color === 'green' ? 'from-green-50 to-emerald-50 border-green-200' :
                                        mainNote.color === 'yellow' ? 'from-yellow-50 to-orange-50 border-yellow-200' :
                                            mainNote.color === 'orange' ? 'from-orange-50 to-red-50 border-orange-200' :
                                                'from-purple-50 to-pink-50 border-purple-200'
                                    } border-2 rounded-lg p-4`}>
                                    <p className="text-sm font-semibold text-gray-800 flex items-center">
                                        <span className="text-2xl mr-2">{mainNote.emoji}</span>
                                        {mainNote.text}
                                    </p>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300"
                        >
                            Complete Registration
                        </button>
                    </div>
                </div>

                <div className="text-center text-gray-500 text-sm">
                    <p>Questions? Contact us at info@gcccibadan.org</p>
                </div>
            </div>
        </div>
    );
}