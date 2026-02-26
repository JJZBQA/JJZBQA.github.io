# GitHub Pages 部署指南

## 部署步骤

### 1. 创建GitHub仓库
```bash
# 在GitHub上创建新仓库，例如：my-personal-site
```

### 2. 推送代码到GitHub
```bash
cd website
git remote add origin https://github.com/你的用户名/my-personal-site.git
git branch -M main
git push -u origin main
```

### 3. 启用GitHub Pages
1. 进入仓库的 Settings 页面
2. 找到 "Pages" 选项卡
3. Source 选择 "Deploy from a branch"
4. Branch 选择 "main"，folder 选择 "/ (root)"
5. 点击 Save

### 4. 访问你的网站
部署完成后，网站将在以下URL可用：
```
https://你的用户名.github.io/my-personal-site/
```

## 固件更新流程

### 添加新固件：
1. **上传固件文件**到 `firmware/` 对应子目录
2. **更新固件数据**在 `js/firmware.js` 中的 `firmwareData` 数组
3. **提交并推送**更改到GitHub
4. **等待自动部署**完成（通常1-2分钟）

### 使用GitHub Releases（推荐）：
1. 在GitHub仓库创建新的Release
2. 上传固件文件作为附件
3. 更新固件数据中的 `directLink` 字段
4. 推送更新

## 自动化脚本示例

### 批量添加固件脚本：
```bash
#!/bin/bash
# add_firmware.sh

FIRMWARE_NAME=$1
FIRMWARE_FILE=$2
CATEGORY=$3

# 复制文件到正确目录
cp "$FIRMWARE_FILE" "firmware/$CATEGORY/"

# 自动生成数据条目（需要手动完善）
echo "请在 js/firmware.js 中添加以下数据："
echo "{
    id: $(date +%s),
    name: '$FIRMWARE_NAME',
    description: 'TODO: 添加描述',
    version: 'TODO: 添加版本',
    category: '$CATEGORY',
    size: '$(du -h "$FIRMWARE_FILE" | cut -f1)',
    releaseDate: '$(date +%Y-%m-%d)',
    downloadUrl: 'firmware/$CATEGORY/$(basename "$FIRMWARE_FILE")',
    directLink: 'TODO: GitHub Release链接',
    icon: '🔧'
}"
```

## 最佳实践

1. **版本控制**：每次固件更新都创建新的Release
2. **备份**：定期备份重要固件文件
3. **文档**：为每个固件维护详细的更新日志
4. **测试**：部署前在本地测试网站功能
5. **监控**：关注GitHub Pages的状态和访问统计

## 故障排除

### 常见问题：
- **页面不显示**：检查分支设置是否正确
- **CSS/JS不加载**：确保文件路径正确
- **固件下载失败**：检查文件路径和权限设置
- **部署延迟**：GitHub Pages有时会有几分钟延迟

### 调试命令：
```bash
# 检查Git状态
git status

# 查看部署日志
# 在GitHub仓库的Actions标签页查看

# 本地测试
python -m http.server 8000
```