const siteWidth = 830;

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

function scaleBody() {
    const scale = screen.width /siteWidth

    document.querySelector('meta[name="viewport"]').setAttribute('content', 'width='+siteWidth+', initial-scale='+scale+'');
}

 // Function to handle input keypress
function letterInput(event) {
  const value = String.fromCharCode(event.which);
  // Only grab letters a-z and whitespaces
  const pattern = new RegExp(/[a-z ]/i);
  return pattern.test(value);
};

$(document).ready(function(){

alterNav();

scaleBody();

// Listener for user input
$("#first_name, #last_name").bind('keypress',letterInput);

$("input").on("paste", function(e){
    e.preventDefault();
});

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



watchForHover();

$(window).on("orientationchange",scaleBody);

const aliases = {
    first_name: "mce-FNAME",
    last_name: "mce-LNAME",
    email: "mce-EMAIL",
    message: "mce-MESSAGE"
}

// $("#contact *").on("change", function(e) {
//     if (aliases[this.id]) {
//         $(`#${aliases[this.id]}`).val(this.value);
//     }
// });

$('#contact form').on("submit", function(e){
    e.preventDefault();
    const name = [$("#first_name").val(),$("#last_name").val()].join(" ");
    const email = $("#email").val();
    const message = $("#message").val();
    const token = $("#contact form").serializeArray()[4].value;

    console.log(name, email, message, token);

    emailjs.send("gmail", "contact_form", {"name":name, "email": email, "message": message, "g-recaptcha-response": token}, "user_k4ucsDYDh8sP6nkFJNr9F")
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
     }, function(error) {
        console.log('FAILED...', error);
     });;
    return false;
});

console.log(`Designed and Coded by Dominic Smith.
https://www.CodingDom.com/
`);

});