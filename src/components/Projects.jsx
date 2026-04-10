import { useReveal } from '../hooks/useReveal'

const projects = [
  {
    title: 'AI-Powered Medical Report Analyzer and Advisor',
    tech: 'Streamlit, SpaCy, PyTesseract, Pdfplumber',
    description:
      'Developed a custom AI model for medical report analysis using fine-tuned BERT and NER to identify diseases and suggest treatments. Exposed the model through RESTful APIs and built a Streamlit-based web interface for real-time analysis, insights, and visualization of medicine effectiveness.',
  },
  {
    title: 'Political Sentiment Analysis Using Twitter Data',
    tech: 'Python, TextBlob, Google Translate API (googletrans), Langid',
    description:
      'Developed a sentiment analysis system using NLP and Machine Learning to analyze and classify political tweets, accurately predicting public sentiment trends based on social media discussions.',
  },
  {
    title: 'Secure Image Cryptography Using Visual Cryptography ',
    tech: 'OpenCV, PIL, AES, SHA-256, Visual Cryptography',
    description:
      'Implemented secure image sharing using AES-256 encryption and Visual Cryptography. Encrypted images and split decryption keys into multiple shares, allowing only authorized users to reconstruct and decrypt them.',
  },
  {
    title: 'DevOps Incident Tracking Mobile Application',
    tech: 'Flutter (DART), Java Spring Boot, MySQL',
    description:
      'Developed a mobile application using Flutter to track and manage DevOps incidents. Built the backend with Java Spring Boot and designed RESTful APIs, using MySQL for data storage. Implemented incident logging, severity tracking, status updates, and filtering, demonstrating client-server architecture and API integration.',
  },
]

function Projects() {
  const [ref, visible] = useReveal()

  return (
    <section id="projects" className="projects">
      <div ref={ref} className={`section__container ${visible ? 'reveal' : ''}`}>
        <h2 className="section__title">Projects</h2>
        <div className="section__title-bar"></div>

        <div className="projects__grid">
          {projects.map((proj, i) => (
            <div key={i} className="projects__card">
              <div className="projects__card-number">0{i + 1}</div>
              <h3 className="projects__card-title">{proj.title}</h3>
              <p className="projects__card-tech">{proj.tech}</p>
              <p className="projects__card-desc">{proj.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
