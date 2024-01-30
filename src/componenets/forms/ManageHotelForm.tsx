import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import { HotelType } from "../../api-client";
import { useEffect } from "react";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  adultCount: number;
  childCount: number;
  imageUrls: string[];
};
type PropsType = {
  hotel?: HotelType;
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
};

const ManageHotelForm = ({ onSave, isLoading, hotel }: PropsType) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit, reset } = formMethods;

  const onSub = handleSubmit((formData: HotelFormData) => {
    const convertedForm = new FormData();
    if (hotel) {
      convertedForm.append("hotelId", hotel._id);
    }
    convertedForm.append("name", formData.name);
    convertedForm.append("city", formData.city);
    convertedForm.append("country", formData.country);
    convertedForm.append("description", formData.description);
    convertedForm.append("type", formData.type);
    convertedForm.append("pricePerNight", formData.pricePerNight.toString());
    convertedForm.append("starRating", formData.starRating.toString());
    convertedForm.append("adultCount", formData.adultCount.toString());
    convertedForm.append("childCount", formData.childCount.toString());
    formData.facilities.forEach((facility, i) => {
      convertedForm.append(`facilities[${i}]`, facility);
    });
    if (formData.imageUrls) {
      formData.imageUrls.forEach((url, i) => {
        convertedForm.append(`imageUrls[${i}]`, url);
      });
    }
    Array.from(formData.imageFiles).forEach((image) => {
      convertedForm.append("imageFiles", image);
    });
    onSave(convertedForm);
  });

  useEffect(() => {
    reset(hotel);
  }, [hotel, reset]);
  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSub}>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white py-2 px-4 font-bold hover:bg-blue-500 disabled:bg-gray-500"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
