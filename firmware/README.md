# 固件管理指南

## 目录结构
```
website/
├── firmware/
│   ├── router/      # 路由器固件
│   ├── iot/         # IoT设备固件
│   ├── camera/      # 摄像头固件
│   └── other/       # 其他设备固件
├── firmware.html    # 固件下载页面
└── js/firmware.js   # 固件管理脚本
```

## 如何添加新固件

### 方法一：直接上传到GitHub仓库
1. 将固件文件放入对应的分类目录
2. 更新 `js/firmware.js` 中的 `firmwareData` 数组
3. 提交更改到GitHub

### 方法二：使用GitHub Releases（推荐）
1. 在GitHub仓库创建新的Release
2. 上传固件文件作为Release附件
3. 更新固件数据中的 `directLink` 字段指向Release下载链接

## 固件数据格式
```javascript
{
    id: 1,
    name: "固件名称",
    description: "固件详细描述",
    version: "版本号",
    category: "分类(router/iot/camera/other)",
    size: "文件大小",
    releaseDate: "发布日期(YYYY-MM-DD)",
    downloadUrl: "本地下载路径",
    directLink: "直接下载链接",
    icon: "显示图标"
}
```

## 自动化脚本
可以创建脚本来自动化固件上传和数据更新流程。