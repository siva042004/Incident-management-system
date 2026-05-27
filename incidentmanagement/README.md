# Incident Management System Backend

Spring Boot backend for the Incident Management System. It exposes REST endpoints for incident CRUD operations and stores records through Spring Data JPA. Local Docker uses MySQL, while free hosted deployment can use Neon Postgres.

## Stack

- Java 17
- Spring Boot
- Spring Web
- Spring Data JPA
- Hibernate
- MySQL
- PostgreSQL / Neon
- Maven

## Run Locally

Without database environment variables, the app uses an in-memory H2 database for quick local runs.

For MySQL or Neon, set database credentials before running:

```bash
set SPRING_DATASOURCE_URL=jdbc:postgresql://your-neon-host/your-db?sslmode=require
set SPRING_DATASOURCE_USERNAME=your-neon-user
set SPRING_DATASOURCE_PASSWORD=your-neon-password
```

PowerShell users can set the same values with `$env:SPRING_DATASOURCE_URL`, `$env:SPRING_DATASOURCE_USERNAME`, and `$env:SPRING_DATASOURCE_PASSWORD`.

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
