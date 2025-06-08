# 🌦️ Weather — Your Personal Weather Buddy

[🔗 Live Demo](https://silly-toffee-1ad091.netlify.app)

A full-stack weather application built using the MERN stack with TypeScript, providing real-time weather data, hourly updates, and a 7-day forecast in a clean and user-friendly interface.


## 📸 Preview

Screenshot of the Site
![image](https://github.com/user-attachments/assets/bef9d6b5-9b1a-493a-a087-f380e4902971)


[Weather App](https://silly-toffee-1ad091.netlify.app/)


🚀 Features

- 🔍 Search by city
- 🌡️ Live temperature with "feels like"
- 💧 Humidity and 🌬️ wind speed data
- ⏰ Hour-by-hour temperature graph
- 📅 7-day weather forecast
- ⚙️ Responsive and minimalist UI


🛠️ Tech Stack

Frontend:
- React.js (with TypeScript)
- Axios
- Tailwind CSS (or your chosen styling)
- OpenWeatherMap API

Backend:
- Node.js
- Express.js
- TypeScript
- dotenv

Other Tools:
- Netlify (frontend hosting)

📁 weather/
├── public/                   
├── src/                  
│   ├── components/            
│   │   ├── DailyForecast.tsx
│   │   ├── HourlyForecast.tsx
│   │   └── WeatherIcon.tsx

│   ├── services/             
│   │   └── weatherApi.ts
│   ├── App.tsx               
│   ├── index.css             
│   ├── main.tsx             
│   └── vite-env.d.ts  

├── .gitignore               
├── index.html             
├── README.md               
├── package.json             
├── package-lock.json       
├── postcss.config.js         
├── tailwind.config.js        
├── tsconfig.json            
├── tsconfig.app.json       
├── tsconfig.node.json         
├── vite.config.ts             
├── eslint.config.js           





Use of AI in the Project
This project was partially built with the help of AI-powered development tools:
We used Bolt (AI code assistant) to get suggestions for:
Recommended tech stack based on the problem statement
Boilerplate code for setting up the backend API structure
Sample functions for calling external APIs

After that, we:
Customized the code to match our UI and logic
Integrated the OpenWeatherMap API
Fine-tuned the frontend using React + TypeScript
Hosted the final project on Netlify for easy access

This hybrid approach of AI-assisted development + manual customization helped us:
Speed up the prototyping process
Learn better coding practices
Focus more on creative problem solving and UX

Made with ❤️ by Rushabh Jain, Harsh Tiwari, Riddhvesh Dixit
