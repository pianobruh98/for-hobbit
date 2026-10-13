const SECTIONS = [
  {
    photo: '/Photos/Super Old at Daynes.png',
    alt: 'Early piano years at Daynes Music',
    text: 'When I was a kid, my mom taught piano all the time. I can’t remember what I was thinking at the time, but it must have made an impression on me; at five years old, I asked her if she would start teaching me too. I didn’t know it then, but that moment started a journey that completely shaped the course of my life. In my younger years, I regularly participated in everything from festivals to concerto competitions. I had the opportunity to be featured with four different orchestras, from Salt Lake to Lake Tahoe. Even considering all this, I still intended to go to school for computer science. I changed my mind at the last minute and decided to audition for the Piano Performance program at BYU.',
  },
  {
    photo: '/Photos/2024 Georgia.jpg',
    alt: 'Performing at Steinway event in 2015',
    text: 'I was accepted, and decided to go for it. I’ve spent my young adult years learning from the best in Utah. I regularly placed in or won competitions, most recently advancing all the way to the final national round of the MTNA Young Artists Division. During the early 2020’s, I was a contractor for a piano teaching company and taught lessons as a part time job. I decided then that I wanted to teach piano at some level for the rest of my life.',
  },
  {
    photo: '/Photos/2025 steinway reno.jpg',
    alt: 'Steinway Reno performance in 2025',
    text: 'I’ve done almost everything in the piano field at least a little. I’ve been a featured soloist, an accompanist, a student, and a teacher. I’ve played in local bands, been an adjudicator for piano festivals, and been the head of a student judge panel for an international competition. I’ve played pop music and sang with my friends in the small hours of the night, and I’ve been featured in front of hundreds of people in my hometown. I’ve played Christmas carols in rest homes in Provo, and the same Christmas carols in small farming towns in Brazil. I’ve played by myself, just to sort out and process how I felt after breaking up with a girl. Through it all, I’ve discovered how much I love music, and how much I want to share and pass on that love with anybody who will listen.',
  },
];

export default function About() {
  return (
    <>
      <header className="page-header site-container">
        <h1>Me and My Story</h1>
      </header>

      <main className="site-container">
        {SECTIONS.map(({ photo, alt, text }, i) => (
          <section key={photo} className={`about-grid${i % 2 ? ' about-grid-reversed' : ''}`}>
            <div className="about-image-wrapper">
              <img src={photo} alt={alt} className="about-photo" />
            </div>
            <div className="about-text">
              <p>{text}</p>
            </div>
          </section>
        ))}
      </main>
    </>
  );
}
