"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { UserType } from "@/utils/type";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AddRestaurantForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const userId = useSelector((state: UserType) => state.auth.user?.id);

  useEffect(() => {
    if (!userId) {
      dispatch(logout());
      router.push("/auth/login");
    }
  }, [userId, dispatch, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/api/restaurants", {
        name,
        address,
        phone,
        ownerId: userId,
      });

      if (res.status === 201) {
        router.push("/dashboard");
      }
    } catch (error) {
      setError("Failed to create restaurant.");
      console.error("Error creating restaurant:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">สร้างร้านใหม่</CardTitle>
        <CardDescription>สร้างร้านและใส่รายละเอียด</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">ชื่อร้าน</Label>
              <Input
                id="name"
                type="text"
                placeholder=""
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">เบอร์โทร</Label>
              <Input
                id="phone"
                type="text"
                placeholder=""
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">ที่อยู่</Label>
              <Input
                id="address"
                type="text"
                placeholder=""
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "กำลังสร้างร้าน..." : "สร้างร้าน"}
            </Button>
            {error && <div className="text-red-500 mb-4">{error}</div>}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddRestaurantForm;
