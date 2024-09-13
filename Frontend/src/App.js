import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_BOOKS, GET_AUTHORS, ADD_BOOK, ADD_AUTHOR } from "./queries";
import { Container, Typography, Box, TextField, Button, List, ListItem, ListItemText, CircularProgress, Alert } from "@mui/material";

function App() {
  const {
    loading: loadingBooks,
    error: errorBooks,
    data: dataBooks,
  } = useQuery(GET_BOOKS);
  const {
    loading: loadingAuthors,
    error: errorAuthors,
    data: dataAuthors,
  } = useQuery(GET_AUTHORS);

  return (
    <Container>
      <Typography variant="h3" component="h1" gutterBottom>
        Welcome to Apollo and GraphQL project
      </Typography>
      {errorBooks && <Alert severity="error">{errorBooks.message}</Alert>}
      {loadingBooks && <CircularProgress />}
      {dataBooks && <BooksList books={dataBooks.books} />}
      {errorAuthors && <Alert severity="error">{errorAuthors.message}</Alert>}
      {loadingAuthors && <CircularProgress />}
      {dataAuthors && <AuthorsList authors={dataAuthors.authors} />}
      <AddBook />
      <AddAuthor />
    </Container>
  );
}

function BooksList({ books }) {
  return (
    <Box mt={4}>
      <Typography variant="h4" component="h2" gutterBottom>
        Books
      </Typography>
      <List>
        {books.map(({ id, name, genre }) => (
          <ListItem key={id}>
            <ListItemText primary={`${name} - ${genre}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

function AuthorsList({ authors }) {
  return (
    <Box mt={4}>
      <Typography variant="h4" component="h2" gutterBottom>
        Authors
      </Typography>
      <List>
        {authors.map(({ id, name, age }) => (
          <ListItem key={id}>
            <ListItemText primary={`${name} - ${age} years old`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

function AddBook() {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [addBook] = useMutation(ADD_BOOK);

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook({ variables: { name, genre, authorId } });
    setName("");
    setGenre("");
    setAuthorId("");
  };

  return (
    <Box mt={4}>
      <Typography variant="h4" component="h2" gutterBottom>
        Add Book
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Book name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Author ID"
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Add Book
        </Button>
      </form>
    </Box>
  );
}

function AddAuthor() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [addAuthor] = useMutation(ADD_AUTHOR);

  const handleSubmit = (e) => {
    e.preventDefault();
    addAuthor({ variables: { name, age: parseInt(age) } });
    setName("");
    setAge("");
  };

  return (
    <Box mt={4}>
      <Typography variant="h4" component="h2" gutterBottom>
        Add Author
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Author name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Add Author
        </Button>
      </form>
    </Box>
  );
}

export default App;