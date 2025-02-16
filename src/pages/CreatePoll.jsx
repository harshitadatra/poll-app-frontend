import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/CreatePoll.css";

const CreatePoll = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]);
  const navigate = useNavigate();

  const addOption = () => {
    if (options.length < 5) {
      setOptions([...options, ""]);
    } else {
      alert("You can add up to 5 options only.");
    }
  };

  const removeOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleSubmit = async () => {
    if (question.trim() === "" || options.some((opt) => opt.trim() === "")) {
      alert("Please enter a question and at least two options.");
      return;
    }

    const token = localStorage.getItem("token"); // Retrieve JWT token

    if (!token) {
      alert("You need to log in first.");
      return;
    }
    console.log("Token Sent:", token);
    try {
      await axios.post(
        "http://localhost:5000/api/polls",
        { question, options },
        { headers: { Authorization: `Bearer ${token}` } } // Send token in headers
      );
      navigate("/");
    } catch (error) {
      console.error("Error creating poll:", error.response?.data || error.message);
    }
  };


  return (
    <div className="create-poll-container">
      <h2>Create a Poll</h2>
      <input 
        type="text" 
        placeholder="Enter your question" 
        value={question} 
        onChange={(e) => setQuestion(e.target.value)}
      />

      <div className="option-list">
        {options.map((option, index) => (
          <div key={index} className="option-item">
            <input 
              type="text" 
              placeholder={`Option ${index + 1}`} 
              value={option} 
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
            {options.length > 1 && (
              <button onClick={() => removeOption(index)}>X</button>
            )}
          </div>
        ))}
      </div>

      <button className="add-option-button" onClick={addOption}>Add Option</button>
      <button className="submit-button" onClick={handleSubmit}>Create Poll</button>
    </div>
  );
};

export default CreatePoll;
