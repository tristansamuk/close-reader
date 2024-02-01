// import axios from "axios";
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

const Analysis = ({ title, author }: Props) => {
  const [text, setText] = useState<Analysis | null>(null);

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
