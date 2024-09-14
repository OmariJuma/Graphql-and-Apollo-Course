import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { ADD_BOOK, GET_AUTHORS } from "../queries";
import { useMutation, useQuery } from "@apollo/client";
export default function AddBook() {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [AddBook] = useMutation(ADD_BOOK);
  const { error, loading, data } = useQuery(GET_AUTHORS);

  const handleSubmit = (e) => {
    e.preventDefault();
    AddBook({ variables: { name, genre, authorId } });
    setName("");
    setGenre("");
    setAuthorId("");
    return Alert("Book Added Successfully")
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate={false}
      autoComplete="off"
      style={{ padding: 20 }}
    >
      <TextField
        label="Book name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      {error && <Alert severity="error">{error.message}</Alert>}
      {loading && <CircularProgress />}
      <FormControl fullWidth margin="normal">
        <InputLabel id="select-author-label">Select the author</InputLabel>
        <Select
          labelId="select-author-label"
          id="select-author"
          value={authorId}
          label="Select the author"
          onChange={(e) => setAuthorId(e.target.value)}
          required
        >
          {data &&
            data.authors.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <Box mt={2}>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Book
        </Button>
      </Box>
    </Box>
  );
}
