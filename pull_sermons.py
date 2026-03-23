import urllib.request
import urllib.error
import json
import re
import os
import time

BASE_URL = "https://christchurchbellingham.org"
START_URL = "https://christchurchbellingham.org/sermon-blog?format=json"
DOWNLOAD_DIR = "sermons"

def sanitize_filename(name):
    """Keep only safe characters to avoid file system issues."""
    from html import unescape
    name = unescape(name) # Decode HTML entities like &amp;
    name = re.sub(r'[\\/*?:"<>|]', "", name)
    return name.strip()

def get_sermons():
    url = START_URL
    sermons = []
    
    # Setting a generic User-Agent since some servers block default urllib user agents
    req_headers = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"}
    
    while url:
        print(f"Fetching page: {url}")
        
        req = urllib.request.Request(url, headers=req_headers)
        try:
            with urllib.request.urlopen(req) as response:
                if response.status != 200:
                    print(f"Failed to fetch {url}. Status code: {response.status}")
                    break
                
                try:
                    data = json.loads(response.read().decode('utf-8'))
                except json.JSONDecodeError:
                    print("Failed to parse JSON")
                    break
        except urllib.error.URLError as e:
            print(f"Error fetching URL {url}: {e}")
            break
        
        for item in data.get("items", []):
            body = item.get("body", "")
            if not body:
                continue
            
            # Find all audio embeds in the body HTML
            embeds = re.findall(r'<div[^>]*class="sqs-audio-embed"[^>]*>', body, re.IGNORECASE)
            for embed in embeds:
                url_match = re.search(r'data-url="([^"]+)"', embed, re.IGNORECASE)
                title_match = re.search(r'data-title="([^"]+)"', embed, re.IGNORECASE)
                
                if url_match:
                    audio_url = url_match.group(1).replace("&amp;", "&")
                    
                    title = "Unknown Sermon"
                    if title_match:
                        title = title_match.group(1)
                        
                    # Handle the extension
                    ext = audio_url.split(".")[-1].split("?")[0]
                    if ext not in ["mp3", "mp4", "m4a"]:
                        ext = "mp3" # Fallback if URL doesn't have standard extension
                        
                    filename = f"{sanitize_filename(title)}.{ext}"
                    sermons.append({
                        "url": audio_url,
                        "filename": filename
                    })
                
        # Pagination
        pagination = data.get("pagination", {})
        if pagination.get("nextPage"):
            next_url = pagination.get("nextPageUrl")
            # Ensure proper URL parameter appending
            if "?" in next_url:
                url = BASE_URL + next_url + "&format=json"
            else:
                url = BASE_URL + next_url + "?format=json"
            
            time.sleep(1) # Be nice to the server and do not bombard with requests
        else:
            url = None
            
    return sermons

def download_sermons():
    if not os.path.exists(DOWNLOAD_DIR):
        os.makedirs(DOWNLOAD_DIR)
        
    print("Collecting sermon URLs...")
    sermons = get_sermons()
    print(f"\\nFound a total of {len(sermons)} sermons.")
    
    req_headers = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"}
    
    for i, sermon in enumerate(sermons, 1):
        filepath = os.path.join(DOWNLOAD_DIR, sermon["filename"])
        
        # Avoid downloading the same file twice
        if os.path.exists(filepath):
            print(f"[{i}/{len(sermons)}] Skipping '{sermon['filename']}', already downloaded.")
            continue
            
        print(f"[{i}/{len(sermons)}] Downloading '{sermon['filename']}'...")
        try:
            req = urllib.request.Request(sermon["url"], headers=req_headers)
            with urllib.request.urlopen(req, timeout=15) as r, open(filepath, "wb") as f:
                while True:
                    chunk = r.read(1024*1024)
                    if not chunk:
                        break
                    f.write(chunk)
        except Exception as e:
            print(f"  --> Error downloading {sermon['filename']}: {e}")

if __name__ == "__main__":
    download_sermons()
