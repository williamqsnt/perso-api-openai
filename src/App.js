import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';



function App() {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fileType = "png";
    const apiKey = "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";
    const url = "https://api.openai.com/v1/images/generations";

    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    });

    const data = {
      model: "image-alpha-001",
      prompt: text,
      num_images: 1,
      size: "256x256",
      response_format: "url",
    };

    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        setImageUrl(response.data[0].url);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [text]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    setText(formData.get("text"));
  };

  
  return (
    <div className="App">
      {imageUrl && <img src={imageUrl} alt="image créé par l'IA" />}
      <form onSubmit={handleSubmit}>
        <input type="text" name="text" value={text} onChange={(event) => setText(event.target.value)} />
        <input type="submit" value="Générer l'image" />
      </form>
    </div>
  );
}

export default App;