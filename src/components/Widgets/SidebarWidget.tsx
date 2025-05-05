"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type RestaurantProps = {
  id: string;
  name: string;
  phone: string;
};

export default function Sidebar() {
  const router = useRouter();
  const [_selectedRestaurant, _setSelectedRestaurant] =
    useState<RestaurantProps>();
  const restaurant = useSelector((state: any) => state.restaurant);

  const handleLogout = async () => {
    const res = await axios.post("/api/auth/logout");
    if (res.status === 200) {
      alert("Logout success");
      router.push("/");
    }
  };

  useEffect(() => {
    if (restaurant) {
      _setSelectedRestaurant({
        id: restaurant.restaurantId,
        name: restaurant.restaurantName,
        phone: restaurant.restaurantPhone,
      });
    }
  }, [restaurant]);

  return (
    <aside className="w-full sm:w-64 h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white flex flex-col p-6 shadow-lg">
      <div className="text-xl font-semibold mb-6 text-yellow-400">
        🍽️ Scan to Order
      </div>

      <div className="mb-8">
        {_selectedRestaurant ? (
          <>
            <div className="text-lg font-bold">{_selectedRestaurant.name}</div>
            <div className="text-sm text-gray-400">ร้านอาหารของคุณ</div>
          </>
        ) : (
          <div className="text-lg font-bold text-gray-300">ร้านอาหารของฉัน</div>
        )}
      </div>

      <nav className="flex flex-col gap-4 text-base font-medium">
        {_selectedRestaurant ? (
          <>
            <Link
              href="/dashboard/restaurant/menus"
              className="hover:text-yellow-400 transition-colors"
            >
              🍽️ เมนูอาหาร
            </Link>
            <Link
              href="/dashboard/restaurant/tables"
              className="hover:text-yellow-400 transition-colors"
            >
              🪑 โต๊ะ
            </Link>
            <Link
              href="/dashboard/restaurant/orders"
              className="hover:text-yellow-400 transition-colors"
            >
              📦 ออเดอร์
            </Link>
            <Link
              href="/dashboard/restaurant/receipts"
              className="hover:text-yellow-400 transition-colors"
            >
              🧾 ใบเสร็จ
            </Link>
          </>
        ) : (
          <Link
            href="/dashboard"
            className="hover:text-yellow-400 transition-colors"
          >
            🏠 Dashboard
          </Link>
        )}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto text-red-400 hover:text-red-500 transition-colors font-semibold"
      >
        🚪 Logout
      </button>
    </aside>
  );
}
