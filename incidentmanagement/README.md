# Incident Management System Backend

Spring Boot backend for the Incident Management System. It exposes REST endpoints for incident CRUD operations and stores records in MySQL through Spring Data JPA.

## Stack

- Java 17
- Spring Boot
- Spring Web
- Spring Data JPA
- Hibernate
- MySQL
- Maven

## Run Locally

Set your local MySQL credentials, then run:

```bash
set DB_USERNAME=root
set DB_PASSWORD=your_mysql_password
```

PowerShell users can set the same values with `$env:DB_USERNAME` and `$env:DB_PASSWORD`.

```bash
mvn spring-boot:run
```

The API starts at `http://localhost:8080`.

## API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/incidents` | List all incidents |
| GET | `/api/incidents/{id}` | Get one incident |
| POST | `/api/incidents` | Create an incident |
| PUT | `/api/incidents/{id}` | Update an incident |
| DELETE | `/api/incidents/{id}` | Delete an incident |
