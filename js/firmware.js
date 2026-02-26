// 全局变量存储固件数据
let firmwareData = [];

// 从JSON文件加载固件数据
async function loadFirmwareData() {
    try {
        const response = await fetch('/firmware/firmware.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        firmwareData = data.firmware;
        return data;
    } catch (error) {
        console.error('加载固件数据失败:', error);
        // 如果无法加载JSON，使用默认数据
        return getDefaultFirmwareData();
    }
}

// 默认固件数据（备用方案）
function getDefaultFirmwareData() {
    return {
        firmware: [
            {
                id: 1,
                name: "TP-Link路由器固件 v3.2.1",
                description: "适用于TL-WR841N系列路由器的最新固件版本，修复了安全漏洞并提升了性能。",
                version: "3.2.1",
                category: "router",
                size: "8.5 MB",
                release_date: "2024-02-15",
                download_url: "firmware/router/tl-wr841n_v3.2.1.bin",
                direct_link: "https://github.com/JJZBQA/JJZBQA.github.io/releases/download/v3.2.1/tl-wr841n_v3.2.1.bin",
                icon: "📶"
            }
        ],
        categories: [
            { id: "router", name: "路由器" },
            { id: "iot", name: "IoT设备" },
            { id: "camera", name: "摄像头" },
            { id: "other", name: "其他设备" }
        ]
    };
}

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', async function() {
    // 加载固件数据
    const data = await loadFirmwareData();
    
    // 初始化页面
    initializeFirmwarePage(data);
    setupEventListeners();
    
    // 显示固件数据
    displayFirmware(firmwareData);
    setupSearchFunctionality();
    setupCategoryFilter();
});

function initializeFirmwarePage(data) {
    // 可以在这里处理额外的初始化逻辑
    console.log('固件数据加载完成:', data);
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
            <h3>${firmware.name} v${firmware.version}</h3>
            <p class="firmware-info">${firmware.description}</p>
            <div class="firmware-meta">
                <span>型号: ${firmware.model}</span>
                <span>版本: ${firmware.version}</span>
                <span>大小: ${firmware.size}</span>
                <span>发布: ${formatDate(firmware.release_date)}</span>
            </div>
            <a href="${firmware.download_url}" class="download-btn" download>
                📥 本地下载
            </a>
            <a href="${firmware.direct_link}" class="download-btn direct" target="_blank">
                🔗 直面链接下载
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