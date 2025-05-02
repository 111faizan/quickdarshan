/*
  # Update streams table with streaming configuration
  
  1. Changes
    - Add new columns for stream configuration:
      - stream_type: Type of stream (rtmp, srt, hls)
      - stream_key: Key for stream authentication
      - ingest_endpoint: RTMP/SRT ingest endpoint
      - hls_url: HLS playback URL
    - Insert initial stream data
  
  2. Security
    - Maintain existing RLS policies
*/

-- Add new columns to streams table
ALTER TABLE streams 
ADD COLUMN IF NOT EXISTS stream_type text CHECK (stream_type IN ('rtmp', 'srt', 'hls')),
ADD COLUMN IF NOT EXISTS stream_key text,
ADD COLUMN IF NOT EXISTS ingest_endpoint text,
ADD COLUMN IF NOT EXISTS hls_url text;

-- Insert initial stream data
INSERT INTO streams (
  title,
  stream_url,
  stream_type,
  is_live,
  thumbnail_url,
  stream_key,
  ingest_endpoint,
  hls_url
) VALUES (
  'Main Event Stream',
  'https://streaming.example.com/live/main/playlist.m3u8',
  'hls',
  true,
  'https://images.unsplash.com/photo-1478737270239-2f02b77fc618',
  'live_xyz123',
  'rtmp://ingest.example.com/live',
  'https://streaming.example.com/live/main/playlist.m3u8'
);