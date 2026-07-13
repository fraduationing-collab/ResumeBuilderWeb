// ================= 主應用程式：初始化與頁面切換 =================

function startApp(tier) {
    if (tier === 'tierA') {
        document.getElementById('appHeaderTitle').innerText = '履歷生成系統 | 方案 A：基礎標準版';
        document.getElementById('welcomeScreen').style.opacity = '0';
        
        setTimeout(() => {
            document.getElementById('welcomeScreen').style.display = 'none';
            const mainApp = document.getElementById('mainApp');
            mainApp.style.visibility = 'visible';
            mainApp.style.opacity = '1';
            
            // 從一開始就顯示履歷預覽與提示
            document.getElementById('editHint').classList.add('active');
            document.getElementById('resumeDoc').classList.add('active');
        }, 400);
    }
}

function returnToMenu() {
    if(confirm("確定要返回首頁嗎？您當前的輸入進度可能會遺失。")) {
        location.reload(); 
    }
}