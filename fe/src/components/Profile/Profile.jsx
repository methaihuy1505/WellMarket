import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import TabProfile from "./TabProfile";
import TabFavoritedBy from "./TabFavoritedBy";
import TabFavoriteUsers from "./TabFavoriteUsers";
import TabFavoritePosts from "./TabFavoritePosts";
import TabPayments from "./TabPayments";
import TabReviews from "./TabReviews";
import TabSettings from "./TabSetting";
import Tabs from "./Tabs";

export default function Profile() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const tab = params.get("tab") || "profile";

  const [data, setData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) return;

    if (tab === "settings") {
      setData(null);
      return;
    }
    let url = "";
    switch (tab) {
      case "favorited-by":
        url = "/api/profile/favorited-by";
        break;
      case "favorite-users":
        url = "/api/profile/favorite-users";
        break;
      case "favorite-posts":
        url = "/api/profile/favorite-posts";
        break;
      case "payments":
        url = "/api/profile/payments";
        break;
      case "reviews":
        url = "/api/profile/reviews";
        break;
      
      default:
        url = "/api/profile";
    }

    axios
      .get(`http://localhost:8000${url}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, [tab]);

  return (
    <div className="p-4">
      <Tabs current={tab} />
      {tab === "profile" && <TabProfile data={data} />}
      {tab === "favorited-by" && <TabFavoritedBy data={data} />}
      {tab === "favorite-users" && <TabFavoriteUsers data={data} />}
      {tab === "favorite-posts" && <TabFavoritePosts data={data} />}
      {tab === "payments" && <TabPayments data={data} />}
      {tab === "reviews" && <TabReviews data={data} />}
      {tab === "settings" && <TabSettings />}
    </div>
  );
}
