import React from 'react';

export default function Step5DocumentsUpload({ formData, files, handleFileChange }: any) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Documents & Photos Upload</h3>
      <p className="text-xs text-gray-600">Please upload clear photos of your required documents (Image or PDF format).</p>

      {/* সারি ১: NID সামনের ও পেছনের পার্ট */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">NID (Front Side) <span className="text-red-500">*</span></label>
          <input type="file" name="nidFront" accept="image/*" required={!files?.nidFront} onChange={handleFileChange} className="w-full text-xs border p-2 rounded-lg bg-white" />
          {files?.nidFront && <p className="text-xs text-green-600 mt-1">✓ {files.nidFront.name}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">NID (Back Side) <span className="text-red-500">*</span></label>
          <input type="file" name="nidBack" accept="image/*" required={!files?.nidBack} onChange={handleFileChange} className="w-full text-xs border p-2 rounded-lg bg-white" />
          {files?.nidBack && <p className="text-xs text-green-600 mt-1">✓ {files.nidBack.name}</p>}
        </div>
      </div>

      {/* সারি ২: নিজের ছবি ও নমিনির NID কপি */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Owner's Live Photo (Selfie) <span className="text-red-500">*</span></label>
          <input type="file" name="ownerPhoto" accept="image/*" required={!files?.ownerPhoto} onChange={handleFileChange} className="w-full text-xs border p-2 rounded-lg bg-white" />
          {files?.ownerPhoto && <p className="text-xs text-green-600 mt-1">✓ {files.ownerPhoto.name}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Nominee's NID Copy <span className="text-red-500">*</span></label>
          <input type="file" name="nomineeNidDoc" accept="image/*" required={!files?.nomineeNidDoc} onChange={handleFileChange} className="w-full text-xs border p-2 rounded-lg bg-white" />
          {files?.nomineeNidDoc && <p className="text-xs text-green-600 mt-1">✓ {files.nomineeNidDoc.name}</p>}
        </div>
      </div>

      {/* সারি ৩: ব্যবসার দোকানের ছবি এবং বিদ্যুৎ বিলের কপি (Utility Bill) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Business Shop / Signboard Photo <span className="text-red-500">*</span></label>
          <input type="file" name="businessShopPhoto" accept="image/*" required={!files?.businessShopPhoto} onChange={handleFileChange} className="w-full text-xs border p-2 rounded-lg bg-white" />
          {files?.businessShopPhoto && <p className="text-xs text-green-600 mt-1">✓ {files.businessShopPhoto.name}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Utility Bill Copy (Electricity/Gas/Water) <span className="text-red-500">*</span></label>
          <input type="file" name="utilityBillDoc" accept="image/*,application/pdf" required={!files?.utilityBillDoc} onChange={handleFileChange} className="w-full text-xs border p-2 rounded-lg bg-white" />
          {files?.utilityBillDoc && <p className="text-xs text-green-600 mt-1">✓ {files.utilityBillDoc.name}</p>}
        </div>
      </div>

      {/* সারি ৪: ট্রেড লাইসেন্স কপি (যদি থাকে) */}
      {formData?.hasTradeLicense === 'yes' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Trade License Copy <span className="text-red-500">*</span></label>
            <input type="file" name="tradeLicenseDoc" accept="image/*,application/pdf" required={formData.hasTradeLicense === 'yes' && !files?.tradeLicenseDoc} onChange={handleFileChange} className="w-full text-xs border p-2 rounded-lg bg-white" />
            {files?.tradeLicenseDoc && <p className="text-xs text-green-600 mt-1">✓ {files.tradeLicenseDoc.name}</p>}
          </div>
        </div>
      )}
    </div>
  );
}