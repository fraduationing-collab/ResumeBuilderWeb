// ================= 左側對話流程控制邏輯 =================

const flowContainer = document.getElementById('flowContainer');

function appendUserMsg(text) {
    const div = document.createElement('div');
    div.className = 'user-msg';
    div.innerText = '✓ ' + text;
    flowContainer.appendChild(div);
}

function scrollToBottom() {
    flowContainer.scrollTop = flowContainer.scrollHeight;
}

function submitStep1() {
    document.getElementById('step1').style.display = 'none';
    appendUserMsg(`基本資料已確認`);
    setTimeout(showStep2, 300);
}

function showStep2() {
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="system-msg">收到。接著請填寫您的<b>教育背景</b> (可留白)。</div>
        <div class="input-group">
            <span class="input-label">大學/專科 (名稱與年份)</span>
            <input type="text" placeholder="例如：香港大學 (2018-2022)" oninput="liveUpdateEdu('cvUni', 'cvUniYear', this.value, '大學/專科 名稱', '年份')">
            <span class="input-label">中學 (名稱與年份)</span>
            <input type="text" placeholder="例如：某某紀念中學 (2012-2018)" oninput="liveUpdateEdu('cvSec', 'cvSecYear', this.value, '中學 名稱', '年份')">
            <span class="input-label">小學 (名稱與年份)</span>
            <input type="text" placeholder="例如：某某小學 (2006-2012)" oninput="liveUpdateEdu('cvPri', 'cvPriYear', this.value, '小學 名稱', '年份')">
            <button class="action-btn" onclick="submitStep2(this)">下一步：工作經驗</button>
        </div>
    `;
    flowContainer.appendChild(div);
    scrollToBottom();
}

function submitStep2(btn) {
    btn.parentElement.parentElement.style.display = 'none';
    appendUserMsg(`學歷資料已記錄`);
    setTimeout(showStep3, 300);
}

function showStep3() {
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="system-msg">請簡述您最近一次的<b>工作或兼職經驗</b> (如無經驗可直接跳過)。</div>
        <div class="input-group">
            <input type="text" placeholder="公司/機構名稱" oninput="liveUpdate('cvExpCompany', this.value, '公司/機構名稱')">
            <input type="text" placeholder="職位 (例如：行政助理)" oninput="liveUpdate('cvExpRole', this.value, '職位名稱')">
            <input type="text" placeholder="任職期間 (例如：2022 - 2023)" oninput="liveUpdate('cvExpYear', this.value, '任職期間')">
            <textarea rows="3" placeholder="簡述主要職責..." oninput="liveUpdate('cvExpDesc', this.value, '在此簡述您的主要職責與工作內容...')"></textarea>
            <button class="action-btn" onclick="submitStep3(this)">下一步：額外技能</button>
        </div>
    `;
    flowContainer.appendChild(div);
    scrollToBottom();
}

function submitStep3(btn) {
    btn.parentElement.parentElement.style.display = 'none';
    appendUserMsg(`工作經驗已記錄`);
    setTimeout(showStep4, 300);
}

function showStep4() {
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="system-msg">請列出您的<b>語言能力或專業技能</b>。</div>
        <div class="input-group">
            <textarea rows="3" placeholder="例如：\n- 精通廣東話、普通話及英語\n- 熟悉 MS Office (Word, Excel)" oninput="liveUpdate('cvSkills', this.value, '您具備的技能將顯示於此...')"></textarea>
            <button class="action-btn" onclick="submitStep4(this)">下一步：附件上傳</button>
        </div>
    `;
    flowContainer.appendChild(div);
    scrollToBottom();
}

function submitStep4(btn) {
    btn.parentElement.parentElement.style.display = 'none';
    appendUserMsg(`技能資料已記錄`);
    setTimeout(showStep5, 300);
}

function showStep5() {
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="system-msg">最後一步！如果有相關的<b>學歷證明或證書</b>，請在此上傳。</div>
        <div class="input-group">
            <label class="file-upload-wrapper">
                <div style="font-size: 1.5rem; margin-bottom: 5px;">📁</div>
                <div style="color: #4B5563; font-size: 0.9rem;">點擊選擇檔案 (支援 PDF, JPG, PNG)</div>
                <input type="file" onchange="handleFile(this)">
            </label>
            <div class="file-name-display" style="text-align:center; font-size: 0.85rem; color: #1E3A8A; margin-top: 5px;"></div>
            <button class="action-btn" style="margin-top: 15px;" onclick="submitFinal(this)">完成並準備匯出 🎉</button>
        </div>
    `;
    flowContainer.appendChild(div);
    scrollToBottom();
}

function submitFinal(btn) {
    btn.parentElement.parentElement.style.display = 'none';
    appendUserMsg(`流程結束`);
    
    const finalDiv = document.createElement('div');
    finalDiv.innerHTML = `<div class="system-msg" style="border-left-color: #059669; color: #059669; font-weight: bold;">編輯完成！請在右側確認最終排版，您可以點擊任何文字進行最後微調。</div>`;
    flowContainer.appendChild(finalDiv);
    scrollToBottom();
}