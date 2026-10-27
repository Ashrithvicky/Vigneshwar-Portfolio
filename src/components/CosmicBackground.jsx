function CosmicBackground() {
  return (
    <div className="cosmos" aria-hidden="true">
      <div className="hero__stars">
        {Array.from({ length: 550 }, (_, index) => (
          <span key={index} className={index >= 500 ? 'hero__star--light-extra' : undefined} style={{
            left: `${(index * 37.73) % 100}%`,
            top: `${(index * 19.31) % 100}%`,
            '--star-size': `${index % 5 === 0 ? 2.5 : 1.6}px`,
            '--delay': `${-(index % 11)}s`,
            '--duration': `${2.5 + index % 4}s`,
            '--drift': `${index % 2 === 0 ? 36 : -28}px`,
          }} />
        ))}
      </div>
    </div>
  )
}

export default CosmicBackground