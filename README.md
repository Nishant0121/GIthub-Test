# 🔍 GitHub Profile Analyzer

A sleek GitHub user profile analyzer that displays public repositories, contribution heatmaps, weekly commit bar charts, and more.

## ⚙️ Tech Stack

- **React + TypeScript**
- **ShadCN + TailwindCSS**
- **React Router DOM**
- **GitHub REST API (with personal access token)**
- **Deployed on Vercel**

---

## 🚀 Features

- GitHub-style **contribution heatmap**
- Weekly **commit bar chart**
- Public **repo list**
- User metrics: stars, followers, etc.
- Custom loading skeletons
- Error handling for user not found, API limits
- Responsive layout with sidebar

---

## 📦 Installation

```bash
git clone https://github.com/Nishant0121/GIthub-Test.git
cd GIthub-Test
npm install
```

---

## 🔐 GitHub Token Setup

Create a `.env` file in the root and add:

```env
VITE_GITHUB_TOKEN=your_personal_access_token
```

## 🧪 Dev Mode

```bash
npm run dev
```

---

## 🖼️ Components Used from ShadCN

Make sure you installed the required components using:

```bash
npx shadcn-ui@latest add card button input label skeleton
```

---

## 🛰️ Deploy to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial deploy"
git push origin main
```

### 2. Deploy

- Go to [https://vercel.com](https://vercel.com)
- Import your GitHub repository
- During setup:
  - Set **Environment Variable**: `VITE_GITHUB_TOKEN`
  - Framework: **Vite**
- Click **Deploy**

---

## 🌌 Dark Theme

Theme: **Black with Blue Highlights**

Custom Tailwind + ShadCN theme setup to reflect GitHub vibes.

---

## 🧊 Folder Structure

```
src/
├── components/
│   ├── Heatmap.tsx
│   ├── BarChart.tsx
│   └── SkeletonLoader.tsx
├── pages/
│   ├── Home.tsx
│   ├── RepoList.tsx
│   └── RepoDetails.tsx
├── App.tsx
└── main.tsx
```

---
