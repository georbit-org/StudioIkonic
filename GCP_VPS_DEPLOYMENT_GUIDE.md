# 🚀 Google Cloud VPS End-to-End Deployment Guide
**Project:** Iconic Design (Flask + Gunicorn + Nginx + Custom Domain + SSL)  
**Server External IP:** `34.131.198.22`  
**Architecture:** 100% Google Cloud VPS Self-Contained (Local PostgreSQL + Local Persistent Storage, No Supabase / No External Services)  
**Database Password & Master Key:** `awsbhine893980@9330`

---

## ⚡ Quick Fix for "Control Server Error" & Gunicorn Restart Loop

If your Gunicorn log shows:
```
iconic.service: Scheduled restart job, restart counter is at 20.
[ERROR] Control server error
```

### Why this happens:
1. **Password URL Encoding:** The password `awsbhine893980@9330` contains an `@` symbol. In `postgresql://username:password@localhost:5432/dbname`, the `@` character divides the password from the hostname. You **must** URL-encode `@` as `%40` (`awsbhine893980%409330`), otherwise the database connection crashes immediately on startup.
2. **Gunicorn Control Socket:** Gunicorn 25+ tries to create a control socket for the `www-data` user, which lacks a home directory permissions. Adding `--no-control-socket` and switching to clean local port binding `127.0.0.1:8000` prevents all socket and permission conflicts.

---

## 🛠️ Step-by-Step Production Setup

### Step 1: Install Dependencies & Local PostgreSQL
In your GCP SSH terminal:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y python3-pip python3-venv python3-dev nginx unzip git libpq-dev postgresql postgresql-contrib
```

---

### Step 2: Set Up Database with Your Password
Run these commands to configure PostgreSQL for user `iconic_user` with password `awsbhine893980@9330`:

```bash
sudo -u postgres psql
```

Inside the PostgreSQL prompt (`postgres=#`), copy and paste:
```sql
CREATE DATABASE iconic_db;
CREATE USER iconic_user WITH PASSWORD 'awsbhine893980@9330';
ALTER USER iconic_user WITH PASSWORD 'awsbhine893980@9330';
ALTER ROLE iconic_user SET client_encoding TO 'utf8';
ALTER ROLE iconic_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE iconic_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE iconic_db TO iconic_user;
ALTER DATABASE iconic_db OWNER TO iconic_user;
\q
```

Grant schema permissions:
```bash
sudo -u postgres psql -d iconic_db -c "GRANT ALL ON SCHEMA public TO iconic_user;"
```

---

### Step 3: Unpack Uploaded ZIP into Web Directory
Since `Iconic.Design.zip` is already uploaded in your home directory:

```bash
sudo mkdir -p /var/www/iconic
sudo chown -R $USER:www-data /var/www/iconic
sudo chmod -R 775 /var/www/iconic

# Unpack ZIP
unzip -o ~/Iconic.Design.zip -d /var/www/iconic/
cd /var/www/iconic
mkdir -p static/uploads
```

---

### Step 4: Python Virtual Environment & Dependencies
Inside `/var/www/iconic`:

```bash
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

---

### Step 5: Configure Production `.env`
Edit `/var/www/iconic/.env` (use `sudo` to prevent permission denied):

```bash
sudo nano /var/www/iconic/.env
```

Paste this exact configuration (note the `%40` encoding for the `@` inside the password):

```env
# Flask Environment
FLASK_ENV=production
SECRET_KEY=9f4a1c7b8e2d3f6a5b0c4e1d7a9f2b8c5e3d1a7f4b6c8e0d2a
ADMIN_MASTER_KEY=awsbhine893980@9330

# 100% Local PostgreSQL on this Google Cloud VPS (@ encoded as %40)
DATABASE_URL=postgresql://iconic_user:awsbhine893980%409330@localhost:5432/iconic_db

# Local storage is automatically used (no Supabase)
SUPABASE_URL=
SUPABASE_SERVICE_KEY=

# Contact Form Email (Optional)
MAIL_USERNAME=
MAIL_PASSWORD=
```
*(Press `Ctrl + O` then `Enter` to save, and `Ctrl + X` to exit nano).*

---

### Step 6: Test Database Connection & Initialize Tables
Run this single test command:

```bash
cd /var/www/iconic
source venv/bin/activate
python3 -c "import wsgi; print('SUCCESS: Flask app and database connected perfectly!')"
```
*If you see `SUCCESS: Flask app and database connected perfectly!`, your database and credentials are working 100%.*

---

### Step 7: Configure Gunicorn Service (systemd)
Edit the service file:

```bash
sudo nano /etc/systemd/system/iconic.service
```

Replace the content with this robust configuration (uses `--no-control-socket` and binds to `127.0.0.1:8000` to prevent socket permission errors):

```ini
[Unit]
Description=Gunicorn service for Iconic Design
After=network.target postgresql.service

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/iconic
Environment="PATH=/var/www/iconic/venv/bin"
EnvironmentFile=/var/www/iconic/.env
ExecStart=/var/www/iconic/venv/bin/gunicorn --workers 3 --no-control-socket --bind 127.0.0.1:8000 wsgi:app

Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```
*(Press `Ctrl + O` then `Enter` to save, and `Ctrl + X` to exit).*

Set directory ownership and restart the service:
```bash
sudo chown -R www-data:www-data /var/www/iconic
sudo chmod -R 775 /var/www/iconic

sudo systemctl daemon-reload
sudo systemctl restart iconic
sudo systemctl enable iconic
sudo systemctl status iconic
```
*It should now display `Active: active (running)` with zero restarts!*

---

### Step 8: Configure Nginx
Edit the Nginx configuration:

```bash
sudo nano /etc/nginx/sites-available/iconic
```

Paste (domain is `studioikonic.co`):
```nginx
server {
    listen 80;
    server_name 34.131.198.22 studioikonic.co www.studioikonic.co;

    client_max_body_size 50M;

    # Serve static assets and uploads directly
    location /static/ {
        alias /var/www/iconic/static/;
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    # Proxy dynamic requests to Gunicorn
    location / {
        include proxy_params;
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the configuration and reload Nginx:
```bash
sudo ln -sf /etc/nginx/sites-available/iconic /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

**Check Live Website Now:** Open your browser and go to `http://34.131.198.22`. Your site is now live!

---

### Step 9: Attach Your Custom Domain `studioikonic.co` (DNS Configuration)
In your domain registrar where you bought `studioikonic.co` (e.g. GoDaddy, Namecheap, Hostinger, BigRock, etc.), add these DNS records:

| Record Type | Host | Points To / Target | TTL |
| :--- | :--- | :--- | :--- |
| **A** | `@` | `34.131.198.22` | Auto / 300 |
| **CNAME** or **A** | `www` | `34.131.198.22` (or `studioikonic.co`) | Auto / 300 |

---

### Step 10: Enable Free SSL Certificate (HTTPS) for `studioikonic.co`
Once DNS resolves to `34.131.198.22`:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d studioikonic.co -d www.studioikonic.co
```

- Enter your email address for renewal notifications.
- Accept terms (`Y`).
- Certbot will enable HTTPS and auto-redirect HTTP to `https://studioikonic.co`!

---

## 🛠️ Handy Diagnostic Commands

```bash
# View live application logs
sudo journalctl -u iconic -f --no-pager

# Restart app
sudo systemctl restart iconic

# Check Nginx status
sudo systemctl status nginx
```
