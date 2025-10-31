Fastor Restaurant App
A React.js application for discovering nearby restaurants with image superimposing and PWA capabilities.

🚀 Features
Mobile Authentication: Login with mobile number and OTP verification

Restaurant Discovery: Browse nearby restaurants with detailed information

Image Superimposing: Overlay Fastor logo on restaurant images

Drag & Drop: Reposition logo anywhere on the image (Bonus Feature)

PWA Ready: Share functionality and installable app experience

Responsive Design: Modern, clean UI that works on all devices




📁 Project Structure
text
fastor-restaurant-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── Auth/
│   │       └── AuthProvider.jsx
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── HomePage.jsx
│   │   └── RestaurantDetailPage.jsx
│   ├── services/
│   │   ├── auth.js
│   │   └── api.js
│   ├── styles/
│   │   └── globals.css
│   ├── App.jsx
│   ├── main.jsx
│   └── App.css
├── package.json
├── vite.config.js
└── README.md
🔧 Configuration
Authentication
OTP for testing: 123456

Mobile number: Any 10-digit number

API
Mock data with 5 sample restaurants

Simulated API delays for realistic experience

🎯 How to Use
1. Login
Enter any 10-digit mobile number

Use OTP: 123456 for verification

Successful login redirects to restaurant list

2. Browse Restaurants
View nearby restaurants with ratings, cuisine, and delivery info

Click on any restaurant card to view details

3. Image Customization
On restaurant detail page, see the restaurant image with Fastor logo

Drag the Fastor logo to reposition it anywhere on the image

Use Share button to share the customized image

4. Share Functionality
Uses Web Share API for native sharing

Fallback for unsupported browsers

🚀 Available Scripts
bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
🎨 Features Implemented
✅ Core Requirements
Mobile number login screen

OTP verification screen (123456)

Restaurant listing with mock API

Restaurant detail page

Image superimposing with Fastor logo

Share functionality

Clean, modern design

✅ Bonus Features
Drag and drop logo repositioning

PWA capabilities

Responsive design

Loading states and error handling

🔒 Authentication Flow
Mobile Input: User enters 10-digit mobile number

OTP Verification: System sends OTP (use 123456)

Session Management: Login state persists across page refreshes

Protected Routes: Automatic redirect to login if not authenticated

📱 PWA Features
Installable as a native app

Offline functionality

Web Share API integration

Responsive design for mobile devices

🛡️ Error Handling
Invalid OTP detection

Network error handling

Loading states for better UX

Form validation

🎯 Technical Stack
Frontend: React.js 18, React Router DOM

Build Tool: Vite

Styling: CSS3 with modern features

Icons: Lucide React

HTTP Client: Axios

State Management: React Context API

🔄 API Endpoints (Mock)
GET /restaurants - Fetch nearby restaurants

GET /restaurants/:id - Get specific restaurant details

🐛 Troubleshooting
Common Issues
Port already in use


bash
rm -rf node_modules package-lock.json
npm install
Build errors

Ensure all JSX files have .jsx extension

Check for syntax errors in console

File Naming Convention
React components with JSX: .jsx

Pure JavaScript utilities: .js



🚀 Deployment
To build for production:

bash
npm run build
The dist folder will contain optimized production files ready for deployment.




