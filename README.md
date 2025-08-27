# 📊 CHART PLAYGROUND

> **Chart Playground** is an app where you can upload **datasets like CSV or XLSX**. The app will **analyze them**, show **summaries**, highlight the **most frequent data**, and **visualize** everything in **statistical charts**. You can also upload and **share your results** with others users.

## 📋 Basic Information

If you want to see the project detail documentation, you can read my software documentation document. 

1. **Pitch Deck**
https://docs.google.com/presentation/d/1LSZSX9IS1-R7q39HyEp8LAq0rqylUP0_g8QRSB89-xE/edit?usp=sharing 

2. **Diagrams**
https://drive.google.com/drive/folders/1jXekMSId46jHpGYQ7Bv16uAKucfZpt2M?usp=drive_link 

3. **Software Requirement Specification**
https://docs.google.com/document/d/1Q1eanTVAiMWW04eilvJDxKNErev_CDV2I657911ZCBk/edit?usp=sharing

4. **User Manual**
https://docs.google.com/presentation/d/1kT_49o2jRsAz4lkJBPRUZfj6APcsK_tOT-__Tvc4JEo/edit?usp=sharing 

5. **Test Cases**
https://docs.google.com/spreadsheets/d/1TOiP-_oF52KX5msj7caOFtfcv2yvDb4-DE30kCmZQt4/edit?usp=sharing

### 🌐 Deployment URL

- Telegram BOT : https://t.me/chart_playground_bot

### 📱 Demo video on the actual device

[URL]

---

## 🎯 Product Overview
- **Dataset Import**  
Users can upload datasets in **Excel** or **CSV** format for instant processing and analysis.  

- **Data Summary**  
The app **automatically generates summaries** such as total count, averages, minimum, maximum, and unique values for each column.  

- **Most Frequent Values**  
Users can quickly identify the most common entries across their dataset, making it **easier to detect patterns and trends**.  

- **Data Visualization**  
Datasets can be transformed into **visual insights** through bar charts, pie charts, and line graphs for easier understanding.  

- **Report Export**  
Analysis results and visualizations can be exported in **PPTX** or **Image** formats for further use in presentations or documentation.  

- **Collaboration & Sharing**  
Users can **share both the dataset and the analysis results** with others, ensuring that teams or groups work on the same insights seamlessly.  

## 🎯 Target User

1. **Data Analysts & Researchers**  
   Professionals who frequently work with datasets and need a quick way to **analyze, summarize, and visualize** data without setting up complex tools.  

2. **Students & Educators**  
   Individuals who want to **learn, teach, or present data analysis** by uploading spreadsheets and instantly seeing patterns, summaries, and charts.  

3. **Small Businesses & Startups**  
   Teams that track data in Excel/CSV (e.g., sales, inventory, customers) and want a **simple dashboard** for insights and reporting. 

---

## 🧠 Problem to Solve  

1. Many users rely on **Excel or CSV files** but lack the skills or time to create **summaries, pivot tables, or charts**.  
2. Manual analysis is **error-prone and repetitive**, especially when datasets are large or frequently updated.  
3. Users struggle to **quickly identify trends or most frequent values** without advanced data knowledge.  
4. Traditional BI tools can be **too complex, expensive, or overpowered** for users who just need **simple, fast insights**.  

---

## 💡 Solution  

1. Users can upload Excel or CSV files, and the app will instantly generate **summaries** (count, average, min, max, unique values), removing the need to build pivot tables or manual calculations.  
2. The analysis process is automated to reduce **human errors** and save time, especially when working with **large or frequently updated datasets**.  
3. The app highlights the **most occurring data points** and shows **trends** through analytics, so users can quickly find insights without advanced skills.  
4. Users can generate **clear charts and visualizations** (bar charts, pie charts, line graphs) with just a few clicks, offering a lightweight and affordable alternative to complex BI tools.  


## 🔗 Features

- 🤖 Telegram Bot Chat Integration
- 📄 Data Export
- 📊 Analytics & Summaries
- 📅 Analyze History
- 🌍 Share Dataset Globally

---

## 🛠️ Tech Stack

### Backend

- JS Telegraf

### Database

- MySQL

### Others Data Storage

- Firebase Storage (Cloud Storage for Asset File)

### Infrastructure & Deployment

- Cpanel (Deployment)
- Github (Code Repository)

### Other Tools & APIs

- Postman
- Swagger Docs

---

## 🏗️ Architecture
### Structure

### 📁 Project Structure

| Directory/File       | Purpose                                                                                   |
|----------------------|-------------------------------------------------------------------------------------------|
| `config/`            | Stores configuration files for services, database, cache, authentication, and constants. |
| `helpers/`           | Contains helper functions.              |
| `modules/`           | Defines the function handler, and module-specific logic.                              |
| `tests/`             | Holds automated test cases to ensure code quality and functionality.                      |
| `.env`               | Contains environment-specific variables such as Bot Token.        |
| `.env.example`       | Example environment configuration file to guide new setups.                               |
| `.gitignore`         | Specifies files and directories that should be ignored by Git version control.            |

---

### 🧾 Environment Variables

To set up the environment variables, just create the `.env` file in the root level directory.

| Variable Name                        | Description                                                              |
|----------------------------------|--------------------------------------------------------------------------|
| `TOKEN`                          | Telegram BOT Token                      |
| `BOT_USERNAME`                   | Telegram BOT Username                                       |

---

## 🗓️ Development Process

### Technical Challenges

- **Daily Limitation** for data transaction in Firebase Storage
- Not all **utils (helpers)** can be tested in **automation testing**
- Feature that return the **output in Telegram Chat or Exported File** must be **tested manually** 

---

## 🚀 Setup & Installation

### Prerequisites

#### 🔧 General
- Git installed
- A GitHub account
- Basic knowledge of Javascript, Software Testing, and Firebase Service
- Code Editor
- Telegram Account
- Postman
- Google Console Account

#### 🧠 Backend
- Javascript
- NodeJS for package manager
- Git for cloning the repository.
- MySQL database.
- Make (optional), if your project includes a Makefile to simplify common commands.
- Firebase service account JSON file or Google App Credential.
- Telegram Bot token, you can get it from **Bot Father** `@BotFather`
- Telegram User ID for testing the scheduler chat in your Telegram Account. You can get it from **IDBot** `@username_to_id_bot`
- Internet access from the hosting server (for Telegram webhook polling or long-polling)

### Installation Steps

**Local Init & Run**
1. Download this Codebase as ZIP or Clone to your Git
2. Set Up Environment Variables `.env` at the root level directory. You can see all the variable name to prepare at the **Project Structure** before or `.env.example`
3. Install Dependencies using `npm install`
4. **Create Your Telegram BOT** using `@BotFather`, so you can get the `TOKEN` and `BOT_USERNAME`.
5. **Run the Telegraf** using `node main.js`

**CPanel Deployment**
1. Source code uploaded to CPanel
2. ...

---

## 👥 Team Information

| Role     | Name                    | GitHub                                     | Responsibility |
| -------- | ----------------------- | ------------------------------------------ | -------------- |
| Backend Developer  | Leonardho R. Sitanggang | [@FlazeFy](https://github.com/FlazeFy)     | Manage Telegram Bot Codebase         |
| System Analyst  | Leonardho R. Sitanggang | [@FlazeFy](https://github.com/FlazeFy)     | Manage Diagram & Software Docs         |
| Quality Assurance  | Leonardho R. Sitanggang | [@FlazeFy](https://github.com/FlazeFy)     | Manage Testing The Bot Command         |

---

## 📝 Notes & Limitations

### ⚠️ Precautions When Using the Service
- Do not expose sensitive environment variables (e.g., API keys, token Bot) in public repositories.
### 🧱 Technical Limitations
- Telegram Bot polling may cause delays or downtime if the server experiences high load
### 🐞 Known Issues
- Limitation when using Firebase Storage for free plan Firebase Service, upgrade to Blaze Plan to use more.

---

## 🏆 Appeal Points 

- 📊 **Automatic Summaries**: Instantly generate key insights like count, average, minimum, maximum, and unique values without manual calculations.  
- 📈 **Clear Data Visualization**: Transform raw numbers into bar charts, pie charts, and line graphs for easy interpretation and presentations.  
- 📑 **One-Click Report Export**: Export analysis results and visualizations into PDF or Excel formats for documentation and sharing.  

---

_Made with ❤️ by Leonardho R. Sitanggang_