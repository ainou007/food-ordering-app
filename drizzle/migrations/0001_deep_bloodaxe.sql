ALTER TABLE "productCategory" DROP CONSTRAINT "productCategory_postId_categoryId_pk";--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "userId" uuid;--> statement-breakpoint
ALTER TABLE "order" ADD CONSTRAINT "order_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;