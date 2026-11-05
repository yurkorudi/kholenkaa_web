# Kholenkaa Web

A personal website for a psychologist, built with Python and Flask. The platform provides information about psychological consultations, professional qualifications, and certificates, with a dedicated administration panel for managing website content.

## Features

- **Dynamic Homepage** — displays information about consultations and professional certificates.
- **Consultation Management** — create, edit, organize, and manage consultation packages.
- **Certificate Management** — manage professional certificates and qualifications.
- **Admin Panel** — manage website content through Flask-Admin.
- **Database Integration** — store and retrieve website content using MySQL.
- **Content Visibility Control** — activate or deactivate individual sections.
- **Custom Sorting** — control the order in which content appears on the website.

## Tech Stack

| Technology | Purpose |
|---|---|
| Python | Backend development |
| Flask | Web framework |
| Flask-SQLAlchemy | Database ORM |
| Flask-Admin | Administration panel |
| MySQL | Database |
| PyMySQL | MySQL connectivity |
| HTML / CSS / JavaScript | Frontend |

## Project Structure

```text
kholenkaa_web/
│
├── static/             # Static files (CSS, JS, images)
├── templates/          # HTML templates
├── app.py              # Main Flask application
├── models.py           # Database models
├── requirements.txt    # Python dependencies
├── README.md
└── LICENSE
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/yurkorudi/kholenkaa_web.git
cd kholenkaa_web
```

### 2. Create a virtual environment

```bash
python -m venv venv
```

Activate it:

**Windows:**
```bash
venv\Scripts\activate
```

**Linux / macOS:**
```bash
source venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure the database

Create a MySQL database named `psychologist` and configure the database connection in `app.py`.

### 5. Run the application

```bash
python app.py
```

The application will be available at:

```text
http://127.0.0.1:5000
```

## Database Models

The application currently includes three main models:

- `Certificate` — professional certificates and qualifications.
- `Consultation` — consultation packages, pricing, and descriptions.
- `ConsultationFeature` — individual features associated with consultation packages.

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

---

**Developed by [Yurii Pistun](https://github.com/yurkorudi)**
