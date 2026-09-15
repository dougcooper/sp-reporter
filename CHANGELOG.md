# Changelog

## 1.14.0 - 2026-09-15

- Add a Today button that sets both date fields to the current local day.
- Add up to five named, synced Markdown report templates with generated content, date, time, and task-count fields; select the current format to preserve the existing output.
- Show field descriptions while editing the template.
- Finish localization of saved-report controls, messages, and generated labels, including immediate refresh when changing languages.
- Split translations into a separate plugin file and enforce a 100KB limit for the built HTML.

## 1.13.0 - 2026-09-14

- Add language selection for the reporter UI and generated reports: English, Simplified and Traditional Chinese, Japanese, Korean, Spanish, French, and German.
- Preserve the selected language in synced preferences.
- Render saved report names and excluded project names safely as text, including names with HTML characters.
- Sync package and lockfile versions and correct the release link and build instructions.
