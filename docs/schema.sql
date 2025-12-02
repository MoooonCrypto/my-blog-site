-- Create the ProjectType enum
CREATE TYPE "ProjectType" AS ENUM ('PORTFOLIO', 'SANDBOX');

-- Create the profiles table
-- This table will be linked to Supabase Auth users via a trigger
CREATE TABLE "profiles" (
  "id" UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  "email" TEXT UNIQUE NOT NULL,
  "username" TEXT NOT NULL,
  "bio" TEXT,
  "avatar_url" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create the projects table
CREATE TABLE "projects" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "thumbnail_url" TEXT NOT NULL,
  "project_url" TEXT,
  "github_url" TEXT,
  "technologies" TEXT[] NOT NULL,
  "type" "ProjectType" NOT NULL,
  "published" BOOLEAN NOT NULL DEFAULT false,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create the posts table
CREATE TABLE "posts" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "title" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "thumbnail_url" TEXT,
  "published" BOOLEAN NOT NULL DEFAULT false,
  "author_id" UUID NOT NULL REFERENCES "profiles"(id) ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Row Level Security (RLS) Policies

-- Profiles
ALTER TABLE "profiles" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own profile" ON "profiles" FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON "profiles" FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Projects
ALTER TABLE "projects" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Projects are viewable by everyone" ON "projects" FOR SELECT USING (published = true);
CREATE POLICY "Admins can manage all projects" ON "projects" FOR ALL USING (
  -- This assumes you have a way to identify admins, e.g., a custom claim in Supabase Auth
  -- For now, let's allow any authenticated user to manage projects for simplicity.
  auth.role() = 'authenticated'
);

-- Posts
ALTER TABLE "posts" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published posts are viewable by everyone" ON "posts" FOR SELECT USING (published = true);
CREATE POLICY "Admins can manage all posts" ON "posts" FOR ALL USING (
  -- This assumes you have a way to identify admins.
  -- For now, let's allow any authenticated user to manage posts for simplicity.
  auth.role() = 'authenticated'
);
