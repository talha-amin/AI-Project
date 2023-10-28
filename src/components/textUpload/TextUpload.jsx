import React, { useState } from 'react';
import "./textupload.css"

function TextUpload() {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedVoice, setSelectedVoice] = useState('Daniel');
  const [text, setText] = useState('');

  return (
    <div className='app-frame'>
    <div className="container">
      <div className="languages">
        Click on a language to generate random speech: <span>{selectedLanguage}</span>
        <button onClick={() => setSelectedLanguage('English')}>English</button>
      </div>
      <div className="input-area">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type in your text here..."
        ></textarea>
        <div className="voice-dropdown">
          <select value={selectedVoice} onChange={(e) => setSelectedVoice(e.target.value)}>
            <option value="Daniel">Daniel</option>
          </select>
        </div>
      </div>
      <div className="media-player">
        <button>▶ Play</button>
      </div>
      <div className="text-bubble">
        More languages coming soon.
      </div>
    </div>
    </div>
  );
}

export default TextUpload;
