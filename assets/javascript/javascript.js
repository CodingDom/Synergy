function setPage(page) {
    for (let i = 0; i < $("nav a").length; i++) {
        if ($($("nav a")[i]).attr("href") == "#"+page) {
            $($("nav a")[i]).attr("class","active");
        };
    };
};


function alterNav() {
    const pos = $(window).scrollTop()+44;
    $("nav a").attr("class","");
    if (pos < 100) {
        $("nav").css({"display":"block","background-color":"","box-shadow":""});
        $("#nav-logo").css("display","none");
        setPage("home");
    }    
    else if (pos >= 100 && pos < $("#about").offset().top-34) {
        $("nav").css("display","none");
    }
    else if (pos >= $("#about").offset().top-34 && pos < $("#contact").offset().top-(window.innerHeight*0.3)) {
        $("nav").css({"background-color":"#9900ff","box-shadow":"0px 1px 5px 2px darkgray"});
        $("nav").slideDown(200);
        $("#nav-logo").css("display","inline");
        setPage("about");
    }
    else if (pos > $("#contact").offset().top-(window.innerHeight*0.3)) {
        $("nav").css({"background-color":"#9900ff","box-shadow":"0px 1px 5px 2px darkgray"});
        $("nav").slideDown(200);
        $("#nav-logo").css("display","inline");
        setPage("contact");
    };    
};

function watchForHover() {
    var hasHoverClass = false;
    var container = document.body;
    var lastTouchTime = 0;

    function enableHover() {
        // filter emulated events coming from touch events
        if (new Date() - lastTouchTime < 500) return;
        if (hasHoverClass) return;

        container.className += ' hasHover';
        hasHoverClass = true;
    }

    function disableHover() {
        if (!hasHoverClass) return;

        container.className = container.className.replace(' hasHover', '');
        hasHoverClass = false;
    }

    function updateLastTouchTime() {
        lastTouchTime = new Date();
    }

    document.addEventListener('touchstart', updateLastTouchTime, true);
    document.addEventListener('touchstart', disableHover, true);
    document.addEventListener('mousemove', enableHover, true);

    enableHover();
}

$(document).ready(function(){

alterNav();

if (window.innerWidth <= 830) {
    //scaleBody();
}

$(".card-body").css("display","none");
$(".card-body").fadeIn(2000);

/* smooth scrolling */
$('a').on("click", function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      const target = $(this.hash);
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top-49
        }, 500);
        return false;
      };
    };
});



$(window).on("scroll", alterNav);

var siteWidth = 830;
var scale = screen.width /siteWidth

document.querySelector('meta[name="viewport"]').setAttribute('content', 'width='+siteWidth+', initial-scale='+scale+'');

watchForHover();

console.log(`Designed and Coded by Dominic Smith.
https://www.CodingDom.com/
`);

});