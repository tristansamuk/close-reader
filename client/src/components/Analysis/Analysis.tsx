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
        console.log(response);
        const foundAnalysis = response.data[0].analysis;
        setText(foundAnalysis);
      } catch (error) {
        console.log("Error fetching: ", error);
      }
    };
    fetchAnalysis();
  }, []);

  // Loading state

  if (!text) {
    return (
      <div className="analysis__loading-container">
        <div className="analysis__loading-icon">
          <RobotIcon fill={"#000000"} height={"32"} width={"32"} />
        </div>
        <h3 className="analysis__loading-text">Analyzing...</h3>
      </div>
    );
  }

  return <p className="analysis__text">{`${text}`}</p>;
};

export default Analysis;
