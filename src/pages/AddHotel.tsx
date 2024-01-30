import { useMutation } from "react-query";
import ManageHotelForm from "../componenets/forms/ManageHotelForm";
import { addMyHotel } from "../api-client";
import { useAppContext } from "../context/AppContext";

const AddHotel = () => {
  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(addMyHotel, {
    onSuccess: () => {
      showToast({ message: "Hotel Saved.", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Failed to save, try again.", type: "ERROR" });
    },
  });
  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return <ManageHotelForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddHotel;
