const margin = ({top: 10, right: 30, bottom: 30, left: 60})
const width = 300 - margin.left - margin.right
const height = 250//- margin.top - margin.bottom ------> EDIT HEIGHT to 200

// const average = 60000 //Average based on zip code, year, lifetime years owned
// const hybrid_average = 50000 // same as above
// const bev_average = 30000 // same as above

const input = `Input Vehicle`//Change to input from django
// const data = 20000 //Change to input from Django (kg)

// const life_years = 18 //Change based on input
//const life_miles = 178000 //Change based on input
// const emissions_per_year = data / life_years
// const emissions_per_mile = data / life_miles
// const round_emissions_per_mile = Math.round(100 * emissions_per_mile)/100

function outputViz() {
  getInput();
  makeBarchart();
  avg_emiPerMi_text();
  makeEquivalencies();
}

/////////////////////////////  NECESSARY FUNCTIONS //////////////////////////////////

function getInput() {
   const x = document.getElementById("roundedEmissions").innerHTML
   var formatted_number = x.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
   //const x = document.getElementById("avg_miles").innerHTML
   document.getElementById("vehicleInput").innerHTML = `Emissions Estimate for ${document.getElementById("yearmakemodel").innerHTML}`
  //  document.getElementById("totEmissionsOutput").innerHTML = `Lifetime Emissions: ${formatted_number} kgCO2e`
   document.getElementById("vehicleType").innerHTML = `Vehicle Type: ${document.getElementById("type_res").innerHTML}`
   document.getElementById("vehicleConfig").innerHTML = `Configuration: ${document.getElementById("config_res").innerHTML}`
  //  document.getElementById("regionAvgHead").innerHTML = `Your Region: ${document.getElementById("zip_res").innerHTML}`
}

/// function for per mile
function perMileFunction() {

  const life_miles = Number(document.getElementById("avg_miles").innerHTML.split(',').join("")) //Change based on input
  const data = Number(document.getElementById("totalEmissions").innerHTML.split(',').join(""))
  const emissions_per_mile = data / life_miles

  var x = Number(document.getElementById("miles").value.split(',').join("")); 
  var equi_emissions = x*emissions_per_mile

  var weeks = 0
  var days = 0 
  var hours = 0

  if (x > 9999 || x < 0) {
    document.getElementById("check_input").innerHTML = "Please enter a number between 0 and 9999."
    document.getElementById("emissions-output").innerHTML = "Estimated Emissions: <b>0 kgCO2e</b>";
    // document.getElementById("emissions-equi").innerHTML = "0 weeks        0 days        0 hours"
    // const iso = Math.round(document.getElementById("miles").value * emissions_per_mile / 0.904)
    // const iso_counts = Array.from(Array(iso).keys())

    const iso_container = d3.select("#isotopes")
      .append("svg")
      .append("g")

    iso_container
      .insert('rect')
      .attr('width', 700)
      .attr('height', 8000) // EDIT HEIGHT to height (200)
      .attr('x', 0)
      .attr('y', 0)
      .attr('fill', "white")

  } else {
  document.getElementById("check_input").innerHTML = ""
  document.getElementById("emissions-output").innerHTML = `Estimated Emissions: <b>${Math.round(equi_emissions * 100) / 100} kgCO2e</b>`
  
  // if (equi_emissions < 14.07) {//45.2) {
  
  // document.getElementById("emissions-equi").innerHTML = `${Math.round(equi_emissions / 0.586)} hours`// 0.904)} pounds of coal`
  // var hours = Math.round(equi_emissions / 0.586)// 0.904)
  // var houseIso = 'icons/house.svg'
  // var iconSize = 28

  // } else if (equi_emissions < 98.55) {//1356) {

    document.getElementById("emissions-equi").innerHTML = `~${Math.round(x * emissions_per_mile / 14.07)} days`//45.2)} fifty-pound bags of coal`
    weeks = Math.floor(equi_emissions / 98.55)// 45.2)
    var weeksTot = weeks * 98.55
    if (equi_emissions - weeksTot > 0) {
      days = Math.floor((equi_emissions - weeksTot)/ 14.07)
    }
    var stepTot = (days*14.07) + (weeks * 98.55)
    if (equi_emissions - stepTot > 0) {
      hours = Math.round((equi_emissions - stepTot)/ 0.586)
    }
    var houseIso = 'icons/house.svg'
    var iconSize = 30

  // } else {

  //   document.getElementById("emissions-equi").innerHTML = `~${Math.round(x * emissions_per_mile / 98.55)} weeks`/// 1356)} standard pickup trucks of coal`
  //   var iso = Math.round(x * emissions_per_mile / 98.55)//1356)
  //   var houseIso = 'icons/house.svg'
  //   var iconSize = 32

  // }
  //Isotopes
  
  var hours_iso_row = Math.ceil(hours / 4 )
  var days_iso_row = Math.ceil(days / 4 )
  var weeks_iso_row = Math.ceil(weeks / 4 )


  var hours_last_row = 4 - ((4 * hours_iso_row) - hours)
  var days_last_row = 4 - ((4 * days_iso_row) - days)
  var weeks_last_row = 4 - ((4 * weeks_iso_row) - weeks)
  


  // var last_col = last_row - (Math.floor(last_row / 5) * 5)
  // var last_full = Math.floor(last_row / 5)
  var hours_iso_last_height = (hours_iso_row - 1) * 30
  var days_iso_last_height = (days_iso_row - 1) * 30
  var weeks_iso_last_height = (weeks_iso_row - 1) * 30


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
    .attr('width', 700)
    .attr('height', 1000) // EDIT HEIGHT to height (200)
    .attr('x', 0)
    .attr('y', 0)
    .attr('fill', "white")

/// Weeks

if (weeks > 0) {

  for (let j = 0; j < weeks_iso_row - 1; j++) {
    for (let i = 0; i < 4; i++) {
      // for (let k = 0; k < 2; k++) {
        const weeks_pile = iso_container.append('image')
          .attr("href",houseIso)
          .attr('width', iconSize)
          .attr('height', iconSize)
          .attr('x', 10 + (35*i))// + (200*k))
          .attr('y', 60 + (30*j))
      // }
    }
  }

  for (let i = 0; i < weeks_last_row; i++) {
    const weeks_pile = iso_container.append('image')
    .attr("href", houseIso)
    .attr('width', iconSize)
    .attr('height', iconSize)
    .attr('x', 10 + (35*i))// + (last_full * 200))
    .attr('y', 60 + weeks_iso_last_height)
  }
}

////// Days

if (days > 0) {
  for (let j = 0; j < days_iso_row - 1; j++) {
    for (let i = 0; i < 4; i++) {
      // for (let k = 0; k < 2; k++) {
        const days_pile = iso_container.append('image')
          .attr("href",houseIso)
          .attr('width', iconSize)
          .attr('height', iconSize)
          .attr('x', 200 + (35*i))// + (200*k))
          .attr('y', 60 + (30*j))
      // }
    }
  }

  for (let i = 0; i < days_last_row; i++) {
    const days_pile = iso_container.append('image')
    .attr("href", houseIso)
    .attr('width', iconSize)
    .attr('height', iconSize)
    .attr('x', 200 + (35*i))// + (last_full * 200))
    .attr('y', 60 + days_iso_last_height)
  }
}

if (hours > 0) {

////// Hours
for (let j = 0; j < hours_iso_row - 1; j++) {
  for (let i = 0; i < 4; i++) {
    // for (let k = 0; k < 2; k++) {
      const hours_pile = iso_container.append('image')
        .attr("href",houseIso)
        .attr('width', iconSize)
        .attr('height', iconSize)
        .attr('x', 390 + (35*i))// + (200*k))
        .attr('y', 60 + (30*j))
    // }
  }
}

for (let i = 0; i < hours_last_row; i++) {
  const hours_pile = iso_container.append('image')
  .attr("href", houseIso)
  .attr('width', iconSize)
  .attr('height', iconSize)
  .attr('x', 390 + (35*i))// + (last_full * 200))
  .attr('y', 60 + hours_iso_last_height)
}
}

   iso_container.append('text')
    .attr('x', 30 )
    .attr('y', 40)
    .style('font', '18px sans-serif')
    .style('color', 'black')
    .style("font-weight", 900)
    .text(`${weeks} WEEKS`);

  iso_container.append('text')
    .attr('x', 225 )
    .attr('y', 40)
    .style('font', '18px sans-serif')
    .style('color', 'black')
    .style("font-weight", 900)
    .text(`${days} DAYS`);

  iso_container.append('text')
    .attr('x', 410 )
    .attr('y', 40)
    .style('font', '18px sans-serif')
    .style('color', 'black')
    .style("font-weight", 900)
    .text(`${hours} HOURS`);

  iso_container.append('text')
    .attr('x', 347 )
    .attr('y', 40)
    .style('font', '13px sans-serif')
    .style('color', 'black')
    .style("font-weight", 100)
    .text(`and`);

  iso_container.append('text')
    .attr('x', 162 )
    .attr('y', 40)
    .style('font', '13px sans-serif')
    .style('color', 'black')
    .style("font-weight", 100)
    .text(`and`);

  iso_container.append('line')
    .attr('x1', 170)
    .attr('x2', 170)
    .attr('y1', 50)
    .attr('y2', 1500)
    .style("stroke", "#D9D9D9")
    .style("stroke-width", 1)

  iso_container.append('line')
    .attr('x1', 355)
    .attr('x2', 355)
    .attr('y1', 50)
    .attr('y2', 1500)
    .style("stroke", "#D9D9D9")
    .style("stroke-width", 1)

  //   for (let i = 0; i < last_full; i++) {
  //     for (let j = 0; j < 5; j++) {
  //       const weeks_pile = iso_container.append('image')
  //       .attr("href", houseIso)
  //       .attr('width', iconSize)
  //       .attr('height', iconSize)
  //       .attr('x', 10 + (35*j) + (200*i))
  //       .attr('y', iso_last_height)
  //     }
  // }

  

  // iso_container.append('text')
  //   .attr('x', 0 )
  //   .attr('y', 25)
  //   .style('font', '13px sans-serif')
  //   .style('color', 'black')
  //   .style("font-weight", 100)
  //   .text(`${last_row}`);

  //   iso_container.append('text')
  //   .attr('x', 0 )
  //   .attr('y', 35)
  //   .style('font', '13px sans-serif')
  //   .style('color', 'black')
  //   .style("font-weight", 100)
  //   .text(`${iconSize}`);

  //   iso_container.append('text')
  //   .attr('x', 0 )
  //   .attr('y', 45)
  //   .style('font', '13px sans-serif')
  //   .style('color', 'black')
  //   .style("font-weight", 100)
  //   .text(`${x}`);

  //   iso_container.append('text')
  //   .attr('x', 0 )
  //   .attr('y', 55)
  //   .style('font', '13px sans-serif')
  //   .style('color', 'black')
  //   .style("font-weight", 100)
  //   .text(`${Math.round(equi_emissions)}`);
   }
}

//////AVERAGE EMISSIONS PER MILE TEXT
function avg_emiPerMi_text() {

  const life_years = document.getElementById("yearsOwn_res").innerHTML //Change based on input
  const life_miles = Number(document.getElementById("avg_miles").innerHTML.split(',').join(""))
  const data = document.getElementById("totalEmissions").innerHTML
  const emissions_per_mile = data / life_miles
  const round_emissions_per_mile = Math.round(100 * emissions_per_mile)/100

  document.getElementById("avg-emi-output").innerHTML = `Average Emissions Per Mile: <b>${round_emissions_per_mile} kgCO2e</b>`

// const avg_mi = d3.select("#avg_text")
//   .append("svg")
//   .append("g")

//  const rect = avg_mi.append("rect")
//   .attr("x", 0)
//   .attr("y", 0)
//   .attr("height", 200)
//   .attr("width", 400)
//   // .attr("rx", 15)
//   // .attr("ry", 15)
//   .style("fill", "white");

// avg_mi.append('text')
//   .attr('x', 0 )
//   .attr('y', 45)
//   .style('font', '14px')
//   .style('color', 'black')
//   .style("font-weight", 100)
//   .text(`Average Emissions Per Mile:`);
// avg_mi.append('text')
//   .attr('x', 195 )
//   .attr('y', 45)
//   .style('font', '14px')
//   .style('color', 'black')
//   .style("font-weight", 900)
//   .text(`${round_emissions_per_mile} kgCO2e`);
}


///////////////////////////BARCHART///////////////////////////////////////////////////
function makeBarchart() {

  const average = document.getElementById("ICEemissionAvg").innerHTML //Average based on zip code, year, lifetime years owned
  const hybrid_average = document.getElementById("PHEVemissionAvg").innerHTML // same as above
  const bev_average = document.getElementById("BEVemissionAvg").innerHTML // same as above
  const usphev_avg = document.getElementById("USPHEVemissionAvg").innerHTML
  const usbev_avg = document.getElementById("USBEVemissionAvg").innerHTML
  const data = document.getElementById("totalEmissions").innerHTML

  const rounded_data = document.getElementById("roundedEmissions").innerHTML
  const format_data = rounded_data.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  // const round_avg = (Math.round(average*100) / 100).toString()
  const round_avg = (Math.round(average)).toString()
  const format_avg = round_avg.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  // const round_hybrid = (Math.round(hybrid_average*100) / 100).toString()
  const round_hybrid = (Math.round(hybrid_average)).toString()
  const format_hybrid = round_hybrid.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  // const round_bev = (Math.round(bev_average*100) / 100).toString()
  const round_bev = (Math.round(bev_average)).toString()
  const format_bev = round_bev.replace(/\B(?=(\d{3})+(?!\d))/g, ",")


  const maxValue = Math.max(average, hybrid_average, bev_average, data, usbev_avg, usphev_avg)

  document.getElementById("input_tot_emi").innerHTML = `${format_data} kgCO2e`
  // document.getElementById("emiICEAvg").innerHTML = `Internal Combustion Engine Vehicle (ICE): ${format_avg} kgCO2e` +  `<br>`  + `Plug-In Hybrid Electric Vehicle (PHEV): ${format_hybrid} kgCO2e ` +  `<br>`  + `Battery-Electric Vehicle (BEV): ${format_bev} kgCO2e`
  document.getElementById("prodTablePer").innerHTML = `${document.getElementById("productionPercent").innerHTML} %`
  document.getElementById("useTablePer").innerHTML = `${document.getElementById("usagePercent").innerHTML} %`
  document.getElementById("eolTablePer").innerHTML = `${document.getElementById("eolPercent").innerHTML} %`
  // if (format_hybrid === "0") {
  //   document.getElementById("emiPHEVavg").innerHTML = `NA `
  // } else {
  //   document.getElementById("emiPHEVavg").innerHTML = `${format_hybrid} kgCO2e `
  // }
  // if (format_bev === "0") {
  //   document.getElementById("emiBEVavg").innerHTML = `NA`
  // } else {
  //   document.getElementById("emiBEVavg").innerHTML = `${format_bev} kgCO2e`
  // }




//Append SVG Object to the Page
const container = d3.select("#barChart")
  .append("svg")
  .append("g")


// container
//   .append('defs')
//   .append('pattern')
//   .attr('id', 'diagonalHatch')
//   .attr('patternUnits', 'userSpaceOnUse')
//   .attr('width', 4)
//   .attr('height', 4)
//   .append('path')
//   .attr('d', 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2')
//   .attr('stroke', '#D9D9D9')
//   .attr('stroke-width', 0.8)


const rect = container.append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("height", 400)
  .attr("width", 400)
  // .attr("rx", 15)
  // .attr("ry", 15)
  .style("fill", "white");

//yAxis
const y = d3.scaleLinear()
  // .domain([0, 75000])
  .domain([0, maxValue])
  .range([ height, 10]) // EDIT HEIGHT to height (200)

 const barchart2 = container
  .append("svg")
  .attr("width", width + margin.left + margin.right*2)
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
  .domain(['ICE', 'PHEV', 'EV', `${input}`])
  .range([ 0, 230 ])
  .padding(0.2);

/// Output bars
const input_bar2 = barchart2
.insert('rect')
.attr('width', 45)
.attr('height', height - y(data)) // EDIT HEIGHT to height (200)
.attr('x', 175)
.attr('y', y(data))
//.attr('fill', "#3B77AF")
.attr('fill', '#46B5B5')


/// Average bars
const avg_bar2 = barchart2
.insert('rect')
.attr('width', 45)
.attr('height', height - y(average)) // EDIT HEIGHT to height (200)
.attr('x', 10 )
.attr('y', y(average))
.attr('fill', "gray")

/// PHEV
const phev_bar2 = barchart2
.insert('rect')
.attr('width', 45)
.attr('height', height - y(hybrid_average)) // EDIT HEIGHT to height (200)
.attr('x', 65 )
.attr('y', y(hybrid_average))
.attr('fill', "gray")

// const USphev = barchart2.append("rect")
//       .attr("x", 55)
//       .attr("y", y(document.getElementById("USPHEVemissionAvg").innerHTML))
//       .attr("width", 30)
//       .attr("height", height - y(document.getElementById("USPHEVemissionAvg").innerHTML))
//       .attr('fill', 'url(#diagonalHatch)');

// barchart2.append("rect")
//     .attr("x", 0)
//     .attr("width", 100)
//     .attr("height", 100)
//     .attr('fill', 'url(#diagonalHatch)');

// const USphev = barchart2
//     .insert('line')
//     .attr('x1',55)
//     .attr('x2', 85)
//     .attr('y1', y(document.getElementById("USPHEVemissionAvg").innerHTML))
//     .attr('y2', y(document.getElementById("USPHEVemissionAvg").innerHTML))
//     .style("stroke", "red")
//     .style("stroke-width", 1)

// const USphev_label = barchart2
//     .append('text')
//     .attr('x', 51)
//     .attr('y', y(document.getElementById("USPHEVemissionAvg").innerHTML) - 9)
//     .style("font", "6.5px sans-serif")
//     .style('fill', 'red')
//     .text(`Average`)
// const USphev_label2 = barchart2
//     .append('text')
//     .attr('x', 51)
//     .attr('y', y(document.getElementById("USPHEVemissionAvg").innerHTML)-2)
//     .style("font", "6.5px sans-serif")
//     .style('fill', 'red')
//     .text(`US Grid Mix`)

/// BEV
const bev_bar2 = barchart2
.insert('rect')
.attr('width', 45)
.attr('height', height - y(bev_average)) // EDIT HEIGHT to height (200)
.attr('x', 120 )
.attr('y', y(bev_average))
.attr('fill', "gray")

// const USbev = barchart2.append("rect")
//       .attr("x", 97.5)
//       .attr("y", y(document.getElementById("USBEVemissionAvg").innerHTML))
//       .attr("width", 30)
//       .attr("height", height - y(document.getElementById("USBEVemissionAvg").innerHTML))
//       .attr('fill', 'url(#diagonalHatch)')

// const USbev = barchart2
//     .insert('line')
//     .attr('x1',97.5)
//     .attr('x2', 127.5)
//     .attr('y1', y(document.getElementById("USBEVemissionAvg").innerHTML))
//     .attr('y2', y(document.getElementById("USBEVemissionAvg").innerHTML))
//     .style("stroke", "red")
//     .style("stroke-width", 1)

// const USbev_label = barchart2
//     .append('text')
//     .attr('x', 93.5)
//     .attr('y', y(document.getElementById("USBEVemissionAvg").innerHTML) - 9)
//     .style("font", "6.5px sans-serif")
//     .style('fill', 'red')
//     .text(`Average`)
// const USbev_label2 = barchart2
//     .append('text')
//     .attr('x', 93.5)
//     .attr('y', y(document.getElementById("USBEVemissionAvg").innerHTML)-2)
//     .style("font", "6.5px sans-serif")
//     .style('fill', 'red')
//     .text(`US Grid Mix`)

// x axis
barchart2.append("g")
  .attr("transform", "translate(0," + height + ")") // EDIT HEIGHT to height (200)
  .call(d3.axisBottom(x2))
  .selectAll("text")
    .attr("transform", "translate(0,0)rotate(-30)")
    .style("text-anchor", "end");

// // labels
// const avg_emission_label2 = barchart2
//   .append('text')
//   .attr('x', 14)
//   .attr('y', y(average) + 10)
//   .style("font", "9.5px sans-serif")
//   .style('fill', 'white')
//   .text(`${Math.round(average)}`)

// const phev_label2 = barchart2
//   .append('text')
//   .attr('x', 56.5)
//   .attr('y', y(hybrid_average) + 10)
//   .style("font", "9.5px sans-serif")
//   .style('fill', 'white')
//   .text(`${Math.round(hybrid_average)}`)

// const bev_label2 = barchart2
//   .append('text')
//   .attr('x', 99)
//   .attr('y', y(bev_average) + 10)
//   .style("font", "9.5px sans-serif")
//   .style('fill', 'white')
//   .text(`${Math.round(bev_average)}`)

// const input_emission_label2 = barchart2
//   .append('text')
//   .attr('x', 141.5)
//   .attr('y', y(data) + 10)
//   .style("font", "9.5px sans-serif")
//   .style('fill', 'white')
//   .text(`${Math.round(data)}`)

const title2 = container
  .append('text')
  .attr('x', 0)
  .attr('y', 15) //310
  .style("font", "14px sans-serif")
  .text(`Lifetime Emissions Comparison to Vehicle Type Averages`)

// const reg_avg = container
//   .append('text')
//   .attr('x', 127)
//   .attr('y', 28) //310
//   .style("font", "9px sans-serif")
//   .text(`Regional Grid Mix`)
// container.append('rect')
//     .attr('x', 117)//width*2 +7)
//     .attr('y', 21)
//     .attr('width', 6)
//     .attr('height', 6)
//     .attr('fill', 'gray')
//     .style('opacity', 1)

// const us_avg = container
//   .append('text')
//   .attr('x', 127)
//   .attr('y', 38) //310
//   .style("font", "9px sans-serif")
//   .text(`Average US Grid Mix`)
// container.append('rect')
//   .attr('x', 120)//width*2 +7)
//   .attr('y', 31)
//   .attr('width', 6)
//   .attr('height', 6)
//   .attr('stroke', '#D9D9D9')
//   //.attr('fill', 'white')
//   .style('opacity', 1)
  // container.append('rect')
  // .attr('x', 117)//width*2 +7)
  // .attr('y', 31)
  // .attr('width', 6)
  // .attr('height', 6)
  // .attr('fill', 'url(#diagonalHatch)')
  // .attr('stroke', '#D9D9D9')
  // .style('opacity', 1)
}

///////////////////////////////////////////////////////////////////

function makeEquivalencies() {
  const data = document.getElementById("totalEmissions").innerHTML
  const life_years = document.getElementById("yearsOwn_res").innerHTML
  const life_miles = Number(document.getElementById("avg_miles").innerHTML.split(',').join(""))

// Conversions for Equivilencies -- source: https://www.epa.gov/energy/greenhouse-gases-equivalencies-calculator-calculations-and-references
// const gallons_gasoline = data / 8.887//kg
// const gallons_diesel = data / 10.180 // kg
const gas_power_vehicle_per_year = data / 4640//kg -- vehicle per year
const miles_avg_gas_vehicle =data / 0.403/ 100
const barrels_of_oil =  data / 430 //kg
const tanker_trucks_filled_gasoline = data / 75540 / 100 // kg
const incandescent_to_led_save = data / 26.4// bulbs replaced (kg)
const home_elec_use = data / 5139  // kg homes per year
const home_elec_use_days = data / (5139/365)  // kg homes per year
const urban_seedlings_decade = data / 60  //kg carbon sequestered over ten years per urban tree planted
const acres_us_forests = data / 840  // sequestered annually by one acre of avg US forest 
const acres_us_forests_lifetime = (data / 840) / life_years // sequestered annually by one acre of avg US forest --> vehicle lifetime
const propane_cylinders =data / 24  // kg per cylinder 
const railcars_coal = data / 181100  // railcars coal 
const trucks_coal = data / 40680  // semi trucks coal burned (assume 45,000 lbs of coal)
const pickup_coal = data / 1356  // pickup trucks coal burned (assume 1500 lbs of coal)
const pounds_coal = data / 0.904 // pounds coal
const smartphones_charged = data / 0.00822 // smartphones charged 
const hours_airplane = data / 250 //passenger on a plane (source: https://www.carbonindependent.org/22.html)
const round_trip_plane = data / 1150.58 //passenger on a plane (source: https://www.carbonindependent.org/22.html)
const food_waste = data / 1.151 // pounds of foodwaste (source: https://www.fao.org/3/i3347e/i3347e.pdf, https://www.newfoodmagazine.com/article/153960/food-waste-climate/#:~:text=Putting%20it%20into%20perspective,more%20potent%20than%20CO2.)
const pounds_beef = data / 45.3592 // https://ourworldindata.org/carbon-footprint-food-methane

////////////// LIFETIME EQUIVALENCIES ////////////////

///rectangle border for equivalencies

const container3 = d3.select("#equivalencies")
  .append("svg")
  .append("g")

const rectangle2 = container3.append("rect")
  .attr("width", 700)
  // .attr("width", 300)
  .attr("height", 130)
  // .attr("height", 280)
  .attr("x", 2) //270
  .attr("y", 45) //30
  .attr("fill", "white")
  .attr("stroke", "#46B5B5")
  .attr("stroke-width", 1.5)
  .attr('rx', 20);

 ////// ///Equivalency texts //////////
 container3.append('text')
 .attr('x', 20)
 .attr('y', 30)
 .style('font', '28px sans-serif')
 .style('fill', '#46B5B5')
 .style("font-weight", 900)
//  .text(`Lifetime emissions from ${input} are equivalent to:`);
.text(`Lifetime vehicle emissions equals:`);

  ///Airplane hours // Round Trip Plane

// container3.append('text')
//   .attr('x', 135) //30 + 60)
//   .attr('y', 75)//55 + 15 + 10)
//   .style('font', '15px sans-serif')
//   .style('fill', '#46B5B5')
//   .style("font-weight", 100)
//   // .text(`Emissions from flying`);
//   .text(`Emissions from taking`);

container3.append('text')
  .attr('x', 135) //30 + 60)
  .attr('y', 135)//55 + 15 + 10)
  .style('font', '15px sans-serif')
  .style('fill', '#46B5B5')
  .style("font-weight", 100)
  // .text(`Emissions from flying`);
  .text(`round trip flights from`);

  container3.append('text')
  .attr('x', 135) //30 + 60)
  .attr('y', 152)//55 + 15 + 10)
  .style('font', '15px sans-serif')
  .style('fill', '#46B5B5')
  .style("font-weight", 100)
  // .text(`Emissions from flying`);
  .text(`San Francisco to New York`);

container3.append('text')
  .attr('x', 135)// 30 + 60 + 160)
  .attr('y', 110)//55 + 15 + 10)
  .style('font', '48px sans-serif')//'15px sans-serif')
  .style('fill', '#46B5B5')
  .style("font-weight", 900)
  // .text(`~${Math.round(hours_airplane)} `);
  .text(`${Math.round(round_trip_plane)} `);
  

const airplane_image2 = container3.append('image')
  // .attr("href", './icons/plane_yellow.svg')
  .attr("href", './icons/plane_teal.svg')
  .attr('width', 80)//50)
  .attr('height', 80)//50)
  .attr('x', 30)
  .attr('y', 52)//55 - 15 + 10)

  //Forests

  var forest_life = []
  if (acres_us_forests_lifetime < 1) {
    forest_life = Math.round(100 * forest_life) / 100
  } else {
    forest_life = Math.round(acres_us_forests_lifetime)
  }

container3.append('text')
  .attr('x', 480)
  .attr('y', 110)
  .style('font', '48px sans-serif')
  .style('fill', '#46B5B5')
  .style("font-weight", 900)
  // .text(`${Math.round(acres_us_forests)} `);
  .text(`${forest_life}`);

// container3.append('text')
//   .attr('x', 480)
//   .attr('y', 75)
//   .style('font', '16px sans-serif')
//   .style('fill', '#46B5B5')
//   .style("font-weight", 100)
//   .text(`Carbon sequestered by`);

  container3.append('text')
  .attr('x', 480)
  .attr('y', 135)
  .style('font', '15px sans-serif')
  .style('fill', '#46B5B5')
  .style("font-weight", 100)
  .text(`acres of US forest sequestering`);
  // .text(`years of carbon sequestration`);

  container3.append('text')
  .attr('x', 480) //30 + 60)
  .attr('y', 152)//55 + 15 + 10)
  .style('font', '15px sans-serif')
  .style('fill', '#46B5B5')
  .style("font-weight", 100)
  .text(`carbon over vehicle lifetime`);
  // .text(`by one acre of US forest`);

const forest2 = container3.append('image')
  .attr("href", 'icons/forest_teal.svg')
  .attr('width', 80)
  .attr('height', 80)
  .attr('x', 375)
  .attr('y', 52)

///////Annual Euivalencies//////////////

  const container4 = d3.select("#equivalencies2")
  .append("svg")
  .append("g")

const rectangle3 = container4.append("rect")
  .attr("width", 700)
  // .attr("width", 300)
  .attr("height", 140)
  // .attr("height", 280)
  .attr("x", 2) //270
  .attr("y", 45) //30
  .attr("fill", "white")
  .attr("stroke", "#340068")
  .attr("stroke-width", 1.5)
  .attr('rx', 20);

 ////// ///Equivalency texts //////////
 container4.append('text')
 .attr('x', 20)
 .attr('y', 30)
 .style('font', '28px sans-serif')
 .style('fill', '#340068')
 .style("font-weight", 900)
//  .text(`Lifetime emissions from ${input} are equivalent to:`);
.text(`Annual vehicle emissions equals:`);

  ///days electricity use

  // container4.append('text')
  // .attr('x', 135) //30 + 60)
  // .attr('y', 75)//55 + 15 + 10)
  // .style('font', '15px sans-serif')
  // .style('fill', '#481A77')
  // .style("font-weight", 100)
  // // .text(`Emissions from flying`);
  // .text(`Emissions from`);

  container4.append('text')
  .attr('x', 135) //30 + 60)
  .attr('y', 135)//55 + 15 + 10)
  .style('font', '15px sans-serif')
  .style('fill', '#481A77')
  .style("font-weight", 100)
  // .text(`Emissions from flying`);
  .text(`days of electricity use in an`);

  container4.append('text')
  .attr('x', 135) //30 + 60)
  .attr('y', 152)//55 + 15 + 10)
  .style('font', '15px sans-serif')
  .style('fill', '#481A77')
  .style("font-weight", 100)
  // .text(`Emissions from flying`);
  .text(`average American household`);

container4.append('text')
  .attr('x', 135)// 30 + 60 + 160)
  .attr('y', 110)//55 + 15 + 10)
  .style('font', '48px sans-serif')//'15px sans-serif')
  .style('fill', '#481A77')
  .style("font-weight", 900)
  // .text(`~${Math.round(hours_airplane)} `);
  .text(`${Math.round(home_elec_use_days/life_years)} `);
  

const house2 = container4.append('image')
  // .attr("href", './icons/plane.svg')
  .attr("href", './icons/house_purple.svg')
  .attr('width', 75)//50)
  .attr('height', 75)//50)
  .attr('x', 30)
  .attr('y', 52)//55 - 15 + 10)

  ///Beef

  // container4.append('text')
  // .attr('x', 480) //30 + 60)
  // .attr('y', 75)//55 + 15 + 10)
  // .style('font', '15px sans-serif')
  // .style('fill', '#340068')
  // .style("font-weight", 100)
  // // .text(`Emissions from flying`);
  // .text(`Emissions from producing`);
  
  container4.append('text')
    .attr('x', 480)
    .attr('y', 110)
    .style('font', '48px sans-serif')
    .style('fill', '#340068')
    .style("font-weight", 900)
    .text(`${Math.round(pounds_beef / life_years)} `);
  
  container4.append('text')
    .attr('x', 480)
    .attr('y', 135)
    .style('font', '15px sans-serif')
    .style('fill', '#340068')
    .style("font-weight", 100)
    .text(`pounds of beef from`);

  container4.append('text')
  .attr('x', 480) //30 + 60)
  .attr('y', 152)//55 + 15 + 10)
  .style('font', '15px sans-serif')
  .style('fill', '#481A77')
  .style("font-weight", 100)
  // .text(`Emissions from flying`);
  .text(`cattle raised for meat`);
  
  const beef_image = container4.append('image')
    .attr("href", 'icons/cattle_purple.svg')
    .attr('width', 80)
    .attr('height', 80)
    .attr('x', 375)
    .attr('y', 52)

  ///Forest

// container4.append('text')
//   .attr('x', 480)
//   .attr('y', 120)
//   .style('font', '48px sans-serif')
//   .style('fill', '#481A77')
//   .style("font-weight", 900)
//   .text(`${Math.round(acres_us_forests/life_years)} `);

// container4.append('text')
//   .attr('x', 480)
//   .attr('y', 75)
//   .style('font', '16px sans-serif')
//   .style('fill', '#481A77')
//   .style("font-weight", 100)
//   .text(`Carbon sequestered by`);

//   container4.append('text')
//   .attr('x', 480)
//   .attr('y', 145)
//   .style('font', '16px sans-serif')
//   .style('fill', '#481A77')
//   .style("font-weight", 100)
//   .text(`acres of US forest in a year`);

// const forest2 = container4.append('image')
//   .attr("href", 'icons/forest_purple.svg')
//   .attr('width', 80)
//   .attr('height', 80)
//   .attr('x', 375)
//   .attr('y', 62)

// ////// ///Equivalency texts -- PER YEAR //////////
// container3.append('text')
// .attr('x', 20)
// .attr('y', 30 + 15 + 138)
// .style('font', '16px sans-serif')
// .style('color', 'black')
// .style("font-weight", 900)
// // .text(`Annual emissions from ${input} are equivalent to:`);
// .text(`Annual vehicle emissions equals:`);

// ///Gas powered vehicles

// container3.append('text')
// .attr('x', 30 + 60)
// .attr('y', 55 + 15 + 20 + 125)
// .style('font', '13px sans-serif')
// .style('color', 'black')
// .style("font-weight", 100)
// .text(`Emissions from`);

// container3.append('text')
// .attr('x', 30 + 60 + 160)
// .attr('y', 55 + 15 + 20 + 125)
// .style('font', '15px sans-serif')
// .style('fill', '#46B5B5')
// .style("font-weight", 900)
// .text(`${Math.round(100 * gas_power_vehicle_per_year/life_years) / 100} `);

// container3.append('text')
// .attr('x', 30 + 60 + 240)
// .attr('y', 55 + 15 + 20 + 125)
// .style('font', '13px sans-serif')
// .style('color', 'black')
// .style("font-weight", 100)
// .text(`gas-powered vehicles in a year`);

// const vehicle_image = container3.append('image')
// .attr("href", './icons/gascar2.svg')
// .attr('width', 50)
// .attr('height', 50)
// .attr('x', 20)
// .attr('y', 55 - 15 + 20 + 125)


// ///Energy in American homes per year

// container3.append('text')
// .attr('x', 30 + 60)
// .attr('y', 90 + 15 + 20 + 125)
// .style('font', '13px sans-serif')
// .style('color', 'black')
// .style("font-weight", 100)
// .text(`Electricity emissions from`);

// container3.append('text')
// .attr('x', 30 + 60 + 160)
// .attr('y', 90 + 15 + 20 + 125)
// .style('font', '15px sans-serif')
// .style('fill', '#46B5B5')
// .style("font-weight", 900)
// .text(`${Math.round(100 * home_elec_use/life_years) / 100} `);

// container3.append('text')
// .attr('x', 30 + 60 + 240)
// .attr('y', 90 + 15 + 20 + 125)
// .style('font', '13px sans-serif')
// .style('color', 'black')
// .style("font-weight", 100)
// .text(`American homes in a year`);

// const home_image = container3.append('image')
// .attr("href", './icons/house.svg')
// .attr('width', 35)
// .attr('height', 35)
// .attr('x', 20 + 8)
// .attr('y', 90 - 15 + 20 + 125)

// ///Acres US Forests

// container3.append('text')
// .attr('x', 30 + 60)
// .attr('y', 125 + 15 + 20 + 125)
// .style('font', '13px sans-serif')
// .style('color', 'black')
// .style("font-weight", 100)
// .text(`Carbon sequestered by`);

// container3.append('text')
// .attr('x', 30 + 60 + 160)
// .attr('y', 125 + 15 + 20 + 125)
// .style('font', '15px sans-serif')
// .style('fill', '#46B5B5')
// .style("font-weight", 900)
// .text(`${Math.round(100 * acres_us_forests/life_years) / 100} `);

// container3.append('text')
// .attr('x', 30 + 60 + 240)
// .attr('y', 125 + 15 + 20 + 125)
// .style('font', '13px sans-serif')
// .style('color', 'black')
// .style("font-weight", 100)
// .text(`acres of US forest in a year`);

// const forest_image = container3.append('image')
// .attr("href", 'icons/forest.svg')
// .attr('width', 40)
// .attr('height', 40)
// .attr('x', 20 + 5)
// .attr('y', 125 - 15 + 20 + 5 + 125) 
// .style('fill', 'blue')

}

// /////////////////////////////////////////////////////////////////////////////////////////////////
//  ////// YEARLY EQUIVALENCIES
 
//   ///rectangle border for equivalencies

// const container2 = d3.select("#equivalencies")
// .append("svg")
// .append("g")

// const rectangle = container2.append("rect")
// .attr("width", 575)
// .attr("height", 225)
// .attr("x", 0) //270
// .attr("y", 15) //30
// .attr("fill", "white")
// .attr("stroke", "#FFB51A")
// .attr("stroke-width", 1.5)
// .attr('rx', 20);

// ////// ///Equivalency texts -- PER YEAR //////////
// container2.append('text')
// .attr('x', 20)
// .attr('y', 30 + 15)
// .style('font', '16px sans-serif')
// .style('color', 'black')
// .style("font-weight", 900)
// .text(`Yearly emissions from ${input} over ${life_years} years are equivalent to:`);

// ///Gas powered vehicles

// container2.append('text')
// .attr('x', 30 + 60)
// .attr('y', 55 + 15 + 10)
// .style('font', '13px sans-serif')
// .style('color', 'black')
// .style("font-weight", 100)
// .text(`Emissions from`);

// container2.append('text')
// .attr('x', 30 + 60 + 160)
// .attr('y', 55 + 15 + 10)
// .style('font', '15px sans-serif')
// .style('fill', '#46B5B5')
// .style("font-weight", 900)
// .text(`${Math.round(100 * gas_power_vehicle_per_year/life_years) / 100} `);

// container2.append('text')
// .attr('x', 30 + 60 + 200)
// .attr('y', 55 + 15 + 10)
// .style('font', '13px sans-serif')
// .style('color', 'black')
// .style("font-weight", 100)
// .text(`gas-powered vehicles in a year`);

// const vehicle_image = container2.append('image')
// .attr("href", './icons/gascar2.svg')
// .attr('width', 50)
// .attr('height', 50)
// .attr('x', 20)
// .attr('y', 55 - 15 + 10)


// ///Energy in American homes per year

// container2.append('text')
// .attr('x', 30 + 60)
// .attr('y', 90 + 15 + 10)
// .style('font', '13px sans-serif')
// .style('color', 'black')
// .style("font-weight", 100)
// .text(`Electricity emissions from`);

// container2.append('text')
// .attr('x', 30 + 60 + 160)
// .attr('y', 90 + 15 + 10)
// .style('font', '15px sans-serif')
// .style('fill', '#46B5B5')
// .style("font-weight", 900)
// .text(`${Math.round(100 * home_elec_use/life_years) / 100} `);

// container2.append('text')
// .attr('x', 30 + 60 + 200)
// .attr('y', 90 + 15 + 10)
// .style('font', '13px sans-serif')
// .style('color', 'black')
// .style("font-weight", 100)
// .text(`American homes in a year`);

// const home_image = container2.append('image')
// .attr("href", './icons/house.svg')
// .attr('width', 35)
// .attr('height', 35)
// .attr('x', 20 + 8)
// .attr('y', 90 - 15 + 10 + 5)

// ///Airplane hours

// container2.append('text')
// .attr('x', 30 + 60)
// .attr('y', 125 + 15 + 10)
// .style('font', '13px sans-serif')
// .style('color', 'black')
// .style("font-weight", 100)
// .text(`Emissions from flying`);

// container2.append('text')
// .attr('x', 30 + 60 + 160)
// .attr('y', 125 + 15 + 10)
// .style('font', '15px sans-serif')
// .style('fill', '#46B5B5')
// .style("font-weight", 900)
// .text(`${Math.round(100 * hours_airplane/life_years) / 100} `);

// container2.append('text')
// .attr('x', 30 + 60 + 200)
// .attr('y', 125 + 15 + 10)
// .style('font', '13px sans-serif')
// .style('color', 'black')
// .style("font-weight", 100)
// .text(`hours as a passenger on an international flight`);

// const airplane_image = container2.append('image')
// .attr("href", './icons/plane.svg')
// .attr('width', 50)
// .attr('height', 50)
// .attr('x', 20)
// .attr('y', 125 - 15 + 10)


// ///Acres US Forests

// container2.append('text')
// .attr('x', 30 + 60)
// .attr('y', 160 + 15 + 10)
// .style('font', '13px sans-serif')
// .style('color', 'black')
// .style("font-weight", 100)
// .text(`Carbon sequestered by`);

// container2.append('text')
// .attr('x', 30 + 60 + 160)
// .attr('y', 160 + 15 + 10)
// .style('font', '15px sans-serif')
// .style('fill', '#46B5B5')
// .style("font-weight", 900)
// .text(`${Math.round(100 * acres_us_forests/life_years) / 100} `);

// container2.append('text')
// .attr('x', 30 + 60 + 200)
// .attr('y', 160 + 15 + 10)
// .style('font', '13px sans-serif')
// .style('color', 'black')
// .style("font-weight", 100)
// .text(`acres of US forest in a year`);

// const forest_image = container2.append('image')
// .attr("href", 'icons/forest.svg')
// .attr('width', 40)
// .attr('height', 40)
// .attr('x', 20 + 5)
// .attr('y', 160 - 15 + 10 + 5) 
// .style('fill', 'blue')

// ///Pickup Trucks coal

// container2.append('text')
// .attr('x', 30 + 60)
// .attr('y', 195 + 15 + 10)
// .style('font', '13px sans-serif')
// .style('color', 'black')
// .style("font-weight", 100)
// .text(`Emissions from burning`);

// container2.append('text')
// .attr('x', 30 + 60 + 160)
// .attr('y', 195 + 15 + 10)
// .style('font', '15px sans-serif')
// .style('fill', '#46B5B5')
// .style("font-weight", 900)
// .text(`${Math.round(100 * pickup_coal/life_years) / 100} `);

// container2.append('text')
// .attr('x', 30 + 60 + 200)
// .attr('y', 195 + 15 + 10)
// .style('font', '13px sans-serif')
// .style('color', 'black')
// .style("font-weight", 100)
// .text(`standard pickup trucks of coal`);

// const coal_image = container2.append('image')
// .attr("href", 'icons/coal_pickup.svg')
// .attr('width', 50)
// .attr('height', 50)
// .attr('x', 20)
// .attr('y', 195 - 15 + 10)

// // ////Burning Pounds of Coal
// }
