import { Link } from 'react-router-dom';

export default function SystemDesign() {
  return (
    <div className="page">
      <section className="section">
        <h1 className="section__heading">System Design Notes</h1>
        <p className="section__body">
          This page collects architecture patterns, tradeoff analyses, and
          design diagrams I study and reference.
        </p>
        <Link to="/" className="link-button">
          ← Back to Portfolio
        </Link>
      </section>
    </div>
  );
}
