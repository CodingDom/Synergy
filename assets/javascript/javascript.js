$(document).ready(function(){

function setPage(page) {
    for (var i = 0; i < $("nav a").length; i++) {
        if ($($("nav a")[i]).attr("href") == "#"+page) {
            $($("nav a")[i]).attr("class","active");
        };
    };
};

function alterNav() {
    var pos = $(window).scrollTop();
    $("nav a").attr("class","");
    if (pos < 105) {
        $("nav").css({"display":"block","background-color":"","box-shadow":""});
        $("#nav-logo").css("display","none");
        setPage("home");
    }    
    else if (pos >= 105 && pos < $("#about").offset().top-80) {
        $("nav").css("display","none");
    }
    else if (pos >= $("#about").offset().top-80) {
        $("nav").css({"background-color":"#9900ff","box-shadow":"0px 1px 5px 2px darkgray"});
        $("nav").slideDown(200);
        $("#nav-logo").css("display","inline");
        setPage("about");
    };    
};

alterNav();

$(".card-body").css("display","none");
$(".card-body").fadeIn(2000);

/* smooth scrolling */
$('a').on("click", function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top-49
        }, 500);
        return false;
      };
    };
});



$(window).on("scroll", alterNav);


});