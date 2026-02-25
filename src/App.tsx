import { useEffect, useState, useRef } from 'react';
import './App.css';

const WEATHER_API_KEY = '8b6da581100d8da99007e32097e1604a'; // Replace with your actual API key

const skills = [
  'JavaScript', 'HTML', 'CSS', 'Bootstrap', 'WordPress', 'Ruby', 'Python', 'C++', 'Java', 'PHP', 'Dart',
  'WordPress (Elementor, Brizy)', 'phpMyAdmin', 'MySQL', 'Apache Web Server', 'DBeaver', 'Android Studio', 'XAMPP', 'Flutter'
];

function App() {
  const [bannerType, setBannerType] = useState<'default' | 'rain' | 'night'>('default');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentSkill, setCurrentSkill] = useState(0);
  const [animState, setAnimState] = useState<'reset' | 'entering' | 'visible' | 'exiting'>('reset');
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: 'What Machines Hear',
      subtitle: 'Real-Time Binary Audio Visualization & Conversion Platform',
      media: `${import.meta.env.BASE_URL}media/Wmh.mp4`, 
      mediaType: 'video' as const,
      techStack: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Vite'],
      apis: ['Spotify API'],
      githubUrl: 'https://github.com/SobbingSoprano/WhatMachinesHear',
    },
    {
      id: 2,
      title: 'NexQuery',
      subtitle: 'Intelligent Workforce Analytics & Management Suite',
      media: `${import.meta.env.BASE_URL}media/nEXQUERY.mp4`, 
      mediaType: 'video' as const,
      techStack: ['Java', 'DBeaver'],
      apis: ['Google Firestore Suite (Authentication)'],
      githubUrl: 'https://github.com/SobbingSoprano/Nex-Query_Employee_Management',
    },
    {
      id: 3,
      title: 'Vibz Check',
      subtitle: 'AI-Powered Collaborative Social Music Experience',
      media: `${import.meta.env.BASE_URL}media/VC1.png`, 
      mediaType: 'image' as const,
      techStack: ['Dart', 'Flutter'],
      apis: ['Google Firestore Suite (Authentication)', 'Spotify Playback API', 'Deezer API'],
      githubUrl: 'https://github.com/usmann56/vibzcheck',
    },
  ];

  const handleProjectClick = (id: number) => {
    setExpandedProject(expandedProject === id ? null : id);
  };

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    const cycle = () => {
      setAnimState('reset');
      timers.push(setTimeout(() => setAnimState('entering'), 50));
      timers.push(setTimeout(() => setAnimState('visible'), 650));
      timers.push(setTimeout(() => setAnimState('exiting'), 2250));
      timers.push(setTimeout(() => {
        setCurrentSkill((prev) => (prev + 1) % skills.length);
        cycle();
      }, 2850));
    };

    cycle();

    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    // Check for night based on system time
    const hour = new Date().getHours();
    if (hour >= 21 || hour < 7) {
      setBannerType('night');
      return;
    }
    // geolocation for weather
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          try {
            const res = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
            );
            const data = await res.json();
            if (
              data.weather &&
              data.weather.some((w: any) => w.main.toLowerCase().includes('rain'))
            ) {
              setBannerType('rain');
            }
          } catch (e) {
            setBannerType('default');
          }
        },
        () => {
          setBannerType('default');
        }
      );
    } else {
      setBannerType('default');
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      console.log('Video ref not available');
      return;
    }

    // Force load the video
    video.load();
    console.log('Video load() called');

    const handleScroll = () => {
      if (!video.duration || isNaN(video.duration)) {
        console.log('Video duration not ready:', video.duration);
        return;
      }
      // Map scroll position to video time
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) {
        console.log('maxScroll is 0 or negative:', maxScroll);
        return;
      }
      const scrollFraction = Math.min(Math.max(scrollTop / maxScroll, 0), 1);
      video.currentTime = scrollFraction * video.duration;
      console.log('Scroll:', scrollTop, 'Fraction:', scrollFraction, 'Video time:', video.currentTime);
    };

    // Wait for video metadata to load before enabling scroll handler
    const onLoadedMetadata = () => {
      console.log('Video metadata loaded, duration:', video.duration);
      video.pause(); // Pause the video so scroll controls it
      handleScroll();
    };

    // Also listen for canplaythrough for better frame availability
    const onCanPlay = () => {
      console.log('Video can play through');
      handleScroll();
    };

    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('canplaythrough', onCanPlay);
    window.addEventListener('scroll', handleScroll);

    // If already loaded
    if (video.readyState >= 1) {
      console.log('Video already loaded, readyState:', video.readyState);
      onLoadedMetadata();
    }

    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('canplaythrough', onCanPlay);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [bannerType]);

  useEffect(() => {
    const handleGradientScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = maxScroll > 0 ? (scrollTop / maxScroll) : 0;
      // Super aggressive gradient movement
      const gradientPos = scrollFraction * 200; // 10x multiplier for very aggressive movement
      document.documentElement.style.setProperty('--gradient-pos', `${gradientPos}%`);
    };

    window.addEventListener('scroll', handleGradientScroll);
    handleGradientScroll(); // Initialize

    return () => window.removeEventListener('scroll', handleGradientScroll);
  }, []);

  return (
    <div className="main-landing">
      <header className="header">
        <div className="container">
          <h1 className="logo">Kent Harmon</h1>
          <nav className="nav">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>
      <section className="hero">
        <div id="portfolio-banner">
          {bannerType === 'night' ? (
            <img
              src={`${import.meta.env.BASE_URL}textures/skybox/Night.jpg`}
              alt="Night banner"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
            />
          ) : (
            <video
              key={bannerType}
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              src={
                bannerType === 'rain'
                  ? `${import.meta.env.BASE_URL}textures/skybox/stormy day.mp4`
                  : `${import.meta.env.BASE_URL}textures/skybox/rolling clouds.mp4`
              }
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
            />
          )}
          <div className="container banner-content">
            <h2>Welcome to My <span className="highlight" data-text="Portfolio">Portfolio</span></h2>
            <p>Here lies the Culmination of Fruits from My Blood, Sweat, and Tears.</p>
            <a
              href="#projects"
              className="cta-btn"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
                e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
              }}
            >
              <span>View Projects</span>
            </a>
          </div>
        </div>
      </section>
      <section className="about" id="about">
        <div className="container">
          <h3>About Me</h3>
          <p>My biggest passion in tech involves creating innovative websites and bringing creative ideas to life through code.</p>
          <div className="carousel-container">
            <div className={`skill-card ${animState}`}>
              {skills[currentSkill]}
            </div>
          </div>
        </div>
      </section>
      <section className="projects" id="projects">
        <div className="container">
          <h3>Projects</h3>
          <div className="project-cards">
            {projects.map((project) => (
              <div key={project.id} className="project-card-wrapper">
                <div
                  className={`project-card ${expandedProject === project.id ? 'expanded' : ''}`}
                  onClick={() => handleProjectClick(project.id)}
                >
                  <div className="project-media">
                    {project.mediaType === 'video' ? (
                      <video 
                        muted 
                        loop 
                        playsInline 
                        autoPlay
                        onEnded={(e) => {
                          const video = e.currentTarget;
                          video.currentTime = 0;
                          video.play();
                        }}
                      >
                        <source src={project.media} type="video/mp4" />
                      </video>
                    ) : (
                      <img src={project.media} alt={project.title} />
                    )}
                  </div>
                  <div className="project-title-overlay">
                    <h4>{project.title}</h4>
                    <p>{project.subtitle}</p>
                  </div>
                </div>
                <div className={`project-details ${expandedProject === project.id ? 'visible' : ''}`}>
                  <div className="project-details-content">
                    <div className="tech-section">
                      <h5>Tech Stack</h5>
                      <div className="tech-tags">
                        {project.techStack.map((tech, idx) => (
                          <span key={idx} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                    <div className="tech-section">
                      <h5>Plugins & APIs</h5>
                      <div className="tech-tags">
                        {project.apis.map((api, idx) => (
                          <span key={idx} className="tech-tag api-tag">{api}</span>
                        ))}
                      </div>
                    </div>
                    <div className="github-section">
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="github-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.686-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.593 1.028 2.686 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.577.688.479C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/>
                        </svg>
                        View on GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="contact" id="contact">
        <div className="container">
          <h3>Contact</h3>
          <div className="contact-icons" style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', fontSize: '2rem' }}>
            <a href="https://github.com/sobbingsoprano" target="_blank" rel="noopener noreferrer" title="GitHub">
              <span style={{ cursor: 'pointer' }}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.686-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.593 1.028 2.686 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.577.688.479C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/></svg>
              </span>
            </a>
            <a href="https://www.linkedin.com/in/kent-h-7bb7441b5" target="_blank" rel="noopener noreferrer" title="LinkedIn">
              <span style={{ cursor: 'pointer' }}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </span>
            </a>
            <a href="mailto:kd35443@email.com" title="Email">
              <span style={{ cursor: 'pointer' }}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="14" rx="2" ry="2"/><polyline points="4 7 12 13 20 7"/></svg>
              </span>
            </a>
          </div>
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

export default App;
