# Contact Book

A simple Contact Management System built with React, TypeScript, Laravel, and MySQL.

## Features

- Create Contact
- Contact List
- Update Existing Contact
- Delete Contact
- Search Contact by Name
- Sort Contacts (Name, Email, Phone)
- Pagination 
- Form Validation

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- React Icons

### Backend
- Laravel
- MySQL
- Eloquent ORM
- REST API

### Deployment
- Frontend: Vercel
- Backend: Railway

---

## Project Structure

### Frontend

```bash
src/
├── components/
├── hooks/
├── modules/
├── services/
├── types/
├── utils/
└── routes/
```

### Backend
```bash
Backend/
├── app/
│   ├── Http/
│   │   └── Controllers/
│   │   │   └── Api/
│   ├── Models/
│   └── Helpers/
├── database/
│   └── migrations/
└── routes/
```

---

## API Endpoints

### Get All Contacts

```http
GET /contacts
```

### Get Contact By ID

```http
GET /contacts/{id}
```

### Create Contact

```http
POST /contacts
```

### Update Contact

```http
PUT /contacts/{id}
```

### Delete Contact

```http
DELETE /contacts/{id}
```


---

## Live Demo

Frontend:

https://gloria-contact-book.vercel.app

Backend API:

https://contact-project-production.up.railway.app

---
## Key Highlights

- Full CRUD Functionality
- Search by Name
- Sorting & Pagination
- Form Validation
- RESTful API Development
- Responsive Design
- Frontend & Backend Deployment

## Author

**Gloria Domenica Ferreira Da Costa E Silva**

- GitHub: https://github.com/glriadomenica-debug
- LinkedIn: Add your LinkedIn profile here

---

## License

This project is open-source and available under the MIT License.
