import "./App.css";
import React, { useState } from "react";
import { KonvertBild } from "./components/KonvertBild";

function App() {
  const [konvertierStatus, setKonvertierStatus] = useState("Bild wählen");

  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [imagename, setImagename] = useState("");
  const [progress, setProgress] = useState(0);

  const onklickConvert = KonvertBild(
    setKonvertierStatus,
    image,
    setProgress,
    setText
  );

  const onklickNewBild = () => {
    setKonvertierStatus("Bild wählen");
    setText("");
    setImage("");
    setImagename("");
    setProgress(0);
  };

  // col-md-5 mx-auto

  return (
    <div className="container" style={{ height: "100vh" }}>
      <div className="row h-100">
        <div className="d-flex flex-column align-items-center">
          <h1 className="mt-5 mb-5">Bilderkennung by D7X</h1>
          <h2 className="mt-5 mb-5">{konvertierStatus}</h2>

          {!imagename && (
            <div>
              <div className="input-group-btn">
                <label htmlFor="bildfile" className="btn btn-default">
                  Dateiauswahl
                  <input
                    id="bildfile"
                    type="file"
                    style={{ display: "none" }}
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

          {konvertierStatus === "Konvertierung läuft" && (
            <div>
              <p className="text-center">Fortschritt : {progress} Prozent</p>
            </div>
          )}

          {!text && imagename && konvertierStatus !== "Konvertierung läuft" && (
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

          {konvertierStatus === "Konvertierung beendet" && (
            <div>
              <textarea
                className="form-control"
                rows="15"
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
            </div>
          )}

          {konvertierStatus === "Konvertierung beendet" && (
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
