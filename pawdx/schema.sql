-- PawDx Supabase Schema

-- Pets Table
CREATE TABLE pets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    species TEXT NOT NULL, -- dog, cat, bird, rabbit, fish, etc.
    breed TEXT,
    dob DATE,
    weight DECIMAL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Symptom Logs Table
CREATE TABLE symptom_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pet_id UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
    symptoms_input TEXT NOT NULL,
    ai_response JSONB NOT NULL, -- Likely conditions, urgency, remedies
    urgency_level TEXT NOT NULL, -- Green, Yellow, Red
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vaccine Tracker Table
CREATE TABLE vaccines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pet_id UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
    vaccine_name TEXT NOT NULL,
    date_given DATE NOT NULL,
    next_due DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Health Logs Table
CREATE TABLE health_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pet_id UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
    date DATE DEFAULT CURRENT_DATE,
    notes TEXT,
    weight DECIMAL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE symptom_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE vaccines ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_logs ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can manage their own pets" ON pets 
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own pet logs" ON symptom_logs 
    FOR ALL USING (pet_id IN (SELECT id FROM pets WHERE user_id = auth.uid()));

CREATE POLICY "Users can manage their own pet vaccines" ON vaccines 
    FOR ALL USING (pet_id IN (SELECT id FROM pets WHERE user_id = auth.uid()));

CREATE POLICY "Users can manage their own pet health logs" ON health_logs 
    FOR ALL USING (pet_id IN (SELECT id FROM pets WHERE user_id = auth.uid()));
