CREATE TABLE "storys" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "storys_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"storyId" varchar(255) NOT NULL,
	"subject" varchar(255) NOT NULL,
	"type" varchar(50) NOT NULL,
	"ageGroup" varchar(50) NOT NULL,
	"imageUrl" varchar(500) DEFAULT '',
	"content" json,
	"email" varchar(255),
	CONSTRAINT "storys_storyId_unique" UNIQUE("storyId")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "storys" ADD CONSTRAINT "storys_email_users_email_fk" FOREIGN KEY ("email") REFERENCES "public"."users"("email") ON DELETE no action ON UPDATE no action;