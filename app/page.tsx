import Header from "../components/TopBar";
import BusinessSolutions from "./components/BusinessSolutions";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black overflow-x-hidden">
      {/* টপবার বা হেডার অংশ */}
      <Header />

      {/* মূল পেজের কন্টেন্ট */}
      <main>
        {/* ব্যবসার জন্য ক্যাশি সেকশন */}
        <BusinessSolutions />
      </main>
    </div>
  );
}