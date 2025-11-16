// MatchesPage.tsx
"use client"
import React, { useState } from 'react';
import { X, MessageCircle, MapPin, GraduationCap, Star, Search, Filter, Phone, Video, MoreVertical, Send, ArrowLeft, User } from 'lucide-react';
import BottomNav from '@/src/components/navigation';

// Types
interface Message {
  id: number;
  text: string;
  sent: boolean;
  time: string;
}

interface Match {
  id: number;
  name: string;
  age: number;
  image: string;
  university: string;
  major: string;
  year: string;
  location: string;
  matchScore: number;
  bio: string;
  lookingFor: string;
  lifestyle: string[];
  budget: string;
  preferences: string[];
  lastMessage: string | null;
  lastMessageTime: string | null;
  unread: number;
  online: boolean;
  messages: Message[];
}

interface FilterOptions {
  minMatch: number;
  budget: string;
  lifestyle: string[];
}

const TugoMatchesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [messageInput, setMessageInput] = useState<string>('');
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    minMatch: 70,
    budget: 'all',
    lifestyle: []
  });

  // Sample matches data
  const matches: Match[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      age: 20,
      image: '👩🏽‍💻',
      university: 'University of Lagos',
      major: 'Computer Science',
      year: '2nd Year',
      location: 'Yaba, Lagos',
      matchScore: 92,
      bio: 'Looking for a clean, organized roommate who values study time.',
      lookingFor: 'A tidy roommate who respects quiet hours during exams.',
      lifestyle: ['Early Bird', 'Clean', 'Foodie'],
      budget: '₦50,000 - ₦100,000',
      preferences: ['Shared Room', 'Apartment'],
      lastMessage: 'Hey! I saw your profile and thought we\'d be a great match!',
      lastMessageTime: '2m ago',
      unread: 2,
      online: true,
      messages: [
        { id: 1, text: 'Hey! I saw your profile and thought we\'d be a great match!', sent: false, time: '10:30 AM' },
        { id: 2, text: 'Hi Sarah! Thanks for reaching out. I think we\'d get along great too!', sent: true, time: '10:32 AM' },
        { id: 3, text: 'That\'s awesome! When are you looking to move in?', sent: false, time: '10:35 AM' },
        { id: 4, text: 'I\'m hoping to find a place by next month. How about you?', sent: true, time: '10:38 AM' },
        { id: 5, text: 'Same here! We should definitely meet up and talk more about it.', sent: false, time: 'Just now' }
      ]
    },
    {
      id: 2,
      name: 'Michael Okafor',
      age: 21,
      image: '👨🏾‍💻',
      university: 'University of Lagos',
      major: 'Engineering',
      year: '3rd Year',
      location: 'Akoka, Lagos',
      matchScore: 85,
      bio: 'Chill guy who loves gaming and tech.',
      lookingFor: 'A laid-back roommate who is okay with gaming sessions.',
      lifestyle: ['Night Owl', 'Gamer', 'Introvert'],
      budget: '₦50,000 - ₦100,000',
      preferences: ['Shared Room'],
      lastMessage: 'Sounds good! Let me know when works for you.',
      lastMessageTime: '1d ago',
      unread: 0,
      online: true,
      messages: [
        { id: 1, text: 'Hey! Interested in grabbing coffee to discuss living arrangements?', sent: true, time: 'Yesterday' },
        { id: 2, text: 'Sounds good! Let me know when works for you.', sent: false, time: 'Yesterday' }
      ]
    },
    {
      id: 3,
      name: 'Amara Williams',
      age: 19,
      image: '👩🏾‍🎤',
      university: 'University of Lagos',
      major: 'Mass Communication',
      year: '1st Year',
      location: 'Surulere, Lagos',
      matchScore: 78,
      bio: 'Outgoing and creative! Love hosting gatherings.',
      lookingFor: 'An extroverted, social roommate who enjoys activities together.',
      lifestyle: ['Social', 'Creative', 'Early Bird'],
      budget: '₦100,000 - ₦200,000',
      preferences: ['Studio', 'Apartment'],
      lastMessage: null,
      lastMessageTime: null,
      unread: 0,
      online: false,
      messages: []
    }
  ];

  const handleSendMessage = (): void => {
    if (messageInput.trim() && selectedMatch) {
      const newMessage: Message = {
        id: selectedMatch.messages.length + 1,
        text: messageInput,
        sent: true,
        time: 'Just now'
      };
      
      selectedMatch.messages.push(newMessage);
      setMessageInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const filteredMatches: Match[] = matches.filter(match => {
    const matchesSearch = match.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         match.major.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesScore = match.matchScore >= filterOptions.minMatch;
    return matchesSearch && matchesScore;
  });

  const activeChats: Match[] = filteredMatches.filter(m => m.lastMessage);
  const newMatches: Match[] = filteredMatches.filter(m => !m.lastMessage);

  return (
    <div className="relative flex flex-col min-h-screen bg-black text-white overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Matches List View */}
      {!selectedMatch ? (
        <div className="relative z-10 flex flex-col flex-1">
          {/* Header */}
          <header className="px-4 sm:px-6 py-4 sm:py-6 space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-white"></div>
                  <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-gray-400"></div>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Tugo</h2>
              </div>
            </div>

            <div className="max-w-7xl mx-auto">
              <h1 className="text-2xl sm:text-3xl font-black">Your Matches</h1>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">
                {filteredMatches.length} connections • {activeChats.length} conversations
              </p>
            </div>

            {/* Search & Filter */}
            <div className="flex gap-2 sm:gap-3 max-w-7xl mx-auto">
              <div className="flex-1 relative">
                <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                  placeholder="Search matches..."
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl text-white text-sm placeholder-gray-500 outline-none focus:border-white/30 transition-all"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl sm:rounded-2xl transition-all flex-shrink-0"
              >
                <Filter className="w-4 sm:w-5 h-4 sm:h-5" />
              </button>
            </div>

            {showFilters && (
              <div className="p-3 sm:p-4 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl space-y-3 sm:space-y-4 animate-slide-down max-w-7xl mx-auto">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm">Filters</h3>
                  <button onClick={() => setShowFilters(false)} className="text-gray-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <label className="text-xs text-gray-400 font-semibold mb-2 block">
                    Minimum Match Score: {filterOptions.minMatch}%
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={filterOptions.minMatch}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                      setFilterOptions({...filterOptions, minMatch: parseInt(e.target.value)})
                    }
                    className="w-full"
                  />
                </div>
              </div>
            )}
          </header>

          {/* Matches List */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-24 sm:pb-28 space-y-4 sm:space-y-6">
            <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
            {/* Active Conversations */}
            {activeChats.length > 0 && (
              <div className="space-y-2 sm:space-y-3">
                <h2 className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-wide">
                  Active Conversations ({activeChats.length})
                </h2>
                <div className="space-y-2 sm:space-y-3">
                  {activeChats.map(match => (
                    <button
                      key={match.id}
                      onClick={() => setSelectedMatch(match)}
                      className="w-full p-3 sm:p-4 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-white/30 rounded-xl sm:rounded-2xl transition-all group"
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="relative flex-shrink-0">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-white/10 flex items-center justify-center text-2xl sm:text-3xl">
                            {match.image}
                          </div>
                          {match.online && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-black"></div>
                          )}
                          {match.unread > 0 && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full flex items-center justify-center">
                              <span className="text-black text-xs font-bold">{match.unread}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex-1 text-left min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-1.5 sm:gap-2">
                              <h3 className="font-bold text-base sm:text-lg truncate">{match.name}, {match.age}</h3>
                              <div className="flex items-center gap-1 px-1.5 sm:px-2 py-0.5 bg-white/20 rounded-full flex-shrink-0">
                                <Star className="w-2.5 sm:w-3 h-2.5 sm:h-3 fill-white" />
                                <span className="text-xs font-bold">{match.matchScore}%</span>
                              </div>
                            </div>
                            <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{match.lastMessageTime}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-400 text-xs mb-1.5 sm:mb-2">
                            <GraduationCap className="w-3 h-3" />
                            <span className="truncate">{match.major}</span>
                          </div>
                          <p className={`text-xs sm:text-sm line-clamp-1 ${match.unread > 0 ? 'text-white font-semibold' : 'text-gray-400'}`}>
                            {match.lastMessage}
                          </p>
                        </div>

                        <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-hover:text-white transition-colors flex-shrink-0" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* New Matches */}
            {newMatches.length > 0 && (
              <div className="space-y-2 sm:space-y-3">
                <h2 className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-wide">
                  New Matches ({newMatches.length})
                </h2>
                <div className="space-y-2 sm:space-y-3">
                  {newMatches.map(match => (
                    <button
                      key={match.id}
                      onClick={() => setSelectedMatch(match)}
                      className="w-full p-3 sm:p-4 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-white/30 rounded-xl sm:rounded-2xl transition-all group"
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-white/10 flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0">
                          {match.image}
                        </div>

                        <div className="flex-1 text-left min-w-0">
                          <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                            <h3 className="font-bold text-base sm:text-lg truncate">{match.name}, {match.age}</h3>
                            <div className="flex items-center gap-1 px-1.5 sm:px-2 py-0.5 bg-white/20 rounded-full flex-shrink-0">
                              <Star className="w-2.5 sm:w-3 h-2.5 sm:h-3 fill-white" />
                              <span className="text-xs font-bold">{match.matchScore}%</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                            <GraduationCap className="w-3 h-3" />
                            <span className="truncate">{match.major} • {match.year}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-400 text-xs mb-1.5 sm:mb-2">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate">{match.location}</span>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-400 line-clamp-2">{match.bio}</p>
                        </div>

                        <div className="flex flex-col items-center gap-1.5 sm:gap-2 flex-shrink-0">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 group-hover:bg-white group-hover:text-black flex items-center justify-center transition-all">
                            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                          </div>
                          <span className="text-xs text-gray-500 group-hover:text-white transition-colors">
                            Say Hi
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {filteredMatches.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 sm:py-20 text-center">
                <div className="text-4xl sm:text-6xl mb-4">🔍</div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">No matches found</h3>
                <p className="text-sm sm:text-base text-gray-400">Try adjusting your search or filters</p>
              </div>
            )}
            </div>
          </div>
        </div>
      ) : (
        /* Chat View */
        <div className="relative z-10 flex flex-col flex-1">
          {/* Chat Header */}
          <header className="px-4 sm:px-6 py-3 sm:py-4 bg-black/80 backdrop-blur-lg border-b border-white/10">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <button
                  onClick={() => setSelectedMatch(null)}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all flex-shrink-0"
                >
                  <ArrowLeft className="w-4 sm:w-5 h-4 sm:h-5" />
                </button>
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/10 flex items-center justify-center text-lg sm:text-xl">
                      {selectedMatch.image}
                    </div>
                    {selectedMatch.online && (
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full border-2 border-black"></div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-sm sm:text-base truncate">{selectedMatch.name}</h3>
                    <p className="text-xs text-gray-400">
                      {selectedMatch.online ? 'Online now' : 'Offline'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
                  <Phone className="w-4 sm:w-5 h-4 sm:h-5" />
                </button>
                <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
                  <Video className="w-4 sm:w-5 h-4 sm:h-5" />
                </button>
                <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
                  <MoreVertical className="w-4 sm:w-5 h-4 sm:h-5" />
                </button>
              </div>
            </div>
          </header>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6 space-y-3 sm:space-y-4 pb-32">
            <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
            {selectedMatch.messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-8">
                <div className="text-4xl sm:text-6xl mb-4">{selectedMatch.image}</div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">Say hello to {selectedMatch.name}!</h3>
                <p className="text-sm sm:text-base text-gray-400 mb-4">Start a conversation with your new match</p>
              </div>
            ) : (
              selectedMatch.messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sent ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] sm:max-w-xs ${msg.sent ? 'order-2' : 'order-1'}`}>
                    <div className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl ${
                      msg.sent 
                        ? 'bg-white text-black rounded-br-sm' 
                        : 'bg-white/10 text-white rounded-bl-sm'
                    }`}>
                      <p className="text-xs sm:text-sm leading-relaxed">{msg.text}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 px-2">{msg.time}</p>
                  </div>
                </div>
              ))
            )}
            </div>
          </div>

          {/* Message Input */}
          <div className="absolute bottom-20 sm:bottom-24 left-0 right-0 px-4 sm:px-6 py-3 sm:py-4 bg-black/80 backdrop-blur-lg border-t border-white/10">
            <div className="flex items-center gap-2 sm:gap-3 max-w-4xl mx-auto">
              <input
                type="text"
                value={messageInput}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessageInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 px-4 sm:px-5 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-full text-white text-sm placeholder-gray-500 outline-none focus:border-white/30 transition-all"
              />
              <button
                onClick={handleSendMessage}
                disabled={!messageInput.trim()}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
                  messageInput.trim()
                    ? 'bg-white text-black hover:bg-gray-100'
                    : 'bg-white/20 text-gray-500'
                }`}
              >
                <Send className="w-4 sm:w-5 h-4 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
      
      <BottomNav/>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap');
        
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
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .safe-area-bottom {
          padding-bottom: max(12px, env(safe-area-inset-bottom));
        }
      `}</style>
    </div>
  );
};

export default TugoMatchesPage;