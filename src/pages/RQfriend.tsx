import Divider from "../components/Divider";
import useFriendData from "../hooks/useFriendData";
import { useParams } from "react-router-dom";

const RQfriend = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useFriendData(id);

  if (isError) return <h2>ERROR</h2>;
  if (isLoading) return <h2>Loading...</h2>;

  return (
    <>
      <div className="message"> 🪄 With React Query</div>
      <h1>{data?.name}</h1>
      <div style={{ display: "flex", gap: "2rem", width: "80%" }}>
        <img style={{ flex: 1, maxWidth: 200 }} src={data?.img} />
        <p style={{ flex: 3 }}>{data?.description}</p>{" "}
      </div>
      <Divider />
    </>
  );
};

export default RQfriend;
