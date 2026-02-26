@echo off
echo === GitHub Pages 部署指南 ===
echo.

echo 步骤1: 在GitHub上创建仓库
echo - 访问: https://github.com/new  
echo - 仓库名: my-personal-website
echo - 设置为Public
echo - 不要初始化README
echo.

echo 步骤2: 请按以下步骤操作
echo 1. 将下面的 YOUR_USERNAME 替换为你的GitHub用户名
echo 2. 在命令提示符中依次执行这些命令:
echo.
echo cd website
echo git init
echo git add .
echo git commit -m "Initial commit: 个人网站含固件下载功能" 
echo git remote add origin https://github.com/YOUR_USERNAME/my-personal-website.git
echo git branch -M main
echo git push -u origin main
echo.

echo 步骤3: 启用GitHub Pages
echo - 进入仓库Settings → Pages
echo - Source: Deploy from a branch  
echo - Branch: main, Folder: / (root)
echo - Save
echo.

echo 步骤4: 访问网站
echo https://YOUR_USERNAME.github.io/my-personal-website/
echo.

echo 常见问题解决:
echo - 如果推送被拒绝: git push -f origin main
echo - 如果需要认证: 使用GitHub Personal Access Token  
echo - 部署延迟: 等待1-2分钟刷新页面
echo.

pause