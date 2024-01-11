import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import Divider from "../components/Divider";
import Quote from "../components/Quote";
import { Fragment } from "react";

const fetchQuotes = ({
  pageParam = 1,
}): Promise<{ id: number; text: string; by: string }[]> => {
  return axios
    .get(`http://localhost:4000/quotes?_limit=5&_page=${pageParam}`)
    .then((response) => response.data);
};

const RQinfinite = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["quotes"],
      queryFn: fetchQuotes,
      getNextPageParam: (_lastPage, allPages) => {
        if (allPages.length < 4) {
          return allPages.length + 1;
        } else {
          return undefined;
        }
      },
    });

  return (
    <>
      <div className="message"> 🪄 With React Query</div>
      <h1>Infinite Queries</h1>
      <p>
        Rendering lists that can additively "load more" data onto an existing
        set of data or "infinite scroll" is also a very common UI pattern.
        TanStack Query supports a useful version of useQuery called
        useInfiniteQuery for querying these types of lists.
      </p>
      <Divider />
      {data?.pages.map((group, i) => (
        <Fragment key={i}>
          {group.map((q) => (
            <Quote text={q.text} by={q.by} key={q.id} />
          ))}
        </Fragment>
      ))}
      <br />
      <button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "Nothing more to load"}
      </button>
    </>
  );
};

export default RQinfinite;
