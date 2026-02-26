// 固件数据 - 实际使用时可以从JSON文件或API加载
const firmwareData = [
    {
        id: 1,
        name: "TP-Link路由器固件 v3.2.1",
        description: "适用于TL-WR841N系列路由器的最新固件版本，修复了安全漏洞并提升了性能。",
        version: "3.2.1",
        category: "router",
        size: "8.5 MB",
        releaseDate: "2024-02-15",
        downloadUrl: "firmware/router/tl-wr841n_v3.2.1.bin",
        directLink: "https://github.com/yourusername/yourrepo/releases/download/v3.2.1/tl-wr841n_v3.2.1.bin",
        icon: "📶"
    },
    {
        id: 2,
        name: "智能插座固件 v1.5.0",
        description: "支持WiFi连接的智能插座最新固件，增加了定时功能和能耗统计。",
        version: "1.5.0",
        category: "iot",
        size: "2.1 MB",
        releaseDate: "2024-02-10",
        downloadUrl: "firmware/iot/smart-plug_v1.5.0.bin",
        directLink: "https://github.com/yourusername/yourrepo/releases/download/v1.5.0/smart-plug_v1.5.0.bin",
        icon: "🔌"
    },
    {
        id: 3,
        name: "安防摄像头固件 v2.8.3",
        description: "高清网络摄像头固件，优化了夜视效果和移动侦测算法。",
        version: "2.8.3",
        category: "camera",
        size: "15.2 MB",
        releaseDate: "2024-02-05",
        downloadUrl: "firmware/camera/security-camera_v2.8.3.bin",
        directLink: "https://github.com/yourusername/yourrepo/releases/download/v2.8.3/security-camera_v2.8.3.bin",
        icon: "📷"
    },
    {
        id: 4,
        name: "Arduino开发板固件 v1.0.2",
        description: "适用于Arduino Uno的自定义固件，包含了常用的传感器驱动程序。",
        version: "1.0.2",
        category: "other",
        size: "1.8 MB",
        releaseDate: "2024-01-28",
        downloadUrl: "firmware/other/arduino-uno_v1.0.2.hex",
        directLink: "https://github.com/yourusername/yourrepo/releases/download/v1.0.2/arduino-uno_v1.0.2.hex",
        icon: "💻"
    }
];

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeFirmwarePage();
    setupEventListeners();
});

function initializeFirmwarePage() {
    displayFirmware(firmwareData);
    setupSearchFunctionality();
    setupCategoryFilter();
}

function setupEventListeners() {
    // 返回顶部按钮
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #3498db;
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 20px;
        display: none;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(backToTop);

    // 滚动显示返回顶部按钮
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });

    // 返回顶部点击事件
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function displayFirmware(firmwares) {
    const grid = document.getElementById('firmwareGrid');
    
    if (firmwares.length === 0) {
        grid.innerHTML = '<div class="no-results"><h3>未找到匹配的固件</h3><p>请尝试其他搜索关键词或浏览其他分类</p></div>';
        return;
    }

    grid.innerHTML = firmwares.map(firmware => `
        <div class="firmware-card" data-category="${firmware.category}">
            <div class="firmware-icon">${firmware.icon}</div>
            <h3>${firmware.name}</h3>
            <p class="firmware-info">${firmware.description}</p>
            <div class="firmware-meta">
                <span>版本: ${firmware.version}</span>
                <span>大小: ${firmware.size}</span>
                <span>发布: ${formatDate(firmware.releaseDate)}</span>
            </div>
            <a href="${firmware.downloadUrl}" class="download-btn" download>
                📥 本地下载
            </a>
            <a href="${firmware.directLink}" class="download-btn direct" target="_blank">
                🔗 直接链接下载
            </a>
        </div>
    `).join('');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN');
}

function setupSearchFunctionality() {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const filteredFirmware = firmwareData.filter(firmware => 
            firmware.name.toLowerCase().includes(searchTerm) ||
            firmware.description.toLowerCase().includes(searchTerm) ||
            firmware.category.toLowerCase().includes(searchTerm)
        );
        
        displayFirmware(filteredFirmware);
    });
}

function setupCategoryFilter() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 更新活动状态
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.dataset.category;
            
            // 过滤固件
            let filteredFirmware;
            if (category === 'all') {
                filteredFirmware = firmwareData;
            } else {
                filteredFirmware = firmwareData.filter(firmware => firmware.category === category);
            }
            
            displayFirmware(filteredFirmware);
        });
    });
}

// 下载统计功能
function trackDownload(firmwareId) {
    // 这里可以集成Google Analytics或其他统计服务
    console.log(`固件 ${firmwareId} 开始下载`);
    
    // 简单的本地存储统计
    let downloadStats = JSON.parse(localStorage.getItem('downloadStats') || '{}');
    downloadStats[firmwareId] = (downloadStats[firmwareId] || 0) + 1;
    localStorage.setItem('downloadStats', JSON.stringify(downloadStats));
}

// 页面加载统计
function getPageViews() {
    let pageViews = parseInt(localStorage.getItem('pageViews') || '0');
    pageViews++;
    localStorage.setItem('pageViews', pageViews.toString());
    return pageViews;
}

// 初始化页面统计
document.addEventListener('DOMContentLoaded', function() {
    const views = getPageViews();
    console.log(`页面访问次数: ${views}`);
});

// 添加键盘快捷键支持
document.addEventListener('keydown', function(e) {
    // ESC键清除搜索
    if (e.key === 'Escape') {
        const searchInput = document.getElementById('searchInput');
        if (searchInput === document.activeElement) {
            searchInput.value = '';
            displayFirmware(firmwareData);
        }
    }
    
    // `/` 键聚焦搜索框
    if (e.key === '/' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }
});

// 离线支持 - Service Worker注册
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
        .then(function(registration) {
            console.log('SW registered: ', registration);
        })
        .catch(function(registrationError) {
            console.log('SW registration failed: ', registrationError);
        });
    });
}