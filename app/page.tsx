import Header from "../components/TopBar";
import BusinessSolutions from "./components/BusinessSolutions";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden text-gray-900">
      
      {/* হেডারকে fixed এবং top-0 করে দেওয়া হয়েছে, ফলে পেজ যত খুশি ওপরের দিকে স্ক্রোল করুন না কেন হেডার একদম ফিক্সড থাকবে */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white shadow-sm">
        <Header />
      </header>

      {/* যেহেতু হেডার fixed করা হয়েছে, তাই নিচে মূল কন্টেন্টের ওপর যেন হেডারটি চেপে না বসে, এজন্য ওপরের দিকে মার্জিন (pt) দেওয়া হলো */}
      <main className="pt-20 sm:pt-24">
        <BusinessSolutions />
      </main>
    </div>
  );
}