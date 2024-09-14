import { Box, Typography, Card, CardContent, CardMedia, Grid } from "@mui/material";

export default function BooksList({ books }) {
  return (
    <Box mt={4}>
      <Typography variant="h4" component="h2" gutterBottom>
        Books
      </Typography>
      <Grid container spacing={4}>
        {books.map(({ id, name, genre }) => (
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
                  {genre}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}