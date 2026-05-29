package com.ims.incidentmanagement.service;

import com.ims.incidentmanagement.model.Incident;
import com.ims.incidentmanagement.repository.IncidentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class IncidentService {
    @Autowired
    private IncidentRepository repository;

    public List<Incident> getAllIncidents() {
        return repository.findAll();
    }

    public Optional<Incident> getIncidentById(Long id) {
        return repository.findById(id);
    }

    public Incident createIncident(Incident incident) {
        return repository.save(incident);
    }

    public Incident updateIncident(Long id, Incident updated) {
        Incident existing = repository.findById(id).orElseThrow();
        existing.setTitle(updated.getTitle());
        existing.setPriority(updated.getPriority());
        existing.setStatus(updated.getStatus());
        existing.setDescription(updated.getDescription());
        existing.setDate(updated.getDate());
        return repository.save(existing);
    }

    public void deleteIncident(Long id) {
        repository.deleteById(id);
    }
}
