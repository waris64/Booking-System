# 🌍 TravelBook - Complete Travel Booking System

A modern, full-stack travel booking application built with **React.js**, **Node.js**, **Express**, **Prisma**, **PostgreSQL**, **Tailwind CSS**, and **Firebase Authentication**.

![TravelBook Demo](https://via.placeholder.com/800x400/0ea5e9/ffffff?text=TravelBook+Travel+Booking+System)

## ✨ Features

### 🔐 **Authentication & Authorization**
- **Google OAuth** integration for seamless login
- **Email/Password** authentication
- **Admin-only access** to management features (admin@gmail.com)
- Protected routes and user sessions

### 🎯 **Trip Management**
- Browse and search available trips
- Advanced filtering by price range and duration
- Detailed trip information with booking capabilities
- Real-time seat availability tracking
- Responsive trip cards with beautiful UI

### 📅 **Smart Booking System**
- Create bookings with customer name and party size
- Automatic price calculation based on number of people
- Real-time seat management (automatic deduction/restoration)
- Booking status tracking (pending → confirmed → cancelled)
- User-friendly booking history

### 👨‍💼 **Comprehensive Admin Panel**
- **Trip Statistics Dashboard** with visual progress bars
- **Seat Analytics** - view booked vs available seats per trip
- **Complete Booking Management** - view all customer bookings
- **Trip CRUD Operations** - create, view, and delete trips
- **Admin-only confirmation** of pending bookings

### 🎨 **Modern UI/UX**
- **Fully responsive design** with mobile hamburger menu
- **Tailwind CSS** for beautiful, consistent styling
- **Smooth animations** and loading states
- **Toast notifications** for user feedback
- **Dark/light theme support** ready

### 📱 **Mobile-First Design**
- Responsive navigation with hamburger menu
- Touch-friendly interface
- Optimized for all screen sizes
- Progressive Web App (PWA) ready

## 🚀 Tech Stack

### **Frontend**
- **React.js 18** - Modern UI framework with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Firebase Auth** - Authentication service
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Beautiful notifications
- **Lucide React** - Modern icon library

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Prisma ORM** - Type-safe database client
- **PostgreSQL** - Robust relational database
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📦 Installation & Setup

### **Prerequisites**
- Node.js (v16 or higher)
- PostgreSQL database
- Firebase project for authentication
- Git for version control

### **1. Clone the Repository**
```bash
git clone https://github.com/yourusername/travelbook.git
cd travelbook
```

### **2. Backend Setup**
```bash
cd backend
npm install

# Create environment file
cp .env.example .env
```

**Configure `backend/.env`:**
```env
DATABASE_URL="postgresql://username:password@localhost:5432/booking_system?schema=public"
PORT=4000
```

**Setup Database:**
```bash
# Create database and run migrations
npx prisma migrate dev --name init
npx prisma generate

# Start backend server
npm start
```

### **3. Frontend Setup**
```bash
cd frontend
npm install
```

**Configure Firebase:**
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication with Google and Email/Password providers
3. Update `frontend/src/config/firebase.js` with your config:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

**Start Frontend:**
```bash
npm start
```

### **4. Access the Application**
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:4000
- **Admin Panel:** Login with admin@gmail.com

## 🌐 API Endpoints

### **Trips**
```
GET    /api/trips           # Get all trips
GET    /api/trips/:id       # Get trip by ID
POST   /api/trips           # Create new trip (admin only)
DELETE /api/trips/:id       # Delete trip (admin only)
```

### **Bookings**
```
GET    /api/trips/bookings     # Get all bookings
GET    /api/trips/bookings/:id # Get booking by ID
POST   /api/trips/bookings     # Create new booking
PUT    /api/trips/bookings/:id # Update booking status (admin only)
DELETE /api/trips/bookings/:id # Cancel booking
```

## 📱 Usage Guide

### **For Regular Users**
1. **Sign Up/Login** - Use Google OAuth or email/password
2. **Browse Trips** - View available trips with search and filters
3. **Book Trips** - Enter your name and select number of people
4. **Manage Bookings** - View your booking history and cancel if needed

### **For Administrators (admin@gmail.com)**
1. **Access Admin Panel** - Navigate to `/admin` (only visible to admin)
2. **View Analytics** - See trip statistics and booking analytics
3. **Manage Trips** - Create new trips or delete existing ones
4. **Confirm Bookings** - Approve pending bookings from customers
5. **Monitor System** - View all bookings across all users

## 🗄️ Database Schema

```prisma
model Trip {
  id             Int       @id @default(autoincrement())
  title          String
  price          Int
  duration       Int       // Duration in days
  location       String
  startDate      DateTime
  endDate        DateTime
  availableSeats Int
  bookings       Booking[]
}

model Booking {
  id             Int      @id @default(autoincrement())
  userId         Int?     // Optional for flexibility
  userName       String?  // Customer name
  tripId         Int
  numberOfPeople Int
  status         String   @default("pending")
  totalPrice     Float
  createdAt      DateTime @default(now())
  Trip           Trip     @relation(fields: [tripId], references: [id])
}
```

## 🔧 Development

### **Project Structure**
```
travelbook/
├── backend/                 # Node.js backend
│   ├── Controllers/         # Route handlers
│   ├── Routes/             # API routes
│   ├── services/           # Business logic
│   ├── lib/               # Database client
│   ├── Prisma/            # Database schema & migrations
│   └── server.js          # Main server file
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts (Auth)
│   │   ├── services/      # API service layer
│   │   └── config/        # Configuration files
│   └── public/            # Static assets
└── README.md
```

### **Key Features Implementation**

**Admin Authorization:**
```javascript
// Only admin can see admin routes
{user?.email === 'admin@gmail.com' && (
  <Link to="/admin">Admin Panel</Link>
)}
```

**Real-time Seat Management:**
```javascript
// Automatic seat deduction on booking
const booking = await prisma.booking.create({...});
await prisma.trip.update({
  where: { id: tripId },
  data: { availableSeats: { decrement: numberOfPeople } }
});
```

**Responsive Design:**
```javascript
// Mobile hamburger menu
<button className="md:hidden" onClick={toggleMenu}>
  {isOpen ? <X /> : <Menu />}
</button>
```

## 🚀 Deployment

### **Backend (Railway/Heroku)**
1. Set environment variables in deployment platform
2. Connect PostgreSQL database
3. Deploy with automatic migrations

### **Frontend (Vercel/Netlify)**
1. Build the project: `npm run build`
2. Deploy the `build` folder
3. Configure environment variables for Firebase

### **Environment Variables**
```bash
# Backend
DATABASE_URL=postgresql://...
PORT=4000

# Frontend
REACT_APP_API_URL=https://your-backend-url.com/api
```

## 🧪 Testing

### **Manual Testing Checklist**
- [ ] User registration and login
- [ ] Trip browsing and filtering
- [ ] Booking creation and management
- [ ] Admin panel access control
- [ ] Responsive design on mobile
- [ ] Real-time seat updates

### **API Testing**
```bash
# Test trip endpoints
curl http://localhost:4000/api/trips

# Test booking creation
curl -X POST http://localhost:4000/api/trips/bookings \
  -H "Content-Type: application/json" \
  -d '{"userName":"John Doe","tripId":1,"numberOfPeople":2}'
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React.js** team for the incredible framework
- **Tailwind CSS** for the utility-first CSS approach
- **Prisma** for the excellent ORM and type safety
- **Firebase** for seamless authentication
- **Lucide** for beautiful icons

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/travelbook/issues) page
2. Create a new issue with detailed description
3. Contact: your-email@example.com

---

**Built with ❤️ for travelers around the world**

*TravelBook - Making travel booking simple, secure, and delightful.*