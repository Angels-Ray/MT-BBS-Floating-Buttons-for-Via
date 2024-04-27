// ==UserScript==
// @name         MT论坛悬浮按钮
// @namespace    https://www.atray.cn
// @version      0.1
// @description  给MT论坛增加悬浮按钮
// @author       ATRAY
// @match        *://bbs.binmt.cc/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const key = encodeURIComponent('打开新页面:执行判断');
    if (window[key]) {
        return;
    }

    // 隐藏页面中的特定元素
    const elementsToHide = ['#comiis_head', '#forum > div.comiis_body > div:nth-child(4)', '#comiis_foot_box'];
    elementsToHide.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.display = "none";
        }
    });

    // 创建悬浮按钮
    const expandButton = document.createElement("div");
    expandButton.style.cssText = `
        position: fixed;
        inset: 600px 12px auto auto;
        color: #000;
        border-radius: 30%;
        justify-content: center;
        cursor: pointer;
        z-index: 9999;
        box-shadow: 1.5px -1.5px 0px 0px rgb(164, 162, 162);
        height: 34px;
        width: 34px;
        margin: 1px;
        display: flex;
        align-items: center;
        background: rgb(234, 230, 230);
        transform: rotateZ(90deg);
    `;
    expandButton.innerHTML = '<i class="comiis_font"></i>';
    document.body.appendChild(expandButton);

    // 创建按钮容器
    const buttonContainer = document.createElement("div");
    buttonContainer.style.cssText = `
        position: fixed;
        top: 400px;
        right: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: transform 250ms ease-out 0s, -webkit-transform 250ms ease-out 0s;
        z-index: 9998;
        transform: translateX(60px);
    `;
    document.body.appendChild(buttonContainer);

    // 创建按钮的点击事件处理程序
    function createButtonClickHandler(url) {
        return function() {
            window.open(url, '_blank');
        };
    }

    // 创建三个展开按钮
    const buttonsData = [
        { icon: '', url: 'https://bbs.binmt.cc/search.php' },
        { icon: '', url: 'https://bbs.binmt.cc/forum.php?mod=guide&view=hot' },
        { icon: '', url: 'https://bbs.binmt.cc/home.php?mod=space&do=profile&mycenter=1' }
    ];

    buttonsData.forEach(data => {
        const button = document.createElement("div");
        button.style.cssText = `
            color: #fff;
            border-radius: 30%;
            width: 34px;
            height: 34px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            margin-bottom: 10px;
            box-shadow: 1.5px 1.5px 0px 0px rgb(164, 162, 162);
            background: rgb(83, 188, 245);
        `;
        button.innerHTML = `<i class="comiis_font">${data.icon}</i>`;
        button.onclick = createButtonClickHandler(data.url);
        buttonContainer.appendChild(button);
    });

    // 拖动按钮相关变量和事件监听
    let isDragging = false;
    let startY;

    expandButton.addEventListener('touchstart', function(e) {
        isDragging = true;
        startY = e.touches[0].clientY - expandButton.getBoundingClientRect().top;
    });

    expandButton.addEventListener('touchmove', function(e) {
        e.preventDefault();

        if (isDragging) {
            const offsetY = e.touches[0].clientY - startY;
            expandButton.style.top = offsetY + 'px';
        }
    });

    expandButton.addEventListener('touchend', function() {
        isDragging = false;
    });

    // 点击按钮展开或收起按钮容器
    expandButton.addEventListener('click', function() {
        if (buttonContainer.style.transform === "translateX(60px)") {
            buttonContainer.style.transform = "translateX(-12px)"; // 展开按钮容器
            expandButton.style.transform = "rotateZ(270deg)";
            expandButton.style.boxShadow = "rgb(164, 162, 162) -1.5px 1.5px 0px 0px";
        } else {
            buttonContainer.style.transform = "translateX(60px)"; // 收起按钮容器
            expandButton.style.transform = "rotateZ(90deg)";
            expandButton.style.boxShadow = "rgb(164, 162, 162) 1.5px -1.5px 0px 0px";
        }
    });

})();
