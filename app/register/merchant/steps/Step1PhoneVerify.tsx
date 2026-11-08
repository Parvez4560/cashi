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
}

export default function Step1PhoneVerify({ formData, setFormData, handleChange, inputClassName }: any) {
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [countries, setCountries] = useState<CountryRule[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<CountryRule | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

  useEffect(() => {
    const fetchCountryRules = async () => {
      try {
        const res = await fetch(`${API_URL}/api/countries/rules`);
        const result = await res.json();
        if (res.ok && result.success) {
          setCountries(result.data);
          const defaultCountry = result.data.find((c: CountryRule) => c.countryIso === 'BD') || result.data[0];
          setSelectedCountry(defaultCountry);
          
          setFormData((prev: any) => ({
            ...prev,
            countryName: defaultCountry?.countryName || '',
            countryIso: defaultCountry?.countryIso || '',
            dialCode: defaultCountry?.dialCode || ''
          }));
        }
      } catch (err) {
        console.error('Failed to load country rules:', err);
      }
    };

    fetchCountryRules();
  }, [API_URL, setFormData]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectCountry = (country: CountryRule) => {
    setSelectedCountry(country);
    setFormData({
      ...formData,
      countryName: country.countryName,
      countryIso: country.countryIso,
      dialCode: country.dialCode,
      localNumber: '',
      mobileNumber: ''
    });
    setIsModalOpen(false);
    setSearchQuery('');
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawPhone = e.target.value;
    const cleanPhone = rawPhone.replace(/\D/g, '');

    let processedNationalNumber = cleanPhone;
    if (selectedCountry && selectedCountry.shouldStripPrefix && selectedCountry.stripLength > 0) {
      if (cleanPhone.length > selectedCountry.stripLength && cleanPhone.startsWith('0')) {
        processedNationalNumber = cleanPhone.slice(selectedCountry.stripLength);
      }
    }

    // dialCode + processedNationalNumber মিলিয়ে ফুল মোবাইল নম্বর তৈরি
    const fullMobileNumber = selectedCountry ? `${selectedCountry.dialCode}${processedNationalNumber}` : cleanPhone;

    setFormData({
      ...formData,
      localNumber: rawPhone,          // লোকাল নম্বর (UI ইনপুট বক্সের জন্য)
      mobileNumber: fullMobileNumber   // আসল ফুল নম্বর (সার্ভার ও এপিআই-এর জন্য)
    });
  };

  const handleSendOtp = async () => {
    if (!selectedCountry) {
      alert('দয়া করে একটি দেশ নির্বাচন করুন।');
      return;
    }

    const cleanLocalPhone = formData.localNumber ? formData.localNumber.trim() : '';
    
    if (!cleanLocalPhone) {
      alert('দয়া করে মোবাইল নম্বর লিখুন।');
      return;
    }

    const regex = new RegExp(selectedCountry.regexPattern);
    if (!regex.test(cleanLocalPhone)) {
      alert(`নম্বরটি সঠিক নয়। অনুগ্রহ করে '${selectedCountry.placeholder}' ফরম্যাটে সঠিক নম্বর দিন।`);
      return;
    }

    setLoading(true);
    try {
      // ব্যাকএন্ডে ফুল মোবাইল নম্বর (mobileNumber: +88017...) পাঠানো হচ্ছে
      const response = await fetch(`${API_URL}/api/otp/registration/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          countryIso: selectedCountry.countryIso,
          mobileNumber: formData.mobileNumber 
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setOtpSent(true);
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
          mobileNumber: formData.mobileNumber, 
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

  const filteredCountries = countries.filter(c => 
    c.countryName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.dialCode.includes(searchQuery) ||
    c.uiDialCode.includes(searchQuery) ||
    c.countryIso.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-900 border-b pb-2">মোবাইল নম্বর ও ভেরিফিকেশন</h3>
      <p className="text-xs text-gray-600">নিজ নামে নিবন্ধিত মোবাইল সিম যেটি দিয়ে অন্য কোনো মার্চেন্ট একাউন্ট নেই সেটি ব্যবহার করুন।</p>

      <div className="space-y-2">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            দেশ নির্বাচন করুন <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            disabled={formData.isPhoneVerified}
            className="w-full flex items-center justify-between px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 font-medium text-sm hover:bg-gray-100 transition"
          >
            <span className="font-semibold text-gray-800">
              {selectedCountry ? selectedCountry.countryName : 'দেশ নির্বাচন করুন'}
            </span>
            <span className="text-xs text-gray-500">পরিবর্তন করুন ▼</span>
          </button>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            মোবাইল নম্বর <span className="text-red-500">*</span>
          </label>

          <div className="flex gap-2">
            <div className="px-3.5 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-950 font-bold text-sm flex items-center justify-center min-w-[65px]">
              {selectedCountry?.uiDialCode || '+88'}
            </div>

            <input
              type="tel"
              name="localNumber"
              disabled={formData.isPhoneVerified}
              required
              placeholder={selectedCountry?.placeholder || "01XXXXXXXXX"}
              value={formData.localNumber || ''}
              onChange={handlePhoneChange}
              className={inputClassName}
            />

            {!formData.isPhoneVerified && (
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={loading}
                className="px-4 py-3 bg-[#16a085] text-white font-semibold text-sm rounded-lg hover:bg-[#12876f] whitespace-nowrap disabled:bg-gray-400 transition"
              >
                {loading ? 'পাঠানো হচ্ছে...' : 'কোড পাঠান'}
              </button>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs px-4">
          <div ref={modalRef} className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden border border-gray-200">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h4 className="font-bold text-gray-900 text-sm">দেশ নির্বাচন করুন</h4>
              <button 
                type="button" 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>
            
            <div className="p-3 border-b border-gray-100 bg-gray-50">
              <input
                type="text"
                placeholder="দেশ বা কোড দিয়ে খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm outline-none focus:border-[#16a085]"
              />
            </div>

            <div className="max-h-64 overflow-y-auto divide-y divide-gray-100">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((c) => (
                  <button
                    key={c.countryIso}
                    type="button"
                    onClick={() => handleSelectCountry(c)}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 text-left transition"
                  >
                    <span className="text-sm font-medium text-gray-800">{c.countryName}</span>
                    <span className="text-sm font-bold text-[#16a085] bg-teal-50 px-2.5 py-1 rounded-md">
                      {c.dialCode}
                    </span>
                  </button>
                ))
              ) : (
                <p className="text-center py-6 text-xs text-gray-500">কোনো দেশ পাওয়া যায়নি</p>
              )}
            </div>
          </div>
        </div>
      )}

      {otpSent && !formData.isPhoneVerified && (
        <div className="pt-2">
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
            এসএমএস-এর মাধ্যমে প্রাপ্ত ৬-সংখ্যার ওটিপি কোডটি লিখুন
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              name="otp"
              maxLength={6}
              placeholder="XXXXXX"
              value={formData.otp || ''}
              onChange={handleChange}
              className={inputClassName}
            />
            <button
              type="button"
              onClick={handleVerifyOtp}
              disabled={loading}
              className="px-5 py-3 bg-gray-900 text-white font-semibold text-sm rounded-lg hover:bg-gray-800 whitespace-nowrap disabled:bg-gray-400 transition"
            >
              {loading ? 'যাচাই করা হচ্ছে...' : 'যাচাই করুন'}
            </button>
          </div>
          <p className="text-xs text-green-600 font-medium pt-1.5">
            ✓ আপনার মোবাইল নম্বরে সফলভাবে ওটিপি পাঠানো হয়েছে।
          </p>
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