import {Box, Typography, TextField, Button} from "@mui/material"
import {ADD_AUTHOR} from "../queries"
import { useState } from "react";
import { useMutation } from "@apollo/client";
export default function AddAuthor() {
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
            type="number"
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
  