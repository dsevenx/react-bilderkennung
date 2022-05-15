import "./App.css";
import React, { useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(50);

  return (
    <div className="container" style={{ height: "100vh" }}>
      <div className="row h-100">
        <div className="col-md-5 mx-auto d-flex flex-column align-items-center">
          {!isLoading && (
            <h1 className="mt-5 mb-5">
              Learn React by D7X Neu Image To Text (!isLoading)
            </h1>
          )}

          {!isLoading && !text && (
            <div>
              <input
                type="file"
                className="form-control"
                onChange={(event) =>
                  setImage(URL.createObjectURL(event.value.filege[0]))
                }
              />
              <input
                type="button"
                className="form-control btn btn-primary mt-4"
                value="konvertiere Bild"
              />
            </div>
          )}

          {isLoading && (
            <div>
              <h1>
                Learn React by D7X New Image To Text (!isLoading) 111
                Fortschrittsbalken
              </h1>
              <p className="text-center">
                Fortschritt des Konvertierens: {progress} Prozent
              </p>
            </div>
          )}

          {!isLoading && text && (
            <div>
              <h1>
                Learn React by D7X New Image To Text (!isLoading) 222 text
              </h1>
              <textarea
                className="form-control"
                rows="15"
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
