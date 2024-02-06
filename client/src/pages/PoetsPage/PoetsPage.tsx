import "./PoetsPage.scss";
import { useState, useEffect } from "react";
import axios from "axios";

// Types

interface Props {
  poetryApiUrl: string;
}

// interface Poets

const PoetsPage = ({ poetryApiUrl }: Props) => {
  const [poetsList, setPoetsList] = useState("");

  useEffect(() => {
    const fetchPoets = async () => {
      try {
        const response = await axios.get(`${poetryApiUrl}/poets`);
        setPoetsList(response.data);
        console.log(poetsList);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPoets();
  }, []);

  return (
    <div className="poets-page__container--max-width">
      <h2 className="poets-page__heading">Authors</h2>
      <div className="poets-page__container--list">
        <div className="poets-page__row">
          <h3 className="poets-page__name">William Wordsworth</h3>
        </div>
      </div>
    </div>
  );
};

export default PoetsPage;
