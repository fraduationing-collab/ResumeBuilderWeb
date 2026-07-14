// ================= 右側履歷即時連動邏輯 =================

function liveUpdate(elementId, value, defaultText) {
    const el = document.getElementById(elementId);
    if(value.trim() === '') {
        el.innerHTML = defaultText;
        el.classList.add('empty-field');
    } else {
        // 將換行符號轉為 <br> 以支援多行輸入
        el.innerHTML = value.replace(/\n/g, '<br>');
        el.classList.remove('empty-field');
    }
}

// 專門處理學歷的即時連動 (拆分學校與年份)
function liveUpdateEdu(nameId, yearId, value, defaultName, defaultYear) {
    const match = value.match(/(.*?)\s*(?:\((.*?)\))?$/);
    const nameStr = match[1] || '';
    const yearStr = match[2] || '';
    
    liveUpdate(nameId, nameStr, defaultName);
    liveUpdate(yearId, yearStr, defaultYear);
}

// 處理檔案上傳的顯示
function handleFile(input) {
    if (input.files && input.files[0]) {
        const fileName = input.files[0].name;
        input.parentElement.nextElementSibling.innerText = `已選擇：${fileName}`;
        
        // 顯示附件區塊並更新檔名
        document.getElementById('cvAttachmentSection').style.display = 'block';
        document.getElementById('cvFileName').innerText = fileName;
    }
}

// ================= 客製化工具列邏輯 (設計微調) =================

// 切換顯示/隱藏控制面板
function toggleCustomPanel() {
    const panel = document.getElementById('customPanelContent');
    // 如果找不到面板，在 console 報錯方便除錯
    if (!panel) {
        console.error("找不到 customPanelContent 元素");
        return;
    }
    panel.classList.toggle('active');
}

// 變更字體
function changeFont(fontType) {
    const root = document.documentElement; // 抓取 :root
    
    if (fontType === 'serif') {
        // 傳統明體/襯線字
        root.style.setProperty('--cv-font-family', '"Times New Roman", "PMingLiU", "MingLiU", serif');
    } else if (fontType === 'mono') {
        // 等寬字體 (科技感)
        root.style.setProperty('--cv-font-family', '"Courier New", Courier, monospace');
    } else {
        // 預設無襯線字
        root.style.setProperty('--cv-font-family', '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif');
    }
}

// 變更主題顏色
function changeThemeColor(colorHex) {
    const root = document.documentElement;
    root.style.setProperty('--cv-primary-color', colorHex);
}
// ================= 語言切換邏輯 =================

function switchLang(mode, clickedBtn) {
    // 1. 移除所有按鈕的 active 狀態
    const buttons = document.querySelectorAll('.lang-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // 2. 把點擊的按鈕加上 active 狀態
    clickedBtn.classList.add('active');
    
    // 3. 更新履歷本體的 class (切換為 mode-zh, mode-en 或 mode-both)
    const resumeDoc = document.getElementById('resumeDoc');
    
    // 先移除原本的 mode 類別
    resumeDoc.classList.remove('mode-zh', 'mode-en', 'mode-both');
    
    // 加上新的 mode 類別
    resumeDoc.classList.add('mode-' + mode);
}
// ================= 雙語輸入同步邏輯 =================

function syncDualInput(targetId, zhInputId, enInputId) {
    const zhVal = document.getElementById(zhInputId).value;
    const enVal = document.getElementById(enInputId).value;
    const target = document.getElementById(targetId);
    
    // 我們在 HTML 裡定義好的雙語結構
    // 透過 JavaScript 動態填入兩個 span
    target.innerHTML = `
        <span class="txt-zh">${zhVal || '您的姓名'}</span>
        <span class="txt-en">${enVal || 'Your Name'}</span>
    `;
    
    // 如果兩個都沒寫，加上 empty-field 樣式
    if (!zhVal && !enVal) {
        target.classList.add('empty-field');
    } else {
        target.classList.remove('empty-field');
    }
}