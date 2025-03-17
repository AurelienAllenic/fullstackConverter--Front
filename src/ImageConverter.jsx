import React, { useState } from "react";
import background from "./assets/back-converter.jpg";
import "./imageConverter.scss"

const ImageConverter = () => {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [format, setFormat] = useState("webp");
  const [convertedFiles, setConvertedFiles] = useState([]);
  const [isFolder, setIsFolder] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
    setIsFolder(false); // Sélection de fichiers, pas un dossier
  };

  const handleFolderChange = (event) => {
    setSelectedFiles(event.target.files);
    setIsFolder(true); // Sélection d’un dossier
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFiles || selectedFiles.length === 0) return alert("Sélectionne au moins un fichier.");

    const formData = new FormData();
    for (const file of selectedFiles) {
      formData.append("images", file);
    }
    formData.append("format", format);

    const response = await fetch("http://localhost:5000/convert", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.files) {
      const correctedFiles = data.files.map(file => file.replace(/\\/g, "/"));
      setConvertedFiles(correctedFiles);
    }
  };

  const handleConvertUrl = async () => {
    if (!imageUrl) return alert("Entrez une URL d'image.");
    
    const response = await fetch("http://localhost:5000/convert-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl, format }),
    });

    const data = await response.json();
    if (data.file) {
      setConvertedFiles([data.file]); // Ajoute uniquement le fichier converti
    }
  };

  const handleDownload = (fileUrl, fileName) => {
    fetch(fileUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      })
      .catch(error => console.error("Erreur lors du téléchargement :", error));
  };

  const handleDownloadZip = () => {
    const zipUrl = "http://localhost:5000/download-zip";
    const a = document.createElement("a");
    a.href = zipUrl;
    a.download = "converted_images.zip";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div style={{ backgroundImage: `url(${background})` }} className="container-converter">
      <h2>Convertisseur d'images</h2>

      <form onSubmit={handleSubmit}>
        <div>
        <h3>Sélectionner des fichiers</h3>
        <label htmlFor="file-upload" className="custom-file-upload">
          📂 Choisir des fichiers
        </label>
        <input id="file-upload" type="file" multiple onChange={handleFileChange} style={{ display: "none" }} />

        <h3>Ou sélectionner un dossier</h3>
        <label htmlFor="folder-upload" className="custom-file-upload">
          📁 Choisir un dossier
        </label>
        <input id="folder-upload" type="file" multiple webkitdirectory="" directory="" onChange={handleFolderChange} style={{ display: "none" }} />

        <h3>Ou entrer l’URL d’une image</h3>
        <textarea
          type="text"
          placeholder="Entrer une URL d'image"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button type="button" onClick={handleConvertUrl}>Convertir depuis une URL</button>

        <h3>Choisir le format de conversion</h3>
        <select value={format} onChange={(e) => setFormat(e.target.value)}>
          <option value="webp">WEBP</option>
          <option value="jpg">JPG</option>
          <option value="png">PNG</option>
          <option value="gif">GIF</option>
        </select>

        <button type="submit">Convertir</button>
        </div>
      </form>

      {convertedFiles.length > 0 && (
        <>
          <h3>Fichiers convertis :</h3>
          <ul>
            {convertedFiles.map((file, index) => (
              <li key={index}>
                <button onClick={() => handleDownload(`http://localhost:5000${file}`, file.split("/").pop())}>
                  Télécharger {file.split("/").pop()}
                </button>
              </li>
            ))}
          </ul>

          <button onClick={handleDownloadZip}>📦 Télécharger en ZIP</button>
        </>
      )}
    </div>
  );
};

export default ImageConverter;
