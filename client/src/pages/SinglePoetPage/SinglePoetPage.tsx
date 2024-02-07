import "./SinglePoetPage.scss";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

// Types
interface Props {
  clientUrl: string;
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

const SinglePoetPage = ({ clientUrl }: Props) => {
  const { poetName } = useParams();
  const [poet, setPoet] = useState<Poet | null>(null);

  useEffect(() => {
    const fetchPoet = async () => {
      try {
        const response = await axios.get(`${clientUrl}/poets/${poetName}`);
        setPoet(response.data);
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
    <div className="poet-page__container--max-width">
      <div key={poet.id} className="poet-page__container--profile">
        <img src={`${poet.img}`} alt="" className="poet-page__img" />
        <h4 className="poet-page__name">{`${poet.first_name} ${poet.last_name}`}</h4>
        <p className="poet-page__birth-year">`${poet.birth_year}`</p>
        <p className="poet-page__birth-year">`${poet.death_year}`</p>
        <p className="poet-page__bio">`${poet.bio}`</p>
      </div>

      <div className="poet-page__container--list">{/* Rows here */}</div>
    </div>
  );
};

export default SinglePoetPage;
