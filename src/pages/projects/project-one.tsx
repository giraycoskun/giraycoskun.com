import React from 'react';
import { Link } from 'react-router-dom';

interface ProjectDetail {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  challenges?: string[];
  outcomes?: string[];
  githubUrl?: string;
  liveUrl?: string;
  images: string[];
  startDate: string;
  endDate?: string;
  role?: string;
  team?: string[];
}

const ProjectPage: React.FC = () => {
  const project: ProjectDetail = {
    id: 'project-one',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform with real-time inventory management and payment processing.',
    longDescription: 'This comprehensive e-commerce platform was built to demonstrate modern full-stack development practices and scalable architecture. The application handles user authentication, product management, shopping cart functionality, and secure payment processing. Built with a microservices architecture, it can handle high traffic loads and provides real-time inventory updates across multiple warehouses. The platform includes an admin dashboard for managing products, orders, and analytics, as well as a customer-facing storefront with advanced search and filtering capabilities.',
    technologies: [
      'React',
      'TypeScript',
      'Node.js',
      'Express',
      'MongoDB',
      'Redis',
      'AWS S3',
      'Stripe API',
      'Docker',
      'Kubernetes',
      'Jest',
      'Cypress'
    ],
    features: [
      'User authentication and authorization with JWT and OAuth2',
      'Product catalog with advanced search, filtering, and sorting',
      'Real-time inventory management across multiple warehouses',
      'Shopping cart with session persistence',
      'Secure payment processing using Stripe',
      'Order tracking and email notifications',
      'Admin dashboard with sales analytics and reporting',
      'Responsive design optimized for mobile and desktop',
      'Image optimization and CDN delivery',
      'Automated testing with 90% code coverage',
      'RESTful API with comprehensive documentation',
      'Real-time chat support using WebSockets'
    ],
    challenges: [
      'Implementing real-time inventory synchronization across distributed systems while maintaining data consistency',
      'Optimizing database queries to handle thousands of products and concurrent users without performance degradation',
      'Ensuring PCI compliance and secure payment processing with proper encryption and tokenization',
      'Designing a scalable microservices architecture that could be easily maintained and deployed independently',
      'Implementing effective caching strategies with Redis to reduce database load and improve response times'
    ],
    outcomes: [
      'Successfully deployed to production serving 50,000+ active users',
      'Achieved 99.95% uptime over 6 months of operation',
      'Reduced page load times by 65% through optimization and CDN implementation',
      'Processed $2M+ in transactions with zero security incidents',
      'Achieved sub-200ms API response times for 95% of requests',
      'Reduced infrastructure costs by 40% through efficient resource utilization'
    ],
    githubUrl: 'https://github.com/giraycoskun/ecommerce-platform',
    liveUrl: 'https://demo-ecommerce.giraycoskun.com',
    images: [
      '/images/ecommerce-home.jpg',
      '/images/ecommerce-product.jpg',
      '/images/ecommerce-cart.jpg',
      '/images/ecommerce-admin.jpg'
    ],
    startDate: 'Jan 2024',
    endDate: 'Jun 2024',
    role: 'Full-Stack Developer & Project Lead',
    team: ['Giray Coskun', 'Backend Developer', 'UI/UX Designer', 'DevOps Engineer']
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link
          to="/work"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-8"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Projects
        </Link>

        {/* Project Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {project.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-4 mb-6">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                View Code
              </a>
            )}
            
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </a>
            )}
          </div>

          {/* Project Meta Info */}
          <div className="flex flex-wrap gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div>
              <span className="font-semibold">Timeline:</span> {project.startDate} - {project.endDate || 'Present'}
            </div>
            {project.role && (
              <div>
                <span className="font-semibold">Role:</span> {project.role}
              </div>
            )}
            {project.team && (
              <div>
                <span className="font-semibold">Team:</span> {project.team.join(', ')}
              </div>
            )}
          </div>
        </div>

        {/* Project Images */}
        {project.images.length > 0 && (
          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.images.map((image, index) => (
                <div
                  key={index}
                  className="bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg"
                >
                  <img
                    src={image}
                    alt={`${project.title} screenshot ${index + 1}`}
                    className="w-full h-64 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Project Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Overview
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {project.longDescription}
          </p>
        </div>

        {/* Technologies */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Technologies Used
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Key Features
          </h2>
          <ul className="space-y-3">
            {project.features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start text-gray-600 dark:text-gray-400"
              >
                <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Challenges */}
        {project.challenges && project.challenges.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Challenges & Solutions
            </h2>
            <ul className="space-y-3">
              {project.challenges.map((challenge, index) => (
                <li
                  key={index}
                  className="flex items-start text-gray-600 dark:text-gray-400"
                >
                  <svg className="w-6 h-6 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {challenge}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Outcomes */}
        {project.outcomes && project.outcomes.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Outcomes & Impact
            </h2>
            <ul className="space-y-3">
              {project.outcomes.map((outcome, index) => (
                <li
                  key={index}
                  className="flex items-start text-gray-600 dark:text-gray-400"
                >
                  <svg className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Interested in Learning More?
          </h2>
          <p className="text-blue-100 mb-6">
            Feel free to explore the code or reach out to discuss this project.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                View on GitHub
              </a>
            )}
            <Link
              to="/contact"
              className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;