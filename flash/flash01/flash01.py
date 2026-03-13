#!/usr/bin/env python3
import os
import json
import hashlib
import time
import argparse

BASE_URL = "https://jjzbqa.github.io/flash/flash01/"
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
FIRMWARE_DIRS = {
    "tool_firmware": os.path.join(SCRIPT_DIR, "tool_firmware"),
    "mcu_firmware": os.path.join(SCRIPT_DIR, "mcu_firmware")
}
JSON_FILE = os.path.join(SCRIPT_DIR, "flash01.json")

DEFAULT_COUNT = 20


def calculate_md5(filepath):
    """计算文件的MD5校验和"""
    md5_hash = hashlib.md5()
    with open(filepath, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            md5_hash.update(chunk)
    return md5_hash.hexdigest()


def get_file_size(filepath):
    """获取文件大小（字节）"""
    return os.path.getsize(filepath)


def extract_version(filename):
    """从文件名提取版本号"""
    return filename


def find_firmware_file(directory):
    """查找目录中的第一个固件文件"""
    if not os.path.exists(directory):
        return None
    
    extensions = ['.bin', '.hex', '.fw', '.ota']
    for filename in os.listdir(directory):
        if any(filename.lower().endswith(ext) for ext in extensions):
            return filename
    return None


def generate_url(firmware_type, filename):
    """生成完整的固件下载URL"""
    return f"{BASE_URL}{firmware_type}/{filename}"


def load_json():
    """加载现有JSON配置"""
    if os.path.exists(JSON_FILE):
        with open(JSON_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {}


def save_json(data):
    """保存JSON配置"""
    with open(JSON_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def process_firmware(firmware_type, download_count):
    """处理指定类型的固件"""
    directory = FIRMWARE_DIRS[firmware_type]
    filename = find_firmware_file(directory)
    
    if filename is None:
        print(f"[-] {firmware_type}: 未找到固件文件")
        return None
    
    filepath = os.path.join(directory, filename)
    print(f"[+] 找到固件: {filename}")
    
    md5 = calculate_md5(filepath)
    version = extract_version(filename)
    url = generate_url(firmware_type, filename)
    
    firmware_info = {
        "version": version,
        "url": url,
        "md5": md5
    }
    
    if firmware_type == "mcu_firmware":
        firmware_info["size"] = get_file_size(filepath)
        firmware_info["download_count"] = download_count
    
    return firmware_info


def parse_args():
    """解析命令行参数"""
    parser = argparse.ArgumentParser(description='Flash01 Firmware Manifest Generator')
    parser.add_argument('count', nargs='?', type=int, default=DEFAULT_COUNT,
                        help=f'下载次数限制 (默认: {DEFAULT_COUNT})')
    return parser.parse_args()


def main():
    args = parse_args()
    download_count = args.count
    
    print("=" * 50)
    print("Flash01 Firmware Manifest Generator")
    print("=" * 50)
    print(f"[*] 下载次数限制: {download_count}")
    print()
    
    config = load_json()
    
    print("[*] 扫描固件目录...")
    print()
    
    tool_info = process_firmware("tool_firmware", download_count)
    mcu_info = process_firmware("mcu_firmware", download_count)
    
    print()
    
    release_time = int(time.time())
    config["release_time"] = release_time
    
    if tool_info:
        config["tool_firmware"] = tool_info
        print(f"[+] tool_firmware 已更新")
    else:
        config.pop("tool_firmware", None)
    
    if mcu_info:
        config["mcu_firmware"] = mcu_info
        print(f"[+] mcu_firmware 已更新")
    else:
        config.pop("mcu_firmware", None)
    
    save_json(config)
    
    print()
    print("[*] 已保存到 flash01.json")
    print()
    
    if tool_info:
        print(f"tool_firmware:")
        print(f"  version: {tool_info['version']}")
        print(f"  url: {tool_info['url']}")
        print(f"  md5: {tool_info['md5']}")
    
    if mcu_info:
        print(f"mcu_firmware:")
        print(f"  version: {mcu_info['version']}")
        print(f"  url: {mcu_info['url']}")
        print(f"  size: {mcu_info['size']} bytes")
        print(f"  md5: {mcu_info['md5']}")
        print(f"  download_count: {mcu_info['download_count']}")
    
    print()
    print("完成!")


if __name__ == "__main__":
    main()
