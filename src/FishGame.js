// src/FishGame.js
import React, { useState, useEffect, useRef } from 'react';
import Modal from "react-modal";
import "./FishGame.css";

const fishChars = [
  "鮭", "鮫", "鯵", "鰹", "鰤", "鱈", "鰻", "鰯", "鱒",
  "鮪", "鯛", "鰌", "鯱", "鯰", "鯡", "鰕", "鰆", "鰈", "鱧",
  "鮒", "鮟", "鰺", "鰥", "鯔", "鱚", "鰍", "鮴", "鰭"
];


const totalMackerels = 5;
const gameTime = 30;

Modal.setAppElement("#root");

const FishGame = () => {
  const [started, setStarted] = useState(false);
  const [fishGrid, setFishGrid] = useState([]);
  const [timer, setTimer] = useState(gameTime);
  const [mackerelsClicked, setMackerelsClicked] = useState(0);
  const [modalText, setModalText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const timerInterval = useRef(null);

  useEffect(() => {
    if (started && timer > 0) {
      const timerId = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(timerId);
    }
    if (started && timer === 0) {
      setModalText("GAME OVER");
      setIsModalOpen(true);
    }
  }, [started, timer]);

  useEffect(() => {
    if (timer === 0 || mackerelsClicked === 5) {
      clearInterval(timerInterval.current);
      if (mackerelsClicked === 5) {
        setModalText("CLEAR");
      } else {
        setModalText("GAME OVER");
      }
      setIsModalOpen(true);
    }
  }, [timer, mackerelsClicked]);
  

  const generateFishGrid = () => {
    const grid = [];
    let mackerelsPlaced = 0;
    const gridSize = 100; // 10x10 grid

    while (mackerelsPlaced < totalMackerels) {
      const index = Math.floor(Math.random() * gridSize);
      if (grid[index] === undefined) {
        grid[index] = "鯖";
        mackerelsPlaced++;
      }
    }

    for (let i = 0; i < gridSize; i++) {
      if (grid[i] === undefined) {
        const randomFish = fishChars[Math.floor(Math.random() * fishChars.length)];
        grid[i] = randomFish;
      }
    }

    return grid;
  };

  const showModal = (text) => {
    setModalText(text);
    setIsModalOpen(true);
  };

  const startGame = () => {
    setStarted(true);
    setFishGrid(generateFishGrid());
    setTimer(gameTime);
    setMackerelsClicked(0);
  };

  const handleFishClick = (index) => {
    if (fishGrid[index] === "鯖") {
      const newFishGrid = [...fishGrid];
      newFishGrid[index] = "";
      setFishGrid(newFishGrid);
      setMackerelsClicked(mackerelsClicked + 1);
    }
  };
  

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const retry = () => {
    closeModal();
    startGame();
  };

  const shareOnTwitter = () => {
    const text = modalText === "CLEAR" ? "I just cleared" : "I couldn't clear";
    const url = encodeURIComponent(`${text} the Mackerel Game! 🐟 #鯖ゲー`);
    window.open(`https://twitter.com/intent/tweet?text=${url}`);
  };
  return (
    <div className="fish-game">
      {!started ? (
        <button className="start-btn" onClick={startGame}>
          START!
        </button>
      ) : (
        <>
          <div className="status-bar">
            <div className="mackerels-clicked">Clicked: {mackerelsClicked}</div>
            <div className="timer">Time: {timer}s</div>
          </div>
          <div className="fish-grid">
            {fishGrid.map((fish, index) => (
              <button
                key={index}
                className="fish-cell"
                disabled={fish === "" || timer === 0}
                onClick={() => handleFishClick(index)}
              >
                {fish}
              </button>
            ))}
          </div>
        </>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="overlay"
      >
        <h2>{modalText}</h2>
        <button className="retry-btn" onClick={retry}>
          RETRY
        </button>
        <button className="share-btn" onClick={shareOnTwitter}>
          Share
        </button>
      </Modal>
    </div>
  );
};

export default FishGame;