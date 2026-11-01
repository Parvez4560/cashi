import React from 'react';

export default function Step3NomineeInfo({ formData, setFormData, handleChange, inputClassName }: any) {

  // নমিনির নাম ফিল্ডের জন্য শুধু ইংরেজি অক্ষর ও স্পেস ফিল্টার
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const regex = /^[A-Za-z\s.\-_]*$/;
    if (regex.test(value)) {
      if (setFormData) {
        setFormData((prev: any) => ({ ...prev, [name]: value }));
      } else {
        handleChange(e);
      }
    }
  };

  // নমিনির NID ফিল্ডের জন্য শুধু সংখ্যা ফিল্টার
  const handleNidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/\D/g, ''); // শুধু সংখ্যা ফিল্টার
    
    // কাস্টম ইভেন্ট অবজেক্ট তৈরি করে handleChange ডাকা অথবা setFormData করা
    if (setFormData) {
      setFormData((prev: any) => ({ ...prev, [name]: numericValue }));
    } else {
      e.target.value = numericValue;
      handleChange(e);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Nominee Information (English Only)</h3>
      <p className="text-xs text-gray-600">Please provide nominee details in English as per their NID card.</p>

      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-1.5">
          Nominee's Full Name (In English) <span className="text-red-500">*</span>
        </label>
        <input 
          type="text" 
          name="nomineeName" 
          required 
          placeholder="NOMINEE FULL NAME" 
          value={formData?.nomineeName || ''} 
          onChange={handleNameChange} 
          className={inputClassName} 
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1.5">
            Relation with Nominee <span className="text-red-500">*</span>
          </label>
          <select 
            name="nomineeRelation" 
            required 
            value={formData?.nomineeRelation || ''} 
            onChange={handleChange} 
            className={inputClassName}
          >
            <option value="">Select Relation</option>
            <option value="spouse">Spouse</option>
            <option value="father">Father</option>
            <option value="mother">Mother</option>
            <option value="sibling">Sibling</option>
            <option value="son_daughter">Son / Daughter</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1.5">
            Nominee's NID Number <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            name="nomineeNid" 
            required 
            placeholder="Enter NID Number" 
            value={formData?.nomineeNid || ''} 
            onChange={handleNidChange} 
            className={inputClassName} 
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-1.5">
          Nominee's Date of Birth <span className="text-red-500">*</span>
        </label>
        <input 
          type="date" 
          name="nomineeDob" 
          required 
          value={formData?.nomineeDob || ''} 
          onChange={handleChange} 
          className={inputClassName} 
        />
      </div>
    </div>
  );
}