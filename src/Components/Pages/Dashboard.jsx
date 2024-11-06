import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { createTheme } from "@mui/material/styles";
import axios from "axios";
import api from "../../utils/axios-custom";

// Data for pie chart
const pieData = [
  { name: "Math", value: 205 },
  { name: "English", value: 170 },
  { name: "Science", value: 111 },
  { name: "Geography", value: 150 },
];

// Define colors for the pie chart segments
const pieColors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const lineData = [
  { month: "Jan", students: 120 },
  { month: "Feb", students: 150 },
  { month: "Mar", students: 200 },
  { month: "Apr", students: 180 },
  { month: "May", students: 220 },
  { month: "Jun", students: 170 },
];

const demoTheme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#ff4081",
    },
  },
});

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]); // State for courses data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch courses data from the API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/User");
        // console.error('  data :', response.data);

        setCourses(response.data); // Set the courses data to state
      } catch (error) {
        console.error("Error fetching courses data:", error);
        setError("Failed to load courses data"); // Set error message
      } finally {
        setLoading(false); // Set loading to false after the fetch
      }
    };

    fetchCourses();
  }, []);

  return (
    <Box sx={{ display: "flex", bgcolor: "#f5f5f5" }}>
      <Box
        sx={{
          flexGrow: 1,
          marginLeft: open ? "240px" : "0",
          transition: "margin-left 0.3s ease",
        }}
      >
        <Box sx={{ padding: 2 }}>
          <Typography
            variant="h4"
            sx={{ marginBottom: 2, color: demoTheme.palette.primary.main }}
          >
            Dashboard
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 2,
            }}
          >
            <Box sx={{ flex: 1, marginRight: 2, textAlign: "center" }}>
              <Typography
                variant="h6"
                sx={{ color: demoTheme.palette.primary.main }}
              >
                Students
              </Typography>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={pieColors[index % pieColors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <Typography variant="body1">
                Total:{" "}
                {pieData.reduce((total, entry) => total + entry.value, 0)}
              </Typography>
            </Box>

            {/* Course User List Table */}
            <Box
              sx={{
                bgcolor: "#cfe8fc",
                border: "1px solid #1976d2",
                borderRadius: "8px",
                padding: 2,
                flex: 1,
                marginLeft: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: demoTheme.palette.primary.main, marginBottom: 2 }}
              >
                Course User
              </Typography>
              <TableContainer
                component={Paper}
                sx={{ maxHeight: 300, overflowY: "auto" }}
              >
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          borderBottom: "2px solid #1976d2",
                          fontWeight: "bold",
                        }}
                      >
                        Full Name
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          borderBottom: "2px solid #1976d2",
                          fontWeight: "bold",
                        }}
                      >
                        Email
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={3} align="center">
                          <CircularProgress />
                        </TableCell>
                      </TableRow>
                    ) : error ? (
                      <TableRow>
                        <TableCell colSpan={3} align="center">
                          {error}
                        </TableCell>
                      </TableRow>
                    ) : (
                      courses.map((course, index) => (
                        <TableRow key={index}>
                          <TableCell>{course.fullName}</TableCell>
                          <TableCell align="right">{course.email}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>

          <Box
            sx={{
              marginTop: 4,
              width: "100%",
              height: 400,
              bgcolor: "#fbfcfc",
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: demoTheme.palette.primary.main }}
            >
              Monthly Student Growth
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={lineData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="students"
                  stroke={demoTheme.palette.primary.main}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

Dashboard.propTypes = {
  open: PropTypes.bool,
};

export default Dashboard;
