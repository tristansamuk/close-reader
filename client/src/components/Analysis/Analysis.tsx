import axios from "axios";
import RobotIcon from "../RobotIcon/RobotIcon";
import "./Analysis.scss";
import { useState } from "react";

type Props = {
  title: string;
  author: string;
};

interface Analysis {
  choices: {
    index: number;
    messages: {
      role: string;
      content: string;
    };
  };
}
[];

// Base URL for server (change to .env variable)

const baseUrl = "http://localhost:8080";

const Analysis = ({ title, author }: Props) => {
  const [text, setText] = useState<Analysis | null>(null);

  const options = {
    method: "POST",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    body: {
      message: "What is poetry?",
    },
  };

  const getAnalysis = async () => {
    try {
      const response = await axios.get(`${baseUrl}/completions`, options);
      const analysis = response.data;
      console.log(analysis);
    } catch (error) {
      console.error(error);
    }
  };

  // Loading state

  if (!text) {
    return (
      <div className="analysis__loading">
        <RobotIcon fill={"#666666"} height={"48"} width={"48"} />
      </div>
    );
  }

  //   return (
  //       <p className="analysis__text">
  //         {`Sample analysis: ${text}`}
  //       </p>
  //   );
};

export default Analysis;
