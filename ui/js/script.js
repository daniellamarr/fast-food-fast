const winScroll = () => {
    window.onscroll = () => {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            document.getElementById("home-header").className = "hbg";
        } else {
            document.getElementById("home-header").className = "";
        }
    }
}

document.getElementById('toggle').onclick = () => document.getElementById('dropdown').classList.toggle('hide');


const shop = document.getElementsByClassName('shoppingcart-b');
for (let i = 0; i < shop.length; i++) {
    const shopx = shop[i];
    shopx.onclick = () =>
    {
        document.getElementById('shoppingcart').classList.toggle('hide');
    }
}
