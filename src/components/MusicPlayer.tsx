import React from "react";

type MusicPlayerProps = {
  song: {
    id: number;
    title: string;
    artist: string;
    image: string;
  };
  onFavorite: () => void;
  isFavorite: boolean;
};

const MusicPlayer: React.FC<MusicPlayerProps> = ({ song, onFavorite, isFavorite }) => {
  return (
    <div className="music-player">
      <div className="album-art-container">
        <img className="album-art" src={song.image} alt={song.title} />
      </div>
      <div className="song-info">
        <div className="song-title">{song.title}</div>
        <div className="song-artist">{song.artist}</div>
        <span className="favorite-icon" onClick={onFavorite}>
          {isFavorite ? "❤️" : "🤍"}
        </span>
      </div>
      <audio
        controls
        autoPlay
        src={`https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${song.id}.mp3`}
      />
    </div>
  );
};

export default MusicPlayer;