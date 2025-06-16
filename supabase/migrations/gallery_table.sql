-- Create enum type for media types
CREATE TYPE media_type AS ENUM ('image', 'video');

-- Create gallery table
CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  type media_type NOT NULL,
  media_url TEXT NOT NULL,
  thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users to select gallery items
CREATE POLICY "Anyone can view gallery items"
  ON gallery
  FOR SELECT
  USING (true);

-- Create policy for authenticated users to insert gallery items
CREATE POLICY "Authenticated users can insert gallery items"
  ON gallery
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Create policy for authenticated users to update gallery items
CREATE POLICY "Authenticated users can update gallery items"
  ON gallery
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Create policy for authenticated users to delete gallery items
CREATE POLICY "Authenticated users can delete gallery items"
  ON gallery
  FOR DELETE
  USING (auth.role() = 'authenticated');
