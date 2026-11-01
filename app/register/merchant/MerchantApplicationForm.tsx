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

  // সম্পূর্ণ ফর্মের স্ট্রাকচার্ড ডেটা
  const [formData, setFormData] = useState({
    // Step 1: Phone & Verification
    phone: '',
    otp: '',
    isPhoneVerified: false,

    // Step 2: Personal Info (NID Based)
    ownerName: '',
    fatherName: '',
    motherName: '',
    spouseName: '',
    nidNumber: '',
    dateOfBirth: '',
    gender: 'male', // male / female / other
    occupation: '',
    incomeSource: '',
    monthlyIncome: '',
    personalAddress: { division: '', district: '', upazila: '', holdingOrVillage: '' },

    // Step 3: Nominee Info
    nomineeName: '',
    nomineeRelation: '',
    nomineeNid: '',
    nomineeDob: '',

    // Step 4: Business Details
    businessName: '', 
    businessCategory: '',
    businessMedium: 'facebook', // facebook / website / shop / other
    businessAddress: { division: '', district: '', upazila: '', holdingOrVillage: '' },
    hasTradeLicense: 'no',
    tradeLicenseNumber: '',
    email: '',
    additionalInfo: '',
  });

  const [files, setFiles] = useState({
    nidFront: null as File | null,
    nidBack: null as File | null,
    ownerPhoto: null as File | null, // নিজের চেহারার ছবি
    nomineeNidDoc: null as File | null, // নমিনির এনআইডি
    businessShopPhoto: null as File | null, // ব্যবসার দোকান বা সাইনবোর্ডের ছবি
    utilityBillDoc: null as File | null, // 🔹 নতুন যুক্ত করা ইউটিলিটি বিলের কপি
    tradeLicenseDoc: null as File | null,
  });

  const inputClassName =
    'w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 outline-none focus:outline-none focus:border-[#16a085] focus:ring-2 focus:ring-[#16a085]/20 transition-all text-sm';
  
  const smallInputClassName =
    'w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 outline-none focus:outline-none focus:border-[#16a085] focus:ring-2 focus:ring-[#16a085]/20 transition-all text-xs sm:text-sm';

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
    const payload = { ...formData, files };
    console.log('Final Merchant Structured Payload:', payload);
    alert('আপনার মার্চেন্ট আবেদন সফলভাবে জমা হয়েছে! খুব শীঘ্রই যোগাযোগ করা হবে।');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 shadow-sm max-w-3xl mx-auto">
      
      {/* প্রগ্রেস বার ও স্টেপ ইন্ডিকেটর */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-md mx-auto mb-3">
          {[1, 2, 3, 4, 5, 6].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${currentStep >= step ? 'bg-[#16a085] text-white' : 'bg-gray-100 text-gray-400 border border-gray-300'}`}>
                {step}
              </div>
              {step < 6 && <div className={`h-1 w-4 sm:w-8 transition-colors ${currentStep > step ? 'bg-[#16a085]' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>
        <p className="text-center text-sm font-semibold text-gray-700">
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

        {/* নেভিগেশন বাটন */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {currentStep > 1 ? (
            <button type="button" onClick={handlePrev} className="px-6 py-3 rounded-lg border border-gray-300 font-medium text-gray-700 hover:bg-gray-50 transition text-sm">
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
            <button type="submit" className="px-8 py-3 bg-[#16a085] hover:bg-[#12876f] text-white font-semibold rounded-lg shadow-sm transition text-sm">
              জমা দিন
            </button>
          )}
        </div>
      </form>
    </div>
  );
}