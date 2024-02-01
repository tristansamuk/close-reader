import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./SinglePoemPage.scss";
import RobotIcon from "../../components/RobotIcon/RobotIcon";
import closeIcon from "../../assets/images/icons/cross-1.svg";
import Analysis from "../../components/Analysis/Analysis";

// Types

type Props = {
  apiUrl: string;
};
interface Poem {
  title: string;
  author: string;
  lines: string[];
  linecount: string;
}
[];

// Base URL for server (change to .env variable)
const baseUrl = "http://localhost:8080";

const SinglePoemPage = ({ apiUrl }: Props) => {
  const { title } = useParams();

  // State for poem and analysis window
  const [poem, setPoem] = useState<Poem | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  // Click Handlers

  const onClickButton = () => {
    setIsOpen(true);
    setIsButtonVisible(false);
  };

  const onClickClose = () => {
    setIsOpen(false);
    setIsButtonVisible(true);
  };

  // OpenAI Get Function

  const getAnalysis = async () => {
    const options = {
      method: "POST",
      body: {
        message: "how are you?",
      },
    };

    try {
      const response = await axios.get(`${baseUrl}/completions`, options);
      const analysis = response.data;
      console.log(analysis);
    } catch (error) {
      console.error(error);
    }
  };

  // On render, makes a get request to API and uses reponse to update state

  useEffect(() => {
    const fetchPoem = async () => {
      try {
        const response = await axios.get(`${apiUrl}/title/${title}`);
        setPoem(response.data[0]);
      } catch (error) {
        console.error("Error fetching poem: ", error);
      }
    };
    fetchPoem();
  }, []);

  // Show loading state while waiting for API call to update state of `poem`

  if (!poem) {
    return (
      <div className="poem__loading-container">
        <h2 className="poem__loading-text">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="poem__max-width-container">
      <h2 className="poem__title appear-1">{poem.title}</h2>
      <h3 className="poem__author appear-2">{poem.author}</h3>
      <div className="poem__lines-container appear-3">
        {poem.lines.map((line, index) => (
          <p className="poem__line" key={index}>
            {line}
          </p>
        ))}
      </div>

      {/* When state of isOpen = true, open analysis window */}
      {isOpen && (
        <div className="analysis__window">
          <button onClick={onClickClose} className="analysis__close-icon">
            <img src={closeIcon} alt="close" />
          </button>
          <Analysis baseUrl={baseUrl} author={poem.author} title={poem.title} />
        </div>
      )}
      {/* Analysis button is visible only when analysis window is closed */}

      {isButtonVisible && (
        <button onClick={onClickButton} className="poem__analysis-button">
          <RobotIcon fill={"#FFFFFF"} height={"24"} width={"24"} />
        </button>
      )}
    </div>
  );
};

export default SinglePoemPage;
