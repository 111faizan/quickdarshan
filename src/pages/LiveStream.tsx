// src/pages/LiveStream.tsx
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LiveStream: React.FC = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [savedImages, setSavedImages] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem('savedImages') || '[]')
  );

  const recordedChunks = useRef<BlobPart[]>([]);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [savedVideos, setSavedVideos] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem('savedVideos') || '[]')
  );
  const [recording, setRecording] = useState(false);
  const [mode, setMode] = useState<'none' | 'screenshot' | 'video'>('none');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500); // Fake delay
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        if (videoRef.current) videoRef.current.srcObject = stream;
        const mr = new MediaRecorder(stream, { mimeType: 'video/webm' });
        mr.ondataavailable = (e) => {
          if (e.data.size > 0) recordedChunks.current.push(e.data);
        };
        mr.onstop = () => {
          const blob = new Blob(recordedChunks.current, { type: 'video/webm' });
          recordedChunks.current = [];
          const url = URL.createObjectURL(blob);
          const updated = [url, ...savedVideos];
          setSavedVideos(updated);
          localStorage.setItem('savedVideos', JSON.stringify(updated));
        };
        setMediaRecorder(mr);
      } catch (err) {
        console.error('Camera access denied:', err);
      }
    };
    startCamera();
    return () => {
      const stream = videoRef.current?.srcObject as MediaStream;
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imgData = canvas.toDataURL('image/png');
    const updated = [imgData, ...savedImages];
    setSavedImages(updated);
    localStorage.setItem('savedImages', JSON.stringify(updated));
    alert('Screenshot saved!');
  };

  const startRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'inactive') {
      recordedChunks.current = [];
      mediaRecorder.start();
      setRecording(true);
    }
  };
  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <div className="animate-pulse w-4/5 max-w-6xl space-y-6">
          <div className="h-10 bg-gray-700 rounded w-1/3" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-[60vh] bg-gray-800 rounded" />
            <div className="h-[60vh] bg-gray-800 rounded" />
          </div>
          <div className="h-10 bg-gray-700 rounded w-1/2" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-black text-white">
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 z-10"
      >
        Back to Home
      </button>

      <div className="flex flex-col items-center pt-16 px-4">
        <h2 className="text-xl mb-4">Live Stream Preview</h2>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setMode('screenshot')}
            className={`px-4 py-2 rounded ${mode === 'screenshot' ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
          >
            Screenshot
          </button>
          <button
            onClick={() => setMode('video')}
            className={`px-4 py-2 rounded ${mode === 'video' ? 'bg-green-500 text-black' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
          >
            Recording
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl h-[60vh] mb-6">
          <div className="border-2 border-green-600">
            <iframe
              src="https://video-react-livestream-app.vercel.app/"
              title="Host Stream"
              className="w-full h-full"
              frameBorder="0"
              allow="camera; microphone; fullscreen; autoplay"
            />
          </div>
          <div className="border-2 border-purple-600">
            <iframe
              src="https://video-react-livestream-app.vercel.app/"
              title="Viewer Stream"
              className="w-full h-full"
              frameBorder="0"
              allow="camera; microphone; fullscreen; autoplay"
            />
          </div>
        </div>

        {mode === 'screenshot' && (
          <div className="flex flex-col items-center mb-8">
            <video ref={videoRef} autoPlay playsInline className="w-72 h-48 border mb-3 rounded" />
            <button
              onClick={handleCapture}
              className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 mb-4"
            >
              Save Screenshot
            </button>
            <canvas ref={canvasRef} className="hidden" />
            <div className="flex flex-wrap gap-4">
              {savedImages.map((img, i) => (
                <img key={i} src={img} alt={`Screenshot ${i + 1}`} className="w-24 h-24 border rounded" />
              ))}
            </div>
          </div>
        )}

        {mode === 'video' && (
          <div className="flex flex-col items-center mb-8">
            <div className="flex gap-4 mb-3">
              <button
                onClick={startRecording}
                disabled={recording}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
              >
                Start Recording
              </button>
              <button
                onClick={stopRecording}
                disabled={!recording}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
              >
                Stop Recording
              </button>
            </div>
            <div className="flex flex-wrap gap-4">
              {savedVideos.map((videoUrl, i) => (
                <video key={i} src={videoUrl} controls className="w-48 h-32 border rounded" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveStream;