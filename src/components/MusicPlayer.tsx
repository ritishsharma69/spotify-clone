import React from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, MoreVertical, Heart } from "lucide-react";

type MusicPlayerProps = {
  song: {
    id: number;
    title: string;
    artist: string;
    image: string;
  };
  onFavorite: () => void;
  onNext: () => void;
  onPrevious: () => void;
};

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  song,
  onFavorite,
  onNext,
  onPrevious,
}) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);
  const [showOptions, setShowOptions] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);

  const audioRef = React.useRef<HTMLAudioElement>(null);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickPosition = (e.clientX - rect.left) / rect.width;
      audioRef.current.currentTime = clickPosition * duration;
    }
  };

  const handleAddToFav = () => {
    onFavorite();
    setShowOptions(false); // Hide options after adding to favorites
  };

  return (
    <div className="music-player">
      <div className="song-info-and-album">
        <div className="song-info">
          <div className="song-title">{song.title}</div>
          <div className="song-artist">{song.artist}</div>
        </div>
        <div className="album-art-container">
          <img className="album-art" src={song.image} alt={song.title} />
        </div>
      </div>
      <div className="music-controls">
        <div className="music-bar" onClick={handleProgressBarClick}>
          <div
            className="music-progress"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          ></div>
        </div>
        <div className="controls">
          <div className="options-container">
            <button className="control-button" onClick={() => setShowOptions(!showOptions)}>
              <MoreVertical size={24} color="#ffffff" />
            </button>
            {showOptions && (
              <div className="options-dropdown">
                <button onClick={handleAddToFav}>
                  <Heart size={16} color="#ffffff" /> Add to Favorites
                </button>
              </div>
            )}
          </div>
          <button className="control-button" onClick={onPrevious}>
            <SkipBack size={24} fill="#ffffff" />
          </button>
          <button className="control-button play-pause" onClick={togglePlayPause}>
            {isPlaying ? <Pause size={32} fill="#ffffff" /> : <Play size={32} fill="#ffffff" />}
          </button>
          <button className="control-button" onClick={onNext}>
            <SkipForward size={24} fill="#ffffff" />
          </button>
          <button className="control-button" onClick={toggleMute}>
            {isMuted ? <VolumeX size={24} fill="#ffffff" /> : <Volume2 size={24} fill="#ffffff" />}
          </button>
        </div>
      </div>
      <audio
        ref={audioRef}
        autoPlay={isPlaying}
        muted={isMuted}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        src={`https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${song.id}.mp3`}
      />
    </div>
  );
};

export default MusicPlayer;