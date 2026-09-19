-- SQL to create the availability table for dpanyard
CREATE TABLE IF NOT EXISTS public.availability (
    id SERIAL PRIMARY KEY,
    business_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    day_of_week TEXT NOT NULL, -- '0'-'6' for recurring, 'YYYY-MM-DD' for specific
    start_time TIME WITHOUT TIME ZONE,
    end_time TIME WITHOUT TIME ZONE,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(business_id, day_of_week)
);

-- Enable RLS
ALTER TABLE public.availability ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Availability is viewable by everyone" ON public.availability
    FOR SELECT USING (true);

CREATE POLICY "Users can manage their own availability" ON public.availability
    FOR ALL USING (auth.uid() = business_id);
