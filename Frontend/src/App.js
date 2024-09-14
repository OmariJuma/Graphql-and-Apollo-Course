import React from "react";
import { useQuery } from "@apollo/client";
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { GET_BOOKS } from "./queries";
import BooksList from "./components/ShowBooks";

function App() {
  const {
    loading: loadingBooks,
    error: errorBooks,
    data: dataBooks,
  } = useQuery(GET_BOOKS);

  return (
    <Container>
      <Typography variant="h3" component="h1" gutterBottom>
        Welcome to Apollo and GraphQL project
      </Typography>
      {errorBooks && <Alert severity="error">{errorBooks.message}</Alert>}
      {loadingBooks && <CircularProgress />}
      {dataBooks && <BooksList books={dataBooks.books} />}
    </Container>
  );
}

export default App;
