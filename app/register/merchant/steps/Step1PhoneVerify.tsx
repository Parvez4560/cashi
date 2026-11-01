import React, { useState } from 'react';

export default function Step1PhoneVerify({ formData, setFormData, handleChange, inputClassName }: any) {
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = () => {
    if (formData.phone.length >= 11) {
      setOtpSent(true);
      alert('আপনার নাম্বারে একটি ভেরিফিকেশন কোড (OTP) পাঠানো হয়েছে। (ডেমো কোড: 1234)');
    } else {
      alert('সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন।');
    }
  };

  const handleVerifyOtp = () => {
    if (formData.otp === '1234' || formData.otp.length === 4) {
      setFormData({ ...formData, isPhoneVerified: true });
      alert('মোবাইল নম্বর সফলভাবে ভেরিফাই করা হয়েছে!');
    } else {
      alert('ভুল ওটিপি কোড! সঠিক কোডটি দিন (ডেমো: 1234)।');
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-900 border-b pb-2">মোবাইল নম্বর ও ভেরিফিকেশন</h3>
      <p className="text-xs text-gray-600">নিজ নামে নিবন্ধিত মোবাইল সিম যেটি দিয়ে অন্য কোনো মার্চেন্ট একাউন্ট নেই সেটি ব্যবহার করুন।</p>

      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-1.5">
          মোবাইল নম্বর <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2">
          <input
            type="tel"
            name="phone"
            disabled={formData.isPhoneVerified}
            required
            placeholder="01XXXXXXXXX"
            value={formData.phone}
            onChange={handleChange}
            className={inputClassName}
          />
          {!formData.isPhoneVerified && (
            <button
              type="button"
              onClick={handleSendOtp}
              className="px-4 py-3 bg-[#16a085] text-white font-semibold text-sm rounded-lg hover:bg-[#12876f] whitespace-nowrap"
            >
              কোড পাঠান
            </button>
          )}
        </div>
      </div>

      {otpSent && !formData.isPhoneVerified && (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-3">
          <label className="block text-xs font-semibold text-gray-700">এসএমএস-এর মাধ্যমে প্রাপ্ত ৪-সংখ্যার ওটিপি কোডটি লিখুন</label>
          <div className="flex gap-2">
            <input
              type="text"
              name="otp"
              maxLength={4}
              placeholder="XXXX"
              value={formData.otp}
              onChange={handleChange}
              className={inputClassName}
            />
            <button
              type="button"
              onClick={handleVerifyOtp}
              className="px-4 py-3 bg-gray-900 text-white font-semibold text-sm rounded-lg hover:bg-gray-800"
            >
              নিশ্চিত করুন
            </button>
          </div>
        </div>
      )}

      {formData.isPhoneVerified && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm font-medium text-center">
          ✓ মোবাইল নম্বর সফলভাবে ভেরিফাই করা হয়েছে।
        </div>
      )}
    </div>
  );
}