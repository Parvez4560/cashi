'use client';

import React, { useState } from 'react';

export default function MerchantApplicationForm() {
  const [formData, setFormData] = useState({
    merchantName: '',
    division: '',
    district: '',
    upazila: '',
    phone: '',
    email: '',
    additionalInfo: '',
    hasTradeLicense: 'no',
    tradeLicenseNumber: '',
  });

  const [files, setFiles] = useState({
    nidFront: null as File | null,
    nidBack: null as File | null,
    tradeLicenseDoc: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFiles({ ...files, [e.target.name]: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted Merchant Application Data:', formData, files);
    alert('আপনার আবেদন সফলভাবে জমা হয়েছে! খুব শীঘ্রই যোগাযোগ করা হবে।');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
        সাইন আপ
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* মার্চেন্ট / দোকানের নাম */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1.5">
            মার্চেন্ট/দোকানের নাম <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="merchantName"
            required
            placeholder="মার্চেন্ট/দোকানের নাম"
            value={formData.merchantName}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#16a085]"
          />
        </div>

        {/* ম্যানুয়াল লোকেশন ইনপুটসমূহ */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1.5">
              বিভাগ <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="division"
              required
              placeholder="বিভাগ লিখুন"
              value={formData.division}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#16a085]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1.5">
              জেলা <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="district"
              required
              placeholder="জেলা লিখুন"
              value={formData.district}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#16a085]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1.5">
              উপজেলা/থানা <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="upazila"
              required
              placeholder="উপজেলা লিখুন"
              value={formData.upazila}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#16a085]"
            />
          </div>
        </div>

        {/* ফোন নাম্বার */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1.5">
            ফোন নাম্বার <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            required
            placeholder="ফোন নাম্বার লিখুন"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#16a085]"
          />
        </div>

        {/* ইমেইল ঠিকানা (বাধ্যতামূলক) */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1.5">
            ইমেইল ঠিকানা <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="ইমেইল আইডি লিখুন"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#16a085]"
          />
        </div>

        {/* NID সামনের পার্ট */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1.5">
            জাতীয় পরিচয়পত্র (সামনের দিক) <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name="nidFront"
            accept="image/*"
            capture="environment"
            required
            onChange={handleFileChange}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#16a085]/10 file:text-[#16a085] hover:file:bg-[#16a085]/20"
          />
          <p className="text-xs text-gray-500 mt-1">ক্যামেরা দিয়ে ছবি তুলুন অথবা গ্যালারি থেকে আপলোড করুন</p>
        </div>

        {/* NID পেছনের পার্ট */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1.5">
            জাতীয় পরিচয়পত্র (পেছনের দিক) <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name="nidBack"
            accept="image/*"
            capture="environment"
            required
            onChange={handleFileChange}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#16a085]/10 file:text-[#16a085] hover:file:bg-[#16a085]/20"
          />
          <p className="text-xs text-gray-500 mt-1">ক্যামেরা দিয়ে ছবি তুলুন অথবা গ্যালারি থেকে আপলোড করুন</p>
        </div>

        {/* ট্রেড লাইসেন্স আছে কি না */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            আপনার কি ট্রেড লাইসেন্স আছে?
          </label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, hasTradeLicense: 'yes' })}
              className={`flex-1 py-2.5 rounded-lg font-medium border text-sm transition-all ${
                formData.hasTradeLicense === 'yes'
                  ? 'bg-[#16a085] text-white border-[#16a085]'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              হ্যাঁ
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, hasTradeLicense: 'no' })}
              className={`flex-1 py-2.5 rounded-lg font-medium border text-sm transition-all ${
                formData.hasTradeLicense === 'no'
                  ? 'bg-[#16a085] text-white border-[#16a085]'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              না
            </button>
          </div>
        </div>

        {/* যদি হ্যাঁ হয় তবে ট্রেড লাইসেন্স নম্বর ও ছবি */}
        {formData.hasTradeLicense === 'yes' && (
          <div className="space-y-4 p-4 bg-gray-50 border border-gray-200 rounded-xl">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                ট্রেড লাইসেন্স নম্বর <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="tradeLicenseNumber"
                required={formData.hasTradeLicense === 'yes'}
                placeholder="লাইসেন্স নম্বর লিখুন"
                value={formData.tradeLicenseNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#16a085]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                ট্রেড লাইসেন্সের ছবি / কপি <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name="tradeLicenseDoc"
                accept="image/*,application/pdf"
                required={formData.hasTradeLicense === 'yes'}
                onChange={handleFileChange}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#16a085]/10 file:text-[#16a085] hover:file:bg-[#16a085]/20"
              />
            </div>
          </div>
        )}

        {/* অতিরিক্ত তথ্য */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1.5">
            অতিরিক্ত তথ্য যা আপনি জমা দিতে চান
          </label>
          <textarea
            name="additionalInfo"
            rows={2}
            placeholder="অতিরিক্ত তথ্য"
            value={formData.additionalInfo}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#16a085]"
          />
        </div>

        {/* সাবমিট বাটন */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-[#16a085] hover:bg-[#12876f] text-white font-semibold py-3.5 rounded-lg shadow-sm transition duration-200"
          >
            জমা দিন
          </button>
        </div>

      </form>
    </div>
  );
}