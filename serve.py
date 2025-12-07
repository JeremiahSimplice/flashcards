import http.server
import socketserver
import webbrowser
import os

# Serve the project directory on localhost for quick preview
PORT = 8000

if __name__ == '__main__':
    root = os.path.dirname(__file__)
    os.chdir(root)
    handler = http.server.SimpleHTTPRequestHandler
    with socketserver.TCPServer(("", PORT), handler) as httpd:
        url = f"http://localhost:{PORT}/index.html"
        print(f"Serving at {url}")
        try:
            webbrowser.open(url)
        except Exception:
            pass
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("Server stopped")
