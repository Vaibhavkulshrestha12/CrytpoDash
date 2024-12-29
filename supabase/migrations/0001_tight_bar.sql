/*
  # Portfolio Management Schema

  1. New Tables
    - `portfolio`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `coin_id` (text)
      - `quantity` (numeric)
      - `purchase_price` (numeric)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `portfolio` table
    - Add policies for CRUD operations
*/

CREATE TABLE IF NOT EXISTS portfolio (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  coin_id text NOT NULL,
  quantity numeric NOT NULL CHECK (quantity > 0),
  purchase_price numeric NOT NULL CHECK (purchase_price > 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own portfolio entries
CREATE POLICY "Users can view own portfolio"
  ON portfolio
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow users to insert into their own portfolio
CREATE POLICY "Users can insert into own portfolio"
  ON portfolio
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own portfolio entries
CREATE POLICY "Users can update own portfolio"
  ON portfolio
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own portfolio entries
CREATE POLICY "Users can delete from own portfolio"
  ON portfolio
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);