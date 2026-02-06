import React, { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";

// ✅ Import bouquet image
import rose from "./assets/rose.png";

export default function App() {
  const [yesClicked, setYesClicked] = useState(false);
  const [showFlowers, setShowFlowers] = useState(false);

  // NO button position
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noMoved, setNoMoved] = useState(false);

  useEffect(() => {
    emailjs.init("HPNC600ZzKONPW-MU");
  }, []);

  const escapeNo = () => {
    const maxX = window.innerWidth - 150;
    const maxY = window.innerHeight - 120;

    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY);

    setNoPos({ x, y });
    setNoMoved(true);
  };

  const handleYes = () => {
    setShowFlowers(true);

    const templateParams = {
      message: "She said YES 💖💍",
    };

    emailjs
      .send(
        "service_0h6debi",
        "template_4krmymf",
        templateParams,
        "HPNC600ZzKONPW-MU"
      )
      .then(() => console.log("✅ Email sent!"))
      .catch((err) => console.log("❌ Email error:", err));

    setTimeout(() => {
      setShowFlowers(false);
      setYesClicked(true);
    }, 2000);
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

          {/* 🌹 REAL ROSE POPUP */}
          {showFlowers && (
            <div className="flowerPopup">
              <h2 className="flowerText">For You Nannu 💖</h2>

              <img
                src={rose}
                alt="Rose Bouquet"
                className="roseImage"
              />
            </div>
          )}
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
