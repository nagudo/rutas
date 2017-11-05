$(document).ready(function(){
  $("#trackFilters span").on("click", function() {
      if($(this).hasClass("label-active")) {
         $(this).removeClass("label-active")
         $("#trackList li").show();
      } else {
         $("#trackFilters span").removeClass("label-active");
         $(this).addClass("label-active");
         var selectedTrack = $(this).data("track-class");
         var showTrack = "." + selectedTrack;
         var hideTrack = ":not('." + selectedTrack + "')";
         $("#trackList li").filter(showTrack).show();
         $("#trackList li").filter(hideTrack).hide();
      }
  });
})