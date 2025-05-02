export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  image_url: string;
}

export interface MediaItem {
  id: string;
  title: string;
  url: string;
  thumbnail_url: string;
  created_at: string;
  type: 'image' | 'video';
}

export interface Stream {
  id: string;
  title: string;
  stream_url: string;
  stream_type: 'rtmp' | 'srt' | 'hls';
  is_live: boolean;
  thumbnail_url: string;
  stream_key?: string;
  ingest_endpoint?: string;
  hls_url?: string;
}