# Lex Läx

An interactive learning application designed for children to help them practice and master their schoolwork. The app allows children to input their own assignments, such as weekly vocabulary lists for languages like English or Spanish, or math problems. By creating personalized study lists, children can practice their specific school material through engaging, interactive exercises.


## Tech Stack

* **Frontend:** React, Axios (for API requests)
* **Backend:** Node.js, Express
* **Database:** Supabase

---

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org) installed.

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Augustlyden/Lex-Lax.git && cd $_
   ```

2. **Install all dependencies:**
   We have created a custom script to automatically install all packages for the root, frontend, and backend folders:
   ```bash
   npm run install-all
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root of the backend folder and add your local port and PostgreSQL connection string:
   ```env
   PORT=3000
   DATABASE_URL=your_postgresql_connection_string
   ```
  *(Note: The application features automatic database initialization. As long as you provide a valid PostgreSQL connection string, all necessary tables will be created automatically upon the first server startup.)*

4. **Run the application:**
   You can start both the Express backend server and the React frontend development server with a single command using our integrated `concurrently` script:
   ```bash
   npm run dev
   ```

---

## Group Members & Contributions

This application was developed as a collaborative school project. Below is the breakdown of individual contributions:

* **Sara**
  * Developed the application's global state management in React.
  * Implemented functionality and layout for the homework tests.
  * Designed and built loading component.

* **Emily**
  * Established the application's global design by creating and structuring the global CSS.
  * Configured the Supabase table and backend logic for user profile pictures.
  * Implemented the local profile management system (creating, updating, and deleting passwordless user profiles).

* **Kareem**
  * Designed the global header and footer components.
  * Developed the user interface and forms required for users to create and manage custom study lists.
  * Built the dashboard page.

* **August**
  * Created the statistics and history tracking page.
  * Built the Express backend server and configured routing.
  * Wrote project automation scripts (`install-all` and `concurrently` setup).

* **All Members**
  * Integrated API endpoints using Axios.
  * Managed UI styling and UX design.
  * Mockups, Component tree, Data Flow Diagram: https://www.figma.com/design/bYeWsc8Bgdx4rPmVRy1fnp/LEX-L%C3%84X?node-id=0-1&t=K0oK09WUx5fJx9d9-1
