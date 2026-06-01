-- 1. Profiles Table: Stores all user identity and preference data
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  location_lat FLOAT,
  location_lng FLOAT,
  origin_platform TEXT DEFAULT 'Calalloo', -- 'Calalloo', 'dpanyard', 'Both'
  niche TEXT, -- For dpanyard mapping (e.g. 'Empire Owner', 'Heritage Chef')
  taste_preferences JSONB DEFAULT '[]'::jsonb,
  is_verified_admin BOOLEAN DEFAULT false,
  last_active_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Follows Table: Tracking global connections for 10,000+ users
CREATE TABLE IF NOT EXISTS follows (
  follower_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  following_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (follower_id, following_id)
);

-- 3. Activity & Audit Log: Unified for both platforms
CREATE TABLE IF NOT EXISTS activity_log (
  id BIGSERIAL PRIMARY KEY,
  event_type TEXT NOT NULL, 
  user_id UUID REFERENCES profiles(id),
  platform TEXT NOT NULL, -- 'Calalloo' or 'dpanyard'
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Global Stats View: For the Admin to track growth
CREATE OR REPLACE VIEW global_empire_stats AS
SELECT 
  origin_platform,
  COUNT(*) as total_users,
  COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '24 hours') as new_today
FROM profiles
GROUP BY origin_platform;

-- 3. Trigger Function: Automatically log and notify on new profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, avatar_url)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  
  INSERT INTO public.activity_log (event_type, user_id, description)
  VALUES ('NEW_PROFILE', new.id, 'New culinary node created: ' || new.email);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Set Trigger on Auth.Users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 5. Data Retention Policy: Auto-deletion for inactivity > 5 years
-- Note: This is a policy/view for cleaning up, usually run via a CRON task in Supabase
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

-- 6. Real-Time Setup
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile." ON profiles FOR UPDATE USING (auth.uid() = id);
