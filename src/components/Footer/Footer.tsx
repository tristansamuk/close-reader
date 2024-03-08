import "./Footer.scss";
import gitHubLogo from "../../assets/images/icons/github-mark.png";
import linkedInLogo from "../../assets/images/icons/linkedin-logo.svg";

const Footer = () => {
  return (
    <div className="footer__container--max-width">
      <div className="footer__container--info">
        <h3 className="footer__logo">close reader</h3>
        <p className="footer__text">
          Making poetry and literary analysis available for everyone. Made with
          courtly love.
        </p>
        <div className="footer__container--logos">
          <a
            href="https://github.com/tristansamuk"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={gitHubLogo}
              alt="github logo"
              className="footer__external-logo"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/tristansamuk/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={linkedInLogo}
              alt="linkedin logo"
              className="footer__external-logo"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
