# BhashaSetu – Local Language Learning Platform

Interactive language learning platform for Marathi, Hindi, and English with real-life scenario dialogs, interactive quizzes, pronunciation practice, and AI tutoring.

---

## 🚀 How to Open and Run in VS Code

### Step 1: Export / Download from AI Studio
1. In Google AI Studio Build, locate the top navigation / header bar.
2. Click **Export** or the GitHub / Download icon (e.g., **"Export to GitHub"** or **"Download ZIP"**).
3. If downloaded as a `.zip`, extract the archive to a folder on your computer. If exported to GitHub, clone your repository:
   ```bash
   git clone <your-repo-url>
   cd bhashasetu
   ```

### Step 2: Open in Visual Studio Code
- Open Visual Studio Code.
- Go to **File > Open Folder...** (or on macOS: `Cmd + O` / Windows: `Ctrl + K, Ctrl + O`).
- Select the project folder.
- Alternatively, open your terminal in the extracted folder and run:
  ```bash
  code .
  ```

### Step 3: Install Dependencies
Open the integrated terminal in VS Code (`Ctrl + ~` or **Terminal > New Terminal**) and run:
```bash
npm install
```

### Step 4: Configure Environment Variables
1. Create a `.env` file in the root folder by copying `.env.example`:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and set your Google Gemini API key:
   ```env
   GEMINI_API_KEY="your-gemini-api-key-here"
   APP_URL="http://localhost:3000"
   ```
   *(Get your free API key at [Google AI Studio](https://aistudio.google.com/app/apikey))*

### Step 5: Start the Development Server
Run the full-stack development server:
```bash
npm run dev
```

The application will be live at:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🛠 Available Scripts

- **`npm run dev`**: Starts the Express server with Vite middleware integration on port 3000 (with hot reloading).
- **`npm run build`**: Compiles the client code with Vite into `dist/`.
- **`npm start`**: Runs the production Node server.
- **`npm run lint`**: Runs TypeScript type checking (`tsc --noEmit`).

---

## 💡 VS Code Features Pre-Configured
- **Run & Debug (`F5`)**: Launch configurations are pre-defined in `.vscode/launch.json` for one-click dev server debugging or Chrome debugging.
- **Tasks (`Ctrl+Shift+B`)**: Build and dev tasks defined in `.vscode/tasks.json`.
- **Extensions**: Recommended extensions for Tailwind CSS and ESLint in `.vscode/extensions.json`.
