-- 1. Profiles Table: Unified Identity for Calalloo & dpanyard
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  location_lat FLOAT,
  location_lng FLOAT,
  origin_platform TEXT DEFAULT 'Calalloo', 
  niche TEXT, -- 'AI Architect', 'Heritage Chef', 'Couture Specialist', etc.
  taste_preferences JSONB DEFAULT '[]'::jsonb,
  is_verified_admin BOOLEAN DEFAULT false,
  last_active_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Follows Table: Global Networking (10,000+ users scale)
CREATE TABLE IF NOT EXISTS follows (
  follower_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  following_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (follower_id, following_id)
);

-- 3. Verifications Vault: Functional Security Document Storage
CREATE TABLE IF NOT EXISTS verifications (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  document_url TEXT NOT NULL,
  status TEXT DEFAULT 'PENDING', -- 'PENDING', 'APPROVED', 'REJECTED'
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Activity Audit Log
CREATE TABLE IF NOT EXISTS activity_log (
  id BIGSERIAL PRIMARY KEY,
  event_type TEXT NOT NULL, 
  user_id UUID REFERENCES profiles(id),
  platform TEXT NOT NULL, 
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Global Stats View (Admin Intelligence)
CREATE OR REPLACE VIEW global_empire_stats AS
SELECT 
  origin_platform,
  COUNT(*) as total_users,
  COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '24 hours') as new_today
FROM profiles
GROUP BY origin_platform;

-- 6. Trigger: Auto-Profile on Auth Join
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, avatar_url)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  
  INSERT INTO public.activity_log (event_type, user_id, platform, description)
  VALUES ('NEW_PROFILE', new.id, 'Auth', 'Global Node generated for ' || new.email);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 7. Retention Policy: 5-Year Inactivity Logic
CREATE OR REPLACE FUNCTION delete_inactive_profiles()
RETURNS void AS $$
BEGIN
  DELETE FROM auth.users 
  WHERE id IN (
    SELECT id FROM profiles 
    WHERE last_active_at < NOW() - INTERVAL '5 years'
  );
END;
$$ LANGUAGE plpgsql;

-- 8. RLS Security Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile." ON profiles FOR UPDATE USING (auth.uid() = id);

ALTER TABLE follows ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public follows viewable." ON follows FOR SELECT USING (true);
CREATE POLICY "Users can follow." ON follows FOR INSERT WITH CHECK (auth.uid() = follower_id);

ALTER TABLE verifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own verification." ON verifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can upload verification." ON verifications FOR INSERT WITH CHECK (auth.uid() = user_id);
