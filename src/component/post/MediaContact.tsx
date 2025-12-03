import React from 'react';
import { X, ImageIcon, Phone } from 'lucide-react';
import { usePost } from '@/src/context/PostContext';

export default function MediaContact() {
    const {
        studentListingData,
        businessAdData,
        updateStudentListing,
        updateBusinessAd,
        imagePreviews,
        handleImageUpload,
        removeImage,
        isStudentListing
    } = usePost();

    const images = isStudentListing ? studentListingData.images : businessAdData.images;
    const phoneNumber = isStudentListing ? studentListingData.phoneNumber : businessAdData.phoneNumber;

    const setPhoneNumber = (phone: string) => {
        if (isStudentListing) {
            updateStudentListing({ phoneNumber: phone });
        } else {
            updateBusinessAd({ phoneNumber: phone });
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-black mb-2">Add Photos & Contact</h2>
                <p className="text-gray-400">Help people find you</p>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Photos * (Max 5)
                    </label>

                    {imagePreviews.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                            {imagePreviews.map((preview, idx) => (
                                <div key={idx} className="relative group">
                                    <img src={preview} alt={`Preview ${idx + 1}`} className="w-full h-32 object-cover rounded-xl border border-white/20" />
                                    <button onClick={() => removeImage(idx)} className="absolute top-2 right-2 p-1.5 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                        <X className="w-4 h-4" />
                                    </button>
                                    {idx === 0 && (
                                        <div className="absolute bottom-2 left-2 bg-white/90 text-black text-xs font-bold px-2 py-1 rounded">Cover</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {images.length < 5 && (
                        <label className="block w-full p-8 bg-white/5 border-2 border-dashed border-white/20 rounded-xl hover:border-white/40 transition-all cursor-pointer group">
                            <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                            <div className="text-center">
                                <ImageIcon className="w-12 h-12 mx-auto mb-3 text-gray-400 group-hover:text-white transition-colors" />
                                <p className="text-sm text-gray-400 group-hover:text-white transition-colors">
                                    Click to upload photos ({images.length}/5)
                                </p>
                            </div>
                        </label>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Phone Number (WhatsApp) *</label>
                    <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="+234 800 123 4567"
                            className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 outline-none focus:border-white/30 transition-all"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
