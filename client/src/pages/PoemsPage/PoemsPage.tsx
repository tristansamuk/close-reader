import { Link } from "react-router-dom";
import "./PoemsPage.scss";
import { useState, useEffect } from "react";
import axios from "axios";

// Types

interface Props {
  poetryApiUrl: string;
}

interface Poem {
  id: number;
  title: string;
  short_title: string;
  first_name: string;
  last_name: string;
  pub_year: number;
}

const baseUrl = "http://localhost:5173";

const PoemsPage = ({ poetryApiUrl }: Props) => {
  const [poemsList, setPoemsList] = useState<Poem[] | null>(null);

  useEffect(() => {
    const fetchPoems = async () => {
      try {
        const response = await axios.get(`${poetryApiUrl}/poems/all`);
        setPoemsList(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPoems();
  });

  if (!poemsList) {
    return (
      <div className="poems-page__loading-container">
        <h2 className="poems-page__loading-text">Loading...</h2>
      </div>
    );
  }
  return (
    <div className="poems-page__container--max-width">
      <h2 className="poems-page__heading">Poems</h2>
      <div className="poems-page__container--list">
        {poemsList.map((poem: Poem) => {
          return (
            <div key={poem.id} className="poems-page__row">
              <Link to={`${baseUrl}/poems/${poem.short_title}`}>
                <h4 className="poems-page__title">{`${poem.title}`}</h4>
                <div className="poems-page__container--name-year">
                  <p
                    key={poem.title}
                    className="poems-page__name"
                  >{`${poem.first_name} ${poem.last_name}`}</p>
                  <p key={poem.short_title} className="poems-page__year">
                    {`${poem.pub_year}`}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PoemsPage;
