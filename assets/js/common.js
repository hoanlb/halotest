$(document).ready(function() {
  $(".topslide").slick({
    dots: true,
    autoplay: true
  });
  $(".collection_slide").slick({
    autoplay: true
  });
  $(".client_slide").slick({
    autoplay: true
  });
  $(".toptip i.fa-close").click(function() {
    $(".toptip").hide();
    $(".head").addClass("no_top");
  });
});