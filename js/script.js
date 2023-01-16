$(document).ready(function () {
  let loadingFlag = true;
  $(".loader-wrap").fadeOut(2000, function () {
    // 로딩효과
    setTimeout(() => {
      loadingFlag = false;
    }, 1000);
  });

  // 메뉴관련
  // let abc = $(".gnb");
  // let ssi = $(".bar>li>i");
  // // console.log(ssi);
  // // console.log(abc);

  // ssi.click(function () {
  //   abc.toggleClass("active");
  //   if (ssi.hasClass("fa-bars")) {
  //     ssi.removeClass("fa-bars");
  //     ssi.addClass("fa-times");
  //   } else {
  //     ssi.removeClass("fa-times");
  //     ssi.addClass("fa-bars");
  //   }
  // });
  // 인트로 텍스트 애니메이션
  // 회전 텍스트 애니메이션
  let time = 0;
  let mouseX = window.innerWidth * 1.0;
  let x = 0;
  const opt = {
    radius: 125,
    radiusY: 0.15,

    maxSpeed: 0.015,
    maxRotation: 10,
    minOpacity: 0.3,
    spacer: "",
  };

  const scale = (a, b, c, d, e) => {
    return ((a - b) * (e - d)) / (c - b) + d;
  };
  const lerp = (v0, v1, t) => {
    return v0 * (1 - t) + v1 * t;
  };
  let letter;
  const createInvaders = () => {
    const word = document.querySelector(".word");
    const Letters = word.innerHTML
      .replace(/\s/g, opt.spacer)
      .split("")
      .reverse();
    word.innerHTML = "";
    Letters.forEach((i) => {
      const l = document.createElement("span");
      l.innerHTML = i;
      word.appendChild(l);
    });
    letter = document.querySelectorAll(".word span");
  };
  createInvaders();
  const animate = () => {
    if (!letter) return;
    // x = lerp(x, mouseX / window.innerWidth, 0.1);
    x = lerp(x, mouseX / window.innerWidth, 0.1);
    const rotation = -opt.maxRotation + x * opt.maxRotation * 2;
    const speed = -opt.maxSpeed + x * opt.maxSpeed * 2;
    const modY = 1 + x * -2;

    time -= speed;

    letter.forEach((i, ind) => {
      const theta = 1 - ind / letter.length;
      const x = opt.radius * Math.sin(time + theta * Math.PI * 2);
      const y =
        opt.radius * opt.radiusY * Math.cos(modY + time + theta * Math.PI * 2);
      const s = scale(
        y,
        -opt.radius * opt.radiusY,
        opt.radius * opt.radiusY,
        opt.minOpacity,
        1
      );

      Object.assign(i.style, {
        zIndex: Math.min(2, Math.max(-2, Math.ceil(y))),
        filter: `blur(${4 - 5 * s}px)`,
        opacity: s,
        transform: `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg)`,
      });
    });
    requestAnimationFrame(animate);
  };
  animate();

  const handleMouse = (e) => {
    // mouseX = e.clientX || e.touches[0].clientX;
    // mouseX = e.clientX;
  };

  //  design 관련
  lightbox.option({
    positionFromTop: 150,
  });

  // publishing 관련
  var swiper_publishing = new Swiper(".sw-publishing", {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  let publishingSlide = $(".publishing-slide");
  publishingSlide.mouseenter(function () {
    swiper_publishing.autoplay.stop();
  });
  publishingSlide.mouseleave(function () {
    swiper_publishing.autoplay.start();
  });

  // 마우스 휠 관련

  let wrap = $(".wrap");
  let section = $("section");
  let winW = window.innerWidth;
  let winH = window.innerHeight;
  // 디자인 영역관련
  let designWrap = $(".design-wrap");
  let designScene = $(".design-scene");

  let desingSceneTotal = designScene.length;
  let desingSceneIndex = 0;
  let designScenePos = [];

  // 총 Section 개수
  let sectionTotal = section.length;
  // 현재 보이고 있는 화면의 순서
  let sectionIndex = 0;
  let sectionPos = [];
  function resetSection() {
    winW = window.innerWidth;
    winH = window.innerHeight;
    // section 관련 위치 처리 저장
    for (let i = 0; i < sectionTotal; i++) {
      sectionPos[i] = winH * i;
    }
    $.each(section, function (index, item) {
      $(this).css("top", sectionPos[index]);
    });

    // designScen 관련 위치처리 저장
    for (let i = 0; i < desingSceneTotal; i++) {
      designScenePos[i] = winW * i;
    }
    $.each(designScene, function (index, item) {
      $(this).css("left", designScenePos[index]);
    });
  }

  $(window).resize(function () {
    resetSection();
    sectionIndex = 0;
    desingSceneIndex = 0;
    designWrap.css("left", 0);
    moveSection();
  });

  function moveSection() {
    let scY = sectionPos[sectionIndex];
    // gsap 로 변경
    gsap.to(wrap, sectionSpeed / 1000, {
      left: 0,
      top: -scY,
      onComplete: function () {
        // 모션 완료시 실행(스크롤 끝났다.)
        scrollIng = false;
      },
    });
  }

  function moveDesignScene() {
    let scX = designScenePos[desingSceneIndex];
    // gsap 로 변경
    gsap.to(designWrap, sectionSpeed / 1000, {
      left: -scX,
      top: 0,
      onComplete: function () {
        // 모션 완료시 실행(스크롤 끝났다.)
        scrollIng = false;
      },
    });
  }
  // 휠 적용시 화면 이동속도
  let sectionSpeed = 500;
  // 휠을 적용할지 말지 결정한다(휠 이벤트는 너무 많이 발생)
  let scrollIng = false;
  // 휠 기능 자체를 막거나 풀어줌.
  let wheelDefense = true;
  // 마우스 휠의 이벤트 처리
  $(window).bind("mousewheel DOMMouseScroll", function (event) {
    let distance = event.originalEvent.wheelDelta;
    if (distance == null) {
      distance = event.originalEvent.detail * -1;
    }
    if (loadingFlag == true) {
      return;
    }
    if (scrollIng == true) {
      return;
    }

    scrollIng = true;
    if (sectionIndex == 2) {
      if (distance < 0) {
        // 다음 장면
        desingSceneIndex = desingSceneIndex + 1;
        if (desingSceneIndex > desingSceneTotal - 1) {
          desingSceneIndex = desingSceneTotal - 1;
          sectionIndex = 3;
          moveSection();
        }
      } else if (distance > 0) {
        // 이전장면
        desingSceneIndex = desingSceneIndex - 1;
        if (desingSceneIndex < 0) {
          desingSceneIndex = 0;
          sectionIndex = 1;
          moveSection();
        }
      }
      moveDesignScene();
    } else if (sectionIndex == 3) {
      if (distance < 0) {
        // 다음 장면
        sectionIndex = sectionIndex + 1;
        if (sectionIndex >= sectionTotal - 1) {
          sectionIndex = sectionTotal - 1;
        }
      } else if (distance > 0) {
        // 이전장면
        sectionIndex = sectionIndex - 1;
        if (sectionIndex <= 0) {
          sectionIndex = 0;
        }
      }
      moveSection();

      desingSceneIndex = desingSceneTotal - 1;
      let scX = designScenePos[desingSceneIndex];
      // gsap 로 변경
      gsap.to(designWrap, 0, {
        left: -scX,
        top: 0,
        onComplete: function () {
          // 모션 완료시 실행(스크롤 끝났다.)
          scrollIng = false;
        },
      });
    } else {
      if (distance < 0) {
        // 다음 장면
        sectionIndex = sectionIndex + 1;
        if (sectionIndex >= sectionTotal - 1) {
          sectionIndex = sectionTotal - 1;
        }
      } else if (distance > 0) {
        // 이전장면
        sectionIndex = sectionIndex - 1;
        if (sectionIndex <= 0) {
          sectionIndex = 0;
        }
      }
      moveSection();
    }
  });

  // 최초실행

  resetSection();
  moveSection();

  // 메뉴 클릭시 이동하는 처리
  let gnbA = $(".gnb a");
  $.each(gnbA, function (index, item) {
    $(this).click(function (e) {
      // GitHub 로 가는 경우는 제외하고
      if (index != 6) {
        e.preventDefault();
      }

      desingSceneIndex = 0;
      designWrap.css("left", 0);

      let winH = window.innerHeight;
      if (index == 0) {
        // 홈으로 가기
        sectionIndex = 0;

        // gsap 로 변경
        gsap.to(wrap, sectionSpeed / 1000, {
          left: 0,
          top: 0,
          onComplete: function () {
            scrollIng = false;
          },
        });
      } else if (index == 1) {
        // 프로필로 가기
        sectionIndex = 1;

        // gsap 로 변경
        gsap.to(wrap, sectionSpeed / 1000, {
          left: 0,
          top: winH * -1,
          onComplete: function () {
            scrollIng = false;
          },
        });
      } else if (index == 2) {
        // 포트폴리오 가기
        sectionIndex = 2;

        // gsap 로 변경
        gsap.to(wrap, sectionSpeed / 1000, {
          left: 0,
          top: winH * -2,
          onComplete: function () {
            scrollIng = false;
          },
        });
      } else if (index == 3) {
        // 퍼블리싱 가기
        sectionIndex = 3;

        // gsap 로 변경
        gsap.to(wrap, sectionSpeed / 1000, {
          left: 0,
          top: winH * -3,
          onComplete: function () {
            scrollIng = false;
          },
        });
      } else if (index == 4) {
        // 라이프 가기
        sectionIndex = 4;

        // gsap 로 변경
        gsap.to(wrap, sectionSpeed / 1000, {
          left: 0,
          top: winH * -4,
          onComplete: function () {
            scrollIng = false;
          },
        });
      } else if (index === 5) {
        // 라이프 가기
        sectionIndex = 5;

        // gsap 로 변경
        gsap.to(wrap, sectionSpeed / 1000, {
          left: 0,
          top: winH * -5,
          onComplete: function () {
            scrollIng = false;
          },
        });
      }
    });
  });
  $("html").stop().animate({
    scrollTop: 0,
  });
});

window.onload = function () {};
