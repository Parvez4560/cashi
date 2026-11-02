import React from 'react';

export default function Step2PersonalNID({ formData, setFormData, handleChange, handleAddressChange, inputClassName, smallInputClassName }: any) {

  // শুধু ইংরেজি অক্ষর ও স্পেস নেওয়ার হ্যান্ডলার (ব্যক্তিগত নামের জন্য)
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const regex = /^[A-Za-z\s.\-_]*$/;
    if (regex.test(value)) {
      setFormData({ ...formData, [name]: value });
    }
  };

  // জন্ম তারিখের দিন, মাস এবং বছর আলাদা করে নেওয়া
  const dateParts = (formData?.dateOfBirth || '').split('-');
  const dobYear = dateParts[0] || '';
  const dobMonth = dateParts[1] || '';
  const dobDay = dateParts[2] || '';

  const handleDateChange = (type: 'day' | 'month' | 'year', val: string) => {
    let d = type === 'day' ? val : dobDay;
    let m = type === 'month' ? val : dobMonth;
    let y = type === 'year' ? val : dobYear;

    if (d && m && y) {
      const formattedDate = `${y}-${m}-${d}`;
      setFormData((prev: any) => ({ ...prev, dateOfBirth: formattedDate }));
    } else {
      const partialDate = `${y || 'YYYY'}-${m || 'MM'}-${d || 'DD'}`;
      setFormData((prev: any) => ({ ...prev, dateOfBirth: partialDate }));
    }
  };

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
      <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Personal & NID Info (English Only)</h3>

      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-1.5">
          Your Full Name (As per NID in English) <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="ownerName"
          required
          placeholder="MD RAHIM UDDIN"
          value={formData.ownerName}
          onChange={handleNameChange}
          className={inputClassName}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1.5">Father's Name (In English) <span className="text-red-500">*</span></label>
          <input type="text" name="fatherName" required placeholder="Father's Name" value={formData.fatherName} onChange={handleNameChange} className={inputClassName} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1.5">Mother's Name (In English) <span className="text-red-500">*</span></label>
          <input type="text" name="motherName" required placeholder="Mother's Name" value={formData.motherName} onChange={handleNameChange} className={inputClassName} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1.5">Spouse Name (Optional)</label>
          <input type="text" name="spouseName" placeholder="Spouse Name" value={formData.spouseName} onChange={handleNameChange} className={inputClassName} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1.5">NID Number <span className="text-red-500">*</span></label>
          <input type="text" name="nidNumber" required placeholder="10, 13 or 17 digit NID" value={formData.nidNumber} onChange={(e) => setFormData({...formData, nidNumber: e.target.value.replace(/\D/g, '')})} className={inputClassName} />
        </div>
      </div>

      {/* Date of Birth Dropdowns */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-1.5">
          Date of Birth (As per NID) <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          <select value={dobDay} onChange={(e) => handleDateChange('day', e.target.value)} className={inputClassName} required>
            <option value="">Day</option>
            {days.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <select value={dobMonth} onChange={(e) => handleDateChange('month', e.target.value)} className={inputClassName} required>
            <option value="">Month</option>
            {months.map((m) => <option key={m.value} value={m.value}>{m.name}</option>)}
          </select>
          <select value={dobYear} onChange={(e) => handleDateChange('year', e.target.value)} className={inputClassName} required>
            <option value="">Year</option>
            {years.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1.5">Gender <span className="text-red-500">*</span></label>
          <select name="gender" required value={formData.gender} onChange={handleChange} className={inputClassName}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1.5">Occupation <span className="text-red-500">*</span></label>
          <input type="text" name="occupation" required placeholder="e.g. Business / Service" value={formData.occupation} onChange={handleChange} className={inputClassName} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1.5">Monthly Income <span className="text-red-500">*</span></label>
          <input type="text" name="monthlyIncome" required placeholder="e.g. 25000" value={formData.monthlyIncome} onChange={(e) => setFormData({...formData, monthlyIncome: e.target.value.replace(/\D/g, '')})} className={inputClassName} />
        </div>
      </div>

      {/* স্থায়ী ঠিকানা (ইংরেজিতে) */}
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-3">
        <h4 className="text-sm font-bold text-[#16a085]">Permanent Address (As per NID in English)</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div><label className="block text-xs font-semibold text-gray-700 mb-1">Division *</label><input type="text" name="division" required placeholder="Division" value={formData.personalAddress.division} onChange={(e) => handleAddressChange('personalAddress', e)} className={smallInputClassName} /></div>
          <div><label className="block text-xs font-semibold text-gray-700 mb-1">District *</label><input type="text" name="district" required placeholder="District" value={formData.personalAddress.district} onChange={(e) => handleAddressChange('personalAddress', e)} className={smallInputClassName} /></div>
          <div><label className="block text-xs font-semibold text-gray-700 mb-1">Upazila *</label><input type="text" name="upazila" required placeholder="Upazila" value={formData.personalAddress.upazila} onChange={(e) => handleAddressChange('personalAddress', e)} className={smallInputClassName} /></div>
        </div>
      </div>
    </div>
  );
}