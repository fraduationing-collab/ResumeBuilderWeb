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