
// get mobile type
function getMobileOperatingSystem() {

  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

      // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}
var mobile = getMobileOperatingSystem();
window.onload = function() {
  if (mobile == "Windows Phone") {

    document.getElementById("OS").innerHTML = "How have you personalised this Windows tool?";
  } else if (mobile == "Android"){

    document.getElementById("OS").innerHTML = "How have you personalised this Android tool?";
  } else if (mobile == "iOS"){

    document.getElementById("OS").innerHTML = "How have you personalised this Apple tool?";
  } else {

    document.getElementById("OS").innerHTML = "How have you personalised this tool?";
  }

};



//get browser


//find x y z orientation coordinates
function handleOrientation(event) {

  var p = event.absolute;
  var x = event.beta;  // In degree in the range [-180,180]
  var y = event.gamma; // In degree in the range [-90,90]
  var z = event.alpha;
  var webkit = event.webkitCompassHeading;
  var accuracy = event.webkitCompassAccuracy;
  var mag = event.magnetometer

  // Because we don't want to have the device upside down
  // We constrain the x value to the range [-90,90]
  if (x >  90) { x =  90};
  if (x < -90) { x = -90};

  // To make computation easier we shift the range of
  // x and y to [0,180]
  x += 90;
  y += 90;

  // 10 is half the size of the ball
  // It center the positioning point to the center of the ball
  /*ball.style.top  = (maxX*x/180 - 10) + "px";
  ball.style.left = (maxY*y/180 - 10) + "px";*/
globals.gx = x;
globals.gy = y;
globals.gz = z;

}
//variables for understanding acceleration
var dx=0;
var pvx;
var vx=0;
var vy=0;
var vz=0;


function deviceCompassListener(event) {

  var alpha    = event.alpha; //z axis rotation [0,360)
  var beta     = event.beta; //x axis rotation [-180, 180]
  var gamma    = event.gamma; //y axis rotation [-90, 90]
  //Check if absolute values have been sent
  if (typeof event.webkitCompassHeading !== "undefined") {

    alpha = event.webkitCompassHeading; //iOS non-standard
    var heading = alpha;
    document.getElementById("s12").innerHTML = heading.toFixed([0]);
  }
  else {

    var heading = 360 - alpha; //heading [0, 360)
    document.getElementById("s12").innerHTML = heading.toFixed([0]);

  }

  // Change backgroud colour based on heading
  // Green for North and South, black otherwise
  if (heading > 355 || heading < 5) { //Allow +- 1 degree

    document.getElementById("s12").innerHTML = "N"; // North


      north = 1;


  }
  else if (heading > 175 && heading < 185){ //Allow +- 1 degree

    document.getElementById("s12").innerHTML = "S"; // South
        document.getElementById("s12").style.color = "blue";

            if (swiper.realIndex == 12) {
              swiper.slideTo(13, 400);
              //navigator.vibrate([200, 400, 200]);
            }

  } else if (heading > 85 && heading < 95) {
    document.getElementById("s12").innerHTML = "E"; // East
        document.getElementById("s12").style.color = "blue";


  }else if (heading > 275 && heading < 285) {
    document.getElementById("s12").innerHTML = "W"; // West
        document.getElementById("s12").style.color = "blue";

  }
else { // Otherwise, use near black
  document.getElementById("s12").style.color = "black";

}
}

//device stores
function handleMotion(event) {

  var x = event.acceleration.x;
  var y = event.acceleration.y;
  var z = event.acceleration.z;
  var n = event.accelerationIncludingGravity;
  var a = event.rotationRate.alpha;
  var b = event.rotationRate.beta;
  var g = event.rotationRate.gamma;
  var p = event.interval;


  if (x > 0.2 || x < -0.3){
    pvx = vx;
    vx=vx+x*0.001;
  }
  if (x < 0.01 && x > -0.01){

    vx=0;
  }

  if (y > 0.5 || y < -0.5){
    vy=vy+y*0.001;
  }
  if (y<0.5 && y> -0.5) {
  vy = 0;
  }

  if (z > 0.5 || z < -0.5){
    vz=vz+y*0.001;
  }
  if (z<0.5 && z> -0.5) {
  vy = 0;
  }

if (swiper.realIndex == 13){
{
if (mobile == "iOS"){
  if (vx > 0.1|| vx< -0.1) {
    document.body.style.backgroundImage = "repeating-radial-gradient(black,  white 25%, black 50%)";
  } else {
    document.body.style.backgroundImage = "repeating-radial-gradient(white, #cc5500 25%, white 50%)";
  }
} else {
  if (vx > 0.05|| vx< -0.05) {
    document.body.style.backgroundImage = "repeating-radial-gradient(black,  white 25%, black 50%)";
  } else {
    document.body.style.backgroundImage = "repeating-radial-gradient(white, #cc5500 25%, white 50%)";
  }
}

}
}

if (mobile == "iOS"){
  globals.gvx = vx*80;
  globals.gvy = vy*8;
  globals.gvz = vy*8;
} else {
  globals.gvx = vx*120;
  globals.gvy = vy*12;
  globals.gvz = vy*12;
}


}
//battery
/*navigator.getBattery().then(function(battery) {

    var level = battery.level;
    if (level <= 0.35){
         document.getElementById("battery").innerHTML = level * 100 + "%" ;
    } else if (level > 0.35 && level <= 0.60) {
      document.getElementById("battery").innerHTML = level * 100 + "%" ;
    } else if (level > 0.65) {
      document.getElementById("battery").innerHTML = level * 100 + "%"  ;
    }

});*/
