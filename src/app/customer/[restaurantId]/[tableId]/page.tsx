"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function TableOrderPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const { restaurantId, tableId } = useParams() as {
    restaurantId: string;
    tableId: string;
  };

  useEffect(() => {
    if (restaurantId) {
      fetchMenu();
    }
  }, [restaurantId]);

  console.log("rester ID", restaurantId);
  console.log("table ID", tableId);
  const fetchMenu = async () => {
    const res = await axios.get(`/api/menu?restaurantId=${restaurantId}`);
    setMenuItems(res.data.menus);
  };

  const handleAdd = (id: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleSubmit = async () => {
    const items = Object.entries(selectedItems).map(([id, qty]) => ({
      id,
      qty,
    }));

    const totalAmount = menuItems.reduce((sum, item) => {
      const qty = selectedItems[item.id] || 0;
      return sum + qty * parseFloat(item.price);
    }, 0);

    await axios.post("/api/order", {
      restaurantId,
      tableId,
      items,
      totalAmount,
      status: "pending",
    });

    alert("สั่งอาหารเรียบร้อยแล้ว");
    setSelectedItems({});
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">เมนูอาหาร</h2>
      <ul className="space-y-2">
        {menuItems.map((item: any) => (
          <div
            key={item.id}
            className="flex p-4 bg-white shadow-md rounded justify-between"
          >
            <div className="flex items-center gap-x-6">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                />
              )}
              <div>
                <div className="font-semibold">{item.name}</div>
                <div>{item.category}</div>
                <div>{item.price} บาท</div>
              </div>{" "}
            </div>
            <button
              onClick={() => handleAdd(item.id)}
              className="bg-green-600 text-white px-2 py-1 rounded"
            >
              เพิ่ม
            </button>
          </div>
        ))}
      </ul>

      {Object.keys(selectedItems).length > 0 && (
        <div className="mt-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            ยืนยันการสั่งอาหาร
          </button>
        </div>
      )}
    </div>
  );
}
