# 固件API文档

## API端点

### 获取所有固件信息
```
GET /firmware/firmware.json
```

### 响应格式
```json
{
  "firmware": [
    {
      "id": 1,
      "name": "固件名称",
      "model": "设备型号",
      "version": "版本号",
      "category": "分类标识",
      "size": "文件大小",
      "release_date": "发布日期",
      "description": "固件描述",
      "changelog": ["更新日志条目1", "更新日志条目2"],
      "download_url": "本地下载路径",
      "direct_link": "直接下载链接",
      "checksum": {
        "md5": "MD5校验值",
        "sha256": "SHA256校验值"
      },
      "compatible_models": ["兼容型号1", "兼容型号2"],
      "icon": "显示图标"
    }
  ],
  "categories": [
    {
      "id": "分类ID",
      "name": "分类名称",
      "description": "分类描述"
    }
  ],
  "last_updated": "最后更新时间",
  "total_count": "固件总数",
  "api_version": "API版本"
}
```

## 使用示例

### JavaScript调用
```javascript
fetch('/firmware/firmware.json')
  .then(response => response.json())
  .then(data => {
    console.log('固件数据:', data.firmware);
    console.log('分类信息:', data.categories);
  })
  .catch(error => console.error('获取固件数据失败:', error));
```

### curl命令
```bash
curl https://your-username.github.io/firmware/firmware.json
```

## 数据更新

要更新固件信息：
1. 编辑 `firmware/firmware.json` 文件
2. 提交更改到GitHub
3. 等待GitHub Pages自动部署

## 注意事项

- JSON文件必须保持有效的JSON格式
- 所有日期格式应为 ISO 8601 格式
- 文件路径应相对于网站根目录
- 建议定期更新 `last_updated` 时间戳