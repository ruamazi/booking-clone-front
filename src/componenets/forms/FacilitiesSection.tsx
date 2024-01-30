import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotelOptions";
import { HotelFormData } from "./ManageHotelForm";

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Facilities</h2>
      <div className="grid md:grid-cols-5 grid-cols-3 gap-3">
        {hotelFacilities.map((each, i) => (
          <label key={i} className="text-sm flex gap-1 text-gray-700">
            <input
              type="checkbox"
              value={each}
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true;
                  } else {
                    return "At least one facility is required";
                  }
                },
              })}
            />
            {each}
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className=" text-red-500 text-sm font-bold">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
};

export default FacilitiesSection;
