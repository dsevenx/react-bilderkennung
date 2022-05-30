import "./App.css";
import React, { useState } from "react";
import { KonvertBild } from "./components/KonvertBild";
import ImageFilter from "react-image-filter";

function App() {
  const [konvertierStatus, setKonvertierStatus] = useState("Bild wählen");

  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [imagename, setImagename] = useState("");
  const [progress, setProgress] = useState(0);
  const [imageFeld, setImageFeld] = useState([]);

  const onklickConvert = KonvertBild(
    setKonvertierStatus,
    //image,
    document.getElementById("idbild_opti1"),
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

  const filternone = [
    // R
    1,
    0,
    0,
    0,
    0,
    // G
    0,
    1,
    0,
    0,
    0,
    // B
    0,
    0,
    1,
    0,
    0,
    // alpha
    0,
    0,
    0,
    1,
    0,
  ];

  // col-md-5 mx-auto

  return (
    <div className="container" style={{ height: "100vh" }}>
      <div className="row h-5">
        <div className="d-flex flex-column align-items-center">
          <h1 className="mt-5 mb-5">Bilderkennung by D7X</h1>
          <h2 className="mt-5 mb-5">{konvertierStatus}</h2>

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
        </div>

        <div class="container">
          <div class="row">
            <div class="col-sm-4">
              <div>
                <div className="input-group-btn">
                  <label
                    htmlFor="bildfile"
                    className="btn btn-primary mt-4 mb-5"
                  >
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

                        var myImage = new Image(400, 200);
                        /*
                        var myImage = URL.createObjectURL(
                          event.target.files[0]
                        );
                        myImage.style.filter =
                          "brightness(1.55) contrast(1.15)";
                           myImage.className = {
                            filter: "brightness(1.55) contrast(1.15)",
                          };
                        setImageFeld([myImage]);

             class Example extends Component {
  render() {
    return (
      <ImageFilter
        image='https://source.unsplash.com/random/1200x800'
        filter={ 'duotone' } // see docs beneath
        colorOne={ [40, 250, 250] }
        colorTwo={ [250, 150, 30] }
      />
    );
  }
}
                        */

                        var fr = new FileReader();
                        fr.onload = function () {
                          myImage = fr.result;

                          //myImage.style.filter = "brightness(1.55)";

                          setImageFeld([myImage]);
                        };
                        fr.readAsDataURL(event.target.files[0]);

                        // myImage.src = URL.createObjectURL(
                        //   event.target.files[0]
                        // );
                      }}
                    />
                  </label>
                </div>
                <div class="col-sm-4">
                  {imagename && (
                    <div>
                      <img
                        src={image}
                        width="400"
                        alt="Bild fehlt"
                        className="opti1"
                        id="idbild_opti1"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div class="col-sm-4">
              <div className="mb-5">
                <input
                  type="button"
                  disabled={image === ""}
                  style={{ visibility: "hidden" }}
                  className="form-control btn btn-primary mt-4"
                  value="neues Bild"
                  onClick={onklickNewBild}
                />
              </div>
              <div>
                <div></div>
                {imagename && imageFeld && imageFeld.length > 0 && (
                  <div>
                    {/* {imageFeld.length}*/}

                    <img src={imageFeld[0]} width="400" alt="Bild fehlt" />

                    <ImageFilter
                      image={imageFeld[0]}
                      filter={filternone}
                      className="opti1"
                    />
                    {/*
                    <img
                      src="https://picsum.photos/300/200"
                      width="400"
                      alt="Bild fehlt"
                    />
                       */}
                  </div>
                )}
              </div>
            </div>

            <div class="col-sm-4">
              {konvertierStatus === "Konvertierung beendet" && (
                <div className="mb-5">
                  <input
                    type="button"
                    disabled={image === ""}
                    className="form-control btn btn-primary mt-4"
                    value="neues Bild"
                    onClick={onklickNewBild}
                  />
                </div>
              )}
              <div>
                {konvertierStatus === "Konvertierung beendet" && (
                  <div className="ml-5">
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
        </div>
      </div>
    </div>
  );
}

export default App;
