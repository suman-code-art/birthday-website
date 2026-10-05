# 🎂 21st Birthday Website

A static site (HTML + CSS + vanilla JS). No backend, no keys, no build step.

## 1. Add your photos
Put 5 photos in the `assets/` folder and name them exactly:
`photo1.jpg`, `photo2.jpg`, `photo3.jpg`, `photo4.jpg`, `photo5.jpg`

- `photo1.jpg` is used twice: as the big photo at the top and the final photo. Make it your best one.
- Keep each photo under ~500 KB so it loads fast on phones (squoosh.app resizes for free). Portrait photos work best.
- Not .jpg? Either rename the file or change the names in `index.html`.

## 2. Add the song
Put your audio file in `assets/` and name it `birthday-song.mp3`. Only use music you have the rights to use.

## 3. Test it
Open `index.html` by double-clicking. Click the gold button: confetti, music and photos should appear.
(Some browsers block audio on `file://`; if so, it will work once deployed.)

## 4. Upload to GitHub
1. Create a free account at github.com.
2. Click **+ → New repository**, name it `birthday-website`, keep it **Public**, click **Create repository**.
3. Click **uploading an existing file**. Drag in the **contents** of the project (`index.html`, `style.css`, `script.js`, `README.md` and the whole `assets` folder with your photos and song).
4. Click **Commit changes**.

## 5. Deploy on Vercel
1. Go to vercel.com and choose **Sign Up → Continue with GitHub**.
2. Click **Add New… → Project**, then **Import** next to `birthday-website`.
3. Leave every setting as is (Framework Preset: **Other**). Click **Deploy**.
4. Wait ~30 seconds.

## 6. Get your link
When it finishes, Vercel shows a link like `https://birthday-website-xyz.vercel.app`. Click **Continue to Dashboard → Visit** to check it, then send that link to him.
Tip: in **Settings → Domains** you can pick a nicer name like `happy21.vercel.app`.

## 7. Change things later
Edit a file on GitHub (open it, click the ✏️ pencil, then **Commit changes**) or upload new photos to `assets/`. Vercel redeploys automatically in under a minute.

- Captions: `index.html`, inside each `<figcaption>`.
- Wish text: `index.html`, the `wish-text` section.
- Colors: the `:root` line at the top of `style.css`.

## Troubleshooting
- Photo missing? Check the filename and capitalisation match exactly (`photo1.jpg`, not `Photo1.JPG`).
- No sound? Check `assets/birthday-song.mp3` exists and the phone isn't on silent.
