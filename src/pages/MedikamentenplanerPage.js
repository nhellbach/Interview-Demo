import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Calendar from "react-calendar";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";

import "react-calendar/dist/Calendar.css";
import { Stack } from "@mui/material";

const MedikamentenplanerPage = () => {
  // State for medication list
  const [medications, setMedications] = useState([]);
  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    interval: "",
    timeOfDay: "",
    firstIntakeDate: "",
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
      firstIntakeDate: new Date(firstIntakeDate),
    };
    setMedications([...medications, newMedication]);
    // Clear form data
    setFormData({
      name: "",
      interval: "",
      timeOfDay: "",
      firstIntakeDate: "",
    });
  };

  // Delete medication from list
  const deleteMedication = (id) => {
    setMedications(medications.filter((medication) => medication.id !== id));
  };

  // Calculate next intake date for a medication
  const calculateNextIntakeDate = (firstIntakeDate, interval) => {
    const today = new Date();
    const daysDifference = Math.floor(
      (today - firstIntakeDate) / (1000 * 60 * 60 * 24)
    );
    const remainingDays = interval - (daysDifference % interval);
    const nextIntakeDate = new Date(
      today.getTime() + remainingDays * 24 * 60 * 60 * 1000
    );
    return nextIntakeDate.toDateString();
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h5" gutterBottom>
        Medikamentenplaner
      </Typography>
      <Typography variant="body1">
        Hier könnte ein Medikamentenplaner in Form eines Kalenders sein. Man
        könnte eine Datenbank aufbauen mit bekannten Medikamenten um die
        Einnahmeintervalle automatisiert zu setzen.
      </Typography>
      <Stack direction="row" spacing={2}>
        <Calendar />
        <Stack spacing={2}>
          <Typography variant="h6" gutterBottom>
            Medikamente für heute
          </Typography>
          {medications.map((medication, index) => (
            <div key={index}>
              <Checkbox />
              <span>{medication.name}</span>
            </div>
          ))}
          <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
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
            label="        erstes Einnahmedatum"
            InputLabelProps={{
              style: { paddingLeft: '70px' }, // Adjust this as needed
            }}
            type="date"
            value={formData.firstIntakeDate}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={addMedication}
            style={{ marginTop: "10px" }}
          >
            Medikament hinzufügen
          </Button>
        </Stack>
      </Stack>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Intervall (Tage)</TableCell>
            <TableCell align="right">Zeitpunkt</TableCell>
            <TableCell align="right">Aktion</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {medications.map((medication) => (
            <TableRow key={medication.id}>
              <TableCell component="th" scope="row">
                {medication.name}
              </TableCell>
              <TableCell align="right">{medication.interval}</TableCell>
              <TableCell align="right">{medication.timeOfDay}</TableCell>
              <TableCell align="right">
                <Button onClick={() => deleteMedication(medication.id)}>
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Stack>
  );
};

export default MedikamentenplanerPage;
