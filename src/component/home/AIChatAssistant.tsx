import React, { useState } from 'react';
import { X, Send } from 'lucide-react';

interface AIChatAssistantProps {
    showAIChat: boolean;
    setShowAIChat: (show: boolean) => void;
    chatMessages: { role: string; content: string }[];
    setChatMessages: (messages: { role: string; content: string }[]) => void;
    chatInput: string;
    setChatInput: (input: string) => void;
}

const AIChatAssistant: React.FC<AIChatAssistantProps> = ({
    showAIChat,
    setShowAIChat,
    chatMessages,
    setChatMessages,
    chatInput,
    setChatInput,
}) => {
    const handleSendMessage = () => {
        if (!chatInput.trim()) return;

        setChatMessages([...chatMessages,
        { role: 'user', content: chatInput },
        { role: 'assistant', content: 'I\'m analyzing your request. Let me help you find the best matches based on your preferences!' }
        ]);
        setChatInput('');
    };

    return (
        <>
            {/* AI Chat Button - Fixed positioning for mobile */}
            <button
                onClick={() => setShowAIChat(true)}
                className="fixed bottom-24 sm:bottom-28 right-4 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform text-3xl sm:text-4xl"
                aria-label="Open AI Assistant"
            >
                🤖
            </button>

            {/* AI Chat Modal - Fully responsive */}
            {showAIChat && (
                <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center sm:p-4">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black/90 backdrop-blur-sm" 
                        onClick={() => setShowAIChat(false)}
                    ></div>
                    
                    {/* Modal */}
                    <div className="relative w-full sm:max-w-2xl h-[90vh] sm:h-[600px] bg-gradient-to-b from-gray-900 to-black rounded-t-3xl sm:rounded-3xl border border-white/20 flex flex-col shadow-2xl">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-black/50 backdrop-blur-xl rounded-t-3xl">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="w-10 h-10 sm:w-11 sm:h-11 bg-white rounded-full flex items-center justify-center text-2xl sm:text-3xl">
                                    🤖
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-base sm:text-lg">Tugo AI Assistant</h3>
                                    <p className="text-xs text-gray-400">Always here to help</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setShowAIChat(false)} 
                                className="p-2 sm:p-2.5 hover:bg-white/10 rounded-full transition-all flex-shrink-0"
                            >
                                <X className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4 scrollbar-hide">
                            {chatMessages.map((msg, idx) => (
                                <div 
                                    key={idx} 
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[85%] sm:max-w-[80%] px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl text-sm sm:text-base ${
                                        msg.role === 'user'
                                            ? 'bg-white text-black font-medium'
                                            : 'bg-white/10 text-white border border-white/20'
                                    }`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="p-3 sm:p-4 border-t border-white/10 bg-black/50 backdrop-blur-xl sm:rounded-b-3xl">
                            <div className="flex gap-2 sm:gap-3">
                                <input
                                    type="text"
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Ask me anything..."
                                    className="flex-1 px-4 sm:px-5 py-3 sm:py-3.5 bg-white/10 border border-white/20 rounded-full text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-all"
                                />
                                <button 
                                    onClick={handleSendMessage} 
                                    className="w-12 h-12 sm:w-14 sm:h-14 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-lg flex-shrink-0"
                                    aria-label="Send message"
                                >
                                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </>
    );
};

export default AIChatAssistant;