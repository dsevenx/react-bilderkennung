import "./App.css";
import React, { useState } from "react";
import Tesseract from "tesseract.js";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [imagename, setImagename] = useState("");
  const [progress, setProgress] = useState(0);

  const onklickConvert = () => {
    setIsLoading(true);
    Tesseract.recognize(image, "deu", {
      logger: (m) => {
        console.log(m);
        if (m.status === "recognizing text") {
          setProgress(Math.round(m.progress * 100));
        }
      },
    }).then(({ data: { text } }) => {
      setText(text);
      setIsLoading(false);
    });
  };

  const onklickNewBild = () => {
    setIsLoading(false);
    setText("");
    setImage("");
    setImagename("");
    setProgress(0);
  };

  return (
    <div className="container" style={{ height: "100vh" }}>
      <div className="row h-100">
        <div className="col-md-5 mx-auto d-flex flex-column align-items-center">
          {!isLoading && !text && (
            <h1 className="mt-5 mb-5">Bilderkennung by D7X - Bild wählen</h1>
          )}

          {!isLoading && !text && !imagename && (
            <div>
              <div className="input-group-btn">
                <label for="bildfile" className="btn btn-default">
                  Bild auswählen
                  <input
                    id="bildfile"
                    type="file"
                    Style="display:none;"
                    className="form-control btn mt-4"
                    onChange={(event) => {
                      setImage(URL.createObjectURL(event.target.files[0]));
                      setImagename(
                        "konvertiere Bild : " + event.target.files[0].name
                      );
                    }}
                  />
                </label>
              </div>
            </div>
          )}

          {!isLoading && !text && imagename && (
            <div>
              <input
                type="button"
                disabled={image === ""}
                className="form-control btn btn-primary mt-4"
                value={imagename}
                onClick={onklickConvert}
              />
            </div>
          )}

          {isLoading && (
            <div>
              <h1>Bilderkennung by D7X - Bild analysieren</h1>
              <p className="text-center">Fortschritt : {progress} Prozent</p>
            </div>
          )}

          {!isLoading && text && (
            <div>
              <h1>Bilderkennung by D7X - Text zum Bild</h1>
              <textarea
                className="form-control"
                rows="15"
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
            </div>
          )}

          {!isLoading && text && (
            <div>
              <input
                type="button"
                disabled={image === ""}
                className="form-control btn btn-primary mt-4"
                value="neues Bild"
                onClick={onklickNewBild}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
