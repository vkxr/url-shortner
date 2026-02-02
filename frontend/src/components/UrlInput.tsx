import { useState } from 'react';

interface UrlInputProps {
  onShorten: (url: string) => void;
  isLoading: boolean;
}

export const UrlInput = ({ onShorten, isLoading }: UrlInputProps) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onShorten(url.trim());
      setUrl('');
    }
  };

  return (
    <div className="input-section">
      <form onSubmit={handleSubmit} className="url-form">
        <div className="input-wrapper">
          <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste your long URL here..."
            disabled={isLoading}
            autoComplete="off"
            required
            className="url-input"
          />
        </div>
        <button type="submit" disabled={isLoading} className="submit-btn">
          {isLoading ? (
            <>
              <span className="spinner"></span>
              Shortening...
            </>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Shorten URL
            </>
          )}
        </button>
      </form>
    </div>
  );
};