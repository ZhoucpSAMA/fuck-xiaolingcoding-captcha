// ==UserScript==
// @name         小林coding 永久解除阅读全文限制
// @namespace    https://github.com/ZhoucpSAMA/fuck-xiaolingcoding-captcha
// @version      2.0
// @description  实时阻止 TechGrow 重新插入遮罩与恢复隐藏
// @author       you
// @match        *://xiaolincoding.com/*
// @match        *://*.xiaolincoding.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';

    // 1. 立即解除一次（防止首屏闪烁）
    function unlock() {
        const box = document.getElementById('readmore-container');
        if (box) {
            box.style.height   = 'auto';
            box.style.overflow = 'visible';
        }
        ['readmore-mask', 'readmore-btn', 'readmore-wrapper']
            .forEach(id => document.getElementById(id)?.remove());
    }

    // 2. 监听 DOM 变化，实时干掉遮罩
    const obs = new MutationObserver(() => unlock());
    obs.observe(document, { childList: true, subtree: true });

    // 3. 页面加载完成后也再执行一次兜底
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', unlock);
    } else {
        unlock();
    }
})();
