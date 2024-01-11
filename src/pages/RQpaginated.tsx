import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Divider from "../components/Divider";
import Loader from "../components/Loader";
import Quote from "../components/Quote";

const fetchQuotes = (
  pageNumber: number,
): Promise<{ id: number; text: string; by: string }[]> => {
  return axios
    .get(`http://localhost:4000/quotes?_limit=5&_page=${pageNumber}`)
    .then((response) => response.data);
};

const RQpaginated = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["quotes", pageNumber],
    queryFn: () => fetchQuotes(pageNumber),
    keepPreviousData: true,
  });

  if (isError) return <h1>Error</h1>;
  return (
    <>
      <div className="message"> 🪄 With React Query</div>
      <h1>Paginated / Lagged Queries</h1>
      <div className="note">
        <p>
          The UI would jump in and out of the success and loading states as
          different queries are created and destroyed for each page. By setting
          `keepPreviousData = true`, we can get around this.
        </p>
      </div>
      <Divider />
      {isLoading ? (
        <Loader />
      ) : (
        data?.map((q) => <Quote text={q.text} by={q.by} key={q.id} />)
      )}

      <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
        <button
          onClick={() => setPageNumber((prev) => prev - 1)}
          disabled={pageNumber === 1}
        >
          ◀︎
        </button>
        <span>{pageNumber}</span>
        <button
          onClick={() => setPageNumber((prev) => prev + 1)}
          disabled={pageNumber === 4}
        >
          ▶︎
        </button>
      </div>
    </>
  );
};

export default RQpaginated;
