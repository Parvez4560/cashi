import React from 'react';

export default function Step3NomineeInfo({ formData, setFormData, handleChange, inputClassName }: any) {

  // নাম ফিল্ডের জন্য শুধু ইংরেজি অক্ষর ও স্পেস ফিল্টার
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

  // NID ফিল্ডের জন্য শুধু সংখ্যা ফিল্টার
  const handleNidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/\D/g, '');
    if (setFormData) {
      setFormData((prev: any) => ({ ...prev, [name]: numericValue }));
    } else {
      e.target.value = numericValue;
      handleChange(e);
    }
  };

  // বর্তমান ডেট স্ট্রিং থেকে দিন, মাস এবং বছর আলাদা করে নেওয়া (যেমন: "2005-08-15" থেকে)
  const dateParts = (formData?.nomineeDob || '').split('-');
  const dobYear = dateParts[0] || '';
  const dobMonth = dateParts[1] || '';
  const dobDay = dateParts[2] || '';

  // দিন, মাস বা বছর পরিবর্তনের হ্যান্ডলার (যাতে একটি পরিবর্তন করলে অন্যটি মুছে না যায়)
  const handleDateChange = (type: 'day' | 'month' | 'year', val: string) => {
    let d = type === 'day' ? val : dobDay;
    let m = type === 'month' ? val : dobMonth;
    let y = type === 'year' ? val : dobYear;

    // যদি তিনটি অংশই সিলেক্ট করা থাকে তবেই সম্পূর্ণ ডেট ফরম্যাট তৈরি করে সেভ করবে, অন্যথায় আংশিক বা খালি রাখবে
    let newDob = '';
    if (y && m && d) {
      newDob = `${y}-${m}-${d}`;
    } else {
      // সাময়িকভাবে স্টেট ধরে রাখার জন্য
      newDob = `${y || 'YYYY'}-${m || 'MM'}-${d || 'DD'}`;
    }

    setFormData((prev: any) => ({ ...prev, nomineeDob: y && m && d ? `${y}-${m}-${d}` : prev.nomineeDob }));
  };

  // সরাসরি আলাদা স্টেট বা হ্যান্ডলারের মাধ্যমে মান আপডেট করার নিরাপদ লজিক
  const [selectedDay, setSelectedDay] = React.useState(dobDay);
  const [selectedMonth, setSelectedMonth] = React.useState(dobMonth);
  const [selectedYear, setSelectedYear] = React.useState(dobYear);

  const updateDob = (d: string, m: string, y: string) => {
    if (d && m && y) {
      const formattedDate = `${y}-${m}-${d}`;
      setFormData((prev: any) => ({ ...prev, nomineeDob: formattedDate }));
    }
  };

  // বছর, দিন এবং মাসের লিস্ট
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1940 + 1 }, (_, i) => (currentYear - i).toString());
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const months = [
    { value: '01', name: 'January (জানুয়ারি)' },
    { value: '02', name: 'February (ফেব্রুয়ারি)' },
    { value: '03', name: 'March (মার্চ)' },
    { value: '04', name: 'April (এপ্রিল)' },
    { value: '05', name: 'May (মে)' },
    { value: '06', name: 'June (জুন)' },
    { value: '07', name: 'July (জুলাই)' },
    { value: '08', name: 'August (আগস্ট)' },
    { value: '09', name: 'September (সেপ্টেম্বর)' },
    { value: '10', name: 'October (অক্টোবর)' },
    { value: '11', name: 'November (নভেম্বর)' },
    { value: '12', name: 'December (ডিসেম্বর)' }
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

      {/* জন্ম তারিখ সিলেক্ট করার নিরাপদ ৩টি ড্রপডাউন */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-1.5">
          Nominee's Date of Birth <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {/* দিন */}
          <select
            value={dobDay}
            onChange={(e) => updateDob(e.target.value, dobMonth, dobYear)}
            className={inputClassName}
            required
          >
            <option value="">Day</option>
            {days.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          {/* মাস */}
          <select
            value={dobMonth}
            onChange={(e) => updateDob(dobDay, e.target.value, dobYear)}
            className={inputClassName}
            required
          >
            <option value="">Month</option>
            {months.map((m) => (
              <option key={m.value} value={m.value}>{m.name}</option>
            ))}
          </select>

          {/* বছর */}
          <select
            value={dobYear}
            onChange={(e) => updateDob(dobDay, dobMonth, e.target.value)}
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