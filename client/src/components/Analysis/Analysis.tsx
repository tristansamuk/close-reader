import { useState, useEffect } from "react";
import axios from "axios";
import RobotIcon from "../RobotIcon/RobotIcon";
import "./Analysis.scss";

// Types

interface Props {
  title: string;
  poetryApiUrl: string;
}

const Analysis = ({ title, poetryApiUrl }: Props) => {
  const [text, setText] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await axios.get(`${poetryApiUrl}/analyses/${title}`);
        const foundAnalysis = response.data[0].analysis;
        setText(foundAnalysis);
      } catch (error) {
        console.log("Error fetching analysis: ", error);
      }
    };
    setTimeout(() => {
      // Simulates loading a response directly from Chat-GPT when fetching from database
      fetchAnalysis();
    }, 2250);
  }, []);

  // Loading state

  if (!text) {
    return (
      <div className="analysis__loading-container">
        <div className="analysis__loading-icon">
          <RobotIcon fill={"#808080"} height={"32"} width={"32"} />
        </div>
        <h3 className="analysis__loading-text">Close reading...</h3>
      </div>
    );
  }

  return (
    <div className="analysis__container">
      <h3 className="analysis__heading">Analysis</h3>
      <p className="analysis__text">{`${text}`}</p>
    </div>
  );
};

export default Analysis;
