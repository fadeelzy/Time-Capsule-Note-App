🕰️ Time Capsule Note App

A robust note-scheduling and retrieval system built with Django and PostgreSQL, enabling users to create, encrypt, and store time-sensitive messages that are only revealed when their release time arrives — engineered with scalability, performance, and security as top priorities.

🚀 Overview

The Time Capsule Note App lets users create personal notes or messages that remain hidden until a specific “release date” and time.
Once that time arrives, the note automatically becomes visible — creating a unique digital time capsule experience.

Built for precision and reliability, this project demonstrates secure data handling, efficient backend logic, and a smooth user interface powered by Django’s modern ecosystem.

🧩 Features

✅ User Authentication – Secure signup/login system using Django’s built-in auth.
✅ Create Time Capsules – Write notes with a title, message, and future release date.
✅ Automatic Unlocking – Notes remain hidden until the set date/time.
✅ Dashboard Overview – View all notes with locked/unlocked states.
✅ Responsive UI – Modern interface powered by clean, adaptive CSS.
✅ PostgreSQL Integration – Optimized relational database with migration-ready structure.
✅ Timezone-Aware Scheduling – Prevents premature unlocking with precise timezone handling.
✅ Production-Ready Settings – Easily configurable .env file for secure credentials.

🛠️ Tech Stack
Layer	Technology
Backend	Django 5, Python 3.13
Database	PostgreSQL
Frontend	HTML, CSS, Vanilla JS
Authentication	Django Auth
Deployment (optional)	Render / AWS Elastic Beanstalk / Docker
Version Control	Git + GitHub


🧱 Project Structure

noteproject/
│
├── myapp/
│   ├── templates/
│   │   ├── landing.html
│   │   ├── login.html
│   │   ├── signup.html
│   │   ├── dashboard.html
│   │   ├── add-note.html
│   │   └── note-details.html
│   ├── static/
│   │   ├── style.css
│   │   ├── app.js
│   │   └── note-details.js
│   ├── views.py
│   ├── models.py
│   ├── urls.py
│   └── forms.py
│
├── noteproject/
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
│
├── .env
├── .gitignore
├── manage.py
└── README.md



⚙️ Setup & Installation
1️⃣ Clone the repository
git clone https://github.com/<your-username>/time-capsule-note-app.git
cd time-capsule-note-app

2️⃣ Create and activate a virtual environment
python -m venv venv
venv\Scripts\activate      # On Windows
# OR
source venv/bin/activate   # On Mac/Linux

3️⃣ Install dependencies
pip install -r requirements.txt

4️⃣ Configure PostgreSQL

Create a new PostgreSQL database and add credentials to your .env file:

DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
SECRET_KEY=your_django_secret_key
DEBUG=True


Update settings.py:

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME'),
        'USER': os.getenv('DB_USER'),
        'PASSWORD': os.getenv('DB_PASSWORD'),
        'HOST': os.getenv('DB_HOST'),
        'PORT': os.getenv('DB_PORT'),
    }
}

5️⃣ Run migrations
python manage.py makemigrations
python manage.py migrate

6️⃣ Start the development server
python manage.py runserver


Then open http://127.0.0.1:8000/
 in your browser.

🔒 Environment & Security Notes

Keep your .env file private — never commit it to GitHub.

Use environment variables for credentials, email configs, and secret keys.

PostgreSQL is preferred for production deployments due to reliability and ACID compliance.

🧠 Future Improvements

Add email reminders when notes unlock

Enable note sharing (send unlocked notes to specific users)

Integrate Celery + Redis for background unlock notifications

Include Django REST API endpoints for mobile or external integration

Add Docker + CI/CD pipelines for automated deployments

👨‍💻 Author

Fadilah Abdulkadir
🏗️ Site Reliability Engineer | AWS Cloud Solutions Architect | Backend Developer

📧 [fadeelzy@gmail.com]
🌐 [https://www.linkedin.com/in/fadilah-abdulkadir/]

⭐ Support

If you find this project inspiring, please consider giving it a ⭐ on GitHub — it helps others discover it and motivates future improvements!
