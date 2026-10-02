# MediGuide – Medicine Recommendation System

A full-stack web app where a user selects their symptoms and gets likely conditions, suggested medicines, precautions, diet and exercise tips. It also warns about allergy conflicts and drug interactions.

> **Disclaimer:** This is a college project for learning. It is not medical advice. Always consult a doctor.

**Live demo:** https://mediguide-app.onrender.com

_The demo runs on a free plan. If it has been idle, the first load can take about a minute._

## Features

- Symptom selection with red-flag (emergency) symptom detection
- Top 3 likely conditions with confidence scores
- Medicine suggestions with composition details
- Allergy and drug-interaction warnings
- Optional AI-generated answers using the Gemini API
- Works without an API key: falls back to a built-in rule-based engine
- ML model comparison page
- Prediction history and printable report
- Admin knowledge base to view the disease data
- Multi-language support

## Tech Stack

| Part | Technology |
|------|------------|
| Frontend | React, Vite, TypeScript, Tailwind CSS |
| Backend | Node.js, Express |
| AI (optional) | Google Gemini API |
| Charts | Recharts |
| Hosting | Render |

## Screenshots

<img width="1366" height="721" alt="Screenshot 2026-10-02 110335" src="https://github.com/user-attachments/assets/e1b88684-2a34-4af5-9f2c-bfec89667e53" />
<img width="1366" height="768" alt="Screenshot 2026-10-02 112910" src="https://github.com/user-attachments/assets/9e01ee7a-5b94-4310-bf85-932e56452c01" />
<img width="1366" height="768" alt="Screenshot 2026-10-02 112934" src="https://github.com/user-attachments/assets/8a6e9c1d-d39c-4b63-8bc4-66af466729cc" />
<img width="1366" height="768" alt="Screenshot 2026-10-02 113021" src="https://github.com/user-attachments/assets/9eb7e828-c7dc-42d4-94c7-c8482ab2a608" />
<img width="1366" height="768" alt="Screenshot 2026-10-02 113133" src="https://github.com/user-attachments/assets/7ad2d117-b53f-46bc-b1b2-9d0405867779" />





## Run Locally

**Requirements:** Node.js 18 or newer

```bash
git clone https://github.com/vaishnavi-cloud27/mediguide-medicine-recommendation-system.git
cd mediguide-medicine-recommendation-system
npm install
```

Create a file named `.env.local` in the project folder (optional, only for AI answers):

```
GEMINI_API_KEY=your_key_here
```

Start the app:

```bash
npm run dev
```

Open http://localhost:3000

## Project Structure

```
server.ts        Express server and prediction API
src/
  components/    React UI components
  data/          Symptoms, diseases, translations
  App.tsx        Main app
```

## Author

Vaishnavi – BSc Computer Science, Mumbai University
GitHub: [@vaishnavi-cloud27](https://github.com/vaishnavi-cloud27)
