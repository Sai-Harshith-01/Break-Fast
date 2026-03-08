Ammaas Tiffin 🍛
Traditional South Indian Food Storytelling Experience
Overview

Ammaas Tiffin is a cinematic storytelling web application that showcases the beauty of traditional South Indian breakfast culture. The website presents dishes like Idly, Dosa, Pongal, Vada, and Tea using immersive visuals, animations, and audio narration.

The application is built using React with Client-Side Rendering (CSR), allowing the browser to dynamically render content and provide a smooth, interactive user experience.

Food preparation videos, images, and audio narration are delivered through a CDN to ensure fast loading and efficient performance.

Features

🍽 Interactive storytelling for traditional dishes

🎥 Food preparation videos and animations

🔊 Audio narration and sound effects

📜 Scroll-based storytelling sections

🌅 Village sunrise introduction scene

✨ Smooth UI animations and transitions

📱 Responsive design for mobile and desktop

Technologies Used

React.js

JavaScript (ES6+)

HTML5

CSS3

Animation libraries (for smooth transitions)

Media assets such as videos, images, and audio are hosted using Cloudinary, ensuring faster delivery and reduced repository size.

Project Structure
ammaas-tiffin
│
├── public
│   ├── index.html
│   └── favicon.ico
│
├── src
│   ├── components
│   │   ├── HeroSection
│   │   ├── FoodStories
│   │   ├── DishSection
│   │   ├── AnimationLayer
│   │   └── AudioPlayer
│   │
│   ├── styles
│   │   └── main.css
│   │
│   ├── App.js
│   ├── index.js
│   └── utils
│       └── animationHelpers.js
│
├── package.json
└── README.md
Client-Side Rendering Flow

User opens the website.

React loads the application in the browser.

Components dynamically render UI sections.

Media content loads from the CDN.

Scroll interactions trigger animations and storytelling sequences.

This approach provides a seamless and responsive user experience.

Media Handling

Large media files such as:

food preparation videos

dish images

narration audio

background sounds

are hosted externally using Cloudinary.

Benefits include:

faster loading speeds

smaller GitHub repository

improved performance

Running the Project Locally

Clone the repository:

git clone https://github.com/your-username/ammaas-tiffin.git

Navigate into the project folder:

cd ammaas-tiffin

Install dependencies:

npm install

Start the development server:

npm start

The application will run at:

http://localhost:3000
Deployment

The project can be deployed easily using modern frontend hosting platforms such as:

Vercel

Netlify

These platforms allow automatic deployment directly from GitHub.

Future Improvements

Online food ordering integration

AI-based food recommendation system

Multi-language storytelling support

Voice narration for dish stories

Inspiration

Ammaas Tiffin is inspired by the warmth and nostalgia of homemade meals prepared with love by grandmothers. The project aims to digitally recreate the cultural experience of traditional South Indian breakfast through modern web technology.
