// import React, { useState, useEffect, useMemo } from 'react';
// import { Calendar, Clock, Users, Gift, CheckCircle, Trophy, Mail, Sparkles, Gamepad2, PartyPopper } from 'lucide-react';
// import { useCreatePicnicRegistration, useGetMyRegistration } from '@/queries/picnic.query';
// import { handleApiError } from '@/utils/helper';
// import Message from '@/components/common/Message';
// import PaymentInfoCard from '@/components/common/PaymentInfoCard';

// // Constants
// const GAMES_CONFIG = [
//     { name: 'Checkers', image: '/images/games/checkers.png', emoji: '🔴' },
//     { name: 'Card games', image: '/images/games/cardgames.png', emoji: '🃏' },
//     { name: 'Ludo', image: '/images/games/ludo.png', emoji: '🎲' },
//     { name: 'Monopoly', image: '/images/games/monopoly.png', emoji: '🏠' },
//     { name: 'Scrabble', image: '/images/games/scrabble.png', emoji: '🔤' },
//     { name: 'Chess', image: '/images/games/chess.png', emoji: '♟️' },
//     { name: 'Jenga', image: '/images/games/jenga.png', emoji: '🧱' },
//     { name: 'Snake and ladder', image: '/images/games/snakeandladder.png', emoji: '🐍' },
//     { name: 'Ayo', image: '/images/games/ayo.png', emoji: '🪵' }
// ];

// const EVENT_INFO = {
//     date: 'Dec 28, 2025',
//     time: '4:00 PM',
//     timeDetail: '4:00 PM Sharp',
//     fellowship: 'All Ages'
// };

// export default function PicnicRegistration() {
//     const { data: registrationData, isLoading, isError: fetchError, error: fetchErrorData } = useGetMyRegistration();
//     const { mutateAsync, isPending, isError: submitError, error: submitErrorData } = useCreatePicnicRegistration();

//     const [formData, setFormData] = useState({
//         games: [],
//         support_amount: '',
//         wantsToSupport: null
//     });

//     const [justSubmitted, setJustSubmitted] = useState(false);
//     const [showEditForm, setShowEditForm] = useState(false);

//     // Initialize form with existing registration data
//     useEffect(() => {
//         if (registrationData?.registered && registrationData?.registration) {
//             const reg = registrationData.registration;
//             setFormData({
//                 games: reg.games || [],
//                 support_amount: reg.support_amount ? String(reg.support_amount) : '',
//                 wantsToSupport: reg.support_amount > 0 ? true : null
//             });
//         }
//     }, [registrationData]);

//     // Check if already successfully registered
//     const existingRegistration = registrationData?.registered ? registrationData.registration : null;
//     const isUpdate = !!existingRegistration;

//     // Game selection joke based on count
//     const gameJoke = useMemo(() => {
//         const count = formData.games.length;
//         const jokes = [
//             { min: 0, max: 0, text: "Jesus said 'Come and play... I mean pray!' 😅 Select at least one game to continue!", emoji: "🎮", color: "red" },
//             { min: 1, max: 1, text: "One game? That's like bringing one fish to feed the 5,000. Bold choice! 🐟", emoji: "🎯", color: "blue" },
//             { min: 2, max: 2, text: "Two games! Like Noah's Ark - you're keeping it balanced! ⚖️😄", emoji: "🎲", color: "green" },
//             { min: 3, max: 3, text: "Three games! The Holy Trinity of fun! 🙏✨", emoji: "⭐", color: "purple" },
//             { min: 4, max: 4, text: "Four games! Like the four gospels, you're covering all the bases! 📖🎮", emoji: "🎪", color: "yellow" },
//             { min: 5, max: 5, text: "Five games! More choices than loaves and fishes! Someone's ready to multiply the fun! 🍞🐟", emoji: "🎊", color: "orange" },
//             { min: 6, max: 7, text: "6-7 games! God rested on the 7th day... but you're not planning to! 😂🎮", emoji: "🌟", color: "pink" },
//             { min: 8, max: 999, text: "8+ games?! You're not here to play, you're here to CONQUER! Joshua at Jericho vibes! 🎺💪", emoji: "🔥", color: "red" }
//         ];

//         return jokes.find(j => count >= j.min && count <= j.max) || jokes[0];
//     }, [formData.games.length]);

//     // Handlers
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleGameToggle = (gameName) => {
//         setFormData(prev => ({
//             ...prev,
//             games: prev.games.includes(gameName)
//                 ? prev.games.filter(g => g !== gameName)
//                 : [...prev.games, gameName]
//         }));
//     };

//     const handleSupportChoice = (choice) => {
//         setFormData(prev => ({
//             ...prev,
//             wantsToSupport: choice,
//             support_amount: choice ? prev.support_amount : ''
//         }));
//     };

//     const handleSubmit = async () => {
//         if (formData.games.length === 0) {
//             return;
//         }

//         try {
//             const payload = {
//                 games: formData.games,
//                 support_amount: formData.wantsToSupport && formData.support_amount
//                     ? parseFloat(formData.support_amount)
//                     : 0
//             };

//             const response = await mutateAsync(payload);

//             if (response) {
//                 setJustSubmitted(true);
//                 setShowEditForm(false);
//                 window.scrollTo({ top: 0, behavior: 'smooth' });
//             }
//         } catch (error) {
//             console.error('Registration error:', error);
//         }
//     };

//     // Get games details with players and coordinator status
//     const gamesDetails = useMemo(() => {
//         if (!existingRegistration?.games_details) return [];

//         // Filter to only show games user has selected
//         return existingRegistration.games_details.filter(detail =>
//             formData.games.includes(detail.game)
//         );
//     }, [existingRegistration, formData.games]);

//     // Loading state with proper skeleton
//     if (isLoading) {
//         return (
//             <div className="min-h-screen py-12 px-4">
//                 <div className="max-w-4xl my-24 space-y-5 mx-auto">
//                     {/* Hero Skeleton */}
//                     <div className="relative overflow-hidden">
//                         <div className="relative bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 rounded-3xl p-8 md:p-12 shadow-2xl animate-pulse">
//                             <div className="space-y-4">
//                                 <div className="h-6 w-48 bg-white/30 rounded-full"></div>
//                                 <div className="h-12 w-3/4 bg-white/40 rounded-lg"></div>
//                                 <div className="bg-white/20 rounded-2xl p-4 space-y-3">
//                                     <div className="h-4 bg-white/30 rounded w-full"></div>
//                                     <div className="h-4 bg-white/30 rounded w-2/3"></div>
//                                 </div>
//                                 <div className="grid grid-cols-3 gap-4 mt-4">
//                                     {[1, 2, 3].map(i => (
//                                         <div key={i} className="bg-white/20 rounded-xl p-3 h-20"></div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Form Skeleton */}
//                     <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 border-4 border-gray-100 animate-pulse">
//                         {/* Event Details Skeleton */}
//                         <div className="grid md:grid-cols-3 gap-6 mb-8">
//                             {[1, 2, 3].map(i => (
//                                 <div key={i} className="bg-gray-100 rounded-2xl p-4 h-24"></div>
//                             ))}
//                         </div>

//                         {/* Welcome Message Skeleton */}
//                         <div className="bg-gray-50 rounded-2xl p-5 mb-8 space-y-3">
//                             <div className="h-4 bg-gray-200 rounded w-full"></div>
//                             <div className="h-4 bg-gray-200 rounded w-5/6"></div>
//                             <div className="bg-gray-100 rounded-xl p-4 mt-3">
//                                 <div className="h-3 bg-gray-200 rounded w-3/4"></div>
//                                 <div className="h-3 bg-gray-200 rounded w-full mt-2"></div>
//                             </div>
//                         </div>

//                         {/* Title Skeleton */}
//                         <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-64 mb-6"></div>

//                         {/* Games Grid Skeleton */}
//                         <div className="mb-8">
//                             <div className="h-6 bg-gray-200 rounded w-48 mb-3"></div>
//                             <div className="h-3 bg-gray-100 rounded w-64 mb-4"></div>
//                             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                                 {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
//                                     <div key={i} className="bg-gray-100 rounded-2xl h-32 overflow-hidden">
//                                         <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300"></div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Support Section Skeleton */}
//                         <div className="bg-gray-50 rounded-2xl p-5 mb-8 space-y-4">
//                             <div className="h-6 bg-gray-200 rounded w-56"></div>
//                             <div className="h-3 bg-gray-100 rounded w-full"></div>
//                             <div className="flex gap-4">
//                                 <div className="flex-1 h-11 bg-gray-200 rounded-xl"></div>
//                                 <div className="flex-1 h-11 bg-gray-200 rounded-xl"></div>
//                             </div>
//                         </div>

//                         {/* Submit Button Skeleton */}
//                         <div className="h-14 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-2xl"></div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     // Success/Registration Complete View
//     if (existingRegistration && !showEditForm) {
//         return (
//             <div className="min-h-screen my-24 py-12 px-4">
//                 <div className="max-w-4xl mx-auto">
//                     {/* Success Message - Prominent Position */}
//                     {justSubmitted && (
//                         <div className="mb-6">
//                             <Message
//                                 variant="success"
//                                 message={isUpdate ? "Registration updated successfully! 🎉" : "Registration successful! You're all set for the picnic! 🎉"}
//                             />
//                         </div>
//                     )}

//                     <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-purple-200">
//                         {/* Success Header */}
//                         <div className="text-center mb-8">
//                             <div className="relative inline-block mb-4">
//                                 <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
//                                     <CheckCircle className="w-12 h-12 text-white" />
//                                 </div>
//                                 <div className="absolute -top-2 -right-2">
//                                     <Sparkles className="w-7 h-7 text-yellow-400 animate-pulse" />
//                                 </div>
//                             </div>

//                             <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
//                                 {isUpdate ? 'Registration Updated! 🎉' : 'Hallelujah! Registration Successful! 🎉'}
//                             </h2>
//                             <p className="text-gray-600 mb-2">
//                                 Your spot is secured in the kingdom of fun!
//                             </p>
//                             <p className="text-xs text-gray-500 italic">
//                                 "For where two or three gather in my name, there am I with them" - and we'll have way more than three! 😄
//                             </p>
//                         </div>

//                         {/* Congratulatory Message */}
//                         <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl p-5 mb-6">
//                             <div className="flex items-start gap-3">
//                                 <PartyPopper className="w-7 h-7 text-orange-500 flex-shrink-0 mt-1" />
//                                 <div>
//                                     <h3 className="text-lg font-bold text-gray-800 mb-2">
//                                         Congratulations! 🎊
//                                     </h3>
//                                     <p className="text-sm text-gray-700 leading-relaxed">
//                                         You're all set for an amazing day of fellowship, fun, and unforgettable memories!
//                                         Get ready to connect with your church family in a whole new way. The joy of the Lord is truly our strength -
//                                         and we're about to have a joyful time!
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>


//                         {/* Email Notification */}
//                         <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-2xl p-5 mb-6">
//                             <div className="flex items-start gap-3">
//                                 <Mail className="w-7 h-7 text-blue-600 flex-shrink-0 mt-1" />
//                                 <div>
//                                     <h3 className="text-base font-bold text-gray-800 mb-2">
//                                         Check Your Inbox! 📧
//                                     </h3>
//                                     <p className="text-sm text-gray-700 leading-relaxed">
//                                         Your official event ticket with the complete venue address and additional details will be sent to your email
//                                         <span className="font-semibold"> 48 hours before the event</span>. Please keep an eye on your inbox
//                                         (and spam folder, just in case the devil tries to hide it! 😉).
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Event Quick Info */}
//                         <div className="grid md:grid-cols-3 gap-4 mb-6">
//                             <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-4 text-center">
//                                 <Calendar className="w-6 h-6 mx-auto mb-2 text-blue-700" />
//                                 <p className="text-xs text-blue-800 font-medium mb-1">Date</p>
//                                 <p className="text-base font-bold text-blue-900">{EVENT_INFO.date}</p>
//                             </div>

//                             <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl p-4 text-center">
//                                 <Clock className="w-6 h-6 mx-auto mb-2 text-purple-700" />
//                                 <p className="text-xs text-purple-800 font-medium mb-1">Time</p>
//                                 <p className="text-base font-bold text-purple-900">{EVENT_INFO.timeDetail}</p>
//                             </div>

//                             <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-xl p-4 text-center">
//                                 <Users className="w-6 h-6 mx-auto mb-2 text-green-700" />
//                                 <p className="text-xs text-green-800 font-medium mb-1">Fellowship</p>
//                                 <p className="text-base font-bold text-green-900">{EVENT_INFO.fellowship}</p>
//                             </div>
//                         </div>

//                         {/* Games Section - Always show selected games */}

//                         {/* Coordinator Special Message */}
//                         {gamesDetails.some(d => d.is_coordinator) && (
//                             <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-400 rounded-2xl p-5 mb-6">
//                                 <div className="flex items-start gap-3">
//                                     <div className="text-3xl">👑</div>
//                                     <div>
//                                         <h3 className="text-lg font-bold text-amber-900 mb-2">
//                                             You're a Game Coordinator! 🎮
//                                         </h3>
//                                         <p className="text-sm text-amber-800 leading-relaxed mb-2">
//                                             As one of the first to register for{' '}
//                                             <span className="font-bold">
//                                                 {gamesDetails.filter(d => d.is_coordinator).map(d => d.game).join(', ')}
//                                             </span>
//                                             , you've been chosen as the game coordinator! Don't worry - we'll send you all the details and support you need.
//                                         </p>
//                                         <p className="text-xs text-amber-700 italic">
//                                             "For to everyone who has, more will be given" - Your early commitment is rewarded with leadership! 💪✨
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}


//                         <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-5 mb-6 border-2 border-green-200">
//                             <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
//                                 <Trophy className="w-6 h-6 mr-2 text-green-600" />
//                                 Your Game Line-Up 🎮
//                             </h3>
//                             <p className="text-xs text-gray-600 mb-4">
//                                 {gamesDetails.length > 0 && gamesDetails.some(d => d.players.length > 0)
//                                     ? "Connect with these fellow believers who'll be playing the same games! Iron sharpens iron... and apparently so does friendly competition! ⚔️"
//                                     : "These are the games you've selected. Player lists will be available soon!"}
//                             </p>

//                             <div className="space-y-4">
//                                 {gamesDetails.map((gameDetail) => {
//                                     const game = GAMES_CONFIG.find(g => g.name === gameDetail.game);

//                                     return (
//                                         <div key={gameDetail.game} className="bg-white rounded-xl p-4 shadow-md border-2 border-green-100">
//                                             <div className="flex items-center mb-3 pb-3 border-b-2 border-gray-100">
//                                                 <span className="text-3xl mr-2">{game?.emoji}</span>
//                                                 <div className="flex-1">
//                                                     <h4 className="text-base font-bold text-gray-800">{gameDetail.game}</h4>
//                                                     {gameDetail.is_coordinator && (
//                                                         <span className="inline-flex items-center gap-1 text-xs font-semibold text-yellow-700 mt-0">
//                                                             👑 Game Coordinator
//                                                         </span>
//                                                     )}
//                                                 </div>
//                                                 <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
//                                                     {gameDetail.total_players} {gameDetail.total_players === 1 ? 'Player' : 'Players'}
//                                                 </span>
//                                             </div>

//                                             {gameDetail.players.length > 0 ? (
//                                                 <div className="flex flex-wrap gap-2">
//                                                     {gameDetail.players.map((player, idx) => (
//                                                         <span key={idx} className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 px-3 py-1.5 rounded-full text-xs font-medium border-2 border-gray-200 shadow-sm">
//                                                             {player.name}
//                                                         </span>
//                                                     ))}
//                                                 </div>
//                                             ) : (
//                                                 <p className="text-xs text-gray-500 italic">
//                                                     {gameDetail.is_coordinator
//                                                         ? "You're the first to register for this game! Others will join soon. 🎉"
//                                                         : "Player list will be updated as more people register"}
//                                                 </p>
//                                             )}
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                         </div>

//                         {/* Support Message */}
//                         {formData.support_amount && parseFloat(formData.support_amount) > 0 && (
//                             <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-2xl p-5 mb-6">
//                                 <div className="flex items-start gap-3">
//                                     <Gift className="w-7 h-7 text-purple-600 flex-shrink-0 mt-1" />
//                                     <div>
//                                         <h3 className="text-base font-bold text-gray-800 mb-2">
//                                             Thank You for Your Generous Support! 💝
//                                         </h3>
//                                         <p className="text-sm text-gray-700 mb-2">
//                                             Your contribution of <span className="font-bold text-purple-700">₦{parseFloat(formData.support_amount).toLocaleString()}</span> is
//                                             a beautiful expression of your love for this community. "Each of you should give what you have decided in your heart to give,
//                                             not reluctantly or under compulsion, for God loves a cheerful giver." - 2 Corinthians 9:7
//                                         </p>
//                                         <p className="text-xs text-gray-600 italic">
//                                             Your seed shall surely bring forth a bountiful harvest! 🌾✨
//                                         </p>
//                                     </div>
//                                 </div>
//                                 <PaymentInfoCard payment_description={'PICNIC 25'} />
//                             </div>
//                         )}

//                         {/* Update Registration Button */}
//                         <div className="mt-8 text-center">
//                             <button
//                                 onClick={() => {
//                                     setShowEditForm(true);
//                                     setJustSubmitted(false);
//                                     window.scrollTo({ top: 0, behavior: 'smooth' });
//                                 }}
//                                 className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
//                             >
//                                 <Gamepad2 className="w-5 h-5" />
//                                 Update My Registration
//                             </button>
//                             <p className="text-xs text-gray-500 mt-3">
//                                 Need to change your games or support amount? Click above to update your registration.
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     // Main registration form
//     return (
//         <div className="min-h-screen py-12 px-4">
//             <div className="max-w-4xl my-24 space-y-5 mx-auto">
//                 {/* Error Messages - Prominent Position */}
//                 {fetchError && (
//                     <Message
//                         variant="error"
//                         data={fetchErrorData?.data}
//                         message={handleApiError(fetchErrorData)}
//                     />
//                 )}

//                 {submitError && (
//                     <Message
//                         variant="error"
//                         data={submitErrorData?.data}
//                         message={handleApiError(submitErrorData)}
//                     />
//                 )}

//                 {/* Update Notice - Show when editing existing registration */}
//                 {isUpdate && showEditForm && (
//                     <Message
//                         variant="info"
//                         message="You're updating your registration. Your changes will be saved when you click 'Update Registration'."
//                     />
//                 )}

//                 {/* Hero Section */}
//                 <div className="relative overflow-hidden">
//                     <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 shadow-2xl">
//                         <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
//                         <div className="absolute bottom-4 left-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>

//                         <div className="relative z-10">
//                             <div className="inline-block mb-4">
//                                 <span className="bg-white/20 backdrop-blur-sm text-white px-5 py-1.5 rounded-full text-xs font-bold border-2 border-white/30 shadow-lg">
//                                     ✨ ANNUAL EVENT 2025 ✨
//                                 </span>
//                             </div>

//                             <h1 className="text-3xl font-black text-white mb-5 leading-tight">
//                                 GCCC Annual
//                                 <span className="bg-gradient-to-r mx-1 from-yellow-300 to-orange-300 bg-clip-text text-transparent">
//                                     Picnic
//                                 </span>
//                                 2025
//                             </h1>

//                             <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border-2 border-white/20 shadow-xl w-full">
//                                 <p className="text-white text-base font-light italic mb-2 leading-relaxed">
//                                     "This is the day the Lord has made; let us rejoice and be glad in it."
//                                 </p>
//                                 <p className="text-white/80 text-xs font-medium">
//                                     — Psalm 118:24
//                                 </p>
//                             </div>

//                             <div className="grid grid-cols-3 gap-4 mt-4">
//                                 <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20">
//                                     <Gamepad2 className="w-5 h-5 text-white mx-auto mb-1.5" />
//                                     <p className="text-white font-bold text-xs">Games</p>
//                                 </div>
//                                 <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20">
//                                     <Users className="w-5 h-5 text-white mx-auto mb-1.5" />
//                                     <p className="text-white font-bold text-xs">Fellowship</p>
//                                 </div>
//                                 <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20">
//                                     <Sparkles className="w-5 h-5 text-white mx-auto mb-1.5" />
//                                     <p className="text-white font-bold text-xs">Fun</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Main Registration Form */}
//                 <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 border-4 border-purple-100">
//                     {/* Event Details */}
//                     <div className="grid md:grid-cols-3 gap-6 mb-8">
//                         <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 text-center border-2 border-blue-200">
//                             <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
//                             <p className="text-xs text-blue-700 font-medium mb-1">Date</p>
//                             <p className="text-base font-bold text-blue-900">{EVENT_INFO.date}</p>
//                         </div>

//                         <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 text-center border-2 border-purple-200">
//                             <Clock className="w-6 h-6 text-purple-600 mx-auto mb-2" />
//                             <p className="text-xs text-purple-700 font-medium mb-1">Time</p>
//                             <p className="text-base font-bold text-purple-900">{EVENT_INFO.time}</p>
//                         </div>

//                         <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 text-center border-2 border-green-200">
//                             <Users className="w-6 h-6 text-green-600 mx-auto mb-2" />
//                             <p className="text-xs text-green-700 font-medium mb-1">Fellowship</p>
//                             <p className="text-base font-bold text-green-900">{EVENT_INFO.fellowship}</p>
//                         </div>
//                     </div>

//                     {/* Welcome Message */}
//                     <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-5 mb-8 border-2 border-purple-200">
//                         <p className="text-gray-700 leading-relaxed mb-4 text-sm">
//                             Join us for an extraordinary day of fellowship, laughter, and games as we celebrate God's goodness together!
//                             Let's strengthen our bonds as a church family and create beautiful memories that will last a lifetime.
//                         </p>
//                         <div className="bg-white rounded-xl p-4 border-2 border-dashed border-pink-300 shadow-sm">
//                             <p className="text-xs font-bold text-pink-700 mb-2 flex items-center">
//                                 <span className="text-xl mr-2">👔</span>
//                                 DRESS CODE
//                                 <span className="text-xl ml-2">👗</span>
//                             </p>
//                             <p className="text-gray-700 text-xs font-medium">
//                                 <span className="font-bold">Corporate Casual:</span> Dress sharp, smell heavenly!
//                                 Remember: You're a king's kid, so dress like you're heading to the palace...
//                                 which you are! 👑✨😄
//                             </p>
//                         </div>
//                     </div>

//                     <div>
//                         <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
//                             {isUpdate && showEditForm ? "Update Your Registration! ✏️" : "Let's Get You Registered! 🎉"}
//                         </h2>

//                         {/* Games Selection */}
//                         <div className="mb-8">
//                             <label className="block text-base font-bold text-gray-800 mb-3 flex items-center">
//                                 <Gamepad2 className="w-5 h-5 mr-2 text-purple-600" />
//                                 Select Games You'd Like to Play *
//                             </label>
//                             <p className="text-xs text-gray-600 mb-4">Choose at least one game and meet your fellow players!</p>

//                             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                                 {GAMES_CONFIG.map((game) => (
//                                     <button
//                                         key={game.name}
//                                         type="button"
//                                         onClick={() => handleGameToggle(game.name)}
//                                         className={`relative overflow-hidden rounded-2xl border-3 transition-all duration-300 transform hover:scale-105 ${formData.games.includes(game.name)
//                                             ? 'border-purple-600 shadow-xl ring-4 ring-purple-300'
//                                             : 'border-gray-300 hover:border-purple-400 shadow-md'
//                                             }`}
//                                     >
//                                         <div className="relative h-32">
//                                             <img src={game.image} alt={game.name} className="w-full h-full object-cover" />
//                                             <div className={`absolute inset-0 transition-all duration-300 ${formData.games.includes(game.name)
//                                                 ? 'bg-gradient-to-t from-purple-900/90 via-purple-600/60 to-transparent'
//                                                 : 'bg-gradient-to-t from-gray-900/80 to-transparent'
//                                                 }`} />

//                                             {formData.games.includes(game.name) && (
//                                                 <div className="absolute top-2 right-2 w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
//                                                     <CheckCircle className="w-5 h-5 text-white" />
//                                                 </div>
//                                             )}

//                                             <div className="absolute bottom-0 left-0 right-0 p-3">
//                                                 <p className="text-white font-bold text-sm flex items-center">
//                                                     <span className="text-2xl mr-2">{game.emoji}</span>
//                                                     {game.name}
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Game Selection Joke */}
//                         {formData.games.length > 0 && (
//                             <div className={`mb-8 bg-gradient-to-r ${gameJoke.color === 'blue' ? 'from-blue-50 to-cyan-50 border-blue-300' :
//                                 gameJoke.color === 'green' ? 'from-green-50 to-emerald-50 border-green-300' :
//                                     gameJoke.color === 'purple' ? 'from-purple-50 to-pink-50 border-purple-300' :
//                                         gameJoke.color === 'yellow' ? 'from-yellow-50 to-orange-50 border-yellow-300' :
//                                             gameJoke.color === 'orange' ? 'from-orange-50 to-red-50 border-orange-300' :
//                                                 gameJoke.color === 'pink' ? 'from-pink-50 to-rose-50 border-pink-300' :
//                                                     'from-red-50 to-rose-50 border-red-300'
//                                 } border-2 rounded-2xl p-4`}>
//                                 <p className="text-sm font-semibold text-gray-800 flex items-start">
//                                     <span className="text-2xl mr-2 flex-shrink-0">{gameJoke.emoji}</span>
//                                     <span className="flex-1">{gameJoke.text}</span>
//                                 </p>
//                             </div>
//                         )}

//                         {/* Support Section */}
//                         <div className="mb-8 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-5 border-2 border-yellow-200">
//                             <div className='mb-3'>
//                                 <label className="block text-base font-bold text-gray-800  flex items-center">
//                                     <Gift className="w-5 h-5 mr-2 text-orange-600" />
//                                     Would you like to support this event?
//                                 </label>
//                                 <p className="text-xs text-gray-700 leading-relaxed">
//                                     Your generous contribution helps make this event a blessing for everyone.
//                                     Every seed sown in love multiplies in joy! 🌱✨
//                                 </p>
//                             </div>

//                             <div className="flex gap-4 mb-4">
//                                 <button
//                                     type="button"
//                                     onClick={() => handleSupportChoice(true)}
//                                     className={`flex-1 py-2.5 px-5 rounded-xl font-semibold text-sm transition-all duration-300 border-1 ${formData.wantsToSupport === true
//                                         ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
//                                         : 'bg-white  border-gray-300 text-gray-700 hover:border-green-400'
//                                         }`}
//                                 >
//                                     Yes, I'd love to! 💚
//                                 </button>
//                                 <button
//                                     type="button"
//                                     onClick={() => handleSupportChoice(false)}
//                                     className={`flex-1 py-2.5 px-5 rounded-xl font-semibold text-sm transition-all duration-300 border-1 ${formData.wantsToSupport === false
//                                         ? 'bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg'
//                                         : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
//                                         }`}
//                                 >
//                                     Not this time
//                                 </button>
//                             </div>

//                             {formData.wantsToSupport === true && (
//                                 <div className="animate-fadeIn">
//                                     <input
//                                         type="number"
//                                         name="support_amount"
//                                         value={formData.support_amount}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-3 border-2 border-orange-300 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-200 transition-all outline-none text-base"
//                                         placeholder="₦ Enter amount"
//                                         min="0"
//                                     />
//                                     <PaymentInfoCard payment_description={'PICNIC 25'} />
//                                 </div>
//                             )}

//                         </div>

//                         <button
//                             onClick={handleSubmit}
//                             disabled={formData.games.length === 0 || isPending}
//                             className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${formData.games.length === 0 || isPending
//                                 ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                                 : 'bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white shadow-2xl hover:shadow-purple-500/50'
//                                 }`}
//                         >
//                             {isPending
//                                 ? '⏳ Processing...'
//                                 : formData.games.length === 0
//                                     ? '🎮 Select at least one game to continue'
//                                     : isUpdate && showEditForm
//                                         ? '✅ Update Registration'
//                                         : '🎉 Complete Registration'}
//                         </button>

//                         {/* Cancel Update Button */}
//                         {isUpdate && showEditForm && (
//                             <button
//                                 onClick={() => {
//                                     setShowEditForm(false);
//                                     window.scrollTo({ top: 0, behavior: 'smooth' });
//                                 }}
//                                 className="w-full mt-4 py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-300"
//                             >
//                                 Cancel & View Registration
//                             </button>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, Clock, Users, Gift, CheckCircle, Trophy, Mail, Sparkles, Gamepad2, PartyPopper } from 'lucide-react';
import { useCreatePicnicRegistration, useGetMyRegistration } from '@/queries/picnic.query';
import { handleApiError } from '@/utils/helper';
import Message from '@/components/common/Message';

const GAMES_CONFIG = [
    { name: 'Checkers', image: '/images/games/checkers.png', emoji: '🔴' },
    { name: 'Card games', image: '/images/games/cardgames.png', emoji: '🃏' },
    { name: 'Ludo', image: '/images/games/ludo.png', emoji: '🎲' },
    { name: 'Monopoly', image: '/images/games/monopoly.png', emoji: '🏠' },
    { name: 'Scrabble', image: '/images/games/scrabble.png', emoji: '🔤' },
    { name: 'Chess', image: '/images/games/chess.png', emoji: '♟️' },
    { name: 'Jenga', image: '/images/games/jenga.png', emoji: '🧱' },
    { name: 'Snake and ladder', image: '/images/games/snakeandladder.png', emoji: '🐍' },
    { name: 'Ayo', image: '/images/games/ayo.png', emoji: '🪵' }
];

const EVENT_INFO = {
    date: 'Dec 28, 2025',
    time: '4:00 PM',
    timeDetail: '4:00 PM Sharp',
    fellowship: 'All Ages'
};

export default function PicnicRegistration() {
    const { data: registrationData, isLoading, isError: fetchError, error: fetchErrorData } = useGetMyRegistration();
    const { mutateAsync, isPending, isError: submitError, error: submitErrorData } = useCreatePicnicRegistration();

    const [formData, setFormData] = useState({
        games: [],
        support_amount: '',
        wantsToSupport: null
    });

    const [justSubmitted, setJustSubmitted] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    // Initialize form with existing registration data
    useEffect(() => {
        if (registrationData?.registered && registrationData?.registration) {
            const reg = registrationData.registration;
            setFormData({
                games: reg.games || [],
                support_amount: reg.support_amount ? String(reg.support_amount) : '',
                wantsToSupport: reg.support_amount > 0 ? true : null
            });
        }
    }, [registrationData]);

    // Check if already successfully registered
    const existingRegistration = registrationData?.registered ? registrationData.registration : null;
    const isUpdate = !!existingRegistration;

    // Game selection joke based on count
    const gameJoke = useMemo(() => {
        const count = formData.games.length;
        const jokes = [
            { min: 0, max: 0, text: "Jesus said 'Come and play... I mean pray!' 😅 Select at least one game to continue!", emoji: "🎮", color: "red" },
            { min: 1, max: 1, text: "One game? That's like bringing one fish to feed the 5,000. Bold choice! 🐟", emoji: "🎯", color: "blue" },
            { min: 2, max: 2, text: "Two games! Like Noah's Ark - you're keeping it balanced! ⚖️😄", emoji: "🎲", color: "green" },
            { min: 3, max: 3, text: "Three games! The Holy Trinity of fun - Father, Son, and Board Games! 🙏✨", emoji: "⭐", color: "purple" },
            { min: 4, max: 4, text: "Four games! Like the four gospels, you're covering all the bases! 📖🎮", emoji: "🎪", color: "yellow" },
            { min: 5, max: 5, text: "Five games! More choices than loaves and fishes! Someone's ready to multiply the fun! 🍞🐟", emoji: "🎊", color: "orange" },
            { min: 6, max: 7, text: "6-7 games! God rested on the 7th day... but you're not planning to! 😂🎮", emoji: "🌟", color: "pink" },
            { min: 8, max: 999, text: "8+ games?! You're not here to play, you're here to CONQUER! Joshua at Jericho vibes! 🎺💪", emoji: "🔥", color: "red" }
        ];

        return jokes.find(j => count >= j.min && count <= j.max) || jokes[0];
    }, [formData.games.length]);

    // Handlers
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleGameToggle = (gameName) => {
        setFormData(prev => ({
            ...prev,
            games: prev.games.includes(gameName)
                ? prev.games.filter(g => g !== gameName)
                : [...prev.games, gameName]
        }));
    };

    const handleSupportChoice = (choice) => {
        setFormData(prev => ({
            ...prev,
            wantsToSupport: choice,
            support_amount: choice ? prev.support_amount : ''
        }));
    };

    const handleSubmit = async () => {
        if (formData.games.length === 0) {
            return;
        }

        try {
            const payload = {
                games: formData.games,
                support_amount: formData.wantsToSupport && formData.support_amount
                    ? parseFloat(formData.support_amount)
                    : 0
            };

            const response = await mutateAsync(payload);

            if (response) {
                setJustSubmitted(true);
                setShowEditForm(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    // Get games details with players and coordinator status
    const gamesDetails = useMemo(() => {
        if (!existingRegistration?.games_details) return [];

        // Filter to only show games user has selected
        return existingRegistration.games_details.filter(detail =>
            formData.games.includes(detail.game)
        );
    }, [existingRegistration, formData.games]);

    // Loading state with proper skeleton
    if (isLoading) {
        return (
            <div className="min-h-screen py-12 px-4">
                <div className="max-w-4xl my-24 space-y-5 mx-auto">
                    {/* Hero Skeleton */}
                    <div className="relative overflow-hidden">
                        <div className="relative bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 rounded-3xl p-8 md:p-12 shadow-2xl animate-pulse">
                            <div className="space-y-4">
                                <div className="h-6 w-48 bg-white/30 rounded-full"></div>
                                <div className="h-12 w-3/4 bg-white/40 rounded-lg"></div>
                                <div className="bg-white/20 rounded-2xl p-4 space-y-3">
                                    <div className="h-4 bg-white/30 rounded w-full"></div>
                                    <div className="h-4 bg-white/30 rounded w-2/3"></div>
                                </div>
                                <div className="grid grid-cols-3 gap-4 mt-4">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="bg-white/20 rounded-xl p-3 h-20"></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Skeleton */}
                    <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 border-4 border-gray-100 animate-pulse">
                        {/* Event Details Skeleton */}
                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="bg-gray-100 rounded-2xl p-4 h-24"></div>
                            ))}
                        </div>

                        {/* Welcome Message Skeleton */}
                        <div className="bg-gray-50 rounded-2xl p-5 mb-8 space-y-3">
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            <div className="bg-gray-100 rounded-xl p-4 mt-3">
                                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-3 bg-gray-200 rounded w-full mt-2"></div>
                            </div>
                        </div>

                        {/* Title Skeleton */}
                        <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-64 mb-6"></div>

                        {/* Games Grid Skeleton */}
                        <div className="mb-8">
                            <div className="h-6 bg-gray-200 rounded w-48 mb-3"></div>
                            <div className="h-3 bg-gray-100 rounded w-64 mb-4"></div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                                    <div key={i} className="bg-gray-100 rounded-2xl h-32 overflow-hidden">
                                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300"></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Support Section Skeleton */}
                        <div className="bg-gray-50 rounded-2xl p-5 mb-8 space-y-4">
                            <div className="h-6 bg-gray-200 rounded w-56"></div>
                            <div className="h-3 bg-gray-100 rounded w-full"></div>
                            <div className="flex gap-4">
                                <div className="flex-1 h-11 bg-gray-200 rounded-xl"></div>
                                <div className="flex-1 h-11 bg-gray-200 rounded-xl"></div>
                            </div>
                        </div>

                        {/* Submit Button Skeleton */}
                        <div className="h-14 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-2xl"></div>
                    </div>
                </div>
            </div>
        );
    }

    // Success/Registration Complete View
    if (existingRegistration && !showEditForm) {
        return (
            <div className="min-h-screen my-24 py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Success Message - Prominent Position */}
                    {justSubmitted && (
                        <div className="mb-6">
                            <Message
                                variant="success"
                                message={isUpdate ? "Registration updated successfully! 🎉" : "Registration successful! You're all set for the picnic! 🎉"}
                            />
                        </div>
                    )}

                    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-purple-200">
                        {/* Success Header */}
                        <div className="text-center mb-8">
                            <div className="relative inline-block mb-4">
                                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
                                    <CheckCircle className="w-12 h-12 text-white" />
                                </div>
                                <div className="absolute -top-2 -right-2">
                                    <Sparkles className="w-7 h-7 text-yellow-400 animate-pulse" />
                                </div>
                            </div>

                            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                                {isUpdate ? 'Registration Updated! 🎉' : 'Hallelujah! Registration Successful! 🎉'}
                            </h2>
                            <p className="text-gray-600 mb-2">
                                Your spot is secured in the kingdom of fun!
                            </p>
                            <p className="text-xs text-gray-500 italic">
                                "For where two or three gather in my name, there am I with them" - and we'll have way more than three! 😄
                            </p>
                        </div>

                        {/* Congratulatory Message */}
                        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl p-5 mb-6">
                            <div className="flex items-start gap-3">
                                <PartyPopper className="w-7 h-7 text-orange-500 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                                        Congratulations! 🎊
                                    </h3>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        You're all set for an amazing day of fellowship, fun, and unforgettable memories!
                                        Get ready to connect with your church family in a whole new way. The joy of the Lord is truly our strength -
                                        and we're about to have a joyful time!
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Coordinator Special Message */}
                        {gamesDetails.some(d => d.is_coordinator) && (
                            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-400 rounded-2xl p-5 mb-6">
                                <div className="flex items-start gap-3">
                                    <div className="text-3xl">👑</div>
                                    <div>
                                        <h3 className="text-lg font-bold text-amber-900 mb-2">
                                            You're a Game Coordinator! 🎮
                                        </h3>
                                        <p className="text-sm text-amber-800 leading-relaxed mb-2">
                                            As one of the first to register for{' '}
                                            <span className="font-bold">
                                                {gamesDetails.filter(d => d.is_coordinator).map(d => d.game).join(', ')}
                                            </span>
                                            , you've been chosen as the game coordinator! Don't worry - we'll send you all the details and support you need.
                                        </p>
                                        <p className="text-xs text-amber-700 italic">
                                            "For to everyone who has, more will be given" - Your early commitment is rewarded with leadership! 💪✨
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Email Notification */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-2xl p-5 mb-6">
                            <div className="flex items-start gap-3">
                                <Mail className="w-7 h-7 text-blue-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-base font-bold text-gray-800 mb-2">
                                        Check Your Inbox! 📧
                                    </h3>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        Your official event ticket with the complete venue address and additional details will be sent to your email
                                        <span className="font-semibold"> 48 hours before the event</span>. Please keep an eye on your inbox
                                        (and spam folder, just in case the devil tries to hide it! 😉).
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Event Quick Info */}
                        <div className="grid md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-4 text-center">
                                <Calendar className="w-6 h-6 mx-auto mb-2 text-blue-700" />
                                <p className="text-xs text-blue-800 font-medium mb-1">Date</p>
                                <p className="text-base font-bold text-blue-900">{EVENT_INFO.date}</p>
                            </div>

                            <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl p-4 text-center">
                                <Clock className="w-6 h-6 mx-auto mb-2 text-purple-700" />
                                <p className="text-xs text-purple-800 font-medium mb-1">Time</p>
                                <p className="text-base font-bold text-purple-900">{EVENT_INFO.timeDetail}</p>
                            </div>

                            <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-xl p-4 text-center">
                                <Users className="w-6 h-6 mx-auto mb-2 text-green-700" />
                                <p className="text-xs text-green-800 font-medium mb-1">Fellowship</p>
                                <p className="text-base font-bold text-green-900">{EVENT_INFO.fellowship}</p>
                            </div>
                        </div>

                        {/* Games Section - Always show selected games */}
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-5 mb-6 border-2 border-green-200">
                            <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                                <Trophy className="w-6 h-6 mr-2 text-green-600" />
                                Your Game Line-Up 🎮
                            </h3>
                            <p className="text-xs text-gray-600 mb-4">
                                {gamesDetails.length > 0 && gamesDetails.some(d => d.players.length > 0)
                                    ? "Connect with these fellow believers who'll be playing the same games! Iron sharpens iron... and apparently so does friendly competition! ⚔️"
                                    : "These are the games you've selected. Player lists will be available soon!"}
                            </p>

                            <div className="space-y-4">
                                {gamesDetails.map((gameDetail) => {
                                    const game = GAMES_CONFIG.find(g => g.name === gameDetail.game);

                                    return (
                                        <div key={gameDetail.game} className="bg-white rounded-xl p-4 shadow-md border-2 border-green-100">
                                            <div className="flex items-center mb-3 pb-3 border-b-2 border-gray-100">
                                                <span className="text-3xl mr-2">{game?.emoji}</span>
                                                <div className="flex-1">
                                                    <h4 className="text-base font-bold text-gray-800">{gameDetail.game}</h4>
                                                    {gameDetail.is_coordinator && (
                                                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-yellow-700 mt-1">
                                                            👑 You're the Game Coordinator
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                                                    {gameDetail.total_players} {gameDetail.total_players === 1 ? 'Player' : 'Players'}
                                                </span>
                                            </div>

                                            {/* Coordinator Info - Visible to everyone who's not the coordinator */}
                                            {gameDetail.coordinator && !gameDetail.is_coordinator && (
                                                <div className="mb-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                                                    <p className="text-xs text-amber-800 mb-1 font-semibold">👑 Game Coordinator</p>
                                                    <p className="text-sm font-bold text-amber-900">{gameDetail.coordinator.name}</p>
                                                    <p className="text-xs text-amber-700">{gameDetail.coordinator.email}</p>
                                                </div>
                                            )}

                                            {gameDetail.players.length > 0 ? (
                                                <div>
                                                    <p className="text-xs text-gray-600 font-semibold mb-2">Fellow Players:</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {gameDetail.players.map((player, idx) => (
                                                            <span
                                                                key={idx}
                                                                className={`px-3 py-1.5 rounded-full text-xs font-medium border-2 shadow-sm ${player.is_coordinator
                                                                    ? 'bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-900 border-amber-300 font-bold'
                                                                    : 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 border-gray-200'
                                                                    }`}
                                                            >
                                                                {player.is_coordinator && '👑 '}
                                                                {player.name}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : (
                                                <p className="text-xs text-gray-500 italic">
                                                    {gameDetail.is_coordinator
                                                        ? "You're the first to register for this game! Others will join soon. 🎉"
                                                        : "Player list will be updated as more people register"}
                                                </p>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Support Message */}
                        {formData.support_amount && parseFloat(formData.support_amount) > 0 && (
                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-2xl p-5 mb-6">
                                <div className="flex items-start gap-3">
                                    <Gift className="w-7 h-7 text-purple-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-base font-bold text-gray-800 mb-2">
                                            Thank You for Your Generous Support! 💝
                                        </h3>
                                        <p className="text-sm text-gray-700 mb-2">
                                            Your contribution of <span className="font-bold text-purple-700">₦{parseFloat(formData.support_amount).toLocaleString()}</span> is
                                            a beautiful expression of your love for this community. "Each of you should give what you have decided in your heart to give,
                                            not reluctantly or under compulsion, for God loves a cheerful giver." - 2 Corinthians 9:7
                                        </p>
                                        <p className="text-xs text-gray-600 italic">
                                            Your seed shall surely bring forth a bountiful harvest! 🌾✨
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Update Registration Button */}
                        <div className="mt-8 text-center">
                            <button
                                onClick={() => {
                                    setShowEditForm(true);
                                    setJustSubmitted(false);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                            >
                                <Gamepad2 className="w-5 h-5" />
                                Update My Registration
                            </button>
                            <p className="text-xs text-gray-500 mt-3">
                                Need to change your games or support amount? Click above to update your registration.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Main registration form
    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-4xl my-24 space-y-5 mx-auto">
                {/* Error Messages - Prominent Position */}
                {fetchError && (
                    <Message
                        variant="error"
                        data={fetchErrorData?.data}
                        message={handleApiError(fetchErrorData)}
                    />
                )}

                {submitError && (
                    <Message
                        variant="error"
                        data={submitErrorData?.data}
                        message={handleApiError(submitErrorData)}
                    />
                )}

                {/* Update Notice - Show when editing existing registration */}
                {isUpdate && showEditForm && (
                    <Message
                        variant="info"
                        message="You're updating your registration. Your changes will be saved when you click 'Update Registration'."
                    />
                )}

                {/* Hero Section */}
                <div className="relative overflow-hidden">
                    <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 shadow-2xl">
                        <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
                        <div className="absolute bottom-4 left-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>

                        <div className="relative z-10">
                            <div className="inline-block mb-4">
                                <span className="bg-white/20 backdrop-blur-sm text-white px-5 py-1.5 rounded-full text-xs font-bold border-2 border-white/30 shadow-lg">
                                    ✨ ANNUAL EVENT 2025 ✨
                                </span>
                            </div>

                            <h1 className="text-3xl font-black text-white mb-5 leading-tight">
                                GCCC Annual
                                <span className="bg-gradient-to-r mx-1 from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                                    Picnic
                                </span>
                                2025
                            </h1>

                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border-2 border-white/20 shadow-xl w-full">
                                <p className="text-white text-base font-light italic mb-2 leading-relaxed">
                                    "This is the day the Lord has made; let us rejoice and be glad in it."
                                </p>
                                <p className="text-white/80 text-xs font-medium">
                                    — Psalm 118:24
                                </p>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mt-4">
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20">
                                    <Gamepad2 className="w-5 h-5 text-white mx-auto mb-1.5" />
                                    <p className="text-white font-bold text-xs">Games</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20">
                                    <Users className="w-5 h-5 text-white mx-auto mb-1.5" />
                                    <p className="text-white font-bold text-xs">Fellowship</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20">
                                    <Sparkles className="w-5 h-5 text-white mx-auto mb-1.5" />
                                    <p className="text-white font-bold text-xs">Fun</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Registration Form */}
                <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 border-4 border-purple-100">
                    {/* Event Details */}
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 text-center border-2 border-blue-200">
                            <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                            <p className="text-xs text-blue-700 font-medium mb-1">Date</p>
                            <p className="text-base font-bold text-blue-900">{EVENT_INFO.date}</p>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 text-center border-2 border-purple-200">
                            <Clock className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                            <p className="text-xs text-purple-700 font-medium mb-1">Time</p>
                            <p className="text-base font-bold text-purple-900">{EVENT_INFO.time}</p>
                        </div>

                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 text-center border-2 border-green-200">
                            <Users className="w-6 h-6 text-green-600 mx-auto mb-2" />
                            <p className="text-xs text-green-700 font-medium mb-1">Fellowship</p>
                            <p className="text-base font-bold text-green-900">{EVENT_INFO.fellowship}</p>
                        </div>
                    </div>

                    {/* Welcome Message */}
                    <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-5 mb-8 border-2 border-purple-200">
                        <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                            Join us for an extraordinary day of fellowship, laughter, and games as we celebrate God's goodness together!
                            Let's strengthen our bonds as a church family and create beautiful memories that will last a lifetime.
                        </p>
                        <div className="bg-white rounded-xl p-4 border-2 border-dashed border-pink-300 shadow-sm">
                            <p className="text-xs font-bold text-pink-700 mb-2 flex items-center">
                                <span className="text-xl mr-2">👔</span>
                                DRESS CODE
                                <span className="text-xl ml-2">👗</span>
                            </p>
                            <p className="text-gray-700 text-xs font-medium">
                                <span className="font-bold">Corporate Casual:</span> Dress sharp, smell heavenly!
                                Remember: You're a king's kid, so dress like you're heading to the palace...
                                which you are! 👑✨😄
                            </p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
                            {isUpdate && showEditForm ? "Update Your Registration! ✏️" : "Let's Get You Registered! 🎉"}
                        </h2>

                        {/* Games Selection */}
                        <div className="mb-8">
                            <label className="block text-base font-bold text-gray-800 mb-3 flex items-center">
                                <Gamepad2 className="w-5 h-5 mr-2 text-purple-600" />
                                Select Games You'd Like to Play *
                            </label>
                            <p className="text-xs text-gray-600 mb-4">Choose at least one game and meet your fellow players!</p>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {GAMES_CONFIG.map((game) => (
                                    <button
                                        key={game.name}
                                        type="button"
                                        onClick={() => handleGameToggle(game.name)}
                                        className={`relative overflow-hidden rounded-2xl border-3 transition-all duration-300 transform hover:scale-105 ${formData.games.includes(game.name)
                                            ? 'border-purple-600 shadow-xl ring-4 ring-purple-300'
                                            : 'border-gray-300 hover:border-purple-400 shadow-md'
                                            }`}
                                    >
                                        <div className="relative h-32">
                                            <img src={game.image} alt={game.name} className="w-full h-full object-cover" />
                                            <div className={`absolute inset-0 transition-all duration-300 ${formData.games.includes(game.name)
                                                ? 'bg-gradient-to-t from-purple-900/90 via-purple-600/60 to-transparent'
                                                : 'bg-gradient-to-t from-gray-900/80 to-transparent'
                                                }`} />

                                            {formData.games.includes(game.name) && (
                                                <div className="absolute top-2 right-2 w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                                                    <CheckCircle className="w-5 h-5 text-white" />
                                                </div>
                                            )}

                                            <div className="absolute bottom-0 left-0 right-0 p-3">
                                                <p className="text-white font-bold text-sm flex items-center">
                                                    <span className="text-2xl mr-2">{game.emoji}</span>
                                                    {game.name}
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Game Selection Joke */}
                        {formData.games.length > 0 && (
                            <div className={`mb-8 bg-gradient-to-r ${gameJoke.color === 'blue' ? 'from-blue-50 to-cyan-50 border-blue-300' :
                                gameJoke.color === 'green' ? 'from-green-50 to-emerald-50 border-green-300' :
                                    gameJoke.color === 'purple' ? 'from-purple-50 to-pink-50 border-purple-300' :
                                        gameJoke.color === 'yellow' ? 'from-yellow-50 to-orange-50 border-yellow-300' :
                                            gameJoke.color === 'orange' ? 'from-orange-50 to-red-50 border-orange-300' :
                                                gameJoke.color === 'pink' ? 'from-pink-50 to-rose-50 border-pink-300' :
                                                    'from-red-50 to-rose-50 border-red-300'
                                } border-2 rounded-2xl p-4`}>
                                <p className="text-sm font-semibold text-gray-800 flex items-start">
                                    <span className="text-2xl mr-2 flex-shrink-0">{gameJoke.emoji}</span>
                                    <span className="flex-1">{gameJoke.text}</span>
                                </p>
                            </div>
                        )}

                        {/* Support Section */}
                        <div className="mb-8 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-5 border-2 border-yellow-200">
                            <label className="block text-base font-bold text-gray-800 mb-3 flex items-center">
                                <Gift className="w-5 h-5 mr-2 text-orange-600" />
                                Would you like to support this event?
                            </label>

                            <div className="flex gap-4 mb-4">
                                <button
                                    type="button"
                                    onClick={() => handleSupportChoice(true)}
                                    className={`flex-1 py-2.5 px-5 rounded-xl font-semibold text-sm transition-all duration-300 ${formData.wantsToSupport === true
                                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                                        : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-green-400'
                                        }`}
                                >
                                    Yes, I'd love to! 💚
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleSupportChoice(false)}
                                    className={`flex-1 py-2.5 px-5 rounded-xl font-semibold text-sm transition-all duration-300 ${formData.wantsToSupport === false
                                        ? 'bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg'
                                        : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400'
                                        }`}
                                >
                                    Not this time
                                </button>
                            </div>

                            {formData.wantsToSupport === true && (
                                <div className="animate-fadeIn">
                                    <input
                                        type="number"
                                        name="support_amount"
                                        value={formData.support_amount}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border-2 border-orange-300 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-200 transition-all outline-none text-base"
                                        placeholder="₦ Enter amount"
                                        min="0"
                                    />
                                    <div className="mt-3 bg-white rounded-lg p-3 border border-orange-200">
                                        <p className="text-xs text-gray-700 leading-relaxed">
                                            Your generous contribution helps make this event a blessing for everyone.
                                            Every seed sown in love multiplies in joy! 🌱✨
                                        </p>
                                    </div>
                                </div>
                            )}

                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={formData.games.length === 0 || isPending}
                            className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${formData.games.length === 0 || isPending
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white shadow-2xl hover:shadow-purple-500/50'
                                }`}
                        >
                            {isPending
                                ? '⏳ Processing...'
                                : formData.games.length === 0
                                    ? '🎮 Select at least one game to continue'
                                    : isUpdate && showEditForm
                                        ? '✅ Update Registration'
                                        : '🎉 Complete Registration'}
                        </button>

                        {/* Cancel Update Button */}
                        {isUpdate && showEditForm && (
                            <button
                                onClick={() => {
                                    setShowEditForm(false);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="w-full mt-4 py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-300"
                            >
                                Cancel & View Registration
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}