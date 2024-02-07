import "./SinglePoetPage.scss";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

// Types
interface Props {
  poetryApiUrl: string;
}

interface Poet {
  id: number;
  last_name: string;
  first_name: string;
  url_param: string;
  birth_year: number;
  death_year: number;
  category_id: number;
  img: string;
  bio: string;
  bio_source: string;
  created_at: string;
}

const SinglePoetPage = ({ poetryApiUrl }: Props) => {
  const { name } = useParams();
  const [poet, setPoet] = useState<Poet | null>(null);
  console.log(name);

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

  if (!poet) {
    return <div className="poet-page__container--loading">loading...</div>;
  }

  return (
    <>
      <div className="poet-page__container--max-width">
        <div key={poet.id} className="poet-page__container--profile">
          <img
            src={`${poet.img}`}
            alt={`${poet.first_name} ${poet.last_name}`}
            className="poet-page__img"
          />
          <div className="poet-page__container--name-years">
            <h4 className="poet-page__name">{`${poet.first_name} ${poet.last_name}`}</h4>
            <p className="poet-page__years">{`${poet.birth_year} - ${poet.death_year}`}</p>
          </div>
          <p className="poet-page__bio">{poet.bio}</p>
          <a href={`${poet.bio_source}`}>
            <p className="poet-page__source">Source: Wikipedia</p>
          </a>
        </div>

        <div className="poet-page__container--list">{/* Rows here */}</div>
      </div>
    </>
  );
};

export default SinglePoetPage;
