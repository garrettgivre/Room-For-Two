# Test server for the in-app browser / Playwright: serves the repo but forces solo mode (no Firebase, so tests never
# touch Garrett and Beau's live room) and 404s the service worker so nothing is cached.
# Usage (from anywhere): python tools/dev/serve_solo.py [repo dir]   -> http://localhost:8765/index.html
import http.server, functools, sys, os
ROOT = sys.argv[1] if len(sys.argv) > 1 else os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
class H(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store'); super().end_headers()
    def do_GET(self):
        p = self.path.split('?')[0]
        if p.endswith('/firebase-config.js'):
            b = b'window.R42_FIREBASE=null;'
            self.send_response(200); self.send_header('Content-Type','text/javascript'); self.send_header('Content-Length',str(len(b))); self.end_headers(); self.wfile.write(b); return
        if p.endswith('/sw.js'):
            self.send_error(404); return
        super().do_GET()
http.server.ThreadingHTTPServer(('127.0.0.1', 8765), functools.partial(H, directory=ROOT)).serve_forever()
