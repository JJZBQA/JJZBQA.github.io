#!/bin/bash
# GitHub Pages 部署脚本

echo "=== GitHub Pages 部署指南 ==="

echo "
步骤1: 在GitHub上创建仓库
- 访问: https://github.com/new
- 仓库名: my-personal-website
- 设置为Public
- 不要初始化README

步骤2: 执行以下命令（替换YOUR_USERNAME为你的实际用户名）:

cd website
git init
git add .
git commit -m \"Initial commit: 个人网站含固件下载功能\"
git remote add origin https://github.com/YOUR_USERNAME/my-personal-website.git
git branch -M main
git push -u origin main

步骤3: 启用GitHub Pages
- 进入仓库Settings → Pages
- Source: Deploy from a branch
- Branch: main, Folder: / (root)
- Save

步骤4: 访问网站
https://YOUR_USERNAME.github.io/my-personal-website/

常见问题解决:
- 如果推送被拒绝: git push -f origin main
- 如果需要认证: 使用GitHub Personal Access Token
- 部署延迟: 等待1-2分钟刷新页面
"