import React from 'react';

export default function Step2PersonalNID({ formData, setFormData, handleAddressChange, inputClassName, smallInputClassName }: any) {

  // শুধু ইংরেজি অক্ষর ও স্পেস নেওয়ার হ্যান্ডলার (ব্যক্তিগত নামের জন্য)
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const regex = /^[A-Za-z\s.\-_]*$/; // নাম বা পিতার নামের জন্য শুধু ইংরেজি অক্ষর ও ডট এলাও করবে
    if (regex.test(value)) {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="space-y-4">
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