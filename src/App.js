import React, { useEffect, useMemo, useState } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";

export default function App() {
  const [yesClicked, setYesClicked] = useState(false);

  // NO button escape
  const [noMoved, setNoMoved] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  // hearts array
  const hearts = useMemo(() => Array.from({ length: 28 }), []);

  // ✅ EmailJS init (put your PUBLIC KEY)
  useEffect(() => {
    emailjs.init("YOUR_PUBLIC_KEY");
  }, []);

  const escapeNo = () => {
    const padding = 18;

    const btnW = 150;
    const btnH = 56;

    const maxX = window.innerWidth - btnW - padding;
    const maxY = window.innerHeight - btnH - padding;

    const x = Math.floor(Math.random() * Math.max(maxX, 0));
    const y = Math.floor(Math.random() * Math.max(maxY, 0));

    setNoPos({ x, y });
    setNoMoved(true);
  };

  const handleYes = () => {
    setYesClicked(true);

    // ✅ Send automatic email
    emailjs
      .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        message: "She said YES 💖💍",
        to_email: "saitejabudda@gmail.com", // 👈 your email
      })
      .then(() => console.log("Email sent 💌"))
      .catch((err) => console.log("Email error:", err));
  };

  return (
    <div className="page">
      <div className="bgGlow a" />
      <div className="bgGlow b" />
      <div className="bgGlow c" />

      {!yesClicked ? (
        <div className="card">
          <div className="badge">💌 Valentine Proposal</div>

          <h1 className="title">Hi Nannu 💖</h1>
          <p className="subtitle">Will you be my Valentine?</p>

          <div className="btnRow">
            <button className="btn yes" onClick={handleYes}>
              YES 💖
            </button>

            <button
              className={`btn no ${noMoved ? "floating" : ""}`}
              style={noMoved ? { left: noPos.x, top: noPos.y } : {}}
              onMouseEnter={escapeNo}
              onTouchStart={escapeNo}
            >
              NO 😤
            </button>
          </div>

          <p className="hint">
            Tip: Try to press <b>NO</b> 😌
          </p>
        </div>
      ) : (
        <div className="success">
          <div className="successCard">
            <div className="ring">💍</div>
            <h1 className="yay">YEAHHHH 💖💖💖</h1>
            <p className="yaySub">
              Best answer ever 😭✨ <br />
              <span>Mail sent successfully 💌</span>
            </p>

            <button
              className="btn again"
              onClick={() => {
                setYesClicked(false);
                setNoMoved(false);
              }}
            >
              Ask Again 😄
            </button>
          </div>

          <div className="hearts">
            {hearts.map((_, i) => (
              <span
                key={i}
                className="heart"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  fontSize: `${18 + Math.random() * 18}px`,
                }}
              >
                💗
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
