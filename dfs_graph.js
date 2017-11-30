/*



Project: Perseus Web Crawler
Title: dfs_graph
Description: This is a js script that recieves an array of 
              json and produces a graph. The json represents 
              url's that have been scraped from links actual
              web html. The graph represents a depth first search
              travesal of nodes, with each node being a url.
Author: Benjamin Fondell
Date: 10/24/2017


*********USEAGE*************************************

Include: <script type="text/javascript" src="dfs_graph.js"></script>

Input: call buildGraph_dfs(array) with an array of json in form:

          {'ID':id,
            'Starting_url': starting_url,
            'Search_type': search type,
            'graph_Node_Container': [
                  {'name':url,
                  'parent': parent,
                  'children' : []
                  }
                  .......]}

Output: The output of the graph is assigned to a designated div in the html.
        the syntax for selecting the div: d3.select(#id). 
        Attributes may be appended to this div in the form of referencing the 
        svg object.

        To see the output in context see below: *html assignment 
        
*/






buildGraph_dfs function(jsonData)
{


//************************************************
//  Functions for parsing input json array into 
// hierarchical json. D3 requires that json be
// descendent from a root in order to build trees
// from json data. This code builds all data, descendent 
// from the first node of the graphNodeContainer array.
//************************************************


// Function for appending {"children:[]"} object on
// each child node if no children object exists.
// This is expected to properly parse the nodes for graphics.
//************************************************


  jsonData.graph_Node_Container.forEach(function(d){

      var json_add = {"children":[]};

      if(d.children)
      {
        var count = 0;
        
        d.children.forEach(function(e)
        {
          jsonString = JSON.stringify({"name":e});
          d.children[count] = JSON.parse(jsonString);
          d.children[count].children=[];
          count++;
        });
      }
    });



function spliceArray(array)
{

   // removes nodes if they have no children. still accounted for 
   // in graph by parent node displaying all children
   var emptyChildrenNodes = _.remove(array, function(n)   
   {
      return n.children[0] == null;
   });

  
   for (var i = 1; i < array.length; i++) 
   {
      // if a node has one child and that child            * this is a rare special case which 
      // has no children remove from array               breaks the graphics. Likely not plausible in actual internet.
      if (array[i].children.length == 1)
      {
         if (array[i].children[0].name != array[i + 1].name) 
         {
            array.splice(i,1);
         }
      }
      
   }

   return array;
   
}


// Function that traverses the array appending all 
// child nodes at increasing depth from the root node.
//************************************************

function makeHierarchy(array)
{
   var hierarchy = [];
  hierarchy.push(array[0]);

   for(var i = 1; i < array.length; i++)
   {
       
         hierarchy.push(array[i]);
         
       

          var x = i - 1;
          if (hierarchy[x].children != null) 
          {
             for(var j = 0; j < hierarchy[x].children.length; j++)
             {
                
                if(hierarchy[i].name == hierarchy[x].children[j].name)
                {
                 
                   hierarchy[x].children[j].children = hierarchy[i].children;

                }

             }
          }
         
     }

 return hierarchy;
}

var splicedArray = spliceArray(jsonData.graph_Node_Container);
var hierarchical_json = makeHierarchy(splicedArray);

// ***************** NOTE *****************************
// Of several runs with test data only one node was not
// represented by graph. That node is described in the above
// *special case. 
// ***************** NOTE *****************************






//*********************************************************************
//***********************  D3 Graphics ********************************
//*********************************************************************


// ************** Generate the tree diagram  *****************
var margin = {top: 20, right: 120, bottom: 20, left: 120},
 width = 10000 - margin.right - margin.left,
 height = 500 - margin.top - margin.bottom;
 
var i = 0;

// establishes the itended layout
var tree = d3.layout.tree()
 .size([height, width]);

var diagonal = d3.svg.diagonal()
 .projection(function(d) { return [d.y, d.x]; });



//*******************
//  * html assignment
//*******************
// this is where you suggest where in the html
// to insert the graph and append the graphs attributes
var svg = d3.select("#output_area").append("svg")
 .attr("width", width + margin.right + margin.left)
 .attr("height", height + margin.top + margin.bottom)
  .append("g")
 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


root = hierarchical_json[0];
  
update(root);

function update(source) {

  // Compute the new tree layout.
  var nodes = tree(root);
   links = tree.links(nodes);

   //console.log(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * 90; });

  // Declare the nodes
  var node = svg.selectAll("g.node")
   .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter the nodes.
  var nodeEnter = node.enter().append("g")
   .attr("class", "node")
   .attr("transform", function(d) { 
    return "translate(" + d.y + "," + d.x + ")"; });

  //append circle icon at end of path
  nodeEnter.append("circle")
   .attr("r", 5)
   .style("fill", "#fff");

  // add url text at end of path
  nodeEnter.append("text")
   .attr("x", function(d) { 
    return d.children || d._children ? -13 : 13; })
   .attr("dy", ".35em")
   .attr("text-anchor", function(d) { 
    return d.children || d._children ? "end" : "start"; })
   .text(function(d) { return d.name; })
   .style("fill-opacity", 1);

  // Declare the links
  // create paths
  var link = svg.selectAll("path.link")
   .data(links, function(d) { return d.target.id; });

  // Enter the links.
  link.enter().insert("path", "g")
   .attr("class", "link")
   .attr("d", diagonal);

}

}
