import "./AuthorsPage.scss";

const AuthorsPage = () => {
  return (
    <div className="authors-page__container--max-width">
      <h2 className="authors-page__heading">Authors</h2>
      <div className="authors-page__container--list">
        <div className="authors-page__row">
          <h3 className="authors-page__name">William Wordsworth</h3>
        </div>
        <div className="authors-page__row">
          <h3 className="authors-page__name">Aphra Behn</h3>
        </div>
        <div className="authors-page__row">
          <h3 className="authors-page__name">Ben Jonson</h3>
        </div>
        <div className="authors-page__row">
          <h3 className="authors-page__name">Anne Carson</h3>
        </div>
        <div className="authors-page__row">
          <h3 className="authors-page__name">William Shakespeare</h3>
        </div>
      </div>
    </div>
  );
};

export default AuthorsPage;
