import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./SinglePoemPage.scss";

const SinglePoemPage = ({ apiUrl }: { apiUrl: string }) => {
  // Set poem's state as an empty string
  const [poem, setPoem] = useState(null);
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
  console.log(poem);
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
      <div className="poem__container--lines">
        {poem.lines.map((line, index) => (
          <p className="poem__line appear-3" key={index}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SinglePoemPage;
