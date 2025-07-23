# Timesheet Backend API

A Node.js backend application for managing employee timesheets with MySQL database integration.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js v5.1.0
- **Database**: MySQL with Sequelize ORM v6.37.7
- **Development**: Nodemon for hot reloading
- **Code Quality**: ESLint + Prettier
- **Environment**: dotenv for configuration

## Prerequisites

Before running this application, make sure you have:

- Node.js (v14 or higher)
- MySQL database server
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd timesheet_v2_backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment configuration:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```env
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=timesheet_db
DB_USER=your_username
DB_PASSWORD=your_password
```

## Usage

### Development Mode
Start the server with hot reloading:
```bash
npm run dev
```

### Production Mode
Start the server in production:
```bash
npm start
```

The server will start on the port specified in your environment variables (default: 3000).

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start the server in production mode |
| `npm run dev` | Start the server in development mode with nodemon |
| `npm run lint` | Run ESLint to check code quality |
| `npm run format` | Format code using Prettier |
