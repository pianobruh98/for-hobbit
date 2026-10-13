import { Fragment, useLayoutEffect, useRef } from 'react';

// Renders each word as its own span so it can fade in independently.
function Words({ lines }) {
  return lines.map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {line.split(' ').map((word, j) => (
        <Fragment key={j}>
          {j > 0 && ' '}
          <span className="char-reveal">{word}</span>
        </Fragment>
      ))}
    </Fragment>
  ));
}

// Groups words by their rendered line, then staggers animation delays so each
// visual line fades in together. Returns the delay at which the last line ends.
function staggerLines(element, baseDelay, lineDelay, wordStagger) {
  const lines = [];
  for (const span of element.querySelectorAll('.char-reveal')) {
    const top = Math.round(span.getBoundingClientRect().top);
    const line = lines.find((l) => Math.abs(l.top - top) <= 2);
    if (line) line.spans.push(span);
    else lines.push({ top, spans: [span] });
  }
  lines.sort((a, b) => a.top - b.top);

  let delay = baseDelay;
  for (const line of lines) {
    line.spans.forEach((span, i) => {
      span.style.animationDelay = `${delay + i * wordStagger}s`;
    });
    delay += lineDelay;
  }
  return delay;
}

export default function Hero() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useLayoutEffect(() => {
    const titleFinish = staggerLines(titleRef.current, 1.0, 0.45, 0.03);
    staggerLines(subtitleRef.current, titleFinish + 0.3, 0.35, 0.02);
  }, []);

  return (
    <header className="hero-splash snap-item">
      <div className="hero-content">
        <h1 ref={titleRef}>
          <Words lines={['Warnick Piano', 'Academy']} />
        </h1>
        <p ref={subtitleRef}>
          <Words lines={['Excellence through', 'dedication.']} />
        </p>
      </div>

      <div className="pulse-glow-indicator" aria-hidden="true"></div>
    </header>
  );
}
