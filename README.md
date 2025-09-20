#!/bin/bash

## Project Management Dashboard

A dynamic project management dashboard that fetches and displays project data from a JSON API. This responsive web application allows users to view all project tasks and their associated assets in an organized grid layout.

## Features

- **Dynamic Data Loading**: Fetches project data from a JSON API endpoint
- **Responsive Design**: Adapts to different screen sizes with a grid layout
- **Interactive Sidebar**: Navigation panel with project tasks
- **Multiple Card Types**: Different card templates for various asset types
- **Mock Data Support**: Includes demo data for testing when API is unavailable
- **Modern UI**: Clean, professional interface with hover effects and animations

## Project Structure
project-management-dashboard/
│
├── index.html # Main HTML file
├── README.md # Project documentation
└── assets/ # Resource files (images, icons)


## Setup and Installation

1. Clone or download the project files
2. Open `index.html` in a web browser
3. The application will attempt to fetch data from the API
4. If the API is unavailable (CORS issues), click "Load Demo Project Data"

## Usage

1. **View All Projects**: All project cards are displayed in the main grid by default
2. **Navigation**: Hover on the left sidebar to see project tasks
3. **Interactive Elements**: 
   - Fill out text areas in Threadbuild cards
   - Write articles in Structure cards
   - Explore 4SA method content
4. **Submit Tasks**: Use the "Submit Task" button (functionality can be extended)

## API Integration

The application attempts to fetch data from:(https://dev.deepthought.education/assets/uploads/files/files/others/ddugky_project.json)


If the API is unavailable due to CORS restrictions, the application falls back to mock data.

## Technical Details

- **HTML5**: Semantic structure with accessible markup
- **CSS3**: Flexbox and Grid layouts, animations, and responsive design
- **JavaScript ES6+**: Async/await for API calls, DOM manipulation, and dynamic content rendering
- **Font Awesome**: Icons for enhanced UI
- **Google Fonts**: Arial font family for clean typography

## Browser Compatibility

Compatible with all modern browsers including:
- Chrome (60+)
- Firefox (60+)
- Safari (12+)
- Edge (79+)

## Customization

To customize the dashboard:

1. **Styling**: Modify CSS variables and classes in the style section
2. **Card Templates**: Update the card template functions in JavaScript
3. **API Endpoint**: Change the `JSON_URL` constant to point to your API
4. **Mock Data**: Modify the `mockProjectData` object to match your data structure

## Future Enhancements

- User authentication and personalized dashboards
- Real-time collaboration features
- Task submission and progress tracking
- Advanced filtering and search capabilities
- Data visualization charts
- Mobile app version

## License

This project is created for educational purposes as part of a technical assignment.

## Support

For issues related to this implementation, please check:
1. Browser console for error messages
2. Network connectivity to the API endpoint
3. CORS policies if hosting locally

---

**Note**: This is a front-end only implementation. Backend integration would be required for full functionality like user authentication, data persistence, and task submissions.
EOF

