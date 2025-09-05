# MarkedMuseLanding

This project is configured to run as a Node.js application.

## Deployment Instructions for Plesk

To deploy this Node.js application on Plesk, follow these steps:

1.  **Install Node.js Extension:** Ensure the Node.js extension is installed and enabled on your Plesk server.
2.  **Add Application:** In your Plesk control panel, navigate to your domain and add a new Node.js application.
3.  **Configure Application Settings:**
    *   **Application Root:** Set this to the directory containing your `package.json` file. For this project, it is `d:/Site Projects/MarkedMuseLanding`.
    *   **Document Root:** This is typically the same as the Application Root for Next.js applications.
    *   **Startup File:** Specify the command to start your application. Use `npm run start` (or `yarn run start` if you use Yarn).
    *   **Application Mode:** Set this to `production`.
4.  **Install Dependencies:** After setting up the application in Plesk, navigate to the application's directory via SSH or the Plesk file manager and run `npm install` (or `yarn install`) to install all project dependencies.
5.  **Build the Application:** Run the build command to create production-ready assets: `npm run build` (or `yarn build`).
6.  **Environment Variables:** Configure any necessary environment variables within the Plesk interface for your Node.js application.

**Note:** The `out` directory, previously used for static site generation, has been removed as this project now runs as a Node.js application.