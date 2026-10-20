<h1 align="center">iManager</h1>

<p align="center">A desktop application for managing student information and day-to-day school records.</p>

<p align="center">
  <img src="images/Screenshot%202026-10-20%20at%2018.56.58.png" alt="iManager desktop application" width="100%">
</p>

## Overview

iManager is a Vietnamese-language desktop application built with Electron. It provides sections for the dashboard, student records, scores, fees, and staff information. Data is stored locally on the user's computer.

## Features

- View and manage student records.
- Track scores and school fees.
- Search lists from the interface.
- Add, edit, and delete records.
- Import and export data using native file dialogs.
- Store application data in the operating system's application data directory.

> Parts of the interface and data layer use a legacy HTML/jQuery architecture. Back up your data before testing or moving the application to another computer.

## Tech stack

- **Electron 44** — desktop runtime based on Chromium and Node.js.
- **JavaScript, HTML, and CSS** — application logic and UI.
- **jQuery 3.3.1**, **jQuery UI**, and **Materialize CSS/JS** — DOM utilities, widgets, and UI components.
- **`@electron/remote`** — compatibility for legacy renderer-side window and Electron API calls.
- **`electron-storage`** — local JSON persistence.
- **`fs-extra`** and **`compressing`** — filesystem operations and data archive export.

## Requirements

- Node.js and npm, or Bun.
- macOS or Windows. Electron downloads the platform-specific runtime during dependency installation.

## Install and run

### npm

```bash
npm install
npm start
```

### Bun

```bash
bun install
bun start
```

The `start` command launches Electron using `index.js`. No separate web server is required.

## Data and backups

The application uses `electron-storage` to store JSON files in Electron's `userData` directory. This is typically under `~/Library/Application Support` on macOS and `%APPDATA%` on Windows. The exact path depends on the application name and Electron configuration.

Use the in-app import/export controls to back up data before updating or moving the application. Do not manually remove the application data directory if you need to keep its records.

## Project structure

```text
.
├── index.js                 # Electron main process and main window
├── main.html                # Application shell
├── components/
│   └── pages/               # Page content loaded into the application
├── block/                   # Section-specific toolbars
├── js/                      # Application logic and client-side libraries
├── css/                     # Application styles and Materialize CSS
├── resources/               # Images, icons, and fonts
└── images/                  # Screenshots used in project documentation
```

## Checks

A test suite is not configured yet; `npm test` is currently a placeholder. You can check the syntax of the main JavaScript entry points with:

```bash
node --check index.js
node --check js/script.js
node --check js/sidebar.js
```

## Compatibility and security notes

Legacy renderer code currently requires Node integration and `@electron/remote`. This is a compatibility measure, not the recommended security model for new Electron applications. Do not load untrusted content in the application windows. Consider migrating file operations, dialogs, and window creation to narrowly scoped IPC handlers exposed through a preload script.
