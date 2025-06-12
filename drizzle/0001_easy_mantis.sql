ALTER TABLE "passkeys" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "passkeys" CASCADE;--> statement-breakpoint
DROP INDEX "unique_phone_number";--> statement-breakpoint
ALTER TABLE "sessions" DROP COLUMN "impersonated_by";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "phone_number";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "phone_number_verified";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "banned";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "banned_reason";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "ban_expires";