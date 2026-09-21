# Date Range Reporter v1.14.0

Click **Today** to set both date fields to the current local day. In **Filter Settings**, you can now save up to five named Markdown templates for newly generated reports. Click **New template** to open a dialog where you name the template and enter its Markdown content; **Save** stores it, and an **Edit** button on each saved template reopens the dialog. Click a template's name to apply it to new reports (✓ marks the active one); click it again to return to the standard output. Use `{{content}}` to include the existing report and optional date, generation-time, and task-count fields. Field descriptions appear while editing.

Saved-report text and other previously untranslated labels now refresh when you change languages. Canceling preferences restores the previous language. Existing saved reports keep their original content.

The language dictionary is packaged separately so `index.html` remains below 100KB. The build now fails if that limit is exceeded.

Install the release archive through Super Productivity's plugin settings after v1.14.0 is published.
