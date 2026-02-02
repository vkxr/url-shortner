# 🔗 URL Shortener

A modern, production-ready URL shortener application with a beautiful dark mode interface. Transform long URLs into short, shareable links instantly.

![URL Shortener](https://img.shields.io/badge/Status-Production%20Ready-success)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![React](https://img.shields.io/badge/React-19.2-blue)
![Express](https://img.shields.io/badge/Express-5.1-green)

## ✨ Features

### Core Functionality
- **Instant URL Shortening** - Convert long URLs to short, memorable links
- **Automatic Expiry** - Links expire after 30 minutes (configurable)
- **URL Validation** - Built-in validation using Zod schema
- **Secure Redirects** - Safe and reliable URL redirection

### User Interface
- **Modern Dark Mode UI** - Beautiful, professional design with gradient effects
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Real-time Feedback** - Loading states, error handling, and success animations
- **Copy to Clipboard** - One-click copy functionality with visual feedback
- **Feature Showcase** - Display of key features and statistics

### Developer Experience
- **TypeScript** - Full type safety across frontend and backend
- **Component-based Architecture** - Modular React components
- **RESTful API** - Clean, well-structured API endpoints
- **CORS Enabled** - Ready for cross-origin requests

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js 5.1** - Web framework
- **TypeScript 5.8** - Type-safe JavaScript
- **Zod** - Schema validation
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 19.2** - UI library
- **TypeScript 5.9** - Type-safe JavaScript
- **Vite 7.2** - Build tool and dev server
- **CSS3** - Modern styling with animations

### Storage
- **In-Memory Map** - Current implementation (for development)
- *Note: Use database in production (see Future Scope)*

## 📁 Project Structure

```
url-shortner/
├── BACKEND/
│   ├── src/
│   │   └── index.ts          # Express server with API routes
│   ├── dist/                  # Compiled JavaScript
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── app.tsx           # Main React application
│   │   ├── main.tsx          # React entry point
│   │   ├── style.css         # Global styles
│   │   └── components/
│   │       ├── Header.tsx    # App header with logo
│   │       ├── UrlInput.tsx  # URL input form
│   │       ├── UrlOutput.tsx # Short URL display
│   │       ├── ErrorMessage.tsx # Error display
│   │       ├── Features.tsx  # Feature cards
│   │       └── Stats.tsx     # Statistics display
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v9 or higher) or **yarn**
- **Git** (for cloning the repository)

### Installation Steps

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd url-shortner
```

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd BACKEND

# Install dependencies
npm install

# Build TypeScript
npm run build

# Start development server
npm run dev
```

The backend server will start at `http://localhost:3000`

#### 3. Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will start at `http://localhost:5173` (or another port if 5173 is busy)

#### 4. Access the Application

- **Frontend**: Open `http://localhost:5173` in your browser
- **Backend API**: Available at `http://localhost:3000`

### Production Build

#### Backend

```bash
cd BACKEND
npm run build
npm start
```

#### Frontend

```bash
cd frontend
npm run build
npm run preview
```

The built files will be in `frontend/dist/` directory.

## 📡 API Documentation

### Base URL
```
http://localhost:3000
```

### Endpoints

#### 1. Create Short URL

**POST** `/api/shorten`

Creates a short URL from a long URL.

**Request Body:**
```json
{
  "url": "https://example.com/very/long/url/path"
}
```

**Success Response (200):**
```json
{
  "shortUrl": "http://localhost:3000/abc12345"
}
```

**Error Response (400):**
```json
{
  "error": "Invalid URL"
}
```

**Example using cURL:**
```bash
curl -X POST http://localhost:3000/api/shorten \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

#### 2. Redirect to Original URL

**GET** `/:code`

Redirects to the original URL associated with the short code.

**Parameters:**
- `code` (path parameter) - The short code (e.g., `abc12345`)

**Success Response (302):**
- Redirects to the original URL

**Error Responses:**
- `404` - Short link not found
- `410` - Link expired

**Example:**
```
GET http://localhost:3000/abc12345
→ Redirects to original URL
```

## 💻 Usage Examples

### Frontend Usage

1. **Open the application** in your browser
2. **Enter a long URL** in the input field
3. **Click "Shorten URL"** button
4. **Copy the generated short URL** using the copy button
5. **Share the short URL** - it will redirect to the original URL

### API Usage

#### JavaScript/TypeScript

```typescript
// Shorten a URL
const response = await fetch('http://localhost:3000/api/shorten', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://example.com/very/long/url'
  })
});

const data = await response.json();
console.log(data.shortUrl); // http://localhost:3000/abc12345
```

#### Python

```python
import requests

response = requests.post(
    'http://localhost:3000/api/shorten',
    json={'url': 'https://example.com/very/long/url'}
)

data = response.json()
print(data['shortUrl'])
```

## 🔧 Environment Variables

### Backend

Create a `.env` file in the `BACKEND/` directory:

```env
# Server Configuration
PORT=3000
BASE_URL=http://localhost:3000

# Production Example
# PORT=3000
# BASE_URL=https://yourdomain.com
```

**Variables:**
- `PORT` - Server port number (default: 3000)
- `BASE_URL` - Base URL for generated short links (default: http://localhost:3000)

### Frontend

**Note**: Update the API URL in `frontend/src/app.tsx` to match the backend endpoint:

```typescript
// Current: const API_URL = 'http://localhost:3000/api/shorturls';
// Should be: const API_URL = 'http://localhost:3000/api/shorten';
```

Or use environment variables:

```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/shorten';
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:3000/api/shorten
```

## 🧪 Development Workflow

### Running in Development Mode

1. **Start Backend:**
   ```bash
   cd BACKEND
   npm run dev
   ```

2. **Start Frontend** (in a new terminal):
   ```bash
   cd frontend
   npm run dev
   ```

3. **Make changes** - Both servers support hot reload

### Code Structure

- **Backend**: TypeScript files in `BACKEND/src/` compile to `BACKEND/dist/`
- **Frontend**: React components in `frontend/src/components/`
- **Styling**: Global styles in `frontend/src/style.css`

### Testing the API

Use tools like:
- **Postman** - GUI API testing
- **cURL** - Command-line testing
- **Thunder Client** - VS Code extension
- **Browser DevTools** - Network tab

## 🎯 Use Cases

### 1. Social Media Sharing
Shorten long URLs before sharing on Twitter, Facebook, or other platforms with character limits.

### 2. Email Marketing
Create clean, professional short links for email campaigns and newsletters.

### 3. QR Code Generation
Generate short URLs that can be easily converted to QR codes for print materials.

### 4. Analytics Tracking
Track link clicks and user engagement (when analytics are implemented).

### 5. API Integration
Integrate URL shortening into other applications via REST API.

### 6. Temporary Links
Create time-limited links for temporary access or one-time use cases.

## 🚧 Future Scope & Roadmap

### Phase 1: Core Enhancements
- [ ] **Database Integration**
  - Replace in-memory storage with PostgreSQL/MongoDB
  - Persistent link storage
  - Data backup and recovery

- [ ] **Custom Short Codes**
  - Allow users to create custom short codes
  - Validate code availability
  - Reserved code management

- [ ] **Extended Expiry Options**
  - User-configurable expiry times
  - Never-expire option
  - Scheduled expiry dates

### Phase 2: Analytics & Tracking
- [ ] **Click Analytics**
  - Track total clicks per link
  - Geographic location tracking
  - Referrer tracking
  - Device and browser analytics

- [ ] **Dashboard**
  - User dashboard for link management
  - View all created links
  - Edit/delete links
  - Analytics visualization

### Phase 3: User Features
- [ ] **User Authentication**
  - Sign up / Sign in functionality
  - JWT-based authentication
  - User profiles

- [ ] **Link Management**
  - Organize links into folders
  - Bulk operations
  - Link search and filtering

- [ ] **API Keys**
  - Generate API keys for programmatic access
  - Rate limiting per key
  - Usage statistics

### Phase 4: Advanced Features
- [ ] **QR Code Generation**
  - Automatic QR code generation for short URLs
  - Customizable QR code design
  - Download QR codes

- [ ] **Link Preview**
  - Generate link previews with metadata
  - Open Graph tags support
  - Custom preview images

- [ ] **Bulk URL Shortening**
  - Upload CSV files
  - Batch processing
  - Export results

- [ ] **Password Protection**
  - Password-protected short links
  - Access control

### Phase 5: Enterprise Features
- [ ] **White-label Solution**
  - Custom domain support
  - Branded short URLs
  - Custom landing pages

- [ ] **Team Collaboration**
  - Team accounts
  - Role-based access control
  - Shared link libraries

- [ ] **Advanced Analytics**
  - Conversion tracking
  - A/B testing
  - Custom events

- [ ] **Rate Limiting**
  - Per-user rate limits
  - IP-based throttling
  - Abuse prevention

### Phase 6: Infrastructure
- [ ] **Caching Layer**
  - Redis integration
  - Improved performance
  - Reduced database load

- [ ] **CDN Integration**
  - Static asset delivery
  - Global edge caching

- [ ] **Monitoring & Logging**
  - Application monitoring (e.g., Sentry)
  - Performance metrics
  - Error tracking

- [ ] **Docker Support**
  - Containerization
  - Easy deployment
  - Development environment

- [ ] **CI/CD Pipeline**
  - Automated testing
  - Deployment automation
  - Version management

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👤 Author

Created with ❤️ for efficient URL management.

## 🙏 Acknowledgments

- Express.js community
- React team
- Vite team
- All open-source contributors

---

**Note**: This is a production-ready starter template. For production deployment, ensure you:
- Use a proper database (not in-memory storage)
- Set up environment variables securely
- Implement proper error logging
- Add rate limiting
- Set up monitoring and alerts
- Use HTTPS in production
- Configure CORS properly for your domain
