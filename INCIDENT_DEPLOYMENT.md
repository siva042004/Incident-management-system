# Incident Management System Deployment

This workspace uses two sibling project folders:

- `incidentmanagement`: Spring Boot backend
- `incident-managing-system`: React frontend

## Local Docker Run

Copy the sample environment file:

```bash
copy .env.incident.example .env
```

Edit `.env` and replace all placeholder passwords.

Start the stack:

```bash
docker-compose -f incident-compose.yml --env-file .env up -d --build
```

Open:

- Frontend: `http://localhost`
- Backend health: `http://localhost:8080/api/health`
- Incidents API: `http://localhost:8080/api/incidents`

MySQL is available to the backend on Docker's internal network as `mysql:3306`.

Stop the stack:

```bash
docker-compose -f incident-compose.yml down
```

View logs:

```bash
docker-compose -f incident-compose.yml logs -f backend
docker-compose -f incident-compose.yml logs -f frontend
docker-compose -f incident-compose.yml logs -f mysql
```

## AWS EC2 Setup

Install Docker and Docker Compose on the EC2 instance, then clone the repository.

```bash
sudo apt update
sudo apt install -y docker.io docker-compose
sudo systemctl enable docker
sudo systemctl start docker
sudo usermod -aG docker ubuntu
```

Log out and back in so the `docker` group applies.

Create production environment values:

```bash
cp .env.incident.example .env
nano .env
```

Use strong values for:

- `MYSQL_PASSWORD`
- `MYSQL_ROOT_PASSWORD`
- `CORS_ALLOWED_ORIGINS`

Start production:

```bash
docker-compose -f incident-compose.yml --env-file .env up -d --build
```

## Update Deployment

```bash
git pull
docker-compose -f incident-compose.yml --env-file .env up -d --build
docker image prune -f
```

## Notes

- Secrets belong in `.env`, not Git.
- The frontend uses `/api` in Docker and nginx proxies it to the backend service.
- The backend reads database and CORS settings from environment variables. Local Docker uses MySQL; free hosted deployment can use Neon Postgres.
- This project does not currently include JWT, RBAC, WebSocket, audit logging, or blue-green deployment code.

## Free Hosted Deployment

Use:

- Backend: Render free web service
- Database: Neon free Postgres
- Frontend: Vercel free project

### 1. Backend on Render

Create a new Render Blueprint or Web Service from this GitHub repository.

If using the root `render.yaml`, Render will detect:

- Root directory: `incidentmanagement`
- Runtime: Docker
- Health check: `/api/health`

Add these Render environment variables:

```text
SPRING_DATASOURCE_URL=jdbc:postgresql://<neon-host>/<database>?sslmode=require
SPRING_DATASOURCE_USERNAME=<neon-user>
SPRING_DATASOURCE_PASSWORD=<neon-password>
CORS_ALLOWED_ORIGINS=https://<your-vercel-app>.vercel.app
```

In Neon, use the JDBC connection string, not the `psql` command.

### 2. Frontend on Vercel

Create a new Vercel project from the same GitHub repository.

Use these settings:

```text
Root Directory: incident-managing-system
Build Command: npm run build
Output Directory: build
```

Add this Vercel environment variable:

```text
REACT_APP_API_BASE_URL=https://<your-render-service>.onrender.com/api
```

Redeploy after adding the environment variable.

### 3. Test URLs

Backend:

```text
https://<your-render-service>.onrender.com/api/health
https://<your-render-service>.onrender.com/api/incidents
```

Frontend:

```text
https://<your-vercel-app>.vercel.app
```
