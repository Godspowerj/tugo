"use client"
import React, { useState } from 'react';
import { Search, MapPin, DollarSign, Users, Home, Bed, Calendar, Star, CheckCircle, MessageCircle, SlidersHorizontal, ExternalLink, Phone, ShoppingBag, Scissors, UtensilsCrossed, ChevronDown } from 'lucide-react';

// TypeScript Interfaces
interface Listing {
  id: string;
  type: 'listing';
  listingType: 'roommate' | 'bunkmate' | 'rental';
  title: string;
  description: string;
  price: number;
  priceType: 'monthly' | 'weekly' | 'daily';
  university: string;
  location: string;
  isSponsored: boolean;
  posterName: string;
  posterImage: string;
  posterPhone: string;
  posterVerified: boolean;
  propertyImage: string;
  availableFrom: string;
}

interface BusinessAd {
  id: string;
  type: 'business';
  businessType: 'eatery' | 'barber' | 'service';
  title: string;
  description: string;
  image: string;
  link: string;
  targetUniversity: string;
  location: string;
  isSponsored: boolean;
  ctaText: string;
  rating?: number;
  priceRange?: string;
}

type FeedItem = Listing | BusinessAd;

// Sample Data
const feedItems: FeedItem[] = [
  {
    id: '1',
    type: 'listing',
    listingType: 'roommate',
    title: 'Spacious Room Near Campus',
    description: 'Looking for a clean, responsible roommate. Apartment is 10 mins walk from university. Fully furnished with WiFi included.',
    price: 450,
    priceType: 'monthly',
    university: 'University of Lagos',
    location: 'Yaba, Lagos',
    isSponsored: true,
    posterName: 'Chioma A.',
    posterImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    posterPhone: '+2348012345678',
    posterVerified: true,
    propertyImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
    availableFrom: 'Jan 1, 2025'
  },
  {
    id: 'b1',
    type: 'business',
    businessType: 'eatery',
    title: 'Campus Bites Restaurant',
    description: '20% off for all UNILAG students! Fresh meals, fast delivery. Order now and get free delivery on your first order.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
    link: '#',
    targetUniversity: 'University of Lagos',
    location: 'Akoka, Lagos',
    isSponsored: true,
    ctaText: 'Order Now',
    rating: 4.8,
    priceRange: '₦₦'
  },
  {
    id: '2',
    type: 'listing',
    listingType: 'bunkmate',
    title: 'Female Bunkmate Needed',
    description: 'Seeking female student to share bunk in hostel. Safe environment, close to library and cafeteria.',
    price: 200,
    priceType: 'monthly',
    university: 'University of Ibadan',
    location: 'UI Campus, Ibadan',
    isSponsored: true,
    posterName: 'Amina B.',
    posterImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    posterPhone: '+2348098765432',
    posterVerified: true,
    propertyImage: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop',
    availableFrom: 'Dec 15, 2024'
  },
  {
    id: 'b2',
    type: 'business',
    businessType: 'barber',
    title: 'Fresh Cuts Barber Shop',
    description: 'Student discount: ₦500 off any haircut! Professional barbers, modern styles. Walk-ins welcome.',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=300&fit=crop',
    link: '#',
    targetUniversity: 'University of Lagos',
    location: 'Yaba, Lagos',
    isSponsored: true,
    ctaText: 'Book Now',
    rating: 4.9,
    priceRange: '₦₦'
  },
  {
    id: '3',
    type: 'listing',
    listingType: 'rental',
    title: 'Short-term Rental for Semester',
    description: 'One bedroom apartment available for short-term lease. Perfect for visiting students or internship period.',
    price: 600,
    priceType: 'monthly',
    university: 'Covenant University',
    location: 'Ota, Ogun State',
    isSponsored: false,
    posterName: 'David O.',
    posterImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    posterPhone: '+2347012345678',
    posterVerified: true,
    propertyImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
    availableFrom: 'Jan 15, 2025'
  },
  {
    id: 'b3',
    type: 'business',
    businessType: 'service',
    title: 'QuickWash Laundry Service',
    description: 'Same-day laundry service for students. Free pickup & delivery on campus. First wash 50% off!',
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop',
    link: '#',
    targetUniversity: 'University of Lagos',
    location: 'Yaba, Lagos',
    isSponsored: false,
    ctaText: 'Get Started',
    rating: 4.7,
    priceRange: '₦'
  },
  {
    id: '4',
    type: 'listing',
    listingType: 'roommate',
    title: 'Roommate for 3BR Apartment',
    description: 'We are 2 engineering students looking for a third roommate. Shared living room and kitchen. Great study environment.',
    price: 350,
    priceType: 'monthly',
    university: 'University of Lagos',
    location: 'Akoka, Lagos',
    isSponsored: false,
    posterName: 'Tunde M.',
    posterImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    posterPhone: '+2348034567890',
    posterVerified: false,
    propertyImage: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=400&h=300&fit=crop',
    availableFrom: 'Jan 5, 2025'
  },
  {
    id: '5',
    type: 'listing',
    listingType: 'rental',
    title: 'Modern Studio Near LASU',
    description: 'Newly renovated studio apartment. Great for serious students. Quiet neighborhood with 24/7 security.',
    price: 380,
    priceType: 'monthly',
    university: 'Lagos State University',
    location: 'Ojo, Lagos',
    isSponsored: false,
    posterName: 'Emmanuel K.',
    posterImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop',
    posterPhone: '+2348123456789',
    posterVerified: true,
    propertyImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    availableFrom: 'Dec 20, 2024'
  },
  {
    id: 'b4',
    type: 'business',
    businessType: 'eatery',
    title: 'Mama Put Kitchen',
    description: 'Authentic Nigerian meals. Student special: Rice + Stew + Chicken for ₦800. Fast delivery to all hostels.',
    image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400&h=300&fit=crop',
    link: '#',
    targetUniversity: 'University of Ibadan',
    location: 'UI Campus, Ibadan',
    isSponsored: false,
    ctaText: 'Order Now',
    rating: 4.6,
    priceRange: '₦'
  }
];

const universities = [
  'All Universities',
  'University of Lagos',
  'University of Ibadan',
  'Covenant University',
  'Lagos State University',
  'Obafemi Awolowo University'
];

const TugoExplorePage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedUniversity, setSelectedUniversity] = useState<string>('All Universities');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const filteredItems = feedItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (item.type === 'listing') {
      const matchesType = selectedType === 'all' || selectedType === item.listingType;
      const matchesUniversity = selectedUniversity === 'All Universities' || item.university === selectedUniversity;
      return matchesType && matchesUniversity && matchesSearch;
    } else {
      const matchesUniversity = selectedUniversity === 'All Universities' || item.targetUniversity === selectedUniversity;
      return matchesUniversity && matchesSearch;
    }
  });

  const sponsoredItems = filteredItems.filter(item => item.isSponsored);
  const regularItems = filteredItems.filter(item => !item.isSponsored);

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'roommate': return <Users className="w-4 h-4" />;
      case 'bunkmate': return <Bed className="w-4 h-4" />;
      case 'rental': return <Home className="w-4 h-4" />;
      default: return <Home className="w-4 h-4" />;
    }
  };

  const getBusinessIcon = (type: string) => {
    switch(type) {
      case 'eatery': return <UtensilsCrossed className="w-5 h-5" />;
      case 'barber': return <Scissors className="w-5 h-5" />;
      case 'service': return <ShoppingBag className="w-5 h-5" />;
      default: return <ShoppingBag className="w-5 h-5" />;
    }
  };

  const openWhatsApp = (phone: string, title: string) => {
    const message = encodeURIComponent(`Hi! I'm interested in your listing: ${title}`);
    window.open(`https://wa.me/${phone.replace(/\+/g, '')}?text=${message}`, '_blank');
  };

  const ListingCard: React.FC<{ listing: Listing; isSponsored?: boolean }> = ({ listing, isSponsored = false }) => (
    <div className={`rounded-2xl overflow-hidden transition-all duration-300 relative backdrop-blur-sm group ${
      isSponsored 
        ? 'bg-gradient-to-br from-yellow-500/20 via-orange-500/10 to-white/5 border-2 border-yellow-500/40 shadow-lg shadow-yellow-500/20' 
        : 'bg-gradient-to-b from-white/10 to-white/5 border border-white/20 hover:border-white/40'
    }`}>
      {isSponsored && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 text-black text-xs font-black py-2 px-4 z-10 flex items-center justify-center shadow-lg">
          <Star className="w-3.5 h-3.5 mr-1.5 fill-black" />
          ⚡ SPONSORED LISTING
        </div>
      )}
      
      <div className={`relative ${isSponsored ? 'h-52' : 'h-48'} overflow-hidden`}>
        <img 
          src={listing.propertyImage} 
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        {/* Poster Info - Overlaid on Image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <img 
                src={listing.posterImage}
                alt={listing.posterName}
                className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />
              {listing.posterVerified && (
                <div className="absolute -bottom-0.5 -right-0.5 bg-blue-500 rounded-full p-0.5">
                  <CheckCircle className="w-3.5 h-3.5 text-white fill-current" />
                </div>
              )}
            </div>
            <div>
              <p className="text-white font-bold text-sm">{listing.posterName}</p>
              <p className="text-white/80 text-xs flex items-center gap-1">
                {listing.posterVerified && <CheckCircle className="w-3 h-3" />}
                {listing.posterVerified ? 'Verified User' : 'Member'}
              </p>
            </div>
          </div>
          
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-white/90 text-black backdrop-blur-sm">
            {getTypeIcon(listing.listingType)}
            <span className="capitalize">{listing.listingType}</span>
          </span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold text-white line-clamp-1 flex-1">
            {listing.title}
          </h3>
          <span className="text-lg font-black text-white whitespace-nowrap">
            ₦{listing.price.toLocaleString()}
            <span className="text-xs font-normal text-gray-400">/{listing.priceType === 'monthly' ? 'mo' : listing.priceType === 'weekly' ? 'wk' : 'day'}</span>
          </span>
        </div>

        <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
          {listing.description}
        </p>

        <div className="space-y-2">
          <div className="flex items-center text-xs text-gray-400">
            <Home className="w-3.5 h-3.5 mr-1.5" />
            <span className="line-clamp-1">{listing.university}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center text-xs text-gray-400">
              <MapPin className="w-3.5 h-3.5 mr-1.5" />
              <span>{listing.location}</span>
            </div>
            <div className="flex items-center text-xs text-gray-400">
              <Calendar className="w-3.5 h-3.5 mr-1.5" />
              <span className="whitespace-nowrap">{listing.availableFrom}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-3 border-t border-white/10">
          <button 
            onClick={() => openWhatsApp(listing.posterPhone, listing.title)}
            className="flex-1 flex items-center justify-center gap-1.5 bg-white hover:bg-gray-100 text-black px-3 py-2.5 rounded-full text-sm font-bold transition-all transform hover:scale-105 active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </button>
          
          <button className="flex items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2.5 rounded-full transition-all border border-white/30 transform hover:scale-105 active:scale-95">
            <DollarSign className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const BusinessAdCard: React.FC<{ ad: BusinessAd; isSponsored?: boolean }> = ({ ad, isSponsored = false }) => (
    <div className={`rounded-2xl overflow-hidden transition-all duration-300 backdrop-blur-sm group relative ${
      isSponsored 
        ? 'bg-gradient-to-br from-purple-500/20 via-blue-500/10 to-white/5 border-2 border-purple-500/40 shadow-lg shadow-purple-500/20' 
        : 'bg-gradient-to-br from-white/15 to-white/5 border-2 border-white/20 hover:border-white/40'
    }`}>
      {isSponsored && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 text-white text-xs font-black py-2 px-4 z-10 flex items-center justify-center shadow-lg">
          <Star className="w-3.5 h-3.5 mr-1.5 fill-white" />
          💼 SPONSORED BUSINESS
        </div>
      )}
      
      <div className={`relative ${isSponsored ? 'h-52' : 'h-48'} overflow-hidden`}>
        <img 
          src={ad.image} 
          alt={ad.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        
        <div className="absolute top-3 left-3 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full">
          {getBusinessIcon(ad.businessType)}
          <span className="text-black text-xs font-black uppercase">{ad.businessType}</span>
        </div>

        {ad.rating && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-yellow-400 px-2.5 py-1.5 rounded-full">
            <Star className="w-4 h-4 fill-black text-black" />
            <span className="text-black text-sm font-black">{ad.rating}</span>
          </div>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold text-white flex-1">
            {ad.title}
          </h3>
          {ad.priceRange && (
            <span className="text-sm font-bold text-gray-300 bg-white/10 px-2 py-1 rounded">{ad.priceRange}</span>
          )}
        </div>

        <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
          {ad.description}
        </p>

        <div className="flex items-center text-xs text-gray-400">
          <MapPin className="w-3.5 h-3.5 mr-1.5" />
          <span>{ad.location}</span>
        </div>

        <button 
          onClick={() => window.open(ad.link, '_blank')}
          className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-black px-4 py-2.5 rounded-full text-sm font-bold transition-all transform hover:scale-105 active:scale-95 mt-3"
        >
          <span>{ad.ctaText}</span>
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-black/80 backdrop-blur-xl border-b border-white/10 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-gray-400"></div>
              </div>
              <h1 className="text-2xl font-black text-white tracking-tight">Tugo</h1>
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${
                showFilters 
                  ? 'bg-white text-black' 
                  : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by location, university, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-white/40 transition-all"
            />
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 space-y-4 animate-slide-down">
              {/* Type Filters */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                <button
                  onClick={() => setSelectedType('all')}
                  className={`px-4 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all backdrop-blur-sm border ${
                    selectedType === 'all' 
                      ? 'bg-white text-black border-white' 
                      : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                  }`}
                >
                  All Listings
                </button>
                <button
                  onClick={() => setSelectedType('roommate')}
                  className={`px-4 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all flex items-center backdrop-blur-sm border ${
                    selectedType === 'roommate' 
                      ? 'bg-white text-black border-white' 
                      : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                  }`}
                >
                  <Users className="w-4 h-4 mr-1.5" />
                  Roommates
                </button>
                <button
                  onClick={() => setSelectedType('bunkmate')}
                  className={`px-4 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all flex items-center backdrop-blur-sm border ${
                    selectedType === 'bunkmate' 
                      ? 'bg-white text-black border-white' 
                      : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                  }`}
                >
                  <Bed className="w-4 h-4 mr-1.5" />
                  Bunkmates
                </button>
                <button
                  onClick={() => setSelectedType('rental')}
                  className={`px-4 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all flex items-center backdrop-blur-sm border ${
                    selectedType === 'rental' 
                      ? 'bg-white text-black border-white' 
                      : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                  }`}
                >
                  <Home className="w-4 h-4 mr-1.5" />
                  Rentals
                </button>
              </div>

              {/* University Filter */}
              <div className="relative">
                <select
                  value={selectedUniversity}
                  onChange={(e) => setSelectedUniversity(e.target.value)}
                  className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:border-white/40 transition-all appearance-none pr-10"
                >
                  {universities.map(uni => (
                    <option key={uni} value={uni} className="bg-black text-white">{uni}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white pointer-events-none" />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-6 pb-24">
        {/* Sponsored Section */}
        {sponsoredItems.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <h2 className="text-xl font-black text-white">Featured Listings</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sponsoredItems.map(item => (
                item.type === 'listing' 
                  ? <ListingCard key={item.id} listing={item} isSponsored />
                  : <BusinessAdCard key={item.id} ad={item} isSponsored />
              ))}
            </div>
          </div>
        )}

        {/* Regular Feed */}
        <div>
          <h2 className="text-xl font-black text-white mb-4">
            All Listings ({regularItems.length})
          </h2>
          
          {regularItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularItems.map(item => (
                item.type === 'listing' 
                  ? <ListingCard key={item.id} listing={item} />
                  : <BusinessAdCard key={item.id} ad={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No listings found</h3>
              <p className="text-gray-400">Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap');
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default TugoExplorePage;