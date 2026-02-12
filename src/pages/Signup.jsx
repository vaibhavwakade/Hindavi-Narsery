import { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
// Import the Hindavi Nursery logo
import logo from "../assets/images/hindavi_nursery.png";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear errors when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, and a number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!acceptTerms) {
      newErrors.terms = "Please accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!validateForm()) return;

  //   setIsLoading(true);

  //   try {
  //     // Updated API endpoint to match your local backend
  //     const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         name: formData.name,
  //         email: formData.email,
  //         password: formData.password
  //       }),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       alert('Account created successfully! Welcome to Hindavi Nursery. Please login to continue.');
  //       window.location.href = '/login';
  //     } else {
  //       setErrors({ general: data.message || 'Signup failed' });
  //     }
  //   } catch (error) {
  //     console.error('Signup error:', error);
  //     setErrors({ general: 'Server error. Please try again later.' });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpSent) {
      // Phase 1: Validate form and send OTP (or complete signup if email verification is disabled)
      if (!validateForm()) return;
      setIsLoading(true);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/auth/signup`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              password: formData.password,
            }),
          },
        );

        const data = await response.json();

        if (response.ok) {
          // Check if user was created directly (no email verification needed)
          if (data.token && data.user) {
            alert("Account created successfully! Welcome to Hindavi Nursery.");
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            window.location.href = "/";
          } else {
            // OTP was sent
            alert("OTP sent to your email");
            setOtpSent(true); // ➤ Show OTP input field
          }
        } else {
          setErrors({ general: data.message || "Signup failed" });
        }
      } catch (error) {
        console.error("Signup error:", error);
        setErrors({ general: "Server error. Please try again later." });
      } finally {
        setIsLoading(false);
      }
    } else {
      // Phase 2: Submit OTP and finalize registration
      setIsLoading(true);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/auth/signup`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: formData.email,
              name: formData.name,
              password: formData.password,
              otp,
            }),
          },
        );

        const data = await response.json();

        if (response.ok) {
          alert(
            "Account created successfully! Welcome to Hindavi Nursery. Please login to continue.",
          );
          window.location.href = "/login";
        } else {
          setErrors({ general: data.message || "OTP verification failed" });
        }
      } catch (error) {
        console.error("OTP verification error:", error);
        setErrors({ general: "Server error. Please try again later." });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, text: "", color: "" };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    const levels = [
      { text: "Very Weak", color: "bg-red-500" },
      { text: "Weak", color: "bg-orange-500" },
      { text: "Fair", color: "bg-yellow-500" },
      { text: "Good", color: "bg-green-500" },
      { text: "Strong", color: "bg-emerald-600" },
    ];

    return { strength, ...levels[Math.min(strength, 4)] };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand Section - Updated with Hindavi Nursery logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <img
              src={logo}
              alt="Hindavi Nursery Logo"
              className="h-24 w-96 object-contain bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Join Hindavi Nursery
          </h1>
          <p className="text-green-700">Start your plant journey with us</p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-green-100">
          {/* General Error Message */}
          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm">{errors.general}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <User className="w-4 h-4 text-green-600" />
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 pl-11 bg-green-50/50 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 outline-none ${
                    errors.name
                      ? "border-red-300 bg-red-50/30"
                      : "border-green-200"
                  }`}
                  placeholder="Enter your full name"
                />
                <User
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    errors.name ? "text-red-400" : "text-green-400"
                  }`}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Mail className="w-4 h-4 text-green-600" />
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 pl-11 bg-green-50/50 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 outline-none ${
                    errors.email
                      ? "border-red-300 bg-red-50/30"
                      : "border-green-200"
                  }`}
                  placeholder="Enter your email"
                />
                <Mail
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    errors.email ? "text-red-400" : "text-green-400"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Lock className="w-4 h-4 text-green-600" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 pl-11 pr-11 bg-green-50/50 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 outline-none ${
                    errors.password
                      ? "border-red-300 bg-red-50/30"
                      : "border-green-200"
                  }`}
                  placeholder="Create a strong password"
                />
                <Lock
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    errors.password ? "text-red-400" : "text-green-400"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400 hover:text-green-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                        style={{
                          width: `${(passwordStrength.strength / 5) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span
                      className={`text-xs font-medium ${
                        passwordStrength.strength < 3
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {passwordStrength.text}
                    </span>
                  </div>
                </div>
              )}

              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 pl-11 pr-11 bg-green-50/50 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 outline-none ${
                    errors.confirmPassword
                      ? "border-red-300 bg-red-50/30"
                      : "border-green-200"
                  }`}
                  placeholder="Confirm your password"
                />
                <CheckCircle
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    errors.confirmPassword
                      ? "text-red-400"
                      : formData.confirmPassword &&
                          formData.password === formData.confirmPassword
                        ? "text-green-500"
                        : "text-green-400"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400 hover:text-green-600 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {otpSent && (
              <div className="space-y-2 mt-4">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Enter OTP
                </label>
                <input
                  type="text"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 bg-green-50/50 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 outline-none"
                  placeholder="Enter the OTP sent to your email"
                />
              </div>
            )}

            {/* Terms and Conditions */}
            <div className="space-y-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 mt-1"
                />
                <span className="text-sm text-gray-600 leading-relaxed">
                  I agree to Hindavi Nursery's{" "}
                  <Link
                    to="/terms"
                    className="text-green-600 hover:text-green-800 font-medium"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-green-600 hover:text-green-800 font-medium"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.terms && (
                <p className="text-red-500 text-xs mt-1">{errors.terms}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 focus:ring-4 focus:ring-green-200 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group shadow-lg"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Join Hindavi Nursery Community
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Login Link */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Already part of our family?{" "}
            <Link
              to="/login"
              className="text-green-600 hover:text-green-800 font-medium transition-colors"
            >
              Sign in to your garden
            </Link>
          </p>
        </div>

        {/* Contact Information */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Need help? Contact us at{" "}
            <a
              href="tel:+918007345005"
              className="text-green-600 hover:text-green-800"
            >
              +91 8007345005
            </a>{" "}
            or{" "}
            <a
              href="mailto:hindavinursery@gmail.com"
              className="text-green-600 hover:text-green-800"
            >
              hindavinursery@gmail.com
            </a>
          </p>
        </div>

        {/* Copyright */}
        <div className="text-center mt-4">
          <p className="text-xs text-green-600">
            © 2025 Hindavi Nursery. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
