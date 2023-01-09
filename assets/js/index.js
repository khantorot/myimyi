let mob = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? true : false;


window.onload = function () {
    setTimeout(showPage, 3000);



    function showPage() {
        const main = document.querySelector('main');
        const preloader = document.querySelector('.preloader');

        main.classList.add('show_main');
        preloader.classList.add('preloader_hide');
    }


    document.addEventListener('mousemove', parallax);

    function parallax(e) {
        if (mob == false) {
            this.querySelectorAll('.layer').forEach(layer => {
                let z = layer.getAttribute('data-id');
                let x = (window.innerWidth - e.pageX * 1 * z) / 20;
                let y = (window.innerHeight - e.pageY * 1 * z) / 10;
                layer.style.transform = `translate(${x}px, ${y}px`
            });
        }
    }



    gsap.registerPlugin(ScrollTrigger);

    const allSections = document.querySelectorAll('.follow_item');
    const container = document.querySelector(".follow_container");

    let container_w = 0;

    mob == true ? container_w = 100 : container_w = 40;
    container.style.width = allSections.length * container_w + 'vw';
    mob == true ? x = 2 : x = 2.46;

    gsap.to(allSections, {
        xPercent: -100 * (allSections.length - x),
        ease: "none",
        scrollTrigger: {
            trigger: ".follow_container",
            pin: true,
            start: "top top",
            scrub: 1,
            snap: false,
            end: () => "+=" + container.offsetWidth
        }
    });
}











const menu_btn = document.querySelector('.menu_btn');
const cart_btn = document.querySelector('.cart_btn');
const cart_box = document.querySelector('.cart');
const menu_box = document.querySelector('.menu');
const menu_list = document.querySelectorAll('.menu li a');
const close_btn = document.querySelector('.close_btn');
const form = document.querySelector('.form');
const show_modal_btn = document.querySelector('.show_modal_btn');

menu_btn.addEventListener('click', function () {
    this.classList.toggle('menu_btn_active');
    menu_box.classList.toggle('menu_show');
    cart_btn.classList.remove('cart_btn_active');
    cart_box.classList.remove('cart_show')
    form.classList.remove('form_show');
});

cart_btn.addEventListener('click', function () {
    this.classList.toggle('cart_btn_active');
    cart_box.classList.toggle('cart_show');
    menu_btn.classList.remove('menu_btn_active');
    menu_box.classList.remove('menu_show');
    form.classList.remove('form_show');
});

menu_list.forEach(element => {
    element.addEventListener('click', function () {
        menu_btn.classList.remove('menu_btn_active');
        menu_box.classList.remove('menu_show');

    })
});

close_btn.addEventListener('click', function () {
    form.classList.remove('form_show');
    cart_btn.classList.add('cart_btn_active');
    cart_box.classList.add('cart_show');
})

show_modal_btn.addEventListener('click', function () {
    form.classList.add('form_show');
    cart_btn.classList.remove('cart_btn_active');
    cart_box.classList.remove('cart_show');

})






let cart = {};

chekCart();
function chekCart() {
    if (sessionStorage.getItem('cart') != null) {
        cart = JSON.parse(sessionStorage.getItem('cart'));
    }
}


loadGoods();
loadCart();

function loadGoods() {
    let out = '';

    for (key in data) {
        if (!(data[key].status)) {
            out += '<div class="coffee_item">';
            out += '<img src="./content/images/' + data[key].image + '">';
            out += '<h4>' + data[key].name + '</h4>';
            out += '<span class="coffee_price">' + data[key].price + 'c</span>';
            out += '<span class="coffee_size">' + data[key].size + 'мл</span>';
            out += '<div class="add_btn" data-art="' + key + '"></div>'
            out += '</div>';
        }
    }
    document.querySelector('.coffee_items').innerHTML = out;
}

function loadCart() {
    cart_btn.innerHTML = countGoods();

    let out = '';

    if (Object.keys(cart).length == 0)
        out = 'Корзина пуста';
    for (key in cart) {
        out += '<div class="cart_item">';
        out += '<div class="minus_btn" data-art="' + key + '">-</div>';
        out += '<div class="quantity">' + cart[key] + '</div>';
        out += '<div class="cart_add_btn" data-art="' + key + '">+</div>';
        out += '<div class="del_btn" data-art="' + key + '">x</div>';
        out += '<div class="name">' + data[key].name + '</div>';
        out += '<div class="price">' + data[key].price + 'c</div>';
        out += '</div>';
    }

    out += '<div class="total">Всего <span>' + loadTotal() + 'с</span></div>';
    document.querySelector('.cart_items').innerHTML = out;
}


function loadTotal() {
    const sum_mass = [];
    let sum_value = 0;
    for (let key in cart)
        sum_mass.push(parseInt(data[key].price, 10) * cart[key]);

    if (sum_mass.length != 0)
        sum_value = sumOfMass(sum_mass);
    return sum_value;
}

function sumOfMass(mass) {
    let sum = 0;
    mass.forEach(i => {
        sum += i;
    });
    return sum;
}

document.querySelector('.shop').addEventListener('click', tuneCart);
document.querySelector('.cart').addEventListener('click', tuneCart);

function tuneCart(e) {
    if (e.target.classList.contains('add_btn') || e.target.classList.contains('minus_btn') || e.target.classList.contains('del_btn') || e.target.classList.contains('cart_add_btn')) {
        let ID = e.target.getAttribute('data-art');
        if (e.target.classList.contains('minus_btn')) {
            if (cart[ID] > 1)
                cart[ID]--;
            else
                delete cart[ID];
        }
        else if (e.target.classList.contains('add_btn') || e.target.classList.contains('cart_add_btn')) {
            if (cart[ID] != undefined)
                cart[ID]++;
            else
                cart[ID] = 1;
            addFlyEff();
        }
        else if (e.target.classList.contains('del_btn')) {
            delete cart[ID];
        }

        sessionStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
    }
};



function countGoods() {
    var arr = [];
    var sum;
    for (var key in cart) {
        arr.push(cart[key]);

        arraySum(arr);
        function arraySum(array) {
            sum = 0;
            for (var i = 0; i < array.length; i++) {
                sum += array[i];
            }
        }
    }
    if (sum == undefined) {
        sum = 0;
    }
    return sum;
}










const cursor = document.querySelector('.add_fly');

(function () {

    const editCursor = e => {
        const { clientX: x, clientY: y } = e;
        cursor.style.left = x + 'px';
        cursor.style.top = y + 'px';
    };
    window.addEventListener('mousemove', editCursor);
})();



function addFlyEff() {
    cursor.classList.add('add_fly_anim');
    setTimeout(function () { cursor.classList.remove('add_fly_anim') }, 500);
}




// menu link
let linkNav = document.querySelectorAll('[href^="#"]'),
    V = 0.6;
for (var i = 0; i < linkNav.length; i++) {
    linkNav[i].addEventListener('click', function (e) {
        e.preventDefault();
        let w = window.pageYOffset,
            hash = this.href.replace(/[^#]*(.*)/, '$1');
        t = document.querySelector(hash).getBoundingClientRect().top,
            start = null;
        requestAnimationFrame(step);

        function step(time) {
            if (start === null) start = time;
            let progress = time - start,
                r = (t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t));
            window.scrollTo(0, r);
            if (r != w + t) {
                requestAnimationFrame(step)
            } else {
                location.hash = hash
            }
        }
    }, false);
}








ScrollOut({
    targets: ".coffee_cup, .about_img",
    once: 'true'
});












const tween = gsap.timeline();
tween.to(".coffee_plane", {
    duration: 1,
    ease: "power1.inOut",
    motionPath: {
        path: [{ x: window.innerWidth / 10, y: 100 },
        { x: window.innerWidth / 9, y: -90 },
        { x: window.innerWidth / 8, y: 80 },
        { x: window.innerWidth / 7, y: -70 },
        { x: window.innerWidth / 6, y: 60 },
        { x: window.innerWidth / 5, y: -50 },
        { x: window.innerWidth / 4, y: 400 },
        { x: window.innerWidth / 3, y: -300 },
        { x: window.innerWidth / 2, y: 200 },
        { x: window.innerWidth / 1, y: -100 }],
        curviness: 1.25,
        autoRotate: true
    }
});


const controller = new ScrollMagic.Controller();

const scene1 = new ScrollMagic.Scene({
    triggerElement: '.slogan_fun',
    duration: 5000,
    triggerHook: 0
})
    .setTween(tween)
    .setPin('.slogan_fun')
    .addTo(controller);



gsap.to('.cursor_text', {
    x: document.documentElement.clientWidth / 2,
    y: 250,
})

if (mob == false) {
    document.querySelector('.slogan_fun').addEventListener('mousemove', e => {
        gsap.to('.cursor_text', {
            x: e.clientX,
            y: e.clientY,
            stagger: -0.02
        })
    })
}






const header_text_link = document.querySelector('.header_text a');
const header_bg_cup = document.querySelector('.header_bg_cup');
const logo = document.querySelector('.logo');

header_text_link.addEventListener('mouseover', showCup);
header_text_link.addEventListener('mouseleave', hideCup);
logo.addEventListener('mouseover', showCup);
logo.addEventListener('mouseleave', hideCup);
cart_btn.addEventListener('mouseover', showCup);
cart_btn.addEventListener('mouseleave', hideCup);

function showCup() {
    header_bg_cup.classList.add('header_bg_cup_hover_eff');
}

function hideCup() {
    header_bg_cup.classList.remove('header_bg_cup_hover_eff');
}






document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("form").addEventListener("click", e => {
        let checkboxCL = e.target.classList,
            pState = "pristine";

        if (checkboxCL.contains(pState))
            checkboxCL.remove(pState);
    });
});




document.querySelector('footer').addEventListener('mousemove', eyeball);

function eyeball(event) {
    const eye = document.querySelectorAll('.eye');

    eye.forEach(function (eye) {
        let x = (eye.getBoundingClientRect().left) + (eye.clientWidth / 2);
        let y = (eye.getBoundingClientRect().top) + (eye.clientHeight / 2);
        let radian = Math.atan2(event.clientX - x, event.clientY - y);
        let rot = (radian * (180 / Math.PI) * -1) + 270;
        eye.style.transform = 'rotate(' + rot + 'deg)';
    })
}













const SETTINGS = {
    length: {
        value: 150,
        min: 50,
        max: 1000,
    },
    segmentLength: {
        value: 5,
        min: 1,
        max: 50,
    },
    strokeWidth: {
        value: 2,
        min: 1,
        max: 10,
    },
    color: "#e4c019",
    rainbow: false,
};

let cursor_line;

function setup() {
    let canvas = createCanvas(innerWidth, innerHeight);
    canvas.parent("canvas-container");
    reset();
}

function reset() {
    if (SETTINGS.rainbow) colorMode(HSB);
    cursor_line = new Cursor({
        length: SETTINGS.length.value,
        segmentLength: SETTINGS.segmentLength.value,
        color: SETTINGS.rainbow ? "rainbow" : SETTINGS.color,
    });
}

function draw() {
    background('#1b1b1b');
    cursor_line.draw();
}

function windowResized() {
    resizeCanvas(innerWidth, innerHeight);
    reset();
}

// cursor class

class Cursor {
    constructor(options = {}) {
        this.length = options.length || 100;
        this.color = options.color || color(255);
        this.segmentLength = options.segmentLength || 5;
        this.x = new Array(floor(this.length / this.segmentLength)).fill(0);
        this.y = new Array(floor(this.length / this.segmentLength)).fill(0);
        this.rainbowColors = ["#00f", "#70a", "#f00", "#f70", "#ff0", "#0f0"];
    }

    draw() {
        if (this.color !== "rainbow") stroke(this.color);
        strokeWeight(SETTINGS.strokeWidth.value);
        this.dragSegment(0, mouseX, mouseY);
        for (let i = 0; i < this.x.length - 1; i++) {
            if (this.color === "rainbow") stroke(this.rainbowColors[i % this.rainbowColors.length]);
            this.dragSegment(i + 1, this.x[i], this.y[i]);
        }
    }

    dragSegment(i, xin, yin) {
        let dx = xin - this.x[i];
        let dy = yin - this.y[i];
        let angle = atan2(dy, dx);
        this.x[i] = xin - cos(angle) * this.segmentLength;
        this.y[i] = yin - sin(angle) * this.segmentLength;
        this.segment(this.x[i], this.y[i], angle);
    }

    segment(x, y, a) {
        push();
        translate(x, y);
        rotate(a);
        line(0, 0, this.segmentLength, 0);
        pop();
    }
}