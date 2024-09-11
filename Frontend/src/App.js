import "./App.css";
import { gql, useQuery } from "@apollo/client";

const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      name
      genre
    }
  }
`;
function App() {
  const { loading, error, data } = useQuery(GET_BOOKS);
  console.log(data);
  return (
    <div>
      <h1>Welcome to Apollo and GraphQL project</h1>
      <br />
      {error && <p>{error.message}</p>}
      {loading && <p>loading please wait...</p>}
      {data && (
        <ul>
          {data.books.map(({ id, name, genre }) => {
            return <li key={id}>{name +" " +genre}</li>;
          })}
        </ul>
      )}
    </div>
  );
}

export default App;
