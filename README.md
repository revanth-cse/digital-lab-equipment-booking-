# LabBook — Digital Lab Equipment Booking System

A beginner-friendly front-end college project. It demonstrates a simple way for students to view shared laboratory equipment and submit booking requests.

## How to run
1. Download or clone this project.
2. Keep `index.html`, `style.css`, `script.js`, and the `assets` folder together.
3. Double-click `index.html` to open it in a browser. (VS Code users can also use the Live Server extension.)

## Demo login
1. Enter any valid-looking email address.
2. Enter the demo verification code: **123456**.
3. You will enter the dashboard.

**Important:** This is a front-end demonstration. The verification code is checked in JavaScript; no real email is sent. Booking requests are stored only while the page is open and are not saved to a database.

## Main features
- Email and demo verification-code login screen
- Dashboard with equipment and booking counts
- Equipment catalogue with search and category filter
- Booking request button
- My Bookings page showing pending requests
- Responsive lemon-yellow and off-white design

## Project files
- `index.html` — page structure and sections
- `style.css` — colours, layout and responsive design
- `script.js` — demo login, equipment data, search and booking logic
- `assets/` — locally stored SVG illustrations

## GitHub upload
1. Sign in to GitHub and create a **New repository** named `digital-lab-equipment-booking`.
2. Choose Public or Private as instructed by your teacher.
3. Upload the project files and the complete `assets` folder (not just the ZIP).
4. Click **Commit changes**.
5. To show the working website, enable GitHub Pages: repository → Settings → Pages → Deploy from a branch → `main` → `/ (root)` → Save.

## Viva preparation
**Q: What is the aim of this project?**  
A: It is a digital system concept that helps students view laboratory equipment and submit booking requests.

**Q: Which technologies did you use?**  
A: HTML for structure, CSS for design, and JavaScript for interactions.

**Q: What is HTML?**  
A: HTML is used to create the structure and content of a web page.

**Q: What is CSS?**  
A: CSS is used to style the page, including colours, spacing, fonts and layout.

**Q: What is JavaScript used for here?**  
A: It handles the demo login verification, equipment search, page navigation and booking requests.

**Q: Is the OTP sent to the email?**  
A: No. This is a front-end demo. The code `123456` is checked in JavaScript. Real email verification would need a backend and an email service.

**Q: Where are bookings stored?**  
A: In a JavaScript array while the page is open. A real system would use a database.

**Q: How does the admin approve a booking?**  
A: The admin opens Admin approvals, checks the request, and clicks Approve or Reject. The student can see the updated status in My bookings.

**Q: What happens when a booking is approved?**  
A: Its status changes to Approved and that equipment becomes unavailable for another request in this demo.

**Q: What is the benefit of this system?**  
A: It makes equipment information easier to find and gives students a simple way to request shared lab resources.

**Q: What are the limitations?**  
A: It does not send real OTP emails, use a database, or provide real admin authentication. It is a working front-end prototype.
