import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, Chip, TextField, InputAdornment, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { incidentAPI } from "../services/api";

const priorityColor = { High: "error", Medium: "warning", Low: "success" };
const statusColor = { Open: "error", "In Progress": "warning", Resolved: "success" };

function IncidentList() {
  const [incidents, setIncidents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    try {
      const response = await incidentAPI.getAll();
      setIncidents(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const filtered = incidents.filter(i =>
    i.title?.toLowerCase().includes(search.toLowerCase()) ||
    i.status?.toLowerCase().includes(search.toLowerCase()) ||
    i.priority?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (window.confirm("Delete this incident?")) {
      try {
        await incidentAPI.delete(id);
        fetchIncidents();
      } catch (error) {
        console.error("Error deleting:", error);
      }
    }
  };

  if (loading) return <Box style={{padding: 32, textAlign: 'center'}}><CircularProgress /></Box>;

  return (
    <Box style={{ padding: 32, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <Box>
          <Typography variant="h4" style={{ fontWeight: "bold", color: "#1A3C5E" }}>All Incidents</Typography>
          <Typography color="textSecondary">{incidents.length} total incidents</Typography>
        </Box>
        <Button variant="contained" component={Link} to="/incidents/new" startIcon={<AddCircleOutlineIcon />}
          style={{ backgroundColor: "#1A3C5E", borderRadius: 8, padding: "10px 24px" }}>New Incident</Button>
      </Box>

      <TextField placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} variant="outlined" size="small"
        style={{ marginBottom: 16, backgroundColor: "white", borderRadius: 8, width: 360 }}
        InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon color="disabled" /></InputAdornment> }} />

      <Paper elevation={2} style={{ borderRadius: 12, overflow: "hidden" }}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#1A3C5E" }}>
              {["#", "Title", "Priority", "Status", "Date", "Actions"].map(h => (
                <TableCell key={h} style={{ color: "white", fontWeight: "bold", fontSize: 14 }}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow><TableCell colSpan={6} align="center" style={{ padding: 32, color: "#999" }}>No incidents found.</TableCell></TableRow>
            ) : (
              filtered.map((inc, idx) => (
                <TableRow key={inc.id} hover style={{ backgroundColor: idx % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <TableCell style={{ color: "#999", fontSize: 13 }}>{inc.id}</TableCell>
                  <TableCell style={{ fontWeight: "500" }}>{inc.title}</TableCell>
                  <TableCell><Chip label={inc.priority} color={priorityColor[inc.priority]} size="small" style={{ fontWeight: "bold" }} /></TableCell>
                  <TableCell><Chip label={inc.status} color={statusColor[inc.status]} size="small" style={{ fontWeight: "bold" }} /></TableCell>
                  <TableCell style={{ color: "#666", fontSize: 13 }}>{inc.date}</TableCell>
                  <TableCell>
                    <Button size="small" component={Link} to={`/incidents/edit/${inc.id}`} startIcon={<EditIcon />} style={{ color: "#1A3C5E", marginRight: 4 }}>Edit</Button>
                    <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={() => handleDelete(inc.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

export default IncidentList;
