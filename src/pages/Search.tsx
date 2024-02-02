import { useQuery } from "react-query";
import { useSearchContext } from "../context/SearchContext";
import { searchHotels } from "../api-client";
import { ChangeEvent, useState } from "react";
import SearchResultCard from "../componenets/SearchResultCard";
import Pagination from "../componenets/Pagination";
import StarRatingFilter from "../componenets/StarRatingFilter";
import HotelTypesFilter from "../componenets/HotelTypesFilter";
import FacilitiesFilter from "../componenets/FacilitiesFilter";
import PriceFilter from "../componenets/PriceFilter";

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [sortOption, setSortOption] = useState<string>("");

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  };

  const { data: hotelData } = useQuery(["searchHotels", searchParams], () =>
    searchHotels(searchParams)
  );

  const handleStarsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const starRating = e.target.value;
    setSelectedStars((prev) =>
      e.target.checked
        ? [...prev, starRating]
        : prev.filter((star) => star !== starRating)
    );
  };
  const handleTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const hotelType = e.target.value;
    setSelectedHotelTypes((prev) =>
      e.target.checked
        ? [...prev, hotelType]
        : prev.filter((type) => type !== hotelType)
    );
  };
  const handleFacilityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const facility = e.target.value;
    setSelectedFacilities((prev) =>
      e.target.checked
        ? [...prev, facility]
        : prev.filter((each) => each !== facility)
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="border border-slate-300 rounded p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className=" text-lg font-semibold border-b border-slate-300 pb-5">
            Filtred by:
          </h3>
          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarsChange}
          />
          <HotelTypesFilter
            selectedHotelTypes={selectedHotelTypes}
            onChange={handleTypeChange}
          />
          <FacilitiesFilter
            selectedFacilities={selectedFacilities}
            onChange={handleFacilityChange}
          />
          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={(value?: number) => setSelectedPrice(value)}
          />
        </div>
      </div>
      <div className=" flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className=" text-xl font-bold">
            {hotelData?.pagination.total} Hotels found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="">Sort By</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">
              Price per night (low to high)
            </option>
            <option value="pricePerNightDesc">
              Price per night (high to low)
            </option>
          </select>
        </div>
        {hotelData?.data.map((hotel, i) => (
          <SearchResultCard key={i} hotel={hotel} />
        ))}
        <div>
          <Pagination
            page={hotelData?.pagination.page || 1}
            pages={hotelData?.pagination.pages || 1}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
