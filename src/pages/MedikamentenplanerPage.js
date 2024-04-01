// AnträgePage.js
import React from 'react';
import Typography from '@mui/material/Typography';

const MedikamentenplanerPage = () => {
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Medikamentenplaner
      </Typography>
      <Typography variant="body1">
        Hier könnte ein Medikamentenplaner in Form eines Kalenders sein. Man könnte eine Datenbank aufbauen mit bekannten Medikamenten um die Einnahmeintervalle automatisiert zu setzen.
      </Typography>
    </div>
  );
};

export default MedikamentenplanerPage;
