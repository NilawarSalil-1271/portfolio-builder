import React from 'react';
import { PortfolioData } from '@/context/BuilderContext';

interface ThemeRendererProps {
  data: PortfolioData;
}

export default function ThemeRenderer({ data }: ThemeRendererProps) {
  // Helper to ensure URLs are absolute
  const formatUrl = (url: string) => {
    if (!url) return '';
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    return url;
  };

  // Define themes
  const themes = {
    modern: {
      container: "bg-gray-50 text-gray-900 font-sans scroll-smooth",
      sectionWrapper: "min-h-screen flex flex-col justify-center py-20 px-6 border-b border-gray-200 last:border-0",
      contentInner: "max-w-4xl mx-auto w-full",
      name: "text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-4",
      designation: "text-2xl md:text-3xl text-blue-600 font-medium mb-6",
      bio: "text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl",
      sectionTitle: "text-4xl font-bold mb-12 flex items-center gap-2 text-gray-900",
      card: "bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all transform hover:-translate-y-1",
      skillBadge: "bg-blue-50 text-blue-700 px-6 py-3 rounded-xl font-semibold text-lg hover:bg-blue-100 transition-colors cursor-default",
      link: "text-gray-500 hover:text-blue-600 transition-colors text-lg font-medium",
    },
    terminal: {
      container: "bg-black text-green-500 font-mono scroll-smooth",
      sectionWrapper: "min-h-screen flex flex-col justify-center p-6 md:p-12 border-b-2 border-green-900 last:border-0",
      contentInner: "w-full max-w-5xl",
      name: "text-4xl md:text-6xl font-bold uppercase tracking-widest mb-4",
      designation: "text-xl md:text-2xl text-green-400 mb-6",
      bio: "text-lg md:text-xl text-green-300 max-w-3xl",
      sectionTitle: "text-2xl md:text-3xl uppercase tracking-widest border-b border-green-800 pb-4 mb-10",
      card: "border border-green-800 p-6 hover:bg-green-900/30 transition-colors",
      skillBadge: "border border-green-500 text-green-500 px-4 py-2 hover:bg-green-900 transition-colors cursor-default",
      link: "text-green-600 hover:text-green-400 underline text-lg",
    },
    minimal: {
      container: "bg-white text-black font-sans scroll-smooth",
      sectionWrapper: "min-h-screen flex flex-col justify-center px-6 py-24",
      contentInner: "max-w-3xl mx-auto w-full",
      name: "text-5xl md:text-6xl font-light tracking-tight mb-2",
      designation: "text-xl md:text-2xl text-gray-400 mb-8 font-light",
      bio: "text-xl md:text-2xl leading-relaxed font-light",
      sectionTitle: "text-sm font-semibold uppercase tracking-widest text-gray-400 mb-12",
      card: "group border-b border-gray-100 pb-8 mb-8 last:border-0 hover:bg-gray-50 transition-colors p-6 -mx-6 rounded-2xl",
      skillBadge: "text-gray-600 text-lg after:content-['•'] after:mx-3 last:after:hidden inline-block font-light",
      link: "text-gray-400 hover:text-black transition-colors text-lg",
    }
  };

  const theme = themes[data.theme] || themes.modern;

  return (
    <div className={theme.container}>
      {/* Intro Section */}
      <section id="intro" className={theme.sectionWrapper}>
        <div className={`${theme.contentInner} ${data.theme === 'modern' ? 'text-center flex flex-col items-center' : ''}`}>
          <h1 className={theme.name}>{data.fullName || 'Your Name'}</h1>
          <p className={theme.designation}>
            {data.theme === 'terminal' ? '> ' : ''}
            {data.designation || 'Your Designation'}
            {data.theme === 'terminal' ? '<blink>_</blink>' : ''}
          </p>
          <p className={theme.bio}>{data.bio || 'Add a bio to introduce yourself.'}</p>
        </div>
      </section>

      {/* Skills & Tech Stack Section */}
      {data.skills.length > 0 && (
        <section id="skills" className={theme.sectionWrapper}>
          <div className={theme.contentInner}>
            <h2 className={theme.sectionTitle}>
              {data.theme === 'terminal' && '~/skills $'} Tech Stack & Skills
            </h2>
            <div className={`flex flex-wrap ${data.theme === 'minimal' ? 'gap-2 md:gap-4' : 'gap-4 md:gap-6'}`}>
              {data.skills.map((skill, index) => (
                <span key={index} className={theme.skillBadge}>{skill}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {data.projects.length > 0 && (
        <section id="projects" className={theme.sectionWrapper}>
          <div className={theme.contentInner}>
            <h2 className={theme.sectionTitle}>
              {data.theme === 'terminal' && '~/projects $'} Featured Projects
            </h2>
            <div className={data.theme === 'modern' ? 'grid grid-cols-1 md:grid-cols-2 gap-8' : 'space-y-12'}>
              {data.projects.map((project, index) => (
                <div key={index} className={theme.card}>
                  <h3 className={`font-bold ${data.theme === 'modern' ? 'text-2xl mb-3 text-gray-900' : 'text-xl md:text-2xl mb-2'}`}>
                    {project.title}
                  </h3>
                  <p className={data.theme === 'modern' ? 'text-gray-600 mb-6 text-lg' : 'opacity-80 mb-6 text-lg'}>
                    {project.description}
                  </p>
                  {project.link && (
                    <a href={formatUrl(project.link)} target="_blank" rel="noreferrer" className={`${theme.link} font-medium`}>
                      {data.theme === 'terminal' ? '[View Project]' : 'View Project ->'}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className={theme.sectionWrapper}>
        <div className={`${theme.contentInner} ${data.theme === 'modern' ? 'text-center flex flex-col items-center' : ''}`}>
          <h2 className={theme.sectionTitle}>
            {data.theme === 'terminal' && '~/contact $'} Let's Connect
          </h2>
          <p className={`mb-12 max-w-2xl ${data.theme === 'modern' ? 'mx-auto text-xl text-gray-600' : 'text-xl'}`}>
            I'm always open to new opportunities and collaborations. Feel free to reach out through any of the platforms below!
          </p>
          <div className={`flex flex-wrap ${data.theme === 'modern' ? 'justify-center' : ''} gap-8`}>
            {data.socialLinks.github && <a href={formatUrl(data.socialLinks.github)} target="_blank" rel="noreferrer" className={theme.link}>GitHub</a>}
            {data.socialLinks.linkedin && <a href={formatUrl(data.socialLinks.linkedin)} target="_blank" rel="noreferrer" className={theme.link}>LinkedIn</a>}
            {data.socialLinks.twitter && <a href={formatUrl(data.socialLinks.twitter)} target="_blank" rel="noreferrer" className={theme.link}>Twitter</a>}
            {data.socialLinks.website && <a href={formatUrl(data.socialLinks.website)} target="_blank" rel="noreferrer" className={theme.link}>Website</a>}
          </div>
        </div>
      </section>
    </div>
  );
}
