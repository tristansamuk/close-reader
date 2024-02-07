import "./PoetsPage.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Types

interface Props {
  poetryApiUrl: string;
  clientUrl: string;
}

interface Poet {
  id: number;
  first_name: string;
  last_name: string;
  birth_year: number;
  death_year: number;
  img: string;
  url_param: string;
}

const PoetsPage = ({ poetryApiUrl, clientUrl }: Props) => {
  const [poetsList, setPoetsList] = useState<Poet[] | null>(null);

  useEffect(() => {
    const fetchPoets = async () => {
      try {
        const response = await axios.get(`${poetryApiUrl}/poets`);
        setPoetsList(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPoets();
  }, []);

  if (!poetsList) {
    return (
      <div className="poets-page__loading-container">
        <h2 className="poets-page__loading-text">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="poets-page__container--max-width">
      <h2 className="poets-page__heading">Poets</h2>
      <div className="poets-page__container--list">
        {poetsList.map((poet) => {
          return (
            <div key={poet.id} className="poets-page__row">
              <Link to={`${clientUrl}/poets/${poet.url_param}`}>
                <img src={poet.img} alt="" className="poets-page__poet-pic" />
                <h4
                  key={poet.id}
                  className="poets-page__name"
                >{`${poet.first_name} ${poet.last_name}`}</h4>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PoetsPage;
