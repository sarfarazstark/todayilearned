# Getting Started with Create React App

This is a Full Stack application, basically to create and display facts along with their source of information, their category as well as voting system for each fact.

## Guide by [Jonas Schmedtmann](https://www.udemy.com/course/full-stack-crash-course/?couponCode=IND21PM)

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Supabase
- **Testing**: Jest, React Testing Library
- **Deployment**: Netlify
- **Version Control**: Git, GitHub

## Setting Up Environmental Variables

To run this app with Supabase, you need to set up environmental variables. Follow these steps:

1. **Create a `.env.local` file in the root of your project:**

   ```sh
   touch .env.local
   ```

2. **Add your Supabase credentials to the `.env.local` file:**

   ```env
   REACT_APP_SUPABASE_URL=your-supabase-url
   REACT_APP_SUPABASE_KEY=your-supabase-key
   ```

   Replace `your-supabase-url` and `your-supabase-key` with your actual Supabase URL and API key.

3. **Ensure your `.env.local` file is included in your `.gitignore` file to prevent it from being committed to your version control system:**

   ```sh
   echo ".env.local" >> .gitignore
   ```

## Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/sarfarazstark/todayilearned
   ```

2. **Navigate to the project directory:**

   ```sh
   cd todayilearned
   ```

3. **Install the dependencies:**

   ```sh
    npm install
   ```

## Available Scripts

In the project directory, you can run:

1. ### `npm start`

   Runs the app in development mode.\
   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

   The page will reload when you make changes.\
   You may also see any lint errors in the console.

2. ### `npm test`

   Launches the test runner in the interactive watch mode.\
   See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

3. ### `npm run build`

   Builds the app for production to the `build` folder.\
   It correctly bundles React in production mode and optimizes the build for the best performance.

   The build is minified and the filenames include the hashes.\
   Your app is ready to be deployed!

   See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
