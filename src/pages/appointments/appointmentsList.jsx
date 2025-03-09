import React, { useState } from "react";
import AppointmentRouting from "../../components/RoutingButtons/AppointmentRouting";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Button, createTheme, Dialog, DialogActions, DialogContent, DialogTitle, TextField, ThemeProvider, Typography } from "@mui/material";
import Store from "../../zustand/store/store";
import { format } from 'date-fns'; // Import date-fns for date formatting

// Define your custom theme
const theme = createTheme({
  typography: {
    fontFamily: 'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
});


const paginationModel = { page: 0, pageSize: 5 };

const AppointmentsList = () => {
  const appointmentsList = Store((state) => state.appointmentsList); // Get appointments list from the store

  const { removeAppointment, updateAppointment } = Store((state) => ({
    removeAppointment: state.removeAppointment,
    updateAppointment: state.updateAppointment,
  }));


// Local state for editing an appointment
const [openDialog, setOpenDialog] = useState(false);
const [editedAppointment, setEditedAppointment] = useState(null);

// Handle Edit
const handleEdit = (appointment) => {
  setEditedAppointment(appointment);
  setOpenDialog(true); // Open the dialog to edit
};

// Handle Delete
const handleDelete = (id) => {
  console.log("Deleting appointment with ID:", id); // Log the ID being passed
  removeAppointment(id); // Remove the appointment with the given id
};

// Handle saving edited appointment
const handleSave = () => {
  if (editedAppointment) {
    updateAppointment(editedAppointment); // Update the appointment in the store
    setOpenDialog(false); // Close the dialog
  }
};

// Handle dialog close
const handleCloseDialog = () => {
  setOpenDialog(false); // Close the dialog without saving
};
const columns = [
  { field: 'id', headerName: 'ID', width: 40 },
  { field: 'firstName', headerName: 'First name', width: 90 },
  { field: 'lastName', headerName: 'Last name', width: 90 },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 150,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
  {
    field: 'mobile',
    headerName: 'Mobile number',
    type: 'string',
    width: 130,
  },
  {
    field: 'email',
    headerName: 'Email',
    type: 'string',
    width: 170,
  
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'height',
    headerName: 'Height',
    type: 'number',
    width: 70,
  },
  {
    field: 'weight',
    headerName: 'Weight',
    type: 'number',
    width : 70,
  },
  {
    field: 'gender',
    headerName: 'Gender',
    type:'string',
    width: 100,
  },
  { 
    field: 'appointmentTime',
    headerName: 'Appointment Time',
    type: 'number',
    width: 150,
  },
  {
    field: 'appointmentDate',
    headerName: 'Appointment Date',
    type: 'date',
    width: 150,
    valueGetter: (params) => {
      const appointmentDate = params.row ? params.row.appointmentDate : null;
      // Ensure appointmentDate is parsed into a Date object
      return appointmentDate ? new Date(appointmentDate) : null;
    },
    renderCell: (params) => {
      const date = params.row.appointmentDate ? new Date(params.row.appointmentDate) : null;
      return date ? format(date, 'MM/dd/yyyy') : 'No date available'; // Use date-fns for formatting
    },
  },
  
  {
    field: 'Image',
    headerName: 'Image',
    type: 'string',
    width:150,
    height: 150,
    renderCell: (params) => {
      const imageFile = params.row.images; // This should be the File object
  
      if (!imageFile) {
        return <span>No image</span>;
      }
  
      let imageUrl = '';
      
      // Check if it's a File object, and if so, create an Object URL
      if (imageFile instanceof File) {
        imageUrl = URL.createObjectURL(imageFile);
      }
  
      return (
        <img
          src={imageUrl}
          alt="Appointment"
          style={{
            width: '100%',  // You can adjust the width here as needed
            height: '150px',  // Set a fixed height for the image (adjust as necessary)
            objectFit: 'cover', // Ensures the image covers the area without distortion
          }}
          onError={(e) => e.target.src = '/path/to/fallback-image.jpg'} // Fallback image if not found
        />
      );
    }
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 180,
    renderCell: (params) => {
      return (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEdit(params.row)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleDelete(params.row.id)}
            style={{ marginLeft: '8px' }}
          >
            Delete
          </Button>
        </>
      );
    },
  },
]

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-6 flex-col gap-12">
      <AppointmentRouting pageName="Appointment"/>
      <ThemeProvider theme={theme}> {/* Apply theme to the app */}
      <Typography variant="h4" gutterBottom>
          Appointment List
        </Typography>

        <Paper sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={appointmentsList}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            getRowId={(row) => row.id} // Use the id from the store
            checkboxSelection
            sx={{ border: 0 }}
            rowHeight={140}  // Increase row height to accommodate the image

          />
        </Paper>
    </ThemeProvider>
     {/* Dialog for Editing Appointment */}
     <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Appointment</DialogTitle>
        <DialogContent>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            value={editedAppointment?.firstName || ''}
            onChange={(e) => setEditedAppointment({ ...editedAppointment, firstName: e.target.value })}
            margin="normal"
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            value={editedAppointment?.lastName || ''}
            onChange={(e) => setEditedAppointment({ ...editedAppointment, lastName: e.target.value })}
            margin="normal"
          />
          <TextField
            label="Mobile Number"
            variant="outlined"
            fullWidth
            value={editedAppointment?.mobile || ''}
            onChange={(e) => setEditedAppointment({ ...editedAppointment, mobile: e.target.value })}
            margin="normal"
          />
          {/* Add more fields as needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AppointmentsList;
