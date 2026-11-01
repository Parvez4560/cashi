import React from 'react';

export default function Step4BusinessDetails({ formData, setFormData, handleAddressChange, inputClassName, smallInputClassName }: any) {

  // শুধু ইংরেজি ও & চিহ্ন এলাও করার হ্যান্ডলার
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // ইংরেজি অক্ষর, সংখ্যা, স্পেস এবং & চিহ্ন এলাও করার রেজেক্স
    const regex = /^[A-Za-z0-9\s&.\-_]*$/;
    if (regex.test(value)) {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-900 border-b pb-2">ব্যবসার তথ্য ও মাধ্যম (English Only)</h3>

      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-1.5">
          Business Name (ব্যবসার নাম - যেমন: M/S Rahim & Sons) <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="businessName"
          required
          placeholder="Enter Business Name (English & & allowed)"
          value={formData.businessName}
          onChange={handleTextChange}
          className={inputClassName}
        />
        <p className="text-xs text-gray-500 mt-1">দয়া করে শুধুমাত্র ইংরেজিতে লিখুন। '&' চিহ্ন ব্যবহার করতে পারেন।</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1.5">ব্যবসার ধরন <span className="text-red-500">*</span></label>
          <select name="businessCategory" required value={formData.businessCategory} onChange={(e) => setFormData({...formData, businessCategory: e.target.value})} className={inputClassName}>
            <option value="">Select Category</option>
            <option value="retail">Retail Store</option>
            <option value="wholesale">Wholesale Store</option>
            <option value="pharmacy">Pharmacy</option>
            <option value="restaurant">Restaurant</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1.5">ব্যবসার মাধ্যম (Business Medium) <span className="text-red-500">*</span></label>
          <select name="businessMedium" required value={formData.businessMedium} onChange={(e) => setFormData({...formData, businessMedium: e.target.value})} className={inputClassName}>
            <option value="shop">Physical Shop</option>
            <option value="facebook">Facebook Page</option>
            <option value="website">Own Website / E-commerce</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* ব্যবসায়িক ঠিকানা (ইংরেজি ইনপুট) */}
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-3">
        <h4 className="text-sm font-bold text-[#16a085]">Business Address (In English)</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div><label className="block text-xs font-semibold text-gray-700 mb-1">Division *</label><input type="text" name="division" required placeholder="Division" value={formData.businessAddress.division} onChange={(e) => handleAddressChange('businessAddress', e)} className={smallInputClassName} /></div>
          <div><label className="block text-xs font-semibold text-gray-700 mb-1">District *</label><input type="text" name="district" required placeholder="District" value={formData.businessAddress.district} onChange={(e) => handleAddressChange('businessAddress', e)} className={smallInputClassName} /></div>
          <div><label className="block text-xs font-semibold text-gray-700 mb-1">Upazila *</label><input type="text" name="upazila" required placeholder="Upazila" value={formData.businessAddress.upazila} onChange={(e) => handleAddressChange('businessAddress', e)} className={smallInputClassName} /></div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1.5">Email Address <span className="text-red-500">*</span></label>
          <input type="email" name="email" required placeholder="example@domain.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className={inputClassName} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1.5">Trade License Available?</label>
          <div className="flex gap-4 mt-2">
            <button type="button" onClick={() => setFormData({ ...formData, hasTradeLicense: 'yes' })} className={`flex-1 py-2 rounded-lg border text-sm font-medium ${formData.hasTradeLicense === 'yes' ? 'bg-[#16a085] text-white' : 'bg-white'}`}>Yes</button>
            <button type="button" onClick={() => setFormData({ ...formData, hasTradeLicense: 'no' })} className={`flex-1 py-2 rounded-lg border text-sm font-medium ${formData.hasTradeLicense === 'no' ? 'bg-[#16a085] text-white' : 'bg-white'}`}>No</button>
          </div>
        </div>
      </div>

      {formData.hasTradeLicense === 'yes' && (
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1.5">Trade License Number <span className="text-red-500">*</span></label>
          <input type="text" name="tradeLicenseNumber" required placeholder="License Number" value={formData.tradeLicenseNumber} onChange={handleTextChange} className={inputClassName} />
        </div>
      )}
    </div>
  );
}