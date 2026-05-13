-- =============================================
-- CALLALOO DATABASE SCHEMA
-- Run this in Supabase SQL Editor
-- Project: sktpjacowqaedddtrhuz
-- =============================================

-- COOKS (community food creators)
CREATE TABLE IF NOT EXISTS cooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  display_name TEXT NOT NULL,
  bio TEXT,
  location TEXT,
  avatar_url TEXT,
  follower_count INT DEFAULT 0,
  recipe_count INT DEFAULT 0,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- INGREDIENTS (global ingredient registry)
CREATE TABLE IF NOT EXISTS ingredients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  local_names TEXT[], -- e.g. ["shadow beni", "culantro", "recao"]
  category TEXT,      -- e.g. "herb", "protein", "grain", "vegetable"
  photo_url TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RECIPES
CREATE TABLE IF NOT EXISTS recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cook_id UUID REFERENCES cooks(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  cover_photo_url TEXT,
  vibe_tags TEXT[],     -- e.g. ["Sunday Lunch", "Street Food", "Quick Meals"]
  occasion_tags TEXT[], -- e.g. ["Christmas", "Carnival", "Everyday"]
  servings INT,
  prep_time_mins INT,
  cook_time_mins INT,
  calories_per_serving INT,
  protein_g NUMERIC,
  carbs_g NUMERIC,
  fat_g NUMERIC,
  sugar_g NUMERIC,
  sodium_mg NUMERIC,
  fibre_g NUMERIC,
  cholesterol_mg NUMERIC,
  instructions TEXT[],  -- ordered steps
  video_url TEXT,
  is_published BOOLEAN DEFAULT false,
  save_count INT DEFAULT 0,
  view_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RECIPE_INGREDIENTS (junction table)
CREATE TABLE IF NOT EXISTS recipe_ingredients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
  ingredient_id UUID REFERENCES ingredients(id) ON DELETE SET NULL,
  ingredient_name TEXT NOT NULL, -- denormalized for speed
  quantity TEXT,   -- e.g. "2 cups", "1 tsp"
  notes TEXT,      -- e.g. "finely chopped"
  sort_order INT DEFAULT 0
);

-- FOOD_SCANS (every AI scan result — this builds the dataset)
CREATE TABLE IF NOT EXISTS food_scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  dish_name TEXT NOT NULL,
  raw_gemini_response JSONB,  -- full AI response stored for training
  calories INT,
  protein_g NUMERIC,
  carbs_g NUMERIC,
  fat_g NUMERIC,
  ingredients TEXT[],
  tags TEXT[],
  photo_url TEXT,             -- stored in Supabase Storage
  user_country TEXT,          -- from IP detection
  confirmed BOOLEAN DEFAULT false, -- did the user confirm it was correct?
  created_at TIMESTAMPTZ DEFAULT now()
);

-- SAVED_RECIPES (user's collection / bookmarks)
CREATE TABLE IF NOT EXISTS saved_recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
  collection_name TEXT DEFAULT 'Saved',
  saved_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, recipe_id)
);

-- FOLLOWS (users following cooks)
CREATE TABLE IF NOT EXISTS follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  cook_id UUID REFERENCES cooks(id) ON DELETE CASCADE,
  followed_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(follower_id, cook_id)
);

-- PHOTOS (storage metadata for recipe + scan images)
CREATE TABLE IF NOT EXISTS photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  uploader_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  bucket TEXT NOT NULL,       -- 'recipe-photos' | 'scan-photos' | 'avatars'
  path TEXT NOT NULL,         -- path within bucket
  public_url TEXT NOT NULL,
  entity_type TEXT,           -- 'recipe' | 'scan' | 'cook'
  entity_id UUID,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================

ALTER TABLE cooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

-- Ingredients: anyone can read, only auth users can insert
CREATE POLICY "ingredients_read" ON ingredients FOR SELECT USING (true);
CREATE POLICY "ingredients_insert" ON ingredients FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Recipes: published ones are public
CREATE POLICY "recipes_read_published" ON recipes FOR SELECT USING (is_published = true);
CREATE POLICY "recipes_owner_all" ON recipes FOR ALL USING (cook_id IN (SELECT id FROM cooks WHERE user_id = auth.uid()));

-- Recipe ingredients: readable with recipe
CREATE POLICY "recipe_ingredients_read" ON recipe_ingredients FOR SELECT USING (true);

-- Food scans: users see only their own; anon scans stored without user_id
CREATE POLICY "food_scans_insert" ON food_scans FOR INSERT WITH CHECK (true);
CREATE POLICY "food_scans_own_read" ON food_scans FOR SELECT USING (user_id = auth.uid() OR user_id IS NULL);

-- Saved recipes: private to owner
CREATE POLICY "saved_own" ON saved_recipes FOR ALL USING (user_id = auth.uid());

-- Follows: public reads, auth writes
CREATE POLICY "follows_read" ON follows FOR SELECT USING (true);
CREATE POLICY "follows_write" ON follows FOR ALL USING (follower_id = auth.uid());

-- Cooks: public read
CREATE POLICY "cooks_read" ON cooks FOR SELECT USING (true);
CREATE POLICY "cooks_own" ON cooks FOR ALL USING (user_id = auth.uid());

-- Photos: public read
CREATE POLICY "photos_read" ON photos FOR SELECT USING (true);
CREATE POLICY "photos_insert" ON photos FOR INSERT WITH CHECK (auth.role() = 'authenticated' OR true);

-- =============================================
-- STORAGE BUCKETS (run separately in dashboard
-- or via Supabase CLI if needed)
-- =============================================
-- Bucket: recipe-photos (public)
-- Bucket: scan-photos (public)
-- Bucket: avatars (public)
