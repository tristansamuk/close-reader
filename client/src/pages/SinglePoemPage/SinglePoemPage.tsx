import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

interface Props {
  apiUrl: string;
}

const SinglePoemPage: React.FC<Props> = ({ apiUrl }) => {
  const [poem, setPoem] = useState(null);
  const { title } = useParams();
  console.log(title);

  useEffect(() => {
    const fetchPoem = async () => {
      try {
        let response = await axios.get(`${apiUrl}/title/${title}`);
        setPoem(response.data[0].lines);
      } catch (error) {
        console.log(`Error fetching poem: ${error}`);
      }
    };
    fetchPoem();
  }, [title]);
  console.log(poem);

  return (
    <div>
      <h2>Single Poem</h2>
    </div>
  );
};

export default SinglePoemPage;
