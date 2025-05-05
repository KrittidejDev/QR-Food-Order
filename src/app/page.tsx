import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full min-h-dvh flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-pink-100 to-blue-200">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-8 text-center drop-shadow-md">
        QR Food Order
      </h1>
      <Link href="/dashboard">
        <Button className="text-lg px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
          จัดการร้านค้า
        </Button>
      </Link>
    </div>
  );
}
