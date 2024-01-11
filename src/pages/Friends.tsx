import { useEffect, useState } from "react";
import { IFriend } from "../types";

const Friends = () => {
  const [data, setData] = useState<IFriend[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:4000/friends");
      if (response.ok) {
        const rawData = await response.json();
        setData(rawData);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setError("Something went wrong...");
        throw new Error();
      }
    };

    fetchData().catch((e) => console.log(`Error 🤡: ${e}`));
  }, []);

  if (error) return <h2>{error}</h2>;
  if (isLoading) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>Friends Page (without RQ)</h1>
      {data?.map((f) => <p key={f.id}>{f.name}</p>)}
      <br />
      <div className="note">
        Traditional way to get data:{" "}
        <ol>
          <li>- Sending requests inside `useEffect()`</li>
          <li>- Managing server states with `useState()`</li>
        </ol>
      </div>
    </div>
  );
};

export default Friends;
