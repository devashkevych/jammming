# Jammming

A Spotify playlist creator that allows users to search for songs, create custom playlists, and save them directly to their Spotify account.

## Live Demo
[View Live App](https://jammming-nine.vercel.app/)

## Features
- Search for songs using Spotify's extensive music library
- Create custom playlists with selected tracks
- Save playlists directly to your Spotify account
- Secure OAuth2 PKCE authentication
- Real-time track search and playlist management

## Built With
- **React** - UI framework
- **JavaScript (ES6+)** - Core logic
- **Spotify Web API** - Music data and playlist management
- **OAuth2 PKCE** - Secure authentication flow
- **HTML5/CSS3** - Styling and layout
- **Vercel** - Deployment platform

## Getting Started

### Prerequisites
- Node.js installed
- Spotify account
- Spotify Developer App credentials

### Installation

1. Clone the repository
```bash
git clone https://github.com/TupacShampur/jammming.git
cd jammming
```

2. Install dependencies
```bash
npm install
```

3. Set up Spotify API credentials
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Create a new app
   - Add redirect URI: `http://127.0.0.1:3000` (for development)
   - Copy your Client ID

4. Update `accessToken.js` with your credentials
```javascript
const clientId = "YOUR_CLIENT_ID";
const redirectUri = "http://127.0.0.1:3000";
```

5. Start the development server
```bash
npm start
```

## How to Use
1. Click "Log in" to authenticate with your Spotify account
2. Search for songs using the search bar
3. Click "+" to add tracks to your playlist
4. Name your playlist
5. Click "Save" to save the playlist to your Spotify account

## Key Learning Points
- OAuth2 PKCE authentication implementation
- Working with external APIs and handling async requests
- State management in React
- User authentication flow
- Deployment to production environment

## Contact
Roman Ivashkevych - roma.ivashckevych@gmail.com

Project Link: [https://github.com/TupacShampur/jammming](https://github.com/TupacShampur/jammming)
