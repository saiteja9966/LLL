import React, { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";
import rose from "./assets/rose.png";

export default function App() {
  const [yesClicked, setYesClicked] = useState(false);
  const [showFlowers, setShowFlowers] = useState(false);

  // ✅ Loading screen
  const [isLoading, setIsLoading] = useState(false);

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
    // ✅ show loader first
    setIsLoading(true);

    // ✅ Send Email
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

    // ✅ Loading for 3 seconds
    setTimeout(() => {
      setIsLoading(false);
      setShowFlowers(true);

      // 🌸 After 2 seconds show final YES screen
      setTimeout(() => {
        setShowFlowers(false);
        setYesClicked(true);
      }, 2000);
    }, 3000);
  };

  return (
    <div className="app">
      {/* ✅ LOADER SCREEN */}
      {isLoading ? (
        <div className="loadingScreen">
          <img
            src="https://media1.giphy.com/media/v1.Y2lkPTZjMDliOTUyNmg4YTNmcXBuZjRoMzQzeWkzZm54dXl1ZHhlZjBhOXFjcDJ6Ynl3ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/Vj7zA0Gt2MEXuXtQL9/giphy.gif"
            alt="loading gif"
            className="loadingGif"
          />
          <h2 className="loadingText">Waittttt... 💖✨</h2>
        </div>
      ) : (
        <>
          {!yesClicked ? (
            <div className="card">
              <div className="gifContainer">
                <img
                  src="https://media3.giphy.com/media/v1.Y2lkPTZjMDliOTUyNGRwZms1Z2JxeDNxdmdlMmVybXdsMm9nMGRyOTRoa2xqMnkwZHJyZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/YSfrvcbz6e3n0Gvac3/giphy.gif"
                  alt="valentine gif"
                  className="valentineGif"
                />
              </div>

              <h1 className="title">💌 Hi bangaruu Will you be my Valentine? 💌</h1>

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

              {/* 🌸 FLOWER POPUP */}
              {showFlowers && (
                <div className="flowerPopup">
                  <h2 className="flowerText">💐 For You Nannu 💖</h2>
                  <div className="flowers">
                    <img src={rose} alt="rose bouquet" className="flowerImg" />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="yesScreen">
              <div className="gifContainer">
                <img
                  src="https://media3.giphy.com/media/v1.Y2lkPTZjMDliOTUyM2JrcWl6a2UwcWVhZHBkN2RncTIydG1taDJ5NXZsOGhlYzg3cGdiZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/peAFQfg7Ol6IE/giphy.gif"
                  alt="valentine gif"
                  className="valentineGif"
                />
              </div>

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
        </>
      )}
    </div>
  );
}
