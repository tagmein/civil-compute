import base64
import json
import os

from http.server import BaseHTTPRequestHandler, HTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

def safe_encode(key):
    return base64.urlsafe_b64encode(key.encode()).decode().rstrip('=')

def safe_decode(encoded_key):
    padding = '=' * (4 - len(encoded_key) % 4)  # Add padding if necessary
    return base64.urlsafe_b64decode(encoded_key + padding).decode()


DATA_DIR = './data'
PUBLIC_DIR = './public'
PORT = 9090

class RequestHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed_path = urlparse(self.path)
        query = parse_qs(parsed_path.query)
        key = query.get('key', [None])[0]

        if key:
            self.handle_get(key)
        else:
            self.serve_static()

    def do_DELETE(self):
        parsed_path = urlparse(self.path)
        query = parse_qs(parsed_path.query)
        key = query.get('key', [None])[0]

        if key:
            self.handle_delete(key)
        else:
            self.send_response(400)
            self.end_headers()

    def do_POST(self):
        parsed_path = urlparse(self.path)
        query = parse_qs(parsed_path.query)
        key = query.get('key', [None])[0]

        if key:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            self.handle_post(key, post_data)
        else:
            self.send_response(400)
            self.end_headers()

    def handle_get(self, key):
        encoded_key = safe_encode(key)
        file_path = os.path.join(DATA_DIR, encoded_key)
        if os.path.exists(file_path):
            with open(file_path, 'r') as f:
                value = f.read()
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({key: value}).encode())
        else:
            self.send_response(404)
            self.end_headers()

    def handle_delete(self, key):
        encoded_key = safe_encode(key)
        file_path = os.path.join(DATA_DIR, encoded_key)
        if os.path.exists(file_path):
            os.remove(file_path)
            self.send_response(204)
            self.end_headers()
        else:
            self.send_response(404)
            self.end_headers()

    def handle_post(self, key, value):
        encoded_key = safe_encode(key)
        file_path = os.path.join(DATA_DIR, encoded_key)
        with open(file_path, 'w') as f:
            f.write(value.decode())
        self.send_response(201)
        self.end_headers()

    def serve_static(self):
        return SimpleHTTPRequestHandler.do_GET(self)
        self.send_response(200)
        self.send_header('Content-Type', 'text/html')
        self.end_headers()
        # Serve static files from the PUBLIC_DIR
        requested_path = 'index.html' if self.path == '/' else self.path.strip('/')
        file_path = os.path.join(PUBLIC_DIR, requested_path)
        
        if os.path.exists(file_path) and os.path.isfile(file_path):
            with open(file_path, 'rb') as file:
                content = file.read()
            
            # Determine content type based on file extension
            _, ext = os.path.splitext(file_path)
            content_type = {
                '.html': 'text/html',
                '.css': 'text/css',
                '.js': 'application/javascript',
                '.jpg': 'image/jpeg',
                '.png': 'image/png',
                '.gif': 'image/gif'
            }.get(ext.lower(), 'application/octet-stream')
            
            self.send_response(200)
            self.send_header('Content-Type', content_type)
            self.send_header('Content-Length', str(len(content)))
            self.end_headers()
            self.wfile.write(content)
        else:
            self.send_error(404, 'File Not Found')

def run(server_class=HTTPServer, handler_class=RequestHandler, custom_param=None):
    server_address = ('', PORT)
    handler = lambda *args, **kwargs: handler_class(*args, directory=PUBLIC_DIR, **kwargs)
    httpd = server_class(server_address, handler)
    print(f'Serving on http://localhost:{PORT}')
    httpd.serve_forever()

if __name__ == "__main__":
    os.makedirs(DATA_DIR, exist_ok=True)
    run()
