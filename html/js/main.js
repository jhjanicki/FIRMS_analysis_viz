window.onload = function () {
  $("#loading").hide();

  ////////////////////////////////
  //// auto screen reoload  /////
  ///////////////////////////////
  var windowWidth = $(window).width();
  var windowHeight = $(window).height();
  $(window).resize(function () {
    if (
      windowWidth != $(window).width() ||
      windowHeight != $(window).height()
    ) {
      location.reload();
      return;
    }
  });

  //Data Prep
  var dataByCountry = d3
    .nest()
    .key(function (d) {
      return d.country;
    })
    .entries(data);

  var countries2019 = [
    "Democratic Republic of the Congo",
    "Angola",
    "Russia",
    "Brazil",
    "Zambia",
    "Australia",
    "Mozambique",
    "United States",
    "Mexico",
    "Central African Republic",
    "Sudan",
    "Bolivia",
    "China",
    "Indonesia",
    "United Republic of Tanzania",
    "Venezuela",
    "India",
    "Burma",
    "Guinea",
    "Lao People's Democratic Republic",
    "Kazakhstan",
    "Nigeria",
    "Iraq",
    "Argentina",
    "Madagascar",
    "Canada",
    "Ethiopia",
    "South Africa",
    "Paraguay",
    "Thailand",
    "Cambodia",
    "Cameroon",
    "Colombia",
    "Ghana",
    "Sierra Leone",
    "Ukraine",
    "Congo",
    "Zimbabwe",
    "Iran",
    "Viet Nam",
    "Peru",
    "Chad",
    "Cote d'Ivoire",
    "Liberia",
    "Mali",
    "Uganda",
    "Honduras",
    "Senegal",
    "Guatemala",
    "Algeria",
    "Pakistan",
    "Philippines",
    "Botswana",
    "Benin",
    "Malawi",
    "Chile",
    "Nicaragua",
    "Turkey",
    "Italy",
    "Syria",
    "Guinea-Bissau",
    "Togo",
    "Namibia",
    "Malaysia",
    "Romania",
    "Cuba",
    "Nepal",
    "Burkina Faso",
    "Libya",
    "Papua New Guinea",
    "Kenya",
    "Panama",
    "Spain",
    "Bangladesh",
    "Turkmenistan",
    "Belarus",
    "France",
    "Bulgaria",
    "Germany",
    "Uzbekistan",
    "Swaziland",
    "Japan",
    "Gabon",
    "Saudi Arabia",
    "Belize",
    "Azerbaijan",
    "Guyana",
    "Ecuador",
    "Serbia",
    "El Salvador",
    "Dominican Republic",
    "Korea, Democratic People's Republic of",
    "Costa Rica",
    "Oman",
    "Mongolia",
    "Portugal",
    "Egypt",
    "Sri Lanka",
    "The former Yugoslav Republic of Macedonia",
    "United Kingdom",
    "Uruguay",
    "Bosnia and Herzegovina",
    "Greece",
    "Korea, Republic of",
    "New Zealand",
    "Poland",
    "Gambia",
    "Kuwait",
    "Belgium",
    "Burundi",
    "Republic of Moldova",
    "Niger",
    "Albania",
    "Austria",
    "Croatia",
    "Kyrgyzstan",
    "Georgia",
    "Hungary",
    "Suriname",
    "Lesotho",
    "Qatar",
    "Montenegro",
    "Timor-Leste",
    "Somalia",
    "Morocco",
    "Netherlands",
    "Reunion",
    "Eritrea",
    "Taiwan",
    "Haiti",
    "Slovakia",
    "Tunisia",
    "Vanuatu",
    "Equatorial Guinea",
    "Rwanda",
    "Sweden",
    "Mauritania",
    "Armenia",
    "Jamaica",
    "United Arab Emirates",
    "Czech Republic",
    "New Caledonia",
    "Trinidad and Tobago",
    "Bahamas",
    "Fiji",
    "Afghanistan",
    "Bhutan",
    "Greenland",
    "Norway",
    "Yemen",
    "Lithuania",
    "Israel",
    "Latvia",
    "Finland",
    "Puerto Rico",
    "Tajikistan",
    "Palestine",
    "Luxembourg",
    "Denmark",
    "Ireland",
    "French Guiana",
    "Switzerland",
    "Jordan",
    "Djibouti",
    "Lebanon",
    "Brunei Darussalam",
    "Comoros",
    "Mauritius",
    "Slovenia",
    "Estonia",
    "Guam",
    "Samoa",
    "United States Minor Outlying Islands",
    "Cyprus",
    "French Polynesia",
    "Northern Mariana Islands",
    "Sao Tome and Principe",
    "Barbados",
    "Maldives",
    "Bahrain",
    "Tonga",
    "Solomon Islands",
    "Cape Verde",
    "Dominica",
    "Saint Kitts and Nevis",
    "Guadeloupe",
    "Hong Kong",
    "Montserrat",
    "Singapore",
    "Martinique",
    "Mayotte",
    "Saint Lucia",
    "Andorra",
    "French Southern and Antarctic Lands",
    "Grenada",
    "Guernsey",
    "Jersey",
    "Kiribati",
    "Malta",
    "Iceland",
  ];
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var indexArray = [...Array(200).keys()];

  indexArray = indexArray.map(function (value) {
    return value + 1;
  });

  //Set up
  var windowWidth = document.documentElement.clientWidth;
  var mobile = false;
  var fullWidth = false;
  var mediumWidth = false;
  var smallWidth = false;

  var minWidth = 450,
    // maxWidth = document.documentElement.clientWidth > 1200 ? 1000 : 800,
    scrollBarPadding = 10;

  if (document.documentElement.clientWidth >= 1350) {
    fullWidth = true;
    maxWidth = 1000;
  }

  if (
    document.documentElement.clientWidth >= 1100 &&
    document.documentElement.clientWidth < 1350
  ) {
    fullWidth = true;
    maxWidth = 900;
  }
  if (
    document.documentElement.clientWidth >= 550 &&
    document.documentElement.clientWidth < 1100
  ) {
    mediumWidth = true;
    maxWidth = 800;
    d3.select(".block")
      .style("margin-left", "10px")
      .style("max-width", "200px");
  }
  if (document.documentElement.clientWidth < 550) {
    smallWidth = true;
    maxWidth = 550;
  }

  if (
    /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    mobile = true;
  }

  var outerWidth = Math.max(
    minWidth,
    Math.min(document.documentElement.clientWidth - scrollBarPadding, maxWidth)
  );

  //Scale to figure out the optimum left and right margins
  var widthScale = d3.scaleLinear().domain([450, 1000]).range([60, 150]);

  var margin = {
    top: Math.round(widthScale(outerWidth)) * 0.5,
    right: Math.round(widthScale(outerWidth)) * 0.6,
    bottom: Math.round(widthScale(outerWidth)) * 0.5,
    left: Math.round(widthScale(outerWidth)) * 0.6,
  };
  //Finally the actual width and height of the fight visual
  var width = outerWidth - margin.left - margin.right;
  var height = 8 * width;
  var width2 = 150;

  var tooltip = floatingTooltip("gates_tooltip", 240);

  //SVG 1
  var width1 = outerWidth / 2;
  if (document.documentElement.clientWidth >= 800) {
    width1 = Math.max(width1, 650);
  }
  var height1 = width1;
  var svg1 = d3
    .select("#chart1")
    .append("svg")
    .attr("width", width1 + margin.left + margin.right)
    .attr("height", height1 + margin.top + margin.bottom);
  var innerRadius = 10;
  var outerRadius = 300;
  if (smallWidth || mobile) {
    outerRadius = 130;
  }
  if (mediumWidth) {
    outerRadius = 230;
  }
  var g1 = svg1
    .append("g")
    .attr("class", "g1")
    .attr(
      "transform",
      "translate(" +
        (width1 + margin.left + margin.right) / 2 +
        "," +
        (height1 + margin.top + margin.bottom) / 2 +
        ")"
    );

  //DOM interactions and global vars
  var clicked = false;
  var clickedID = "";
  var clickedIDArray = [];
  var scroll = true;
  var selectedCountry = "";
  var reset = false;
  var controller = new ScrollMagic.Controller();

  //https://codepen.io/cl0udc0ntr0l/pen/xhBtF
  $(".toggle").click(function (e) {
    e.preventDefault(); // The flicker is a codepen thing
    $(this).toggleClass("toggle-on");
    scroll = !scroll;
    if (scroll) {
      d3.selectAll(".toc").style("opacity", 1);
      $(".reset").css("opacity", 0);
      clicked = false;
      clickedIDArray = [];
      d3.selectAll(".countries path").style("opacity", 0.8);
      reset.attr("opacity", 0);
    } else {
      d3.selectAll(".toc").style("opacity", 0);
    }
  });

  $(".reset").hover(function (e) {
    e.preventDefault(); // The flicker is a codepen thing
    $(this).toggleClass("reset-on");
  });

  $(".reset").click(function (e) {
    e.preventDefault(); // The flicker is a codepen thing
    $(this).css("opacity", 0);
  });

  $("#howto").on("click", function (e) {
    $("#howtoimg").toggle("slow");
    $(this).text(function (i, text) {
      return text === "Display 'read-chart' instructions"
        ? "Close 'read-chart' instructions"
        : "Display 'read-chart' instructions";
    });
  });

  if (smallWidth || mobile) {
    d3.select("#buttonWrap").style("display", "none");
  } else {
    d3.select("#buttonWrap2").style("display", "none");
  }

  // Scales for SVG 1

  var x1 = d3
    .scaleBand()
    .range([0, 2 * Math.PI])
    .align(0);

  var y1 = d3.scaleLinear().range([innerRadius, outerRadius]);

  var z1 = d3
    .scaleOrdinal()
    .domain([
      "count2010",
      "count2011",
      "count2012",
      "count2013",
      "count2014",
      "count2015",
      "count2016",
      "count2017",
      "count2018",
    ])
    .range([
      "#7D213E",
      "#9B3D46",
      "#BC6B4D",
      "#C5895B",
      "#C9A46E",
      "#D1C58F",
      "#7E9778",
      "#689890",
      "#466675",
      "#494778",
    ]);

  d3.csv(
    "../data/data_bymonth.csv",
    function (d, i, columns) {
      for (i = 1, t = 0; i < columns.length; ++i)
        t += d[columns[i]] = +d[columns[i]];
      d.month = +d.month;
      d.total = t;
      return d;
    },
    function (error, dataMonth) {
      x1.domain(
        dataMonth.map(function (d) {
          return d.month;
        })
      );
      y1.domain([
        0,
        d3.max(dataMonth, function (d) {
          return d.total;
        }),
      ]);

      g1.selectAll("g")
        .data(d3.stack().keys(dataMonth.columns.slice(1))(dataMonth))
        .enter()
        .append("g")
        .attr("class", function (d) {
          return d.key;
        })
        .attr("fill", function (d) {
          return z1(d.key);
        })
        .selectAll("path")
        .data(function (d, i) {
          return d;
        })
        .enter()
        .append("path")
        .attr(
          "d",
          d3
            .arc()
            .innerRadius(function (d) {
              return y1(d[0]);
            })
            .outerRadius(function (d) {
              return y1(d[1]);
            })
            .startAngle(function (d) {
              return x1(d.data.month);
            })
            .endAngle(function (d) {
              return x1(d.data.month) + x1.bandwidth();
            })
            .padAngle(0.05)
            .padRadius(innerRadius)
        )
        .attr("class", function (d) {
          var year = figureOutYear(d[1] - d[0], d.data);
          return year + "_inner";
        })
        .attr("id", function (d) {
          return "id_" + d[0] + "_" + d[1];
        })
        .on("mouseenter", showDetail)
        .on("mouseout", hideDetail);

      var textArcs = g1
        .append("g")
        .attr("class", "monthArc")
        .selectAll("path")
        .data(months)
        .enter()
        .append("path")
        .attr("fill", "#EB706B")
        .attr("id", function (d, i) {
          return "monthArc_" + i;
        })
        .attr(
          "d",
          d3
            .arc()
            .innerRadius(outerRadius + 3)
            .outerRadius(outerRadius + 5)
            .startAngle(function (d, i) {
              return (30 * i * Math.PI) / 180;
            })
            .endAngle(function (d, i) {
              return (30 * (i + 1) * Math.PI) / 180;
            })
            .padAngle(0.02)
        );

      g1.selectAll(".monthText")
        .data(months)
        .enter()
        .append("text")
        .attr("class", "monthText")
        .append("textPath")
        .attr("xlink:href", function (d, i) {
          return "#monthArc_" + i;
        })
        .text(function (d) {
          return d;
        })
        .attr("fill", "white");
    }
  );

  function figureOutYear(diff, array) {
    return _.invert(array)[diff];
  }

  function showDetail(d) {
    // change outline to indicate hover state.
    var year = figureOutYear(d[1] - d[0], d.data);
    var thisID = "#id_" + d[0] + "_" + d[1];
    d3.select(thisID).style("cursor", "pointer");

    var texture = textures
      .lines()
      .size(5)
      .strokeWidth(3)
      .stroke(function () {
        return z1(year);
      });

    svg.call(texture);
    d3.selectAll("." + year + "_inner").attr("fill", texture.url());

    var count = d.data[year];
    year = year.split("t")[1];

    var content =
      '<span class="">Year<b> ' +
      year +
      "</b></span><br/><br/>" +
      '<span class="name">Fire count<b> ' +
      count +
      '</b></span><span class="value"><i></i>' +
      "</span><br/>";

    tooltip.showTooltip(content, d3.event);
  }

  function hideDetail(d) {
    var year = figureOutYear(d[1] - d[0], d.data);

    var thisID = "#id_" + d[0] + "_" + d[1];
    //d3.selectAll(".g1 g path").attr("opacity",1);

    d3.selectAll("." + year + "_inner").attr("fill", function (d) {
      return z1(year);
    });

    tooltip.hideTooltip();
  }

  //SVG 2
  var svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  //G
  var g = svg
    .append("g")
    .attr("class", "wrapper")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  //Scales
  var x = d3.scaleLinear().domain([2010, 2019]).range([0, width]),
    y = d3.scaleLinear().domain([1, 200]).range([0, height]),
    xAxis = d3.axisBottom(x).ticks(10).tickFormat(d3.format("d")).tickSize(0),
    yAxis = d3.axisLeft(y).ticks(200).tickSize(0),
    countPosition = d3.scaleOrdinal().domain(countries2019).range(indexArray); //not used

  var color = d3
    .scaleSequential()
    .domain([1, 220]) // move from 200 to 220 to avoid the darker blues
    .interpolator(d3.interpolateSpectral);

  // var ranks = Array.from({length: 200}, (v, k) => k+1);
  // var color = d3.scaleOrdinal().domain(ranks).range(d3.schemeSet2);
  var strokeScale = d3.scaleLinear().domain([1, 200]).range([10, 3]);

  var line = d3
    .line()
    .x(function (d) {
      return x(d.year);
    })
    .y(function (d) {
      return y(d.rank);
    });

  var voronoi = d3
    .voronoi()
    .x(function (d) {
      return x(d.year);
    })
    .y(function (d) {
      return y(d.rank);
    })
    .extent([
      [-margin.left, -margin.top],
      [width, height + margin.bottom],
    ]);

  g.append("g")
    .attr("class", "axis axis--x")
    .style("font-size", 13)
    .attr("transform", "translate(0," + (height + 15) + ")")
    .call(xAxis);

  g.append("g")
    .attr("class", "axis axis--y")
    .attr("transform", "translate(-10,0)")
    .call(yAxis)
    .append("text")
    .attr("class", "titles")
    .attr("transform", "rotate(-90)")
    .attr("x", -margin.top - 40)
    .attr("y", -35)
    .attr("dy", ".71em")
    .attr("fill", "white")
    .style("font-family", "PT Sans Narrow")
    .style("font-size", 16)
    .style("text-anchor", "middle")
    .text("Country Rank in Number of Fires (Top 200)");

  g.append("g")
    .attr("class", "axis axis--x2")
    .style("font-size", 13)
    .attr("transform", "translate(0,-25)")
    .call(xAxis);

  d3.select(".axis--y")
    .selectAll("text")
    .attr("id", function (d, i) {
      return "axisText" + (i + 1);
    });

  g.append("g")
    .attr("class", "countries")
    .selectAll("path")
    .data(dataByCountry)
    .enter()
    .append("path")
    .style("stroke", function (d) {
      var data = d.values.filter((d1) => d1.year == 2019);
      if (_.has(data[0], "rank")) {
        return color(data[0].rank);
      } else {
        return "rgb(90, 85, 165)";
      }
    })
    .style("stroke-width", function (d) {
      var data = d.values.filter((d1) => d1.year == 2019);
      if (_.has(data[0], "rank")) {
        return strokeScale(data[0].rank);
      } else {
        return 2;
      }
    })
    .attr("d", function (d) {
      d.line = this;
      return line(d.values);
    })
    .attr("id", function (d) {
      var key = d.key.split(" ").join("_");
      key = key.split("'").join("_");
      return key;
    });

  var focus = g
    .append("g")
    .attr("transform", "translate(-100,-100)")
    .attr("class", "focus");

  focus.append("circle").attr("r", 3.5);

  focus.append("text").attr("y", -20);

  var focusCount = g
    .append("g")
    .attr("transform", "translate(-100,-100)")
    .attr("class", "focusCount");

  focusCount
    .append("circle")
    .attr("r", 30)
    .attr("transform", "translate(22,-5)")
    .attr("fill", "white")
    .attr("opacity", 0.6);

  focusCount.append("text");

  var voronoiGroup = g.append("g").attr("class", "voronoi");

  voronoiGroup
    .selectAll("path")
    .data(
      voronoi.polygons(
        d3.merge(
          dataByCountry.map(function (d) {
            return d.values;
          })
        )
      )
    )
    .enter()
    .append("path")
    .attr("d", function (d) {
      return d ? "M" + d.join("L") + "Z" : null;
    })
    .attr("id", function (d) {
      var key = d.data.country.split(" ").join("_");
      key = key.split("'").join("_");
      return key + "_V";
    })
    .attr("class", "voronoi")
    .on("mouseover", function (d) {
      var key = d.data.country.split(" ").join("_");
      key = key.split("'").join("_");
      if (!scroll) {
        //in manual mode
        if (clicked == false) {
          //if the user didn't click on any lines, then normal mouseover behavior
          selectedCountry = d.data.country;
          var title = d.data.country.split("_").join(" ");
          d3.select("#countryTitle").html("<b>" + title + "</b>");
          if (_.find(data3, { country: selectedCountry })) {
            var index = _.findIndex(data3, function (item) {
              return item.country == selectedCountry;
            });
            d3.select("#countryDescription").html(data3[index].description);
          } else {
            d3.select("#countryDescription").html("Analysis Not Available");
          }
          drawLine(selectedCountry);
          d3.selectAll(".countries path").style("opacity", 0.1);
          d3.select("path#" + key).style("opacity", 0.8);
          d3.select("path#" + key + "_1").style("opacity", 1);
          focus
            .attr(
              "transform",
              "translate(" + x(d.data.year) + "," + y(d.data.rank) + ")"
            )
            .attr("opacity", 1);
          focus.select("text").text(d.data.country).attr("opacity", 1);
          focusCount
            .attr(
              "transform",
              "translate(" + (width + 20) + "," + y(d.data.rank) + ")"
            ) //y(countPosition(d.data.country))
            .attr("opacity", 0.6);
          focusCount.select("text").text(d.data.count).attr("opacity", 1);
          focus.select("text").style("text-anchor", function () {
            if (d.data.year == 2019) {
              return "end";
            } else if (d.data.year == 2010) {
              return "start";
            } else {
              return "middle";
            }
          });
        } else {
          //if a user clicked on a line, then only that line has opacity of 0.8, and that line remains selected until the user clicks to reset
          //the focus points are also only available for the selected line
          focus
            .attr(
              "transform",
              "translate(" + x(d.data.year) + "," + y(d.data.rank) + ")"
            )
            .attr("opacity", function () {
              if (_.includes(clickedIDArray, key + "_V")) {
                return 1;
              } else {
                return 0;
              }
              //return clickedID === (key+"_V")?1:0;
            });
          focus
            .select("text")
            .text(d.data.country)
            .attr("opacity", function () {
              if (_.includes(clickedIDArray, key + "_V")) {
                return 1;
              } else {
                return 0;
              }
            });
          focusCount
            .attr(
              "transform",
              "translate(" + (width + 20) + "," + y(d.data.rank) + ")"
            )
            .attr("opacity", function () {
              if (_.includes(clickedIDArray, key + "_V")) {
                return 0.6;
              } else {
                return 0;
              }
            });
          focusCount
            .select("text")
            .text(d.data.count)
            .attr("opacity", function () {
              if (_.includes(clickedIDArray, key + "_V")) {
                return 1;
              } else {
                return 0;
              }
            });
          focus.select("text").style("text-anchor", function () {
            if (d.data.year == 2019) {
              return "end";
            } else if (d.data.year == 2010) {
              return "start";
            } else {
              return "middle";
            }
          });
        }
      } else {
      }
      //mouseover;
    })
    .on("mouseout", function (d) {
      if (!scroll) {
        if (clicked == false) {
          d3.selectAll(".countries path").style("opacity", 0.8);
        }
      }
    })
    .on("click", function (d) {
      if (!scroll) {
        // in manual mode
        $(".reset").css("opacity", 1);
        clicked = true;
        reset = false;
        clickedID = d3.select(this).attr("id");
        clickedIDArray.push(d3.select(this).attr("id"));
        var key = d.data.country.split(" ").join("_");
        key = key.split("'").join("_");
        d3.select("path#" + key).style("opacity", 0.8);
        d3.select("path#" + key + "_1").style("opacity", 1);
      }
    });

  d3.select("#reset").on("click", function () {
    clicked = false;
    clickedIDArray = [];
    d3.selectAll(".countries path").style("opacity", 0.8);
    reset.attr("opacity", 0);
    //d3.selectAll(".voronoi path").style("pointer-events","auto");
  });

  //add two modes: manual highlight mode or story mode

  getHeight("axisText1", "DRC", "toc1");
  getHeight("axisText3", "Russia", "toc3");
  getHeight("axisText4", "Brazil", "toc4");
  getHeight("axisText6", "Australia", "toc6");
  getHeight("axisText8", "US", "toc8");
  getHeight("axisText12", "Bolivia", "toc12");
  getHeight("axisText14", "Indonesia", "toc14");
  getHeight("axisText21", "Kazakhstan", "toc21");
  getHeight("axisText60", "Syria", "toc60");
  getHeight("axisText72", "Panama", "toc72");
  getHeight("axisText89", "Serbia", "toc89");
  getHeight("axisText94", "Oman", "toc94");
  getHeight("axisText96", "Portugal", "toc96");
  getHeight("axisText115", "Croatia", "toc115");
  getHeight("axisText128", "Eritrea", "toc128");
  getHeight("axisText136", "Sweden", "toc136");
  getHeight("axisText170", "Iceland", "toc200");

  newScene(
    "#axisText1",
    $("#axisText3").offset().top - $("#axisText1").offset().top,
    "#toc1",
    "rgb(158, 1, 66)",
    "Democratic_Republic_of_the_Congo"
  );
  newScene(
    "#axisText3",
    $("#axisText4").offset().top - $("#axisText3").offset().top,
    "#toc3",
    "rgb(166, 9, 68)",
    "Russia"
  );
  newScene(
    "#axisText4",
    $("#axisText6").offset().top - $("#axisText4").offset().top,
    "#toc4",
    "rgb(166, 9, 68)",
    "Brazil"
  );
  newScene(
    "#axisText6",
    $("#axisText8").offset().top - $("#axisText6").offset().top,
    "#toc6",
    "rgb(171, 15, 69)",
    "Australia"
  );
  newScene(
    "#axisText8",
    $("#axisText12").offset().top - $("#axisText8").offset().top,
    "#toc8",
    "rgb(175, 20, 70)",
    "United_States"
  );
  newScene(
    "#axisText12",
    $("#axisText14").offset().top - $("#axisText12").offset().top,
    "#toc12",
    "rgb(185, 31, 72)",
    "Bolivia"
  );
  newScene(
    "#axisText14",
    $("#axisText21").offset().top - $("#axisText14").offset().top,
    "#toc14",
    "rgb(190, 37, 73)",
    "Indonesia"
  );
  newScene(
    "#axisText21",
    $("#axisText60").offset().top - $("#axisText21").offset().top,
    "#toc21",
    "rgb(205, 55, 75)",
    "Kazakhstan"
  );
  newScene(
    "#axisText60",
    $("#axisText72").offset().top - $("#axisText60").offset().top,
    "#toc60",
    "rgb(250, 153, 89)",
    "Syria"
  );
  newScene(
    "#axisText72",
    $("#axisText89").offset().top - $("#axisText72").offset().top,
    "#toc72",
    "rgb(253, 185, 108)",
    "Panama"
  );
  newScene(
    "#axisText89",
    $("#axisText94").offset().top - $("#axisText89").offset().top,
    "#toc89",
    "rgb(254, 222, 142)",
    "Serbia"
  );
  newScene(
    "#axisText94",
    $("#axisText96").offset().top - $("#axisText94").offset().top,
    "#toc94",
    "rgb(254, 230, 152)",
    "Oman"
  );
  newScene(
    "#axisText96",
    $("#axisText115").offset().top - $("#axisText96").offset().top,
    "#toc96",
    "rgb(254, 233, 156)",
    "Portugal"
  );
  newScene(
    "#axisText115",
    $("#axisText128").offset().top - $("#axisText115").offset().top,
    "#toc115",
    "rgb(248, 249, 175)",
    "Croatia"
  );
  newScene(
    "#axisText128",
    $("#axisText136").offset().top - $("#axisText128").offset().top,
    "#toc128",
    "rgb(232, 246, 164)",
    "Eritrea"
  );
  newScene(
    "#axisText136",
    $("#axisText170").offset().top - $("#axisText136").offset().top,
    "#toc136",
    "rgb(217, 240, 159)",
    "Sweden"
  );
  newScene(
    "#axisText170",
    $("#axisText200").offset().top - $("#axisText170").offset().top,
    "#toc200",
    "rgb(66, 131, 180)",
    "Iceland"
  );

  newPin(
    "#toc1",
    0,
    $("#axisText200").offset().top - $("#axisText1").offset().top - 320
  );
  newPin(
    "#toc3",
    -20,
    $("#axisText200").offset().top - $("#axisText3").offset().top - 300
  );
  newPin(
    "#toc4",
    -40,
    $("#axisText200").offset().top - $("#axisText4").offset().top - 280
  );
  newPin(
    "#toc6",
    -60,
    $("#axisText200").offset().top - $("#axisText6").offset().top - 260
  );
  newPin(
    "#toc8",
    -80,
    $("#axisText200").offset().top - $("#axisText8").offset().top - 240
  );
  newPin(
    "#toc12",
    -100,
    $("#axisText200").offset().top - $("#axisText12").offset().top - 220
  );
  newPin(
    "#toc14",
    -120,
    $("#axisText200").offset().top - $("#axisText14").offset().top - 200
  );
  newPin(
    "#toc21",
    -140,
    $("#axisText200").offset().top - $("#axisText21").offset().top - 180
  );
  newPin(
    "#toc60",
    -160,
    $("#axisText200").offset().top - $("#axisText60").offset().top - 160
  );
  newPin(
    "#toc72",
    -180,
    $("#axisText200").offset().top - $("#axisText72").offset().top - 140
  );
  newPin(
    "#toc89",
    -200,
    $("#axisText200").offset().top - $("#axisText89").offset().top - 120
  );
  newPin(
    "#toc94",
    -220,
    $("#axisText200").offset().top - $("#axisText94").offset().top - 100
  );
  newPin(
    "#toc96",
    -240,
    $("#axisText200").offset().top - $("#axisText96").offset().top - 80
  );
  newPin(
    "#toc115",
    -260,
    $("#axisText200").offset().top - $("#axisText115").offset().top - 60
  );
  newPin(
    "#toc128",
    -280,
    $("#axisText200").offset().top - $("#axisText128").offset().top - 40
  );
  newPin(
    "#toc136",
    -300,
    $("#axisText200").offset().top - $("#axisText136").offset().top - 20
  );
  newPin(
    "#toc200",
    -320,
    $("#axisText200").offset().top - $("#axisText170").offset().top
  );

  function getOffset(el) {
    const rect = document.getElementById(el).getBoundingClientRect();
    return {
      left: rect.left,
      top: rect.top,
      // + window.scrollY
    };
  }

  function getHeight(el, text, id) {
    var elHeight = $("#" + el).offset().top;
    // var offset = getOffset(el);
    var element = $("<div><a>" + text + "</a></div>").appendTo("body");
    element.attr("id", id);
    element.attr("class", "toc");
    d3.select("#" + id)
      .style("position", "absolute")
      .style("top", elHeight + "px")
      .style("right", "30px");
    $("#" + id).click(function () {
      //console.log(document.documentElement.clientHeight)
      $("html, body").animate(
        {
          scrollTop: elHeight - document.documentElement.clientHeight / 2 + 30,
        },
        400
      );
    });
  }

  function highlihtCountry(id) {
    if (scroll) {
      var title = id.split("_").join(" ");
      d3.select("#countryTitle").html("<b>" + title + "</b>");
      if (_.find(data3, { country: title })) {
        var index = _.findIndex(data3, function (item) {
          return item.country == title;
        });
        d3.select("#countryDescription").html(data3[index].description);
      } else {
        d3.select("#countryDescription").html("");
      }
      d3.selectAll(".countries path").style("opacity", 0.1);
      d3.select("path#" + id).style("opacity", 0.8);
      d3.select("path#" + id + "_1").style("opacity", 1);
      focus.attr("opacity", 0);
      focusCount.attr("opacity", 0);
      drawLine(title);
    }
  }

  function newScene(element, height, id, color, country) {
    new ScrollMagic.Scene({
      triggerElement: element,
      offset: 0,
      duration: height,
    })
      .addTo(controller)
      .on("enter", function (e) {
        highlihtCountry(country);
        d3.select(id + " a")
          .transition()
          .duration(200)
          .style("color", color);
      })
      .on("leave", function (e) {
        d3.select(id + " a")
          .transition()
          .duration(200)
          .style("color", "white");
      });
  }

  function newPin(element, offset, duration) {
    new ScrollMagic.Scene({
      triggerElement: element,
      offset: offset,
      duration: duration,
      pushFollowers: true,
    })
      .setPin(element)
      .addTo(controller);
  }

  // Overview map
  var totalWidthOriginal = width + margin.left + margin.right;
  var windowHeight = document.documentElement.clientHeight;

  var availWidth =
    (document.documentElement.clientWidth - totalWidthOriginal) / 2;
  var marginMap = {};
  marginMap.top = 30;
  marginMap.bottom = 30;
  //What would be the optimal dimensions
  var heightMap = windowHeight - marginMap.top - marginMap.bottom,
    widthMap = Math.max(availWidth * 0.7, 120);
  marginRatio = margin.left / width;

  $(".block").css("height", heightMap);

  var marginPadding = 20,
    marginNeeded = Math.round(widthMap * marginRatio);
  marginMap.left = marginNeeded + marginPadding;
  marginMap.right = marginNeeded + marginPadding;

  //Place the mini map just to the right of the main visual
  var totalWidth = widthMap + marginMap.left + marginMap.right,
    inbetweenPadding = Math.min(100, Math.max(30, totalWidth * 0.5));
  var map = document.getElementById("map");
  var mr = widthMap / width;

  //Scales
  var xMap = d3.scaleLinear().domain([2010, 2019]).range([0, widthMap]),
    yMap = d3.scaleLinear().domain([1, 200]).range([0, heightMap]);

  var lineMap = d3
    .line()
    .x(function (d) {
      return xMap(d.year);
    })
    .y(function (d) {
      return yMap(d.rank);
    });

  //SVG container
  var svg2 = d3
    .select("#map")
    .attr("height", heightMap + marginMap.top + marginMap.bottom)
    .append("svg")
    .attr("id", "svg2")
    .attr("width", widthMap + marginMap.left + marginMap.right)
    .attr("height", heightMap + marginMap.top + marginMap.bottom)
    .append("g")
    .attr("class", "gMap")
    .attr("transform", "translate(0, " + marginMap.top + ")");
  svg2
    .append("rect")
    .attr("class", "background-rect")
    .attr("width", widthMap)
    .attr("height", heightMap)
    .style("fill", "#424242");

  d3.select(".gMap")
    .append("g")
    .attr("class", "countries")
    .selectAll("path")
    .data(dataByCountry)
    .enter()
    .append("path")
    .style("stroke", function (d) {
      var data = d.values.filter((d1) => d1.year == 2019);
      if (_.has(data[0], "rank")) {
        return color(data[0].rank);
      } else {
        return "rgb(90, 85, 165)";
      }
    })
    .style("stroke-width", 1)
    .attr("fill", "none")
    .attr("d", function (d) {
      d.line = this;
      return lineMap(d.values);
    })
    .attr("id", function (d) {
      var key = d.key.split(" ").join("_");
      key = key.split("'").join("_");
      return key + "_1";
    });

  // Small line graph

  var marginS = { top: 20, right: 0, bottom: 20, left: 40 },
    widthS = $("#pin1").width() - marginS.right - marginS.left,
    heightS = widthS;

  var xS = d3.scaleLinear().domain([2010, 2019]).range([0, widthS]),
    yS = d3.scaleLinear().range([heightS, 0]),
    xAxisS = d3.axisBottom(xS).ticks(5).tickFormat(d3.format("d")).tickSize(0),
    yAxisS = d3.axisLeft(yS).ticks(5).tickFormat(d3.format("d")).tickSize(0);

  var lineS = d3
    .line()
    .x(function (d) {
      return xS(d.year);
    })
    .y(function (d) {
      return yS(d.count);
    });

  var svg3 = d3
    .select("#line")
    .append("svg")
    .attr("id", "svg3")
    .attr("width", widthS + marginS.left + marginS.right)
    .attr("height", heightS + marginS.top + marginS.bottom)
    .append("g")
    .attr("class", "gLine")
    .attr("transform", "translate(" + marginS.left + ", " + marginS.top + ")");

  svg3
    .append("g")
    .attr("class", "xaxisSmall")
    .attr("transform", "translate(0," + heightS + ")");
  svg3.append("g").attr("class", "yaxisSmall");

  function drawLine(country) {
    var selected = dataByCountry.filter(function (d) {
      return d.key === country;
    });
    selected = selected[0].values;
    selected.forEach(function (d) {
      d.year = +d.year;
      d.count = +d.count;
    });

    yS.domain(
      d3.extent(selected, function (d) {
        return d.count;
      })
    );

    var lineSmall = svg3.selectAll(".lineSmall").data([selected]);

    lineSmall
      .enter()
      .append("path")
      .attr("class", "lineSmall")
      .merge(lineSmall)
      .transition()
      .duration(500)
      .style("stroke-width", 1)
      .attr("stroke", "white")
      .attr("fill", "none")
      .attr("d", lineS);

    svg3.selectAll(".xaxisSmall").transition().duration(500).call(xAxisS);

    // Add the Y Axis
    svg3.selectAll(".yaxisSmall").transition().duration(500).call(yAxisS);
  }
}; //end onload
