import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Paper,
} from "@mui/material";

export default function Dashboard() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Dashboard</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper>Content</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper>Content</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper>Content</Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
