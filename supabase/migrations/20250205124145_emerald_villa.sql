/*
  # Initial Schema Setup for Event Streaming Platform

  1. New Tables
    - `events`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `date` (timestamptz)
      - `image_url` (text)
      - `created_at` (timestamptz)
    
    - `media`
      - `id` (uuid, primary key)
      - `title` (text)
      - `url` (text)
      - `thumbnail_url` (text)
      - `type` (text, either 'image' or 'video')
      - `created_at` (timestamptz)
    
    - `streams`
      - `id` (uuid, primary key)
      - `title` (text)
      - `stream_url` (text)
      - `is_live` (boolean)
      - `thumbnail_url` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
*/

-- Events table
CREATE TABLE events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  date timestamptz NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to events"
  ON events
  FOR SELECT
  TO public
  USING (true);

-- Media table
CREATE TABLE media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  url text NOT NULL,
  thumbnail_url text NOT NULL,
  type text NOT NULL CHECK (type IN ('image', 'video')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to media"
  ON media
  FOR SELECT
  TO public
  USING (true);

-- Streams table
CREATE TABLE streams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  stream_url text NOT NULL,
  is_live boolean DEFAULT false,
  thumbnail_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE streams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to streams"
  ON streams
  FOR SELECT
  TO public
  USING (true);