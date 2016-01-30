//set default degree (360*5)
var degree = 1800;
//number of clicks = 0
var clicks = 0;

var uberData = {
  totalDistance: 22,
  distanceTravelled: 12,
  spins: 5,
  time: 40
};

var rotate = {
  clicks: 0,
  degree: 1800,
  rotatingDegrees: function(){
    var newDegree = this.degree*this.clicks;
    var extraDegree = Math.floor(Math.random() * 360) + 1;
    totalDegree = newDegree+extraDegree;
    return totalDegree;
  },
  getElement: function(degrees, clicks){
    var element = ['idea', 'star', 'gift', 'emoji','retry', 'sale'];
    var randomDegree = (degrees - this.clicks*this.degree);
    console.log(randomDegree);
    return element[Math.ceil(randomDegree/60)];
  }
}

$(document).ready(function(){


  $(".flash-button").click(function(){
    flashSale();
  });

  $('#flash').hide();
  $('#flash-sale').hide();
  uberDataUpdate();

	/*WHEEL SPIN FUNCTION*/
	$('#spin').click(function(){

		//add 1 every click
    $('#flash').hide();
    uberData.spins--;
    uberDataUpdate();

		rotate.clicks++;
    console.log(rotate.clicks);
    setTimeout(function(){
      //var element = rotate.getElement(totalDegree, rotate.clicks);
      var element = "sale";
      if(element === 'sale'){
        $(".flash-button").text(element);
        $("#flash").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        $('#flash').show();
      }
      else {
        $(".flash-button").text('Retry');
        $('#flash').show();
      }
      $(".flash-button").text(element);
      $("#flash").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
      $('#flash').show();

    },3000)

		/*multiply the degree by number of clicks
	  generate random number between 1 - 360,
    then add to the new degree*/
		totalDegree = rotate.rotatingDegrees();

		/*let's make the spin btn to tilt every
		time the edge of the section hits
		the indicator*/
		$('#wheel .sec').each(function(){
			var t = $(this);
			var noY = 0;
			var c = 0;
			var n = 700;
			var interval = setInterval(function () {
				c++;
				if (c === n) {
					clearInterval(interval);
				}

				var aoY = t.offset().top;
				$("#txt").html(aoY);
				//console.log(aoY);

				/*23.7 is the minumum offset number that
				each section can get, in a 30 angle degree.
				So, if the offset reaches 23.7, then we know
				that it has a 30 degree angle and therefore,
				exactly aligned with the spin btn*/
				if(aoY < 23.89){
					console.log('<<<<<<<<');
					$('#spin').addClass('spin');
					setTimeout(function () {
						$('#spin').removeClass('spin');
					}, 100);
				}
			}, 10);

			$('#inner-wheel').css({
				'transform' : 'rotate(' + totalDegree + 'deg)'
			});

      console.log("totalDegree" + totalDegree)

			noY = t.offset().top;

		});
	});

function uberDataUpdate(){
  $(".eta").text(uberData.time);
  $(".distance-travelled").text(uberData.distanceTravelled + "Kms");
  $(".total-distance").text(uberData.totalDistance+ "Kms");
  $(".spins").text(uberData.spins);
}

function flashSale(){
  
    $("#wrapper").hide();
    $("#flash-sale").show();
}

function spinner(){
  $("#wrapper").show();
  $("#flash-sale").hide();
  $(".counter").text("Uber Spin");
}



});//DOCUMENT READY
