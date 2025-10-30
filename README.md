# Date Range Reporter Plugin for Super Productivity

A plugin for [Super Productivity](https://super-productivity.com) that generates reports of completed tasks and tasks with work logs within a specified date range.

## Features

- 📅 Select custom date ranges for reporting
- 📊 View all tasks completed or worked on within the selected period
- 🔀 **Group reports by Date or by Project** for different perspectives
- 🏷️ Optionally show project names when grouping by date
- 📆 Optionally show completion dates when grouping by project
- ⏱️ Automatic time aggregation per project with totals
- ⏳ Includes in-progress tasks that have work logs in the date range
- 🔍 Exclude accidental or minimal time entries (default: 5 min threshold)
- 👁️ Optionally hide time spent on individual tasks
- 👁️ Optionally hide rolled-up time totals in project grouping
- ✏️ Edit generated reports in a modal popup
- 💾 Save reports for future reference
- 📋 Copy report to clipboard with one click
- 📁 View and manage saved reports
- 🗑️ Delete individual or multiple saved reports
- 🔗 Combine multiple saved reports into a single document
- ⏱️ Shows time spent on tasks (when available)
- 📈 Displays task statistics including excluded work log counts
- 📝 Optional inclusion of task notes in reports
- 🔄 Reports are synced across devices using Super Productivity's persistence API

## Installation

1. Download the plugin files for the latest [Release](https://github.com/dougcooper/sp-reporter/releases)
2. Open Super Productivity
3. Go to Settings → Plugins
4. Click "Load Plugin from Folder"
5. Select the `date-range-reporter` folder
6. The plugin will be activated automatically

## Usage

1. Click the "Task Report" button in the header (calendar icon)
2. Select your desired start and end dates
3. **Configure display options** (click the ⚙️ settings button):
   - **Choose grouping method:**
     - **Group by Date** (default): Tasks organized by completion date, optionally showing project names
     - **Group by Project**: Tasks organized by project with time totals, optionally showing completion dates
   - **Set minimum time threshold** (default: 5 minutes) to filter out accidental or very short work logs
   - **Show/hide time spent** on individual tasks
   - **Show/hide total time** for projects (when grouping by project)
   - **Include task notes** in the report
4. Click "Generate Report"
6. The report will appear in a modal popup showing:
   - Tasks grouped by date (completed tasks and tasks with work logs)
   - In-progress tasks marked with WIP indicator
   - Time spent on each task (when tracked)
   - Count of excluded work logs (if any were filtered out)
   - Optional task notes (when enabled)
7. **Edit the report** as needed - add comments, modify content, or reorganize tasks
8. **Save the report** with a custom name for future reference
9. **Copy to Clipboard** to paste the report in Markdown format anywhere
10. **Manage saved reports** in the list below the date range selection:
   - Click on a saved report to view/edit it
   - Delete individual reports with the 🗑️ button
   - Select multiple reports and delete them all at once
   - Select multiple reports and combine them into a single document with the 🔗 button

## Report Format

The generated report is formatted in Markdown and includes:
- Date range and generation timestamp
- Total number of tasks (both completed and with work logs)
- Count of excluded work logs (when applicable) with the threshold value
- Tasks grouped by date or project (user selectable)
- Individual work log entries for tasks with multiple work logs
- WIP indicator for work in progress entries (before task completion)
- Time spent on each task (when tracked)
- Optional task notes (when enabled)

### Example Report - Grouped by Date

```markdown
# Task Completion Report

**Date Range:** Monday, October 1, 2024 - Monday, October 7, 2024  
**Generated:** 10/7/2024, 3:30:00 PM  
**Total Tasks:** 6
**Excluded Work Logs:** 2 (below 5 min threshold)
*Note: Individual work log entries are shown for tasks with multiple work logs. WIP indicates work in progress.*

---

## Monday, October 1, 2024

- Complete project proposal [Project A] *(45 min)*
- Review pull requests [Project B] *(30 min)*
  Reviewed PRs #123 and #124, left feedback on both

## Tuesday, October 2, 2024

*No tasks*

## Wednesday, October 3, 2024

- Write documentation [Project A] *(120 min)*
  Updated API docs and added examples for new endpoints
- Refactor API endpoints [Project B] *(60 min)* WIP

## Thursday, October 4, 2024

- Refactor API endpoints [Project B] *(90 min)* WIP

## Friday, October 5, 2024

- Refactor API endpoints [Project B] *(120 min)*
- Fix bug in authentication [Project A] *(60 min)*
```

### Example Report - Grouped by Project

```markdown
# Task Completion Report

**Date Range:** Saturday, October 11, 2025 - Sunday, October 12, 2025  
**Generated:** 10/12/2025, 10:49:35 PM  
**Total Tasks:** 5
*Note: Tasks are grouped by project. Time shown is the total across all days in the date range.*

---

## Project 1 *(total: 1h 10m)*

  - aaa [Saturday, October 11, 2025] *(35m)*
  - bbb [Saturday, October 11, 2025] *(20m)*
  - fff [Last worked: Sunday, October 12, 2025] *(15m)* WIP

## Project 2 *(total: 1h 5m)*

  - ccc [Saturday, October 11, 2025] *(25m)*
  - ddd [Saturday, October 11, 2025] *(40m)*
```

The Markdown format makes it easy to paste into documentation, notes, or any Markdown-compatible application.
```

## Combining Reports

You can combine multiple saved reports into a single document:

1. Select two or more saved reports using the checkboxes
2. Click the "🔗 Combine Selected" button
3. The combined report will open in a modal with all selected reports merged together
4. Each report is clearly labeled with its original name and metadata
5. Reports are sorted by their saved date (oldest first) in the combined document
6. Edit the combined report as needed
7. Save it with a custom name or copy it to clipboard

### Example Combined Report

```markdown
# Combined Report

**Combined from 2 reports**  
**Generated:** 10/23/2025, 12:35:05 AM  

---

## Report 1: Weekly Tasks - Oct 17-23

**Date Range:** Friday, October 17, 2025 - Thursday, October 23, 2025  
**Generated:** 10/23/2025, 10:00:00 AM  
**Total Tasks:** 5

[Report 1 content here...]

---

## Report 2: Sprint Review - Oct 20-21

**Date Range:** Monday, October 20, 2025 - Tuesday, October 21, 2025  
**Generated:** 10/23/2025, 11:00:00 AM  
**Total Tasks:** 3

[Report 2 content here...]
```

## Requirements

- Super Productivity version 14.0.0 or higher
- Modern web browser with clipboard API support

## Development

### Testing

The plugin includes unit tests using Vitest. The tests use JSDOM to load the actual `date-range-reporter/index.html` file with a mocked PluginAPI, ensuring the production code is tested directly.

#### Running Tests

```bash
# Run tests once
npm test

# Or using make
make test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

#### Test Coverage

The test suite validates:
- Date utility functions (formatting, display, range generation)
- Report generation and validation
- Plugin integration with mocked PluginAPI
- Theme detection
- UI helper functions

### Building the Plugin

```bash
# Build the plugin zip file
make build

# Clean up generated files
make clean

# Show all available commands
make help
```

### Creating a Release

To create a new release:

1. **Update the version** in `date-range-reporter/manifest.json`
2. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Release v1.x.x"
   git push
   ```
3. **Run the release command**:
   ```bash
   make release
   ```

The `make release` command will automatically:
- ✅ Verify prerequisites (GitHub CLI installed, clean working directory)
- 📦 Build the plugin zip file
- 🏷️ Create a git tag based on the version in manifest.json
- 🚀 Push the tag to GitHub
- 🎉 Create a GitHub release with the zip file attached

#### Prerequisites for Releases

- GitHub CLI (`gh`) installed: `brew install gh`
- GitHub CLI authenticated: `gh auth login`
- Write access to the repository
- Clean working directory (all changes committed)

#### Version Numbering

Follow [Semantic Versioning](https://semver.org/):
- `v1.0.0` - Major release (breaking changes)
- `v1.1.0` - Minor release (new features, backwards compatible)
- `v1.0.1` - Patch release (bug fixes)

#### Troubleshooting Releases

**Tag already exists:**
```bash
git tag -d v1.0.0
git push --delete origin v1.0.0
make release
```

**Update an existing release:**
```bash
make build
gh release upload v1.0.0 date-range-reporter.zip --clobber
```

## Plugin Files

- `manifest.json` - Plugin configuration
- `plugin.js` - Header button registration
- `index.html` - Report UI interface
- `icon.svg` - Plugin icon
- `README.md` - This documentation

## Version

1.5.0

## Author

Super Productivity Community

## License

This plugin is provided as-is for use with Super Productivity.

