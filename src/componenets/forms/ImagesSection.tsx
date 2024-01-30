import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<HotelFormData>();

  const existingImages = watch("imageUrls");

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    e.preventDefault();
    setValue(
      "imageUrls",
      existingImages.filter((url) => url !== imageUrl)
    );
  };

  return (
    <div>
      <h2 className=" text-2xl font-bold mb-3">Select Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        {existingImages && (
          <div className="grid grid-cols-6 gap-3">
            {existingImages.map((url, i) => (
              <div key={i} className=" relative group">
                <img
                  src={url}
                  alt="images"
                  className="mi-h-full object-cover"
                />
                <button
                  className=" absolute inset-0 flex items-center justify-center bg-black bg-opacity-50
                 opacity-0 group-hover:opacity-100 text-white"
                  onClick={(e) => handleDelete(e, url)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          className="w-full text-gray-700 font-normal"
          type="file"
          multiple
          accept="image/*"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength =
                imageFiles.length + (existingImages?.length || 0);
              if (totalLength === 0) {
                return "At least one image should be added.";
              }
              if (totalLength > 6) {
                return "You cannot add more than 6 images.";
              }
              return true;
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className=" text-red-500 text-sm font-bold">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
};

export default ImagesSection;
