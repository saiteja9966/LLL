import React, { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";

export default function App() {
  const [yesClicked, setYesClicked] = useState(false);

  // NO button position
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noMoved, setNoMoved] = useState(false);

  // ✅ EmailJS init (IMPORTANT: this must be PUBLIC KEY not email)
  useEffect(() => {
    emailjs.init("HPNC600ZzKONPW-MU");
  }, []);

  // Escape NO button
  const escapeNo = () => {
    const maxX = window.innerWidth - 150;
    const maxY = window.innerHeight - 120;

    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY);

    setNoPos({ x, y });
    setNoMoved(true);
  };

  // YES click
  const handleYes = () => {
    setYesClicked(true);

    const templateParams = {
      message: "She said YES 💖💍",
    };

    emailjs
      .send("service_0h6debi", "template_4krmymf", templateParams)
      .then(() => console.log("Email sent!"))
      .catch((err) => console.log("Email error:", err));
  };

  return (
    <div className="app">
      {!yesClicked ? (
        <div className="card">
          <h1 className="title">💌 Hi Nannu Will you be my Valentine? 💌</h1>

          <div className="buttons">
            <button className="yesBtn" onClick={handleYes}>
              YES 💖
            </button>

            <button
              className={`noBtn ${noMoved ? "noFloating" : ""}`}
              style={noMoved ? { left: noPos.x, top: noPos.y } : {}}
              onMouseEnter={escapeNo}
              onTouchStart={escapeNo}
            >
              NO 😤
            </button>
          </div>
        </div>
      ) : (
        <div className="yesScreen">
          <h1 className="yayText">YEAHHHH 💖💖💖</h1>
          <p className="subText">Best answer ever 😭✨</p>

          <div className="hearts">
            {Array.from({ length: 40 }).map((_, i) => (
              <span key={i} className="heart">
                💗
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
