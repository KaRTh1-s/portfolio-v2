/**
 * Projects data configuration
 * 
 * Featured projects: Displayed as comprehensive case-study cards.
 * Status values: 'Shipped' | 'In progress' (defaults to 'Shipped', editable).
 * Non-featured projects: Displayed in the compact 'More projects' index.
 */

export const featuredProjects = [
    {
        id: 'project-byteinsight',
        slug: 'byteinsight',
        title: 'ByteInsight',
        subtitle: 'Personalized Nutrition Intelligence Platform',
        summary: 'Full-stack nutrition management platform with real-time calorie, macronutrient, and meal intelligence.',
        description: 'ByteInsight is a full-stack nutrition management platform built to help users track food intake, monitor dietary goals, and organize meals. It combines a React frontend with a Java 21 and Spring Boot backend, Spring Security, JWT authentication, and a MySQL database. Features include food search and nutritional breakdowns, meal journaling, personalized nutrition targets, dashboard summaries, meal planning, recipe management, and shopping lists.',
        status: 'Shipped',
        problem: 'Tracking daily nutrition accurately and maintaining diet adherence is complex without centralized meal journaling, gap detection, and evidence-based nutrient scoring.',
        whatIBuilt: 'A comprehensive full-stack platform combining React with a Java 21 Spring Boot REST backend, Spring Security with JWT authentication, and MySQL database, integrating food search, real-time macro analysis, personalized dietary targets, and meal planning.',
        stack: ['React', 'JavaScript', 'Java 21', 'Spring Boot', 'Spring Security', 'JWT', 'MySQL', 'Maven', 'Railway'],
        result: 'Delivers instant nutritional breakdowns, macro adherence tracking, and dietary balance intelligence deployed live on Railway.',
        codeUrl: 'https://github.com/KaRTh1-s/ByteInsight',
        liveUrl: 'https://vibrant-laughter-production-0250.up.railway.app/dashboard'
    },
    {
        id: 'project-weatherfinder',
        slug: 'weatherfinder',
        title: 'WeatherFinder',
        subtitle: 'Cinematic Weather Intelligence',
        summary: 'Responsive weather platform with real-time conditions, 7-day outlooks, and atmospheric visual effects.',
        description: 'WeatherFinder is a responsive weather application that combines weather information, forecasts, interactive visualizations, and atmospheric visual effects. It supports weather search by city and aims to present current conditions and forecast information through a polished, responsive interface.',
        status: 'Shipped',
        problem: 'Standard weather apps often present fragmented data without intuitive visualizations of current metrics, temperature trends, and regional forecasts.',
        whatIBuilt: 'A responsive React web application utilizing OpenWeather API with live city search, 7-day outlooks, humidity and wind telemetry, temperature unit conversion, and dynamic atmospheric conditions.',
        stack: ['React', 'JavaScript', 'CSS', 'OpenWeather API'],
        result: 'Provides real-time meteorological conditions and multi-day forecasts with smooth responsiveness across desktop and mobile.',
        codeUrl: 'https://github.com/KaRTh1-s/WeatherFinder',
        liveUrl: 'https://weatherfinder-v1.netlify.app/'
    },
    {
        id: 'project-agevision-ai',
        slug: 'agevision-ai',
        title: 'AgeVision AI',
        subtitle: 'Deep Learning-Based Facial Age Estimation',
        summary: 'Deep learning pipeline for facial age estimation using ConvNeXt-Small and label distribution learning.',
        description: "AgeVision AI is a deep learning-based facial age estimation system designed to predict a person's apparent age from facial images using a multi-stage face detection and preprocessing pipeline, ConvNeXt-Small feature extractor, and Deep Label Distribution Learning (DLDL) with expected-age estimation.",
        status: 'Shipped',
        problem: 'Facial age prediction from unconstrained images is sensitive to pose, lighting variation, and head orientation.',
        whatIBuilt: 'End-to-end computer vision pipeline featuring MTCNN detection with Haar Cascade fallback, padded cropping, ConvNeXt-Small feature extraction, Deep Label Distribution Learning (DLDL), and Test-Time Augmentation (TTA).',
        stack: ['Python', 'PyTorch', 'ConvNeXt-Small', 'Computer Vision', 'MTCNN', 'DLDL', 'Streamlit'],
        result: 'Produces continuous apparent age estimates with enhanced inference robustness through distribution ensembling.',
        codeUrl: 'https://github.com/KaRTh1-s/AgeVision-AI',
        liveUrl: 'https://age-ai.streamlit.app/'
    }
];

export const moreProjects = [
    {
        id: 'project-cloudsync',
        name: 'CloudSync',
        subtitle: 'Multi-cloud File Storage Application',
        description: 'Infosys Internship 5.0 — A web application integrating Google Drive & OneDrive to manage files seamlessly from a single interface, improving productivity, file organization, and storage management.',
        stack: ['React.js', 'Spring Boot', 'MySQL', 'Google Drive API', 'OneDrive API', 'OAuth 2.0'],
        codeUrl: 'https://github.com/KaRTh1-s/CloudStorageApp',
        liveUrl: '' // GitHub Code button only; no Live Demo button as instructed
    }
];
