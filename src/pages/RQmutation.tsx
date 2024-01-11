import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Divider from "../components/Divider";
import { useState } from "react";

const fetchTodos = (): Promise<{ id: number; content: string }[]> => {
  return axios
    .get("http://localhost:4000/todos")
    .then((response) => response.data);
};
const addTodo = (todo: { content: string }) => {
  return axios.post("http://localhost:4000/todos", todo);
};

const RQmutation = () => {
  const [value, setValue] = useState("");
  const queryClient = useQueryClient();
  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });
  const { mutate } = useMutation({
    mutationFn: addTodo,
    onSuccess: (data) => {
      console.log(data);
      queryClient.setQueryData<{ id: number; content: string }[]>(
        ["todos"],
        (oldData) => {
          console.log(oldData);
          return oldData ? [...oldData, data.data] : oldData;
        },
      );
    },
  });

  const handleAdd = () => {
    console.log("add" + value);
    mutate({ content: value });
    setValue("");
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error</h1>;
  return (
    <>
      <div className="message"> 🪄 With React Query</div>

      <h1>Mutations</h1>
      <p>
        Unlike queries, mutations are typically used to create/update/delete
        data or perform server side-effects. For this purpose, TanStack Query
        exports a useMutation hook.
      </p>
      <Divider />
      <h3>📝 My Todos</h3>
      <div
        style={{
          display: "flex",
          gap: "1rem",
        }}
      >
        <label>
          New todo:{" "}
          <input
            value={value}
            type="text"
            onChange={(e) => setValue(e.target.value)}
          />
        </label>
        <button onClick={handleAdd} className="btn">
          ➕
        </button>
      </div>
      <br />
      {todos?.map((todo) => <p key={todo.id}>{todo.content}</p>)}
    </>
  );
};

export default RQmutation;
