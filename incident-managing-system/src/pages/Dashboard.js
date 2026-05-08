import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, Button, Box, Paper, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { incidentAPI } from "../services/api";

function StatCard({ label, count, color }) {
  return (
    <Card elevation={3} style={{ borderTop: `5px solid ${color}`, borderRadius: 12, textAlign: "center" }}>
      <CardContent style={{ padding: 24 }}>
        <Typography variant="h3" style={{ color: color, fontWeight: "bold", marginTop: 4 }}>{count}</Typography>
        <Typography variant="h6" color="textSecondary">{label}</Typography>
      </CardContent>
    </Card>
  );
}

function Dashboard() {
  const [incidents, setIncidents] = useState([]);
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
      console.error("Error fetching incidents:", error);
      setLoading(false);
    }
  };

  if (loading) return <Box style={{ padding: 32, textAlign: "center" }}><CircularProgress /></Box>;

  const open = incidents.filter(i => i.status === "Open").length;
  const inProgress = incidents.filter(i => i.status === "In Progress").length;
  const resolved = incidents.filter(i => i.status === "Resolved").length;

  const stats = [
    { label: "Total", count: incidents.length, color: "#1A3C5E" },
    { label: "Open", count: open, color: "#d32f2f" },
    { label: "In Progress", count: inProgress, color: "#f57c00" },
    { label: "Resolved", count: resolved, color: "#388e3c" },
  ];

  return (
    <Box style={{ padding: 32, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <Box>
          <Typography variant="h4" style={{ fontWeight: "bold", color: "#1A3C5E" }}>Dashboard</Typography>
          <Typography color="textSecondary">Welcome back! Here's what's happening today.</Typography>
        </Box>
        <Button variant="contained" component={Link} to="/incidents/new" startIcon={<AddCircleOutlineIcon />}
          style={{ backgroundColor: "#1A3C5E", borderRadius: 8, padding: "10px 24px" }}>New Incident</Button>
      </Box>

      <Grid container spacing={3} style={{ marginBottom: 32 }}>
        {stats.map(stat => <Grid item xs={12} sm={6} md={3} key={stat.label}><StatCard {...stat} /></Grid>)}
      </Grid>

      <Paper elevation={2} style={{ borderRadius: 12, overflow: "hidden" }}>
        <Box style={{ backgroundColor: "#1A3C5E", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" style={{ color: "white", fontWeight: "bold" }}>Recent Incidents</Typography>
          <Button component={Link} to="/incidents" size="small" style={{ color: "#A8C4E0" }}>View All -&gt;</Button>
        </Box>
        {incidents.length === 0 ? (
          <Box style={{ padding: 32, textAlign: "center", color: "#999" }}>
            <Typography>No incidents yet. Create your first incident!</Typography>
          </Box>
        ) : (
          incidents.slice(0, 3).map((inc, idx) => (
            <Box key={inc.id} style={{ padding: "16px 24px", borderBottom: idx < 2 ? "1px solid #eee" : "none",
              display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: idx % 2 === 0 ? "#fff" : "#fafafa" }}>
              <Box>
                <Typography style={{ fontWeight: "bold" }}>{inc.title}</Typography>
                <Typography variant="body2" color="textSecondary">{inc.date}</Typography>
              </Box>
              <Box style={{ display: "flex", gap: 8 }}>
                <span style={{ padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: "bold",
                  backgroundColor: inc.priority === "High" ? "#fde8e8" : inc.priority === "Medium" ? "#fff3e0" : "#e8f5e9",
                  color: inc.priority === "High" ? "#d32f2f" : inc.priority === "Medium" ? "#f57c00" : "#388e3c" }}>
                  {inc.priority}
                </span>
                <span style={{ padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: "bold", backgroundColor: "#e3f0fb", color: "#1A3C5E" }}>
                  {inc.status}
                </span>
              </Box>
            </Box>
          ))
        )}
      </Paper>
    </Box>
  );
}

export default Dashboard;
