import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/Signin";

export const backendBaseUrl = import.meta.env.VITE_BACKEND_URL as string;

export type HotelType = {
  _id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  lastUpdated: Date;
};

export const register = async (formData: RegisterFormData) => {
  const resp = await fetch(`${backendBaseUrl}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const data = await resp.json();
  if (!resp.ok) {
    throw new Error(data.error);
  }
};

export const validateToken = async () => {
  const resp = await fetch(`${backendBaseUrl}/api/auth/validate-token`, {
    credentials: "include",
  });
  if (!resp.ok) {
    throw new Error("Invalid token");
  }
  return resp.json();
};

export const signIn = async (formData: SignInFormData) => {
  const resp = await fetch(`${backendBaseUrl}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const data = await resp.json();
  if (!resp.ok) {
    throw new Error(data.error);
  }
  return data;
};

export const signOut = async () => {
  const resp = await fetch(`${backendBaseUrl}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!resp.ok) {
    throw new Error("Error during sign out");
  }
};

export const addMyHotel = async (hotelFormData: FormData) => {
  const resp = await fetch(`${backendBaseUrl}/api/my-hotels`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });
  if (!resp.ok) {
    throw new Error("Failed to add hotel");
  }
  return resp.json();
};

export const fetchMyHotels = async (): Promise<HotelType[]> => {
  const resp = await fetch(`${backendBaseUrl}/api/my-hotels`, {
    credentials: "include",
  });
  if (!resp.ok) {
    throw new Error("Failed to fetch hotels");
  }
  return resp.json();
};

export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
  const resp = await fetch(`${backendBaseUrl}/api/my-hotels/${hotelId}`, {
    credentials: "include",
  });
  if (!resp.ok) {
    throw new Error("Failed to get data");
  }
  return resp.json();
};

export const updateMyHotelById = async (hotelFormData: FormData) => {
  const hotelId = hotelFormData.get("hotelId");
  const resp = await fetch(`${backendBaseUrl}/api/my-hotels/${hotelId}`, {
    method: "PUT",
    credentials: "include",
    body: hotelFormData,
  });
  if (!resp.ok) {
    throw new Error("Failed to update hotel.");
  }
  return resp.json();
};

export type SearchParamsType = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
};

export type HotelSearchResponse = {
  data: HotelType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export const searchHotels = async (
  searchParams: SearchParamsType
): Promise<HotelSearchResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append("destination", searchParams.destination || "");
  queryParams.append("checkIn", searchParams.checkIn || "");
  queryParams.append("checkOut", searchParams.checkOut || "");
  queryParams.append("adultCount", searchParams.adultCount || "");
  queryParams.append("childCount", searchParams.childCount || "");
  queryParams.append("page", searchParams.page || "");

  const resp = await fetch(
    `${backendBaseUrl}/api/hotels/search?${queryParams}`
  );

  if (!resp.ok) {
    throw new Error("Failed to find hotel.");
  }
  return resp.json();
};
