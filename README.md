Converse-AI - https://converse-8sqenwhpd-codingerror7s-projects.vercel.app/

Build a customized AI chatbot for your business in minutes.

Converse-AI is an AI chatbot builder that allows businesses to create a chatbot tailored to their business, category, description, and desired behavior—without requiring complex AI configuration.

Users provide their business information, customize the chatbot's behavior, and receive a dedicated chatbot that can interact with their customers using AI.

✨ Features
🤖 AI-Powered Chatbots — Generate intelligent chatbot experiences using OpenAI.
⚡ Simple Setup — Create a chatbot by providing basic business information.
🎯 Business-Specific Behavior — Configure how the chatbot should respond and interact.
🏷️ Category-Based Configuration — Select a business category to help define the chatbot's context.
💬 Real-Time Conversations — Users can interact with their generated chatbot through a dedicated chat interface.
🔗 Unique Chatbot URLs — Each generated chatbot gets its own shareable URL.
🗄️ Persistent Data — Chatbot configurations and business information are stored in MongoDB.
📱 Responsive UI — Designed to work across desktop, tablet, and mobile devices.
🎨 Modern Interface — Premium dark-themed interface focused on simplicity and usability.
🚀 How It Works
User
  ↓
Landing Page
  ↓
Start Building
  ↓
Enter Business Information
  ↓
Select Category
  ↓
Define Chatbot Behaviour
  ↓
Create Chatbot
  ↓
Backend Processes Configuration
  ↓
MongoDB Stores Chatbot
  ↓
OpenAI Powers Conversations
  ↓
Unique Chatbot URL
  ↓
Customer Conversation
1. Provide Business Information

The user enters information such as:

Business name
Business description
Business category
Desired chatbot behavior
2. Create the Chatbot

The frontend sends the configuration to the backend, where the chatbot configuration is processed and stored.

3. AI-Powered Conversations

Converse-AI uses the OpenAI API to generate responses based on the chatbot's configured business context and behavior.

4. Share the Chatbot

Each chatbot receives a unique URL that can be shared with customers.

🏗️ Architecture
┌──────────────────────┐
│      Frontend        │
│   Next.js / React    │
└──────────┬───────────┘
           │
           │ REST API
           ▼
┌──────────────────────┐
│       Backend        │
│   Node.js + Express  │
└───────┬───────┬──────┘
        │       │
        ▼       ▼
┌───────────┐ ┌──────────────┐
│ MongoDB   │ │  OpenAI API  │
│   Atlas   │ │              │
└───────────┘ └──────────────┘
🛠️ Tech Stack
Frontend
React
Next.js
Tailwind CSS
JavaScript
REST API
Responsive Design
Backend
Node.js
Express.js
MongoDB
Mongoose
REST APIs
AI
OpenAI API
Custom system prompts
Context-aware chatbot configuration
Development & Deployment
Git
GitHub
Vercel
Render
MongoDB Atlas
📁 Project Structure

The project is separated into frontend and backend applications:

converse-ai/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── public/
│   ├── styles/
│   └── ...
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── middlewares/
│   ├── routes/
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── README.md
⚙️ Getting Started
Prerequisites

Make sure you have installed:

Node.js
npm
MongoDB
Git

You will also need an OpenAI API key.

Clone the Repository
git clone https://github.com/your-username/converse-ai.git

cd converse-ai
Install Frontend Dependencies
cd frontend
npm install
Install Backend Dependencies
cd ../backend
npm install
🔐 Environment Variables

Create a .env file inside the backend directory.

PORT=5000
MONGODB_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key

Use the exact environment variable names required by your implementation.

For the frontend, configure your production/backend API URL according to your existing environment configuration.

Never commit API keys, database credentials, or other secrets to GitHub.

▶️ Running Locally
Start Backend
cd backend
npm run dev

The backend will run on your configured local port.

Start Frontend

In another terminal:

cd frontend
npm run dev

Then open:

http://localhost:3000
🔌 API Architecture

The frontend communicates with the backend through REST APIs.

The backend is responsible for:

Receiving chatbot configuration
Validating requests
Managing chatbot data
Communicating with MongoDB
Communicating with OpenAI
Returning chatbot responses
Handling errors and API responses

The frontend is responsible for:

Collecting business information
Sending requests
Displaying chatbot interfaces
Handling conversations
Presenting chatbot responses to users
🤖 AI Workflow

Converse-AI does not require users to manually configure an AI model.

The platform takes the information provided during chatbot creation and uses it to construct the chatbot's behavioral/context configuration.

Conceptually:

Business Information
        +
Category
        +
Description
        +
Behaviour
        ↓
Chatbot Configuration
        ↓
System Prompt / Context
        ↓
OpenAI API
        ↓
AI Response

This allows the chatbot to respond according to the specific business context rather than behaving like a completely generic chatbot.

🌐 Deployment

The application can be deployed using:

Frontend → Vercel
Backend  → Render
Database → MongoDB Atlas
AI       → OpenAI API
Production Flow
Browser
   ↓
Vercel
   ↓
Render API
   ├──→ MongoDB Atlas
   │
   └──→ OpenAI API
🔒 Security Considerations

Converse-AI follows standard application security practices including:

Environment-based secret management
Backend-side API key handling
Request validation
API error handling
CORS configuration
Database access controls
Separation of frontend and backend responsibilities

API keys and database credentials should never be exposed in client-side code.

📱 Responsive Design

Converse-AI is designed for multiple screen sizes:

Desktop
Laptop
Tablet
Mobile

The interface adapts its layout, typography, navigation, cards, and chatbot experience according to the available screen size.

🔮 Future Scope

Potential future improvements include:

Advanced chatbot customization
Knowledge-base/document ingestion
Website crawling
Embeddings and RAG
Conversation analytics
Multiple AI model support
Chatbot embedding for external websites
Custom chatbot branding
Lead collection
Human handoff
Authentication and chatbot management dashboard
Usage and token analytics
📄 License

This project is currently maintained as a project/product by its development team. Licensing terms can be added here when the project is released publicly under a specific license.

👨‍💻 Development

Converse-AI is built with a focus on:

Simplicity → Customization → AI → Usability

The goal is to make chatbot creation accessible without requiring users to understand prompts, APIs, model configuration, or complex AI infrastructure.
