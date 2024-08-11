import { CDN_LINK } from "../utils/constants";

const RestaurantCard = (props) => {
  //Here the props is taken as an object
  const { resData } = props;

  const { cloudinaryImageId, name, cuisines, avgRating } = resData?.info;
  return (
    <div className="res-card">
      <img
        className="res-logo"
        alt="res-logo"
        src={CDN_LINK + cloudinaryImageId}
      />
      <h3>{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRating} stars</h4>
      <h4>{resData.info.sla.deliveryTime} minutes</h4>
    </div>
  );
};

export default RestaurantCard;
