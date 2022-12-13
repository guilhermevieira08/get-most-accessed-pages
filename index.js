const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    
    await page.goto('https://www.google.com.br/');

    await page.screenshot({path: 'screen2.png'})

    
    await page.type('.gLFyf', 'naruto')
    await page.keyboard.press('Enter');


    const selector = '.MjjYud .Ww4FFb .kvH3mc .jGGQ5e a h3'
    await page.waitForSelector(selector);

    const names = await page.evaluate(_ => {
        const links = document.querySelectorAll('.MjjYud .Ww4FFb .kvH3mc .jGGQ5e a h3')

        const listName = [];
        links.forEach(res => {
            let link = res.parentElement.href;
            let name = res.innerText;
            listName.push({title: name, link: link});
        })

        return listName
    });

    fs.writeFile('datas.json', JSON.stringify(names, null, 2), err => {
        if(err) console.log(err)
        console.log('monstro!!')
    });
    
})()