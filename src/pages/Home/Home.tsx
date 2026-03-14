import { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar/Avatar';
import Blade from '../../components/Blade/Blade';
import SkillCard from '../../components/SkillCard/SkillCard';
import { PROFILE } from '../../data/profile';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredSkills =
    activeCategory === 'All'
      ? PROFILE.skills
      : PROFILE.skills.filter((s) => s.category === activeCategory);

  return (
    <div className="page">
      <section className="hero">
        <Avatar src={PROFILE.avatarSrc} name={PROFILE.name} />
        <div className="hero__text">
          <h1 className="hero__name">{PROFILE.name}</h1>
          <p className="hero__title">{PROFILE.title}</p>
          <p className="hero__bio">{PROFILE.bio}</p>
        </div>
      </section>

      <section className="section" aria-label="Skills">
        <h2 className="section__heading">Skills</h2>
        <Blade
          categories={PROFILE.categories}
          active={activeCategory}
          onSelect={setActiveCategory}
        />
        {activeCategory === 'All' ? (
          <div className="skill-marquee">
            <div className="skill-marquee__track">
              {[...PROFILE.skills, ...PROFILE.skills].map((s, i) => (
                <SkillCard key={`${s.name}-${i}`} name={s.name} />
              ))}
            </div>
          </div>
        ) : (
          <div className="skill-grid">
            {filteredSkills.map((s) => (
              <SkillCard key={s.name} name={s.name} />
            ))}
          </div>
        )}
      </section>

      <section className="section" aria-label="About">
        <h2 className="section__heading">About Me</h2>
        <p className="section__body">{PROFILE.bio}</p>
        <Link to="/system-design" className="link-button">
          View System Design Notes →
        </Link>
      </section>
    </div>
  );
}
