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

  // জন্ম তারিখের দিন, মাস ও বছর আলাদাভাবে সামলানোর লজিক
  const [dobDay, dobMonth, dobYear] = (formData?.nomineeDob || '--').split('-');

  const handleDateChange = (type: 'day' | 'month' | 'year', val: string) => {
    let day = type === 'day' ? val : (dobDay || '01');
    let month = type === 'month' ? val : (dobMonth || '01');
    let year = type === 'year' ? val : (dobYear || '2000');

    // YYYY-MM-DD ফরম্যাটে সেভ করবে
    const formattedDob = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    setFormData((prev: any) => ({ ...prev, nomineeDob: formattedDob }));
  };

  // বছর জেনারেট করার লজিক (১৯৪০ থেকে বর্তমান বছর পর্যন্ত)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1940 + 1 }, (_, i) => currentYear - i);
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const months = [
    { value: '01', name: 'Jan (০১)' },
    { value: '02', name: 'Feb (০২)' },
    { value: '03', name: 'Mar (০৩)' },
    { value: '04', name: 'Apr (০৪)' },
    { value: '05', name: 'May (০৫)' },
    { value: '06', name: 'Jun (০৬)' },
    { value: '07', name: 'Jul (০৭)' },
    { value: '08', name: 'Aug (০৮)' },
    { value: '09', name: 'Sep (০৯)' },
    { value: '10', name: 'Oct (১০)' },
    { value: '11', name: 'Nov (১১)' },
    { value: '12', name: 'Dec (১২)' }
  ];

  return (
    <div className="space-y-4 text-gray-900">
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

      {/* 🔹 সমাধান: জন্ম তারিখ সিলেক্ট করার সহজ ৩টি ড্রপডাউন (দিন - মাস - বছর) */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-1.5">
          Nominee's Date of Birth <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {/* দিন */}
          <select
            value={dobDay || ''}
            onChange={(e) => handleDateChange('day', e.target.value)}
            className={inputClassName}
            required
          >
            <option value="">Day (দিন)</option>
            {days.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          {/* মাস */}
          <select
            value={dobMonth || ''}
            onChange={(e) => handleDateChange('month', e.target.value)}
            className={inputClassName}
            required
          >
            <option value="">Month (মাস)</option>
            {months.map((m) => (
              <option key={m.value} value={m.value}>{m.name}</option>
            ))}
          </select>

          {/* বছর */}
          <select
            value={dobYear || ''}
            onChange={(e) => handleDateChange('year', e.target.value)}
            className={inputClassName}
            required
          >
            <option value="">Year (বছর)</option>
            {years.map((y) => (
              <option key={y} value={y.toString()}>{y}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}