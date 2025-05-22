/*
  # Create Admissions System

  1. New Tables
    - `admissions`
      - Basic student information
      - Parent/Guardian information
      - Previous school details
      - Required documents tracking
      - Administrative fields

  2. Security
    - Enable RLS
    - Allow public form submissions
    - Only admins can view submissions
*/

CREATE TABLE admissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Student Information
  student_surname text NOT NULL,
  student_other_names text NOT NULL,
  date_of_birth date NOT NULL,
  gender text NOT NULL CHECK (gender IN ('male', 'female')),
  nationality text NOT NULL DEFAULT 'Ghanaian',
  religion text,
  home_address text NOT NULL,
  home_town text NOT NULL,
  region_of_origin text NOT NULL,
  
  -- Parent/Guardian Information
  father_name text NOT NULL,
  father_occupation text NOT NULL,
  father_contact text NOT NULL,
  mother_name text NOT NULL,
  mother_occupation text NOT NULL,
  mother_contact text NOT NULL,
  guardian_name text,
  guardian_relationship text,
  guardian_contact text,
  
  -- Previous School Information
  previous_school text NOT NULL,
  previous_class text NOT NULL,
  bece_index_number text,
  aggregate_score integer,
  
  -- Required Documents
  birth_cert_attached boolean DEFAULT false,
  report_card_attached boolean DEFAULT false,
  bece_result_attached boolean DEFAULT false,
  
  -- Administrative Fields
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  reviewed_by uuid REFERENCES admins(id)
);

-- Enable RLS
ALTER TABLE admissions ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can submit admissions"
  ON admissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Only admins can view admissions"
  ON admissions
  FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admins WHERE id = auth.uid()));

CREATE POLICY "Only admins can update admissions"
  ON admissions
  FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admins WHERE id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM admins WHERE id = auth.uid()));

-- Update trigger
CREATE TRIGGER update_admissions_updated_at
  BEFORE UPDATE ON admissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();