/*------------------------------------- Onboarding Screen -------------------------------------*/
$(".skip_btn_1").click(function(){
  $("#first").removeClass("active");
  $(".first_slide").removeClass("active");  
  $("#second").addClass("active");
  $(".second_slide").addClass("active");
});

$(".skip_btn_2").click(function(){
 $("#second").removeClass("active");
 $(".second_slide").removeClass("active");
 $("#third").addClass("active");
 $(".third_slide").addClass("active");
});

/*------------------------------------- Preloader -------------------------------------*/
$(window).on('load', function () {
   $('.loading-window').fadeOut(2500);
    $('.loader-mask').fadeOut(2500);
});

$(window).on("load" , function () {
  $('.loader-mask-splash').delay(2000).fadeOut(3000);
});

/*-------------------------------------OTP Section-------------------------------------*/
if(jQuery('#otp').length > 0)
  $('.digit-group').find('input').each(function() {
    $(this).attr('maxlength', 1);
    $(this).on('keyup', function(e) {
      var thisVal = $(this).val();
      var parent = $($(this).parent());
      if(e.keyCode === 8 || e.keyCode === 37) {
        var prev = parent.find('input#' + $(this).data('previous'));
        if(prev.length) {
          $(prev).select();
        }
      } else {
        var next = parent.find('input#' + $(this).data('next'));

        if(!$.isNumeric(thisVal))
        {
          $(this).val('');
          return false;
        }

        if(next.length) {
          $(next).select();
        } else {
          if(parent.data('autosubmit')) {
            parent.submit();
          }
        }
      }
    });
  });

/*-------------------------------------  Currency AND language Checkbox-------------------------------------*/
var $radioButtons = $('#language-screen input[type="radio"],#currency-page input[type="radio"]');
$radioButtons.click(function() {
  $radioButtons.each(function() {
    $(this).parent().toggleClass('language-sel', this.checked);
  });
});

/*------------------------------------- Favourite Hide Show -------------------------------------*/
$('.item-bookmark').on('click',function(){
  $(this).toggleClass('active');
}); 

/*-------------------------------------Faq Section-------------------------------------*/
$('.nested-accordion').find('.comment').slideUp();
$('.nested-accordion').find('h3').click(function(){
  $(this).next('.comment').slideToggle(100);
  $(this).toggleClass('selected');
});

/*-------------------------------------Toggle method -------------------------------------*/
function toggleConnection(element) {
  let isConnected = element.innerText === 'Connected';
  isConnected = !isConnected;
  if (isConnected) {
    element.innerText = 'Connected';
    element.style.color = '#00A266';
    element.style.cursor = 'pointer'
  } else {
    element.innerText = 'Not Connected';
    element.style.color = '#FB4945';
    element.style.cursor = 'pointer';
  }
}

/*------------------------------------- Invite friend -------------------------------------*/
$(document).ready(function() {
  $(".friend-select input").click(function() {
    var content = $(this);
    if (content.is(":checked")) {
      $(this).parent().addClass("active");
      $(this).parent().siblings().children(".custom-radio-sel-friend").addClass("active");
    }
    else {
      $(this).parent().siblings().children(".custom-radio-sel-friend").removeClass("active");
      $(this).parent().removeClass("active");
    }
    if ($(this).parent().hasClass('active')) { 

      $(this).parent().children(".custom-radio-sel-friend").text("Invite");
    } else {
      $(this).parent().children(".custom-radio-sel-friend").text("Invited")
    }
  });
});

/*------------------------------------- Profile Upload -------------------------------------*/
$(document).ready(function () {
  var readURL = function (input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $('.profile-pic').attr('src', e.target.result);
      }
      reader.readAsDataURL(input.files[0]);
    }
  }
  $(".file-upload").on('change', function () {
    readURL(this);
  });
  $(".upload-button").on('click', function () {
    $(".file-upload").click();
  });
});

/*------------------------------------- Delete Or Deactive -------------------------------------*/
function continueAction() {
  const form = document.getElementById('deleteDeactivateForm');
  const selectedAction = form.querySelector('input[name="action"]:checked').value;
  if (selectedAction === 'delete') {
    window.location.href = 'delete-account.html';
  } else if (selectedAction === 'deactivate') {
    window.location.href = 'deactive-account.html';
  }
}

/*------------------------------------- Payment -------------------------------------*/
// Add Text In Card
function updateLokiBox(lokiBoxId, inputField) {
  document.getElementById(lokiBoxId).innerText = inputField.value;
}

// Add Card Number 16 digit
function maskNumber() {
  let inputNumber = document.getElementById('cardNumber').value;
  let digitsOnly = inputNumber.replace(/\D/g, '');
  let maskedPart = digitsOnly.substring(0, 12).replace(/./g, '*');
  let lastPart = digitsOnly.substring(12);
  let maskedNumber = maskedPart.replace(/(.{4})/g, '$1 ').trim() + ' ' + lastPart;
  document.getElementById('lokiCardNumber').textContent = maskedNumber;
}

// Add CVV Number Only Three
function validateInputcvv(inputField) {
  inputField.value = inputField.value.replace(/\D/g, '');
  if (inputField.value.length > 3) {
    inputField.value = inputField.value.slice(0, 3);
  }
  document.getElementById('lokiCVV').textContent = inputField.value;
}
$('.enter-amount input').on('click',function(){
  $(this).addClass('active');
}); 

/*------------------------------------ Redirect link -------------------------------------*/
$(".send-money1").wrap('<a href="send-money1.html"></a>');
$(".request-money1").wrap('<a href="request-money1.html"></a>');
$(".spilt-bill2").wrap('<a href="split-bill3.html"></a>');
$(".Preapproved-redirect").wrap('<a href="preapproved-payment1.html"></a>');
$(".request-payment-redirect").wrap('<a href="request-payment.html"></a>');
$(".tracking").wrap('<a href="tracking1.html"></a>');
$(".send-money-screen").wrap('<a href="send-money.html"></a>');

/*------------------------------------- Mode Changes-------------------------------------*/
jQuery('.theme-change').on('click',function(){
  jQuery('.site-content').toggleClass('theme-dark'); 
  if(jQuery('.site-content').hasClass('theme-dark')){ 
    location.replace("../dark-mode/splashscreen.html")
  }else{ 
    location.replace("../light-mode/splashscreen.html")
  }
});




