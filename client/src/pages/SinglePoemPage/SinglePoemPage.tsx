import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./SinglePoemPage.scss";
import RobotIcon from "../../components/RobotIcon/RobotIcon";
import closeIcon from "../../assets/images/icons/cross-1.svg";
import Analysis from "../../components/Analysis/Analysis";

// Types

type Props = {
  poetryApiUrl: string;
};

interface PoemInfo {
  first_name: string;
  last_name: string;
  title: string;
  pub_year: number;
}

// Variables for OpenAI API

const OpenAIUrl = "https://api.openai.com//v1/chat/completions";
const apiKey = `${import.meta.env.VITE_API_KEY}`;

const SinglePoemPage = ({ poetryApiUrl }: Props) => {
  const { title } = useParams();

  // Initial state for page elements

  const [poemInfo, setPoemInfo] = useState<PoemInfo | null>(null); // set type here
  const [poem, setPoem] = useState<string[]>([""]);
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

  // Make a GET request to database using url param stored in `title` to update state of author and title

  useEffect(() => {
    const fetchTitleAndAuthor = async (titleParam: string) => {
      try {
        const response = await axios.get(`${poetryApiUrl}/poems/info/${title}`);
        setPoemInfo(response.data[0]);
        console.log(poemInfo);
      } catch (error) {
        console.error("Error fetching title and poet name: ", error);
      }
    };
    fetchTitleAndAuthor(title);
  }, []);

  // Make a GET request to database and use the reponse to set the state of `poem`

  useEffect(() => {
    const fetchPoem = async () => {
      try {
        const response = await axios.get(
          `${poetryApiUrl}/poems/titles/${title}`
        );
        const poemData = response.data;

        // Create an empty array to hold the lines of the poem

        let linesArray: string[] = [];

        // Take the values for `lns` (strings) in `poemData` and push them to `linesArray`

        const createLinesArray = (poem: any) => {
          for (let i = 0; i < poemData.length; i++) {
            linesArray.push(poem[i].lns);
          }
          return linesArray;
        };
        createLinesArray(poemData);

        // Set the state of `poem` to `linesArray`

        setPoem(linesArray);
      } catch (error) {
        console.error("Error fetching poem: ", error);
      }
    };
    fetchPoem();
  }, []);

  // Show a loading state while waiting for the GET request to update state of `poem`

  if (!poem) {
    return (
      <div className="poem__loading-container">
        <h2 className="poem__loading-text">Loading...</h2>
      </div>
    );
  }

  return (
    <>
      <div className="poem__max-width-container">
        <div className="poem__heading-button-container">
          <div className="poem__title-author-container">
            <h2 className="poem__title appear-1">{poemInfo?.title}</h2>
            <h3 className="poem__author appear-2">{`${poemInfo?.first_name} ${poemInfo?.last_name}`}</h3>
          </div>
          {isButtonVisible && (
            <button
              onClick={onClickButton}
              className="poem__analysis-button--desktop"
            >
              <RobotIcon fill={"#FFFFFF"} height={"24"} width={"24"} />
            </button>
          )}
        </div>
        <div className="poem__lines-container appear-3">
          {poem.map((line, index) => (
            <p className="poem__line" key={index}>
              {line}
            </p>
          ))}
        </div>

        {/* When state of `isOpen` is `true`, open the analysis window */}

        {isOpen && (
          <>
            <div className="analysis__window">
              <button onClick={onClickClose} className="analysis__close-icon">
                <img src={closeIcon} alt="close" />
              </button>
              <Analysis
                title={poemInfo.title}
                author={poemInfo.poet}
                OpenAIUrl={OpenAIUrl}
                apiKey={apiKey}
              />
            </div>
            <div className="analysis__overlay"></div>
          </>
        )}
      </div>

      {/* Only show the Analysis button when the analysis window is closed */}

      {isButtonVisible && (
        <button onClick={onClickButton} className="poem__analysis-button">
          <RobotIcon fill={"#FFFFFF"} height={"24"} width={"24"} />
        </button>
      )}
    </>
  );
};

export default SinglePoemPage;
