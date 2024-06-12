// app.jsx
import React, { useState, useRef, useEffect } from "react";
import { HexColorPicker } from "react-colorful";

import "../App.css";
import "../globals.css";

const Electrona = () => {
  const [backgroundColor, setBackgroundColor] = useState("bg-background");
  const [maskColor, setMaskColor] = useState("#000000");
  const [maskUrl, setMaskUrl] = useState("electrona.png");
  const canvasRef = useRef(null);

  const handleMaskUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setMaskUrl(reader.result);
      document.getElementById("pictureinput").style.display = "none";
    };
    reader.readAsDataURL(file);
  };

  const Input = React.forwardRef(({ className, type, ...props }, ref) => {
    return (
      (<input
        type={type}
        className=
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        onChange={handleMaskUpload} />)
    );
  })
  Input.displayName = "Input"

  useEffect(() => {
    if (maskUrl && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = maskUrl;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        ctx.globalCompositeOperation = "source-in";
        ctx.fillStyle = maskColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      };
    }
  }, [maskUrl, maskColor]);

  return (
    
    <div className={`App ${backgroundColor.includes("dark") ? "dark" : ""}`} style={{ backgroundColor: backgroundColor }}>
      <div id="total">
        <img src="icon.png" alt="Logo" className="logo" />
        <div
          className="grid w-full max-w-sm items-center gap-1.5"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            strokeWidth: "0px",
          }}
        >
          <canvas ref={canvasRef} />
        </div>
        <div className="bg-background p-4 rounded-lg fixed bottom-5 left-5 shadow-xl shadow-black"></div>
      <div className="bg-background p-4 rounded-lg fixed bottom-5 left-5 shadow-xl shadow-black">
        <div className="flex flex-col items-center">
        <div className="color-picker-container p-2">
          <div>
            <h2>Background Color</h2>
            <HexColorPicker
              color={backgroundColor}
              onChange={setBackgroundColor}
              className="p-3"
            />
            <input
              type="text"
              className="flex text-primary h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              value={backgroundColor}
              onChange={setBackgroundColor}
            />
          </div>
          <div className="pl-6">
            <h2>Mask Color</h2>
            <HexColorPicker color={maskColor} onChange={setMaskColor} className="p-3" />
            <input
              type="text"
              className="flex text-primary h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              value={maskColor}
              onChange={setMaskColor}
            />
          </div>
          </div>
          
        </div>
      </div>
    </div>
    </div>
  );
};

export default Electrona;
