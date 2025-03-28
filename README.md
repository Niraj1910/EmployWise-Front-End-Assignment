User Management Dashboard
A React-based user management dashboard built with TypeScript and Vite, featuring a table view for managing users with search, sort, and bulk delete capabilities.

How to Run the Project
Clone the Repository
bash

Collapse

Wrap

Copy
git clone https://github.com/your-username/user-management-dashboard.git
cd user-management-dashboard
Install Dependencies
bash

Collapse

Wrap

Copy
npm install
This installs all required packages listed in package.json.
Run the Development Server
bash

Collapse

Wrap

Copy
npm run dev
Open http://localhost:5173 in your browser to view the app.
Installing Dependencies
The project uses npm as the package manager.
Run npm install to install all dependencies, including:
react, react-dom, react-router-dom for the UI and routing.
axios for API requests.
lucide-react for icons.
react-hot-toast for notifications.
tailwindcss for styling.
Development tools like typescript, eslint, and vite.
Assumptions and Considerations
API: Assumes an external API provides user data (getUsers, deleteUser) with fields: id, first_name, last_name, avatar, email. Update src/api.ts with your API endpoints.
Routing: Assumes an edit page exists at /users/:id/edit. You may need to implement this route.
Pagination: Server-side pagination is assumed. If the API doesn’t support it, client-side pagination would need to be added.
Avatar: If avatar URLs fail or are missing, the UI displays the image as-is; no fallback is implemented.
Styling: Uses Tailwind CSS for a responsive design, tested on modern browsers.
