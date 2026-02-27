import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__left">
          <img 
            src="/vikaspedia.png" 
            alt="Vikaspedia Logo" 
            className="navbar__logo navbar__logo--main"
          />
          <span className="navbar__text">Vikaspedia</span>
        </div>

        <div className="navbar__right">
          <img 
            src="/ministry.png" 
            alt="Ministry Logo" 
            className="navbar__logo navbar__logo--ministry"
          />
          <img 
            src="/cdac.png" 
            alt="CDAC Logo" 
            className="navbar__logo navbar__logo--cdac"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
