// ==UserScript==
// @name         Lite Faucet
// @namespace    http://tampermonkey.net/
// @version      0.7
// @author       PotsuDEV
// @match        https://litefaucet.in/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=litefaucet.in
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let scriptStartTime = new Date();

    function clickClaimButtons() {
        const claimButtons = document.querySelectorAll('button[class^="btn"][class*="claim"]');
        claimButtons.forEach(button => {
            button.click();
        });
    }

    setTimeout(clickClaimButtons, 5000);

    setInterval(clickClaimButtons, 5 * 60 * 1000);

    function handleAutologinAndAutoshorts() {
        const loginEmail = 'email-aqui@gmail.com';
        const loginPassword = 'senha-aqui';

        const emailField = document.querySelector('input[type="email"]');
        const passwordField = document.querySelector('input[type="password"]');
        const loginButton = document.querySelector('button.login-btn');

        if (emailField && passwordField && loginButton) {
            emailField.value = loginEmail;
            passwordField.value = loginPassword;
            loginButton.click();
        } else {
            console.warn('Campos de email e/ou senha não encontrados');
        }

        if (window.location.href === 'https://litefaucet.in/login') {
            window.location.href = 'https://litefaucet.in/dashboard';
        }

        const shortlinkElements = document.querySelectorAll('div[class^="col-lg-3"]');
        shortlinkElements.forEach(element => {
            if (element.textContent.includes('Clks.Pro') ||
                element.textContent.includes('Shrinkme') ||
                element.textContent.includes('Droplink') ||
                element.textContent.includes('rss') ||
                element.textContent.includes('Clk.sh')) {
                element.click();
            }
        });
    }

    handleAutologinAndAutoshorts();

    function clickAnyButton() {
        setTimeout(function() {
            const buttonToClick = document.querySelector('a[class="btn btn-primary waves-effect waves-light"]');
            if (buttonToClick) {
                buttonToClick.click();
            } else {
                console.warn('Botão não encontrado.');
            }
        }, 5000);
    }

    clickAnyButton();

    const banner = document.createElement('div');
    banner.style.position = 'fixed';
    banner.style.bottom = '20px';
    banner.style.left = '20px';
    banner.style.padding = '10px 15px';
    banner.style.backgroundColor = '#2c3e50';
    banner.style.color = '#ecf0f1';
    banner.style.fontSize = '14px';
    banner.style.borderRadius = '8px';
    banner.style.zIndex = '9999';
    banner.style.display = 'flex';
    banner.style.flexDirection = 'column';
    banner.style.alignItems = 'center';
    banner.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
    banner.style.fontFamily = "'Roboto', sans-serif";

    const githubLink = document.createElement('a');
    githubLink.href = 'https://github.com/potisu';
    githubLink.target = '_blank';
    githubLink.style.textDecoration = 'none';
    githubLink.style.color = '#ecf0f1';
    githubLink.style.marginBottom = '5px';
    githubLink.style.display = 'flex';
    githubLink.style.alignItems = 'center';
    githubLink.style.backgroundColor = '#2980b9';
    githubLink.style.padding = '8px 12px';
    githubLink.style.borderRadius = '8px';

    const githubIcon = document.createElement('img');
    githubIcon.src = 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png';
    githubIcon.style.width = '24px';
    githubIcon.style.transition = 'transform 0.3s ease-in-out';
    githubIcon.style.marginRight = '8px';

    githubIcon.addEventListener('mouseover', function() {
        githubIcon.style.transform = 'rotate(360deg)';
    });

    githubIcon.addEventListener('mouseout', function() {
        githubIcon.style.transform = 'rotate(0deg)';
    });

    const githubText = document.createElement('span');
    githubText.textContent = 'PotsuDEV';
    githubText.style.fontSize = '16px';
    githubText.style.fontWeight = 'bold';
    githubLink.appendChild(githubIcon);
    githubLink.appendChild(githubText);

    const scriptRunningTime = document.createElement('div');
    scriptRunningTime.textContent = 'Tempo de funcionamento: 00:00:00';
    scriptRunningTime.style.marginBottom = '5px';

    setInterval(function() {
        let currentTime = new Date();
        let timeDifference = currentTime - scriptStartTime;
        let seconds = Math.floor((timeDifference / 1000) % 60);
        let minutes = Math.floor((timeDifference / 1000 / 60) % 60);
        let hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
        scriptRunningTime.textContent = `Tempo de funcionamento: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);

    const scriptStatus = document.createElement('div');
    scriptStatus.textContent = 'Script em funcionamento';
    scriptStatus.style.display = 'flex';
    scriptStatus.style.alignItems = 'center';

    const gearIcon = document.createElement('span');
    gearIcon.textContent = '⚙️';
    gearIcon.style.fontSize = '16px';
    gearIcon.style.animation = 'spin 2s linear infinite';
    gearIcon.style.marginLeft = '8px';

    scriptStatus.appendChild(gearIcon);

    banner.appendChild(githubLink);
    banner.appendChild(scriptRunningTime);
    banner.appendChild(scriptStatus);

    document.body.appendChild(banner);

    const telegramBanner = document.querySelector('a[href="https://t.me/+Mns6IsONSxliZDkx"]');
    if (telegramBanner) {
        telegramBanner.remove();
    }

    const styles = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
    `;
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

})();
