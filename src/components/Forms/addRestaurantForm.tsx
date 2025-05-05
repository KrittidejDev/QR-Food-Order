"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { UserType } from "@/utils/type";

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
    <div>
      <h1 className="text-3xl font-bold mb-4">สร้างร้านใหม่</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-lg">
            ชื่อร้าน
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="p-3 w-full border rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-lg">
            เบอร์โทร
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="p-3 w-full border rounded-md"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-lg">
            ที่อยู่ร้าน (Optional)
          </label>
          <input
            type="text"
            id="address"
            name="address"
            className="p-3 w-full border rounded-md"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-md w-full"
          disabled={loading}
        >
          {loading ? "กำลังสร้างร้าน..." : "สร้างร้าน"}
        </button>
      </form>
    </div>
  );
};

export default AddRestaurantForm;
