'use client';

import React, { useState } from 'react';

export default function Step1PhoneVerify({ formData, setFormData, handleChange, inputClassName }: any) {
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  // ১. ব্যাকএন্ডে ৬-সংখ্যার ওটিপি পাঠানোর রিকোয়েস্ট
  const handleSendOtp = async () => {
    if (!formData.phone || formData.phone.length < 11) {
      alert('সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন।');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/otp/registration/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setOtpSent(true);
        alert('আপনার মোবাইল নম্বরে ৬-সংখ্যার ওটিপি পাঠানো হয়েছে।');
      } else {
        alert(result.message || 'ওটিপি পাঠাতে সমস্যা হয়েছে।');
      }
    } catch (error) {
      console.error('Send OTP Error:', error);
      alert('সার্ভার কানেকশন এরর!');
    } finally {
      setLoading(false);
    }
  };

  // ২. ওটিপি ভেরিফাই করে টোকেন রিসিভ করা
  const handleVerifyOtp = async () => {
    if (!formData.otp || formData.otp.length !== 6) {
      alert('দয়া করে সঠিক ৬-সংখ্যার ওটিপি কোডটি দিন।');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/otp/registration/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone, otp: formData.otp })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setFormData({ 
          ...formData, 
          isPhoneVerified: true, 
          verificationToken: result.verificationToken 
        });
        alert('মোবাইল নম্বর সফলভাবে ভেরিফাই করা হয়েছে!');
      } else {
        alert(result.message || 'ভুল ওটিপি কোড!');
      }
    } catch (error) {
      console.error('Verify OTP Error:', error);
      alert('সার্ভার কানেকশন এরর!');
    } finally {
      setLoading(false);
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
              disabled={loading}
              className="px-4 py-3 bg-[#16a085] text-white font-semibold text-sm rounded-lg hover:bg-[#12876f] whitespace-nowrap disabled:bg-gray-400"
            >
              {loading ? 'পাঠানো হচ্ছে...' : 'কোড পাঠান'}
            </button>
          )}
        </div>
      </div>

      {otpSent && !formData.isPhoneVerified && (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-3">
          <label className="block text-xs font-semibold text-gray-700">এসএমএস-এর মাধ্যমে প্রাপ্ত ৬-সংখ্যার ওটিপি কোডটি লিখুন</label>
          <div className="flex gap-2">
            <input
              type="text"
              name="otp"
              maxLength={6}               // 🔹 ৬ ডিজিটের ম্যাক্সিমাম লেন্থ
              placeholder="XXXXXX"        // 🔹 ৬টি X প্লেসহোল্ডার
              value={formData.otp}
              onChange={handleChange}
              className={inputClassName}
            />
            <button
              type="button"
              onClick={handleVerifyOtp}
              disabled={loading}
              className="px-4 py-3 bg-gray-900 text-white font-semibold text-sm rounded-lg hover:bg-gray-800 disabled:bg-gray-400"
            >
              {loading ? 'যাচাই করা হচ্ছে...' : 'নিশ্চিত করুন'}
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