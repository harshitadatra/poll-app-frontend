import { useEffect, useState } from "react";
import axios from "axios";
import PollCard from "../components/PollCard";

const Polls = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const fetchPolls = async () => {
      const { data } = await axios.get("http://localhost:5000/api/polls");
      setPolls(data);
    };
    fetchPolls();
    const interval = setInterval(fetchPolls, 5000);
    return () => clearInterval(interval);
  }, []);

  // const vote = async (pollId, optionIndex) => {
  //   await axios.post(`http://localhost:5000/api/polls/${pollId}/vote`, { optionIndex });
  // };
  const vote = async (pollId,optionIndex) => {
    if (optionIndex === null) {
      alert("Please select an option!");
      return;
    }

    const token = localStorage.getItem("token"); // Ensure token is sent

    try {
      const response = await axios.post(
        `http://localhost:5000/api/polls/${pollId}/vote`,
        { optionIndex},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Vote Successful!");
      console.log("Updated Poll:", response.data);
    } catch (error) {
      console.error("Error voting:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Error voting!");
    }
  };

  return (
    <div className="container">
      <h2>Polls</h2>
      {polls.map((poll) => <PollCard key={poll._id} poll={poll} vote={vote} />)}
    </div>
  );
};

export default Polls;
