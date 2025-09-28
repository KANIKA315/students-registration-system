🎓✨ Student Registration System ✨🎓

A modern, responsive, and fully functional Student Registration System built with HTML5, CSS3, and Vanilla JavaScript. This project allows users to register, edit, delete, and manage student records with a clean and user-friendly interface. It features stunning animations, responsive design, and persistent data storage using Local Storage.
   

🚀 Features
✨ Core Functionalities

Add Students: Add new student records with real-time validation.
Edit Students: Update student details using a modal-based editor.
Delete Students: Remove student records with confirmation dialogs.
Search Students: Real-time search with highlighted results.
Data Persistence: All data is saved in the browser using Local Storage.
Dynamic Scrollbar: Automatically adds a vertical scrollbar when needed.

📱 Responsive Design

Mobile (≤640px): Optimized for touch, stacked layout.
Tablet (641px–1024px): Two-column layout, touch-friendly.
Desktop (≥1025px): Full layout with enhanced hover effects.

🎨 Beautiful Animations

Form Animations: Floating labels, glowing borders, and shake effects.
Button Animations: Ripple effects, hover transformations, and loading states.
Table Animations: Slide-in rows, hover effects, and delete animations.
Modal Animations: Scale and fade effects with backdrop blur.
Background Effects: Floating particles and gradient animations.

🎯 Advanced Features

Validation:

Student Name: Letters and spaces only.
Student ID: Numbers only, must be unique.
Email Address: Valid email format.
Contact Number: 10–15 digits.


Accessibility:

ARIA labels and roles.
Keyboard navigation.
Screen reader announcements.
High contrast and reduced motion support.




🛠️ Technologies Used

Frontend: HTML5, CSS3, Vanilla JavaScript (ES6+).
Styling: Custom CSS animations and responsive design.
Storage: Browser Local Storage API for data persistence.
Icons: Font Awesome for UI icons.


📁 Project Structure
student-registration-system/
├── favicon_io/             # Favicon assets
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   ├── apple-touch-icon.png
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── favicon.ico
│   └── site.webmanifest
├── index.html              # Main HTML structure
├── style.css               # Complete CSS with animations
├── script.js               # JavaScript functionality
├── README.md               # Project documentation


🔧 Installation & Setup
Prerequisites

Modern web browser (Chrome, Firefox, Safari, Edge).

Step 1: Clone the Repository
git clone https://github.com/Kanika315/students-registration-system.git
cd student-registration-system

Step 2: Open the Project

Open index.html in your browser.
Or use a local server (recommended):

Using Python:
python -m http.server 8000


Using Node.js:
npx serve .


Using VS Code Live Server:
Right-click index.html → "Open with Live Server".




🎯 Usage Guide
➕ Adding a New Student

Fill in all required fields:

Student Name: Letters and spaces only.
Student ID: Numbers only, must be unique.
Email Address: Valid email format.
Contact Number: 10–15 digits.


Click "Add Student" to save the record.
Watch the success animation and automatic form reset.

🔍 Searching Students

Type any part of a student's name, ID, email, or contact number in the search bar.
Results filter automatically with highlighted matches.
Click "Clear Search" to show all students again.

✏️ Editing Student Records

Click the "Edit" button next to a student.
A modal opens with the current data pre-filled.
Modify the fields and click "Save Changes" to update.

🗑️ Deleting Student Records

Click the "Delete" button next to a student.
A confirmation modal appears.
Click "Yes, Delete" to confirm or "Cancel" to abort.


📋 Form Validation Rules
Student Name

✅ Only letters and spaces allowed.
✅ Minimum 2 characters.
❌ Numbers and special characters not allowed.

Student ID

✅ Only numbers allowed.
✅ Minimum 3 digits.
✅ Must be unique (no duplicates).

Email Address

✅ Must be in valid email format (e.g., user@domain.com).
✅ Must be unique (no duplicates).

Contact Number

✅ Only numbers allowed.
✅ Minimum 10 digits, maximum 15 digits.


🎨 Design Features
Color Scheme

Hot Pink (#FF1493)
Bright Purple (#8A2BE2)
Coral Red (#FF6B6B)
Light Pink (#FFB6C1)
Dark Purple (#663399)

Animations

Page Load: Smooth fade-in with staggered elements.
Form Interactions: Floating labels, glowing borders, and validation animations.
Table Animations: Slide-in rows, hover effects, and delete animations.
Modal Effects: Scale and fade animations with backdrop blur.


📱 Responsive Design
The application is fully responsive and optimized for:

Mobile (≤640px): Stacked layout, touch-friendly.
Tablet (641px–1024px): Two-column layout.
Desktop (≥1025px): Full layout with hover effects.


🔒 Privacy & Data

Local Storage: All data is stored locally on the user's device.
No External Servers: No data is transmitted to external servers.
Validation: Strict validation rules prevent invalid data.


📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

👨‍💻 Author
Kanika Bajaj

GitHub: [@KANIKA315](https://github.com/KANIKA315/students-registration-system)
Email: kanikabajaj2014@gmail.com
Portfolio:[ Kanika's Portfolio](https://animated-begonia-e49bbc.netlify.app/)


