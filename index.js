//TODO Descobrir se o erro de não ser carregado a foto está aqui
const puppeteer = require('puppeteer');
const fs =  require('fs');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://instagram.com/rocketseat_oficial');

  const imgList = await page.evaluate(() => {
    //toda essa função será executado no browser

    //Pegando todas as imagens que estão na parte de posts
    const nodeList = document.querySelectorAll('article img')

    //Transformar o nodeList em array
    const imgArray = [...nodeList]

    //Transformar o nodeList (elementos html) em objetos JS
    const imgList = imgArray.map(img => ({
        src: img.src
    }))
    
    //Mandar pra fora da função a lista
    return imgList
  })

  // Escrever os dados em um arquivo local (json)
  fs.writeFile('instagram.json', JSON.stringify(imgList, null, 2), err =>{
    if(err) throw new Error('Algo deu errado')

    console.log('Deu certo')
  })

  //await browser.close();
})();

