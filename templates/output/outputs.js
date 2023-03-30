const margin = ({top: 10, right: 30, bottom: 30, left: 60})
const width = 300 - margin.left - margin.right
const height = 200//- margin.top - margin.bottom ------> EDIT HEIGHT to 200

const average = 60000 //Average based on zip code, year, lifetime years owned
const hybrid_average = 50000 // same as above
const bev_average = 30000 // same as above

const input = `Input Vehicle`//Change to input from django
const data = 20000 //Change to input from Django (kg)

const life_years = 18 //Change based on input
const life_miles = 178000 //Change based on input
const emissions_per_year = data / life_years
const emissions_per_mile = data / life_miles
const round_emissions_per_mile = Math.round(100 * emissions_per_mile)/100

/// function for per mile
function perMileFunction() {
  const x = document.getElementById("miles").value; 

  if (x > 1000 || x < 0) {
    document.getElementById("check_input").innerHTML = "Please enter a number between 0 and 1000."
    document.getElementById("emissions-output").innerHTML = ""
    document.getElementById("emissions-equi").innerHTML = ""
    // const iso = Math.round(document.getElementById("miles").value * emissions_per_mile / 0.904)
    // const iso_counts = Array.from(Array(iso).keys())

    const iso_container = d3.select("#isotopes")
      .append("svg")
      .append("g")

    iso_container
      .insert('rect')
      .attr('width', 1000)
      .attr('height', 250) // EDIT HEIGHT to height (200)
      .attr('x', 0)
      .attr('y', 0)
      .attr('fill', "white")

  } else {
  document.getElementById("check_input").innerHTML = ""
  document.getElementById("emissions-output").innerHTML = `${Math.round(x * emissions_per_mile * 100) / 100} kgCO2e`
  document.getElementById("emissions-equi").innerHTML = `~${Math.round(x * emissions_per_mile / 0.904)} pounds of coal`
  const iso = Math.round(document.getElementById("miles").value * emissions_per_mile / 0.904)
  const iso_counts = Array.from(Array(iso).keys())

  //Isotopes
  
  const iso_row = Math.ceil(iso / 20 )
  const last_row = 20 - ((20 * iso_row) - iso)
  const iso_last_height = (iso_row - 1) * 30

  // const xPartScale = d3.scalePoint()
  //     .domain(Array.from(Array(20).keys()))
  //     .range(0, 800)
  
  // const yPartScale = d3.scalePoint()
  //     .domain(Array.from(Array(iso_row).keys()))
  //     .range(0, 90)    

  const iso_container = d3.select("#isotopes")
    .append("svg")
    .append("g")

  iso_container
    .insert('rect')
    .attr('width', 1000)
    .attr('height', 250) // EDIT HEIGHT to height (200)
    .attr('x', 0)
    .attr('y', 0)
    .attr('fill', "white")
    
  for (let j = 0; j < iso_row - 1; j++) {
    for (let i = 0; i < 20; i++) {
      const coals_pile = iso_container.append('image')
        .attr("href", 'icons/coal.svg')
        .attr('width', 30)
        .attr('height', 30)
        .attr('x', 10 + (35*i))
        .attr('y', 0 + (30*j))
    }
  }

    for (let i = 0; i < last_row; i++) {
    const coals_pile = iso_container.append('image')
      .attr("href", 'icons/coal.svg')
      .attr('width', 30)
      .attr('height', 30)
      .attr('x', 10 + (35*i))
      .attr('y', iso_last_height)
  }

  // iso_container.append('text')
  //   .attr('x', 0 )
  //   .attr('y', 25)
  //   .style('font', '13px sans-serif')
  //   .style('color', 'black')
  //   .style("font-weight", 100)
  //   .text(`${last_row}`);
   }
}

//////AVERAGE EMISSIONS PER MILE TEXT
const avg_mi = d3.select("#avg_text")
  .append("svg")
  .append("g")

avg_mi.append('text')
  .attr('x', 0 )
  .attr('y', 25)
  .style('font', '14px')
  .style('color', 'black')
  .style("font-weight", 100)
  .text(`Over a vehicle life of `);
avg_mi.append('text')
  .attr('x', 140 )
  .attr('y', 25)
  .style('font', '14px')
  .style('color', 'black')
  .style("font-weight", 900)
  .text(`${life_years} years`);
avg_mi.append('text')
  .attr('x', 0 )
  .attr('y', 45)
  .style('font', '14px')
  .style('color', 'black')
  .style("font-weight", 100)
  .text(`Average Emissions Per Mile:`);
avg_mi.append('text')
  .attr('x', 190 )
  .attr('y', 45)
  .style('font', '14px')
  .style('color', 'black')
  .style("font-weight", 900)
  .text(`${round_emissions_per_mile} kgCO2e`);


//// ISOTOPES

const isotope_count = localStorage.getItem("counting")

// //Append SVG Object to the Page
// const iso_container = d3.select("#isotopes")
//   .append("svg")
//   .append("g")

// const coals_pile = iso_container.append('image')
//   .attr("href", './icon.png')
//   .attr('width', 30)
//   .attr('height', 30)
//   .attr('x', 10)
//   .attr('y', 0)

// iso_container.append('text')
//   .attr('x', 0 )
//   .attr('y', 25)
//   .style('font', '13px sans-serif')
//   .style('color', 'black')
//   .style("font-weight", 100)
//   .text(`${isotope_count}`);

//Append SVG Object to the Page
const container = d3.select("#barChart")
  .append("svg")
  .append("g")

// const barchart = container
//   .append("svg")
//   .attr("width", width + margin.left + margin.right)
//   .attr("height", height + margin.top*2 + margin.bottom*3)
//   .append("g")
//   .attr("transform", "translate("  + margin.left + "," + margin.bottom + ")")


//yAxis
const y = d3.scaleLinear()
  .domain([0, 75000])
  .range([ 200, 10]) // EDIT HEIGHT to height (200)

// barchart.append("g")
//   .attr("transform", `translate(${width}), 0`)
//   .call(d3.axisLeft(y))
//   .call(g => g.append("text")
//       .attr("x", -45)
//       .attr("y", 3)
//       .attr("fill", "black")
//       .attr("text-anchor", "start")
//       .text(`kg CO2e`))

// //x axis
// const x = d3.scaleBand()
//   .domain(['Average (US?)', `${input}`])
//   .range([ 0, 120 ])
//   .padding(0.2);

// barchart.append("g")
//   .attr("transform", "translate(0," + 200 + ")") // EDIT HEIGHT to height (200)
//   .call(d3.axisBottom(x))
//   .selectAll("text")
//     .attr("transform", "translate(-10,0)rotate(-45)")
//     .style("text-anchor", "end");

// /// Output bars
// const input_bar = barchart
// .insert('rect')
// .attr('width', 40)
// .attr('height', 200 - y(data)) // EDIT HEIGHT to height (200)
// .attr('x', 67.5 )
// .attr('y', y(data))
// .attr('fill', "#3B77AF")


// /// Average bars
// const avg_bar = barchart
// .insert('rect')
// .attr('width', 40)
// .attr('height', 200 - y(average)) // EDIT HEIGHT to height (200)
// .attr('x', 12.5 )
// .attr('y', y(average))
// .attr('fill', "gray")

// // labels
// const avg_emission_label = barchart
//   .append('text')
//   .attr('x', 20)
//   .attr('y', y(average) + 10)
//   .style("font", "10px sans-serif")
//   .style('fill', 'white')
//   .text(`${average}`)

// const input_emission_label = barchart
//   .append('text')
//   .attr('x', 74)
//   .attr('y', y(data) + 10)
//   .style("font", "10px sans-serif")
//   .style('fill', 'white')
//   .text(`${data}`)

// const title = container
//   .append('text')
//   .attr('x', 0)
//   .attr('y', 15)
//   .style("font", "14px sans-serif")
//   .text(`Lifetime Emissions (kgCO2e) --- OPTION 1`)

  /////////////////////// OPTION 2 ///////////////////////////////////

  const barchart2 = container
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top*2 + margin.bottom*3)
  .append("g")
  .attr("transform", "translate("  + margin.left + "," + margin.bottom + ")") //325


//yAxis

// const y2 = d3.scaleLinear()
//   .domain([0, 75000])
//   .range([height, 260])

barchart2.append("g")
  .attr("transform", `translate(${width}), 0`)
  .call(d3.axisLeft(y))
  .call(g => g.append("text")
      .attr("x", -45)
      .attr("y", 3)
      .attr("fill", "black")
      .attr("text-anchor", "start")
      .text(`kg CO2e`))

const x2 = d3.scaleBand()
  .domain(['Avg ICE (US?)', 'Avg PHEV', 'Avg BEV', `${input}`])
  .range([ 0, 180 ])
  .padding(0.2);

barchart2.append("g")
  .attr("transform", "translate(0," + height + ")") // EDIT HEIGHT to height (200)
  .call(d3.axisBottom(x2))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

/// Output bars
const input_bar2 = barchart2
.insert('rect')
.attr('width', 30)
.attr('height', height - y(data)) // EDIT HEIGHT to height (200)
.attr('x', 140)
.attr('y', y(data))
.attr('fill', "#3B77AF")


/// Average bars
const avg_bar2 = barchart2
.insert('rect')
.attr('width', 30)
.attr('height', height - y(average)) // EDIT HEIGHT to height (200)
.attr('x', 12.5 )
.attr('y', y(average))
.attr('fill', "gray")

/// PHEV
const phev_bar2 = barchart2
.insert('rect')
.attr('width', 30)
.attr('height', height - y(hybrid_average)) // EDIT HEIGHT to height (200)
.attr('x', 55 )
.attr('y', y(hybrid_average))
.attr('fill', "gray")

/// BEV
const bev_bar2 = barchart2
.insert('rect')
.attr('width', 30)
.attr('height', height - y(bev_average)) // EDIT HEIGHT to height (200)
.attr('x', 97.5 )
.attr('y', y(bev_average))
.attr('fill', "gray")

// labels
const avg_emission_label2 = barchart2
  .append('text')
  .attr('x', 14)
  .attr('y', y(average) + 10)
  .style("font", "9.5px sans-serif")
  .style('fill', 'white')
  .text(`${average}`)

const phev_label2 = barchart2
  .append('text')
  .attr('x', 56.5)
  .attr('y', y(hybrid_average) + 10)
  .style("font", "9.5px sans-serif")
  .style('fill', 'white')
  .text(`${hybrid_average}`)

const bev_label2 = barchart2
  .append('text')
  .attr('x', 99)
  .attr('y', y(bev_average) + 10)
  .style("font", "9.5px sans-serif")
  .style('fill', 'white')
  .text(`${bev_average}`)

const input_emission_label2 = barchart2
  .append('text')
  .attr('x', 141.5)
  .attr('y', y(data) + 10)
  .style("font", "9.5px sans-serif")
  .style('fill', 'white')
  .text(`${data}`)

const title2 = container
  .append('text')
  .attr('x', 0)
  .attr('y', 15) //310
  .style("font", "14px sans-serif")
  .text(`Lifetime Emissions (kgCO2e)`)



  ///////////////////////////////////////////////////////////////////

// Conversions for Equivilencies -- source: https://www.epa.gov/energy/greenhouse-gases-equivalencies-calculator-calculations-and-references
// const gallons_gasoline = data / 8.887//kg
// const gallons_diesel = data / 10.180 // kg
const gas_power_vehicle_per_year = data / 4640//kg -- vehicle per year
const miles_avg_gas_vehicle =data / 0.403/ 100
const barrels_of_oil =  data / 430 //kg
const tanker_trucks_filled_gasoline = data / 75540 / 100 // kg
const incandescent_to_led_save = data / 26.4// bulbs replaced (kg)
const home_elec_use = data / 5139  // kg homes per year
const urban_seedlings_decade = data / 60  //kg carbon sequestered over ten years per urban tree planted
const acres_us_forests = data / 840  // sequestered annually by one acre of avg US forest 
const propane_cylinders =data / 24  // kg per cylinder 
const railcars_coal = data / 181100  // railcars coal 
const trucks_coal = data / 40680  // semi trucks coal burned (assume 45,000 lbs of coal)
const pickup_coal = data / 1356  // pickup trucks coal burned (assume 1500 lbs of coal)
const pounds_coal = data / 0.904 // pounds coal
const smartphones_charged = data / 0.00822 // smartphones charged 
const hours_airplane = data / 250 //passenger on a plane (source: https://www.carbonindependent.org/22.html)
const food_waste = data / 1.151 // pounds of foodwaste (source: https://www.fao.org/3/i3347e/i3347e.pdf, https://www.newfoodmagazine.com/article/153960/food-waste-climate/#:~:text=Putting%20it%20into%20perspective,more%20potent%20than%20CO2.)

///rectangle border for equivalencies

const container2 = d3.select("#equivalencies")
  .append("svg")
  .append("g")

const rectangle = container2.append("rect")
  .attr("width", 575)
  .attr("height", 225)
  .attr("x", 0) //270
  .attr("y", 15) //30
  .attr("fill", "white")
  .attr("stroke", "gold")
  .attr("stroke-width", 1.5)
  .attr('rx', 20);

 ////// ///Equivalency texts -- PER YEAR //////////
 container2.append('text')
 .attr('x', 20)
 .attr('y', 30 + 15)
 .style('font', '16px sans-serif')
 .style('color', 'black')
 .style("font-weight", 900)
 .text(`Yearly emissions from ${input} over ${life_years} years are equivalent to:`);

///Gas powered vehicles

container2.append('text')
  .attr('x', 30 + 60)
  .attr('y', 55 + 15 + 10)
  .style('font', '13px sans-serif')
  .style('color', 'black')
  .style("font-weight", 100)
  .text(`Emissions from`);

container2.append('text')
  .attr('x', 30 + 60 + 160)
  .attr('y', 55 + 15 + 10)
  .style('font', '15px sans-serif')
  .style('fill', '#3B77AF')
  .style("font-weight", 900)
  .text(`${Math.round(100 * gas_power_vehicle_per_year/life_years) / 100} `);

container2.append('text')
  .attr('x', 30 + 60 + 200)
  .attr('y', 55 + 15 + 10)
  .style('font', '13px sans-serif')
  .style('color', 'black')
  .style("font-weight", 100)
  .text(`gas-powered vehicles in a year`);

const vehicle_image = container2.append('image')
  .attr("href", './icons/gascar2.svg')
  .attr('width', 50)
  .attr('height', 50)
  .attr('x', 20)
  .attr('y', 55 - 15 + 10)


///Energy in American homes per year

container2.append('text')
  .attr('x', 30 + 60)
  .attr('y', 90 + 15 + 10)
  .style('font', '13px sans-serif')
  .style('color', 'black')
  .style("font-weight", 100)
  .text(`Electricity emissions from`);

container2.append('text')
  .attr('x', 30 + 60 + 160)
  .attr('y', 90 + 15 + 10)
  .style('font', '15px sans-serif')
  .style('fill', '#3B77AF')
  .style("font-weight", 900)
  .text(`${Math.round(100 * home_elec_use/life_years) / 100} `);

container2.append('text')
  .attr('x', 30 + 60 + 200)
  .attr('y', 90 + 15 + 10)
  .style('font', '13px sans-serif')
  .style('color', 'black')
  .style("font-weight", 100)
  .text(`American homes in a year`);

const home_image = container2.append('image')
  .attr("href", './icons/house.svg')
  .attr('width', 35)
  .attr('height', 35)
  .attr('x', 20 + 8)
  .attr('y', 90 - 15 + 10 + 5)

  ///Airplane hours

container2.append('text')
  .attr('x', 30 + 60)
  .attr('y', 125 + 15 + 10)
  .style('font', '13px sans-serif')
  .style('color', 'black')
  .style("font-weight", 100)
  .text(`Emissions from flying`);

container2.append('text')
  .attr('x', 30 + 60 + 160)
  .attr('y', 125 + 15 + 10)
  .style('font', '15px sans-serif')
  .style('fill', '#3B77AF')
  .style("font-weight", 900)
  .text(`${Math.round(100 * hours_airplane/life_years) / 100} `);

container2.append('text')
  .attr('x', 30 + 60 + 200)
  .attr('y', 125 + 15 + 10)
  .style('font', '13px sans-serif')
  .style('color', 'black')
  .style("font-weight", 100)
  .text(`hours as a passenger on an international flight`);

const airplane_image = container2.append('image')
  .attr("href", './icons/plane.svg')
  .attr('width', 50)
  .attr('height', 50)
  .attr('x', 20)
  .attr('y', 125 - 15 + 10)


///Acres US Forests

container2.append('text')
  .attr('x', 30 + 60)
  .attr('y', 160 + 15 + 10)
  .style('font', '13px sans-serif')
  .style('color', 'black')
  .style("font-weight", 100)
  .text(`Carbon sequestered by`);

container2.append('text')
  .attr('x', 30 + 60 + 160)
  .attr('y', 160 + 15 + 10)
  .style('font', '15px sans-serif')
  .style('fill', '#3B77AF')
  .style("font-weight", 900)
  .text(`${Math.round(100 * acres_us_forests/life_years) / 100} `);

container2.append('text')
  .attr('x', 30 + 60 + 200)
  .attr('y', 160 + 15 + 10)
  .style('font', '13px sans-serif')
  .style('color', 'black')
  .style("font-weight", 100)
  .text(`acres of US forest in a year`);

const forest_image = container2.append('image')
  .attr("href", 'icons/forest.svg')
  .attr('width', 40)
  .attr('height', 40)
  .attr('x', 20 + 5)
  .attr('y', 160 - 15 + 10 + 5) 
  .style('fill', 'blue')

  ///Pickup Trucks coal

container2.append('text')
  .attr('x', 30 + 60)
  .attr('y', 195 + 15 + 10)
  .style('font', '13px sans-serif')
  .style('color', 'black')
  .style("font-weight", 100)
  .text(`Emissions from burning`);

container2.append('text')
  .attr('x', 30 + 60 + 160)
  .attr('y', 195 + 15 + 10)
  .style('font', '15px sans-serif')
  .style('fill', '#3B77AF')
  .style("font-weight", 900)
  .text(`${Math.round(100 * pickup_coal/life_years) / 100} `);

container2.append('text')
  .attr('x', 30 + 60 + 200)
  .attr('y', 195 + 15 + 10)
  .style('font', '13px sans-serif')
  .style('color', 'black')
  .style("font-weight", 100)
  .text(`standard pickup trucks of coal`);

const coal_image = container2.append('image')
  .attr("href", 'icons/coal_pickup.svg')
  .attr('width', 50)
  .attr('height', 50)
  .attr('x', 20)
  .attr('y', 195 - 15 + 10)

// ////Burning Pounds of Coal

////////////// LIFETIME EQUIVALENCIES ////////////////

///rectangle border for equivalencies

const container3 = d3.select("#equivalencies2")
  .append("svg")
  .append("g")

const rectangle2 = container3.append("rect")
  .attr("width", 575)
  .attr("height", 225)
  .attr("x", 0) //270
  .attr("y", 15) //30
  .attr("fill", "white")
  .attr("stroke", "gold")
  .attr("stroke-width", 1.5)
  .attr('rx', 20);

 ////// ///Equivalency texts //////////
 container3.append('text')
 .attr('x', 20)
 .attr('y', 30 + 15)
 .style('font', '16px sans-serif')
 .style('color', 'black')
 .style("font-weight", 900)
 .text(`Lifetime emissions from ${input} are equivalent to:`);

///Gas powered vehicles

container3.append('text')
  .attr('x', 30 + 60)
  .attr('y', 55 + 15 + 10)
  .style('font', '13px sans-serif')
  .style('color', 'black')
  .style("font-weight", 100)
  .text(`Emissions from`);

container3.append('text')
  .attr('x', 30 + 60 + 160)
  .attr('y', 55 + 15 + 10)
  .style('font', '15px sans-serif')
  .style('fill', '#3B77AF')
  .style("font-weight", 900)
  .text(`~${Math.round(gas_power_vehicle_per_year)} `);

container3.append('text')
  .attr('x', 30 + 60 + 200)
  .attr('y', 55 + 15 + 10)
  .style('font', '13px sans-serif')
  .style('color', 'black')
  .style("font-weight", 100)
  .text(`gas-powered vehicles in a year`);

const vehicle_image2 = container3.append('image')
  .attr("href", './icons/gascar2.svg')
  .attr('width', 50)
  .attr('height', 50)
  .attr('x', 20)
  .attr('y', 55 - 15 + 10)


///Energy in American homes per year

container3.append('text')
  .attr('x', 30 + 60)
  .attr('y', 90 + 15 + 10)
  .style('font', '13px sans-serif')
  .style('color', 'black')
  .style("font-weight", 100)
  .text(`Electricity emissions from`);

container3.append('text')
  .attr('x', 30 + 60 + 160)
  .attr('y', 90 + 15 + 10)
  .style('font', '15px sans-serif')
  .style('fill', '#3B77AF')
  .style("font-weight", 900)
  .text(`~${Math.round(home_elec_use)} `);

container3.append('text')
  .attr('x', 30 + 60 + 200)
  .attr('y', 90 + 15 + 10)
  .style('font', '13px sans-serif')
  .style('color', 'black')
  .style("font-weight", 100)
  .text(`American homes in a year`);

const home_image2 = container3.append('image')
  .attr("href", './icons/house.svg')
  .attr('width', 35)
  .attr('height', 35)
  .attr('x', 20 + 8)
  .attr('y', 90 - 15 + 10 + 5)

  ///Airplane hours

container3.append('text')
  .attr('x', 30 + 60)
  .attr('y', 125 + 15 + 10)
  .style('font', '13px sans-serif')
  .style('color', 'black')
  .style("font-weight", 100)
  .text(`Emissions from flying`);

container3.append('text')
  .attr('x', 30 + 60 + 160)
  .attr('y', 125 + 15 + 10)
  .style('font', '15px sans-serif')
  .style('fill', '#3B77AF')
  .style("font-weight", 900)
  .text(`~${Math.round(hours_airplane)} `);

container3.append('text')
  .attr('x', 30 + 60 + 200)
  .attr('y', 125 + 15 + 10)
  .style('font', '13px sans-serif')
  .style('color', 'black')
  .style("font-weight", 100)
  .text(`hours as a passenger on an international flight`);

const airplane_image2 = container3.append('image')
  .attr("href", './icons/plane.svg')
  .attr('width', 50)
  .attr('height', 50)
  .attr('x', 20)
  .attr('y', 125 - 15 + 10)


///Acres US Forests

container3.append('text')
  .attr('x', 30 + 60)
  .attr('y', 160 + 15 + 10)
  .style('font', '13px sans-serif')
  .style('color', 'black')
  .style("font-weight", 100)
  .text(`Carbon sequestered by`);

container3.append('text')
  .attr('x', 30 + 60 + 160)
  .attr('y', 160 + 15 + 10)
  .style('font', '15px sans-serif')
  .style('fill', '#3B77AF')
  .style("font-weight", 900)
  .text(`~${Math.round(acres_us_forests)} `);

container3.append('text')
  .attr('x', 30 + 60 + 200)
  .attr('y', 160 + 15 + 10)
  .style('font', '13px sans-serif')
  .style('color', 'black')
  .style("font-weight", 100)
  .text(`acres of US forest in a year`);

const forest_image2 = container3.append('image')
  .attr("href", 'icons/forest.svg')
  .attr('width', 40)
  .attr('height', 40)
  .attr('x', 20 + 5)
  .attr('y', 160 - 15 + 10 + 5)

  ///Pickup Trucks coal

container3.append('text')
  .attr('x', 30 + 60)
  .attr('y', 195 + 15 + 10)
  .style('font', '13px sans-serif')
  .style('color', 'black')
  .style("font-weight", 100)
  .text(`Emissions from burning`);

container3.append('text')
  .attr('x', 30 + 60 + 160)
  .attr('y', 195 + 15 + 10)
  .style('font', '15px sans-serif')
  .style('fill', '#3B77AF')
  .style("font-weight", 900)
  .text(`~${Math.round(pickup_coal)} `);

container3.append('text')
  .attr('x', 30 + 60 + 200)
  .attr('y', 195 + 15 + 10)
  .style('font', '13px sans-serif')
  .style('color', 'black')
  .style("font-weight", 100)
  .text(`standard pickup trucks of coal`);

const coal_image2 = container3.append('image')
  .attr("href", 'icons/coal_pickup.svg')
  .attr('width', 50)
  .attr('height', 50)
  .attr('x', 20)
  .attr('y', 195 - 15 + 10)
