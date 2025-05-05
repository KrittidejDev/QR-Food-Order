"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TableType } from "@/utils/type";

type RestaurantType = {
  address: string;
  createdAt: string;
  id: string;
  name: string;
  ownerId: string;
  phone: string;
  cover_img?: string;
  avatar?: string;
};

type MenuType = {
  active: boolean;
  category: string;
  id: string;
  image: string;
  name: string;
  price: string;
};

export default function TableOrderPage() {
  const [_menuData, _setMenuData] = useState<MenuType[]>([]);
  const [_restaurant, _setRestaurant] = useState<RestaurantType>();
  const [_tableData, _setTableData] = useState<TableType>();
  const [selectedItems, setSelectedItems] = useState<{ [id: string]: number }>(
    {}
  );
  const { restaurantId, tableId } = useParams() as {
    restaurantId: string;
    tableId: string;
  };

  useEffect(() => {
    if (restaurantId) {
      fetch();
    }
  }, [restaurantId]);

  const fetch = async () => {
    try {
      const res = await axios.get(`/api/restaurants/${restaurantId}`);
      console.log("res", res);
      if (res.status === 200) {
        const restaurants = res.data.restaurant;
        const menu = restaurants.menuItems;
        const tables = restaurants.tables;
        const currentTable = tables.find((t: TableType) => t.id === tableId);

        _setRestaurant(restaurants);
        _setMenuData(menu);
        _setTableData(currentTable);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle adding item to the cart
  const handleAdd = (id: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1, // เพิ่มจำนวนถ้ามีรายการอยู่แล้ว ถ้าไม่มีให้เริ่มต้นที่ 1
    }));
  };

  // Handle subtracting item from the cart
  const handleSubtract = (id: string) => {
    setSelectedItems((prev) => {
      const currentQty = prev[id] || 0;
      if (currentQty > 0) {
        return {
          ...prev,
          [id]: currentQty - 1, // ลดจำนวนถ้ามีรายการอยู่แล้ว
        };
      }
      return prev; // ถ้าไม่มีจำนวนให้ไม่ทำอะไร
    });
  };

  console.log("selectedItems", selectedItems);

  return (
    <div className="p-5">
      <img
        src={"/assets/images/banner.png"}
        alt="banner"
        className="w-full h-auto rounded"
      />
      <div className="relative -mt-15 flex justify-center ">
        <img
          src="/assets/images/avatar.png"
          alt="avatar"
          className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
        />
      </div>
      <div className="flex flex-col items-center ">
        <div className="font-bold">{_restaurant?.name}</div>
        <div className="text-sm mb-2">{_tableData?.name}</div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {_menuData &&
          _menuData.map((e) => (
            <Card key={e.id} className=" flex flex-col  p-2 gap-2">
              {e.image && (
                <img
                  src={e.image}
                  alt={e.name}
                  className="w-full h-auto rounded"
                />
              )}
              <div className="flex flex-col">
                <div className="text-sm font-semibold">{e.name}</div>
                <div className="text-sm">{e.price} บาท</div>
              </div>
              <div className="flex items-center justify-end gap-2 mt-auto">
                {selectedItems[e.id] >= 1 && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`text-sm  hover:bg-yellow-600 ${
                        selectedItems[e.id] >= 1
                          ? "bg-orange-500 text-white"
                          : ""
                      }`}
                      onClick={() => handleSubtract(e.id)}
                    >
                      -
                    </Button>
                    <span className="text-sm">{selectedItems[e.id]}</span>
                  </>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className={`text-sm  hover:bg-yellow-600 ${
                    selectedItems[e.id] >= 1 ? "bg-orange-500 text-white" : ""
                  }`}
                  onClick={() => handleAdd(e.id)}
                >
                  +
                </Button>
              </div>
            </Card>
          ))}
      </div>

      {/*   <div className="flex justify-center mb-50">
        <Button className="bg-red-500 text-white">ลบร้าน</Button>
      </div> */}
    </div>
  );
}
