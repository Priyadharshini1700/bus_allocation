function getValueInput() {
  let text = "";
  let numberOfPeople = document.getElementsByClassName("inputValue")[0].value;
  let numberOfBuses = document.getElementsByClassName("inputValue")[1].value;

  var list = do_allocation(numberOfPeople, numberOfBuses)

  list.forEach((item) => {
    text += item + "<br>";
  })

  document.getElementById("OutputValue").innerHTML = text;
  document.getElementById("OutputValue").classList.add("outputAfter");
}


/*below the do_allocation function calculates the list of people can get into the next bus considering
 the capacity of the each bus is the sum of the previous two buses. it then returns the list of how many
 people can get into each bus in order, with the list being the same length as the number of buses.*/

function do_allocation(number_of_people, number_of_buses) {

  // code below keeps track of allocation
  var output = [];
  //code below keeps track of number of people throughout the program
  var noOFPeople = number_of_people;

  /* code below checks for conditions where number of buses is less than or eqaul to 3 and where number of
  people are less than or equal to 3*/
  if (number_of_buses == 0 && noOFPeople >= 0) {
    output.push("Null");
  } else if (number_of_buses >= 1 && noOFPeople == 0) {
    for (let j = 1; j <= number_of_buses; j++) {
      output.push("0 Person got into busNo-" + j);
    }
    //case 1 if the number of buses is equal to one then the bus one capacity will be one
  } else if (number_of_buses == 1 && number_of_people >= 1) {
    output.push("1 Person got into busNo-1");
  } else if (number_of_buses == 2 && noOFPeople == 1) {
    output.push("1 Person got into busNo-1", "0 Person got into busNo-2");
  } else if (number_of_buses == 2 && noOFPeople >= 2) {
    output = ["1 Person got into busNo-1", "1 Person got into busNo-2 "];
  } else if (number_of_buses == 3 && noOFPeople == 3) {
    output = ["1 Person got into busNo-1", "1 Person got into busNo-2 ", "1 Person got into busNo-3 "];
  } else if (number_of_buses >= 3 && number_of_people == 1) { //case 1 if the number of buses is equal to one then the bus one capacity will be one

    output = ["1 Person got into busNo-1"];
    for (let k = 2; k <= number_of_buses; k++) {
      output.push("0 Person got into busNo-" + k);
    }
  } else if (number_of_buses >= 3 && noOFPeople == 2) {
    output = ["1 Person got into busNo-1", "1 Person got into busNo-2 "];
    for (let l = 3; l <= number_of_buses; l++) {
      output.push("0 Person got into busNo-" + l);
    }
  } else if (number_of_buses >= 3 && noOFPeople == 3) {
    output = ["1 Person got into busNo-1", "1 Person got into busNo-2 ", "1 Person got into busNo-3 "];
    for (let m = 4; m <= number_of_buses; m++) {
      output.push("0 Person got into busNo-" + m);
    }
  } else if (number_of_buses >= 3 && noOFPeople >= 3) {
    output = ["1 Person got into busNo-1", "1 Person got into busNo-2"]; // allocation for bus number one and bus number two is already allocated
    noOFPeople = noOFPeople - 2; // subtract 2 people from total number of people since they both are already allocated
    var busCapacity = [1, 1]; // keeps track of each bus capacity

    for (let i = 3; i <= number_of_buses; i++) {
      var currentBusCapacity = busCapacity[busCapacity.length - 2] + busCapacity[busCapacity.length - 1]; // keeps the track of current bus capacity
      busCapacity.push(currentBusCapacity);



      if (noOFPeople >= currentBusCapacity) {
        output.push(currentBusCapacity + " People got into busNo-" + i);
        noOFPeople = noOFPeople - currentBusCapacity;

      } else if (noOFPeople < currentBusCapacity) {
        output.push(noOFPeople + " People got into busNo-" + i);
        noOFPeople = 0;
      }
    }
  }
  return output; // returns an array of people alloacted to their respective buses
}

//Note: To run the function use do_allocation(mention number of people, mention number of buses);
