import React, { useState, useEffect } from 'react';
import type { PortfolioItem, Project, Skill } from './types';
import Booking from './components/Booking';

// --- Icons (as stateless components) ---
const NotionIcon: React.FC<{ className?: string }> = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M13.13 4.21h2.53v13.52h-2.53V4.21m-4.26 0h2.53v13.52H8.87V4.21M4.77 8.16l3.24-3.23v10.8l-3.24-3.24V8.16m14.46 3.29l-3.24 3.24V4.93l3.24 3.24v3.28z"></path></svg>);
const MidjourneyIcon: React.FC<{ className?: string }> = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-9.41L12.59 13 10 15.59 11.41 17 14 14.41 16.59 17 18 15.59 15.41 13 18 10.41 16.59 9 14 11.59 11.41 9 10 10.41z"></path></svg>);
const RunwayIcon: React.FC<{ className?: string }> = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M18 6.94V4.06a.5.5 0 00-.8-.4L9.6 8.52a.5.5 0 000 .95l7.6 4.86a.5.5 0 00.8-.4V11L18 6.94zm-12.4-.4L13.2 2a.5.5 0 01.8.4v19.14a.5.5 0 01-.8.4L5.6 17.08a.5.5 0 010-.95l7.6-4.86a.5.5 0 010-.95L5.6 6.54a.5.5 0 01-.4-.4z"></path></svg>);
const AdobeIcon: React.FC<{ className?: string }> = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M15.1 2H8.9L1 14.8l2.9.1L8.3 4h7.4l4.3 10.9 2.9-.1L15.1 2zM12 16.2l-4 8.8h3.3l.9-2.3h5.5l.9 2.3H20l-4-8.8h-4zm-1.1 4.5l1.1-2.9 1.1 2.9h-2.2z"></path></svg>);
const DalleIcon: React.FC<{ className?: string }> = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM8 10h8v4H8v-4z"></path></svg>);
const ReactIcon: React.FC<{ className?: string }> = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/><path d="M12 4.169c-4.321 0-7.831 3.51-7.831 7.831s3.51 7.831 7.831 7.831 7.831-3.51 7.831-7.831-3.51-7.831-7.831-7.831zm0 13.662c-3.219 0-5.831-2.612-5.831-5.831s2.612-5.831 5.831-5.831 5.831 2.612 5.831 5.831-2.612 5.831-5.831-5.831z"/><ellipse cx="12" cy="12" rx="2.5" ry="6.5" transform="rotate(-30 12 12)"/><ellipse cx="12" cy="12" rx="2.5" ry="6.5" transform="rotate(30 12 12)"/><circle cx="12" cy="12" r="1.5"/></svg>);
const TypeScriptIcon: React.FC<{ className?: string }> = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 1h15l-15 15V1zm19.5 22h-15l15-15v15zM8.5 8.5v7h7v-7h-7z"/></svg>);
const NodeJsIcon: React.FC<{ className?: string }> = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>);
const FigmaIcon: React.FC<{ className?: string }> = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4.5c1.38 0 2.5 1.12 2.5 2.5S13.38 11.5 12 11.5 9.5 10.38 9.5 9s1.12-2.5 2.5-2.5zm0 11c-2.48 0-4.5-2.02-4.5-4.5S9.52 8.5 12 8.5s4.5 2.02 4.5 4.5-2.02 4.5-4.5 4.5z"/></svg>);
const PythonIcon: React.FC<{ className?: string }> = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H9.5a2.5 2.5 0 110-5H11V6h2v2h1.5a2.5 2.5 0 110 5H13v4h-2z"/></svg>);
const TailwindIcon: React.FC<{ className?: string }> = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-4.5-3.5L12 12l4.5 4.5-1.41 1.41L12 14.83l-3.09 3.08-1.41-1.41zm0-9L12 12l-4.5-4.5L6.09 6.09 9.17 9.17 6.09 12.25l1.41 1.41L12 9.17l3.09 3.09 1.41-1.41L12 6.34l-4.5-4.5-1.41 1.41z"/></svg>);
const LinkIcon: React.FC<{ className?: string }> = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path></svg>);
const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>);
const ArrowUpIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" /></svg>);


// --- Data ---
const portfolioItems: PortfolioItem[] = [
    { id: 1, title: "Cosmic Leviathan", description: "A nebula whale swimming through a sea of stars.", imageUrl: "https://picsum.photos/seed/cosmic/800/600" },
    { id: 2, title: "Cybernetic Oasis", description: "A tranquil garden inside a futuristic megastructure.", imageUrl: "https://picsum.photos/seed/cyber/800/600" },
    { id: 3, title: "Sunken Kingdom", description: "The silent, glowing ruins of an ancient city underwater.", imageUrl: "https://picsum.photos/seed/sunken/800/600" },
    { id: 4, title: "Steampunk Aviator", description: "Portrait of a pilot with intricate clockwork wings.", imageUrl: "https://picsum.photos/seed/steam/800/600" },
];

const aiTools = [
    { name: "Notion AI", Icon: NotionIcon },
    { name: "Midjourney", Icon: MidjourneyIcon },
    { name: "Runway", Icon: RunwayIcon },
    { name: "Adobe Firefly", Icon: AdobeIcon },
    { name: "DALL-E", Icon: DalleIcon },
];

const skills: Skill[] = [
    { name: "React", Icon: ReactIcon },
    { name: "TypeScript", Icon: TypeScriptIcon },
    { name: "Node.js", Icon: NodeJsIcon },
    { name: "Python", Icon: PythonIcon },
    { name: "Tailwind CSS", Icon: TailwindIcon },
    { name: "Figma", Icon: FigmaIcon },
];

const projects: Project[] = [
    {
        title: "AI Art Gallery",
        description: "A dynamic web platform for showcasing AI-generated art, featuring advanced filtering and a sleek, modern UI.",
        tags: ["React", "TypeScript", "Tailwind CSS", "Firebase"],
        imageUrl: "https://picsum.photos/seed/project1/800/600",
        liveUrl: "#",
        repoUrl: "#",
    },
    {
        title: "Real-time Chat App",
        description: "A full-stack chat application built with Node.js and WebSockets for instant communication.",
        tags: ["Node.js", "Express", "Socket.IO", "React"],
        imageUrl: "https://picsum.photos/seed/project2/800/600",
        liveUrl: "#",
        repoUrl: "#",
    },
    {
        title: "UX/UI Design System",
        description: "A comprehensive design system created in Figma for a SaaS product, ensuring brand consistency and developer efficiency.",
        tags: ["Figma", "UX Design", "UI Design"],
        imageUrl: "https://picsum.photos/seed/project3/800/600",
        liveUrl: "#",
    },
];

// --- Page Sections (as stateless components) ---
const Navbar: React.FC = () => {
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        if (targetId) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };
    
    const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <nav className="absolute top-0 left-0 right-0 z-30 py-6 px-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <a href="#" onClick={handleLogoClick} className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-fuchsia-500">
                    Portfolio
                </a>
                <ul className="hidden md:flex items-center space-x-6 lg:space-x-8 bg-black/20 backdrop-blur-sm px-6 py-2 rounded-full border border-slate-700">
                    <li><a href="#about" onClick={handleNavClick} className="text-slate-300 hover:text-cyan-400 transition-colors py-2">About</a></li>
                    <li><a href="#projects" onClick={handleNavClick} className="text-slate-300 hover:text-cyan-400 transition-colors py-2">Projects</a></li>
                    <li><a href="#skills" onClick={handleNavClick} className="text-slate-300 hover:text-cyan-400 transition-colors py-2">Skills</a></li>
                    <li><a href="#portfolio" onClick={handleNavClick} className="text-slate-300 hover:text-cyan-400 transition-colors py-2">AI Showcase</a></li>
                    <li><a href="#contact" onClick={handleNavClick} className="bg-cyan-500 text-black font-bold py-2 px-5 rounded-full hover:bg-cyan-400 transition-colors">Contact</a></li>
                </ul>
            </div>
        </nav>
    );
};

const Header: React.FC = () => {
    const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="relative pt-40 pb-20 md:pt-48 md:pb-32 text-center text-white overflow-hidden">
            <Navbar />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-stone-950 opacity-80"></div>
            <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/headerbg/1920/1080')] bg-cover bg-center filter blur-sm scale-105"></div>
            <div className="relative z-10 max-w-4xl mx-auto px-4">
                <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-fuchsia-500">
                    AI-Powered Development & Design
                </h1>
                <p className="mt-6 text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto">
                    Crafting next-generation digital experiences where creativity meets artificial intelligence.
                </p>
                <a href="#contact" onClick={handleScrollToContact} className="mt-10 inline-block bg-cyan-500 text-black font-bold py-3 px-8 rounded-lg text-lg hover:bg-cyan-400 transition-all transform hover:scale-105">
                    Start a Project
                </a>
            </div>
        </header>
    );
};

const AboutSection: React.FC = () => (
    <section id="about" className="py-16 md:py-24 bg-stone-950">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-2">
                <img src="https://picsum.photos/seed/profile/600/800" alt="Profile portrait" className="rounded-lg shadow-2xl w-full h-auto object-cover aspect-[3/4] border-4 border-slate-800" />
            </div>
            <div className="md:col-span-3 space-y-6">
                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">About Me</h2>
                <p className="text-lg text-slate-300 leading-relaxed">
                    I'm a passionate developer and designer with a keen interest in the intersection of technology and art. My journey into the world of AI has unlocked new avenues for creativity, allowing me to build intelligent, beautiful, and highly functional digital products.
                </p>
                <p className="text-lg text-slate-400 leading-relaxed">
                    From crafting intuitive user interfaces to developing robust back-end systems, I thrive on challenges and am dedicated to pushing the boundaries of what's possible. Let's collaborate and bring your innovative ideas to life.
                </p>
            </div>
        </div>
    </section>
);

const ProjectsSection: React.FC = () => (
    <section id="projects" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-center text-4xl font-bold text-white mb-12">Featured Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map(project => (
                    <div key={project.title} className="bg-slate-800/50 rounded-lg overflow-hidden border border-slate-700 flex flex-col">
                        <img src={project.imageUrl} alt={project.title} className="w-full h-56 object-cover" />
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                            <p className="text-slate-400 mt-2 flex-grow">{project.description}</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {project.tags.map(tag => (
                                    <span key={tag} className="bg-slate-700 text-cyan-300 text-xs font-semibold px-2.5 py-1 rounded-full">{tag}</span>
                                ))}
                            </div>
                        </div>
                         <div className="p-6 pt-0 mt-auto flex justify-end items-center gap-4">
                            {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400"><GithubIcon className="w-6 h-6"/></a>}
                            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400"><LinkIcon className="w-6 h-6"/></a>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);


const SkillsSection: React.FC = () => (
    <section id="skills" className="py-16 md:py-24 bg-stone-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-12">Technical Skills</h2>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                {skills.map(skill => (
                    <div key={skill.name} className="flex flex-col items-center gap-3 text-slate-400 hover:text-white transition-colors group">
                        <div className="w-20 h-20 bg-slate-800/50 border border-slate-700 rounded-full flex items-center justify-center group-hover:bg-slate-700 transition-colors">
                            <skill.Icon className="w-10 h-10" />
                        </div>
                        <span className="font-semibold tracking-wider">{skill.name}</span>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const ToolsSection: React.FC = () => (
    <div className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-center text-4xl font-bold text-white mb-12">My AI Toolkit</h2>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                {aiTools.map(({ name, Icon }) => (
                    <div key={name} className="flex flex-col items-center gap-3 text-slate-400 hover:text-white transition-colors group">
                        <Icon className="w-12 h-12" />
                        <span className="font-semibold tracking-wider text-sm group-hover:text-cyan-400 transition-colors">{name}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const PortfolioSection: React.FC = () => (
    <div id="portfolio" className="py-16 md:py-24 bg-stone-950">
        <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-center text-4xl font-bold text-white mb-12">AI Content Showcase</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {portfolioItems.map(item => (
                    <div key={item.id} className="group relative overflow-hidden rounded-lg shadow-lg border border-slate-800">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-6">
                            <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                            <p className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const Footer: React.FC = () => (
    <footer className="bg-slate-900/50 border-t border-slate-800 py-8 text-center">
        <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-center gap-6 mb-4">
                 <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors"><GithubIcon className="w-7 h-7" /></a>
                 {/* Replace with your actual social links */}
            </div>
            <p className="text-slate-400">&copy; {new Date().getFullYear()} AI Developer & Designer. All rights reserved.</p>
        </div>
    </footer>
);

// --- Main App Component ---
const App: React.FC = () => {
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className="bg-stone-950 min-h-screen text-white">
            <Header />
            <main>
                <AboutSection />
                <ProjectsSection />
                <SkillsSection />
                <ToolsSection />
                <PortfolioSection />
                <section id="contact" className="py-16 md:py-24">
                    <div className="max-w-6xl mx-auto px-4">
                        <Booking />
                    </div>
                </section>
            </main>
            <Footer />
            {showBackToTop && (
                 <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 bg-cyan-500 text-black p-3 rounded-full shadow-lg hover:bg-cyan-400 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-stone-950 focus:ring-cyan-500 z-50"
                    aria-label="Go to top"
                >
                    <ArrowUpIcon className="w-6 h-6" />
                </button>
            )}
        </div>
    );
};

export default App;