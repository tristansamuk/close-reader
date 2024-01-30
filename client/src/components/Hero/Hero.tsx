import "./Hero.scss";
import readingHands from "../../assets/images/reading-hands.png";

const Hero: React.FC = () => {
  return (
    <div className="hero">
      <div className="hero__button-text-box">
        <div className="hero__text-box">
          <h2 className="hero__heading appear-1">The app for poetry lovers</h2>
          <h3 className="hero__subheading appear-2">
            Experience the best poetry in the English language with the help of
            AI
          </h3>
        </div>
        <button className="hero__button appear-3">Start Reading</button>
      </div>
      <img
        className="hero__image appear-4"
        src={readingHands}
        alt="hands holding a book"
      />
    </div>
  );
};

export default Hero;
