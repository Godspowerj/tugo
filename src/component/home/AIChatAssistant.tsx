import React, { useState } from 'react';
import { Sparkles, X, Send } from 'lucide-react';

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
            {/* AI Chat Button - Positioned above bottom nav */}
            <button
                onClick={() => setShowAIChat(true)}
                className="fixed bottom-28 right-6 z-50 w-16 h-16 bg-white text-black rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
            >
                <Sparkles className="w-7 h-7" />
            </button>

            {/* AI Chat Modal - Full overlay above everything */}
            {showAIChat && (
                <div className="fixed inset-0 z-[9999] flex items-end justify-center md:items-center md:p-4">
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setShowAIChat(false)}></div>
                    <div className="relative w-full max-w-2xl h-[85vh] md:h-[600px] bg-gradient-to-b from-gray-900 to-black rounded-t-3xl md:rounded-3xl border border-white/20 flex flex-col shadow-2xl">
                        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/50 backdrop-blur-xl rounded-t-3xl">
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center">
                                    <Sparkles className="w-6 h-6 text-black" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-lg">Tugo AI Assistant</h3>
                                    <p className="text-xs text-gray-400">Always here to help</p>
                                </div>
                            </div>
                            <button onClick={() => setShowAIChat(false)} className="p-2.5 hover:bg-white/10 rounded-full transition-all">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
                            {chatMessages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] px-5 py-3.5 rounded-2xl ${msg.role === 'user'
                                            ? 'bg-white text-black font-medium'
                                            : 'bg-white/10 text-white border border-white/20'
                                        }`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 border-t border-white/10 bg-black/50 backdrop-blur-xl md:rounded-b-3xl">
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Ask me anything..."
                                    className="flex-1 px-5 py-3.5 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-all"
                                />
                                <button onClick={handleSendMessage} className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-lg">
                                    <Send className="w-5 h-5" />
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
