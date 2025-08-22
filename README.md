# 🛠️ 小林 Coding 阅读全文解锁脚本  
> 一键永久解除 TechGrow 验证码遮罩，无需关注公众号即可阅读完整文章。

---

## 📌 功能
- ✅ **自动展开** 被隐藏的全文内容  
- ✅ **实时拦截** 任何二次插入的遮罩  
- ✅ **零配置** 安装即用，不影响其他网站  
- ✅ **轻量混淆** 可选混淆版本，防止被站点检测

---

## ⚡ 快速安装
| 步骤 | 说明 |
|---|---|
| 1 | 安装 [Tampermonkey](https://www.tampermonkey.net/) 扩展 |
| 2 | 🖱️ 点击脚本链接 → [一键安装](https://greasyfork.org/scripts/xxxx) |
| 3 | 打开任意 `xiaolincoding.com` 文章，自动生效 |

---

## 🎛️ 手动安装（开发者）
1. 复制下方代码块  
2. Tampermonkey → 创建新脚本 → 粘贴并保存  

```javascript
// ==UserScript==
// @name         小林coding 永久解除阅读全文限制
// @namespace    https://github.com/ZhoucpSAMA
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
