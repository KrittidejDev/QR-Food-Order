export type RestaurantType = {
  address?: string;
  createdAt?: string;
  id: string;
  name: string;
  ownerId?: string;
  phone: string;
};

export type UserType = {
  auth: {
    user: {
      email: string;
      id: string;
    };
  };
};

export type MenuType = {
  active?: string;
  category: string;
  id: string;
  image: string | File | null;
  name: string;
  price: string;
  restaurantId?: string;
};

export type TableType = {
  id: string;
  name: string;
  qr_code_link: string;
  restaurantId: string;
};
