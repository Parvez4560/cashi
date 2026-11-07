'use client';

import React, { useState } from 'react';
import Step1PhoneVerify from './steps/Step1PhoneVerify';
import Step2PersonalNID from './steps/Step2PersonalNID';
import Step3NomineeInfo from './steps/Step3NomineeInfo';
import Step4BusinessDetails from './steps/Step4BusinessDetails';
import Step5DocumentsUpload from './steps/Step5DocumentsUpload';
import Step6ReviewSummary from './steps/Step6ReviewSummary';

export default function MerchantApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // সম্পূর্ণ ফর্মের স্ট্রাকচার্ড ডেটা (কান্ট্রি ফিল্ডগুলো যুক্ত করা হয়েছে)
  const [formData, setFormData] = useState({
    countryIso: 'BD',         // 🔹 ডিফল্ট কান্ট্রি আইএসও
    dialCode: '+880',         // 🔹 ডিফল্ট ডায়াল কোড
    phone: '',                // লোকাল মোবাইল নম্বর
    fullNumber: '',           // 🔹 ডায়াল কোডসহ ফুল ইন্টারন্যাশনাল নম্বর
    otp: '',
    isPhoneVerified: false,
    verificationToken: '',

    ownerName: '',
    fatherName: '',
    motherName: '',
    spouseName: '',
    nidNumber: '',
    dateOfBirth: '',
    gender: 'Male',
    occupation: 'Business',
    monthlyIncome: '20000',
    personalAddress: { division: '', district: '', upazila: '', holdingOrVillage: '' },

    nomineeName: '',
    nomineeRelation: '',
    nomineeNid: '',
    nomineeDob: '',

    businessName: '', 
    businessCategory: '',
    businessMedium: '',
    businessAddress: { division: '', district: '', upazila: '', holdingOrVillage: '' },
    hasTradeLicense: 'no',
    tradeLicenseNumber: '',
    email: '',
    additionalInfo: '',
  });

  const [files, setFiles] = useState({
    nidFront: null as File | null,
    nidBack: null as File | null,
    ownerPhoto: null as File | null,
    nomineeNidDoc: null as File | null,
    businessShopPhoto: null as File | null,
    utilityBillDoc: null as File | null,
    tradeLicenseDoc: null as File | null,
  });

  const inputClassName =
    'w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-950 font-medium outline-none focus:outline-none focus:border-[#16a085] focus:ring-2 focus:ring-[#16a085]/20 transition-all text-sm';
  
  const smallInputClassName =
    'w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-950 font-medium outline-none focus:outline-none focus:border-[#16a085] focus:ring-2 focus:ring-[#16a085]/20 transition-all text-xs sm:text-sm';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (addressType: 'businessAddress' | 'personalAddress', e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [addressType]: { ...formData[addressType], [e.target.name]: e.target.value },
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFiles({ ...files, [e.target.name]: e.target.files[0] });
    }
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 6) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();

    data.append('accountType', 'MERCHANT');
    data.append('subType', formData.businessMedium || 'retail');
    data.append('countryIso', formData.countryIso);       // 🔹 কান্ট্রি আইএসও
    data.append('dialCode', formData.dialCode);           // 🔹 ডায়াল কোড
    data.append('mobileNumber', formData.phone);          // লোকাল মোবাইল নম্বর
    data.append('fullNumber', formData.fullNumber);       // 🔹 ফুল ইন্টারন্যাশনাল নম্বর
    data.append('email', formData.email || '');
    data.append('verificationToken', formData.verificationToken || '');
    data.append('ownerName', formData.ownerName);
    data.append('fatherName', formData.fatherName || '');
    data.append('motherName', formData.motherName || '');
    data.append('spouseName', formData.spouseName || '');
    data.append('nidNumber', formData.nidNumber);
    data.append('dateOfBirth', formData.dateOfBirth || '');
    data.append('gender', formData.gender || '');
    data.append('occupation', formData.occupation || '');
    data.append('monthlyIncome', formData.monthlyIncome || '');

    data.append('personalAddress', JSON.stringify(formData.personalAddress));
    data.append('businessAddress', JSON.stringify(formData.businessAddress));

    data.append('nomineeName', formData.nomineeName || '');
    data.append('nomineeRelation', formData.nomineeRelation || '');
    data.append('nomineeNid', formData.nomineeNid || '');
    data.append('nomineeDob', formData.nomineeDob || '');

    data.append('businessName', formData.businessName || '');
    data.append('businessCategory', formData.businessCategory || '');
    data.append('businessMedium', formData.businessMedium || '');
    data.append('hasTradeLicense', formData.hasTradeLicense);
    data.append('tradeLicenseNumber', formData.tradeLicenseNumber || '');

    if (files.nidFront) data.append('nidFront', files.nidFront);
    if (files.nidBack) data.append('nidBack', files.nidBack);
    if (files.ownerPhoto) data.append('ownerPhoto', files.ownerPhoto);
    if (files.nomineeNidDoc) data.append('nomineeNidDoc', files.nomineeNidDoc);
    if (files.businessShopPhoto) data.append('businessShopPhoto', files.businessShopPhoto);
    if (files.utilityBillDoc) data.append('utilityBillDoc', files.utilityBillDoc);
    if (files.tradeLicenseDoc) data.append('tradeLicenseDoc', files.tradeLicenseDoc);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

      const response = await fetch(`${API_URL}/account/register`, {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert(`অভিনন্দন! আপনার মার্চেন্ট আবেদন সফলভাবে জমা হয়েছে।\n\nঅ্যাকাউন্ট আইডি: ${result.data.accountId}\nভার্চুয়াল আইডি: ${result.data.virtualId}`);
      } else {
        alert(`ত্রুটি: ${result.message || 'আবেদন জমা দিতে সমস্যা হয়েছে।'}`);
      }
    } catch (error) {
      console.error('Network Error:', error);
      alert('Server Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 shadow-sm max-w-3xl mx-auto text-gray-950">
      
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-md mx-auto mb-3">
          {[1, 2, 3, 4, 5, 6].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${currentStep >= step ? 'bg-[#16a085] text-white' : 'bg-gray-100 text-gray-500 border border-gray-300'}`}>
                {step}
              </div>
              {step < 6 && <div className={`h-1 w-4 sm:w-8 transition-colors ${currentStep > step ? 'bg-[#16a085]' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>
        <p className="text-center text-sm font-bold text-gray-900">
          {currentStep === 1 && 'ধাপ ১: মোবাইল নম্বর ও ভেরিফিকেশন'}
          {currentStep === 2 && 'ধাপ ২: ব্যক্তিগত তথ্য ও NID'}
          {currentStep === 3 && 'ধাপ ৩: নমিনির তথ্য'}
          {currentStep === 4 && 'ধাপ ৪: ব্যবসার বিবরণ ও মাধ্যম'}
          {currentStep === 5 && 'ধাপ ৫: ডকুমেন্টস ও ছবি আপলোড'}
          {currentStep === 6 && 'ধাপ ৬: তথ্য পর্যালোচনা (Review)'}
        </p>
      </div>

      <form onSubmit={currentStep === 6 ? handleSubmit : handleNext} className="space-y-6">
        {currentStep === 1 && <Step1PhoneVerify formData={formData} setFormData={setFormData} handleChange={handleChange} inputClassName={inputClassName} />}
        {currentStep === 2 && <Step2PersonalNID formData={formData} setFormData={setFormData} handleChange={handleChange} handleAddressChange={handleAddressChange} inputClassName={inputClassName} smallInputClassName={smallInputClassName} />}
        {currentStep === 3 && <Step3NomineeInfo formData={formData} setFormData={setFormData} handleChange={handleChange} inputClassName={inputClassName} />}
        {currentStep === 4 && <Step4BusinessDetails formData={formData} setFormData={setFormData} handleChange={handleChange} handleAddressChange={handleAddressChange} inputClassName={inputClassName} smallInputClassName={smallInputClassName} />}
        {currentStep === 5 && <Step5DocumentsUpload formData={formData} files={files} handleFileChange={handleFileChange} />}
        {currentStep === 6 && <Step6ReviewSummary formData={formData} files={files} />}

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          {currentStep > 1 ? (
            <button type="button" onClick={handlePrev} className="px-6 py-3 rounded-lg border border-gray-300 font-semibold text-gray-800 hover:bg-gray-100 transition text-sm">
              পূর্ববর্তী
            </button>
          ) : <div />}

          {currentStep < 6 ? (
            <button 
              type="submit" 
              disabled={currentStep === 1 && !formData.isPhoneVerified}
              className={`px-6 py-3 rounded-lg font-semibold text-white shadow-sm transition text-sm ${
                currentStep === 1 && !formData.isPhoneVerified ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#16a085] hover:bg-[#12876f]'
              }`}
            >
              পরবর্তী
            </button>
          ) : (
            <button 
              type="submit" 
              disabled={loading}
              className="px-8 py-3 bg-[#16a085] hover:bg-[#12876f] text-white font-semibold rounded-lg shadow-sm transition text-sm disabled:bg-gray-400"
            >
              {loading ? 'জমা দেওয়া হচ্ছে...' : 'জমা দিন'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}