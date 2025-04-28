# Mentor Connect

A comprehensive mentorship platform built with React that connects mentors with mentees. This platform facilitates mentor discovery, booking sessions, and communication between mentors and mentees.

[Deployed Application](https://nexus-mentor-connect.vercel.app/)

## Features

- 👥 Browse and search for mentors
- 📅 Book mentorship sessions using an integrated calendar
- 💬 Real-time chat functionality
- 👤 User and mentor profiles
- ⭐ Become a mentor feature
- ⚙️ User settings and preferences

## Project Structure

```
src/
├── components/         # Reusable components
│   ├── Footer/         # Site-wide footer
│   └── Navbar/         # Navigation component
├── data/               # Data management
│   ├── BookingContext  # Booking state management
│   └── mentors.json    # Mentor data
└── pages/              # Application pages
    ├── Home/           # Landing page
    ├── Mentors/        # Mentor listing
    ├── MentorProfile/  # Individual mentor view
    ├── UserProfile/    # User dashboard
    ├── BecomeMentor/   # Mentor registration
    └── Settings/       # User settings
```

## Prerequisites

- Node.js (v16.0.0 or higher)
- npm (v8.0.0 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/raksha-rane/nexus.git
cd nexus
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

Start the development server:
```bash
npm start
```

The application will open in your default browser at [http://localhost:3000](http://localhost:3000).

## Common Issues and Resolutions

### Port 3000 Already in Use
If you see a message that port 3000 is already in use, the development server will automatically prompt you to use a different port (typically 3001). Simply press 'Y' when prompted.

### Dependency Conflicts
If you encounter dependency conflicts during installation, try the following:

1. Clear npm cache:
```bash
npm cache clean --force
```

2. Delete node_modules and reinstall:
```bash
rm -rf node_modules
npm install
```

3. If issues persist, use the legacy peer deps flag:
```bash
npm install --legacy-peer-deps
```

## Available Scripts

- `npm start` - Runs the development server
- `npm test` - Runs the test suite
- `npm run build` - Creates a production build
- `npm run eject` - Ejects from Create React App (one-way operation)

## Dependencies

- React 18.2.0
- React Router DOM 7.5.2
- Bootstrap 5.3.5
- @chatscope/chat-ui-kit-react - For chat functionality
- React Calendar 5.1.0

## Browser Support

The application supports:
- Latest versions of Chrome, Firefox, and Safari
- Edge (Chromium-based)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Create React App team for the initial project setup
- All contributors and maintainers

For more information about Create React App, check out the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
