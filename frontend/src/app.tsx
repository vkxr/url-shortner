import { useState } from 'react';
import { Header } from './components/Header';
import { UrlInput } from './components/UrlInput';
import { UrlOutput } from './components/UrlOutput';
import { ErrorMessage } from './components/ErrorMessage';
import { Features } from './components/Features';
import { Stats } from './components/Stats';
import './style.css';

const API_URL = 'https://url-shortner-zb8k.onrender.com/api/shorten';

function App() {
  const [shortUrl, setShortUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [totalShortened, setTotalShortened] = useState(0);

  const handleShorten = async (url: string) => {
    setIsLoading(true);
    setError('');
    setShortUrl('');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to shorten URL');
      }

      setShortUrl(data.shortUrl);
      setTotalShortened(prev => prev + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="background-decoration">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>
      
      <div className="main-container">
        <Header />
        
        <div className="content-wrapper">
          <div className="main-card">
            <UrlInput onShorten={handleShorten} isLoading={isLoading} />
            {shortUrl && <UrlOutput shortUrl={shortUrl} />}
            {error && <ErrorMessage message={error} />}
          </div>

          <Features />
          <Stats totalShortened={totalShortened} />
        </div>
      </div>
    </div>
  );
}

export default App;
