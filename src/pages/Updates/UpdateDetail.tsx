import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { loadUpdates } from '../../utils/parseMd';
import CodeBlock from '../../components/CodeBlock/CodeBlock';

export default function UpdateDetail() {
  const { slug } = useParams<{ slug: string }>();
  const update = loadUpdates().find((u) => u.slug === slug);

  if (!update) {
    return (
      <div className="page">
        <p style={{ color: 'var(--text)' }}>Update not found.</p>
        <Link to="/new-updates" className="link-button" style={{ marginTop: 16 }}>
          ← Back to Updates
        </Link>
      </div>
    );
  }

  return (
    <div className="page update-detail">
      <Link to="/new-updates" className="update-detail__back">
        ← Back to Updates
      </Link>
      <div className="update-detail__header">
        <span className="update-card__date">{update.date}</span>
        <h1 className="hero__name" style={{ marginTop: 4 }}>{update.title}</h1>
      </div>
      <div className="update-detail__body">
        <ReactMarkdown components={{ code: CodeBlock }}>{update.content}</ReactMarkdown>
      </div>
    </div>
  );
}
