"""Screenshot built pages from ./dist with Playwright (pip install playwright && playwright install chromium).
Usage: python scripts/screenshot.py out-prefix "" install learn
Env: DARK=1 dark mode, MOBILE=1 phone viewport, FULL=0 viewport only, DIST=<dir> PORT=<n>."""
import asyncio, os, sys, subprocess, time
from playwright.async_api import async_playwright
prefix, pages = sys.argv[1], sys.argv[2:]
dark, mobile, full = os.environ.get("DARK")=="1", os.environ.get("MOBILE")=="1", os.environ.get("FULL","1")=="1"
DIST = os.environ.get("DIST", os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "dist"))
PORT = os.environ.get("PORT", "4321")
srv = subprocess.Popen([sys.executable, "-m", "http.server", PORT, "--bind", "127.0.0.1", "-d", DIST], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(0.8)
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        vp = {"width":390,"height":844} if mobile else {"width":1440,"height":900}
        ctx = await b.new_context(viewport=vp, device_scale_factor=1, is_mobile=mobile, color_scheme="dark" if dark else "light")
        for pg in pages:
            page = await ctx.new_page()
            if dark: await page.add_init_script("localStorage.setItem('theme','dark')")
            await page.goto(f"http://127.0.0.1:{PORT}/{pg}", wait_until="networkidle", timeout=60000)
            await page.wait_for_timeout(800)
            name = (pg.strip('/').replace('/','-') or 'home')
            await page.screenshot(path=f"{prefix}{name}.png", full_page=full)
            await page.close()
        await b.close()
try:
    asyncio.run(main())
finally:
    srv.terminate()
