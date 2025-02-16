import "../styles/PollCard.css";

const PollCard = ({ poll, vote }) => {
  return (
    <div className="poll-card">
      <h3>{poll.question}</h3>
      {poll.options.map((opt, index) => (
        <button key={index} className="poll-option" onClick={() => vote(poll._id, index)}>
          {opt.text} ({opt.votes} votes)
        </button>
      ))}
    </div>
  );
};

export default PollCard;
