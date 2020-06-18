function makecar(){
    var make = ["chevy", "GM", "Fiat", "Webv Motors", "Tucker"];
    var models = ["Cadi", "500", "Bel-Air", "Taxi", "Torpedo"];
    var years = [1955, 1957, 1948, 1954, 1961];
    var colors = ["red", "blue", "tan", "yellow", "white"];
    var convert = ["soft-top convertible", "hard-top convertible"];

    var rand1 = Math.floor(Math.random() * make.length);
    var rand2 = Math.floor(Math.random() * models.length);
    var rand3 = Math.floor(Math.random() * years.length);
    var rand4 = Math.floor(Math.random() * colors.length);
    var rand5 = Math.floor(Math.random() * 5) +1;
    var rand6 = Math.floor(Math.random() * 2);

    var car = {
        make: make[rand1],
        model: models[rand2],
        year: years[rand3],
        colors: colors[rand4],
        passengers: rand5,
        convertible: convert[rand6],
        mileage: 0,
        drive: function(){
            alert("ZOom, zoOM");
        }
    }

    return car;
}
function showRoomFloor(car){
    document.getElementById("today").innerHTML = car.make + ": " + car.year + " " + car.model + " " + car.colors + " " + car.passengers + " " + " " + car.convertible + " with " + car.mileage + " miles";

    car.drive()
}

var carLot = makecar();
//showRoomFloor(carLot);
