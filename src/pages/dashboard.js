import React, { useState } from 'react';
import { AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Grid, 
  Paper, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText } from '@mui/material';

function Dashboard() {
  const [currentPage, setCurrentPage] = useState('Page 1'); // Zustand für die aktuell ausgewählte Seite

  const handlePageChange = (pageName) => {
    setCurrentPage(pageName); // Funktion, um die aktuelle Seite zu aktualisieren
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Dashboard</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Grid container spacing={3}>
          {/* Drawer-Komponente für die Navigation */}
          <Grid item xs={3}>
            <Drawer variant="permanent" anchor="left">
              <List>
                <ListItem button onClick={() => handlePageChange('Page 1')}>
                  <ListItemText primary="Page 1" />
                </ListItem>
                <ListItem button onClick={() => handlePageChange('Page 2')}>
                  <ListItemText primary="Page 2" />
                </ListItem>
                {/* Weitere Seiten hinzufügen nach Bedarf */}
              </List>
            </Drawer>
          </Grid>
          {/* Hauptinhalt der ausgewählten Seite */}
          <Grid item xs={9}>
            <Paper>
              {/* Hier wird der Inhalt der aktuellen Seite gerendert */}
              {currentPage === 'Page 1' && <Page1Content />}
              {currentPage === 'Page 2' && <Page2Content />}
              {/* Weitere Seiteninhalte hinzufügen nach Bedarf */}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

// Beispielinhalt für Seite 1
function Page1Content() {
  return <Typography variant="h4">Page 1 Content</Typography>;
}

// Beispielinhalt für Seite 2
function Page2Content() {
  return <Typography variant="h4">Page 2 Content</Typography>;
}

export default Dashboard;
