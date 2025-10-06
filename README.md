# Date Range Reporter Plugin for Super Productivity

A plugin for [Super Productivity](https://super-productivity.com) that generates reports of completed tasks within a specified date range.

## Features

- 📅 Select custom date ranges for reporting
- 📊 View all tasks completed within the selected period
- 📋 Copy report to clipboard with one click
- ⏱️ Shows time spent on tasks (when available)
- 📈 Displays task completion statistics

## Installation

1. Download the plugin files
2. Open Super Productivity
3. Go to Settings → Plugins
4. Click "Load Plugin from Folder"
5. Select the `date-range-reporter` folder
6. The plugin will be activated automatically

## Usage

1. Click the "Task Report" button in the header (calendar icon)
2. Select your desired start and end dates
3. Click "Generate Report"
4. Review the report showing tasks grouped by completion date
5. Click "Copy to Clipboard" to copy the entire report

## Report Format

The generated report includes:
- Date range and generation timestamp
- Total number of completed tasks
- Tasks grouped by completion date
- Time spent on each task (when tracked)

Example report:
```
Task Completion Report
Date Range: Monday, October 1, 2024 - Monday, October 7, 2024
Generated: 10/7/2024, 3:30:00 PM
Total Tasks Completed: 5

================================================================================

Monday, October 1, 2024
--------------------------------------------------------------------------------
  1. Complete project proposal (45 min)
  2. Review pull requests (30 min)

Tuesday, October 2, 2024
--------------------------------------------------------------------------------
  No tasks completed

Wednesday, October 3, 2024
--------------------------------------------------------------------------------
  1. Write documentation (120 min)
  2. Fix bug in authentication (60 min)
  3. Team meeting notes (15 min)
```

## Requirements

- Super Productivity version 14.0.0 or higher
- Modern web browser with clipboard API support

## Plugin Files

- `manifest.json` - Plugin configuration
- `plugin.js` - Header button registration
- `index.html` - Report UI interface
- `icon.svg` - Plugin icon
- `README.md` - This documentation

## Version

1.0.0

## Author

Super Productivity Community

## License

This plugin is provided as-is for use with Super Productivity.
