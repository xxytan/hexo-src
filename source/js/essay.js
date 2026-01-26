(function() {
  // ----------------------
  // 相对时间功能
  // ----------------------
  function formatRelativeTime(dateStr) {
    const now = new Date();
    const past = new Date(dateStr);
    const diff = (now - past) / 1000; // 秒

    if (diff < 60) return `${Math.floor(diff)}秒前`;
    if (diff < 3600) return `${Math.floor(diff / 60)}分钟前`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}小时前`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}天前`;

    const year = past.getFullYear();
    const month = past.getMonth() + 1;
    const day = past.getDate();
    if (year !== now.getFullYear()) {
      return `${year}年${month}月${day}日`;
    }
    return `${month}月${day}日`;
  }

  function updateRelativeTime(container = document) {
    container.querySelectorAll('.datetime').forEach(el => {
      const timeStr = el.getAttribute('datetime');
      if (timeStr) el.textContent = formatRelativeTime(timeStr);
    });
  }

  // ----------------------
  // 初始化函数
  // ----------------------
  function init(container = document) {
    updateRelativeTime(container);
  }

  // 页面首次加载
  init(document);

  // PJAX 切换后重新初始化
  document.addEventListener('pjax:success', () => {
    init(document);
  });
})();
