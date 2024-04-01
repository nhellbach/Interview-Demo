import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

const PersönlicheDatenPage = () => {
  const [userData, setUserData] = useState({ name: '', email: '' }); // Add more fields as needed
  const [editMode, setEditMode] = useState({ name: false, email: false }); // Control edit mode for each field
  const [loading, setLoading] = useState(true);

  // Fetch user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/users/1'); // Adjust URL/path as necessary
        setUserData({ name: response.data.name, email: response.data.email }); // Map response data correctly
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle edit mode toggle
  const handleEditToggle = (field) => {
    setEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // Handle change in input fields
  const handleChange = (event, field) => {
    setUserData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  // Example function to update name - adapt for other fields and methods as necessary
  const saveChanges = async (field) => {
    try {
      const response = await axios.put(`https://dummyjson.com/users/1`, { [field]: userData[field] });
      // Assuming the response includes the updated user object
      setUserData({ name: response.data.name, email: response.data.email }); // Update local state with response
      handleEditToggle(field); // Toggle off edit mode
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
        <div key={key} style={{ marginBottom: '20px' }}>
          <TextField
            label={key.charAt(0).toUpperCase() + key.slice(1)}
            variant="outlined"
            value={value}
            disabled={!editMode[key]}
            onChange={(event) => handleChange(event, key)}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: '10px' }}
            onClick={() => editMode[key] ? saveChanges(key) : handleEditToggle(key)}
          >
            {editMode[key] ? 'Save' : 'Edit'}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default PersönlicheDatenPage;
