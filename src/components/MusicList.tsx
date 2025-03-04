import React, { useState } from "react";
import { ListGroup, Form } from "react-bootstrap";

// Define Song type
interface Song {
  id: number;
  title: string;
  artist: string;
  image: string;
}

// Define Props type
interface MusicListProps {
  onSelectSong: (song: Song) => void;
  onFavorite: (song: Song) => void;
  favorites: Song[];
  recentlyPlayed: Song[];
  activeTab: string;
}

const MusicList: React.FC<MusicListProps> = ({
  onSelectSong,
  favorites,
  recentlyPlayed,
  activeTab,
}) => {
  const [search, setSearch] = useState<string>("");

  const dummySongs: Song[] = [
    {
      id: 1,
      title: "The Weekend",
      artist: "Starboy",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/3/39/The_Weeknd_-_Starboy.png/220px-The_Weeknd_-_Starboy.png",
    },
    {
      id: 2,
      title: "Demons",
      artist: "Imagine Dragons",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Imagine_Dragons_-_%22Demons%22_%28Official_Single_Cover%29.jpg/220px-Imagine_Dragons_-_%22Demons%22_%28Official_Single_Cover%29.jpg",
    },
    {
      id: 3,
      title: "North of the River",
      artist: "Imagine Dragons",
      image: "https://images.genius.com/575023edb4b7021498110751743477e5.300x300x1.png",
    },
    {
      id: 4,
      title: "Ghost Stories",
      artist: "Coldplay",
      image: "https://upload.wikimedia.org/wikipedia/en/8/8a/Coldplay_-_Ghost_Stories.png",
    },
    {
      id: 5,
      title: "Sparks",
      artist: "Coldplay",
      image: "https://i1.sndcdn.com/artworks-000126172960-u72sek-t500x500.jpg",
    },
    {
      id: 6,
      title: "Viva La Vida",
      artist: "Coldplay",
      image: "https://upload.wikimedia.org/wikipedia/en/8/84/Coldplay_-_Viva_la_Vida.jpg", 
    },
    {
      id: 7,
      title: "Hymn for the Weekend",
      artist: "Coldplay",
      image: "https://upload.wikimedia.org/wikipedia/en/e/e5/Coldplay%2C_Hymn_for_the_Weekend%2C_Artwork.jpg",
    },
    {
      id: 8,
      title: "Pain",
      artist: "Pryor Jones",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzPkbEGa5Wju6_zgYyzirfkDkKhoTYskyPjw&s",
    },
  ];

  // Filter songs based on search input
  const filteredSongs = dummySongs.filter(
    (song) =>
      song.title.toLowerCase().includes(search.toLowerCase()) ||
      song.artist.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="music-list">
      <h3>{activeTab}</h3>

      <div className="search-bar">
        <Form.Control
          type="text"
          placeholder="Search Song, Artist"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <ListGroup>
        {activeTab === "For You" &&
          filteredSongs.map((song) => (
            <ListGroup.Item
              key={song.id}
              onClick={() => onSelectSong(song)}
              className="d-flex align-items-center"
            >
              {song.image && ( // Only render image if song.image is not empty
                <img src={song.image} alt={song.title} className="song-image" />
              )}
              <div className="song-details">
                <div className="song-title">{song.title}</div>
                <div className="song-artist">{song.artist}</div>
              </div>
              <span className="song-time">3:45</span> {/* Add song time */}
            </ListGroup.Item>
          ))}
      </ListGroup>

      {activeTab === "Recently Played" && (
        <>
          <ListGroup>
            {recentlyPlayed.length > 0 ? (
              recentlyPlayed.map((song) => (
                <ListGroup.Item
                  key={song.id}
                  onClick={() => onSelectSong(song)}
                  className="d-flex align-items-center"
                >
                  {song.image && ( // Only render image if song.image is not empty
                    <img src={song.image} alt={song.title} className="song-image" />
                  )}
                  <div className="song-details">
                    <div className="song-title">{song.title}</div>
                    <div className="song-artist">{song.artist}</div>
                  </div>
                  <span className="song-time">3:45</span> {/* Add song time */}
                </ListGroup.Item>
              ))
            ) : (
              <p>No recently played songs.</p>
            )}
          </ListGroup>
        </>
      )}

      {activeTab === "Favourite" && (
        <>
          <ListGroup>
            {favorites.length > 0 ? (
              favorites.map((song) => (
                <ListGroup.Item
                  key={song.id}
                  onClick={() => onSelectSong(song)}
                  className="d-flex align-items-center"
                >
                  {song.image && ( // Only render image if song.image is not empty
                    <img src={song.image} alt={song.title} className="song-image" />
                  )}
                  <div className="song-details">
                    <div className="song-title">{song.title}</div>
                    <div className="song-artist">{song.artist}</div>
                  </div>
                  <span className="song-time">3:45</span> {/* Add song time */}
                </ListGroup.Item>
              ))
            ) : (
              <p>No favorite songs added yet.</p>
            )}
          </ListGroup>
        </>
      )}
    </div>
  );
};

export default MusicList;