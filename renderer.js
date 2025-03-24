const pages = {
    home: `
        <div class="header">
            <h2>EasyEnv 首页</h2>
            <button class="btn btn-primary install-all-btn">一键安装</button>
        </div>
        <div class="software-grid">
            <div class="software-item" data-software="git">
                <img src="assets/images/git.png" alt="Git">
                <h5>Git <span class="badge bg-success">推荐</span></h5>
                <p>高效的分布式版本控制系统，助力团队协作与代码管理。</p>
                <button class="btn btn-secondary">已安装</button>
            </div>
            <div class="software-item" data-software="nodejs">
                <img src="assets/images/nodejs.png" alt="Node.js">
                <h5>Node.js (NVM) <span class="badge bg-success">推荐</span></h5>
                <p>基于V8引擎的JavaScript运行时，专为高效网络应用设计。</p>
                <button class="btn btn-secondary">已安装</button>
            </div>
            <div class="software-item" data-software="python">
                <img src="assets/images/python.png" alt="python">
                <h5>Git <span class="badge bg-success">推荐</span></h5>
                <p>强大易学的高级编程语言，广泛用于Web开发、数据科学和人工智能。</p>
                <button class="btn btn-secondary">已安装</button>
            </div>
            <div class="software-item" data-software="jdk">
                <img src="assets/images/jdk.png" alt="JDK">
                <h5>JDK<span class="badge bg-success">推荐</span></h5>
                <p>Java开发必备工具包，包含编译、调试和运行环境。</p>
                <button class="btn btn-secondary">已安装</button>
            </div>
            <div class="software-item" data-software="php">
                <img src="assets/images/php.png" alt="PHP">
                <h5>PHP <span class="badge bg-success">推荐</span></h5>
                <p>流行的服务器端脚本语言，擅长创建动态交互式网页。</p>
                <button class="btn btn-primary">安装</button>
            </div>
        </div>
    `,
    mirror: `
        <h2>镜像源管理</h2>
        <p>请选择镜像源：</p>
        <select id="mirror-select" class="form-select">
            <option value="https://pypi.tuna.tsinghua.edu.cn/simple/">清华</option>
            <option value="https://mirrors.aliyun.com/pypi/simple/">阿里云</option>
            <option value="https://pypi.mirrors.ustc.edu.cn/simple/">中国科技大学</option>
            <option value="https://repo.huaweicloud.com/repository/pypi/simple/">华为云</option>
            <option value="https://mirrors.cloud.tencent.com/pypi/simple/">腾讯云</option>
        </select>
    `,
    software: `
        <h2>软件管理</h2>
        <div class="software-grid">
            <div class="software-item" data-software="git">
                <img src="assets/images/git.png" alt="Git">
                <h5>Git <span class="badge bg-success">推荐</span></h5>
                <p>分布式版本控制软件</p>
                <button class="btn btn-secondary">已安装</button>
            </div>
            <div class="software-item" data-software="nodejs">
                <img src="assets/images/nodejs.png" alt="Node.js">
                <h5>Node.js (NVM) <span class="badge bg-success">推荐</span></h5>
                <p>基于 Chrome V8 引擎的 JavaScript 运行环境</p>
                <button class="btn btn-secondary">已安装</button>
            </div>
        </div>
    `,
    about: `
        <h2>关于</h2>
        <p>这是一个小工具，用于安装前端开发环境。</p>
    `,
    settings: `
        <h2>设置</h2>
        <div class="mb-3">
            <label>安装默认路径:</label>
            <input type="text" id="folder-path" class="form-control" placeholder="点击选择文件夹" readonly>
        </div>
        <button id="choose-folder-btn" class="btn btn-primary mb-3">选择文件夹</button>
        <div class="mb-3">
            <label>主题模式:</label>
            <select id="theme-select" class="form-select">
                <option value="light">白天模式</option>
                <option value="dark">黑夜模式</option>
            </select>
        </div>
    `,
    detail: `
        <h2>软件详情</h2>
        <div id="software-detail-content">
            <p id="software-name">软件名称</p>
            <div class="mb-3">
                <label for="version-select">选择版本:</label>
                <select id="version-select" class="form-select">
                    <option value="latest">最新版本</option>
                    <option value="stable">稳定版</option>
                    <option value="beta">测试版</option>
                </select>
            </div>
            <button id="install-btn" class="btn btn-primary">确定安装</button>
        </div>
    `
};

function loadPage(page) {
    document.getElementById('content').innerHTML = pages[page];

    // 设置页面：绑定选择文件夹和主题模式切换事件
    if (page === 'settings') {
        const chooseFolderBtn = document.getElementById('choose-folder-btn');
        chooseFolderBtn.addEventListener('click', async () => {
            // 通过 preload 脚本提供的 electronAPI 调用主进程打开文件夹选择对话框
            if(window.electronAPI && window.electronAPI.openFolder){
                const folderPath = await window.electronAPI.openFolder();
                if(folderPath) {
                    document.getElementById('folder-path').value = folderPath;
                }
            }
        });
        const themeSelect = document.getElementById('theme-select');
        themeSelect.addEventListener('change', (e) => {
            if (e.target.value === 'dark') {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
        });
    }
    // 镜像管理页面：绑定切换镜像事件
    if (page === 'mirror') {
        const mirrorSelect = document.getElementById('mirror-select');
        mirrorSelect.addEventListener('change', (e) => {
            console.log('Selected mirror:', e.target.value);
        });
    }
    // 首页和软件管理页面：绑定软件项点击事件（点击后跳转至详情页面）
    if (page === 'home' || page === 'software') {
        document.querySelectorAll('.software-item').forEach(item => {
            item.addEventListener('click', () => {
                const software = item.getAttribute('data-software');
                loadSoftwareDetail(software);
            });
        });
    }
}

function loadSoftwareDetail(software) {
    loadPage('detail');
    // 填充详情页数据
    const softwareNameElem = document.getElementById('software-name');
    softwareNameElem.textContent = software.toUpperCase();
    const installBtn = document.getElementById('install-btn');
    installBtn.addEventListener('click', () => {
        const version = document.getElementById('version-select').value;
        console.log(`Installing ${software} version: ${version}`);
        alert(`开始安装 ${software}（版本：${version}）`);
    });
}

// 页面切换事件（侧边栏与设置图标点击）
document.querySelectorAll('.sidebar ul li, .settings-icon').forEach(item => {
    item.addEventListener('click', () => {
        const page = item.getAttribute('data-page');
        loadPage(page);
    });
});

// 默认加载首页
loadPage('home');