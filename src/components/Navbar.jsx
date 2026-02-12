import { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  User,
  LogOut,
  Search,
  ChevronDown,
  ShoppingBag,
  Menu,
  X,
  Settings,
  ChevronRight,
  Languages,
} from "lucide-react";
import axios from "axios";
// Import the logo image
import logo from "../assets/images/hindavi_nursery.png";
import { CartCountContext } from "../context/cartCount";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] =
    useState(false);
  const [isPlantsDropdownOpen, setIsPlantsDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [mobilePlantsOpen, setMobilePlantsOpen] = useState(false);
  const [mobileIndoorOpen, setMobileIndoorOpen] = useState(false);
  const [mobileOutdoorOpen, setMobileOutdoorOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [plantsCategoryId, setPlantsCategoryId] = useState("");
  const [isTranslateOpen, setIsTranslateOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const googleTranslateInitialized = useRef(false);
  const { setCartCount, cartCount } = useContext(CartCountContext);

  // Refs for dropdown menus
  const userMenuRef = useRef(null);
  const categoryMenuRef = useRef(null);
  const plantsMenuRef = useRef(null);
  const categoryDropdownRef = useRef(null);
  const plantsDropdownRef = useRef(null);

  // Add Marathi to your language options
  const languages = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
    { code: "mr", name: "Marathi", nativeName: "मराठी" },
  ];

  // UI translations for the language selector button
  const translations = {
    en: { translate: "Translate" },
    hi: { translate: "अनुवाद करें" },
    mr: { translate: "भाषांतर" },
  };
  const getText = (key) =>
    translations[currentLanguage]?.[key] || translations.en[key];

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close user dropdown if clicked outside
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle dropdown menus with timeout for better UX
  useEffect(() => {
    let categoryTimeoutId;
    let plantsTimeoutId;

    // Category dropdown handlers
    const handleCategoryMouseLeave = () => {
      categoryTimeoutId = setTimeout(() => {
        setIsCategoriesDropdownOpen(false);
      }, 300);
    };

    const handleCategoryMouseEnter = () => {
      if (categoryTimeoutId) {
        clearTimeout(categoryTimeoutId);
      }
      setIsCategoriesDropdownOpen(true);
      // Close other dropdowns
      setIsPlantsDropdownOpen(false);
    };

    // Plants dropdown handlers
    const handlePlantsMouseLeave = () => {
      plantsTimeoutId = setTimeout(() => {
        setIsPlantsDropdownOpen(false);
      }, 300);
    };

    const handlePlantsMouseEnter = () => {
      if (plantsTimeoutId) {
        clearTimeout(plantsTimeoutId);
      }
      setIsPlantsDropdownOpen(true);
      // Close other dropdowns
      setIsCategoriesDropdownOpen(false);
    };

    const categoryMenu = categoryMenuRef.current;
    const categoryDropdown = categoryDropdownRef.current;
    const plantsMenu = plantsMenuRef.current;
    const plantsDropdown = plantsDropdownRef.current;

    if (categoryMenu) {
      categoryMenu.addEventListener("mouseenter", handleCategoryMouseEnter);
      categoryMenu.addEventListener("mouseleave", handleCategoryMouseLeave);
    }

    if (categoryDropdown) {
      categoryDropdown.addEventListener("mouseenter", () => {
        if (categoryTimeoutId) clearTimeout(categoryTimeoutId);
      });
      categoryDropdown.addEventListener("mouseleave", handleCategoryMouseLeave);
    }

    if (plantsMenu) {
      plantsMenu.addEventListener("mouseenter", handlePlantsMouseEnter);
      plantsMenu.addEventListener("mouseleave", handlePlantsMouseLeave);
    }

    if (plantsDropdown) {
      plantsDropdown.addEventListener("mouseenter", () => {
        if (plantsTimeoutId) clearTimeout(plantsTimeoutId);
      });
      plantsDropdown.addEventListener("mouseleave", handlePlantsMouseLeave);
    }

    return () => {
      if (categoryTimeoutId) clearTimeout(categoryTimeoutId);
      if (plantsTimeoutId) clearTimeout(plantsTimeoutId);

      if (categoryMenu) {
        categoryMenu.removeEventListener(
          "mouseenter",
          handleCategoryMouseEnter,
        );
        categoryMenu.removeEventListener(
          "mouseleave",
          handleCategoryMouseLeave,
        );
      }

      if (categoryDropdown) {
        categoryDropdown.removeEventListener("mouseenter", () => {
          if (categoryTimeoutId) clearTimeout(categoryTimeoutId);
        });
        categoryDropdown.removeEventListener(
          "mouseleave",
          handleCategoryMouseLeave,
        );
      }

      if (plantsMenu) {
        plantsMenu.removeEventListener("mouseenter", handlePlantsMouseEnter);
        plantsMenu.removeEventListener("mouseleave", handlePlantsMouseLeave);
      }

      if (plantsDropdown) {
        plantsDropdown.removeEventListener("mouseenter", () => {
          if (plantsTimeoutId) clearTimeout(plantsTimeoutId);
        });
        plantsDropdown.removeEventListener(
          "mouseleave",
          handlePlantsMouseLeave,
        );
      }
    };
  }, [isCategoriesDropdownOpen, isPlantsDropdownOpen]);

  // Fetch categories, cart data and user profile on component mount and when login status changes
  useEffect(() => {
    fetchCategories();

    if (isLoggedIn) {
      fetchCartData();
      fetchUserData();
    } else {
      setCartItemsCount(0);
      setCartCount(0);
      setUserData(null);
    }
  }, [isLoggedIn]);

  // Fetch categories - Updated to use hardcoded backend URL
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/categories`,
      );
      setCategories(response.data || []);

      // Find the Plants category ID to use with the Plants dropdown
      const plantsCategory = response.data.find(
        (cat) =>
          cat.name.toLowerCase() === "plants" ||
          cat.name.toLowerCase() === "plant",
      );

      if (plantsCategory) {
        setPlantsCategoryId(plantsCategory._id);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]); // Set empty array on error to prevent undefined
    }
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  // Fetch cart data
  const fetchCartData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/cart`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      // Calculate total items in cart
      const itemsCount =
        response?.data?.cart?.items?.reduce(
          (total, item) => total + item.quantity,
          0,
        ) || 0;

      setCartItemsCount(itemsCount);
      setCartCount(itemsCount);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCartItemsCount(0); // Set to 0 on error
      setCartCount(0);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user profile data
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/auth/profile`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle token expiration or invalid token
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        handleLogout();
      }
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setUserData(null);
    setMobileMenuOpen(false);
    navigate("/login");
  };

  // Close mobile menu
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem("preferredLanguage") || "en";
    setCurrentLanguage(savedLanguage);

    // Load Google Translate script
    const loadGoogleTranslate = () => {
      if (!googleTranslateInitialized.current) {
        const translateElement = document.getElementById(
          "google_translate_element_hidden",
        );
        if (!translateElement) {
          const div = document.createElement("div");
          div.id = "google_translate_element_hidden";
          div.style.display = "none";
          document.body.appendChild(div);
        }
        window.googleTranslateElementInit = function () {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: "en,hi,mr",
              autoDisplay: false,
              layout:
                window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            },
            "google_translate_element_hidden",
          );
          googleTranslateInitialized.current = true;
          setTimeout(() => {
            if (savedLanguage && savedLanguage !== "en") {
              applyTranslation(savedLanguage);
            }
          }, 1000);
        };
        const script = document.createElement("script");
        script.src =
          "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.head.appendChild(script);
      }
    };
    loadGoogleTranslate();
  }, []);

  const toggleTranslate = () => setIsTranslateOpen(!isTranslateOpen);

  const applyTranslation = (languageCode) => {
    try {
      const selectElement = document.querySelector(".goog-te-combo");
      if (selectElement) {
        selectElement.value = languageCode;
        const event = new Event("change", { bubbles: true });
        selectElement.dispatchEvent(event);
      } else {
        document.cookie = `googtrans=/en/${languageCode}; path=/; domain=${window.location.hostname}`;
        if (window.location.hostname === "localhost") {
          document.cookie = `googtrans=/en/${languageCode}; path=/`;
        }
      }
    } catch (error) {
      console.error("Translation error:", error);
    }
  };

  const changeLanguage = (languageCode) => {
    localStorage.setItem("preferredLanguage", languageCode);
    setCurrentLanguage(languageCode);
    setIsTranslateOpen(false);
    applyTranslation(languageCode);
    setTimeout(() => {
      window.location.reload();
    }, 500); // Give Google Translate a moment to apply before reload
  };

  return (
    <header className="bg-white text-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Updated Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="Hindavi Nursery Logo"
                className="h-12 w-auto ml-2 object-contain"
              />
            </Link>
          </div>

          {/* Navigation Links - Desktop Only */}
          <nav className="hidden md:flex items-center space-x-4">
            {/* Plants Dropdown with Indoor/Outdoor subcategories */}

            <Link to="/" className="ml-4">
              Home
            </Link>
            <div className="relative" ref={plantsMenuRef}>
              <Link
                to={
                  plantsCategoryId
                    ? `/products?category=${plantsCategoryId}`
                    : "/products"
                }
                className="flex items-center hover:text-green-600 transition-colors py-2"
              >
                Plants <ChevronDown className="h-4 w-4 ml-1" />
              </Link>

              {isPlantsDropdownOpen && (
                <div
                  ref={plantsDropdownRef}
                  className="absolute left-0 mt-0 w-64 bg-white shadow-lg rounded-md py-2 z-20 border border-gray-100"
                >
                  <div className="px-4 pt-1 pb-2 mb-1 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-800">
                      Plant Categories
                    </span>
                  </div>

                  {/* Indoor Plants Section */}
                  <div className="py-1">
                    <Link
                      to={`/indoor-plants`}
                      className="block px-4 py-2 font-medium hover:bg-green-50 transition-colors"
                    >
                      Indoor Plants
                    </Link>
                    <div className="pl-4">
                      <Link
                        to="/products?type=tulsi"
                        className="block px-4 py-1 text-sm hover:bg-green-50 transition-colors text-gray-700"
                      >
                        Tulsi Plants
                      </Link>
                      <Link
                        to="/products?type=money"
                        className="block px-4 py-1 text-sm hover:bg-green-50 transition-colors text-gray-700"
                      >
                        Money Plants
                      </Link>
                      <Link
                        to="/products?type=succulent"
                        className="block px-4 py-1 text-sm hover:bg-green-50 transition-colors text-gray-700"
                      >
                        Succulents & Cactus
                      </Link>
                      <Link
                        to="/indoor-plants"
                        className="block px-4 py-1 text-sm hover:bg-green-50 transition-colors text-gray-700 font-medium"
                      >
                        View All Indoor
                      </Link>
                    </div>
                  </div>

                  {/* Outdoor Plants Section */}
                  <div className="py-1">
                    <Link
                      to="/outdoor-plants"
                      className="block px-4 py-2 font-medium hover:bg-green-50 transition-colors"
                    >
                      Outdoor Plants
                    </Link>
                    <div className="pl-4">
                      <Link
                        to="/products?type=fruit"
                        className="block px-4 py-1 text-sm hover:bg-green-50 transition-colors text-gray-700"
                      >
                        Fruit Trees
                      </Link>
                      <Link
                        to="/products?type=palm"
                        className="block px-4 py-1 text-sm hover:bg-green-50 transition-colors text-gray-700"
                      >
                        Palm Trees
                      </Link>
                      <Link
                        to="/products?type=flowering"
                        className="block px-4 py-1 text-sm hover:bg-green-50 transition-colors text-gray-700"
                      >
                        Flowering Plants
                      </Link>
                      <Link
                        to="/outdoor-plants"
                        className="block px-4 py-1 text-sm hover:bg-green-50 transition-colors text-gray-700 font-medium"
                      >
                        View All Outdoor
                      </Link>
                    </div>
                  </div>

                  <div className="px-4 pt-2 mt-1 border-t border-gray-100">
                    <Link
                      to={
                        plantsCategoryId
                          ? `/products?category=${plantsCategoryId}`
                          : "/products"
                      }
                      className="block py-2 text-green-600 hover:text-green-700 font-medium text-sm"
                    >
                      Browse All Plants →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Dynamic Categories Dropdown with improved hover behavior */}
            <div className="relative" ref={categoryMenuRef}>
              <Link
                to="/products"
                className="flex items-center hover:text-green-600 transition-colors py-2"
              >
                Categories <ChevronDown className="h-4 w-4 ml-1" />
              </Link>

              {isCategoriesDropdownOpen && (
                <div
                  ref={categoryDropdownRef}
                  className="absolute left-0 mt-0 w-56 bg-white shadow-lg rounded-md py-2 z-20 border border-gray-100"
                >
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <Link
                        key={category.id}
                        to={`/products?category=${category.id}`}
                        className="block px-4 py-2 hover:bg-green-50 transition-colors"
                      >
                        {category.name}
                      </Link>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500 italic text-sm">
                      Loading categories...
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Pots Link */}
            <Link
              to="/products?type=pot"
              className="hover:text-green-600 transition-colors py-2"
            >
              Pots
            </Link>

            {/* Landscape Link */}
            <Link
              to="/landscape"
              className="hover:text-green-600 transition-colors py-2"
            >
              Landscaping
            </Link>

            {/* Tools Link */}
            <Link
              to="/products?type=tool"
              className="hover:text-green-600 transition-colors py-2"
            >
              Tools
            </Link>

            {/* About Us Link */}
            <Link
              to="/about"
              className="hover:text-green-600 transition-colors py-2"
            >
              About Us
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center">
            {/* Desktop Navigation Icons */}
            <div className="hidden md:flex items-center space-x-6">
              {/*<Link to="/search" className="hover:text-green-600">
                <Search className="h-5 w-5" />
              </Link> */}

              <Link
                to="/cart"
                className="hover:text-green-600 flex items-center relative"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={toggleTranslate}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-full hover:bg-green-50 transition-colors duration-300 text-sm font-medium"
                  title={getText("translate")}
                >
                  <Languages className="w-5 h-5" />
                  <span>
                    {currentLanguage === "en"
                      ? "EN"
                      : currentLanguage === "hi"
                        ? "हिं"
                        : "मरा"}
                  </span>
                </button>
                {isTranslateOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-xl border min-w-[160px] z-50 overflow-y-auto">
                    <div className="p-3">
                      <div className="font-medium mb-2 flex items-center">
                        <Languages className="w-4 h-4 mr-2" />
                        {getText("translate")}
                      </div>
                      <div className="space-y-1">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between ${
                              currentLanguage === lang.code
                                ? "bg-green-100 text-green-700 font-medium"
                                : "hover:bg-green-50"
                            }`}
                          >
                            <div>
                              <div className="font-medium">{lang.name}</div>
                              <div className="text-xs opacity-75">
                                {lang.nativeName}
                              </div>
                            </div>
                            {currentLanguage === lang.code && (
                              <div className="w-2 h-2 bg-green-700 rounded-full"></div>
                            )}
                          </button>
                        ))}
                      </div>
                      <div className="mt-2 pt-2 border-t text-xs text-gray-400 text-center">
                        Google Translate
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {isLoggedIn ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="hover:text-green-600 flex items-center"
                  >
                    {userData?.name ? (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                        {userData.name.charAt(0).toUpperCase()}
                      </div>
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md py-2 z-50 border border-gray-100">
                      {userData && (
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="font-medium text-gray-800">
                            {userData.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {userData.email}
                          </p>
                          {userData.role === "admin" && (
                            <span className="inline-block mt-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                              Admin
                            </span>
                          )}
                        </div>
                      )}
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-green-50"
                      >
                        <User className="h-4 w-4" />
                        <span>My Profile</span>
                      </Link>
                      <Link
                        to="/orders"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-green-50"
                      >
                        <ShoppingBag className="h-4 w-4" />
                        <span>My Orders</span>
                      </Link>
                      {userData?.role !== "user" && (
                        <Link
                          to="/admin"
                          className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 text-blue-600"
                        >
                          <Settings className="h-4 w-4" />
                          <span>Admin Dashboard</span>
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-green-50 text-red-600"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="hover:text-green-600 font-medium">
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Navigation Icons */}
            <div className="flex md:hidden items-center space-x-4">
              {/* <Link to="/search" className="hover:text-green-600 p-1">
                <Search className="h-5 w-5" />
              </Link> */}

              <Link
                to="/cart"
                className="hover:text-green-600 flex items-center relative p-1"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Language Selector for mobile */}
              <div className="relative">
                <button
                  onClick={toggleTranslate}
                  className="p-1 hover:bg-gray-100 rounded-md"
                  title={getText("translate")}
                >
                  <Languages className="h-5 w-5" />
                </button>
                {isTranslateOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-xl border min-w-[160px] z-50 overflow-y-auto">
                    <div className="p-3">
                      <div className="font-medium mb-2 flex items-center">
                        <Languages className="w-4 h-4 mr-2" />
                        {getText("translate")}
                      </div>
                      <div className="space-y-1">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between ${
                              currentLanguage === lang.code
                                ? "bg-green-100 text-green-700 font-medium"
                                : "hover:bg-green-50"
                            }`}
                          >
                            <div>
                              <div className="font-medium">{lang.name}</div>
                              <div className="text-xs opacity-75">
                                {lang.nativeName}
                              </div>
                            </div>
                            {currentLanguage === lang.code && (
                              <div className="w-2 h-2 bg-green-700 rounded-full"></div>
                            )}
                          </button>
                        ))}
                      </div>
                      <div className="mt-2 pt-2 border-t text-xs text-gray-400 text-center">
                        Google Translate
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1 hover:bg-gray-100 rounded-md"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden">
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl overflow-auto">
            <div className="p-4">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium">Menu</h2>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-md hover:bg-gray-100"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* User Info (if logged in) */}
              {isLoggedIn && userData && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold">
                      {userData.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{userData.name}</p>
                      <p className="text-xs text-gray-600">{userData.email}</p>
                      {userData.role === "admin" && (
                        <span className="inline-block mt-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                          Admin
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Links */}
              <nav className="space-y-1">
                <Link
                  to="/"
                  className="block px-3 py-2 rounded-md hover:bg-green-50 hover:text-green-600"
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>

                {/* Plants dropdown with indoor/outdoor categories */}
                <div>
                  <button
                    onClick={() => setMobilePlantsOpen(!mobilePlantsOpen)}
                    className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-green-50 hover:text-green-600"
                  >
                    <span>Plants</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${mobilePlantsOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {mobilePlantsOpen && (
                    <div className="pl-3 space-y-1 mt-1">
                      {/* Indoor Plants Collapsible */}
                      <div>
                        <button
                          onClick={() => setMobileIndoorOpen(!mobileIndoorOpen)}
                          className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-green-50 text-sm"
                        >
                          <span>Indoor Plants</span>
                          <ChevronRight
                            className={`h-4 w-4 transition-transform ${mobileIndoorOpen ? "rotate-90" : ""}`}
                          />
                        </button>

                        {mobileIndoorOpen && (
                          <div className="pl-3 space-y-1">
                            <Link
                              to="/products?type=tulsi"
                              className="block px-3 py-1.5 rounded-md hover:bg-green-50 text-xs"
                              onClick={closeMobileMenu}
                            >
                              Tulsi Plants
                            </Link>
                            <Link
                              to="/products?type=money"
                              className="block px-3 py-1.5 rounded-md hover:bg-green-50 text-xs"
                              onClick={closeMobileMenu}
                            >
                              Money Plants
                            </Link>
                            <Link
                              to="/products?type=succulent"
                              className="block px-3 py-1.5 rounded-md hover:bg-green-50 text-xs"
                              onClick={closeMobileMenu}
                            >
                              Succulents & Cactus
                            </Link>
                            <Link
                              to="/products?type=indoor"
                              className="block px-3 py-1.5 rounded-md hover:bg-green-50 text-xs font-medium"
                              onClick={closeMobileMenu}
                            >
                              View All Indoor
                            </Link>
                          </div>
                        )}
                      </div>

                      {/* Outdoor Plants Collapsible */}
                      <div>
                        <button
                          onClick={() =>
                            setMobileOutdoorOpen(!mobileOutdoorOpen)
                          }
                          className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-green-50 text-sm"
                        >
                          <span>Outdoor Plants</span>
                          <ChevronRight
                            className={`h-4 w-4 transition-transform ${mobileOutdoorOpen ? "rotate-90" : ""}`}
                          />
                        </button>

                        {mobileOutdoorOpen && (
                          <div className="pl-3 space-y-1">
                            <Link
                              to="/products?type=fruit"
                              className="block px-3 py-1.5 rounded-md hover:bg-green-50 text-xs"
                              onClick={closeMobileMenu}
                            >
                              Fruit Trees (Mango, etc.)
                            </Link>
                            <Link
                              to="/products?type=palm"
                              className="block px-3 py-1.5 rounded-md hover:bg-green-50 text-xs"
                              onClick={closeMobileMenu}
                            >
                              Palm Trees
                            </Link>
                            <Link
                              to="/products?type=coconut"
                              className="block px-3 py-1.5 rounded-md hover:bg-green-50 text-xs"
                              onClick={closeMobileMenu}
                            >
                              Coconut Trees
                            </Link>
                            <Link
                              to="/products?type=outdoor"
                              className="block px-3 py-1.5 rounded-md hover:bg-green-50 text-xs font-medium"
                              onClick={closeMobileMenu}
                            >
                              View All Outdoor
                            </Link>
                          </div>
                        )}
                      </div>

                      <Link
                        to={
                          plantsCategoryId
                            ? `/products?category=${plantsCategoryId}`
                            : "/products"
                        }
                        className="block px-3 py-2 rounded-md hover:bg-green-50 text-sm text-green-600"
                        onClick={closeMobileMenu}
                      >
                        Browse All Plants
                      </Link>
                    </div>
                  )}
                </div>

                {/* Dynamic Categories Dropdown for Mobile */}
                <div>
                  <button
                    onClick={() =>
                      setMobileCategoriesOpen(!mobileCategoriesOpen)
                    }
                    className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-green-50 hover:text-green-600"
                  >
                    <span>Categories</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${mobileCategoriesOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {mobileCategoriesOpen && (
                    <div className="pl-4 space-y-1 mt-1">
                      {categories.length > 0 ? (
                        categories.map((category) => (
                          <Link
                            key={category._id}
                            to={`/products?category=${category._id}`}
                            className="block px-3 py-2 rounded-md hover:bg-green-50 text-sm"
                            onClick={closeMobileMenu}
                          >
                            {category.name}
                          </Link>
                        ))
                      ) : (
                        <div className="px-3 py-2 text-gray-500 italic text-sm">
                          Loading categories...
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Pots link for mobile */}
                <Link
                  to="/products?type=pot"
                  className="block px-3 py-2 rounded-md hover:bg-green-50 hover:text-green-600"
                  onClick={closeMobileMenu}
                >
                  Pots
                </Link>

                {/* Landscape Link */}
                <Link
                  to="/landscape"
                  className="block px-3 py-2 rounded-md hover:bg-green-50 hover:text-green-600"
                  onClick={closeMobileMenu}
                >
                  Landscaping
                </Link>

                {/* Tools link for mobile */}
                <Link
                  to="/products?type=tool"
                  className="block px-3 py-2 rounded-md hover:bg-green-50 hover:text-green-600"
                  onClick={closeMobileMenu}
                >
                  Tools
                </Link>

                <Link
                  to="/about"
                  className="block px-3 py-2 rounded-md hover:bg-green-50 hover:text-green-600"
                  onClick={closeMobileMenu}
                >
                  About Us
                </Link>

                <hr className="my-4 border-gray-100" />

                {/* User Account Links */}
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-green-50"
                      onClick={closeMobileMenu}
                    >
                      <User className="h-4 w-4" />
                      <span>My Profile</span>
                    </Link>
                    <Link
                      to="/orders"
                      className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-green-50"
                      onClick={closeMobileMenu}
                    >
                      <ShoppingBag className="h-4 w-4" />
                      <span>My Orders</span>
                    </Link>
                    {userData?.role !== "user" && (
                      <Link
                        to="/admin"
                        className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-blue-50 text-blue-600"
                        onClick={closeMobileMenu}
                      >
                        <Settings className="h-4 w-4" />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full text-left px-3 py-2 rounded-md text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-center bg-green-600 text-white rounded-md font-medium"
                    onClick={closeMobileMenu}
                  >
                    Login / Register
                  </Link>
                )}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Hidden Google Translate Element */}
      <div
        id="google_translate_element_hidden"
        style={{ display: "none" }}
      ></div>

      {/* Click outside to close translate dropdown */}
      {isTranslateOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsTranslateOpen(false)}
        ></div>
      )}

      {/* Hide Google Translate Banner and artifacts */}
      <style>{`
        .goog-te-banner-frame { display: none !important; }
        .goog-te-gadget-icon { display: none; }
        .goog-te-gadget-simple { border: none; background: none; }
        .goog-te-gadget { font-size: 0; }
        .goog-logo-link { display: none !important; }
        .goog-te-menu-value span { display: none !important; }
        .goog-te-menu-frame { box-shadow: none !important; }
        .VIpgJd-ZVi9od-l4eHX-hSRGPd { display: none !important; }
        .VIpgJd-ZVi9od-ORHb-OEVmcd { display: none !important; }
        body { top: 0 !important; }
        .skiptranslate { display: none !important; }
      `}</style>
    </header>
  );
}

export default Navbar;
