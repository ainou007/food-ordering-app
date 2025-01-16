// Routes principales
export const home = "/" as const;
export const menu = "/menu" as const;
export const aboutUs = "/about-us" as const;
export const contactUs = "/contact-us" as const;

// Routes du panier et commandes
export const cart = "/cart" as const;
export const orders = "/orders" as const;
export const orderDetails = (id: string) => `/orders/${id}` as const;

// Routes d'authentification
export const login = "/login" as const;
export const register = "/register" as const;
export const forgotPassword = "/forgot-password" as const;
export const resetPassword = "/reset-password/:token" as const;
export const verifyEmail = "/verify-email/:token" as const;

// Routes API
export const API = {
  MENU: "/api/menu",
  ORDERS: "/api/orders",
  AUTH: "/api/auth",
} as const;
