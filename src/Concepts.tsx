import { Link, useNavigate } from 'react-router-dom';
import './App.css';

function Concepts() {
  const navigate = useNavigate();

  const goToSection = (section: string) => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="main-landing">
      <header className="header">
        <div className="container">
          <h1 className="logo">Kent Harmon</h1>
          <nav className="nav">
            <Link to="/">Home</Link>
            <a href="#" onClick={(e) => { e.preventDefault(); goToSection('about'); }}>About</a>
            <a href="#" onClick={(e) => { e.preventDefault(); goToSection('projects'); }}>Projects</a>
            <a href="#" onClick={(e) => { e.preventDefault(); goToSection('contact'); }}>Contact</a>
          </nav>
        </div>
      </header>
      
      <section className="hero" style={{ minHeight: '40vh' }}>
        <div className="container banner-content">
          <h2>Networking Concepts</h2>
          <p>a quick dive into networking principles and technologies.</p>
        </div>
      </section>

      <section className="about" id="concepts-content">
        <div className="container">
          <h3>Work In Progress</h3>
          <p>Placeholder</p>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Kent Harmon. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Concepts;
