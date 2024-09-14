import { Box, Typography, CircularProgress, Alert, Card, CardContent, CardMedia, Grid } from "@mui/material";
import { GET_AUTHORS } from "../queries";
import { useQuery } from "@apollo/client";

export default function AuthorsList() {
  const { loading, error, data } = useQuery(GET_AUTHORS);

  return (
    <Box mt={4}>
      {error && <Alert severity="error">{error.message}</Alert>}
      {loading && <CircularProgress />}
      {data?.authors && (
        <>
          <Typography variant="h4" component="h2" gutterBottom>
            Authors
          </Typography>
          <Grid container spacing={4}>
            {data.authors.map(({ id, name, age }) => (
              <Grid item xs={12} sm={6} md={4} key={id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`https://random.imagecdn.app/500/150`}
                    alt={name}
                  />
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {age} years old
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
}