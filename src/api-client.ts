import { BookingFormData } from "./componenets/forms/BookingForm";
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
  bookings: BookingType[];
};
export type BookingType = {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
  totalCost: number;
};

export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};
export const fetchCurrentUser = async (): Promise<UserType> => {
  const resp = await fetch(`${backendBaseUrl}/api/users/me`, {
    credentials: "include",
  });
  if (!resp.ok) {
    throw new Error("Error fetching user");
  }
  return resp.json();
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
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
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

  queryParams.append("maxPrice", searchParams.maxPrice || "");
  queryParams.append("sortOption", searchParams.sortOption || "");
  searchParams.facilities?.forEach((facility) =>
    queryParams.append("facilities", facility)
  );
  searchParams.types?.forEach((type) => queryParams.append("types", type));
  searchParams.stars?.forEach((star) => queryParams.append("stars", star));

  const resp = await fetch(
    `${backendBaseUrl}/api/hotels/search?${queryParams}`
  );
  const data = await resp.json();

  if (!resp.ok) {
    throw new Error("Failed to find hotel.");
  }
  return data;
};

export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
  const resp = await fetch(`${backendBaseUrl}/api/hotels/${hotelId}`);
  const data = await resp.json();
  if (!resp.ok) {
    throw new Error("Failed to get hotel.");
  }
  return data;
};

export type PaymentIntentResponse = {
  paymenintentId: string;
  clientSecret: string;
  totalCost: number;
};
export const createPaymentIntent = async (
  hotelId: string,
  numberOfNights: string
): Promise<PaymentIntentResponse> => {
  const resp = await fetch(
    `${backendBaseUrl}/api/hotels/${hotelId}/bookings/payment-intent`,
    {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ numberOfNights }),
    }
  );
  if (!resp.ok) {
    throw new Error("Error fetching payment intent");
  }
  return resp.json();
};

export const createRoomBooking = async (formData: BookingFormData) => {
  const { hotelId } = formData;
  const resp = await fetch(`${backendBaseUrl}/api/hotels/${hotelId}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formData),
  });

  if (!resp.ok) {
    throw new Error("Error booking room");
  }
};

export const fetchMyBookings = async (): Promise<HotelType[]> => {
  const resp = await fetch(`${backendBaseUrl}/api/my-bookings`, {
    credentials: "include",
  });
  const data = await resp.json();
  if (!resp.ok) {
    throw new Error("Error getting bookings");
  }

  console.log(data);

  return data;
};

export const fetchHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${backendBaseUrl}/api/hotels`);
  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }
  return response.json();
};
