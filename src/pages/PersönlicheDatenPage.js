import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';

const labelMap = {
  firstName: "Vorname",
  lastName: "Nachname",
  email: "E-Mail Adresse",
  birthDate: "Geburtsdatum"
};

const PersönlicheDatenPage = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthDate: ''
  });
  const [editMode, setEditMode] = useState({
    firstName: false,
    lastName: false,
    email: false,
    birthDate: false
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/users/1');
        
        const { firstName, lastName, email, birthDate } = response.data;
        setUserData({ firstName, lastName, email, birthDate });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEditToggle = (field) => {
    setEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (event, field) => {
    setUserData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const saveChanges = async (field) => {
    try {
      const newValue = userData[field];
      console.log('Data to be sent:', { [field]: newValue });
      const response = await axios.put(`https://dummyjson.com/users/1`, { [field]: userData[field] });
      const { firstName, lastName, email, birthDate } = response.data;
      setUserData({ firstName, lastName, email, birthDate });
      handleEditToggle(field);
    } catch (error) {
      console.error("Error updating data: ", error);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Persönliche Daten
      </Typography>
      {Object.entries(userData).map(([key, value]) => (
        <div key={key} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
          <TextField
            label={labelMap[key] || key}
            variant="outlined"
            value={value}
            disabled={!editMode[key]}
            onChange={(event) => handleChange(event, key)}
            style={{ flex: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => editMode[key] ? saveChanges(key) : handleEditToggle(key)}
            style={{ marginLeft: '10px' }}
            startIcon={editMode[key] ? <SaveIcon /> : <EditIcon />}
          />
        </div>
      ))}
    </div>
  );
};

export default PersönlicheDatenPage;
