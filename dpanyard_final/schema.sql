-- Businesses table
CREATE TABLE businesses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  category text NOT NULL,
  district text NOT NULL,
  description text,
  phone text,
  whatsapp text,
  email text,
  website text,
  address text,
  hours text,
  is_verified boolean DEFAULT false,
  is_premium boolean DEFAULT false,
  rating numeric DEFAULT 0,
  review_count integer DEFAULT 0,
  created_at timestamp DEFAULT now()
);

-- Reviews table  
CREATE TABLE reviews (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id uuid REFERENCES businesses(id),
  reviewer_name text NOT NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamp DEFAULT now()
);

-- Inquiries table
CREATE TABLE inquiries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id uuid REFERENCES businesses(id),
  client_name text NOT NULL,
  client_phone text,
  client_whatsapp text,
  message text NOT NULL,
  created_at timestamp DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Policies for public reading
CREATE POLICY "Allow public read-only access to businesses" ON businesses FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access to reviews" ON reviews FOR SELECT USING (true);

-- Policies for inserting (public submission)
CREATE POLICY "Allow public insert for businesses" ON businesses FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert for reviews" ON reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert for inquiries" ON inquiries FOR INSERT WITH CHECK (true);
