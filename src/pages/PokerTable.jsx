import React, { useContext, useState, useEffect } from "react";
import { WebSocketContext } from "../utils/WebSocketProvider";
import "./PokerTable.css";

const PokerTable = () => {
  const { stompClient, isConnected } = useContext(WebSocketContext);
  const [pot, setPot] = useState(0);
  const [communityCards, setCommunityCards] = useState([]);
  const [playerActions, setPlayerActions] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState("Player1");
  const [winner, setWinner] = useState(null);
  const username = sessionStorage.getItem("username");
  
  useEffect(() => {
    if (isConnected && stompClient) {
      stompClient.subscribe("/topic/game-updates", (message) => {
        const data = JSON.parse(message.body);
        handleGameUpdate(data);
      });
    }
  }, [isConnected, stompClient]);

  const handleGameUpdate = (data) => {
    switch (data.type) {
      case "POT_UPDATE":
        setPot(data.pot);
        break;
      case "COMMUNITY_CARDS":
        setCommunityCards(data.cards);
        break;
      case "PLAYER_ACTION":
        setPlayerActions((prev) => [...prev, data.message]);
        break;
      case "PLAYER_TURN":
        setCurrentPlayer(data.player);
        break;
      case "WINNER_ANNOUNCEMENT":
        setWinner(data.winner);
        break;
      default:
        console.warn("Unknown message type:", data.type);
    }
  };

  const handleBet = () => {
    if (isConnected && stompClient && currentPlayer === "Player1") {
      stompClient.publish({
        destination: "/app/end-game",
        body: JSON.stringify({ player:username, amount: 50 }),
      });
    }
  };

  const handleDealCards = () => {
    if (isConnected && stompClient) {
      stompClient.publish({
        destination: "/app/community-cards",
      });
    }
  };

  return (
    <div className="poker-table">
      <h1>Poker Table</h1>
      <div className="pot">Pot: ${pot}</div>

      <h3>Community Cards:</h3>
      <div className="community-cards">
        {communityCards.map((card, index) => (
          <div key={index} className={`card deal-animation-${index}`}>{card}</div>
        ))}
      </div>

      <h3>Current Turn: {currentPlayer}</h3>
      <h3>Player Actions:</h3>
      <div className="player-actions">
        {playerActions.map((action, index) => (
          <p key={index}>{action}</p>
        ))}
      </div>

      {winner && <h2 className="winner-announcement">🏆 Winner: {winner} 🏆</h2>}

      <div className="actions">
        <button onClick={handleBet} disabled={currentPlayer !== "Player1"}>
          Bet 50
        </button>
        <button onClick={handleDealCards}>Deal Community Cards</button>
      </div>
    </div>
  );
};

export default PokerTable;
