import { useState, useEffect } from "react";
import axios from "axios";
import RobotIcon from "../RobotIcon/RobotIcon";
import "./Analysis.scss";

// Types

interface Props {
  title: string;
  author: string;
  OpenAIUrl: string;
  apiKey: string;
}

interface Body {
  model: string;
  messages: {
    role: string;
    content: string;
  }[];
  temperature: number;
  max_tokens?: number;
  stream?: boolean;
}

const Analysis = ({ title, author, OpenAIUrl, apiKey }: Props) => {
  const [text, setText] = useState<string | null>(null);

  // Request body and headers

  const body: Body = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are poetry expert. When you receive a poem title, please generate a short interpretive analysis that will help a reader understand what the poem is about, any interesting things to pay attention to, and situate the poem in its historical or biographical context. Never include a heading in your response",
      },
      {
        role: "user",
        content: `${title} by ${author}`,
      },
    ],
    temperature: 0.7,
  };

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await axios.post(`${OpenAIUrl}`, body, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        });
        const analysis: string = response.data.choices[0].message.content;
        setText(analysis);
      } catch (error) {
        console.log(error);
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
