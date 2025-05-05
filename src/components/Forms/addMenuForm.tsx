import { MenuType } from "@/utils/type";
import React, { FormEvent, useState } from "react";

type AddMenuFormProps = {
  onSubmit: (data: MenuType) => void;
  initialValue?: MenuType;
};

const AddMenuForm = ({ onSubmit, initialValue }: AddMenuFormProps) => {
  const [_name, _setName] = useState<string>(initialValue?.name || "");
  const [_price, _setPrice] = useState<string>(initialValue?.price || "");
  const [_category, _setCategory] = useState<string>(
    initialValue?.category || ""
  );
  const [_image, _setImage] = useState<File | null | string>(
    initialValue?.image || null
  );
  const [_previewImage, _setPreviewImage] = useState<string | null>(
    typeof initialValue?.image === "string" ? initialValue.image : null
  );

  const _menuId = initialValue?.id;

  const _handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    _setImage(file);
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      _setPreviewImage(previewUrl);
    } else {
      _setPreviewImage(null);
    }
  };

  const _handleAddMenu = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: MenuType = {
      name: _name,
      price: _price,
      category: _category,
      image: _image,
      id: _menuId!,
    };

    onSubmit(data);
  };

  return (
    <form onSubmit={_handleAddMenu}>
      <div className="bg-white p-4 rounded shadow-md mb-6 max-w-md">
        <h2 className="font-semibold mb-2">
          {initialValue ? "แก้ไขเมนู" : "เพิ่มเมนูใหม่"}
        </h2>
        {_previewImage && (
          <div className="flex justify-center mb-2 w-full">
            <img
              src={_previewImage}
              alt="Preview"
              className="max-h-40 object-contain"
            />
          </div>
        )}
        <input
          className="w-full mb-2 p-2 border"
          placeholder="ชื่อเมนู"
          value={_name}
          onChange={(e) => _setName(e.target.value)}
        />
        <input
          className="w-full mb-2 p-2 border"
          placeholder="ราคา"
          value={_price}
          onChange={(e) => _setPrice(e.target.value)}
          type="number"
        />
        <input
          className="w-full mb-2 p-2 border"
          placeholder="หมวดหมู่"
          value={_category}
          onChange={(e) => _setCategory(e.target.value)}
        />
        <input
          type="file"
          onChange={_handleFileChange}
          className="w-full mb-2 p-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {initialValue ? "💾 บันทึกการแก้ไข" : "➕ เพิ่มเมนู"}
        </button>
      </div>
    </form>
  );
};

export default AddMenuForm;
