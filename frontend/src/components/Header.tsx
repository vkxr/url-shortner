export const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>URL Shortener</span>
        </div>
        <p className="tagline">Transform long URLs into short, shareable links</p>
      </div>
    </header>
  );
};