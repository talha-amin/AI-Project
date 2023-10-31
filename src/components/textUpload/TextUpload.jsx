import React, { useEffect, useRef, useState } from 'react';
import "./textupload.css"
import { getStorage, ref, getDownloadURL,listAll } from 'firebase/storage';
import { getDoc, doc, collection } from 'firebase/firestore';
import { db } from '../google/firebase';

function TextUpload({ selectedArtist }) {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [text, setText] = useState('');
  const [audioURL, setAudioURL] = useState('');
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);  // Import useRef from React


  useEffect(() => {
    if (selectedArtist) {
      const storage = getStorage();
      const audioStorageRef = ref(storage, `${selectedArtist.id}/Vocalize/`);

      listAll(audioStorageRef)
        .then((res) => {
          if (res.items.length > 0) {
            getDownloadURL(res.items[0])
              .then((url) => {
                setAudioURL(url);
                setLoading(false);
              })
              .catch((error) => {
                console.error("Error fetching audio files:", error);
              });
          }
        })
        .catch((error) => {
          console.error("Error fetching audio files:", error);
        });
      const artistRef = doc(db, 'users', selectedArtist.id);

      getDoc(artistRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            const voice_id = docSnapshot.data().voice_id;
            TextToSpeech({ voice_id, text })
              .then((audioData) => {
                setAudioURL(URL.createObjectURL(new Blob([audioData], { type: 'audio/mpeg' })));

              })
              .catch((error) => {
                console.error("Error generating text-to-speech:", error);
              });
          }
        })
        .catch((error) => {
          console.error("Error fetching artist data:", error);
        });
    }
  }, [selectedArtist, text]);
const handlePlaySnippet = () => {
  if (audioRef.current) {
      setIsPlaying(true);
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      
      setTimeout(() => {
          audioRef.current.pause();
          setIsPlaying(false);
      }, 10000);
  }
};
  return (
    <div className='app-frame'>
    <div className="container">
      <div className="languages">
        Click on a language to generate random speech: <span>{selectedLanguage}</span>
        <button onClick={() => setSelectedLanguage('English')}>English</button>
          <div  className="text-bubble">
        More languages coming soon.
      </div>
      <div className="media-player">
                <button onClick={handlePlaySnippet}>
                    {isPlaying ? "⏸ Pause" : "▶ Play Sample Of Talent"}
                </button>
                <audio ref={audioRef} src={audioURL} preload="none"></audio>
            </div>
      </div>
      <div className="input-area">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type in your text here..."
        ></textarea>
      </div>
     
    </div>
    </div>
  );
}

export default TextUpload;
