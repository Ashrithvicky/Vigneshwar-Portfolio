import { FiActivity, FiMessageSquare, FiLock, FiGitBranch, FiGithub, FiArrowUpRight } from 'react-icons/fi'
import HorizontalGallery from './HorizontalGallery'
import { resolveExternalUrl } from '../utils/links'

const projects = [
  {
    category: 'AI / HEALTHCARE',
    name: 'Medical intelligence',
    icon: FiActivity,
    visual: 'medical',
    flow: ['Medical report', 'OCR + BERT', 'Clinical insights'],
    title: 'AI-Powered Medical Report Analyzer and Advisor',
    repositoryUrl: 'https://github.com/Ashrithvicky/Artificial-Intelligence-Based-Medical-Report-Analyser.git',
    tech: 'Streamlit, SpaCy, PyTesseract, Pdfplumber',
    description:
      'Developed a custom AI model for medical report analysis using fine-tuned BERT and NER to identify diseases and suggest treatments. Exposed the model through RESTful APIs and built a Streamlit-based web interface for real-time analysis, insights, and visualization of medicine effectiveness.',
  },
  {
    category: 'NLP / DATA SCIENCE',
    name: 'Reading public sentiment',
    icon: FiMessageSquare,
    visual: 'sentiment',
    flow: ['Multilingual tweets', 'NLP pipeline', 'Sentiment trends'],
    title: 'Political Sentiment Analysis Using Twitter Data',
    repositoryUrl: 'https://github.com/Ashrithvicky/TwitterSentimentAnalysis.git',
    tech: 'Python, TextBlob, Google Translate API (googletrans), Langid',
    description:
      'Developed a sentiment analysis system using NLP and Machine Learning to analyze and classify political tweets, accurately predicting public sentiment trends based on social media discussions.',
  },
  {
    category: 'SECURITY / CRYPTOGRAPHY',
    name: 'Privacy, by design',
    icon: FiLock,
    visual: 'security',
    flow: ['Source image', 'AES-256 + shares', 'Secure reconstruction'],
    title: 'Secure Image Cryptography Using Visual Cryptography ',
    repositoryUrl: 'https://github.com/Ashrithvicky/ImageCryptography.git',
    tech: 'OpenCV, PIL, AES, SHA-256, Visual Cryptography',
    description:
      'Implemented secure image sharing using AES-256 encryption and Visual Cryptography. Encrypted images and split decryption keys into multiple shares, allowing only authorized users to reconstruct and decrypt them.',
  },
  {
    category: 'FULL STACK / DEVOPS',
    name: 'From incident to resolution',
    icon: FiGitBranch,
    visual: 'devops',
    flow: ['Flutter client', 'Spring Boot API', 'MySQL'],
    title: 'DevOps Incident Tracking Mobile Application',
    repositoryUrl: '',
    tech: 'Flutter (DART), Java Spring Boot, MySQL',
    description:
      'Developed a mobile application using Flutter to track and manage DevOps incidents. Built the backend with Java Spring Boot and designed RESTful APIs, using MySQL for data storage. Implemented incident logging, severity tracking, status updates, and filtering, demonstrating client-server architecture and API integration.',
  },
]

function Projects({ items = projects }) {
  return (
    <section id="projects" className="projects">
      <HorizontalGallery id="project-gallery" label="Selected projects" noun="projects" eyebrow="01 / SELECTED WORK" title={<>Ideas into <em>working software.</em></>}>
          {items.map((project, index) => {
            const repositoryUrl = resolveExternalUrl(project.repositoryUrl, 'github.com', 2)
            return (
            <article key={project.title} className={`projects__card projects__card--${project.visual}`}>
              <div className="projects__visual" aria-hidden="true">
                <span className="projects__visual-category">{project.category}</span>
                <project.icon className="projects__visual-icon" />
                <p className="projects__visual-name">{project.name}</p>
                <div className="projects__flow">{project.flow.map((label) => <span key={label}>{label}</span>)}</div>
                <span className="projects__visual-number">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <div className="projects__body">
                <p className="projects__card-tech">{project.tech}</p>
                <h3 className="projects__card-title">{project.title.trim()}</h3>
                <p className="projects__card-desc">{project.description}</p>
                {repositoryUrl ? (
                  <a className="card-link projects__repository-link" href={repositoryUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title.trim()} on GitHub`}><FiGithub aria-hidden="true" /> GitHub <FiArrowUpRight aria-hidden="true" /></a>
                ) : <span className="projects__repository-pending" title="Repository URL not added yet"><FiGithub aria-hidden="true" /> Repository pending</span>}
              </div>
            </article>
            )
          })}
      </HorizontalGallery>
    </section>
  )
}

export default Projects
