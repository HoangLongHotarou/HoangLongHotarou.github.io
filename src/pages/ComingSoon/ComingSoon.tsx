export default function ComingSoon({ title }: { title: string }) {
  return (
    <section className="page" style={{ alignItems: 'center', justifyContent: 'center', minHeight: '40vh' }}>
      <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', color: 'var(--text-h)', margin: 0 }}>
        {title}
      </h1>
      <p style={{ color: 'var(--text)', marginTop: 12 }}>Coming soon — stay tuned.</p>
    </section>
  );
}
