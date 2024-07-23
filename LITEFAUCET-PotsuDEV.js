// ==UserScript==
// @name         Lite Faucet
// @namespace    http://tampermonkey.net/
// @version      2.8
// @author       PotsuDEV
// @match        https://litefaucet.in/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=litefaucet.in
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const startTimeKey = 'scriptStartTime';

    function getStartTime() {
        let storedTime = localStorage.getItem(startTimeKey);
        return storedTime ? new Date(parseInt(storedTime)) : new Date();
    }

    function setStartTime(date) {
        localStorage.setItem(startTimeKey, date.getTime());
    }

    function clickRandomClaimButton() {
        const claimButtons = Array.from(document.querySelectorAll('a.btn.btn-primary.waves-effect.waves-light'));
        
        if (claimButtons.length > 0) {
            const randomIndex = Math.floor(Math.random() * claimButtons.length);
            const buttonToClick = claimButtons[randomIndex];
            
            console.log(`Selected Claim button number ${randomIndex + 1} to click.`);
            
            setTimeout(() => {
                buttonToClick.click();
                console.log(`Clicking Claim button number ${randomIndex + 1}.`);
            }, 6000);
        } else {
            console.warn('No "Claim" button found.');
        }
    }

    function handleAutologinAndAutoshorts() {
        const loginEmail = 'email-here@gmail.com';
        const loginPassword = 'password-here';

        const emailField = document.querySelector('input[type="email"]');
        const passwordField = document.querySelector('input[type="password"]');
        const loginButton = document.querySelector('button.login-btn');

        if (emailField && passwordField && loginButton) {
            emailField.value = loginEmail;
            passwordField.value = loginPassword;
            loginButton.click();
        } else {
            console.warn('Email and/or password fields not found');
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

    function createBanner() {
        const banner = document.createElement('div');
        banner.style.position = 'fixed';
        banner.style.bottom = '20px';
        banner.style.left = '20px';
        banner.style.padding = '10px';
        banner.style.background = 'linear-gradient(135deg, #3498db, #2ecc71)';
        banner.style.backgroundSize = '200% 200%';
        banner.style.color = '#ecf0f1';
        banner.style.borderRadius = '8px';
        banner.style.zIndex = '9999';
        banner.style.display = 'flex';
        banner.style.flexDirection = 'column';
        banner.style.alignItems = 'center';
        banner.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.4)';
        banner.style.fontFamily = "'Roboto', sans-serif";
        banner.style.animation = 'gradientBG 6s ease infinite';
        banner.style.width = '250px';
        banner.style.textAlign = 'center';

        const githubLink = document.createElement('a');
        githubLink.href = 'https://github.com/potisu';
        githubLink.target = '_blank';
        githubLink.style.textDecoration = 'none';
        githubLink.style.color = '#ecf0f1';
        githubLink.style.display = 'flex';
        githubLink.style.alignItems = 'center';
        githubLink.style.backgroundColor = '#2980b9';
        githubLink.style.padding = '5px';
        githubLink.style.borderRadius = '8px';
        githubLink.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
        githubLink.style.transition = 'background-color 0.3s, transform 0.3s';
        githubLink.style.marginBottom = '10px';

        githubLink.addEventListener('mouseover', () => {
            githubLink.style.backgroundColor = '#1f65a1';
            githubLink.style.transform = 'scale(1.05)';
        });
        githubLink.addEventListener('mouseout', () => {
            githubLink.style.backgroundColor = '#2980b9';
            githubLink.style.transform = 'scale(1)';
        });

        const githubIcon = document.createElement('img');
        githubIcon.src = 'https://cdn-icons-png.flaticon.com/512/25/25657.png';
        githubIcon.style.width = '24px';
        githubIcon.style.height = '24px';
        githubIcon.style.marginRight = '8px';
        githubIcon.style.backgroundColor = 'transparent';

        const githubText = document.createElement('span');
        githubText.textContent = 'PotsuDEV';
        githubText.style.fontSize = '16px';
        githubText.style.fontWeight = 'bold';
        githubText.style.background = 'linear-gradient(135deg, #3498db, #2ecc71)';
        githubText.style.webkitBackgroundClip = 'text';
        githubText.style.webkitTextFillColor = 'transparent';
        githubText.style.padding = '0 5px';

        githubLink.appendChild(githubIcon);
        githubLink.appendChild(githubText);

        const timerDisplay = document.createElement('div');
        timerDisplay.textContent = '00min and 00 sec';
        timerDisplay.style.fontSize = '36px';
        timerDisplay.style.fontWeight = 'bold';
        timerDisplay.style.color = '#ecf0f1';
        timerDisplay.style.marginBottom = '8px';
        timerDisplay.style.textShadow = '0 0 10px rgba(0, 0, 0, 0.7)';

        const scriptStatus = document.createElement('div');
        scriptStatus.textContent = 'Script running';
        scriptStatus.style.fontSize = '12px';
        scriptStatus.style.color = '#ecf0f1';
        scriptStatus.style.display = 'flex';
        scriptStatus.style.alignItems = 'center';
        scriptStatus.style.marginTop = '4px';

        const gearIcon = document.createElement('span');
        gearIcon.textContent = '⚙️';
        gearIcon.style.fontSize = '16px';
        gearIcon.style.animation = 'spin 2s linear infinite';
        gearIcon.style.marginLeft = '5px';
        gearIcon.style.color = '#ecf0f1';
        gearIcon.style.textShadow = '0 0 6px rgba(255, 255, 255, 0.8)';

        scriptStatus.appendChild(gearIcon);

        banner.appendChild(githubLink);
        banner.appendChild(timerDisplay);
        banner.appendChild(scriptStatus);

        document.body.appendChild(banner);

        return timerDisplay;
    }

    function removeTelegramBanner() {
        const telegramBanner = document.querySelector('a[href="https://t.me/+Mns6IsONSxliZDkx"]');
        if (telegramBanner) {
            telegramBanner.remove();
        }
    }

    const styles = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        @keyframes gradientBG {
            0% { background-position: 0% 0%; }
            50% { background-position: 100% 100%; }
            100% { background-position: 0% 0%; }
        }
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
    `;
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    function updateTimer(timerDisplay) {
        setInterval(function() {
            let currentTime = new Date();
            let timeDifference = currentTime - getStartTime();
            let seconds = Math.floor((timeDifference / 1000) % 60);
            let minutes = Math.floor((timeDifference / 1000 / 60) % 60);
            let hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
            let timeText = `${minutes}min and ${seconds} sec`;
            if (hours > 0) {
                timeText = `${hours}h ${minutes}min and ${seconds} sec`;
            }
            timerDisplay.textContent = timeText;
        }, 1000);
    }

    function initScript() {
        setStartTime(getStartTime());
        handleAutologinAndAutoshorts();
        const timerDisplay = createBanner();
        removeTelegramBanner();
        clickRandomClaimButton();
        updateTimer(timerDisplay);

        setInterval(() => {
            console.log('Refreshing the page...');
            window.location.reload();
        }, 5 * 60 * 1000);
    }

    window.addEventListener('load', initScript);

})();
