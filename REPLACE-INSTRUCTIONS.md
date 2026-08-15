# Replacing the MSARW Project Files

This archive is a complete source project. Extract its contents **directly into the existing project root**, not into an additional `msarw-redesign-clean-latest/` subfolder.

The replacement root must contain `package.json`, `pnpm-lock.yaml`, `client/`, `server/`, `shared/`, `vite.config.ts`, and `patches/` at the same level.

Before replacing files, stop the development server. Back up the existing project, then copy the extracted files into the project root and allow existing files to be overwritten. Keep the `patches/wouter@3.7.1.patch` file; it is required by the lockfile and package configuration.

After replacement, run:

```bash
pnpm install --frozen-lockfile
pnpm run check
pnpm run build
pnpm run dev
```

If the browser still shows the previous design, stop and restart the development server, then perform a hard refresh. In Chromium, use `Ctrl+Shift+R` on Windows/Linux or `Cmd+Shift+R` on macOS. If the site is deployed, create a new deployment from the updated project root and verify that the deployment is using the new commit or uploaded files.

To confirm that the correct source is running, inspect `client/src/pages/Home.tsx` and `client/src/index.css`. The updated project contains the Deep-Ocean loading screen, neon MSARW wordmark, custom scrollbar, interactive backdrop, and responsive portfolio sections.
