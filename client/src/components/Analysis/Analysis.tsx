// import axios from "axios";
import "./Analysis.scss";
import closeIcon from "../../assets/images/icons/cross-1.svg";

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

// This has to be part of the parent element in order to change its display state

const Analysis = ({ title, author }: Props) => {
  return (
    <div className="analysis__window">
      <button className="analysis__close-icon">
        <img src={closeIcon} alt="close" />
      </button>
      <p className="analysis__text">
        {`Here's an analysis of ${title} by ${author}`}
      </p>
    </div>
  );
};

export default Analysis;
