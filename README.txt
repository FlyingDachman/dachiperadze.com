DACHI PERADZE - IMPROVED WEBSITE (Clean Version)

This is the improved, fully working version of your site.

FILES:
- index.html          → Main website (with your photo, LinkedIn, good SEO, working ticker, mobile friendly)
- pricing.html        → Services & Fees page
- assets/dachi-peradze.jpg → Your professional headshot
- sitemap.xml + robots.txt → Basic SEO files

HOW TO USE THIS RIGHT NOW (Easiest method):

Option A - GitHub Web Upload (Recommended if git is annoying):
1. Go to https://github.com/FlyingDachman/dachiperadze.com
2. Click on the broken index.html → click the pencil (edit) icon
3. Delete all the garbage text
4. Paste the entire content of index.html from this folder
5. Commit the change (add a message like "Restore improved website")
6. Do the same for pricing.html
7. Upload the photo: In the repo, click "Add file" → "Upload files" → upload the assets folder
8. Wait 2-5 minutes, then hard refresh https://dachiperadze.com

Option B - Using git (if you have a working terminal with git + PAT):
cd /tmp
git clone https://github.com/FlyingDachman/dachiperadze.com.git fix
cd fix
cp ~/Downloads/dachiperadze-website/index.html .
cp ~/Downloads/dachiperadze-website/pricing.html .
cp -r ~/Downloads/dachiperadze-website/assets .
git add -A
git commit -m "Deploy improved clean website"
git push

After pushing/uploading:
- Wait 2-5 minutes for GitHub Pages to update
- Hard refresh the site (Ctrl/Cmd + Shift + R)

The code in index.html is the "better version" with:
- Your real photo
- LinkedIn links
- Strong SEO (JSON-LD structured data)
- Working horizontal ticker
- Good mobile experience
- Clean, improved layout

If you want the pure original version instead (before any changes), let me know and I can provide that too.
