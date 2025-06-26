import User from "../models/User.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
const saltRounds = 10;

// signup
const signup = async (req, res) => {
  const { username, email, password } = req.body;

  // Input validation
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Username, email and password are required" });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // Password strength (optional but recommended)
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  try {
    // Single query to check both username and email
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      // More specific error messages
      if (existingUser.username === username) {
        return res.status(409).json({ message: "Username already exists" });
      }
      if (existingUser.email === email) {
        return res.status(409).json({ message: "Email already exists" });
      }
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      username: username.trim().toLowerCase(), // Normalize username
      email: email.trim().toLowerCase(), // Normalize email
      passwordHash: hashedPassword,
    });

    await newUser.save();

    const token = generateToken(newUser.id); // Store the token

    // Return user info with token
    res.status(201).json({
      message: "Signup successful",
      token, // Send token to frontend
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        joinedAt: newUser.joinedAt,
      },
    });
  } catch (error) {
    console.log("Signup error:", error);

    // Handle mongoose validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Invalid user data" });
    }

    // Handle duplicate key errors (in case unique constraint fails)
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ message: "Username or email already exists" });
    }

    res.status(500).json({ message: "Signup failed" });
  }
};

// login
const login = async (req, res) => {
  const { userData, password } = req.body;

  if (!userData || !password) {
    return res
      .status(400)
      .json({ message: "Username/email and password are required" });
  }

  try {
    // Find user by either username or email (normalize input)
    const user = await User.findOne({
      $or: [
        { username: userData.trim().toLowerCase() },
        { email: userData.trim().toLowerCase() },
      ],
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user.id); // Store the token

    // Return user info with token
    res.status(200).json({
      message: "Login successful",
      token, // Send token to frontend
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
        joinedAt: user.joinedAt,
      },
    });
  } catch (error) {
    console.log("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
};

export { signup, login };
