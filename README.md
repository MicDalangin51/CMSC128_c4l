# GWA Verifier

GWA Verifier is a web application that records and verifies students' grades, and determines the students that are eligible for scholarships and awards.

This app is created for the College of Arts and Sciences (CAS) Scholarships, Honors, and Awards Committee (SHAC) under the University of the Philippines.

## Development Environment

Do the following steps:

```bash
# Run the Flask server on development mode
cd backend
. venv/Scripts/activate
pip install -r requirements.txt
export FLASK_ENV=development
flask run

# Start the React application
cd ../frontend
npm install
npm run dev
```

Open http://localhost:3000

## Production Environment

Do the following steps:

```bash
# Run the Flask server
cd backend
. venv/Scripts/activate
pip install -r requirements.txt
flask run

# Build the React application
cd ../frontend
npm install
npm run build
```

Open http://localhost:5000
