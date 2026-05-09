'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Project {
  title: string;
  description: string;
  link: string;
  imageUrl: string;
}

export interface SocialLinks {
  linkedin: string;
  github: string;
  twitter: string;
  website: string;
}

export interface PortfolioData {
  fullName: string;
  designation: string;
  bio: string;
  socialLinks: SocialLinks;
  skills: string[];
  projects: Project[];
  theme: 'modern' | 'terminal' | 'minimal';
}

interface BuilderContextType {
  portfolioData: PortfolioData;
  updatePortfolioData: (data: Partial<PortfolioData>) => void;
  updateSocialLinks: (data: Partial<SocialLinks>) => void;
  addSkill: (skill: string) => void;
  removeSkill: (index: number) => void;
  addProject: (project: Project) => void;
  updateProject: (index: number, project: Partial<Project>) => void;
  removeProject: (index: number) => void;
}

const defaultData: PortfolioData = {
  fullName: '',
  designation: '',
  bio: '',
  socialLinks: {
    linkedin: '',
    github: '',
    twitter: '',
    website: ''
  },
  skills: [],
  projects: [],
  theme: 'modern'
};

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export const BuilderProvider = ({ children }: { children: ReactNode }) => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(defaultData);

  const updatePortfolioData = (data: Partial<PortfolioData>) => {
    setPortfolioData(prev => ({ ...prev, ...data }));
  };

  const updateSocialLinks = (data: Partial<SocialLinks>) => {
    setPortfolioData(prev => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, ...data }
    }));
  };

  const addSkill = (skill: string) => {
    if (skill.trim() && !portfolioData.skills.includes(skill)) {
      setPortfolioData(prev => ({
        ...prev,
        skills: [...prev.skills, skill.trim()]
      }));
    }
  };

  const removeSkill = (index: number) => {
    setPortfolioData(prev => {
      const newSkills = [...prev.skills];
      newSkills.splice(index, 1);
      return { ...prev, skills: newSkills };
    });
  };

  const addProject = (project: Project) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: [...prev.projects, project]
    }));
  };

  const updateProject = (index: number, project: Partial<Project>) => {
    setPortfolioData(prev => {
      const newProjects = [...prev.projects];
      newProjects[index] = { ...newProjects[index], ...project };
      return { ...prev, projects: newProjects };
    });
  };

  const removeProject = (index: number) => {
    setPortfolioData(prev => {
      const newProjects = [...prev.projects];
      newProjects.splice(index, 1);
      return { ...prev, projects: newProjects };
    });
  };

  return (
    <BuilderContext.Provider
      value={{
        portfolioData,
        updatePortfolioData,
        updateSocialLinks,
        addSkill,
        removeSkill,
        addProject,
        updateProject,
        removeProject
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (context === undefined) {
    throw new Error('useBuilder must be used within a BuilderProvider');
  }
  return context;
};
