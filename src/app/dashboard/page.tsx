"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { setSelectedRestaurant } from "@/store/slices/restaurantSlice";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { RestaurantType, UserType } from "@/utils/type";

const DashBoardPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [restaurants, setRestaurants] = useState<RestaurantType[]>([]);

  const userId = useSelector((state: UserType) => state.auth.user?.id);

  const fetchRestaurants = async () => {
    if (!userId) {
      dispatch(logout());
      router.push("/auth/login");
    }
    try {
      const res = await axios.get(`/api/restaurants?ownerId=${userId}`);
      if (res.status === 200) {
        setRestaurants(res.data.restaurants);
      }
    } catch (error) {
      console.error("Failed to fetch restaurants:", error);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleSelectRestaurant = (id: string) => {
    const selected = restaurants.find((r: RestaurantType) => r.id === id);

    if (selected) {
      dispatch(
        setSelectedRestaurant({
          id: selected.id,
          name: selected.name,
          phone: selected.phone,
        })
      );
      router.push(`/dashboard/restaurant/menus`);
    }
  };

  return (
    <div>
      <div className="flex-1 p-2 pb-40">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold mb-4">ร้านของคุณ</h1>
          <Button
            onClick={() => router.push("/dashboard/restaurant")}
            className=" text-white p-3 rounded-md mb-4"
          >
            สร้างร้าน
          </Button>
        </div>

        <div>
          <div className="space-y-2">
            {restaurants.map((restaurant: RestaurantType) => (
              <Card
                key={restaurant.id}
                onClick={() => handleSelectRestaurant(restaurant.id)}
                className="p-4"
              >
                <CardTitle>{restaurant.name}</CardTitle>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardPage;
