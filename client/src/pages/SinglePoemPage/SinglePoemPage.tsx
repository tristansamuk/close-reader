import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./SinglePoemPage.scss";
import TeachIcon from "../../components/TeachIcon/TeachIcon";

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

// svg fill color

const fill = "#FFFAF1";

const SinglePoemPage = ({ apiUrl }: Props) => {
  // Set poem's state as an empty string
  const [poem, setPoem] = useState<Poem | null>(null);
  const { title } = useParams();
  // On render, make a get request to api and use reponse to update state
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
      <button className="poem__analyze">
        <TeachIcon fill={fill} />
      </button>
    </div>
  );
};

export default SinglePoemPage;
