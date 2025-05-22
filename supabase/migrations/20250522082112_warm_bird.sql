/*
  # Website Content Management System

  1. New Tables
    - `admins`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `created_at` (timestamp)
      
    - `content_blocks`
      - `id` (uuid, primary key)
      - `section` (text) - identifies which part of the website
      - `content` (jsonb) - flexible content storage
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `updated_by` (uuid, references admins)
      
    - `media_library`
      - `id` (uuid, primary key)
      - `type` (text) - image/video/document
      - `url` (text)
      - `title` (text)
      - `description` (text)
      - `uploaded_at` (timestamp)
      - `uploaded_by` (uuid, references admins)

  2. Security
    - Enable RLS on all tables
    - Policies ensure only authenticated admins can modify content
*/

-- Create tables
CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY DEFAULT auth.uid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS content_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section text NOT NULL,
  content jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES admins(id)
);

CREATE TABLE IF NOT EXISTS media_library (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('image', 'video', 'document')),
  url text NOT NULL,
  title text NOT NULL,
  description text,
  uploaded_at timestamptz DEFAULT now(),
  uploaded_by uuid REFERENCES admins(id)
);

-- Enable Row Level Security
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_library ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admins can read own data"
  ON admins
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Anyone can read content"
  ON content_blocks
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Only admins can modify content"
  ON content_blocks
  FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admins WHERE id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM admins WHERE id = auth.uid()));

CREATE POLICY "Anyone can view media"
  ON media_library
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Only admins can modify media"
  ON media_library
  FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admins WHERE id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM admins WHERE id = auth.uid()));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updating timestamps
CREATE TRIGGER update_content_blocks_updated_at
  BEFORE UPDATE ON content_blocks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();