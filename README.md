# Portfolio Data Structure

This project uses JSON files to manage portfolio content, making it easy to update information without touching the JavaScript code.

## JSON Files Structure

### 1. `data/meta-info.json`
Contains personal information, education, interests, and contact details:
```json
{
  "personalInfo": { ... },
  "education": [ ... ],
  "interests": [ ... ],
  "contact": { ... }
}
```

### 2. `data/technical-skills.json`
Contains technical skills organized by categories:
```json
[
  {
    "category": "Frontend Development",
    "items": ["HTML5", "CSS3", ...]
  }
]
```

### 3. `data/projects.json`
Contains project information including images, videos, technologies:
```json
[
  {
    "title": "Project Name",
    "description": "Project description",
    "image": "image_url",
    "video": "video_url",
    "technologies": ["React", "Node.js"],
    "demoLink": "demo_url",
    "codeLink": "github_url"
  }
]
```

### 4. `data/certificates.json`
Contains certification information:
```json
[
  {
    "title": "Certificate Name",
    "issuer": "Organization",
    "date": "Date",
    "image": "image_url",
    "link": "certificate_url"
  }
]
```

### 5. `data/achievements.json`
Contains achievements with descriptions and icons:
```json
[
  {
    "title": "Achievement Title",
    "description": "Achievement description",
    "icon": "fas fa-trophy"
  }
]
```

## How to Update Content

1. **Personal Information**: Edit `data/meta-info.json`
2. **Skills**: Edit `data/technical-skills.json`
3. **Projects**: Edit `data/projects.json`
4. **Certificates**: Edit `data/certificates.json`
5. **Achievements**: Edit `data/achievements.json`

## Code Optimizations

The codebase has been optimized for:
- **Clean HTML**: Removed redundant comments and unused elements
- **Dynamic Content**: All text content loads from JSON files
- **Modular JavaScript**: Clean separation of concerns with error handling
- **Efficient CSS**: Utility classes for common styles, reduced redundancy
- **Better Performance**: Async loading and simplified functions

## Features

- **Modular Data Management**: Each section has its own JSON file
- **Easy Content Updates**: No need to modify JavaScript code
- **Async Loading**: Data is loaded asynchronously for better performance
- **Error Handling**: Graceful fallbacks if JSON files fail to load
- **Type Safety**: Null checks prevent errors if data is missing
- **Clean Code**: Optimized for maintainability and performance

## JavaScript Structure

The main `script.js` file now:
1. Loads all JSON files asynchronously
2. Combines them into a `portfolioData` object
3. Renders content dynamically
4. Handles events and interactions efficiently

This separation makes the portfolio highly maintainable and content-focused.
