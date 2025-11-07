import React, { useState, useEffect, useRef } from 'react';
import profilePhoto from './assets/Dian.jpg';
import logo from './assets/logonaid.png';
import personalImage from './assets/4.jpg';
import biteexImage from './assets/6.png';
import restoImage from './assets/resto.jpg';
import contactImage from './assets/contact.jpg';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});
  const [zoomedProject, setZoomedProject] = useState(null);
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => {
      observerRef.current.observe(section);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (zoomedProject !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [zoomedProject]);

  const handleProjectClick = (index) => {
    setZoomedProject(index);
  };

  const handleCloseZoom = () => {
    setZoomedProject(null);
  };

  const projects = [
    {
      title: "Restorante Del Signore",
      description: "A restaurant web application that allows customers to browse menus, place food orders online, and make secure payments easily.",
      tech: ["HTML/CSS", "JavaScript"],
      image: restoImage
    },
    {
      title: "Personal Information",
      description: "A personal information system that organizes and displays my subjects, instructors, and class schedules in a structured and easy-to-access format.",
      tech: ["HTML/CSS", "PHP", "SQL", "JavaScript"],
      image: personalImage
    },
    {
      title: "BITE-ex",
      description: "A social media–based recipe platform that allows users to share, discover, and explore a variety of dishes from different cuisines in an interactive and engaging way.",
      tech: ["HTML/CSS", "PHP", "SQL", "JavaScript", "AJAX"],
      image: biteexImage
    }
  ];

  const skills = [
    { 
      name: "Frontend Development", 
      items: ["React", "Tailwind CSS", "JavaScript", "HTML/CSS"] 
    },
    { 
      name: "UI/UX Design", 
      items: ["Figma", "Canva"] 
    }
  ];

  const navigation = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contacts', id: 'contact' }
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fadeInLeft {
          animation: fadeInLeft 0.8s ease-out forwards;
        }

        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out forwards;
        }

        .animate-slideDown {
          animation: slideDown 0.5s ease-out forwards;
        }

        .animate-zoomIn {
          animation: zoomIn 0.3s ease-out forwards;
        }

        .section-animate {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        .section-animate.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }
        .stagger-6 { animation-delay: 0.6s; }

        .zoom-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.9);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .zoom-content {
          max-width: 900px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
        }
      `}</style>
      
      <nav className="bg-gradient-to-r from-emerald-50 via-lime-50 to-green-50 sticky top-0 z-50 shadow-sm animate-slideDown backdrop-blur-sm bg-opacity-95">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="w-20 h-20 flex items-center justify-center">
                <img src={logo} alt="DN Logo" className="w-full h-full object-contain" />
              </div>
            </div>
            
            <div className="hidden md:flex space-x-12">
              {navigation.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-lg transition-colors ${activeSection === item.id ? 'text-emerald-800 font-semibold' : 'text-emerald-900 hover:text-emerald-800'}`} style={{ fontFamily: "'Josefin Sans', sans-serif" }}
                >
                  {item.name}
                </button>
              ))}
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6 text-emerald-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-emerald-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-gradient-to-r from-emerald-50 to-lime-50 border-t border-emerald-200" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
            <div className="px-6 py-4 space-y-2">
              {navigation.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-2 rounded-md ${activeSection === item.id ? 'bg-emerald-200 text-emerald-900 font-semibold' : 'text-emerald-900 hover:bg-emerald-50'}`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <section id="home" className={`min-h-screen bg-gradient-to-br from-emerald-50 via-lime-50 to-green-50 section-animate ${visibleSections.home ? 'visible' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center min-h-[calc(100vh-180px)]">
            <div className="opacity-0 animate-fadeInLeft">
              <h1 className="text-6xl md:text-7xl font-bold text-stone-900 mb-6 leading-tight"style={{ fontFamily: "'Playfair Display', serif" }}>
                HI! I'M DIANNE<br />NATAYA
              </h1>
              <p className="text-stone-700 text-lg mb-8 leading-relaxed max-w-xl tracking-wide" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
                I'm a college student currently taking up Computer Science. Alongside my studies, I'm also a part-time working student at a restaurant, where I've learned the value of patience, responsibility, and teamwork. Balancing academics, work, and hobbies helps me grow not just as a student, but also as a person who values both discipline and self-expression.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => scrollToSection('projects')}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-medium hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-md hover:shadow-lg"
                >
                  VIEW MY WORK
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="px-6 py-3 bg-white text-emerald-700 border-2 border-emerald-700 font-medium hover:bg-lime-50 transition-colors shadow-md"
                >
                  CONTACT ME
                </button>
              </div>
            </div>

            <div className="flex justify-center md:justify-end opacity-0 animate-fadeInRight stagger-2">
              <div className="w-full max-w-lg aspect-square">
                <img 
                  src={profilePhoto} 
                  alt="Dianne Nataya" 
                  className="w-full h-full object-cover shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className={`py-20 px-6 lg:px-12 bg-gradient-to-br from-green-100 via-emerald-100 to-lime-100 section-animate ${visibleSections.about ? 'visible' : ''}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-stone-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>ABOUT ME</h2>
          <div className="w-24 h-1 bg-emerald-700 mb-12"></div>
          
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <p className="text-lg text-stone-700 mb-6 leading-relaxed"style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
                I'm a 3rd-year college student currently taking up Computer Science. While I may not be the best at creating complex programs,
                I truly enjoy working on the design aspects of our team projects. Bringing ideas to life through layouts and visuals is where I feel most confident and creative.
              </p>
              <p className="text-lg text-stone-700 mb-6 leading-relaxed"style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
                Outside of school, I love traveling and spending time with friends—it's my way of recharging and finding inspiration.
                I also enjoy exploring my personal interests, especially makeup, which allows me to express my creativity and sense of style.
              </p>
              <p className="text-lg text-stone-700 leading-relaxed"style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
                I have a special fondness for the color green because it gives me a feeling of calm and positivity. 
                And most importantly, I'm a pet lover—being around animals always brightens my day and brings me a sense of comfort and joy.
              </p>
            </div>
            <div className="bg-white bg-opacity-60 p-8 border-l-4 border-emerald-700 backdrop-blur-sm">
              <h3 className="text-2xl font-semibold mb-6 text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>Education & Experience</h3>
              <ul className="space-y-4 text-stone-700">
                <li className="flex items-start">
                  <span className="text-emerald-700 mr-3 text-2xl">→</span>
                  <div>
                    <strong style={{ fontFamily: "'Playfair Display', serif" }}>Computer Science Student</strong>
                    <p className="text-sm text-stone-600" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>Currently pursuing degree</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-700 mr-3 text-2xl">→</span>
                  <div>
                    <strong style={{ fontFamily: "'Playfair Display', serif" }}>Web Development Projects</strong>
                    <p className="text-sm text-stone-600"style={{ fontFamily: "'Josefin Sans', sans-serif" }}>2+ completed projects</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-700 mr-3 text-2xl">→</span>
                  <div>
                    <strong style={{ fontFamily: "'Playfair Display', serif" }}>Creative Design</strong>
                    <p className="text-sm text-stone-600" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>UI/UX & Visual Design using Canva and Figma</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <h3 className="text-3xl font-bold text-stone-900 mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>TECHNICAL SKILLS</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <div key={index} className="bg-white bg-opacity-60 p-6 border-l-4 border-emerald-700 backdrop-blur-sm" style={{ fontFamily: "'Playfair Display', serif" }}>
                <h4 className="text-xl font-semibold mb-4 text-stone-900">{skill.name}</h4>
                <ul className="space-y-2" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
                  {skill.items.map((item, i) => (
                    <li key={i} className="text-stone-700 flex items-center">
                      <span className="w-2 h-2 bg-emerald-700 mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section id="projects" className={`py-20 px-6 lg:px-12 bg-gradient-to-br from-lime-100 via-green-100 to-emerald-200 section-animate ${visibleSections.projects ? 'visible' : ''}`} style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-stone-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>PROJECTS</h2>
          <div className="w-24 h-1 bg-emerald-700 mb-12"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index} 
                onClick={() => handleProjectClick(index)}
                className={`bg-white shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer hover:scale-105 opacity-0 animate-fadeInUp stagger-${index + 1}`}
              >
                <div className="h-56 bg-gradient-to-br from-emerald-100 to-lime-100 flex items-center justify-center p-4 overflow-hidden">
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="text-center text-emerald-700">
                        <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        <p className="text-sm font-medium">Project {index + 1}</p>
                      </div>
                    )}
                  </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-stone-900">{project.title}</h3>
                  <p className="text-stone-600 mb-4 text-sm leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {zoomedProject !== null && (
        <div className="zoom-overlay" onClick={handleCloseZoom}>
          <div className="zoom-content animate-zoomIn" onClick={(e) => e.stopPropagation()}>
            <div className="bg-white shadow-2xl overflow-hidden relative">
              <button 
                onClick={handleCloseZoom}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-stone-100 transition-colors"
              >
                <svg className="w-6 h-6 text-stone-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="h-64 md:h-96 bg-gradient-to-br from-emerald-100 to-lime-100 flex items-center justify-center p-6 overflow-hidden">
                {projects[zoomedProject].image ? (
                  <img 
                    src={projects[zoomedProject].image} 
                    alt={projects[zoomedProject].title} 
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-center text-emerald-700">
                    <svg className="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    <p className="text-lg font-medium">Project {zoomedProject + 1}</p>
                  </div>
                )}
              </div>
              
              <div className="p-8">
                <h3 className="text-3xl font-bold mb-4 text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {projects[zoomedProject].title}
                </h3>
                <p className="text-stone-700 mb-6 text-lg leading-relaxed" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
                  {projects[zoomedProject].description}
                </p>
                
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-stone-900 mb-3 uppercase tracking-wide">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {projects[zoomedProject].tech.map((tech, i) => (
                      <span key={i} className="px-4 py-2 bg-emerald-100 text-emerald-800 text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <section id="contact" className={`py-20 px-6 lg:px-12 bg-gradient-to-br from-emerald-200 via-green-200 to-lime-300 section-animate ${visibleSections.contact ? 'visible' : ''}`}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-stone-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>CONTACTS</h2>
          <div className="w-24 h-1 bg-emerald-700 mb-12"></div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>Get In Touch</h3>
              <p className="text-stone-700 mb-8 leading-relaxed" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
                I'm always interested in hearing about new projects and opportunities. 
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
              
              <div className="space-y-4">
                <a href="mailto:natayadianne@gmail.com" className="flex items-center text-stone-700 hover:text-emerald-700 transition-colors">
                  <div className="w-12 h-12 bg-white bg-opacity-60 flex items-center justify-center mr-4 backdrop-blur-sm">
                    <svg className="w-6 h-6 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span style={{ fontFamily: "'Josefin Sans', sans-serif" }}>natayadianne@gmail.com</span>
                </a>
                <a href="https://github.com/DianneNataya" className="flex items-center text-stone-700 hover:text-emerald-700 transition-colors">
                  <div className="w-12 h-12 bg-white bg-opacity-60 flex items-center justify-center mr-4 backdrop-blur-sm">
                    <svg className="w-6 h-6 text-emerald-700" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span style={{ fontFamily: "'Josefin Sans', sans-serif" }}>github.com/DianneNataya</span>
                </a>
                <a href="https://www.linkedin.com/in/dianne-nataya-309777364/" className="flex items-center text-stone-700 hover:text-emerald-700 transition-colors">
                  <div className="w-12 h-12 bg-white bg-opacity-60 flex items-center justify-center mr-4 backdrop-blur-sm">
                    <svg className="w-6 h-6 text-emerald-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <span style={{ fontFamily: "'Josefin Sans', sans-serif" }}>linkedin.com/in/dianne-nataya-309777364</span>
                </a>
              </div>
            </div>

            <div className="bg-white bg-opacity-60 p-8 border-l-4 border-emerald-700 backdrop-blur-sm">
              <div className="aspect-square w-full overflow-hidden">
                <img 
                  src={contactImage} 
                  alt="Contact" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-r from-emerald-700 via-green-700 to-emerald-700 text-white py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-emerald-100">
            © 2025 Dianne Nataya. Built with React & Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}