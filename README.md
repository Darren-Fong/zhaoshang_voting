# ZhaoShang Voting

This is a Next.js app for a photo voting website.

## Features
- Users can upload up to 3 JPG photos (max 10MB each)
- Voting screen displays all photos by number (not username)
- Each user has 5 votes
- Usernames are created manually by the admin
- Uses Firebase for authentication, storage, and Firestore
- Ready for Vercel deployment

## Setup
1. Install dependencies:
   ```sh
   npm install
   ```
2. Set up Firebase (see below)
3. Run the development server:
   ```sh
   npm run dev
   ```

## Firebase Setup
- Create a Firebase project at https://console.firebase.google.com/
- Enable Authentication (Email/Password or custom usernames)
- Enable Firestore Database
- Enable Storage (for photo uploads)
- Add your Firebase config to `.env.local` (to be created)

## Deployment
- Deploy to Vercel for best results: https://vercel.com/

---

Replace this README as you customize the project.
