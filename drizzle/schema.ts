import { pgTable, primaryKey, real, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

// User Table
export const UserTable = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  image: varchar("image", { length: 255 }),
  phone: varchar("phone", { length: 255 }),
  streetAddress: varchar("streetAddress", { length: 255 }),
  codePostal: varchar("codePostal", { length: 255 }),
  city: varchar("city", { length: 255 }),
  country: varchar("country", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

// Product Table
export const ProductTable = pgTable("product", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  price: real("price").notNull(),
  image: varchar("image", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

// Category Table
export const CategoryTable = pgTable("category", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

// Order Table
export const OrderTable = pgTable("order", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  userId: uuid("userId").references(() => UserTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

/**
 * productCategoryTable
 * Many to many relationsheap between category table and product Table
 */
export const productCategoryTable = pgTable("productCategory", {
  productId: uuid("postId").references(() => ProductTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
  categoryId: uuid("categoryId").references(() => CategoryTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
});

/**
 * ProductsOrderTable
 * Many to many relationsheap between order table and product Table
 */
export const ProductsOrderTable = pgTable("productsOrder", {
  productId: uuid("productId").references(() => ProductTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
  orderId: uuid("orderId").references(() => OrderTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
});

// Size Table
export const SizeTable = pgTable("size", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  price: real("price").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

// Extra Table
export const ExtraTable = pgTable("extra", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  price: real("price").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

/**
 * ProductSizeTable
 * Many to many relationsheap between Size table and product Table
 */
export const ProductSizeTable = pgTable("productSize", {
  productId: uuid("productId").references(() => ProductTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
  sizeId: uuid("sizeId").references(() => SizeTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
});

/**
 * ProductExtraTable
 * Many to many relationsheap between Extra table and product Table
 */
export const ProductExtraTable = pgTable("productExtra", {
  productId: uuid("productId").references(() => ProductTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
  extraId: uuid("extraId").references(() => ExtraTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
});
