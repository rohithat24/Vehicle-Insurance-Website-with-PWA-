Vehicle Insurance Website:
This is a vehicle insurance website with Progressive Web App (PWA) functionality, built using HTML, CSS, and JavaScript. The website allows users to drag and drop vehicle pictures onto an HTML5 Canvas, providing an intuitive interface for image manipulation. Users can also select multiple pictures, customize them, and download them as a set. The website is designed to simplify the process of managing vehicle documentation.

Key Features:
Progressive Web App (PWA) for a seamless user experience across devices
HTML5 Canvas for drag and drop functionality and image manipulation
Multiple select feature for selecting and arranging multiple vehicle pictures
Download selected images as a set
Web app download option for quick access from the device's home screen

Project Structure:
├── index.html
├── style.css
├── script.js
├── manifest.json
├── sw.js
├── myapp.webmanifest
├── dom-to-image.js
└── images
    └── ...  (vehicle images)
    
index.html: The main HTML file containing the website structure.
style.css: The CSS file for styling the website.
script.js: The JavaScript file containing the logic for drag and drop, image manipulation, and multiple select functionality.
manifest.json: The Web App Manifest file for configuring PWA properties.
sw.js: The Service Worker file for enabling offline support and caching.
myapp.webmanifest: Web App Manifest for installing the website as a web app.
dom-to-image.js: Library for converting the HTML canvas to an image.
images/: Directory for storing vehicle images.

Usage:
Clone the repository: git clone https://github.com/your-username/vehicle-insurance-website.git
Open index.html in your web browser.

Acknowledgements:
HTML5 Canvas
Progressive Web Apps (PWA)
dom-to-image

