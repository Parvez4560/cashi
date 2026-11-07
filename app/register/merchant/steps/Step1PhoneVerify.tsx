'use client';

import React, { useState, useEffect, useRef } from 'react';

interface CountryRule {
  countryName: string;
  countryIso: string;
  dialCode: string;
  uiDialCode: string;
  nationalNumberLength: number;
  shouldStripPrefix: boolean;
  stripLength: number;
  placeholder: string;
  regexPattern: string;
  flag?: string;
}

// দেশগুলোর পতাকা ইমোজি ম্যাপিং
const countryFlags: { [key: string]: string } = {
  BD: '🇧🇩',
  HU: '🇭🇺',
  IN: '🇮🇳',
  PK: '🇵🇰',
  SA: '🇸🇦',
};

export default function Step1PhoneVerify({ formData, setFormData, handleChange, inputClassName }: any) {
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [countries, setCountries] = useState<CountryRule[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<CountryRule | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://cashi-server.onrender.com';

  // বাইরে ক্লিক করলে ড্রপডাউন বন্ধ করার জন্য
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ১. পেজ লোড হলে ব্যাকএন্ড থেকে কান্ট্রি রুলস ফেচ করা
  useEffect(() => {
    const fetchCountryRules = async () => {
      try {
        const res = await fetch(`${API_URL}/api/countries/rules`);
        const result = await res.json();
        if (res.ok && result.success) {
          const formattedData = result.data.map((c: CountryRule) => ({
            ...c,
            flag: countryFlags[c.countryIso] || '🏳️'
          }));

          setCountries(formattedData);
          const defaultCountry = formattedData.find((c: CountryRule) => c.countryIso === 'BD') || formattedData[0];
          setSelectedCountry(defaultCountry);
          
          setFormData((prev: any) => ({
            ...prev,
            countryIso: defaultCountry?.countryIso || 'BD',
            dialCode: defaultCountry?.dialCode || '+880'
          }));
        }
      } catch (err) {
        console.error('Failed to load country rules:', err);
      }
    };

    fetchCountryRules();
  }, [API_URL, setFormData]);

  // দেশ সিলেক션 হ্যান্ডলার
  const handleSelectCountry = (country: CountryRule) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
    
    setFormData({
      ...formData,
      countryIso: country.countryIso,
      dialCode: country.dialCode, // ব্যাকএন্ডে ফুল ডায়াল কোড যাবে
      phone: '',
      fullNumber: ''
    });
  };

  // মোবাইল নম্বর ইনপুট পরিবর্তনের সময় fullNumber জেনারেট করা
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawPhone = e.target.value;
    const cleanPhone = rawPhone.replace(/\D/g, '');

    let processedPhone = cleanPhone;
    if (selectedCountry && selectedCountry.shouldStripPrefix && selectedCountry.stripLength > 0) {
      if (cleanPhone.length > selectedCountry.nationalNumberLength) {
        processedPhone = cleanPhone.slice(selectedCountry.stripLength);
      }
    }

    const fullNum = selectedCountry ? `${selectedCountry.dialCode}${processedPhone}` : cleanPhone;

    setFormData({
      ...formData,
      phone: rawPhone,
      fullNumber: fullNum
    });
  };

  // ২. ওটিপি পাঠানোর রিকোয়েস্ট
  const handleSendOtp = async () => {
    if (!selectedCountry) {
      alert('দয়া করে একটি দেশ নির্বাচন করুন।');
      return;
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < selectedCountry.nationalNumberLength) {
      alert(`দয়া করে সঠিক ${selectedCountry.nationalNumberLength} ডিজিটের মোবাইল নম্বর দিন।`);
      return;
    }

    const regex = new RegExp(selectedCountry.regexPattern);
    if (!regex.test(cleanPhone)) {
      alert(`নম্বরটি সঠিক নয়। অনুগ্রহ করে '${selectedCountry.placeholder}' ফরম্যাটে লিখুন।`);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/otp/registration/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          countryIso: selectedCountry.countryIso,
          mobileNumber: formData.phone,
          fullNumber: formData.fullNumber
        })
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

  // ৩. ওটিপি ভেরিফাই করা
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
        body: JSON.stringify({ 
          countryIso: selectedCountry?.countryIso,
          mobileNumber: formData.phone, 
          otp: formData.otp 
        })
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

      {/* ১. কান্ট্রি সিলেকশন বক্স (পতাকা এবং নাম থাকবে, কোনো শর্ট কোড নয়) */}
      <div className="relative" ref={dropdownRef}>
        <label className="block text-sm font-semibold text-gray-800 mb-1.5">
          দেশ নির্বাচন করুন <span className="text-red-500">*</span>
        </label>
        
        <div 
          onClick={() => !formData.isPhoneVerified && setIsDropdownOpen(!isDropdownOpen)}
          className={`w-full px-4 py-3 bg-white border border-gray-300 rounded-lg flex items-center justify-between cursor-pointer text-sm font-medium text-gray-900 transition-all ${formData.isPhoneVerified ? 'opacity-70 cursor-not-allowed bg-gray-50' : 'hover:border-[#16a085]'}`}
        >
          <div className="flex items-center gap-2.5">
            <span className="text-xl">{selectedCountry?.flag || '🇧🇩'}</span>
            <span>{selectedCountry?.countryName || 'Bangladesh'}</span>
          </div>
          <span className="text-gray-500 text-xs">▼</span>
        </div>

        {/* সুন্দর পপআপ ড্রপডাউন লিস্ট (ডান পাশে ডায়াল কোড সহ) */}
        {isDropdownOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
            {countries.map((c) => (
              <div
                key={c.countryIso}
                onClick={() => handleSelectCountry(c)}
                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-none transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{c.flag}</span>
                  <span className="text-sm font-semibold text-gray-800">{c.countryName}</span>
                </div>
                {/* 🔹 ডান পাশে ডাইরেক্ট dialCode (যেমন: +880) */}
                <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md">{c.dialCode}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ২. মোবাইল নম্বর ইনপুট সেকশন */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-1.5">
          মোবাইল নম্বর <span className="text-red-500">*</span>
        </label>
        
        <div className="flex rounded-lg overflow-hidden border border-gray-300 focus-within:border-[#16a085] focus-within:ring-2 focus-within:ring-[#16a085]/20 bg-white">
          
          {/* 🔹 ইনপুট বক্সের বাম পাশে ফিক্সড uiDialCode (যেমন: +88) */}
          <div className="bg-gray-100 px-3.5 flex items-center justify-center text-gray-700 font-bold text-sm border-r border-gray-300 select-none">
            {selectedCountry?.uiDialCode || '+88'}
          </div>

          {/* মোবাইল নম্বর ইনপুট ফিল্ড */}
          <input
            type="tel"
            name="phone"
            disabled={formData.isPhoneVerified}
            required
            placeholder={selectedCountry?.placeholder || "01XXXXXXXXX"}
            value={formData.phone}
            onChange={handlePhoneChange}
            className="w-full px-4 py-3 outline-none border-none text-gray-950 font-medium text-sm bg-transparent"
          />

          {!formData.isPhoneVerified && (
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={loading}
              className="px-4 py-3 bg-[#16a085] text-white font-semibold text-sm hover:bg-[#12876f] whitespace-nowrap disabled:bg-gray-400 transition"
            >
              {loading ? 'পাঠানো হচ্ছে...' : 'কোড পাঠান'}
            </button>
          )}
        </div>
      </div>

      {/* ৩. ওটিপি ইনপুট সেকশন */}
      {otpSent && !formData.isPhoneVerified && (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-3">
          <label className="block text-xs font-semibold text-gray-700">এসএমএস-এর মাধ্যমে প্রাপ্ত ৬-সংখ্যার ওটিপি কোডটি লিখুন</label>
          <div className="flex gap-2">
            <input
              type="text"
              name="otp"
              maxLength={6}
              placeholder="XXXXXX"
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