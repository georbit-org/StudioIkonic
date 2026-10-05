import os
from waitress import serve
from app import app

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 3006))
    print(f"Starting Waitress server on http://127.0.0.1:{port}...")
    serve(app, host='0.0.0.0', port=port)
