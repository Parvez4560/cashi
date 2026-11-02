import React from 'react';

export default function Step3NomineeInfo({ formData, setFormData, handleChange, inputClassName }: any) {

  // শুধুমাত্র ইংরেজি অক্ষর ও স্পেস নেওয়ার হ্যান্ডলার
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const regex = /^[A-Za-z\s.\-_]*$/;
    if (regex.test(value)) {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  // NID ফিল্ডের জন্য শুধু সংখ্যা ফিল্টার
  const handleNidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/\D/g, '');
    setFormData((prev: any) => ({ ...prev, [name]: numericValue }));
  };

  // বর্তমান ডেট স্ট্রিং থেকে দিন, মাস এবং বছর আলাদা করে নেওয়া
  const dateParts = (formData?.nomineeDob || '').split('-');
  const dobYear = dateParts[0] || '';
  const dobMonth = dateParts[1] || '';
  const dobDay = dateParts[2] || '';

  // দিন, মাস বা বছর পরিবর্তনের নিরাপদ হ্যান্ডলার
  const handleDateChange = (type: 'day' | 'month' | 'year', val: string) => {
    let d = type === 'day' ? val : dobDay;
    let m = type === 'month' ? val : dobMonth;
    let y = type === 'year' ? val : dobYear;

    // যদি তিনটি ফিল্ডই সিলেক্ট করা হয়, তবেই YYYY-MM-DD ফরম্যাটে সেভ করবে
    if (d && m && y) {
      const formattedDate = `${y}-${m}-${d}`;
      setFormData((prev: any) => ({ ...prev, nomineeDob: formattedDate }));
    } else {
      // যদি আংশিক সিলেক্ট করা থাকে, সাময়িকভাবে স্টোরে রাখব যাতে রিসেট না হয়
      const partialDate = `${y || 'YYYY'}-${m || 'MM'}-${d || 'DD'}`;
      setFormData((prev: any) => ({ ...prev, nomineeDob: partialDate }));
    }
  };

  // বছর, দিন এবং মাসের লিস্ট (ইংরেজিতে)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1940 + 1 }, (_, i) => (currentYear - i).toString());
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const months = [
    { value: '01', name: 'January' },
    { value: '02', name: 'February' },
    { value: '03', name: 'March' },
    { value: '04', name: 'April' },
    { value: '05', name: 'May' },
    { value: '06', name: 'June' },
    { value: '07', name: 'July' },
    { value: '08', name: 'August' },
    { value: '09', name: 'September' },
    { value: '10', name: 'October' },
    { value: '11', name: 'November' },
    { value: '12', name: 'December' }
  ];

  return (
    <div className="space-y-4 text-gray-950">
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

      {/* জন্ম তারিখ সিলেক্ট করার ড্রপডাউন (সম্পূর্ণ ইংরেজিতে এবং নিরাপদভাবে ডেটা হোল্ড করবে) */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-1.5">
          Nominee's Date of Birth <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {/* Day */}
          <select
            value={dobDay}
            onChange={(e) => handleDateChange('day', e.target.value)}
            className={inputClassName}
            required
          >
            <option value="">Day</option>
            {days.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          {/* Month */}
          <select
            value={dobMonth}
            onChange={(e) => handleDateChange('month', e.target.value)}
            className={inputClassName}
            required
          >
            <option value="">Month</option>
            {months.map((m) => (
              <option key={m.value} value={m.value}>{m.name}</option>
            ))}
          </select>

          {/* Year */}
          <select
            value={dobYear}
            onChange={(e) => handleDateChange('year', e.target.value)}
            className={inputClassName}
            required
          >
            <option value="">Year</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}