import React, { useState } from "react";
import "./imageConverter.scss";
import { IoCloseSharp } from "react-icons/io5";

const ImageConverter = () => {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [format, setFormat] = useState("webp");
  const [convertedFiles, setConvertedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!selectedFiles || selectedFiles.length === 0) {
      setErrorMessage("Sélectionne au moins un fichier.");
      return;
    }

    try {
      const formData = new FormData();
      for (const file of selectedFiles) {
        formData.append("images", file);
      }
      formData.append("format", format);

      const response = await fetch("http://localhost:5000/convert", { method: "POST", body: formData });

      if (!response.ok) throw new Error("Erreur lors de la conversion.");

      const data = await response.json();
      setConvertedFiles(data.files || []);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleConvertUrl = async () => {
    setErrorMessage("");
    if (!imageUrl) return setErrorMessage("Entrez une URL d'image.");

    try {
      const response = await fetch("http://localhost:5000/convert-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl, format }),
      });

      if (!response.ok) throw new Error("Échec de la conversion depuis l'URL.");

      const data = await response.json();
      setConvertedFiles([data.file]);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="container-converter">
      <h2>Convertisseur d'images</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="container-form-download">
        {convertedFiles.length === 0 &&
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                <label className="custom-file-upload">
                    📂 Sélectionner des fichiers
                    <input type="file" multiple onChange={handleFileChange} />
                </label>

                <label className="custom-file-upload">
                    📁 Sélectionner un dossier
                    <input type="file" multiple webkitdirectory="" directory="" onChange={handleFileChange} />
                </label>
                </div>

                <div className="url-input">
                <textarea type="text" placeholder="Entrer une URL d'image" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                <button type="button" onClick={handleConvertUrl}>🔄 Convertir depuis une URL</button>
                </div>

                <div className="format-select">
                <label>🎨 Choisir le format :</label>
                <select value={format} onChange={(e) => setFormat(e.target.value)}>
                    <option value="webp">WEBP</option>
                    <option value="jpg">JPG</option>
                    <option value="png">PNG</option>
                    <option value="gif">GIF</option>
                </select>
                </div>

                <button type="submit" className="convert-button">⚡ Convertir</button>
            </form>
          }
            {convertedFiles.length > 0 && (
              <div className="converted-files">
                <IoCloseSharp onClick={() => window.location.reload()} />
                <h3>📜 Fichiers convertis :</h3>
                <ul>
                  {convertedFiles.map((file, index) => (
                    <li key={index}>
                    <button
                      onClick={() => {
                        fetch(`http://localhost:5000${file}`)
                          .then(response => response.blob())
                          .then(blob => {
                            const url = window.URL.createObjectURL(blob);
                            const a = document.createElement("a");
                            a.href = url;
                            a.download = file.split("/").pop();
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                            window.URL.revokeObjectURL(url);
                          })
                          .catch(error => console.error("Erreur de téléchargement :", error));
                      }}
                    >
                      📥 Télécharger {file.split("/").pop()}
                    </button>
                  </li>
                  
                  ))}
                </ul>

                <button onClick={() => window.location.href = "http://localhost:5000/download-zip"}>📦 Télécharger en ZIP</button>
              </div>
            )}
        </div>
      
    </div>
  );
};

export default ImageConverter;
