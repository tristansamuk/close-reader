import "./Hero.scss";
import readingHands from "../../assets/images/reading-hands.png";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  // Click Handler

  const handleClickButton = () => {
    navigate("/poets");
  };

  return (
    <div className="hero">
      <div className="hero__max-width-container">
        <div className="hero__button-text-container">
          <div className="hero__text-container">
            <h2 className="hero__heading appear-1">
              The place for poetry lovers
            </h2>
            <h3 className="hero__subheading appear-2">
              Experience the best poetry in the English language with the help
              of AI
            </h3>
          </div>
          <button onClick={handleClickButton} className="hero__button appear-3">
            Start Reading
          </button>
        </div>
        <img
          className="hero__image appear-4"
          src={readingHands}
          alt="hands holding a book"
        />
      </div>
    </div>
  );
};

export default Hero;
