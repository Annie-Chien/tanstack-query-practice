import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Divider from "../components/Divider";

const fetchBbt = (): Promise<{ id: number; name: string }[]> => {
  return axios
    .get("http://localhost:4000/bbt")
    .then((response) => response.data);
};
const fetchBrooklyn99 = (): Promise<{ id: number; name: string }[]> => {
  return axios
    .get("http://localhost:4000/brooklyn99")
    .then((response) => response.data);
};

const RQparallel = () => {
  // When the number of parallel queries does not change,
  // just use any number of useQuery hook side-by-side

  const { data: bbtData } = useQuery({
    queryKey: ["BBT"],
    queryFn: fetchBbt,
  });
  const { data: brooklyn99Data } = useQuery({
    queryKey: ["brooklyn99"],
    queryFn: fetchBrooklyn99,
  });
  console.log(bbtData, brooklyn99Data);

  return (
    <>
      <div className="message"> 🪄 With React Query</div>
      <h1>Parallel Queries</h1>
      <div className="note">
        <p>Parallel queries are queries that are executed at the same time.</p>
        <br />
        <p>
          When the number of parallel queries does not change, just use any
          number of useQuery hook side-by-side
        </p>
      </div>
      <Divider />
      <h3>💥 Big Bang Theory</h3>
      {bbtData?.map((character) => <p key={character.id}>{character.name}</p>)}
      <br />
      <h3>🚔 Brooklyn Nine-Nine</h3>
      {brooklyn99Data?.map((character) => (
        <p key={character.id}>{character.name}</p>
      ))}
    </>
  );
};

export default RQparallel;
