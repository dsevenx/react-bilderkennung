import Tesseract from "tesseract.js";

export function KonvertBild(setIsLoading, image, setProgress, setText) {
  return () => {
    setIsLoading("Konvertierung läuft");
    Tesseract.recognize(image, "deu", {
      logger: (m) => {
        console.log(m);
        if (m.status === "recognizing text") {
          setProgress(Math.round(m.progress * 100));
        }
      },
    }).then(({ data: { text } }) => {
      setText(text);
      setIsLoading("Konvertierung beendet");
    });
  };
}
