import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotelOptions";
import { HotelFormData } from "./ManageHotelForm";

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  const typeWatch = watch("type");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Type</h2>
      <div className="grid gap-2 md:grid-cols-5 grid-cols-3">
        {hotelTypes.map((type, i) => (
          <label
            key={i}
            className={`${
              typeWatch === type ? "bg-blue-300" : "bg-gray-300"
            } cursor-pointer text-sm rounded-full px-4 py-2 font-semibold text-black`}
          >
            <input
              type="radio"
              value={type}
              {...register("type", {
                required: "Please select a type of your hotel.",
              })}
              className="hidden"
            />
            <span> {type} </span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500 text-sm font-bold">
          {errors.type.message}
        </span>
      )}
    </div>
  );
};

export default TypeSection;
