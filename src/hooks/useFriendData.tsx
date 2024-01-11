import { useQuery } from "@tanstack/react-query";
import { IFriend } from "../types";

const fetchFriendData = async (id: string | undefined): Promise<IFriend> => {
  const response = await fetch(`http://localhost:4000/friends/${id}`);
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("ERROR");
  }
};

const useFriendData = (id: string | undefined) => {
  return useQuery({
    queryKey: ["friend", id],
    queryFn: () => fetchFriendData(id),
  });
};

export default useFriendData;
