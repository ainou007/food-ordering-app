import { relations } from "drizzle-orm";
import { pgTable, real, text, pgEnum, timestamp, uuid, varchar, primaryKey } from "drizzle-orm/pg-core";

// User Table
export const RoleEnum = { ADMIN: "admin", USER: "user" };

export type Role = (typeof RoleEnum)[keyof typeof RoleEnum];
const roleEnum = pgEnum("role", Object.values(RoleEnum) as [string, ...string[]]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  image: varchar("image", { length: 255 }),
  phone: varchar("phone", { length: 255 }),
  role: roleEnum("role").notNull().default(RoleEnum.USER), // Utilisation de l'ENUM
  streetAddress: varchar("streetAddress", { length: 255 }),
  codePostal: varchar("codePostal", { length: 255 }),
  city: varchar("city", { length: 255 }),
  country: varchar("country", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

// Product Table
export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  price: real("price").notNull(),
  image: varchar("image", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

// Category Table
export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

// Order Table
export const orders = pgTable("orders", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  userId: uuid("userId").references(() => users.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

/**
 * productCategoryTable
 * Many to many relationsheap between category table and product Table
 */
export const products_to_categories = pgTable(
  "products_to_categories",
  {
    productId: uuid("postId").references(() => products.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    categoryId: uuid("categoryId").references(() => categories.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  },
  (t) => {
    return {
      pk: primaryKey({ columns: [t.productId, t.categoryId] }),
    };
  },
);

/**
 * ProductsOrderTable
 * Many to many relationsheap between order table and product Table
 */
export const products_to_orders = pgTable("products_to_orders", {
  productId: uuid("productId").references(() => products.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  orderId: uuid("orderId").references(() => orders.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
});

// Size Table
export const sizes = pgTable("product_sizes", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  price: real("price").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

// Extra Table
export const extras = pgTable("product_extras", {
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
export const product_to_sizes = pgTable("product_to_sizes", {
  productId: uuid("productId").references(() => products.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  sizeId: uuid("sizeId").references(() => sizes.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
});

/**
 * ProductExtraTable
 * Many to many relationsheap between Extra table and product Table
 */
export const product_to_extras = pgTable("product_to_extras", {
  productId: uuid("productId").references(() => products.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  extraId: uuid("extraId").references(() => extras.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
});

// Relations
export const productsRelations = relations(products, ({ many }) => ({
  categories: many(products_to_categories),
}));
export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products_to_categories),
}));

export const categories_to_groupsRalations = relations(products_to_categories, ({ one }) => ({
  product: one(products, {
    fields: [products_to_categories.productId],
    references: [products.id],
  }),
  categorie: one(categories, {
    fields: [products_to_categories.categoryId],
    references: [categories.id],
  }),
}));
