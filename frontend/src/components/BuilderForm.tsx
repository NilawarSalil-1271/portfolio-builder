'use client';

import React, { useState } from 'react';
import { useBuilder, Project } from '@/context/BuilderContext';

export default function BuilderForm() {
  const {
    portfolioData,
    updatePortfolioData,
    updateSocialLinks,
    addSkill,
    removeSkill,
    addProject,
    updateProject,
    removeProject
  } = useBuilder();

  const [newSkill, setNewSkill] = useState('');
  
  const [newProject, setNewProject] = useState<Project>({
    title: '',
    description: '',
    link: '',
    imageUrl: ''
  });

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(newSkill);
      setNewSkill('');
    }
  };

  const handleAddProject = () => {
    if (newProject.title) {
      addProject(newProject);
      setNewProject({ title: '', description: '', link: '', imageUrl: '' });
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-zinc-900 overflow-y-auto h-full border-r border-gray-200 dark:border-zinc-800">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">StackShow Builder</h2>
      
      {/* Basic Info */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Basic Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
            <input
              type="text"
              value={portfolioData.fullName}
              onChange={(e) => updatePortfolioData({ fullName: e.target.value })}
              className="w-full p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Jane Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Designation</label>
            <input
              type="text"
              value={portfolioData.designation}
              onChange={(e) => updatePortfolioData({ designation: e.target.value })}
              className="w-full p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Software Engineer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
            <textarea
              value={portfolioData.bio}
              onChange={(e) => updatePortfolioData({ bio: e.target.value })}
              className="w-full p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none h-24"
              placeholder="Tell us about yourself..."
            />
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Social Links</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">LinkedIn URL</label>
            <input
              type="text"
              value={portfolioData.socialLinks.linkedin}
              onChange={(e) => updateSocialLinks({ linkedin: e.target.value })}
              className="w-full p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="https://linkedin.com/in/username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">GitHub URL</label>
            <input
              type="text"
              value={portfolioData.socialLinks.github}
              onChange={(e) => updateSocialLinks({ github: e.target.value })}
              className="w-full p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="https://github.com/username"
            />
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Skills</h3>
        <div className="flex flex-wrap gap-2 mb-3">
          {portfolioData.skills.map((skill, index) => (
            <div key={index} className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 px-3 py-1 rounded-full text-sm flex items-center">
              {skill}
              <button 
                onClick={() => removeSkill(index)}
                className="ml-2 text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-100 font-bold"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
        <div>
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={handleAddSkill}
            className="w-full p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Type a skill and press Enter"
          />
        </div>
      </section>

      {/* Projects */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Projects</h3>
        
        {/* Existing Projects */}
        <div className="space-y-4 mb-6">
          {portfolioData.projects.map((project, index) => (
            <div key={index} className="p-4 border border-gray-200 dark:border-zinc-700 rounded-lg relative">
              <button 
                onClick={() => removeProject(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold"
              >
                &times;
              </button>
              <h4 className="font-bold text-gray-900 dark:text-white">{project.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{project.description}</p>
              {project.link && <a href={project.link} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:underline mt-2 inline-block">View Project</a>}
            </div>
          ))}
        </div>

        {/* Add New Project */}
        <div className="p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-lg space-y-3">
          <h4 className="font-medium text-gray-800 dark:text-gray-200">Add New Project</h4>
          <input
            type="text"
            value={newProject.title}
            onChange={(e) => setNewProject({...newProject, title: e.target.value})}
            className="w-full p-2 text-sm border rounded-md dark:bg-zinc-800 dark:border-zinc-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Project Title"
          />
          <textarea
            value={newProject.description}
            onChange={(e) => setNewProject({...newProject, description: e.target.value})}
            className="w-full p-2 text-sm border rounded-md dark:bg-zinc-800 dark:border-zinc-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none h-20"
            placeholder="Project Description"
          />
          <input
            type="text"
            value={newProject.link}
            onChange={(e) => setNewProject({...newProject, link: e.target.value})}
            className="w-full p-2 text-sm border rounded-md dark:bg-zinc-800 dark:border-zinc-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Project Link (optional)"
          />
          <button 
            onClick={handleAddProject}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors"
          >
            Add Project
          </button>
        </div>
      </section>

      {/* Theme Selection */}
      <section className="mb-12">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Theme</h3>
        <div className="grid grid-cols-3 gap-3">
          {['modern', 'terminal', 'minimal'].map((theme) => (
            <button
              key={theme}
              onClick={() => updatePortfolioData({ theme: theme as any })}
              className={`py-3 rounded-lg capitalize font-medium border-2 transition-all ${
                portfolioData.theme === theme 
                  ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-500' 
                  : 'border-gray-200 text-gray-600 hover:border-blue-300 dark:border-zinc-700 dark:text-gray-400 dark:hover:border-zinc-600'
              }`}
            >
              {theme}
            </button>
          ))}
        </div>
      </section>
      
      {/* Save Button (to be hooked up to backend later) */}
      <div className="sticky bottom-0 pt-4 pb-6 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800">
        <button className="w-full py-3 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 dark:text-black text-white rounded-lg font-bold shadow-lg transition-all transform hover:-translate-y-0.5">
          Save Portfolio
        </button>
      </div>
    </div>
  );
}
