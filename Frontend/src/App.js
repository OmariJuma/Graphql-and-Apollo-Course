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
      <Typography component="h1" gutterBottom>
        Welcome to Apollo Book Store and GraphQL project
      </Typography>
      <Typography component="h2" gutterBottom>
        This project is made using Apollo-client (on the frontend) and GraphQL (on the backend), I hope you will like it
      </Typography>
      {errorBooks && <Alert severity="error">{errorBooks.message}</Alert>}
      {loadingBooks && <CircularProgress />}
      {dataBooks && <BooksList books={dataBooks.books} />}
    </Container>
  );
}

export default App;
