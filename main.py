import http.server
import socketserver
import json
import os
import uuid
import signal
import threading
from urllib.parse import urlparse, parse_qs

tokens = {}  # In-memory storage

class SimpleHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory="public", **kwargs)

    def do_GET(self):
        if self.path == '/':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            response = {
                "name": "Example Bot",
                "description": "An example bot implementation",
                "keywords": ["example"],
                "config": [
                    {"key": "example_key", "label": "Example Config", "placeholder": "Enter a value", "type": "string", "required": True}
                ]
            }
            self.wfile.write(json.dumps(response).encode())
        elif self.path.startswith('/favicon.ico'):
            return super().do_GET()
        elif self.path.startswith('/manage/'):
            # Handle static file serving
            self.path = self.path[7:]  # Remove '/manage/' prefix
            return super().do_GET()
        else:
            self.send_error(404, f"Not Found: {self.path}")

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data.decode('utf-8'))

        if self.path == '/install':
            token = str(uuid.uuid4())
            tokens[token] = data
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"token": token}).encode())

        elif self.path == '/reinstall':
            token = self.headers.get('Authorization', '').split(' ')[-1]
            if token in tokens:
                tokens[token]['config'] = data['config']
                self.send_response(200)
                self.end_headers()
            else:
                self.send_error(401, "Unauthorized")

        elif self.path == '/uninstall':
            token = self.headers.get('Authorization', '').split(' ')[-1]
            if token in tokens:
                del tokens[token]
                self.send_response(200)
                self.end_headers()
            else:
                self.send_error(401, "Unauthorized")

        elif self.path == '/message':
            token = self.headers.get('Authorization', '').split(' ')[-1]
            if token in tokens:
                response = {
                    "success": True,
                    "actions": [{"message": f"Received: {data['message']}"}]
                }
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps(response).encode())
            else:
                self.send_error(401, "Unauthorized")
        else:
            self.send_error(404, f"Not Found: {self.path}")

class ThreadedHTTPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    allow_reuse_address = True
    daemon_threads = True

    def __init__(self, *args, **kwargs):
        self.is_running = True
        super().__init__(*args, **kwargs)

    def serve_forever(self):
        while self.is_running:
            self.handle_request()

    def stop(self):
        self.is_running = False
        # Close the socket to unblock handle_request()
        self.socket.close()

def signal_handler(signum, frame):
    print("\nReceived signal to shut down. Closing server gracefully...")
    httpd.stop()

if __name__ == "__main__":
    PORT = int(os.environ.get("PORT", 8000))
    
    # Set up signal handler
    signal.signal(signal.SIGINT, signal_handler)
    signal.signal(signal.SIGTERM, signal_handler)

    httpd = ThreadedHTTPServer(("", PORT), SimpleHTTPRequestHandler)
    print(f"Serving on port {PORT}")
    print("Press Ctrl+C to shut down gracefully")

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        httpd.server_close()
        print("Server has been shut down.")
