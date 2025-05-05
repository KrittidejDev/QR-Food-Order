"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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

const CreateRestaurantPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const userId = useSelector((state: any) => state.auth.user?.id);
  const [_restaurant, _setRestaurant] = useState<RestaurantType>();
  const [_menuData, _setMenuDat] = useState();
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    fetch();
  }, [userId]);

  const fetch = async () => {
    try {
      const res = await axios.get(`/api/restaurants?ownerId=${userId}`);
      if (res.status === 200) {
        const allRestaurants = res.data.restaurants;
        const selected = allRestaurants.find(
          (r: RestaurantType) => r.id === id
        );
        _setRestaurant(selected);
      }

      const resMenu = await axios.get(`/api/menu?restaurantId=${id}`);
      if (resMenu.status === 200) {
        _setMenuDat(resMenu.data.menus);
      }
    } catch (err) {
      toast.error(err as string);
    }
    const res = await axios.get(`/api/restaurants?ownerId=${userId}`);
    if (res.status === 200) {
      const allRestaurants = res.data.restaurants;
      const selected = allRestaurants.find((r: RestaurantType) => r.id === id);
      _setRestaurant(selected);
    }
  };

  return (
    <div>
      <img src={"/assets/images/banner.png"} alt="banner" className="w-full" />
      <div className="relative -mt-15 flex  justify-center ">
        <img
          src="/assets/images/avatar.png"
          alt="avatar"
          className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
        />
      </div>
      <div className="flex flex-col items-center mb-10">
        <div className="font-bold ">{_restaurant?.name}</div>
      </div>
      <div className="flex flex-wrap gap-3 p-4 ">
        {_menuData &&
          _menuData.map((e) => (
            <Card
              key={e.id}
              className=" flex flex-col max-w-1/2 flex-1/3 p-2 gap-2"
            >
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
                      // onClick={() => handleSubtract(e.id)}
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
                  // onClick={() => handleAdd(e.id)}
                >
                  +
                </Button>
              </div>
            </Card>
          ))}
      </div>
      <div className="flex justify-center mb-50">
        <Button className="bg-red-500 text-white">ลบร้าน</Button>
      </div>
    </div>
  );
};

export default CreateRestaurantPage;
