import "./SinglePoetPage.scss";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

// Types
interface Props {
  clientUrl: string;
  poetryApiUrl: string;
}

interface Poet {
  id: number;
  bio: string;
  bioSource: string;
  birthYear: number;
  createdAt: string;
  deathYear: number;
  firstName: string;
  img: string;
  lastName: string;
  urlParam: string;
}

interface Poem {
  id: number;
  firstName: string;
  lastName: string;
  pubYear: string;
  shortTitle: string;
  title: string;
}

const SinglePoetPage = ({ poetryApiUrl, clientUrl }: Props) => {
  const { name } = useParams();
  const [poet, setPoet] = useState<Poet | null>(null);
  const [poemsList, setPoemsList] = useState<Poem[] | null>(null);

  // Gets the information about a single poet and stores in state

  useEffect(() => {
    const fetchPoet = async () => {
      try {
        const response = await axios.get(`${poetryApiUrl}/poets/${name}`);
        setPoet(response.data[0]);
      } catch (error) {
        console.log("Error fetching poet: ", error);
      }
    };
    fetchPoet();
  }, []);

  // Gets a list of poems written by selected poem and stores in state

  useEffect(() => {
    const fetchPoemsList = async () => {
      try {
        const response = await axios.get(`${poetryApiUrl}/poems/${name}`);
        setPoemsList(response.data);
      } catch (error) {
        console.log("Error fetching poem: ", error);
      }
    };
    fetchPoemsList();
  }, []);

  // Error handling

  if (!poet || !poemsList) {
    return <div className="poet-page__container--loading">Loading...</div>;
  }

  console.log(poemsList);

  return (
    <>
      <div className="poet-page__container--max-width">
        <div key={poet.id} className="poet-page__container--profile">
          <img
            src={`${poet.img}`}
            alt={`${poet.firstName} ${poet.lastName}`}
            className="poet-page__img"
          />
          <h4 className="poet-page__name">{`${poet.firstName} ${poet.lastName}`}</h4>
          <p className="poet-page__bio">{poet.bio}</p>
          <a href={`${poet.bioSource}`}>
            <p className="poet-page__source">Source: Wikipedia</p>
          </a>
        </div>

        <div className="poet-page__container--poem-list">
          <h2 className="poet-page__heading">Poems</h2>
          {/* List of poems by selected poet */}
          <div className="poet-page__container--list-rows">
            {poemsList.map((poem) => {
              return (
                <div key={poem.id} className="poet-page__row">
                  <Link to={`${clientUrl}/poems/${poem.shortTitle}`}>
                    <h4
                      key={poem.title}
                      className="poet-page__poem-title"
                    >{`${poem.title}`}</h4>
                  </Link>
                  <p key={poem.shortTitle} className="poet-page__pub-year">
                    {`${poem.pubYear}`}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePoetPage;
