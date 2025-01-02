# CryptoTracker

CryptoTracker is a web application built using TypeScript, Tailwind CSS, and Vite. It leverages the CoinGecko API for cryptocurrency data and Supabase for backend database and authentication.

![Preview](./images/Preview.png)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/Vaibhavkulshrestha12/CrytpoDash.git
cd CryptoTracker
```

### Install Dependencies

```bash
npm install
```

### Configure Supabase

1. Create a project on [Supabase](https://supabase.io/).
2. Copy the `supabaseUrl` and `supabaseKey` from your Supabase project settings.
3. Create a `.env` file in the root directory and add the following:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_KEY=your-supabase-key
```

### Run the Application

```bash
npm run dev
```

## Project Structure

- **Modular Approach**: Separate stores, components, and utilities.
- **Supabase**: Set up for authentication and data storage.
- **Zustand**: Used for state management.
- **React Router**: Configured for routing.

## Key Features Implemented

- **Authentication Store**: Sign in, sign up, and sign out functionality.
- **Crypto Store**: Managing coin data and favorites.
- **Responsive Navbar**: Includes search functionality.
- **Dark Theme**: Implemented with Tailwind CSS.
- **Utility Functions**: For formatting prices and percentages.


## Open Source

This project is completely open source and free to use.
