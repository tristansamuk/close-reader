import { Link } from "react-router-dom";
import "./PoemsPage.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../../components/Pagination/Pagination";

// Types

interface Props {
  poetryApiUrl: string;
  clientUrl: string;
}

interface Poem {
  id: number;
  title: string;
  shortTitle: string;
  firstName: string;
  lastName: string;
  pubYear: number;
}

const PoemsPage = ({ poetryApiUrl, clientUrl }: Props) => {
  const [poemsList, setPoemsList] = useState<Poem[] | null>(null);

  // State for pagination

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [poemsPerPage] = useState<number>(10);

  // On render, get a list of all the poems in the database and store in state

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
  }, []);

  if (!poemsList) {
    return (
      <div className="poems-page__loading-container">
        <h2 className="poems-page__loading-text">Loading...</h2>
      </div>
    );
  }

  // Create array of poems to be displayed on current page

  const indexOfLastPoem = currentPage * poemsPerPage;
  const indexOfFirstPoem = indexOfLastPoem - poemsPerPage;
  const currentPoems = poemsList.slice(indexOfFirstPoem, indexOfLastPoem);

  // Focuses window on top of page on render

  window.scrollTo(0, 0);
  return (
    <div className="poems-page__container--max-width">
      <h2 className="poems-page__heading">Poems</h2>
      <div className="poems-page__container--list">
        {/* Renders the list of poems */}
        {currentPoems.map((poem: Poem) => {
          return (
            <div key={poem.id} className="poems-page__row">
              <Link to={`${clientUrl}/poems/${poem.shortTitle}`}>
                <h4 className="poems-page__title">{`${poem.title}`}</h4>
              </Link>
              <div className="poems-page__container--name-year">
                <p
                  key={poem.title}
                  className="poems-page__name"
                >{`${poem.firstName} ${poem.lastName}`}</p>
                <p key={poem.shortTitle} className="poems-page__year">
                  {`${poem.pubYear}`}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <Pagination
        poemsPerPage={poemsPerPage}
        totalPoems={poemsList.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default PoemsPage;
