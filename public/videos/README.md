Drop project video files here, named to match the `video` field you set in
`content/projects.json`, e.g.

  public/videos/aurora.mp4

Then in content/projects.json, set that project's "video" field to
"/videos/aurora.mp4" (it's currently null, which shows a tasteful
"Reel Coming Soon" placeholder on the card and in the modal).

Recommended export settings for hover-preview performance:
- H.264 MP4, muted-friendly (no audio needed for the hover preview)
- Under ~15MB per file, ~10-20 seconds long, 1280px wide is plenty
- The full-quality version can be swapped in separately if you want a
  higher-res cut to play inside the click-to-open modal.
