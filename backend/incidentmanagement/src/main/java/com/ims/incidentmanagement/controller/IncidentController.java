package com.ims.incidentmanagement.controller;

import com.ims.incidentmanagement.model.Incident;
import com.ims.incidentmanagement.service.IncidentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/incidents")
@CrossOrigin(origins = "http://localhost:3000")
public class IncidentController {
    @Autowired
    private IncidentService service;

    @GetMapping
    public List<Incident> getAll() {
        return service.getAllIncidents();
    }

    @GetMapping("/{id}")
    public Incident getById(@PathVariable Long id) {
        return service.getIncidentById(id).orElse(null);
    }

    @PostMapping
    public Incident create(@RequestBody Incident incident) {
        return service.createIncident(incident);
    }

    @PutMapping("/{id}")
    public Incident update(@PathVariable Long id, @RequestBody Incident incident) {
        return service.updateIncident(id, incident);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteIncident(id);
    }
}
