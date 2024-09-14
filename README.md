1. Clone the repository:
git clone https://github.com/yourusername/event-management-system.git

3. Navigate to the project directory:
cd event-management-system


3. Install the dependencies for both the client and server:
Frontend:


cd client
npm install
Backend:

cd ../server
npm install


4. Create a .env file in the server directory with the following content:

MONGO_URI=<your-mongodb-uri>
EMAIL=<your-email>
EMAIL_PASSWORD=<your-email-password>

5. Start the application:
Backend (server):

npm start
Frontend (client):

cd ../client
npm run dev
6. Open your browser and access the application at:
Frontend: http://localhost:5173
Backend API: http://localhost:5000
