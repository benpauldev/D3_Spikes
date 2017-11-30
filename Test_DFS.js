const fs = require('fs');
// get a big array of nouns
function Graph_collection(ID, Starting_url, Search_type, graph_Node_Container)
{
	this.ID = ID;	//INT references client request
	this.Starting_url = Starting_url; 	// String
	this.Search_type = Search_type; // String DFS or BFS
	this.graph_Node_Container = graph_Node_Container; // an array of Graph_nodes
}
function Graph_node(URL, parent, neighbors)
{
	this.URL = URL;
	this.parent = parent;
	this.neighbors = neighbors;
}

/************************************************************
This funciton take the source index for the website, the desired node limit, and the fake internet

*************************************************************/
function dfsIterative(outfile, source_URL_Index, limit, fake_internet, fake_names)
{	
	//************the starting spot*************	
	var current_node = fake_internet[source_URL_Index];
	var collection_object = new Graph_collection(outfile, current_node.URL,"DFS", []);
	current_node.parent = -1; // source node parent is not in the array
	collection_object.graph_Node_Container.push(current_node); //now the souce node is at index 0
	
	while(collection_object.graph_Node_Container.length < limit)
	{
		var next_node = dfs_get_next_node(collection_object, fake_internet, fake_names); // helper funciton with random choice and error handling
		if(next_node != 0) // catches a complete search if somehow there are less nodes than the limit 
		{
			collection_object.graph_Node_Container.push(next_node);
			//console.log("*");
		}
		else
		{
			break;
		}
	}
	
	return collection_object;
}
/******************************************
This function is  a helper function for the randomly choosing DFS 
******************************************/
function dfs_get_next_node(CO,FI_arr,fake_names)
{
	var done = false; // sentinel 
	var last_node = CO.graph_Node_Container[(CO.graph_Node_Container.length) - 1];
	var parent_index = (CO.graph_Node_Container.length) - 2;
	var visitables = last_node.neighbors;
	
	while(visitables.length == 0)
	{
		//console.log("*pre check zero neighbors*");
		if((CO.graph_Node_Container.length) == 1)
		{
			return 0;
		}
		visitables = CO.graph_Node_Container[parent_index].neighbors;
		parent_index --;
	}
	
	var next_node_URL;
	while(!done)
	{
		next_node_URL = visitables[Math.floor(Math.random() * (visitables.length))]; // Choose a random node from the visitable nodes
		done = true;
		for(i = 0; i < CO.graph_Node_Container.length; i ++) // have we been there before?
		{
			
			if(next_node_URL === CO.graph_Node_Container[i].URL) // if we have already been to this site
			{
				//console.log("*repeat visit, splicing*");
				done = false; // then we aren't done
				var remove_index = visitables.indexOf(next_node_URL);// remove it from the random choice pool , and try aghain 
				visitables.splice(remove_index,1); // take one element out from that index
				if(visitables.length == 0) // if there are no choices left, we go to the parent nodes neighnors.
				{
					//console.log("neighbors reduced to zero via splice");
					while(visitables.length == 0)
					{
						if (parent_index == -1)
						{
							//console.log("no where left to go");
							return 0;
						}
						visitables = CO.graph_Node_Container[parent_index].neighbors;
						parent_index --;
					}
				}
			}
		}
	}
	var index_of_next_node = fake_names.indexOf(next_node_URL);
	var return_node = FI_arr[index_of_next_node];
	return_node.parent = parent_index + 1;
	
return return_node;
	
}
// program start
// validate command line
if(process.argv.length != 6 || isNaN(Number(process.argv[2])) || isNaN(Number(process.argv[3])) || isNaN(Number(process.argv[4])))
{
	console.log("USAGE node Test_DFS {INT index of starting site (range: 0-3999) } {INT DFS Traversal length limit} {INT maximum number of links per graph node} {STRING output file name for JSON}");
}
else
{
	var starting_spot = Number(process.argv[2]);
	var graph_limit = Number(process.argv[3]);
	var link_max = Number(process.argv[4]);
	var outfile = process.argv[5];
	//*************collecting a bunch of words to use as fake websites from a file********
	var collection = [];
	var nouns = fs.readFileSync("./nounlist.txt").toString();
	var fake_websites_array = nouns.split("\n");
	for (i in fake_websites_array)
	{
		fake_websites_array[i] = "http://www." + fake_websites_array[i] + ".com";
	}
	//*****************making a graph from the random websites************************
	var the_fake_internet = [];
	for (i = 0; i < 4000; i++)
	{
		var url = fake_websites_array[i];
		var neighbors = [];
		var num_neighbors = Math.floor(Math.random() * (link_max + 1));
		for (j = 0; j < num_neighbors ; j++)
		{
			pseudoRandom = Math.floor(Math.random() * 4000) + 1;
			neighbors.push(fake_websites_array[pseudoRandom]);
		}
		var new_node = new Graph_node(url, 0, neighbors);
		the_fake_internet.push(new_node);
	}
	// at this point we have a graph with 4000 nodes
	// no guarantee on completeness of the graph
	
	var final_collection = dfsIterative(outfile,starting_spot,graph_limit,the_fake_internet,fake_websites_array);
	//console.log(final_collection.graph_Node_Container);
	var JSON_string = JSON.stringify(final_collection);	
	fs.writeFile(outfile, JSON_string, function(err)
	{  
		if (err) 
		{
			console.log("error writing file");
		}
		else
		{
			console.log("JSON saved to " + outfile);
		}
	});
}