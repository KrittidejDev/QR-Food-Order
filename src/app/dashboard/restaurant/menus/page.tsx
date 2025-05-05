"use client";
import { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import { uploadFileToPinata } from "@/lib/pinata";
import { useSelector } from "react-redux";
import { Modal } from "@/components/Modal/Modal";
import AddMenuForm from "@/components/Forms/addMenuForm";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type MenuItem = {
  id?: string;
  name: string;
  price: string;
  category: string;
  image: string | File | null;
  active?: boolean;
};

export default function MenusPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [_isShowModal, _setIsShowModal] = useState(false);
  const [_renderModal, _setRenderModal] = useState<ReactElement>();
  const restaurant = useSelector((state: any) => state.restaurant);
  const id = restaurant.restaurantId;

  useEffect(() => {
    if (id) {
      fetchMenus();
    }
  }, [id]);

  const fetchMenus = async () => {
    if (!id) return;
    const res = await axios.get(`/api/menu?restaurantId=${id}`);
    setMenuItems(res.data.menus);
  };

  const _handleAddMenu = (data?: MenuItem) => {
    _setRenderModal(
      <AddMenuForm initialValue={data} onSubmit={_handleSubmit} />
    );
    _setIsShowModal(true);
  };

  const _handleSubmit = async (data: MenuItem) => {
    if (!data.name || !data.price || !data.category) return;

    // อัปโหลดรูปถ้ามี
    let imageUrl = "";
    const image = data.image;
    if (typeof image === "string") {
      imageUrl = image; // ใช้รูปเดิม
    } else if (image instanceof File) {
      imageUrl = await uploadFileToPinata(image); // อัปโหลดเฉพาะถ้าเป็นไฟล์ใหม่
    }

    const values = {
      name: data.name,
      price: data.price,
      category: data.category,
      image: imageUrl,
      active: true,
      userId: id,
    };

    const mode = typeof data.id === "string" && data.id.length > 0;

    try {
      if (mode) {
        const res = await axios.patch(`/api/menu/${data.id}`, values);
        if (res.status === 200) {
          toast.success("Update Success");
          _setIsShowModal(false);
        } else {
          toast.error("Update not Success");
          _setIsShowModal(false);
        }
      } else {
        const res = await axios.post("/api/menu", values);

        if (res.status === 201) {
          toast.success("Add Menu Success");
          _setIsShowModal(false);
        } else {
          toast.success("Add Menu not Success");
          _setIsShowModal(false);
        }
      }
    } catch (err) {
      toast.error("err");
    }

    fetchMenus();
  };

  const _handleDeleteMenu = async (itemId: string) => {
    const confirmDelete = window.confirm("คุณแน่ใจว่าจะลบเมนูนี้?");
    if (!confirmDelete) return;

    // ลบเมนูจากฐานข้อมูล
    await axios.delete(`/api/menu/${itemId}`);

    fetchMenus();
  };

  const _handleCloseModal = () => {
    _setIsShowModal(false);
  };

  return (
    <div className="flex-1 p-2 pb-40">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold mb-4">จัดการเมนูอาหาร</h1>
        <Button
          onClick={() => _handleAddMenu()}
          className=" text-white p-3 rounded-md mb-4"
        >
          ➕ เพิ่มเมนู
        </Button>
      </div>

      <div className="flex flex-wrap gap-3 ">
        {menuItems.map((item) => (
          <Card key={item.id} className="flex flex-1/3 p-4 mb-2 ">
            {item.image && <img src={item.image} alt={item.name} width={500} />}
            <div className="flex  items-center justify-between">
              <div className="flex flex-col">
                <div className="font-semibold">{item.name}</div>
                <div>{item.price} บาท</div>
              </div>
            </div>
            <div className="flex justify-end ">
              <Button
                className="bg-gray-500 text-white px-2 rounded hover:bg-yellow-600 mr-2"
                onClick={() => _handleAddMenu(item)}
              >
                ✏️ แก้ไข
              </Button>
              <Button
                className="bg-red-500 text-white  px-2 rounded hover:bg-red-600"
                onClick={() => _handleDeleteMenu(item.id)}
              >
                🗑️ ลบ
              </Button>
            </div>
          </Card>
        ))}
      </div>
      <Modal isOpen={_isShowModal} onClose={_handleCloseModal}>
        {_renderModal}
      </Modal>
    </div>
  );
}
