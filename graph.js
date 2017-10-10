(function() {
  var makeChildren, diagonal, diameter, div, duration, height, i, radius, makeParents, focusIn, root, saveAndUpdate, svg, tree, testData, update, zoom;

 testData = [
  {
    "name": "url",
    "children": [
      {
        "name": "url",
        "children": [
          {
            "name": "url",
            "children": [
              {
                "name": "url",
                "someData": ""
              },
              {
                "name": "url",
                "someData": ""
              },
              {
                "name": "url",
                "someData": ""
              },
              {
                "name": "url",
                "someData": ""
              }
            ]
          },
          {
            "name": "url",
            "children": [
              {
                "name": "url",
                "someData": ""
              },
              {
                "name": "url",
                "someData": ""
              },
              {
                "name": "url",
                "someData": ""
              },
              {
                "name": "url",
                "someData": ""
              },
              {
                "name": "url",
                "someData": ""
              }
            ]
          },
          {
            "name": "url",
            "children": [
              {
                "name": "url",
                "someData": ""
              }
            ]
          }
        ]
      },
      {
        "name": "url",
        "children": [
          {
            "name": "url",
            "children": [
              {
                "name": "url",
                "someData": ""
              },
              {
                "name": "url",
                "someData": ""
              },
              {
                "name": "url",
                "someData": ""
              },
              {
                "name": "url",
                "someData": ""
              },
              {
                "name": "url",
                "someData": ""
              }
            ]
          },
          {
            "name": "url",
            "someData": ""
          },
          {
            "name": "url",
            "someData": ""
          },
          {
            "name": "url",
            "someData": ""
          },
          {
            "name": "url",
            "someData": ""
          },
          {
            "name": "url",
            "someData": ""
          },
          {
            "name": "url",
            "someData": ""
          }
        ]
      },
      {
        "name": "url",
        "children": [
          {
            "name": "url",
            "someData": ""
          },
          {
            "name": "url",
            "someData": ""
          },
          {
            "name": "url",
            "someData": ""
          },
          {
            "name": "url",
            "someData": ""
          }
        ]
      },
      {
        "children": [
          {
            "name": "url",
            "someData": ""
          }
        ]
      },
      {
        "name": "url",
        "children": [
          {
            "name": "url",
            "someData": ""
          },
          {
            "name": "url",
            "someData": ""
          },
          {
            "name": "url",
            "someData": ""
          },
          {
            "name": "url",
            "someData": ""
          },
          {
            "name": "url",
            "someData": ""
          },
          {
            "name": "url",
            "someData": ""
          },
          {
            "name": "url",
            "someData": ""
          },
          {
            "name": "url",
            "someData": ""
          },
          {
            "name": "url",
            "someData": ""
          },
          {
            "name": "url",
            "children": [
              {
                "name": "url",
                "someData": ""
              },
              {
                "name": "url",
                "someData": ""
              },
              {
                "name": "url",
                "someData": ""
              },
              {
                "name": "url",
                "someData": ""
              }
            ]
          },
          {
            "name": "url",
            "someData": ""
          },
          {
            "name": "url",
            "someData": ""
          },
          {
            "name": "url",
            "someData": ""
          }
        ]
      }
    ]
  }
];

  window.current_nodes = [];

  update = function(source) {
    var link, links, node, nodeEnter, nodeExit, nodeUpdate, nodes;
    nodes = tree.nodes(root).reverse();
    links = tree.links(nodes);
    nodes.forEach(function(d) {
      return d.y = d.depth * 80;
    });
    node = svg.selectAll("g.node").data(nodes, function(d) {
      return d.id || (d.id = ++i);
    });
    nodeEnter = node.enter().append("g").attr("class", "node").attr("transform", function(d) {}, {}, "translate(" + source.y0 + "," + source.x0 + ")").on("mouseover", function(d) {}).on("click", function(d) {
      var clicked_same_node;
      clicked_same_node = false;
      if (window.current_nodes.length > 0) {
        if (d.id === window.current_nodes[window.current_nodes.length - 1][0].id) {
          clicked_same_node = true;
          d3.event.stopPropagation();
        }
      }
      if (!clicked_same_node) {
        return saveAndUpdate(d);
      }
    });
    nodeEnter.append("circle").attr("r", 1e-6).style("fill", function(d) {
      if (d._children) {
        return "lightsteelblue";
      } else {
        return "#fff";
      }
    });
    nodeEnter.append("text").attr("dy", ".31em").attr("text-anchor", function(d) {
      if (d.x < 180) {
        return "start";
      } else {
        return "end";
      }
    }).attr("transform", function(d) {
      if (d.x < 180) {
        return "translate(8)";
      } else {
        return "rotate(180)translate(-8)";
      }
    }).text(function(d) {
      return d.name;
    });
    nodeUpdate = node.transition().duration(duration).attr("transform", function(d) {
      return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")";
    });
    nodeUpdate.select("circle").attr("r", 5).style("fill", function(d) {
      if (d._children) {
        return "red";
      } else {
        return "red";
      }
    });
    nodeUpdate.select("text").style("fill-opacity", 1).attr("dy", ".31em").attr("text-anchor", function(d) {
      if (d.x < 180) {
        return "start";
      } else {
        return "end";
      }
    }).attr("transform", function(d) {
      if (d.x < 180) {
        return "translate(8)";
      } else {
        return "rotate(180)translate(-8)";
      }
    });
    nodeExit = node.exit().transition().duration(duration).attr("transform", function(d) {
      return "translate(" + source.y + "," + source.x + ")";
    }).remove();
    nodeExit.select("circle").attr("r", 1e-6);
    nodeExit.select("text").style("fill-opacity", 1e-6);
    link = svg.selectAll("path.link").data(links, function(d) {
      return d.target.id;
    });
    link.enter().insert("path", "g").attr("class", "link").attr("d", function(d) {
      var o;
      o = {
        x: source.x0,
        y: source.y0
      };
      return diagonal({
        source: o,
        target: o
      });
    });
    link.transition().duration(duration).attr("d", diagonal);
    link.exit().transition().duration(duration).attr("d", function(d) {
      var o;
      o = {
        x: source.x,
        y: source.y
      };
      return diagonal({
        source: o,
        target: o
      });
    }).remove();
    return nodes.forEach(function(d) {
      d.x0 = d.x;
      return d.y0 = d.y;
    });
  };

  makeChildren = function(d) {
    var c, nodes;
    c = d;
    nodes = [];
    while (c.parent) {
      nodes.push(c.parent.children);
      c = c.parent;
    }
    return nodes;
  };

  focusIn = function() {
    var count, d, set;
    if (window.current_nodes.length > 0) {
      set = window.current_nodes.pop();
      d = set[0];
      count = 0;
      d.parent._children = set[1];
      if (d.parent._children) {
        while (d.parent) {
          d.parent.children = set[1][count];
          count++;
          d = d.parent;
        }


        return update(d);
      }
    }
  };


  saveAndUpdate = function(d) {
    window.current_nodes.push([d, makeChildren(d)]);
    while (d.parent) {
      d.parent._children = d.parent.children;
      d.parent.children = [
        _.find(d.parent.children, function(e) {
          return e.name === d.name;
        })
      ];
      d = d.parent;
    }

    d3.event.stopPropagation();
    return update(d);
  };

  makeParents = function(n, nodes) {
    var count;
    count = nodes.length - 1;
    while (n.parent) {
      n.parent.children = nodes[count];
      count -= 1;
      n = n.parent;
    }


    return n;
  };

  $("body").click(function() {
    return focusIn()
  });

  diameter = 720;

  height = diameter - 150;

  radius = diameter / 2;

  root = void 0;

  tree = d3.layout.tree().size([360, radius - 120]);

  i = 0;

  duration = 2000;

  diagonal = d3.svg.diagonal.radial().projection(function(d) {
    return [d.y, d.x / 180 * Math.PI];
  });

  zoom = function() {
    return svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
  };

  div = d3.select("#focus");

  svg = div.insert("svg").attr("viewbox", "0 0 " + diameter / 2 + "," + diameter / 2).attr("width", "100%").attr("height", "100%").attr("background-color", "pink").append("g").attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")").attr("background-color","lightsteelblue").append("g").call(d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", zoom));

  root = testData[0];

  root.x0 = height / 2;

  root.y0 = 0;

  update(root);

}).call(this);