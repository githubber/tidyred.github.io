// jQuery
$(function() {

    // IE check
    $("#IEcheck").checkIE("is--visible");

    // anchor 기본이벤트 무효화
    $("a").click(function(event) {
        var href = $(this).attr("href");
        if (href === "#" || href === "#none" || href === "") event.preventDefault();
    });

    // 마우스커서
    $(document).mousemove(function(event) {
        var x = event.clientX
          , y = event.clientY
          , w = $(".cursor").css("will-change");
        
        setTimeout(function() {
            $(".cursor.type1").css({
                "top": y - 10,
                "left": x + 10
            });
        }, 100);
        setTimeout(function() {
            $(".cursor.type2").css({
                "top": y + 10,
                "left": x + 10
            });
        }, 200);
        if ((w !== "top") || (w !== "left")) {
            $(".cursor").css("will-change", "top, left");
        }
    });

    // 맨 위로 이동 버튼
    $(".move-to-top").on("click", function() {
        $("html, body").stop().animate({
            scrollTop: 0
        },500);
    });

    // 요소 드래그
    dragElem(".nav--fixed, .open-nav");

    // 고정 네비게이션 item에 drag 이벤트 전파 방지
    $(".nav__item").on("mousedown", function(event) {
        event.stopPropagation();
    });

    // 이미지 정렬
    alignImg(".post__thumb");

    // 포스트 목록 타이틀에 마우스오버/포커스 시 효과
    $(".archive__item-title a").on("mouseover focusin", function() {
        $(this).parents(".archive__item").addClass("is--active");
    }).on("mouseout focusout", function() {
        $(this).parents(".archive__item").removeClass("is--active");
    });

    // inline 요소 여백 제거
    removeWhiteSpace(".archive__item, .pagination ul");

    // 말줄임표 체크
    $(".archive__item-title a").checkEllipsis();
    $(".side-menu .menu__layer li a").checkEllipsis();

});

$(function() {

    // 고정 네비게이션
    var nav = $(".nav--fixed")
      , navObjClose = nav.find(".close-nav")
      , navObjTabble = nav.find("button, input:not([type='hidden']), select, textarea, [href], [tabindex]:not([tabindex='-1'])")
      , navObjTabbleFirst = navObjTabble.first()
      , navCloseFlag = false;

    function navOpen() {
        nav.css("display", "flex");
        setTimeout(function() {
            nav.css("transform", "scale(1)");
        });
    }
    navOpen();

    navObjClose.on("click", function() {
        nav.css("transform", "scale(0)");
        setTimeout(function() {
            nav.css("display", "none");
        }, 600);
        navCloseFlag = true;

        if (navCloseFlag === true) {
            nav.after("<button type='button' class='open-nav' title='네비게이션 열기'><span aria-hidden='true'>+</span></button>");
            nav.next("button").focus().on("click", function() {
                $(this).remove();
                navOpen();
                navObjTabbleFirst.focus();
                navCloseFlag = false;
            });
        }
    });

});

$(function() {

    // 메인 메뉴
    var nav = $(".site-nav")
      , menu = $(".side-menu")
      , menuOuterObj = $(".skip-links, #IEcheck, .masthead, .initial-content, .search-content, .page__footer")
      , menuObjLayer = menu.find(".menu__layer")
      , menuObjOpen = nav.find(".menu__toggle")
      , menuObjClose = menu.find(".close-nav")
      , menuObjTabble = menu.find("button, input:not([type='hidden']), select, textarea, [href], [tabindex]:not([tabindex='-1'])")
      , menuObjTabbleFirst = menuObjTabble.first()
      , menuObjTabbleLast = menuObjTabble.last()
      , menuObjFocusedLast, nowScrollPos;

    menuObjOpen.on("click", function() {
        // $("body")
        //     .css("top", - $(window).scrollTop() + "px")
        //     .addClass("scroll-off")
        //     .on("scroll touchmove mousewheel", function(event){
        //         event.preventDefault();
        // });
        // nowScrollPos = $("body").css("top").replace("px", "");
        $("body").addClass("is--hidden");
        menuOuterObj.attr("aria-hidden", "true");

        menu.addClass("is--visible");
        setTimeout(function() {
            menuObjLayer.stop().animate({"right": "0"}, 400);
        });
        
        menuObjTabble.on("focusin", function() {
            menuObjFocusedLast = $(this);
        });

        if (menuObjFocusedLast === undefined) {
            menuObjTabbleFirst.focus().on("keydown", function(event) {
                var key = event.keyCode || event.which;

                if (event.shiftKey && key === 9) { // Shift + Tab키 : 초점이동 가능한 첫번째 요소에서 마지막 요소로 초점 이동
                    event.preventDefault();
                    menuObjTabbleLast.focus();
                }
            });

            menuObjTabbleLast.on("keydown", function(event) {
                var key = event.keyCode || event.which;
                
                if (!event.shiftKey && key === 9) { // Tab키 : 초점이동 가능한 마지막 요소에서 첫번째 요소로 초점 이동
                    event.preventDefault();
                    menuObjTabbleFirst.focus();
                }
            });
        } else {
            menuObjFocusedLast.focus();
        }
    });

    function menuClose() {
        // $("body")
        //     .removeClass("scroll-off")
        //     .css("top", "")
        //     .off("scroll touchmove mousewheel");
        // if (!$("body").hasClass("scroll-off")) {
        //     $(window).scrollTop(nowScrollPos);
        // }
        $("body").removeClass("is--hidden");
        menuOuterObj.removeAttr("aria-hidden");
        menuObjLayer.stop().animate({"right": "-100%"}, 400);
        setTimeout(function() {
            menu.removeClass("is--visible");
            menuObjLayer.removeAttr("style");
        }, 400);
        menuObjOpen.focus();
    }

    menuObjClose.on("click", menuClose);
    menu.on("click", function(event) {
        if (event.target !== event.currentTarget) return; {
            menuClose();
        }
    });
    
    $(document).keydown(function(event) {
        var key = event.keyCode || event.which;
        if (key === 27) { // Esc 키 : 메뉴 닫기
            menu.hasClass("is--visible") && menuClose();
        }
    });

});