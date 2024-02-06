import "./SinglePoetPage.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Types
interface Props {
  clientUrl: string;
}

interface Poet {}

const SinglePoetPage = ({ clientUrl }: Props) => {
  const [poet, setPoet] = useState(null);

  useEffect(() => {
    const fetchPoet = async () => {
      try {
      } catch (error) {
        console.log("Error fetching poet: ", error);
      }
    };
    fetchPoet();
  }, []);

  if (!poet) {
    return <div>loading...</div>;
  }

  return (
    <div className="poet-page__container--max-width">
      <div className="poet_page__container--top">
        <img src="" alt="" className="poet-page__img" />
        <h4 className="poet-page__name"></h4>
        <p className="poet-page__years"></p>
      </div>
      <div className="poet-page__container--bio">
        <p className="poet-page__bio"></p>
      </div>
      <div className="poet-page__container--list"></div>

      {/* this should be a component */}

      {/* <div key={poem.id} className="poet-page__row">
        <Link to={`${clientUrl}/poems/${poem.short_title}`}>
          <h4 className="poet-page__title">{`${poem.title}`}</h4>
          <div className="poet-page__container--name-year">
            <p
              key={poem.title}
              className="poet-page__name"
            >{`${poem.first_name} ${poem.last_name}`}</p>
            <p key={poem.short_title} className="poet-page__year">
              {`${poem.pub_year}`}
            </p>
          </div>
        </Link>
      </div>
       */}
    </div>
  );
};

export default SinglePoetPage;
