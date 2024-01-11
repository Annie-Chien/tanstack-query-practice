import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Divider from "../components/Divider";
import { IFriend } from "../types";

const fetchData = async (): Promise<IFriend[]> => {
  const response = await fetch("http://localhost:4000/friends");
  if (response.ok) {
    return response.json();
  } else {
    throw new Error();
  }
};

const RQfriends = () => {
  const { isError, isLoading, data, isFetching } = useQuery({
    queryKey: ["friends"],
    queryFn: fetchData,
    // cacheTime: 3000,
    // refetchOnMount:false,
    // refetchOnWindowFocus: false,
    // refetchOnReconnect:false,
    // refetchInterval: 3000,
    // refetchIntervalInBackground:true,
  });

  console.log(`isLoading: ${isLoading}, isFetching: ${isFetching}`);

  if (isError) return <h2>ERROR</h2>;
  if (isLoading) return <h2>Loading...</h2>;

  return (
    <>
      <div className="message"> 🪄 With React Query</div>
      <h1>Friends</h1>
      <h3>Brief Introduction</h3>
      <p>
        Friends is an American situation comedy about six friends living in the
        same apartment complex in Manhattan. It originally aired on NBC from
        September 22, 1994 - May 6, 2004, lasting ten seasons.{" "}
      </p>
      <Divider />
      <h3>Main Characters</h3>
      <p>Click for more details</p>
      <div style={{ margin: "1rem 0" }}>
        {data?.map((friend) => (
          <div key={friend.id}>
            <h4>
              <Link to={`/rq-friends/${friend.id}`}>{friend.name}</Link>
            </h4>
          </div>
        ))}
      </div>
      <div className="note">
        <p>
          React Query takes care lots of things for you, like fetching,
          background refetching, caching and updating server states
          automatically!
        </p>
      </div>
    </>
  );
};

export default RQfriends;
