import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, X } from 'lucide-react';
import fashionVideo from '../assets/fashion-DNayZjzU.mp4';

interface HoyInMotionProps {
  onOpenQuiz: () => void;
}

export const HoyInMotion: React.FC<HoyInMotionProps> = ({ onOpenQuiz }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal Video State
  const [modalPlaying, setModalPlaying] = useState(true);
  const [modalMuted, setModalMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(19);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleOpenFullSize = () => {
    setIsModalOpen(true);
    setModalPlaying(true);

    // Pause inline video
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleCloseFullSize = () => {
    setIsModalOpen(false);

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }

    // Resume inline video
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  // Handle native element requestFullscreen
  const handleNativeFullscreen = () => {
    if (modalVideoRef.current) {
      if (modalVideoRef.current.requestFullscreen) {
        modalVideoRef.current.requestFullscreen().catch(() => {});
      }
    }
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        handleCloseFullSize();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const toggleModalPlay = () => {
    if (modalVideoRef.current) {
      if (modalPlaying) {
        modalVideoRef.current.pause();
      } else {
        modalVideoRef.current.play().catch(() => {});
      }
      setModalPlaying(!modalPlaying);
    }
  };

  const toggleModalMute = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.muted = !modalMuted;
      setModalMuted(!modalMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (modalVideoRef.current) {
      setCurrentTime(modalVideoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (modalVideoRef.current) {
      setDuration(modalVideoRef.current.duration || 19);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    if (modalVideoRef.current) {
      modalVideoRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <section
      id="motion"
      className="relative z-40 min-h-[100dvh] py-12 sm:py-16 lg:py-20 bg-[#121212] text-[#FAF8F5] overflow-hidden flex flex-col justify-center shadow-[0_-20px_50px_rgba(0,0,0,0.25)]"
    >
      {/* Background Subtle Gradient Lighting */}
      <div
        className="pointer-events-none absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full bg-[#B88F58]/10 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 right-1/4 w-[500px] h-[500px] rounded-full bg-[#B88F58]/5 blur-[120px]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-4 sm:mb-6 lg:mb-8">
          <div>
            <p className="text-[11px] sm:text-[12px] tracking-[0.25em] font-semibold text-[#B88F58] uppercase mb-1.5">
              HOY IN MOTION
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] tracking-tight leading-none uppercase">
              <span className="font-['Cinzel'] font-normal tracking-[0.02em] text-[#FAF8F5]">WATCH STYLE</span>{' '}
              <span className="font-['Cinzel'] font-bold text-[#B88F58]">COME ALIVE</span>
            </h2>
          </div>

          <div className="lg:max-w-xs xl:max-w-sm lg:text-right lg:pb-2">
            <p className="text-[#C8C4BE] text-sm sm:text-[15px] font-sans-body font-normal leading-relaxed">
              A quick look at how a HOY outfit comes together, start to finish.
            </p>
          </div>
        </div>

        {/* Inline Video Player Card */}
        <div className="mt-2 sm:mt-4">
          <div
            ref={containerRef}
            className="group relative mx-auto overflow-hidden rounded-[20px] bg-black shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/10"
            style={{ width: '100%', maxWidth: 'min(720px, -515.556px + 177.778svh)', aspectRatio: '16 / 9' }}
          >
            <div className="relative h-full w-full overflow-hidden bg-black">
              
              <video
                ref={videoRef}
                className="h-full w-full object-contain object-top transition duration-700 group-hover:scale-[1.01] cursor-pointer"
                loop
                autoPlay
                muted={isMuted}
                playsInline
                preload="metadata"
                aria-label="HOY in Motion — watch how an outfit comes together"
                onClick={togglePlay}
              >
                <source src={fashionVideo} type="video/mp4" />
                <source src="https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-a-golden-dress-40913-large.mp4" type="video/mp4" />
              </video>

              {/* Gradient Overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" aria-hidden="true" />

              {/* Top Left Live Badge */}
              <div className="absolute left-3.5 top-3.5 flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md sm:left-5 sm:top-5 pointer-events-none z-10">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#AB8850] opacity-70"></span>
                  <span className="relative inline-flex size-2 rounded-full bg-[#AB8850]"></span>
                </span>
                HOY in motion
              </div>

              {/* Top Right Full Size Button */}
              <button
                type="button"
                onClick={handleOpenFullSize}
                className="absolute right-3.5 top-3.5 flex items-center gap-1.5 rounded-full border border-white/30 bg-black/70 px-4 py-2 text-xs font-bold text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-[#B88F58] hover:text-black sm:right-5 sm:top-5 cursor-pointer z-20"
                title="View in full size"
                aria-label="View video in full size"
              >
                <Maximize2 className="size-4" aria-hidden="true" />
                <span>Full Size</span>
              </button>

              {/* Center Play/Pause hover button */}
              <div className="absolute inset-0 flex items-center justify-center cursor-pointer" onClick={togglePlay}>
                <button
                  type="button"
                  className={`flex size-14 items-center justify-center rounded-full border border-white/30 bg-black/60 text-white shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-[#AB8850] hover:text-black ${
                    isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
                  }`}
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                >
                  {isPlaying ? (
                    <Pause className="size-6 text-white" />
                  ) : (
                    <Play className="size-6 translate-x-0.5 fill-current" />
                  )}
                </button>
              </div>

              {/* Bottom Controls & Title Bar */}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-3 sm:p-6 pointer-events-none">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#AB8850] sm:text-xs">The process</p>
                  <h3 className="mt-0.5 font-['Cinzel'] text-sm font-semibold tracking-[-0.02em] text-white sm:mt-1 sm:text-2xl lg:text-3xl">HOY IN MOTION</h3>
                </div>
                <div className="flex items-center gap-2 pointer-events-auto">
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="flex size-9 sm:size-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition hover:bg-white/20 cursor-pointer"
                    aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
                    title={isMuted ? 'Unmute audio' : 'Mute audio'}
                  >
                    {isMuted ? (
                      <VolumeX className="size-4 sm:size-5" aria-hidden="true" />
                    ) : (
                      <Volume2 className="size-4 sm:size-5 text-[#AB8850]" aria-hidden="true" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleOpenFullSize}
                    className="flex size-9 sm:size-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition hover:bg-white/20 cursor-pointer"
                    aria-label="Expand to full size"
                    title="Expand to full size"
                  >
                    <Maximize2 className="size-4 sm:size-5" aria-hidden="true" />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Subnote Card */}
          <div
            onClick={onOpenQuiz}
            className="mx-auto mt-4 sm:mt-5 flex items-center gap-3 sm:gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-4 sm:px-5 py-2.5 sm:py-3 cursor-pointer hover:bg-white/[0.08] transition-colors"
            style={{ width: '100%', maxWidth: 'min(720px, -515.556px + 177.778svh)' }}
          >
            <div className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-xl border border-[#FFFFFF]/15 bg-[#FFFFFF]/5">
              <Sparkles className="size-4 sm:size-5 text-[#AB8850]" />
            </div>
            <p className="text-sm leading-6 text-[#FFFFFF]/85 sm:text-base sm:leading-7">
              From colour to silhouette to that final accessory — nothing here is random. Every pick is made to work for you.
            </p>
          </div>
        </div>

      </div>

      {/* FULL SCREEN LIGHTBOX MODAL MATCHING ATTACHED REFERENCE IMAGE EXACTLY */}
      {isModalOpen && createPortal(
        <div
          id="video-fullscreen-modal"
          className="fixed inset-0 z-[9999999] bg-[#0A0A0A] flex flex-col justify-between p-4 sm:p-6 lg:p-8 animate-in fade-in duration-300"
        >
          {/* Top Modal Header Row */}
          <div className="flex items-center justify-between w-full max-w-6xl mx-auto z-20 pb-4">
            {/* Title with Gold Bullet */}
            <div className="flex items-center gap-2.5">
              <span className="text-[#C5A880] text-sm sm:text-base leading-none">●</span>
              <span className="text-[#C5A880] font-sans text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">
                HOY IN MOTION — FULL SIZE VIEW
              </span>
            </div>

            {/* Circular Top Right Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleNativeFullscreen}
                className="w-10 h-10 rounded-full bg-[#181615] border border-[#332E29] hover:border-[#C5A880]/40 flex items-center justify-center text-white hover:bg-[#28231F] transition-all cursor-pointer shadow-md"
                title="Native Fullscreen"
              >
                <Maximize2 className="w-4 h-4 text-white" />
              </button>
              <button
                type="button"
                onClick={handleCloseFullSize}
                className="w-10 h-10 rounded-full bg-[#181615] border border-[#332E29] hover:border-[#C5A880]/40 flex items-center justify-center text-white hover:bg-[#28231F] transition-all cursor-pointer shadow-md"
                title="Close"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Centered Main Video Player Card */}
          <div className="relative my-auto max-w-6xl w-full mx-auto rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[#2B2723] bg-black flex flex-col justify-between">
            {/* Video Container */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center">
              <video
                ref={modalVideoRef}
                className="w-full h-full object-contain cursor-pointer"
                loop
                autoPlay
                muted={modalMuted}
                playsInline
                onClick={toggleModalPlay}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
              >
                <source src={fashionVideo} type="video/mp4" />
              </video>

              {/* Play Overlay Indicator when Paused */}
              {!modalPlaying && (
                <div
                  className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/30"
                  onClick={toggleModalPlay}
                >
                  <div className="size-16 rounded-full bg-[#181615]/90 border border-[#332E29] text-white flex items-center justify-center shadow-2xl backdrop-blur-md">
                    <Play className="size-8 translate-x-0.5 fill-current text-[#C5A880]" />
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Video Control Bar Matching Reference Image */}
            <div className="bg-[#121110] border-t border-[#26221F] w-full flex flex-col">
              {/* Gold Progress / Seek Bar */}
              <div className="relative w-full h-1.5 bg-[#282420] group/seek cursor-pointer">
                <div
                  className="h-full bg-[#C5A880] transition-all duration-75 relative"
                  style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#C5A880] shadow-md opacity-0 group-hover/seek:opacity-100 transition-opacity" />
                </div>
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                />
              </div>

              {/* Control Buttons & Timestamp Row */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3">
                {/* Left Controls: Play/Pause, Mute, Time */}
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={toggleModalPlay}
                    className="text-white hover:text-[#C5A880] transition-colors cursor-pointer p-1"
                    title={modalPlaying ? 'Pause' : 'Play'}
                  >
                    {modalPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>

                  <button
                    type="button"
                    onClick={toggleModalMute}
                    className="text-white hover:text-[#C5A880] transition-colors cursor-pointer p-1"
                    title={modalMuted ? 'Unmute' : 'Mute'}
                  >
                    {modalMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-[#C5A880]" />}
                  </button>

                  <span className="text-xs text-[#A89E93] font-mono font-medium tracking-tight">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                {/* Right Controls: Fullscreen */}
                <button
                  type="button"
                  onClick={handleNativeFullscreen}
                  className="flex items-center gap-1.5 text-xs font-semibold text-white hover:text-[#C5A880] transition-colors cursor-pointer p-1"
                  title="Fullscreen"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Fullscreen</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Spacer / Margin */}
          <div className="h-2" />
        </div>,
        document.body
      )}

    </section>
  );
};
