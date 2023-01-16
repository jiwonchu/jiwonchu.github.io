window.onload = function() {
    // 비주얼 텍스트 출력 효과

    // 비주얼
    const text1 = "2022  ";
    const text2 = "Portfolio  ";
    const text1_space = document.querySelector(".v-txt-1");
    const text2_space = document.querySelector(".v-txt-2");

    let i = 0;
    let j = 0;
    let upper_timer;
    let lower_timer;
    let totalUpper = "";
    let totalLower = "";
    let delay;

    function typingUpper() {
        let upper = text1[i++];
        totalUpper += upper;
        text1_space.innerHTML = totalUpper + '<span class="blink"></span>';

        if (i > text1.length - 1) {
            clearInterval(upper_timer);
            text1_space.innerHTML = totalUpper;
            lower_timer = setInterval(typingLower, 350);
        }
    }

    upper_timer = setInterval(typingUpper, 350);

    function typingLower() {
        let lower = text2[j++];
        totalLower += lower;
        text2_space.innerHTML = totalLower + '<span class="blink"></span>';

        if (j > text2.length - 1) {
            text1_space.innerHTML = "";
            text2_space.innerHTML = "";
            i = 0;
            j = 0;
            totalLower = "";
            totalUpper = "";
            clearInterval(lower_timer);
            upper_timer = setInterval(typingUpper, 350);
        }
    }


    var swiper = new Swiper('.sw-life', {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        // navigaiton: {
        //     nextEl: '.swiper-buttion-next',
        //     nextEl: '.swiper-buttio-prev',
        // },
    });

    // var_showPage = function() {
    //     var loader = $("div.loader");
    //     var header = $("div.header");
    //     loader.css("display", "none");
    //     header.css("display", "block");
    // }
};