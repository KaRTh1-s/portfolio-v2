# Karthikeyan S — Portfolio

Personal portfolio built with **React 19**, **Vite**, and **EmailJS**.

## Features

- **Expanded About Me**: Comprehensive professional background covering backend engineering, full-stack development, and distributed systems.
- **Interactive 3D Achievements Book**: Realistic CSS 3D animated flipping book with LeetCode and HackerRank tabbed albums, swipe/touch support, keyboard navigation, idle lift hint, and mobile stack fallback.
- **Case-Study Projects**: Featured case-study project cards (`ByteInsight`, `CloudSync`, `AgeVision AI`) driven by `src/data/projects.js` with 16:10 screenshot slots and compact "More projects" archive.
- **Floating Help & Shortcuts (`?`)**: Fixed bottom-left quick navigation panel and two-key sequence shortcuts (`G` then `H`, `G` then `A`, etc.) with form-field input protection.
- **Live Stats Strip**: Real-time LeetCode problem difficulty telemetry and GitHub contribution heatmap powered by Netlify Functions with dual in-memory and CDN caching.
- **Contact Form via EmailJS**: Direct client-side message delivery with field validation, loading states, and graceful fallback.

---

## Contact Form Setup (EmailJS)

The contact form is powered by the official browser SDK (`@emailjs/browser`). Follow these steps to configure real email delivery:

### 1. Create an EmailJS Account
1. Sign up at [https://www.emailjs.com/](https://www.emailjs.com/).
2. Verify your email address and log in to the dashboard.

### 2. Connect an Email Service
1. In the EmailJS dashboard, navigate to **Email Services** > **Add New Service**.
2. Select your email provider (e.g., **Gmail**).
3. Connect your account (e.g., `karthiselvaraj.dec13@gmail.com`) and note down the **Service ID** (e.g., `service_xxxxxxx`).

### 3. Create an Email Template
1. Go to **Email Templates** > **Create New Template**.
2. Configure the template fields to match the parameters submitted by the contact form:
   - **Subject**: `Portfolio Contact: {{from_name}}`
   - **Content**:
     ```
     You received a new message from your portfolio:
     
     Name: {{from_name}}
     Email: {{reply_to}}
     
     Message:
     {{message}}
     ```
   - **To Email**: `karthiselvaraj.dec13@gmail.com`
   - **Reply-To**: `{{reply_to}}`
3. Save the template and copy the **Template ID** (e.g., `template_xxxxxxx`).

### 4. Configure Environment Variables
Create a local `.env` file in the root directory (or configure them in your Netlify dashboard):

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```
> Find your **Public Key** under **Account** > **API Keys** in the EmailJS dashboard.

### 5. Restart Development Server
After updating `.env`, restart the development server so Vite loads the new variables:
```bash
npm run dev
```

### 6. Test a Submission
Fill out the contact form on `http://localhost:5173/#contact` and click **Send Message**. Check your inbox for the delivered email.

---

## Environment Variables Reference

| Variable | Description | Where to find / Default |
|---|---|---|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS Service Identifier | EmailJS Dashboard > Email Services |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS Message Template Identifier | EmailJS Dashboard > Email Templates |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS Browser Public Key | EmailJS Dashboard > Account > API Keys |
| `GITHUB_USERNAME` | GitHub handle for live stats | `KaRTh1-s` |
| `LEETCODE_USERNAME` | LeetCode username for live stats | `K_a_R_T_h_I` |
| `GITHUB_TOKEN` | GitHub Personal Access Token (`read:user`) | Optional (Netlify functions backend) |

---

## Local Development & Build

```bash
# Run local Vite development server
npm run dev

# Run linting
npm run lint

# Production build
npm run build
```
