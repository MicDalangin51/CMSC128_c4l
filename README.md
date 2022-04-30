# GWA Verifier

GWA Verifier is a web application that records and verifies students' grades, and determines the students that are eligible for scholarships and awards.

This app is created for the College of Arts and Sciences (CAS) Scholarships, Honors, and Awards Committee (SHAC) under the University of the Philippines.

## Development Environment

Do the following steps:

```bash
# Run the Flask server on development mode
cd backend
python -m venv venv               # If venv folder is not yet created
. venv/Scripts/activate           # If virtual environment is not yet activated
pip install -r requirements.txt   # If dependencies in requirements.txt are not yet installed in virtual environment
export FLASK_ENV=development      # If FLASK_ENV is not yet set in the current terminal session
flask run

# Start the React application
cd ../frontend
npm install                       # If dependencies in package.json are not yet installed
npm run dev
```

Open http://localhost:3000

## Production Environment

Do the following steps:

```bash
# Run the Flask server
cd backend
python -m venv venv               # If venv folder is not yet created
. venv/Scripts/activate           # If virtual environment is not yet activated
pip install -r requirements.txt   # If dependencies in requirements.txt are not yet installed in virtual environment
flask run

# Build the React application (if changes are not yet built or the dist folder is not yet created) 
cd ../frontend
npm install                       # If dependencies in package.json are not yet installed
npm run build
```

Open http://localhost:5000
