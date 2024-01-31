import { FormEvent, useState } from "react";
import { useSearchContext } from "../context/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const search = useSearchContext();
  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [chickOut, setChickOut] = useState<Date>(search.checkOut);
  const [childCount, setChildCount] = useState<number>(search.childCount);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      chickOut,
      childCount,
      adultCount
    );
    navigate("/search");
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form
      onSubmit={handleSubmit}
      className="-mt-8 p-3 bg-orange-400 rounded shadow-md 
  grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4"
    >
      <div className="flex items-center flex-1 bg-white p-2">
        <MdTravelExplore size={20} className="mr-2 text-black" />
        <input
          type="text"
          placeholder="Where are you going?"
          value={destination}
          className="text-md w-full focus:outline-none"
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>
      <div className=" flex bg-white px-2 py-1 gap-2">
        <label className="flex items-center text-black">
          Adults:
          <input
            type="number"
            min={1}
            max={20}
            className="w-12 p-1 focus:outline-none font-bold bg-gray-100 rounded-lg text-center"
            value={adultCount}
            onChange={(e) => setAdultCount(parseInt(e.target.value))}
          />
        </label>
        <label className="flex items-center text-black">
          Children:
          <input
            type="number"
            min={0}
            max={20}
            className="w-12 p-1 focus:outline-none font-bold bg-gray-100 rounded-lg text-center"
            value={childCount}
            onChange={(e) => setChildCount(parseInt(e.target.value))}
          />
        </label>
      </div>
      <div className="">
        <ReactDatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={chickOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className="min-w-full bg-white p-2 focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>
      <div className="">
        <ReactDatePicker
          selected={chickOut}
          onChange={(date) => setChickOut(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={chickOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className="min-w-full bg-white p-2 focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>
      <div className="flex gap-1">
        <button
          type="submit"
          className=" w-2/3 bg-blue-600 hover:bg-blue-500 h-full font-bold p-2 text-white"
        >
          Search
        </button>
        <button
          type="button"
          className=" w-1/3 bg-red-600 hover:bg-red-500 h-full font-bold p-2 text-white"
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default Searchbar;
