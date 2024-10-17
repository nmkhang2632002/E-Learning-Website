import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, AppBar, Toolbar, IconButton, Avatar, Badge } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import { createTheme } from '@mui/material/styles';

// Dữ liệu biểu đồ
const pieData = [
  { name: 'Math', value: 205 },
  { name: 'English', value: 170 },
  { name: 'Science', value: 111 },
  { name: 'Geography', value: 150 },
];

const lineData = [
  { month: 'Jan', students: 120 },
  { month: 'Feb', students: 150 },
  { month: 'Mar', students: 200 },
  { month: 'Apr', students: 180 },
  { month: 'May', students: 220 },
  { month: 'Jun', students: 170 },
];

const classes = [
  { name: 'Class A', totalStudents: 30 },
  { name: 'Class B', totalStudents: 25 },
  { name: 'Class C', totalStudents: 28 },
  { name: 'Class D', totalStudents: 32 },
  { name: 'Class E', totalStudents: 20 },
  { name: 'Class F', totalStudents: 22 },
  { name: 'Class G', totalStudents: 24 },
  { name: 'Class H', totalStudents: 29 },
  { name: 'Class I', totalStudents: 18 },
  { name: 'Class J', totalStudents: 15 },
];

const demoTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ff4081',
    },
  },
});

const Dashboard = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <Box sx={{ display: 'flex', bgcolor: '#f5f5f5' }}>
     

      <Box 
        sx={{ 
          flexGrow: 1, 
          marginLeft: open ? '240px' : '0', 
          transition: 'margin-left 0.3s ease' 
        }}
      >
      

        <Box sx={{ padding: 2 }}>
          <Typography variant="h4" sx={{ marginBottom: 2, color: demoTheme.palette.primary.main }}>Dashboard</Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <Box sx={{ flex: 1, marginRight: 2, textAlign: 'center' }}>
              <Typography variant="h6" sx={{ color: demoTheme.palette.primary.main }}>Students</Typography>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#0088FE' : '#00C49F'} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <Typography variant="body1">Total: {pieData.reduce((total, entry) => total + entry.value, 0)}</Typography>
            </Box>

            {/* Bảng danh sách lớp học bên phải */}
            <Box sx={{ bgcolor: '#cfe8fc', border: '1px solid #1976d2', borderRadius: '8px', padding: 2, flex: 1, marginLeft: 2 }}>
              <Typography variant="h6" sx={{ color: demoTheme.palette.primary.main, marginBottom: 2 }}>Class List</Typography>
              <TableContainer component={Paper} sx={{ maxHeight: 300, overflowY: 'auto' }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ borderBottom: '2px solid #1976d2', fontWeight: 'bold' }}>Class Name</TableCell>
                      <TableCell align="right" sx={{ borderBottom: '2px solid #1976d2', fontWeight: 'bold' }}>Total Students</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {classes.map((classItem, index) => (
                      <TableRow key={index}>
                        <TableCell>{classItem.name}</TableCell>
                        <TableCell align="right">{classItem.totalStudents}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>

          <Box sx={{ marginTop: 4, width: '100%', height: 400, bgcolor: '#fbfcfc' }}>
            <Typography variant="h6" sx={{ color: demoTheme.palette.primary.main }}>Monthly Student Growth</Typography>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="students" stroke={demoTheme.palette.primary.main} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
