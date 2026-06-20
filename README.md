# Contact Book

A simple Contact Management System built with React, TypeScript, Laravel and MySQL.

## Features

- Create Contact
- Contact List
- Update Existing Contact
- Delete Contact
- Search Contact by Name
- Sorting Contacts
- Pagination
- Form Validation

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Axios

### Backend
- Laravel
- MySQL
- REST API

## Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/glriadomenica-debug/contact-project.git
cd contact-project
```

---

### 2. Frontend Setup

```bash
cd Frontend
npm install
```

Create `.env` file:

```env
VITE_API_URL=http://localhost:8000
```

Run frontend:

```bash
npm run dev
```

Frontend will run at:

```text
http://localhost:5173
```

---

### 3. Backend Setup

```bash
cd Backend
composer install
```

Create `.env` file and configure database:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=contact_db
DB_USERNAME=root
DB_PASSWORD=
```

Generate application key:

```bash
php artisan key:generate
```

Run migration:

```bash
php artisan migrate
```

Start Laravel server:

```bash
php artisan serve
```

Backend will run at:

```text
http://localhost:8000
```

## API Endpoints

| Method | Endpoint | Description |
|----------|----------|-------------|
| GET | /contacts | Get all contacts |
| GET | /contacts/{id} | Get contact by ID |
| POST | /contacts | Create contact |
| PUT | /contacts/{id} | Update contact |
| DELETE | /contacts/{id} | Delete contact |

## Live Demo

Frontend:
https://gloria-contact-book.vercel.app

Backend:
https://contact-project-production.up.railway.app

## Author

**Gloria Domenica Ferreira Da Costa E Silva**

GitHub:
https://github.com/glriadomenica-debug
