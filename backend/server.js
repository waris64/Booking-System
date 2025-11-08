import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

console.log('Loading modules...');

// Test if tripRoutes can be imported without crashing
let tripRoutes;
try {
  const tripRoutesModule = await import("./Routes/tripRoutes.js");
  tripRoutes = tripRoutesModule.default;
  console.log('Trip routes loaded successfully');
} catch (error) {
  console.error('Error loading trip routes:', error);
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

app.use("/api/trips", tripRoutes);

// Error handling
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Server listening on port:${PORT}`);
  console.log('Server is running and ready to accept requests');
});

server.on('error', (error) => {
  console.error('Server error:', error);
});

export default app;
