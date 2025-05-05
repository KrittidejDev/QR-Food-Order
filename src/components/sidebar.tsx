"use client";

import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { logout } from "@/store/slices/authSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import Link from "next/link";
import { setSelectedRestaurant } from "@/store/slices/restaurantSlice";
import { RestaurantType, UserType } from "@/utils/type";

type RestaurantProps = {
  id: string;
  name: string;
  phone: string;
};

export function AppSidebar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const userId = useSelector((state: UserType) => state.auth.user?.id);
  const [_restaurants, _setRestaurants] = useState<RestaurantProps[]>([]);

  const fetch = async () => {
    if (!userId) {
      dispatch(logout());
      router.push("/auth/login");
    }
    try {
      const res = await axios.get(`/api/restaurants?ownerId=${userId}`);
      if (res.status === 200) {
        _setRestaurants(res.data.restaurants);
      }
    } catch (error) {
      console.error("Failed to fetch restaurants:", error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleLogout = async () => {
    const res = await axios.post("/api/auth/logout");
    if (res.status === 200) {
      alert("Logout success");
      router.push("/");
    }
  };

  const handleSelectRestaurant = (data: RestaurantType) => {
    if (data) {
      dispatch(
        setSelectedRestaurant({
          id: data.id,
          name: data.name,
          phone: data.phone,
        })
      );
      router.push("/dashboard/restaurant/menus");
    }
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href={`/dashboard`}>🍽️ QR Food Order</Link>
        <SidebarMenu>
          <Link
            href={`/dashboard`}
            className="hover:text-yellow-400 transition-colors"
          >
            จัดการร้าน
          </Link>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarMenu>
        {_restaurants &&
          _restaurants.map((e) => (
            <Collapsible
              key={e.id}
              defaultOpen={false}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    className="hover:text-yellow-400 font-bold transition-colors"
                    onClick={() => handleSelectRestaurant(e)}
                  >
                    {e.name}
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <Link
                        href={`/dashboard/restaurant/menus?restaurant=${e.id}`}
                        className="hover:text-yellow-400 transition-colors"
                      >
                        🍽️ เมนูอาหาร
                      </Link>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <Link
                        href={`/dashboard/restaurant/tables?restaurant=${e.id}`}
                        className="hover:text-yellow-400 transition-colors"
                      >
                        🪑 โต๊ะ
                      </Link>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <Link
                        href={`/dashboard/restaurant/orders?restaurant=${e.id}`}
                        className="hover:text-yellow-400 transition-colors"
                      >
                        📦 ออเดอร์
                      </Link>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
      </SidebarMenu>
      <SidebarFooter>
        <SidebarMenu className=" text-red-400 hover:text-red-500 transition-colors font-semibold">
          <Link href={`/dashboard/restaurant`}>➕ สร้างร้าน</Link>
        </SidebarMenu>
        <SidebarMenu
          onClick={handleLogout}
          className=" text-red-400 hover:text-red-500 transition-colors font-semibold"
        >
          🚪 Logout
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
