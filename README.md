# NextFit

**NextFit** is a modern, full-stack fitness planning web application built using Angular and Spring Boot. It combines a powerful backend, responsive frontend, and AI-enhanced features for personalized user experiences.

---

## 🧰 Tech Stack

### 🔹 Frontend — Angular 19

Built with the Angular framework and modern UI libraries:

- **@angular/core** ^19.0.0 — Core Angular framework
- **NgRx** ^19.1.0 — State management using Redux pattern
- **PrimeNG** ^19.0.8 — UI components for Angular
- **TailwindCSS + PrimeUI** — Utility-first styling integrated with PrimeNG
- **ngx-cookie-service** — Cookie management for authentication/session
- **RxJS** ~7.8.0 — Reactive programming utilities

### 🔹 Backend — Spring Boot 3.2.2

Robust and scalable Java backend built with:

- **Spring Boot Web** — RESTful API development
- **Spring Data JPA** — ORM and database interactions
- **Spring Security** — Authentication and authorization
- **Spring Boot Mail** — Email service integration
- **Spring Boot Validation** — Input validation and schema rules
- **Spring AI (OpenAI Integration)** — AI-driven recommendations
- **JWT (io.jsonwebtoken)** — Token-based user authentication
- **Lombok** — Boilerplate-free POJOs
- **MySQL Connector** — Database connectivity
- **SpringDoc OpenAPI** — Swagger UI for API documentation

---

## 📁 Project Structure

```text
next-fit/
├── nextfit-ng/           # Angular frontend application
├── nextfit-backend/      # Spring Boot backend API
├── docker-compose/       # Docker setup for both frontend an backend
├── jenkinsfile           # Jenkins CI/CD pipeline configuration
├── README.md             # Project overview and setup
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Angular CLI](https://angular.io/cli)
  Install globally with:

  ```bash
  npm install -g @angular/cli
  ```

- Java 17 or newer
- Maven
- MySQL (running instance with a user/schema created)
- Docker & Docker Compose (optional, for containerized setup)

---

### Frontend Setup (Angular)

```bash
# Navigate to frontend directory
cd nextfit-ng

# Install dependencies
npm install

# Run Angular development server
ng serve
```

The app will be available at: [http://localhost:4200](http://localhost:4200)

---

### Backend Setup (Spring Boot)

```bash
# Navigate to backend directory
cd ../nextfit-backend

# Run the Spring Boot app
./mvnw spring-boot:run
```

Make sure your `application.properties` or `application.yml` is configured correctly for:

- MySQL database (URL, username, password)
- Environment variables like `AI_API_KEY` if needed

The backend will be available at: [http://localhost:8080](http://localhost:8080)
