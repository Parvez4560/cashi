import React from 'react';

export default function Step6ReviewSummary({ formData, files }: any) {
  return (
    <div className="space-y-6 text-sm">
      <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Review Summary (তথ্য পর্যালোচনা)</h3>

      {/* ১. মোবাইল ও যোগাযোগ */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-1.5">
        <h4 className="font-bold text-[#16a085]">1. Mobile & Contact Info</h4>
        <p><strong>Mobile Number:</strong> {formData?.phone || 'N/A'} (Verified)</p>
        <p><strong>Email Address:</strong> {formData?.email || 'N/A'}</p>
      </div>

      {/* ২. ব্যক্তিগত তথ্য */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-1.5">
        <h4 className="font-bold text-[#16a085]">2. Personal & NID Info</h4>
        <p><strong>Full Name:</strong> {formData?.ownerName || 'N/A'}</p>
        <p><strong>Father's Name:</strong> {formData?.fatherName || 'N/A'}</p>
        <p><strong>Mother's Name:</strong> {formData?.motherName || 'N/A'}</p>
        <p><strong>Spouse Name:</strong> {formData?.spouseName || 'N/A'}</p>
        <p><strong>NID Number:</strong> {formData?.nidNumber || 'N/A'}</p>
        <p><strong>Date of Birth:</strong> {formData?.dateOfBirth || 'N/A'}</p>
        <p><strong>Gender & Occupation:</strong> {formData?.gender} | {formData?.occupation}</p>
        <p><strong>Monthly Income:</strong> {formData?.monthlyIncome || 'N/A'}</p>
        <p><strong>Permanent Address:</strong> {formData?.personalAddress?.upazila}, {formData?.personalAddress?.district}, {formData?.personalAddress?.division}</p>
      </div>

      {/* ৩. নমিনির তথ্য */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-1.5">
        <h4 className="font-bold text-[#16a085]">3. Nominee Information</h4>
        <p><strong>Nominee Name:</strong> {formData?.nomineeName || 'N/A'} ({formData?.nomineeRelation || 'N/A'})</p>
        <p><strong>Nominee NID:</strong> {formData?.nomineeNid || 'N/A'}</p>
        <p><strong>Nominee DOB:</strong> {formData?.nomineeDob || 'N/A'}</p>
      </div>

      {/* ৪. ব্যবসার তথ্য */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-1.5">
        <h4 className="font-bold text-[#16a085]">4. Business Information</h4>
        <p><strong>Business Name:</strong> {formData?.businessName || 'N/A'}</p>
        <p><strong>Category & Medium:</strong> {formData?.businessCategory} | {formData?.businessMedium}</p>
        <p><strong>Business Address:</strong> {formData?.businessAddress?.upazila}, {formData?.businessAddress?.district}, {formData?.businessAddress?.division}</p>
        <p><strong>Trade License:</strong> {formData?.hasTradeLicense === 'yes' ? `Yes (${formData?.tradeLicenseNumber})` : 'No'}</p>
      </div>

      {/* ৫. আপলোডকৃত ডকুমেন্টস ও ফাইলসমূহ */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-1.5">
        <h4 className="font-bold text-[#16a085]">5. Uploaded Documents & Photos</h4>
        
        <p><strong>NID Front Side:</strong> {files?.nidFront ? <span className="text-green-600 font-medium">✓ {files.nidFront.name}</span> : <span className="text-red-500">Not Uploaded</span>}</p>
        
        <p><strong>NID Back Side:</strong> {files?.nidBack ? <span className="text-green-600 font-medium">✓ {files.nidBack.name}</span> : <span className="text-red-500">Not Uploaded</span>}</p>
        
        <p><strong>Owner's Live Photo:</strong> {files?.ownerPhoto ? <span className="text-green-600 font-medium">✓ {files.ownerPhoto.name}</span> : <span className="text-red-500">Not Uploaded</span>}</p>
        
        <p><strong>Nominee NID Copy:</strong> {files?.nomineeNidDoc ? <span className="text-green-600 font-medium">✓ {files.nomineeNidDoc.name}</span> : <span className="text-red-500">Not Uploaded</span>}</p>
        
        <p><strong>Business Shop Photo:</strong> {files?.businessShopPhoto ? <span className="text-green-600 font-medium">✓ {files.businessShopPhoto.name}</span> : <span className="text-red-500">Not Uploaded</span>}</p>

        {/* নতুন যোগ করা ইউটিলিটি বিলের কপি */}
        <p><strong>Utility Bill Copy:</strong> {files?.utilityBillDoc ? <span className="text-green-600 font-medium">✓ {files.utilityBillDoc.name}</span> : <span className="text-red-500">Not Uploaded</span>}</p>

        {formData?.hasTradeLicense === 'yes' && (
          <p><strong>Trade License Document:</strong> {files?.tradeLicenseDoc ? <span className="text-green-600 font-medium">✓ {files.tradeLicenseDoc.name}</span> : <span className="text-red-500">Not Uploaded</span>}</p>
        )}
      </div>

      <div className="p-3 bg-[#16a085]/10 border border-[#16a085]/30 rounded-lg text-center font-medium text-gray-800">
        সব তথ্য সঠিক থাকলে নিচের "চূড়ান্ত আবেদন জমা দিন" (Final Submit) বাটনে ক্লিক করুন।
      </div>
    </div>
  );
}