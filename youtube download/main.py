from fastapi import FastAPI, Request, BackgroundTasks, Form
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
import yt_dlp
import os
import json
from pathlib import Path

# 创建必要的目录
STATIC_DIR = Path("static")
VIDEOS_DIR = STATIC_DIR / "videos"
STATIC_DIR.mkdir(exist_ok=True)
VIDEOS_DIR.mkdir(parents=True, exist_ok=True)

app = FastAPI()

# 静态文件和模板配置
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# 视频信息存储
VIDEO_INFO_FILE = "video_info.json"

def load_video_info():
    if os.path.exists(VIDEO_INFO_FILE):
        with open(VIDEO_INFO_FILE, "r") as f:
            return json.load(f)
    return {}

def save_video_info(info):
    with open(VIDEO_INFO_FILE, "w") as f:
        json.dump(info, f)

def download_video(url: str):
    video_info = {}
    
    def progress_hook(d):
        if d['status'] == 'finished':
            video_info.update(d)
            
    ydl_opts = {
        'format': 'best[height<=720]',  # 限制视频质量，降低被反爬概率
        'outtmpl': str(VIDEOS_DIR / '%(title)s.%(ext)s'),
        'progress_hooks': [progress_hook],
        'cookiefile': 'cookies.txt',
        'quiet': False,
        'no_warnings': False,
        # 添加更多选项来降低被反爬概率
        'sleep_interval': 5,  # 下载间隔
        'max_sleep_interval': 10,
        'sleep_interval_requests': 3,
        # 使用外部下载器
        'external_downloader': 'aria2c',
        'external_downloader_args': ['--min-split-size=1M', '--max-connection-per-server=16'],
        # 添加请求头
        'http_headers': {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-us,en;q=0.5',
            'Sec-Fetch-Mode': 'navigate',
        }
    }
    
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            video_info.update({
                'title': info.get('title'),
                'duration': info.get('duration'),
                'uploader': info.get('uploader'),
                'description': info.get('description'),
                'filename': ydl.prepare_filename(info),
                'filesize': os.path.getsize(ydl.prepare_filename(info))
            })
            
        all_videos = load_video_info()
        all_videos[url] = video_info
        save_video_info(all_videos)
    except Exception as e:
        print(f"下载错误: {str(e)}")
        raise

@app.get("/")
async def home(request: Request):
    videos = load_video_info()
    return templates.TemplateResponse(
        "index.html",
        {"request": request, "videos": videos}
    )

@app.post("/download")
async def download(background_tasks: BackgroundTasks, url: str = Form(...)):  # 调整参数顺序
    background_tasks.add_task(download_video, url)
    return JSONResponse({"status": "下载已开始"})