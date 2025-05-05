"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import domtoimage from "dom-to-image";

type TableType = {
  id: string;
  name: string;
  qr_code_link: string;
  restaurantId: string;
};

type RestaurantType = {
  restaurant: {
    restaurantId: string;
    restaurantName: string;
    restaurantPhone: string;
  };
};

export default function TableManager() {
  const [_tables, _setTables] = useState([]);
  const [_name, _setName] = useState("");
  const restaurant = useSelector((state: RestaurantType) => state.restaurant);
  const id = restaurant.restaurantId;
  const restaurantName = restaurant.restaurantName;
  const restaurantPhone = restaurant.restaurantPhone;

  const fetchTables = async () => {
    const res = await axios.get(`/api/table?restaurantId=${id}`);
    _setTables(res.data);
  };

  const handleCreate = async () => {
    const values = {
      name: _name,
      restaurantId: id,
    };
    await axios.post("/api/table", values);
    _setName("");
    fetchTables();
  };

  const handleDelete = async (tableId: string) => {
    await axios.delete(`/api/table/${tableId}`);
    fetchTables();
  };

  const handleDownload = async (table: { id: string; name: string }) => {
    const element = document.getElementById(`card-${table.id}`);
    if (element) {
      element.style.backgroundColor = "#ffffff";

      try {
        // ใช้ dom-to-image แทน html2canvas
        domtoimage
          .toPng(element)
          .then(function (dataUrl: string) {
            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = `${restaurantName}-${table.name}.png`; // ตั้งชื่อไฟล์
            link.click();
          })
          .catch(function (error: string) {
            console.error("oops, something went wrong!", error);
          });
      } catch (error) {
        console.error("Error during downloading:", error);
      }
    }
  };

  useEffect(() => {
    if (id) fetchTables();
  }, [id]);

  return (
    <div className="p-4 pb-40">
      <h2 className="text-xl font-bold mb-4">จัดการโต๊ะ</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="ชื่อโต๊ะ"
          value={_name}
          onChange={(e) => _setName(e.target.value)}
          className="border px-2 py-1"
        />
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          เพิ่มโต๊ะ
        </button>
      </div>
      <div className="space-y-2">
        {_tables.map((table: TableType) => (
          <div key={table.id} className="relative">
            <Card className="flex  p-4  items-center">
              <div
                id={`card-${table.id}`}
                className="flex flex-col border p-4  items-center"
              >
                <div className="text-xl font-bold ">ร้าน {restaurantName}</div>
                <div className="text-sm ">โทร. {restaurantPhone}</div>
                {table.qr_code_link && (
                  <div>
                    <img
                      src={table.qr_code_link}
                      alt="QR Code"
                      className="w-32 h-32"
                    />
                  </div>
                )}
                <span>{table.name}</span>
              </div>
              <Button
                onClick={() => handleDownload(table)}
                className="bg-green-600 text-white px-2 py-1 rounded"
              >
                ดาวน์โหลด
              </Button>
              <Button
                onClick={() => handleDelete(table.id)}
                className="bg-red-500 text-white"
              >
                ลบ
              </Button>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
