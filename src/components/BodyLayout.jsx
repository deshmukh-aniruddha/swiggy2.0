/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import { Link, useOutletContext } from "react-router-dom";
import Search from "./Search";
import useFetchData from "../utils/useFetchData";
import useFetchBanner from "../utils/useFetchBanner";
import { CARD_IMG } from "../utils/constants";
import { IconArrowLeft, IconArrowRight, IconPointFilled, IconStarFilled } from "@tabler/icons-react";
/* eslint-disable no-unused-vars */
import {} from "@tabler/icons-react";
import AddToCartButton from "./AddToCartButton";

const BodyLayout = ({ resData }) => {
  const api = useOutletContext();
  const { data, loading } = useFetchData(api);
  const [filteredListOfRestaurant, setFilteredListOfRestaurant] = useState([]);
  const [showShimmer, setShowShimmer] = useState(true);

  const { dataBanner, loading1 } = useFetchBanner(api);
  console.log(data, " 0000000000000");

  const {
    name,
    cuisines,
    avgRating,
    sla,
    cloudinaryImageId,
    costForTwo,
    aggregatedDiscountInfoV3,
  } = data?.info || {};

  console.log(name, "name")
  console.log(cuisines, "cuisines")
  console.log(avgRating, "avgRating")
  console.log(sla, "sla")
  console.log(cloudinaryImageId, "cloudinaryImageId")
  console.log(costForTwo, "costForTwo")
  console.log(aggregatedDiscountInfoV3, "aggregatedDiscountInfoV3")
  
  const cardStyle = {
    backgroundImage: `url(${
      cloudinaryImageId ? CARD_IMG + cloudinaryImageId : ""
    })`,
  };

  useEffect(() => {
    setFilteredListOfRestaurant(data);
    setShowShimmer(true); // Show shimmer when API changes
  }, [api, data]);

  // console.log(data, "data");

  useEffect(() => {
    // Hide shimmer after 2 seconds
    const shimmerTimeout = setTimeout(() => {
      setShowShimmer(false);
    }, 2000);

    return () => clearTimeout(shimmerTimeout);
  }, [api]);

  return (
    <>
      {/* {showShimmer && <Shimmer />} */}
      <div className="bg-[#050505] overflow-auto">

<div className="fixed top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 size-[1000px] bg-orange-500/80  filter blur-[200px] rounded-full">

</div>

      <h1 className="text-white relative z-50 w-4/5 flex items-center mt-40 font-bold text-3xl mb-8 lg:ml-40 xl:ml-40 2xl:ml-40">
        <span className="inline-block">What's on your mind</span>
       

          <div className="ml-auto relative z-50 flex items-center gap-2">
            <span className="inline-block size-10 grid place-items-center  bg-gray-100 rounded-full">
              <IconArrowLeft size={26} strokeWidth={2} color="black" className="inline-block" />
            </span>
            <span className="inline-block size-10 grid place-items-center  bg-gray-100 rounded-full">
              <IconArrowRight size={26} strokeWidth={2} color="black" className="inline-block" />
            </span>
          </div>
          
       
        </h1>

        <div className="flex relative z-50 lg:w-4/5 xl:w-4/5 2xl:w-4/5  mt-4 rounded-xl mx-auto whitespace-nowrap flex-nowrap gap-6 overflow-x-scroll">
          {dataBanner &&
            dataBanner.map((banner) => (
              <div
                key={banner?.id}
                className="shrink-0 relative z-50 w-40 overflow-hidden rounded-3xl"
              >
                <img
                  src={CARD_IMG + banner?.imageId}
                  alt=""
                  className="size-full object-center object-cover aspect-square"
                />
              </div>
            ))}
        </div>

        <div className="text-white relative z-50 w-4/5 flex items-center  font-bold text-3xl mt-16 mb-8 lg:ml-40 xl:ml-40 2xl:ml-40">
        <span className="inline-block">Top restaurants near you</span>
       

          <div className="ml-auto flex items-center gap-2">
            <span className="inline-block size-10 grid place-items-center  bg-gray-100 rounded-full">
              <IconArrowLeft size={26} strokeWidth={2} color="black" className="inline-block" />
            </span>
            <span className="inline-block size-10 grid place-items-center  bg-gray-100 rounded-full">
              <IconArrowRight size={26} strokeWidth={2} color="black" className="inline-block" />
            </span>
          </div>
          
       
        </div>

        <div className="flex relative z-50 lg:w-4/5 xl:w-4/5 2xl:w-4/5  mt-4 rounded-xl mx-auto whitespace-nowrap flex-nowrap gap-6 overflow-x-scroll">
        {filteredListOfRestaurant &&
            filteredListOfRestaurant.map((restaurant) => (
              <Link
                key={restaurant?.info?.id}
                to={`/menu/${restaurant?.info?.id}`}
              >
                <RestaurantCard resData={restaurant?.info} />
              </Link>
            ))}
        </div>

        <div className="flex relative z-50  ml-6">
          <Search
            filteredListOfRestaurant={filteredListOfRestaurant}
            resData={data}
            setFilteredListOfRestaurant={setFilteredListOfRestaurant}
          />
        </div>


        <h1 className="text-white relative z-50 w-4/5 flex items-center  font-bold text-3xl mb-8 lg:ml-40 xl:ml-40 2xl:ml-40">
        <span className="inline-block">Restaurants with online food delivery in Mumbai</span>
        </h1>

        <div className=" relative z-50 lg:w-2/3 xl:w-2/3 2xl:w-2/3  lg:-40 xl:ml-40 2xl:ml-40 grid lg:grid-cols-[repeat(4,_1fr)] xl:grid-cols-[repeat(4,_1fr)] 2xl:grid-cols-[repeat(4,_1fr)] grid-cols-[repeat(2,_1fr)] md:grid-cols-[repeat(3,_1fr)] lg:gap-14 xl:gap-14 2xl:gap-14 gap-5 mb-44">
          {filteredListOfRestaurant &&
            filteredListOfRestaurant.map((restaurant) => (
              <Link
                key={restaurant?.info?.id}
                to={`/menu/${restaurant?.info?.id}`}
              >
                <RestaurantCard resData={restaurant?.info} />
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};

export default BodyLayout;
