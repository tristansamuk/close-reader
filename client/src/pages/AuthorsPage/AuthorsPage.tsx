import "./AuthorsPage.scss";
import { useState, useEffect } from "react";
import axios from "axios";

// Types

interface Props {
  poetryApiUrl: string;
}

const AuthorsPage = ({ poetryApiUrl }: Props) => {
  const [authorsList, setAuthorsList] = useState("");

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get(`${poetryApiUrl}/author`);
        setAuthorsList(response.data.authors);
        console.log(authorsList);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAuthors();
  }, []);

  return (
    <div className="authors-page__container--max-width">
      <h2 className="authors-page__heading">Authors</h2>
      <div className="authors-page__container--list">
        <div className="authors-page__row">
          <h3 className="authors-page__name">William Wordsworth</h3>
        </div>
      </div>
    </div>
  );
};

export default AuthorsPage;
