"use client";
import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Users,
  Home,
  Bed,
  Calendar,
  Star,
  CheckCircle,
  MessageCircle,
  SlidersHorizontal,
  ExternalLink,
  UtensilsCrossed,
  Scissors,
  ShoppingBag,
  ChevronDown,
  X,
  Send,
  Sparkles,
} from "lucide-react";
import ModalLayout from "../../component/MainLayout";

interface Listing {
  id: string;
  type: "listing";
  listingType: "roommate" | "bunkmate" | "rental";
  title: string;
  description: string;
  price: number;
  priceType: "monthly" | "weekly" | "daily";
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
  type: "business";
  businessType: "eatery" | "barber" | "service";
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

// Mock data (fallback if API fails)
const defaultFeedItems: FeedItem[] = [
  {
    id: "1",
    type: "listing",
    listingType: "roommate",
    title: "Spacious Room Near Campus",
    description:
      "Looking for a clean, responsible roommate. Apartment is 10 mins walk from university. Fully furnished with WiFi included.",
    price: 450,
    priceType: "monthly",
    university: "University of Lagos",
    location: "Yaba, Lagos",
    isSponsored: true,
    posterName: "Chioma A.",
    posterImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    posterPhone: "+2348012345678",
    posterVerified: true,
    propertyImage:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
    availableFrom: "Jan 1, 2025",
  },
  {
    id: "b1",
    type: "business",
    businessType: "eatery",
    title: "Campus Bites Restaurant",
    description: "20% off for all UNILAG students! Fresh meals, fast delivery.",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
    link: "https://wa.me/2348012345678",
    targetUniversity: "University of Lagos",
    location: "Akoka, Lagos",
    isSponsored: true,
    ctaText: "Order Now",
    rating: 4.8,
    priceRange: "₦₦",
  },
];

const universities = [
  "All Universities",
  "University of Lagos",
  "University of Ibadan",
  "Covenant University",
  "Lagos State University",
];

const TugoExplorePage: React.FC = () => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>(defaultFeedItems);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedUniversity, setSelectedUniversity] =
    useState<string>("All Universities");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [showAIChat, setShowAIChat] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm your Tugo assistant. How can I help you find the perfect accommodation today?",
    },
  ]);
  const [chatInput, setChatInput] = useState("");

  // Fetch listings from backend (client-side only)
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const token =
          typeof window !== "undefined"
            ? localStorage.getItem("accessToken")
            : null;

        const response = await fetch(`${apiUrl}/api/listings`, {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && Array.isArray(data.data)) {
            setFeedItems(data.data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch listings:", err);
        // Keep default feed items if fetch fails
      }
    };

    fetchListings();
  }, []);

  const filteredItems = feedItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());

    if (item.type === "listing") {
      const matchesType =
        selectedType === "all" || selectedType === item.listingType;
      const matchesUniversity =
        selectedUniversity === "All Universities" ||
        item.university === selectedUniversity;
      return matchesType && matchesUniversity && matchesSearch;
    } else {
      const matchesUniversity =
        selectedUniversity === "All Universities" ||
        item.targetUniversity === selectedUniversity;
      return matchesUniversity && matchesSearch;
    }
  });

  const sponsoredItems = filteredItems.filter((item) => item.isSponsored);
  const regularItems = filteredItems.filter((item) => !item.isSponsored);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "roommate":
        return <Users className="w-4 h-4" />;
      case "bunkmate":
        return <Bed className="w-4 h-4" />;
      case "rental":
        return <Home className="w-4 h-4" />;
      default:
        return <Home className="w-4 h-4" />;
    }
  };

  const getBusinessIcon = (type: string) => {
    switch (type) {
      case "eatery":
        return <UtensilsCrossed className="w-5 h-5" />;
      case "barber":
        return <Scissors className="w-5 h-5" />;
      case "service":
        return <ShoppingBag className="w-5 h-5" />;
      default:
        return <ShoppingBag className="w-5 h-5" />;
    }
  };

  // Guard: only run on client
    const openWhatsApp = (phone: string, title: string) => {
    if (typeof window === "undefined") return;
    const message = encodeURIComponent(`Hi! I'm interested in your listing: ${title}`);
    window.open(`https://wa.me/${phone.replace(/\+/g, "")}?text=${message}`, "_blank");
  };

  // Guard: only run on client
  const handleOpenLink = (link: string) => {
    if (typeof window === "undefined") return;
    window.open(link, "_blank");
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    setChatMessages([
      ...chatMessages,
      { role: "user", content: chatInput },
      {
        role: "assistant",
        content:
          "I'm analyzing your request. Let me help you find the best matches based on your preferences!",
      },
    ]);
    setChatInput("");
  };

  const ListingCard: React.FC<{
    listing: Listing;
    isSponsored?: boolean;
  }> = ({ listing, isSponsored = false }) => (
    <div
      className={`rounded-3xl overflow-hidden transition-all duration-300 backdrop-blur-sm group ${
        isSponsored
          ? "bg-gradient-to-br from-white/15 to-white/5 border border-white/20"
          : "bg-gradient-to-b from-white/10 to-white/5 border border-white/20 hover:border-white/40"
      }`}
    >
      <div className="relative h-80 md:h-96 overflow-hidden">
        <img
          src={listing.propertyImage}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={listing.posterImage}
                alt={listing.posterName}
                className="w-12 h-12 rounded-full border-2 border-white/80 object-cover"
              />
              {listing.posterVerified && (
                <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-0.5">
                  <CheckCircle className="w-4 h-4 text-white fill-current" />
                </div>
              )}
            </div>
            <div>
              <p className="text-white font-bold">{listing.posterName}</p>
              <p className="text-white/70 text-sm flex items-center gap-1">
                {listing.posterVerified && <CheckCircle className="w-3 h-3" />}
                Verified User
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-white/95 text-black backdrop-blur-sm">
            {getTypeIcon(listing.listingType)}
            <span className="capitalize">{listing.listingType}</span>
          </span>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-bold text-white flex-1">
            {listing.title}
          </h3>
          <div className="text-right">
            <span className="text-2xl font-black text-white">
              ₦{listing.price.toLocaleString()}
            </span>
            <div className="text-sm text-gray-400">
              per{" "}
              {listing.priceType === "monthly"
                ? "month"
                : listing.priceType}
            </div>
          </div>
        </div>

        <p className="text-gray-400 leading-relaxed">{listing.description}</p>

        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-400">
            <Home className="w-4 h-4 mr-2" />
            <span>{listing.university}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-400">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{listing.location}</span>
            </div>
            <div className="flex items-center text-sm text-gray-400">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{listing.availableFrom}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-4">
          <button
            onClick={() => openWhatsApp(listing.posterPhone, listing.title)}
            className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-black px-4 py-3.5 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Contact</span>
          </button>
        </div>

        {isSponsored && (
          <div className="pt-3 border-t border-white/10">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
              <span className="font-semibold">Sponsored Listing</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const BusinessAdCard: React.FC<{
    ad: BusinessAd;
    isSponsored?: boolean;
    isCompact?: boolean;
  }> = ({ ad, isSponsored = false, isCompact = false }) => (
    <div
      className={`rounded-3xl overflow-hidden transition-all duration-300 backdrop-blur-sm group ${
        isCompact ? "col-span-1" : "md:col-span-2"
      } ${
        isSponsored
          ? "bg-gradient-to-br from-white/15 to-white/5 border border-white/20"
          : "bg-gradient-to-br from-white/12 to-white/5 border border-white/20 hover:border-white/40"
      }`}
    >
      <div className={`relative ${isCompact ? "h-48" : "h-64 md:h-80"} overflow-hidden`}>
        <img
          src={ad.image}
          alt={ad.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

        <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full">
          {getBusinessIcon(ad.businessType)}
          <span className="text-black text-xs font-bold uppercase">
            {ad.businessType}
          </span>
        </div>

        {ad.rating && (
          <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-yellow-400 px-3 py-2 rounded-full">
            <Star className="w-4 h-4 fill-black text-black" />
            <span className="text-black text-sm font-black">{ad.rating}</span>
          </div>
        )}
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <h3
            className={`${
              isCompact ? "text-lg" : "text-xl"
            } font-bold text-white flex-1`}
          >
            {ad.title}
          </h3>
          {ad.priceRange && (
            <span className="text-sm font-bold text-gray-300 bg-white/10 px-3 py-1 rounded-full">
              {ad.priceRange}
            </span>
          )}
        </div>

        <p
          className={`text-gray-400 leading-relaxed ${
            isCompact ? "text-sm" : ""
          }`}
        >
          {ad.description}
        </p>

        <div className="flex items-center text-sm text-gray-400">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{ad.location}</span>
        </div>

        <button
          onClick={() => handleOpenLink(ad.link)}
          className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-black px-4 py-3.5 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95"
        >
          <span>{ad.ctaText}</span>
          <ExternalLink className="w-5 h-5" />
        </button>

        {isSponsored && (
          <div className="pt-3 border-t border-white/10">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <Star className="w-3.5 h-3.5 text-purple-500 fill-purple-500" />
              <span className="font-semibold">Sponsored Business</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <ModalLayout>
      <div className="min-h-screen bg-black text-white overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative z-10 bg-black/80 backdrop-blur-xl border-b border-white/10 sticky top-0">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-400"></div>
                </div>
                <h1 className="text-2xl font-black text-white tracking-tight">
                  Tugo
                </h1>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  showFilters
                    ? "bg-white text-black"
                    : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>

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

            {showFilters && (
              <div className="mt-4 space-y-4">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  <button
                    onClick={() => setSelectedType("all")}
                    className={`px-4 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                      selectedType === "all"
                        ? "bg-white text-black"
                        : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setSelectedType("roommate")}
                    className={`px-4 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all flex items-center ${
                      selectedType === "roommate"
                        ? "bg-white text-black"
                        : "bg-white/10 text-white border border-white/20"
                    }`}
                  >
                    <Users className="w-4 h-4 mr-1.5" />
                    Roommates
                  </button>
                  <button
                    onClick={() => setSelectedType("bunkmate")}
                    className={`px-4 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all flex items-center ${
                      selectedType === "bunkmate"
                        ? "bg-white text-black"
                        : "bg-white/10 text-white border border-white/20"
                    }`}
                  >
                    <Bed className="w-4 h-4 mr-1.5" />
                    Bunkmates
                  </button>
                  <button
                    onClick={() => setSelectedType("rental")}
                    className={`px-4 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all flex items-center ${
                      selectedType === "rental"
                        ? "bg-white text-black"
                        : "bg-white/10 text-white border border-white/20"
                    }`}
                  >
                    <Home className="w-4 h-4 mr-1.5" />
                    Rentals
                  </button>
                </div>
                <div className="relative">
                  <select
                    value={selectedUniversity}
                    onChange={(e) => setSelectedUniversity(e.target.value)}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none appearance-none pr-10"
                  >
                    {universities.map((uni) => (
                      <option
                        key={uni}
                        value={uni}
                        className="bg-black"
                      >
                        {uni}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white pointer-events-none" />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-6 pb-32">
          {sponsoredItems.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-black text-white mb-6">
                Featured Listings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sponsoredItems.map((item, idx) =>
                  item.type === "listing" ? (
                    <ListingCard key={item.id} listing={item} isSponsored />
                  ) : (
                    <BusinessAdCard
                      key={item.id}
                      ad={item}
                      isSponsored
                      isCompact={idx % 3 !== 0}
                    />
                  )
                )}
              </div>
            </div>
          )}

          <div>
            <h2 className="text-2xl font-black text-white mb-6">
              All Listings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {regularItems.map((item, idx) =>
                item.type === "listing" ? (
                  <ListingCard key={item.id} listing={item} />
                ) : (
                  <BusinessAdCard
                    key={item.id}
                    ad={item}
                    isCompact={idx % 3 !== 0}
                  />
                )
              )}
            </div>
          </div>
        </div>

        {/* AI Chat Button */}
        <button
          onClick={() => setShowAIChat(true)}
          className="fixed bottom-20 right-6 z-50 w-14 h-14 bg-white text-black rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
        >
          <Sparkles className="w-6 h-6" />
        </button>

        {/* AI Chat Modal */}
        {showAIChat && (
          <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center md:p-4">
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowAIChat(false)}
            ></div>
            <div className="relative w-full max-w-2xl h-[80vh] md:h-[600px] bg-gradient-to-b from-gray-900 to-black rounded-t-3xl md:rounded-3xl border border-white/20 flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Tugo AI Assistant</h3>
                    <p className="text-xs text-gray-400">Always here to help</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAIChat(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                        msg.role === "user"
                          ? "bg-white text-black"
                          : "bg-white/10 text-white border border-white/20"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-white/10">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleSendMessage()
                    }
                    placeholder="Ask me anything..."
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-white/40"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap');
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </div>
    </ModalLayout>
  );
};

export default TugoExplorePage;