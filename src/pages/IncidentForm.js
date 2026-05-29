import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, MenuItem, Paper, Alert } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { incidentAPI } from "../services/api";

function IncidentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({ title: "", priority: "Low", status: "Open", description: "", date: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isEdit) {
      incidentAPI.getById(id).then(res => setForm(res.data)).catch(err => console.error(err));
    }
  }, [id, isEdit]);

  const validate = () => {
    const newErrors = {};
    if (!form.title?.trim()) newErrors.title = "Title required";
    if (!form.date) newErrors.date = "Date required";
    if (!form.description?.trim()) newErrors.description = "Description required";
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      if (isEdit) {
        await incidentAPI.update(id, form);
      } else {
        await incidentAPI.create(form);
      }
      setSuccess(true);
      setTimeout(() => navigate("/incidents"), 1500);
    } catch (error) {
      console.error("Error saving:", error);
    }
  };

  return (
    <Box style={{ padding: 32, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Box style={{ maxWidth: 640, margin: "0 auto" }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate("/incidents")} style={{ color: "#1A3C5E", marginBottom: 16 }}>
          Back to Incidents
        </Button>

        <Paper elevation={3} style={{ borderRadius: 12, overflow: "hidden" }}>
          <Box style={{ backgroundColor: "#1A3C5E", padding: "20px 28px" }}>
            <Typography variant="h5" style={{ color: "white", fontWeight: "bold" }}>
              {isEdit ? "Edit Incident" : "New Incident"}
            </Typography>
          </Box>

          <Box style={{ padding: 28 }}>
            {success && <Alert severity="success" style={{ marginBottom: 20 }}>
              {isEdit ? "Updated!" : "Created!"} Redirecting...
            </Alert>}

            <form onSubmit={handleSubmit}>
              <TextField fullWidth label="Title *" name="title" value={form.title || ""} onChange={handleChange}
                error={Boolean(errors.title)} helperText={errors.title} margin="normal" />

              <Box style={{ display: "flex", gap: 16 }}>
                <TextField fullWidth select label="Priority" name="priority" value={form.priority} onChange={handleChange} margin="normal">
                  {["Low", "Medium", "High"].map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
                </TextField>
                <TextField fullWidth select label="Status" name="status" value={form.status} onChange={handleChange} margin="normal">
                  {["Open", "In Progress", "Resolved"].map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                </TextField>
              </Box>

              <TextField fullWidth label="Date *" name="date" type="date" value={form.date || ""} onChange={handleChange}
                error={Boolean(errors.date)} helperText={errors.date} margin="normal" InputLabelProps={{ shrink: true }} />

              <TextField fullWidth multiline rows={4} label="Description *" name="description" value={form.description || ""}
                onChange={handleChange} error={Boolean(errors.description)} helperText={errors.description} margin="normal" />

              <Box style={{ marginTop: 24, display: "flex", gap: 12 }}>
                <Button type="submit" variant="contained" startIcon={<SaveIcon />}
                  style={{ backgroundColor: "#1A3C5E", padding: "10px 28px" }}>
                  {isEdit ? "Update" : "Create"}
                </Button>
                <Button variant="outlined" onClick={() => navigate("/incidents")} style={{ borderColor: "#1A3C5E", color: "#1A3C5E" }}>
                  Cancel
                </Button>
              </Box>
            </form>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default IncidentForm;
