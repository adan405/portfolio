export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <p>
          © {year} Adan Saleem · Software Engineer ·{' '}
          <a href="mailto:adanbhatti6677@gmail.com">adanbhatti6677@gmail.com</a>
        </p>
      </div>
    </footer>
  );
}
