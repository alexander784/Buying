## E-Commerce Website
<p>This is a full-stack e-commerce platform built with Django (backend), PostgreSQL (database), and Next.js (frontend). The application enables users to browse products, filter by categories, add items to a cart, and request quotes via WhatsApp. It supports both authenticated and guest users, with a responsive and accessible user interface designed for seamless shopping experiences across devices.</p>

## Features

**Product Browsing:** Displays a grid of products with images, names, descriptions, and prices, fetched from a Django REST API. </br>
**Category Filtering:** Allows users to filter products by categories, accessible via a sidebar for both logged-in and guest users.</br>
**Cart Functionality:** Users can add products to a cart, managed via a React context (CartContext).</br>
**WhatsApp Ordering:** Integrated "Order via WhatsApp" button for direct communication with sellers.</br>
**Responsive Design:** Utilizes Tailwind CSS for a mobile-first, responsive layout with flexible grids and adaptive spacing.</br>
**Authentication:** Supports user login with JWT-based authentication, with admin capabilities to add/delete categories.</br>
**Error Handling:** Robust handling of loading states, errors, and empty data for categories and products.</br>

## Tech Stack
**Frontend**: Next.js, React, Tailwind CSS, Geist Fonts </br>
**Backend**: Django, Django REST Framework </br>
**Database:** PostgreSQL </br>
**Authentication:** JSON Web Tokens (JWT) via rest_framework_simplejwt </br>
**API:** RESTful API endpoints for products, categories, and user management </br>
**Context Management:** React Context API for managing products, categories, and cart state </br>


## Prerequisites

* Node.js: v18.x 
* Python: v3.10.12
* PostgreSQL:

## Setup Instructions
* Backend Setup (Django)

1. Clone the Repository: </br>
git clone `https://github.com/alexander784/Buy.git` </br>
`cd Buy`


2. **Create a Virtual Environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate


3. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt


4. **Configure Environment Variables:**
   ```bash
   Create a .env file in the backend directory:
   DATABASE_URL=postgresql://user:password@localhost:5432/ecommerc
   SECRET_KEY=your-django-secret-key


5. **Set Up PostgreSQL:**

* Create a database named ecommerce:psql -U postgres
* CREATE DATABASE ecommerce_db;



6. **Run migrations**
   ```bash
   python3 manage.py makemigrations
   python3 manage.py migrate




7. **Create a Superuser (for admin access):**
   ```bash
   python manage.py createsuperuser


8. **Run the Development Server:**
   ```bash
   python manage.py runserver



## Frontend Setup

1. **Install Dependencies:**
   ```bash
   npm install

2. **Configure Environment Variables**
   ```bash
   Create a .env.local file
   NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000/


3. **Run the Development Server:**
   ```bash
   npm run dev


**The frontend will be available at http://localhost:3000.**



## API Endpoints

| Endpoint                          | Method | Description                  |
|--------------------------------   |--------|------------------------------|
| `/auth/register/`                 | POST   | Create a new user           |
| `/auth/login/`                    | POST   | create a JWT by passing a valid user in the post request to this endpoint  |
| `/auth/logout/`                   | GET    | Logout a user        |
| `/token/refresh/`                 | POST   | generate a new JWT once the lifetime of the previously generated one expires   |
| `/categories/`             | GET    | List all categories           |
| `/categories/delete/create/` | POST | Add new category           |
| `/categories/delete/<id>/` | DELETE | Delete a category            |
| `/products/`               | GET    | List all products    |
| `/products/create/`           | POST    | Add new products    |
| `/products/delete/`           | DELETE  | Delete a products    |


## Usage

1. **Browsing Products:**

   Visit `http://localhost:3000` to view the homepage.

2. **Adding to Cart:**

`Click the cart icon on a product to add it to the cart (managed via CartContext).`


3. **Ordering via WhatsApp:**


`Click the "Order via WhatsApp" button to initiate a purchase inquiry.`


## Admin Tasks:

1. Log in as an admin at http://127.0.0.1:8000/admin to manage categories and products.



## Contributing

**Fork the repository.**
* Create a feature branch (git checkout -b feature/your-feature).
* Commit changes (git commit -m "Add your feature").
* Push to the branch (git push origin feature/your-feature).
* Open a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
Contact

**Any Question Or suggestions Email:**
alexanders7sg@gmail.com