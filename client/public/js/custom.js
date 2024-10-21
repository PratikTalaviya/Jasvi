// setTimeout(() => {
//     const mobile_nav = document.querySelector(".mobile-navbar-btn");
//     const close_nav = document.querySelector(".close-navbar-btn");
//     const nav_header = document.querySelector(".navbar");
    
//     const toggleNavbar = () => {
//       nav_header.classList.toggle("active");
//     };
//     mobile_nav.addEventListener("click",()=> toggleNavbar());
//     close_nav.addEventListener("click", ()=> toggleNavbar());
//   },1000)

  const closeBtn = document.querySelector('.closeBtn');
    const navbar = document.querySelector('.navbar');
    const resNav = document.querySelector('.resNav');
    const overlay = document.querySelector('.overlay');

    navbar.addEventListener('click', () =>{
        resNav.classList.toggle('navActive');
        overlay.classList.toggle('overlayActive');
    })
    closeBtn.addEventListener('click', () => {
        resNav.classList.toggle('navActive');
        overlay.classList.toggle('overlayActive');
    })
    overlay.addEventListener('click', () => {
        resNav.classList.toggle('navActive');
        overlay.classList.toggle('overlayActive');
    })

//=============== scroll start ===============//
$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('#scroll').fadeIn();
        } else {
            $('#scroll').fadeOut();
        }
    });
    $('#scroll').click(function () {
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });
});
//=============== scroll start ===============//

//=============== Header Sticky Start ===============//

$(window).scroll(function () {
    if ($(window).scrollTop() >= 300) {
        $('head-sti').addClass('sticky');        
    }
    else {
        $('head-sti').removeClass('sticky');
    }
});

//=============== Header Sticky End ===============//

const myTimeout = setTimeout(
    $('#slider').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    }),

    $('#category').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 2
            }
        }
    }),

    $('#product').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            400: {
                items: 2
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        }
    }),

    $('#blog').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        dots: false,
        responsive: {
            0: {
                items: 1
            },           
            600: {
                items: 3
            },
            1000: {
                items: 3
            }
        }
    }),

    $('#testi').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            991: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    }),

    $('#gallery').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        dots: false,
        responsive: {
            0: {
                items: 4
            },
            1200: {
                items: 5
            },
        }
    }),
    
    function myStopFunction() {
        clearTimeout(myTimeout);
    }
    , 500);
 
  

$(document).ready(function () {

    $('.card').click(function () {

        $imgsrc = $(this).find('.img-src').attr('src');
        $("#imagechange").attr("src", $imgsrc).fadeIn(1000);

    });

});

/*============================================= Category Page Start =============================================*/
$('.drop-menu').click(function () {
    $(this).attr('tabindex', 1).focus();
    $(this).toggleClass('active');
    $(this).find('.filterbox').slideToggle(300);
});
$('.drop-menu').focusout(function () {
    $(this).removeClass('active');
    $(this).find('.dropdown-menu').slideUp(300);
});
$('.drop-menu .filterbox li').click(function () {

    $(this).parents('.drop-menu').find('span').text($(this).text());
    $(this).parents('.drop-menu').find('input').attr('value', $(this).attr('id'));
});
/*============================================= Category Page End =============================================*/
/*============================================= Refund Page Start =============================================*/
$(function () {
    var list = $('.js-dropdown-list');
    var link = $('.js-link');
    link.click(function (e) {
        e.preventDefault();
        list.slideToggle(200);
    });
    list.find('li').click(function () {
        var text = $(this).html();
        var icon = '<i class="fa-solid fa-caret-down"></i>';
        link.html(text + icon);
        list.slideToggle(200);
        if (text === '* Reset') {
            link.html('Select one option' + icon);
        }
    });
});
/*============================================= Refund Page End =============================================*/



// ===========================================   OTP   =====================================================
// var otp_inputs = document.querySelectorAll(".otp__digit")
// var mykey = "0123456789".split("")
// otp_inputs.forEach((_)=>{
//   _.addEventListener("keyup", handle_next_input)
// })
// function handle_next_input(event){
//   let current = event.target
//   let index = parseInt(current.classList[1].split("__")[2])
//   current.value = event.key
  
//   if(event.keyCode == 8 && index > 1){
//     current.previousElementSibling.focus()
//   }
//   if(index < 6 && mykey.indexOf(""+event.key+"") != -1){
//     var next = current.nextElementSibling;
//     next.focus()
//   }
//   var _finalKey = ""
//   for(let {value} of otp_inputs){
//       _finalKey += value
//   }
//   if(_finalKey.length == 6){
//     document.querySelector("#_otp").classList.replace("_notok", "_ok")
//     document.querySelector("#_otp").innerText = _finalKey
//   }else{
//     document.querySelector("#_otp").classList.replace("_ok", "_notok")
//     document.querySelector("#_otp").innerText = _finalKey
//   }
// }