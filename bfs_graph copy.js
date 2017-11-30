



(function(jsonData) {
  var makeChildren, diagonal, diameter, div, duration, height, i, radius, 
  makeParents, focusIn, root, saveAndUpdate, svg, tree, testData, update, zoom;

  testData = [
      {
         "name":"http://www.howitzer.com",
         "parent":-1,
         "children":[
            "http://www.exam.com",
            "http://www.route.com",
            "http://www.stem.com",
            "http://www.junker.com",
            "http://www.guy.com",
            "http://www.latency.com",
            "http://www.maestro.com"
         ]
      },
      {
         "name":"http://www.maestro.com",
         "parent":0,
         "children":[
            "http://www.parent.com",
            "http://www.baobab.com"
         ]
      },
      {
         "name":"http://www.baobab.com",
         "parent":1,
         "children":[
            "http://www.surprise.com",
            "http://www.purpose.com"
         ]
      },
      {
         "name":"http://www.surprise.com",
         "parent":2,
         "children":[
            "http://www.cannon.com",
            "http://www.dedication.com",
            "http://www.evaluator.com"
         ]
      },
      {
         "name":"http://www.dedication.com",
         "parent":3,
         "children":[
            "http://www.stranger.com",
            "http://www.bull.com",
            "http://www.iron.com",
            "http://www.pension.com",
            "http://www.nylon.com"
         ]
      },
      {
         "name":"http://www.nylon.com",
         "parent":4,
         "children":[
            "http://www.puppy.com",
            "http://www.indigence.com",
            "http://www.night.com",
            "http://www.dig.com",
            "http://www.lever.com",
            "http://www.step-son.com",
            "http://www.amount.com",
            "http://www.helmet.com"
         ]
      },
      {
         "name":"http://www.duckling.com",
         "parent":5,
         "children":[

         ]
      },
      {
         "name":"http://www.amount.com",
         "parent":5,
         "children":[
            "http://www.galley.com",
            "http://www.hyena.com"
         ]
      },
      {
         "name":"http://www.hyena.com",
         "parent":7,
         "children":[
            "http://www.nondisclosure.com",
            "http://www.stencil.com",
            "http://www.correspondent.com",
            "http://www.client.com"
         ]
      },
      {
         "name":"http://www.stencil.com",
         "parent":8,
         "children":[
            "http://www.session.com",
            "http://www.girl.com",
            "http://www.pheasant.com",
            "http://www.pillbox.com",
            "http://www.essay.com",
            "http://www.king.com"
         ]
      },
      {
         "name":"http://www.pillbox.com",
         "parent":9,
         "children":[
            "http://www.linen.com",
            "http://www.strawberry.com",
            "http://www.savior.com",
            "http://www.gorilla.com",
            "http://www.snob.com",
            "http://www.insect.com",
            "http://www.rest.com"
         ]
      },
      {
         "name":"http://www.linen.com",
         "parent":10,
         "children":[
            "http://www.footrest.com"
         ]
      },
      {
         "name":"http://www.footrest.com",
         "parent":11,
         "children":[
            "http://www.haversack.com",
            "http://www.broad.com",
            "http://www.policeman.com",
            "http://www.shrimp.com",
            "http://www.cricketer.com",
            "http://www.citizenship.com",
            "http://www.lace.com",
            "http://www.circle.com",
            "http://www.flugelhorn.com"
         ]
      },
      {
         "name":"http://www.policeman.com",
         "parent":12,
         "children":[

         ]
      },
      {
         "name":"http://www.girl.com",
         "parent":13,
         "children":[

         ]
      },
      {
         "name":"http://www.lace.com",
         "parent":12,
         "children":[
            "http://www.chaise.com",
            "http://www.positive.com",
            "http://www.sherry.com",
            "http://www.meteor.com",
            "http://www.individual.com",
            "http://www.patricia.com",
            "http://www.gondola.com",
            "http://www.spider.com",
            "http://www.bricklaying.com",
            "http://www.search.com"
         ]
      },
      {
         "name":"http://www.sherry.com",
         "parent":15,
         "children":[
            "http://www.steamroller.com",
            "http://www.step-brother.com",
            "http://www.coil.com",
            "http://www.protest.com",
            "http://www.phone.com",
            "http://www.shield.com",
            "http://www.shrine.com"
         ]
      },
      {
         "name":"http://www.steamroller.com",
         "parent":16,
         "children":[
            "http://www.bank.com",
            "http://www.deep.com",
            "http://www.lady.com",
            "http://www.cartilage.com",
            "http://www.drive.com"
         ]
      },
      {
         "name":"http://www.drive.com",
         "parent":17,
         "children":[
            "http://www.sister-in-law.com"
         ]
      },
      {
         "name":"http://www.sister-in-law.com",
         "parent":18,
         "children":[
            "http://www.gray.com"
         ]
      },
      {
         "name":"http://www.gray.com",
         "parent":19,
         "children":[
            "http://www.cartridge.com",
            "http://www.ear.com",
            "http://www.great-grandfather.com",
            "http://www.citizenship.com",
            "http://www.logic.com",
            "http://www.blouse.com"
         ]
      },
      {
         "name":"http://www.logic.com",
         "parent":20,
         "children":[
            "http://www.cutting.com",
            "http://www.hand-holding.com",
            "http://www.gondola.com",
            "http://www.robe.com",
            "http://www.marble.com",
            "http://www.nature.com",
            "http://www.extreme.com",
            "http://www.nerve.com",
            "http://www.scorn.com",
            "http://www.hemp.com"
         ]
      },
      {
         "name":"http://www.extreme.com",
         "parent":21,
         "children":[
            "http://www.representative.com",
            "http://www.fortress.com",
            "http://www.corduroy.com"
         ]
      },
      {
         "name":"http://www.frown.com",
         "parent":22,
         "children":[

         ]
      },
      {
         "name":"http://www.representative.com",
         "parent":22,
         "children":[
            "http://www.brand.com",
            "http://www.begonia.com",
            "http://www.news.com",
            "http://www.lamp.com",
            "http://www.nightgown.com",
            "http://www.customer.com"
         ]
      },
      {
         "name":"http://www.customer.com",
         "parent":24,
         "children":[
            "http://www.olive.com",
            "http://www.evolution.com",
            "http://www.neon.com",
            "http://www.pony.com",
            "http://www.fishing.com",
            "http://www.order.com"
         ]
      },
      {
         "name":"http://www.fishing.com",
         "parent":25,
         "children":[
            "http://www.blouse.com",
            "http://www.sponge.com",
            "http://www.past.com"
         ]
      },
      {
         "name":"http://www.sponge.com",
         "parent":26,
         "children":[
            "http://www.foam.com",
            "http://www.icon.com",
            "http://www.gobbler.com",
            "http://www.buckle.com",
            "http://www.pipe.com",
            "http://www.hoof.com",
            "http://www.bowling.com",
            "http://www.fiction.com"
         ]
      },
      {
         "name":"http://www.bowling.com",
         "parent":27,
         "children":[
            "http://www.rider.com",
            "http://www.evocation.com",
            "http://www.capitulation.com",
            "http://www.alpha.com",
            "http://www.manx.com",
            "http://www.ladybug.com",
            "http://www.infancy.com",
            "http://www.swiss.com",
            "http://www.graph.com"
         ]
      },
      {
         "name":"http://www.graph.com",
         "parent":28,
         "children":[
            "http://www.shearling.com",
            "http://www.fridge.com",
            "http://www.joint.com",
            "http://www.program.com",
            "http://www.exclamation.com",
            "http://www.saving.com",
            "http://www.giraffe.com",
            "http://www.storage.com",
            "http://www.climate.com"
         ]
      },
      {
         "name":"http://www.giraffe.com",
         "parent":29,
         "children":[
            "http://www.outlay.com",
            "http://www.contact.com",
            "http://www.emergent.com",
            "http://www.pump.com",
            "http://www.sponge.com",
            "http://www.convertible.com",
            "http://www.spasm.com",
            "http://www.shake.com",
            "http://www.meet.com",
            "http://www.mall.com"
         ]
      },
      {
         "name":"http://www.contact.com",
         "parent":30,
         "children":[
            "http://www.pants.com",
            "http://www.mask.com",
            "http://www.nonsense.com",
            "http://www.bid.com",
            "http://www.obedience.com",
            "http://www.layer.com"
         ]
      },
      {
         "name":"http://www.layer.com",
         "parent":31,
         "children":[
            "http://www.gelding.com",
            "http://www.frazzle.com",
            "http://www.mustard.com",
            "http://www.bird-watcher.com",
            "http://www.payee.com"
         ]
      },
      {
         "name":"http://www.gelding.com",
         "parent":32,
         "children":[
            "http://www.attenuation.com",
            "http://www.flugelhorn.com",
            "http://www.raspberry.com",
            "http://www.hypochondria.com",
            "http://www.decryption.com",
            "http://www.scent.com",
            "http://www.plough.com"
         ]
      },
      {
         "name":"http://www.raspberry.com",
         "parent":33,
         "children":[
            "http://www.screw-up.com",
            "http://www.bin.com",
            "http://www.deer.com",
            "http://www.advantage.com",
            "http://www.cartoon.com",
            "http://www.preparation.com"
         ]
      },
      {
         "name":"http://www.cartoon.com",
         "parent":34,
         "children":[
            "http://www.international.com",
            "http://www.megaliac.com",
            "http://www.full.com",
            "http://www.bricklaying.com",
            "http://www.cut.com",
            "http://www.demur.com",
            "http://www.intestine.com",
            "http://www.prose.com",
            "http://www.mini-skirt.com",
            "http://www.mercury.com"
         ]
      },
      {
         "name":"http://www.bricklaying.com",
         "parent":35,
         "children":[
            "http://www.calculus.com",
            "http://www.depth.com",
            "http://www.niche.com",
            "http://www.reparation.com",
            "http://www.pudding.com",
            "http://www.signup.com",
            "http://www.annual.com"
         ]
      },
      {
         "name":"http://www.signup.com",
         "parent":36,
         "children":[

         ]
      },
      {
         "name":"http://www.pudding.com",
         "parent":36,
         "children":[
            "http://www.revolve.com"
         ]
      },
      {
         "name":"http://www.red.com",
         "parent":38,
         "children":[

         ]
      },
      {
         "name":"http://www.revolve.com",
         "parent":38,
         "children":[
            "http://www.chub.com",
            "http://www.alb.com"
         ]
      },
      {
         "name":"http://www.alb.com",
         "parent":40,
         "children":[
            "http://www.length.com",
            "http://www.pleasure.com",
            "http://www.bibliography.com",
            "http://www.broom.com",
            "http://www.bridge.com",
            "http://www.hub.com",
            "http://www.mousse.com",
            "http://www.boudoir.com",
            "http://www.octopus.com",
            "http://www.angora.com"
         ]
      },
      {
         "name":"http://www.bridge.com",
         "parent":41,
         "children":[
            "http://www.hurdler.com",
            "http://www.sleuth.com",
            "http://www.hail.com",
            "http://www.plume.com",
            "http://www.hovercraft.com",
            "http://www.avalanche.com"
         ]
      },
      {
         "name":"http://www.hurdler.com",
         "parent":42,
         "children":[
            "http://www.astronomy.com",
            "http://www.shoehorn.com",
            "http://www.familiar.com",
            "http://www.server.com",
            "http://www.lady.com",
            "http://www.parent.com",
            "http://www.base.com",
            "http://www.snowsuit.com",
            "http://www.consequence.com"
         ]
      },
      {
         "name":"http://www.astronomy.com",
         "parent":43,
         "children":[

         ]
      },
      {
         "name":"http://www.consequence.com",
         "parent":43,
         "children":[
            "http://www.picket.com"
         ]
      },
      {
         "name":"http://www.picket.com",
         "parent":45,
         "children":[
            "http://www.factor.com",
            "http://www.power.com",
            "http://www.minion.com",
            "http://www.guitar.com",
            "http://www.moccasins.com",
            "http://www.authorization.com",
            "http://www.halibut.com",
            "http://www.being.com"
         ]
      },
      {
         "name":"http://www.factor.com",
         "parent":46,
         "children":[
            "http://www.cutover.com",
            "http://www.cast.com",
            "http://www.application.com",
            "http://www.plier.com",
            "http://www.swath.com",
            "http://www.gobbler.com",
            "http://www.moustache.com"
         ]
      },
      {
         "name":"http://www.gobbler.com",
         "parent":47,
         "children":[

         ]
      },
      {
         "name":"http://www.swath.com",
         "parent":47,
         "children":[

         ]
      }
   ];
  
  testData.forEach(function(d){

      if(d.children){
        var count = 0;
        d.children.forEach(function(e){
          d.children[count] = JSON.stringify({"name":e});
          count++;
        });
      }
    });

   

  window.current_nodes = [];

  update = function(source) {
    var link, links, node, nodeEnter, nodeExit, nodeUpdate, nodes;

    nodes = tree.nodes(root).reverse();
    links = tree.links(nodes);


    nodes.forEach(function(d) 
    {
      return d.y = d.depth * 80;
    });
    
    node = svg.selectAll("g.node").data(nodes, function(d) 
    {
      return d.id || (d.id = ++i);
    });
    
    nodeEnter = node.enter().append("g").attr("class", "node")
    .attr("transform", function(d) {}, {}, "translate(" + source.y0 + "," + source.x0 + ")")
    .on("mouseover", function(d) {}).on("click", function(d) 
    {
      
      var clicked_same_node;
      clicked_same_node = false;
      //console.log(d.name);
      if (window.current_nodes.length > 0) {
        if (d.id === window.current_nodes[window.current_nodes.length - 1][0].id) 
        {
          clicked_same_node = true;
          d3.event.stopPropagation();
        }
      }
      if (!clicked_same_node) {
        return saveAndUpdate(d);
      }
    });
    
    nodeEnter.append("circle").attr("r", 1e-6).style("fill", function(d) {
      if (d == root) return "red"; 
      else return "light-gray";
    })

    
    nodeEnter.append("text").attr("dy", ".15em").attr("text-anchor", function(d) {
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
      if (d == root) return "red"; 
      else return "light-gray";
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

  diagonal = d3.svg.diagonal.radial().projection(function(d) 
  {
    return [d.y, d.x / 180 * Math.PI];
  });

  zoom = function() 
  {
    return svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
  };

  div = d3.select("#focus");

  svg = div.insert("svg").attr("viewbox", "0 0 " + diameter / 2+ "," + diameter / 2).attr("width", "100%").attr("height", "100%")
  .append("g").attr("transform", "translate(" + diameter/2 + "," + diameter/2 + ")").append("g")
  .call(d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", zoom));


  root = testData[0];

  root.x0 = height / 2;

  root.y0 = 0;

  update(root);


}).call(this);



