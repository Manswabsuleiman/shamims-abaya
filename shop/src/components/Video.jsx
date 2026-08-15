import React, { useRef, useState } from 'react'

// Point this to your video file — can be in /public (e.g. '/Videos/promo.mp4')
// or a full URL (e.g. an uploaded video link).
const VIDEO_SRC = '/Pictures/original.mp4'
const POSTER_SRC = '/Pictures/packaing.png' // optional preview image shown before play

const VideoSection = () => {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <div style={{ width: '100%' }}>

      <style>{`
        .video-intro {
          text-align: center;
          padding: 48px 6% 28px;
          font-family: Georgia, serif;
        }

        .video-intro-tag {
          color: #030000;
          font-weight: 600;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 3px;
          margin-bottom: 10px;
        }

        .video-intro-title {
          font-family: 'Times New Roman', Georgia, serif;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 4px;
          font-size: clamp(1.6rem, 4vw, 2.8rem);
          color: #111;
          margin: 0 0 16px;
          line-height: 1.5;
        }

        .video-intro-title span {
          color: #2563eb;
        }

        .video-intro-subtext {
          color: #666;
          font-size: clamp(0.9rem, 2vw, 1.05rem);
          max-width: 560px;
          margin: 0 auto;
          line-height: 1.5;
        }

        .video-wrap {
          position: relative;
          width: 100%;
          height: 75vh;
          overflow: hidden;
          background: #000;
        }

        .video-el {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .video-play-btn {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          transition: transform 0.2s ease, background 0.2s ease;
          z-index: 2;
        }

        .video-play-btn:hover {
          background: #fff;
          transform: translate(-50%, -50%) scale(1.08);
        }

        @media (max-width: 768px) {
          .video-wrap { height: 50vh; }
          .video-intro { padding: 36px 6% 20px; }
        }

        @media (max-width: 480px) {
          .video-wrap { height: 40vh; }
        }
      `}</style>

      <div className="video-intro">
        <p className="video-intro-tag">Behind The Scenes</p>
        <h2 className="video-intro-title">
          Watch Our <span>Packaging</span><br />
        </h2>
        <p className="video-intro-subtext">
          Press play and take a closer look at the care and behind every box we send out.
        </p>
      </div>

      <div className="video-wrap">
        <video
          ref={videoRef}
          className="video-el"
          src={VIDEO_SRC}
          poster={POSTER_SRC}
          playsInline
          loop
          onClick={togglePlay}
        />

        {!isPlaying && (
          <button className="video-play-btn" onClick={togglePlay} aria-label="Play video">
            ▶
          </button>
        )}
      </div>

    </div>
  )
}

export default VideoSection