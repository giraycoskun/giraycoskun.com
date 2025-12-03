import React, { useState } from "react";
import { Link } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

interface Project {
  id: number;
  title: string;
  projectUrl: string;
  description: string[]; // Changed from string to string[]
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  blogSlug?: string;
  docUrl?: string;
}

interface Publication {
  id: number;
  title: string;
  authors: string;
  venue: string;
  year: number;
  doi?: string;
  pdfUrl?: string;
  abstract?: string;
}

// interface Education {
//   id: number;
//   degree: string;
//   institution: string;
//   location: string;
//   startDate: string;
//   endDate: string;
//   description?: string[];
//   gpa?: string;
// }

interface WorkExperience {
  id: number;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
  technologies?: string[];
}

interface SkillCategory {
  category: string;
  skills: Array<{
    name: string;
    icon: string; // URL to icon or badge
  }>;
}

const WorkPage: React.FC = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // const education: Education[] = [
  //   {
  //     id: 1,
  //     degree: "Master of Science in Computer Science",
  //     institution: "Technical University of Munich",
  //     location: "Munich, Germany",
  //     startDate: "Sep 2024",
  //     endDate: "Jun 2026",
  //     description: [""],
  //   },
  //   {
  //     id: 2,
  //     degree: "Bachelor of Science in Computer Science and Engineering",
  //     institution: "Sabanci University",
  //     location: "Istanbul, Turkey",
  //     startDate: "Sep 2017",
  //     endDate: "Jun 2023",
  //     description: ["Double Major in Economics", "Minor in Mathematics"],
  //   },
  // ];

  const workExperiences: WorkExperience[] = [
    {
      id: 1,
      position: "DevOps Engineer",
      company: "RedRose Technology",
      location: "Istanbul, Türkiye",
      startDate: "Sep 2023",
      endDate: "March 2024",
      description: [
        "Managed AWS infrastructure and deployments",
        "Implemented CI/CD pipelines using Docker",
        "Automated deployment processes",
      ],
      technologies: ["AWS", "Docker", "Java", "Python"],
    },
    {
      id: 2,
      position: "Cloud Consultant Intern",
      company: "Skyloop",
      location: "Istanbul, Türkiye",
      startDate: "June 2022",
      endDate: "Sep 2022",
      description: [
        "Achieved AWS Certified Solutions Architect – Associate certification to validate cloud architecture skills.",
        "Designed and implemented cloud infrastructure solutions",
      ],
      technologies: ["AWS", "Terraform", "Kubernetes"],
    },
    {
      id: 3,
      position: "Backend Developer Intern",
      company: "Migros E-commerce",
      location: "Istanbul, Türkiye",
      startDate: "June 2021",
      endDate: "Sep 2021",
      description: [""],
      technologies: ["Java", "Docker", "MySQL"],
    },
    {
      id: 4,
      position: "Software Engineer Intern",
      company: "Havelsan",
      location: "Istanbul, Türkiye",
      startDate: "Jun 2020",
      endDate: "Sep 2020",
      description: [
        "Conducted research on machine learning algorithms for image recognition tasks.",
      ],
      technologies: ["Python", "TensorFlow", "Keras"],
    },
    {
      id: 5,
      position: "MLOps Engineer Intern",
      company: "Spiky AI",
      location: "Buffalo, New York (Remote)",
      startDate: "Feb 2020",
      endDate: "Jun 2020",
      description: [
        "Assisted in research on natural language processing and sentiment analysis.",
      ],
      technologies: ["Python", "NLTK", "Scikit-learn"],
    },
    {
      id: 6,
      position: "Learning Assistant",
      company: "Sabanci University",
      location: "Istanbul, Türkiye",
      startDate: "Feb 2021",
      endDate: "Jun 2021",
      description: ["."],
      technologies: ["Python", "C++"],
    },
    {
      id: 7,
      position: "Academic Support Program Student Work",
      company: "Sabanci University",
      location: "Istanbul, Türkiye",
      startDate: "Sep 2019",
      endDate: "Jun 2020",
      description: [
        "Provided academic support to students in introductory programming courses.",
      ],
      technologies: ["Python", "C++"],
    },
  ];

  const publications: Publication[] = [
    {
      id: 1,
      title:
        "Using Unified Combinatorial Interaction Testing for MC/DC Coverage",
      authors: "Giray Coskun, Cankut Coskun, Hanefi Mercan, Cemal Yilmaz",
      venue:
        "2022 IEEE International Conference on Software Testing, Verification and Validation Workshops (ICSTW)",
      year: 2022,
      doi: "https://doi.ieeecomputersociety.org/10.1109/ICSTW55395.2022.00023",
      abstract:
        "In this work, we express the masking and unique-cause MC/DC coverage criteria in Unified Combinatorial Interaction Testing (U-CIT) to test the interactions between the compile-time configuration options in highly configurable software systems. Our goal is not to propose yet another approach for achieving MC/DC coverage, but to further demonstrate the flexibility of U-CIT by applying it to a coverage criterion, which is quite different than the ones addressed by U-CIT so far. As the MC/DC criterion requires two test cases to show the independence of each condition, the test cases included in a U-CIT object cannot be generated independently from each other, which was the case for the coverage criteria addressed by U-CIT so far. Our empirical evaluations conducted on a dozen of highly configurable software systems demonstrate that U-CIT can flexibly address the aforementioned coverage criteria.",
    },
    {
      id: 2,
      title:
        "CIT-daily: A combinatorial interaction testing-based daily build process",
      authors:
        "Hanefi Mercan, Atakan Aytar, Giray Coskun, Dilara Mustecep, Gülsüm Uzer, Cemal Yilmaz",
      venue: "Journal of Systems and Software",
      year: 2022,
      doi: "https://doi.org/10.1016/j.jss.2022.111353",
      abstract:
        "In this work, we introduce an approach, called CIT-daily, which integrates combinatorial interaction testing (CIT) with the daily build processes to systematically test the interactions between the factors/parameters affecting the system’s behaviors, on a daily basis. We also develop a number of CIT-daily strategies and empirically evaluate them on highly-configurable systems. The first strategy tests the same t-way covering array every day throughout the process, achieving a t-way coverage on a daily basis by covering each possible combination of option settings for every combination of options. The other strategies, on the other hand, while guaranteeing a t-way coverage on a daily basis, aim to cover higher order interactions between the configuration options over time by varying the t-way covering arrays tested. In the experiments, we observed that the proposed approach significantly improved the effectiveness (i.e., fault revealing abilities) of the daily build processes; randomizing the coverage of higher order interactions between the configuration options while guaranteeing a base t-way coverage every day, further improved the effectiveness; and the more the higher order interactions covered during the process, the higher the fault revealing abilities tended to be.",
    },
    {
      id: 3,
      title:
        "Unsupervised Adaptation of DNN for Brain-Computer Interface Spellers",
      authors:
        "Osman Berke Güney, Deniz Küçükahmetler, Pelinsu Çiftçioğlu, Giray Coşkun, Hüseyin Özkan",
      venue:
        "2022 30th Signal Processing and Communications Applications Conference (SIU)",
      year: 2022,
      doi: "https://doi.org/10.1109/SIU55565.2022.9864700",
      abstract:
        "Brain-computer interface (BCI) spellers, based on the steady-state evoked potentials (SSVEP), significantly contribute to the communication of individuals with neuromuscular disorders. These systems aim to predict a target character that a user is intended to spell as fast as possible while maintaining high accuracy. Accordingly, target character identification methods aim to reach the high information transfer rate (ITR). Methods reaching high ITR values in the literature use participants’ labeled data for user calibration, which requires long and exhausting experiments for every individual that will use the speller. In this study, we developed a method that does not require labeled data from the new users; as the system is used it utilizes the accumulated unlabeled data effectively. Our method transfers the information obtained from previous users to the new user by training a deep neural network (DNN). Afterward, it uses accumulated unlabeled data of the new user to adapt the transferred DNN to that user. Adaptation is performed by assuming the DNN model’s predicted target labels on the data as correct. And the model is updated in every iteration by utilizing dropout layers. Our method is compared with online template transfer canonical correlation analysis (OTT-CCA) and adaptive combined transfer canonical correlation analysis (Adaptive-C3A) methods. The comparison is performed on two large publicly available datasets (benchmark and BETA) for signal lengths between 0.2 − 1.0 seconds (s). The results have shown that our method reached approximately 5% higher maximum ITR.",
    },
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: "Home Server Dashboard",
      projectUrl: "https://server.giraycoskun.dev",
      description: [
        "Full-stack web application for monitoring home server",
        "Real-time metrics and system health monitoring",
        "Built with modern technologies and best practices",
      ],
      technologies: ["React", "Express.js", "TypeScript", "Nginx"],
      githubUrl: "https://github.com/giraycoskun/server.giraycoskun.dev",
      liveUrl: "https://server.giraycoskun.dev",
      blogSlug: "develop-server-landing-page",
    },
    {
      id: 2,
      title: "Personal Website",
      projectUrl: "https://giraycoskun.com",
      description: [
        "React and TypeScript-based personal website showcasing my projects and blog.",
        "Hosted on Cloudflare Pages.",
      ],
      technologies: [
        "React",
        "Vite",
        "TypeScript",
        "Tailwind CSS",
        "Cloudflare Pages",
      ],
      githubUrl: "https://github.com/giraycoskun/giraycoskun.com",
      liveUrl: "https://giraycoskun.com",
    },
    {
      id: 3,
      title: "Encryption in Assembly",
      projectUrl: "https://github.com/giraycoskun/encryption-in-assembly",
      description: [
        "CS 401 - Computer Architecture Course Project",
        "Implemented a custom AES-like encryption algorithms in x86-64 assembly language.",
      ],
      technologies: ["x86-64 Assembly", "AES"],
      githubUrl: "https://github.com/giraycoskun/encryption-in-assembly"
    },
  ];

  const skillCategories: SkillCategory[] = [
    {
      category: "Languages & Frameworks",
      skills: [
        {
          name: "Python",
          icon: "https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white",
        },

        {
          name: "Go",
          icon: "https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white",
        },
        {
          name: "Java",
          icon: "https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white",
        },

        {
          name: "TypeScript",
          icon: "https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white",
        },
        {
          name: "JavaScript",
          icon: "https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black",
        },
      ],
    },
    {
      category: "Frameworks & Libraries",
      skills: [
        {
          name: "FastAPI",
          icon: "https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white",
        },
        {
          name: "PyTorch",
          icon: "https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white",
        },
        {
          name: "Spring Boot",
          icon: "https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white",
        },
        {
          name: "React",
          icon: "https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB",
        },
      ],
    },
    {
      category: "Database & Cloud",
      skills: [
        {
          name: "PostgreSQL",
          icon: "https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white",
        },
        {
          name: "MySQL",
          icon: "https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white",
        },
        {
          name: "MongoDB",
          icon: "https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white",
        },
        {
          name: "AWS",
          icon: "https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white",
        },
      ],
    },
    {
      category: "DevOps",
      skills: [
        {
          name: "Git",
          icon: "https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white",
        },
        {
          name: "Docker",
          icon: "https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white",
        },
        {
          name: "Kubernetes",
          icon: "https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white",
        },
        {
          name: "Terraform",
          icon: "https://img.shields.io/badge/Terraform-7B42BC?style=for-the-badge&logo=terraform&logoColor=white",
        },
        {
          name: "Nginx",
          icon: "https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white",
        },
        {
          name: "Linux",
          icon: "https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black",
        },
      ],
    },
  ];

  // Helper: chunk array into rows of target size (generic version)
  const chunkIntoRows = <T,>(items: T[], rowSize: number): T[][] => {
    const rows: T[][] = [];
    for (let i = 0; i < items.length; i += rowSize) {
      rows.push(items.slice(i, i + rowSize));
    }
    return rows;
  };

  // Compute rows for lg screens (2 per row)
  const workExperienceRowsLG = chunkIntoRows(workExperiences, 2);
  const projectRowsLG = chunkIntoRows(projects, 2);

  // Add smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            My Work & Projects
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            A collection of my recent work and personal projects
          </p>

          <div className="flex justify-center gap-6 mt-6">
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="Resume"
            >
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Resume
            </a>

            <a
              href="https://github.com/giraycoskun"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="GitHub"
            >
              <svg
                className="w-6 h-6 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>

            <a
              href="https://linkedin.com/in/giraycoskun"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="LinkedIn"
            >
              <svg
                className="w-6 h-6 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>

            <a
              href="mailto:giraycoskun.dev@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="Email"
            >
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              E-mail
            </a>
          </div>
        </div>

        <hr className="border-gray-300 dark:border-gray-700 mb-12" />

        {/* Table of Contents */}
        <div className="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mx-auto max-w-md">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            Table of Contents
          </h3>
          <nav className="flex flex-col justify-center max-w-md mx-auto gap-3">
            <button
              onClick={() => scrollToSection("skills")}
              className="px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
            >
              <span className="font-medium">Skills</span>
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
            >
              <span className="font-medium">Projects</span>
            </button>
            <button
              onClick={() => scrollToSection("experience")}
              className="px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
            >
              <span className="font-medium">Work Experience</span>
            </button>
            <button
              onClick={() => scrollToSection("education")}
              className="px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
            >
              <span className="font-medium">Education</span>
            </button>
            <button
              onClick={() => scrollToSection("publications")}
              className="px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
            >
              <span className="font-medium">Publications</span>
            </button>
          </nav>
        </div>

        <hr className="border-gray-300 dark:border-gray-700 mb-12" />

        {/* Skills Section */}
        <div id="skills" className="mb-12 scroll-mt-20">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            Skills
          </h3>
          <div className="space-y-8">
            {skillCategories.map((category, idx) => (
              <div key={idx}>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  {category.category}
                </h4>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIdx) => (
                    <img
                      key={skillIdx}
                      src={skill.icon}
                      alt={skill.name}
                      className="h-7 transition-transform hover:scale-110"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-gray-300 dark:border-gray-700 mb-12" />

        {/* Projects Section */}
        <div id="projects" className="mb-12 scroll-mt-20">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center">
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                />
              </svg>
              Projects
            </h3>
            <a
              href="https://giraycoskun.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              View All Repos
            </a>
          </div>

          {/* Large screens: 2 per row */}
          <div className="hidden lg:flex lg:flex-col lg:gap-10">
            {projectRowsLG.map((row, rowIdx) => (
              <div key={`project-row-${rowIdx}`}>
                <div
                  className="gap-8"
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      row.length === 1
                        ? "minmax(0, 600px)"
                        : `repeat(${row.length}, minmax(0, 1fr))`,
                    justifyContent: row.length === 1 ? "center" : "normal",
                  }}
                >
                  {row.map((project) => (
                    <div key={project.id} className="relative">
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 relative z-10 h-full flex flex-col">
                        <div className="p-6 flex-1 flex flex-col">
                          <a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                              {project.title}
                            </h2>
                          </a>
                          {project.description &&
                            project.description.length > 0 && (
                              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4 space-y-1 flex-1">
                                {project.description
                                  .filter((d) => d && d.trim() !== "")
                                  .map((d, idx) => (
                                    <li key={idx}>{d}</li>
                                  ))}
                              </ul>
                            )}

                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.map((tech, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          <div className="flex gap-4 flex-wrap">
                            {project.blogSlug && (
                              <Link
                                to={`/blog/${project.blogSlug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                              >
                                <svg
                                  className="w-5 h-5 mr-1"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                  />
                                </svg>
                                Blog
                              </Link>
                            )}
                            {project.docUrl && (
                              <a
                                href={project.docUrl}
                                className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                              >
                                <svg
                                  className="w-5 h-5 mr-1"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                Docs
                              </a>
                            )}

                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                              >
                                <svg
                                  className="w-5 h-5 mr-1"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                </svg>
                                Code
                              </a>
                            )}

                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                              >
                                <svg
                                  className="w-5 h-5 mr-1"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                  />
                                </svg>
                                Live Demo
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile/Tablet fallback: apply same changes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:hidden">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 h-full flex flex-col"
              >
                <div className="p-6 flex-1 flex flex-col">
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                      {project.title}
                    </h2>
                  </a>
                  {project.description && project.description.length > 0 && (
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4 space-y-1 flex-1">
                      {project.description
                        .filter((d) => d && d.trim() !== "")
                        .map((d, idx) => (
                          <li key={idx}>{d}</li>
                        ))}
                    </ul>
                  )}

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 flex-wrap">
                    {project.blogSlug && (
                      <Link
                        to={`/blog/${project.blogSlug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <svg
                          className="w-5 h-5 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        Blog
                      </Link>
                    )}

                    {project.docUrl && (
                      <a
                        href={project.docUrl}
                        className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <svg
                          className="w-5 h-5 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Docs
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <svg
                          className="w-5 h-5 mr-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        Code
                      </a>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <svg
                          className="w-5 h-5 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-gray-300 dark:border-gray-700 mb-12" />

        {/* Work Experience */}
        <div id="experience" className="mb-12 scroll-mt-20">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Work Experience
          </h3>

          {/* Large screens: alternating rows (no connectors) */}
          <div className="hidden lg:flex lg:flex-col lg:gap-10 relative">
            {workExperienceRowsLG.map((row, rowIdx) => {
              return (
                <div key={`row-${rowIdx}`}>
                  <div
                    className={`gap-8`}
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        row.length === 1
                          ? "minmax(0, 600px)"
                          : `repeat(${row.length}, minmax(0, 1fr))`,
                      justifyContent: row.length === 1 ? "center" : "normal",
                    }}
                  >
                    {row.map((experience) => (
                      <div key={experience.id} className="relative">
                        {/* Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 hover:shadow-lg transition-all duration-300 hover:scale-105 relative z-10 h-full">
                          <div className="mb-3">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                              {experience.position}
                            </h4>
                            <p className="text-base text-blue-600 dark:text-blue-400 font-medium">
                              {experience.company}
                            </p>
                          </div>

                          <div className="mb-3 text-sm">
                            <p className="text-gray-600 dark:text-gray-400">
                              {experience.startDate} - {experience.endDate}
                            </p>
                            <p className="text-gray-500 dark:text-gray-500">
                              {experience.location}
                            </p>
                          </div>

                          {experience.description &&
                            experience.description.length > 0 && (
                              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mb-3 space-y-1">
                                {experience.description
                                  .filter(
                                    (d) =>
                                      d && d.trim() !== "" && d.trim() !== "."
                                  )
                                  .map((d, idx) => (
                                    <li key={idx}>{d}</li>
                                  ))}
                              </ul>
                            )}

                          {experience.technologies &&
                            experience.technologies.length > 0 && (
                              <div className="flex flex-wrap gap-1.5">
                                {experience.technologies.map(
                                  (tech, techIndex) => (
                                    <span
                                      key={techIndex}
                                      className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                                    >
                                      {tech}
                                    </span>
                                  )
                                )}
                              </div>
                            )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile/Tablet fallback */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:hidden">
            {workExperiences.map((experience) => (
              <div
                key={experience.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 hover:shadow-lg transition-all duration-300 hover:scale-105 h-full"
              >
                <div className="mb-3">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                    {experience.position}
                  </h4>
                  <p className="text-base text-blue-600 dark:text-blue-400 font-medium">
                    {experience.company}
                  </p>
                </div>

                <div className="mb-3 text-sm">
                  <p className="text-gray-600 dark:text-gray-400">
                    {experience.startDate} - {experience.endDate}
                  </p>
                  <p className="text-gray-500 dark:text-gray-500">
                    {experience.location}
                  </p>
                </div>

                {experience.description &&
                  experience.description.length > 0 && (
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mb-3 space-y-1">
                      {experience.description
                        .filter((d) => d && d.trim() !== "" && d.trim() !== ".")
                        .map((d, idx) => (
                          <li key={idx}>{d}</li>
                        ))}
                    </ul>
                  )}

                {experience.technologies &&
                  experience.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {experience.technologies
                        .slice(0, 3)
                        .map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      {experience.technologies.length > 3 && (
                        <span className="px-2 py-0.5 text-gray-500 dark:text-gray-400 text-sm">
                          +{experience.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>

        <hr className="border-gray-300 dark:border-gray-700 mb-12" />

        {/* Education */}
        <div id="education" className="mb-12 scroll-mt-20">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14l9-5-9-5-9 5 9 5z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
              />
            </svg>
            Education
          </h3>
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Master of Science in Computer Science
                  </h4>
                  <p className="text-lg text-blue-600 dark:text-blue-400">
                    Technical University of Munich
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Sep, 2024 - Present
                  </p>
                  <p className="text-gray-500 dark:text-gray-500 text-sm">
                    Munich, Germany
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Bachelor of Science in Computer Science and Engineering
                  </h4>
                  <p className="text-lg text-blue-600 dark:text-blue-400">
                    Sabanci University
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Sep, 2017 - Jun, 2023
                  </p>
                  <p className="text-gray-500 dark:text-gray-500 text-sm">
                    Istanbul, Turkey
                  </p>
                </div>
              </div>

              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-2 space-y-1">
                <li>Double Major in Economics</li>
                <li>Minor in Mathematics</li>
              </ul>
              {/* Coursework Diagram */}
              <div className="mt-4">
                <button
                  onClick={() => setIsLightboxOpen(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  View Coursework Diagram
                </button>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-300 dark:border-gray-700 mb-12" />

        {/* Publications Section */}
        <div id="publications" className="mb-16 scroll-mt-20">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            Publications
          </h3>
          <div className="space-y-6">
            {publications.map((publication) => (
              <div
                key={publication.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {publication.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  {publication.authors}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  <span className="font-medium">{publication.venue}</span> •{" "}
                  {publication.year}
                </p>
                {publication.abstract && (
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                    {publication.abstract}
                  </p>
                )}
                <div className="flex gap-4">
                  {publication.doi && (
                    <a
                      href={publication.doi}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <svg
                        className="w-5 h-5 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        />
                      </svg>
                      DOI
                    </a>
                  )}
                  {publication.pdfUrl && (
                    <a
                      href={publication.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <svg
                        className="w-5 h-5 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      PDF
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Lightbox
        open={isLightboxOpen}
        close={() => setIsLightboxOpen(false)}
        slides={[
          {
            src: "/coursework.drawio.png",
            alt: "Coursework Diagram",
          },
        ]}
        carousel={{ finite: true }}
        controller={{ closeOnBackdropClick: true }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
        plugins={[Zoom]}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          doubleClickMaxStops: 2,
          keyboardMoveDistance: 50,
          wheelZoomDistanceFactor: 100,
          pinchZoomDistanceFactor: 100,
          scrollToZoom: true,
        }}
      />
    </div>
  );
};

export default WorkPage;
