// App.js
import React from "react";
import "./App.css";
import FishGame from "./FishGame";

function App() {
  return (
    <div className="app">
      <h1 className="title">鯖ゲー</h1>
      <div className="rule-text">
        <p>画面上に表示される魚の中から、<strong>鯖だけ</strong>をクリックしましょう。</p>
        <p>制限時間は30秒で、鯖を5匹捕まえるか、時間切れでゲーム終了です。</p>
        <p>鯖以外の魚をクリックした場合、その魚の読み方が表示されます。</p>
      </div>
      <div className="game-container">
        <FishGame />
      </div>
    </div>
  );
}

export default App;
