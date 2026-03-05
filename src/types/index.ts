// ============================================================
// Ganesh Kulfi Web — Shared TypeScript types
// Maps 1:1 to the backend DTOs / Kotlin data classes
// ============================================================

// =====================  AUTH  ================================
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  phone?: string;
  role?: UserRole;
}

export interface AuthResponse {
  token: string;
  user: UserDTO;
}

// =====================  USERS  ===============================
export type UserRole = 'CUSTOMER' | 'RETAILER' | 'ADMIN';
export type PricingTier = 'GOLD' | 'SILVER' | 'BASIC';

export interface UserDTO {
  id: string;
  email: string;
  name: string;
  phone?: string | null;
  role: UserRole;
  retailerId?: string | null;
  shopName?: string | null;
  tier?: PricingTier | null;
  isActive?: boolean;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
  phone?: string | null;
  role: UserRole;
  retailerId?: string | null;
  shopName?: string | null;
  tier?: PricingTier | null;
}

export interface UpdateUserRequest {
  name?: string | null;
  phone?: string | null;
  role?: UserRole | null;
  retailerId?: string | null;
  shopName?: string | null;
  tier?: PricingTier | null;
}

export interface UsersListResponse {
  users: UserDTO[];
  total: number;
}

// =====================  PRODUCTS  ============================
export type ProductCategory = 'CLASSIC' | 'PREMIUM' | 'FRUIT' | 'FUSION' | 'SPECIAL';

export interface Product {
  id: string;
  name: string;
  description?: string | null;
  basePrice: number;
  category: ProductCategory;
  imageUrl?: string | null;
  isAvailable: boolean;
  isSeasonal: boolean;
  stockQuantity?: number | null;   // admin only
  reservedQuantity?: number;
  availableQuantity?: number;
  minOrderQuantity: number;
  isActive: boolean;
  status?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsListResponse {
  products: Product[];
  total: number;
  category?: string | null;
}

// =====================  ORDERS  ==============================
export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PACKED'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'REJECTED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'CANCELLED_ADMIN';

export type PaymentStatus = 'PENDING' | 'PAID' | 'REFUNDED';

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  discountPercent: number;
  discountAmount?: number;
  lineTotal: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  retailerId?: string | null;
  retailerEmail?: string | null;
  retailerName?: string | null;
  shopName?: string | null;
  totalItems?: number;
  totalQuantity?: number;
  subtotal?: number;
  discount?: number;
  tax?: number;
  totalAmount: number;
  status: OrderStatus;
  paymentStatus?: PaymentStatus;
  retailerNotes?: string | null;
  factoryNotes?: string | null;
  rejectionReason?: string | null;
  confirmationMessage?: string | null;
  createdAt: string;
  updatedAt?: string | null;
  confirmedAt?: string | null;
  rejectedAt?: string | null;
  completedAt?: string | null;
  cancelledAt?: string | null;
  confirmedBy?: string | null;
  rejectedBy?: string | null;
  cancelledBy?: string | null;
  items?: OrderItem[];
}

export interface CreateOrderRequest {
  items: OrderItemRequest[];
  retailerNotes?: string | null;
}

export interface OrderItemRequest {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  discountPercent?: number;
}

export interface OrdersListResponse {
  orders: Order[];
  total: number;
}

export interface AdminOrderWithItems {
  order: Order;
  items: OrderItem[];
  itemCount: number;
}

export interface AdminDashboardResponse {
  orders: AdminOrderWithItems[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

// =====================  INVENTORY  ===========================
export interface InventoryItem {
  flavorId: string;
  flavorName: string;
  totalStock: number;
  availableStock: number;
  stockGivenToRetailers: number;
  soldToday: number;
  soldThisWeek: number;
  soldThisMonth: number;
  costPrice: number;
  sellingPrice: number;
  reorderLevel: number;
  lastRestockedAt: number;
  updatedAt: number;
}

// =====================  ANALYTICS  ===========================
export interface DashboardStats {
  todaySales: number;
  totalRevenue: number;
  totalStock: number;
  totalValue: number;
  lowStockItems: number;
  activeRetailers: number;
  totalOutstanding: number;
  pendingPayments: number;
  pendingOrders: number;
}

export interface AnalyticsSummary {
  totalOrdersToday: number;
  confirmedOrdersToday: number;
  rejectedOrdersToday: number;
  pendingOrdersToday: number;
  totalRevenueToday: number;
  averageOrderValue: number;
}

export interface TopProduct {
  productId: string;
  productName: string;
  totalQuantitySold: number;
  totalOrders: number;
  totalRevenue: number;
}

export interface TopRetailer {
  retailerId: string;
  retailerName: string;
  retailerEmail: string;
  shopName?: string | null;
  totalOrders: number;
  totalSpent: number;
}

export interface WeeklyOrderStats {
  date: string;
  totalOrders: number;
  confirmedOrders: number;
  rejectedOrders: number;
  totalRevenue: number;
}

export interface DashboardAnalytics {
  totalOrders: number;
  totalRevenue: number;
  dailyOrders: { days: { date: string; count: number }[] };
  dailySales: { days: { date: string; totalSales: number }[] };
  topProducts?: TopProduct[] | null;
  topRetailers?: TopRetailer[] | null;
}

// =====================  PRICING  =============================
export interface PriceOverride {
  id: string;
  retailerId: string;
  productId: string;
  customPrice: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// =====================  GENERIC  ==============================
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}
