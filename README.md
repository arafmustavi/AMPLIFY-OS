
# APMLIFY - AI Underwriting OS

Institutional-grade explainable AI for credit risk and secondary debt markets.

## Hosting on GitHub Pages

This repository is configured to deploy automatically via GitHub Actions.

### Setup Instructions

1.  **Create a Repository**: Create a new repository on GitHub named `AMPLIFY-OS`.
2.  **Push the Code**:
    ```bash
    git init
    git add .
    git commit -m "initial commit"
    git branch -M main
    git remote add origin https://github.com/arafmustavi/AMPLIFY-OS.git
    git push -u origin main
    ```
3.  **Enable GitHub Pages**:
    *   Go to **Settings** > **Pages** in your GitHub repository.
    *   Under **Build and deployment**, set **Source** to "Deploy from a branch".
    *   The GitHub Action (located in `.github/workflows/deploy.yml`) will automatically run when you push to the `main` branch.
    *   Once the action finishes (the "Actions" tab will show a green checkmark), a new branch named `gh-pages` will be created. 
    *   Under **Settings** > **Pages**, ensure the branch is set to `gh-pages` and the folder is `/ (root)`, then click **Save**.
4.  **View Site**: Your app will be live at:
    **https://arafmustavi.github.io/AMPLIFY-OS/**

### Development

To run locally:
```bash
npm install
npm run dev
```

### Dummy Mode
This app is currently in **Dummy Mode**, meaning it uses high-fidelity simulated AI responses to bypass Gemini API quota limits. This is ideal for demonstrations and staging environments.
