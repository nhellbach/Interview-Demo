import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Calendar from 'react-calendar';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import 'react-calendar/dist/Calendar.css';

const MedikamentenplanerPage = () => {
  // State for medication list
  const [medications, setMedications] = useState([]);
  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    interval: '',
    timeOfDay: '',
    firstIntakeDate: ''
  });

  // Handle form input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add new medication
  const addMedication = () => {
    const { name, interval, timeOfDay, firstIntakeDate } = formData;
    const newMedication = {
      name,
      interval: parseInt(interval),
      timeOfDay,
      firstIntakeDate: new Date(firstIntakeDate)
    };
    setMedications([...medications, newMedication]);
    // Clear form data
    setFormData({
      name: '',
      interval: '',
      timeOfDay: '',
      firstIntakeDate: ''
    });
  };

  // Calculate next intake date for a medication
  const calculateNextIntakeDate = (firstIntakeDate, interval) => {
    const today = new Date();
    const daysDifference = Math.floor((today - firstIntakeDate) / (1000 * 60 * 60 * 24));
    const remainingDays = interval - (daysDifference % interval);
    const nextIntakeDate = new Date(today.getTime() + remainingDays * 24 * 60 * 60 * 1000);
    return nextIntakeDate.toDateString();
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Medikamentenplaner
      </Typography>
      <Typography variant="body1">
        Hier könnte ein Medikamentenplaner in Form eines Kalenders sein. Man könnte eine Datenbank aufbauen mit bekannten Medikamenten um die Einnahmeintervalle automatisiert zu setzen.
      </Typography>
      <div style={{ marginTop: '20px', display: 'flex' }}>
        <div style={{ marginRight: '20px' }}>
          <Calendar />
        </div>
        <div>
          <Typography variant="h6" gutterBottom>
            Medikamente für heute
          </Typography>
          {medications.map((medication, index) => (
            <div key={index}>
              <Checkbox />
              <span>{medication.name}</span>
            </div>
          ))}
          <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
            Neues Medikament hinzufügen
          </Typography>
          <TextField
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="interval"
            label="Intervall (in Tagen)"
            type="number"
            value={formData.interval}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="timeOfDay"
            label="Einnahmezeitpunkt (z.B. morgens, mittags, abends)"
            value={formData.timeOfDay}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="firstIntakeDate"
            label="Erstes Einnahmedatum"
            type="date"
            value={formData.firstIntakeDate}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={addMedication} style={{ marginTop: '10px' }}>
            Medikament hinzufügen
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MedikamentenplanerPage;
