//get treehouse_badges json
/*
$.ajax({
  url:"https://teamtreehouse.com/joseplatas.json",
  datatype:"json",
  data:{} //nothing needed,
  ,success:function(profile){
    //console.log(response) // full profile json
    //send the badges array to build_badges_background function
    // build_header_profile()
    build_badges_background(profile.badges);
    build_topics(profile.points);
    remove_loading();
    $("html, body").animate({ scrollTop: 0 }, "slow");
  },
  fail:function(error){
    //display error in your console
    console.log(error);
  }
});
*/

function remove_loading(){
  //display none the treehouse_loading
  setTimeout(function () {
    $("#treehouse_loading").slideUp("800");
  }, 1000);

}

function build_badges_background(badges){


  $.each(badges,function(index,badge){
    if(oddOrEven(index) == "odd"){
      var img = $("<img class='odd'  src='"+badge.icon_url+"' title='"+badge.name+"'/>");
    }else{
      var img = $("<img class='even'  src='"+badge.icon_url+"' title='"+badge.name+"'/>");
    }
    $(".badges .badges_list").append(img);

    //break every 30 badges
    if(((index + 1) % 30) == 0){
      $(".badges .badges_list").append("<br>");
    }
  });


}
function build_topics(points) {
  //total points
  $("#total_points").html(points.total.toLocaleString());
  //remove current li tags
  $(".points_earned .points ul li").remove();
  $(".chart_container .bar").remove();
  //loop throught object and skip the first one
  console.log(points);

  //sort the points
  var arr_points = sortObject(points)
  var most_points = arr_points[1].value;

  $.each(arr_points,function(index,point){
    console.log(point);

    // dont display if 0 or actual total
    if(point.value == 0 || point.key == "total"){
      return true;
    }
    //create list
    var li = $("<li><span>"+point.value+"</span>"+point.key+"</li>");
    $(".points_earned .points ul").append(li);
    //create bar
    var bar = $("<div class='bar "+ point.key.toLowerCase().split(' ').join('')+"'>"+point.key+"</div>");
    var bar_width = ((point.value /most_points) * 100).toFixed(2);
    console.log(bar_width);
    bar.css({"width": bar_width+"%"})
    $(".chart_container").append(bar);
  });

}

// miscellaneous functions
function sortObject(obj) {
    var arr = [];
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            arr.push({
                'key': prop,
                'value': obj[prop]
            });
        }
    }
    arr.sort(function(a, b) { return  b.value - a.value ; });
    return arr; // returns array
}
function oddOrEven(x) {
  return ( x & 1 ) ? "odd" : "even";
}
