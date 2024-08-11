import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { useState, useEffect } from "react";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  //we use another state variable filtered restaurant since once the list of restaurants is filtered, we update the same and render
  //it as it onto the restaurant card, the bug which arises is that once filtered elememnts are shown onto the screen, the original list is completely changed
  //meaning the original list after filtering would now contain only the filterd contents, hence we another variable for storing
  const [searchText, setSearchText] = useState("");
  // here we create another state variable for the search functionality
  useEffect(() => {
    fetchData();
  }, []);
  //whenever state variable updates, react triggers a reconciliation cycle(re-renders) the component
  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.43129291507411&lng=78.55543825775383&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    console.log(json);
    console.log("___");
    console.log(
      json.data.cards[2].card.card.gridElements.infoWithStyle.restaurants
    );
    setListOfRestaurants(
      json.data.cards[2].card.card.gridElements.infoWithStyle.restaurants
    );
    setFilteredRestaurant(
      json.data.cards[2].card.card.gridElements.infoWithStyle.restaurants
    );
  };

  if (listOfRestaurants.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          {/*Here we are forced to use a state variable in order to store the contents of the search bar and later use it for rendering 
          the necessary content , we use the onchange function in this case since without it the searchText state variable which is pinned to
          to the input bar would not allow to enter content into the const variable, in order to prevent this th onChange function is utilised 
          Hence we use the setSearchText function to update the content of searchText
          So every time we enter content in the input bar, the entire searches and re renders the content*/}
          {/* React is re-rendering the whole body component each time smth is typed in the input box, but it is only updating the input box
          value inside the DOM*/}

          {/*React is faster because of the new reconciliation algorithm, and finds the difference between the dom and the virtual dom and updates
          only the updated portion of dom*/}
          <button
            onClick={() => {
              console.log(searchText);
              console.log(listOfRestaurants);
              const filteredRestaurant = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              {
                /*The reason as to how restaurant information is still available even after filtering is that, every time we filter we make sure
              to filter it from the listOfRestaurant, which contains the entire list unlike the filtered list which only contains the filtered ones
              $$$$$ VERY IMPORTANT FIX $$$$$$$ */
              }
              setFilteredRestaurant(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = listOfRestaurants.filter(
              (res) => res.info.avgRating > 4
            );
            setListOfRestaurants(filteredList);
          }}
        >
          Top Rated Restaurant
        </button>
      </div>
      <div className="res-container">
        {filteredRestaurant.map((restaurant) => (
          <RestaurantCard key={restaurant.info.key} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
