import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Divider from "../components/Divider";
import Loader from "../components/Loader";

const fetchUserWithId = (
  userId: string,
): Promise<{ id: string; infoId: string }> => {
  return axios
    .get(`http://localhost:4000/users/${userId}`)
    .then((response) => response.data);
};

const fetchUserInfo = (
  infoId: string | undefined,
): Promise<{ id: string; favShow: string[] }> => {
  return axios
    .get(`http://localhost:4000/info/${infoId}`)
    .then((response) => response.data);
};

const RQdependent = ({ userId }: { userId: string }) => {
  // Get the user
  const { data: user, isLoading: userIsLoading } = useQuery(
    ["user", userId],
    () => fetchUserWithId(userId),
  );
  console.log(user);
  const userInfoId = user?.infoId;

  // Get the user information
  const { data: userInfo, isLoading: infoIsLoading } = useQuery(
    ["userInfo", userInfoId],
    () => fetchUserInfo(userInfoId),
    {
      enabled: !!userInfoId,
    },
  );
  return (
    <div>
      <div className="message"> 🪄 With React Query</div>
      <h1>Dependent Queries</h1>
      <div className="note">
        <p>
          Dependent (or serial) queries depend on previous ones to finish before
          they can execute. To achieve this, it's as easy as using the `enabled`
          option to tell a query when it is ready to run.
        </p>
      </div>
      <Divider />
      <p>{userIsLoading ? <Loader /> : "Hello, User!"}</p>
      <br />
      <h3>My Favorite Show</h3>
      {infoIsLoading ? <Loader /> : <p>{userInfo?.favShow.join(" 🤍 ")}</p>}
    </div>
  );
};

export default RQdependent;
