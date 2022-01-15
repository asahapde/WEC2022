const container = document.getElementById("container");

//Recored matrix dimensions
var N;
var M;

//Constants that define what characters in the matrix represent
const start = 's';
const end = 'e';
const obstacle = 'o';
const stop = 'b';
const free = '*';
const path = '$';

//Define constants for the various colors used in the program
const pathEndColor = '#0022AA';
const stopColor = '#EE0000';
const obstacleColor = '#555555';
const pathHighlightColor = '#00EEBB';
const stopHighlightColor = '#775500';
const freeColor = '#00EE00';
const pathColor = '#00AAEE';

//Used to generate map cell ids in a systematic way (incrementor)
var idCount = 0;

//Distinguish between selecting path and selecting stop
var pathSelect = true;

//Array to contain path ends, peIndex is used as an alternator for selecting start / end
var pathEnds = new Array(2);
var peIndex = 0;

//Array to contain all stops
var stops = [];

//Generate a randomized NxM matrix and apply event listeners (enter / exit / click)
function generateMatrix() {
	N = parseInt(document.getElementById('Ntextfield').value);
  M = parseInt(document.getElementById('Mtextfield').value);

//Prepare map container (grid)
	container.innerHTML = '';//Empty container of previous maps
  container.style.setProperty('--grid-rows', N);
  container.style.setProperty('--grid-cols', M);
  idCount = 0;
  
  //Prepare path / stops (clear old data)
  pathEnds[0] = null; pathEnds[1] = null; peIndex = 0;
  resetStops();
  
  //Create NxM buttons
  for (i = 0; i < (N * M); i++) {
  	
    //Define next button
    let cell = document.createElement("input");
    cell.type = "button";
    cell.id = "btn" + idCount++;
        
    var obs = (Math.floor(Math.random() * 6) == 0);//Randomly determine cell type. A number: [0,6), 0 = obstacle
    
    //Prepare the map to be displayed based on type of cell
    cell.class = obs ? obstacle : free;
    cell.style.backgroundColor = obs ? obstacleColor : freeColor;
    
    if(!obs){//User may only interact with non-obstacle cells
    	cell.addEventListener("mouseenter", function(){
      
      	//Verify the cell is not occupied
      	var cellClicked = (pathEnds[0] != null && pathEnds[0].id == cell.id) || (pathEnds[1] != null && pathEnds[1].id == cell.id);
				for(var i = 0; i < stops.length; i++){
  				cellClicked = cellClicked || cell.id == stops[i].id;
  			}
        
      	if(!cellClicked){
        	cell.style.backgroundColor = pathSelect ? pathHighlightColor : stopHighlightColor;//Highlight cell if the cell is not occupied
        }
      });//End of mouseenter
      
      cell.addEventListener("mouseleave", function(){
      
        //Verify the cell is not occupied
      	var cellClicked = (pathEnds[0] != null && pathEnds[0].id == cell.id) || (pathEnds[1] != null && pathEnds[1].id == cell.id);
				for(var i = 0; i < stops.length; i++){
  				cellClicked = cellClicked || cell.id == stops[i].id;
  			}
        
      	if(!cellClicked){
        	cell.style.backgroundColor = freeColor;//Reset cell highlight if the cell is not occupied
        }
      });//End of mouseleave
      
    	cell.addEventListener("click", function(){
      	
        //Swap between setting path end points and setting stops
        if(pathSelect){
        	//Reset old start/end point
        	if(pathEnds[peIndex] != null){
        		pathEnds[peIndex].style.backgroundColor = freeColor;
        	}
      		
          //Update new end point display
       	  pathEnds[peIndex] = cell;
      		pathEnds[peIndex].style.backgroundColor = pathEndColor;
          pathEnds[peIndex].class = (peIndex == 0) ? start : end;
        	
          //Remove all stops that are shared with path ends
        	for(var i = 0; i < stops.length; i++){
          	if(stops[i].id == pathEnds[peIndex].id){
            	stops[i] = stops[stops.length - 1];
              stops.pop();
            }
          }
        
       		peIndex = (peIndex++ < 1) ? peIndex : 0;//Only 2 endpoints, rollover once the limit is reached
        }else{
        	
          //Only add stop if it is not part of the endpoints of the path
        	if(!((pathEnds[0] != null && pathEnds[0].id == cell.id) || (pathEnds[1] != null && pathEnds[1].id == cell.id))){
          	stops.push(cell);
          	stops[stops.length - 1].style.backgroundColor = stopColor;
            stops[stops.length - 1].class = stop;
          }
        }

      });//End of click
    }
    
    container.appendChild(cell).className = "matrix-element";//Add new cell to the map grid
  };
};

//Set functions to swap between selection type
function setPathSelect(){pathSelect = true;}
function setStopSelect(){pathSelect = false;}

//Resets selected stops and the onscreen display
function resetStops(){
	for(var i = 0; i < stops.length; i++){
  	stops[i].style.backgroundColor = freeColor;
  }
  
	stops = [];
}

//Calculate the optimal path
function calculatePath(){
  var started = false;
  
  //Declare matrix array
  var matrix = new Array(N);
  for(var i = 0; i < matrix.length; i++){
  	matrix[i] = new Array(M);
  }
  
  //Update matrix to match the contents of the display
  for(var i = 0; i < matrix.length; i++){
  	for(var j = 0; j < matrix[i].length; j++){
    	var elementID = "btn" + (j + i * M);
      matrix[i][j] = document.getElementById(elementID).class;
    }
  }
  
  //TODO remove (verification for you)
  for(var i = 0; i < matrix.length; i++){
  	var s = "";
  	for(var j = 0; j < matrix[i].length; j++){
    	s = s + matrix[i][j];
    }
    
    console.log(s);
  }
  
  //TODO integrate the path calculation
  
  //Draw the optimal path
  drawPath(matrix);
}

//Redraw the map using the path matrix 
//**Note: the path is not retained in memory so path elements will be lost if hovered over
function drawPath(pathMatrix){
  for(var i = 0; i < pathMatrix.length; i++){
  	for(var j = 0; j < pathMatrix[i].length; j++){
    	if(pathMatrix[i][j] == path){//Only the path cells need to be changed
        var elementID = "btn" + (j + i * M);
        var cell = document.getElementById(elementID);
        
        cell.style.backgroundColor = pathColor;
        cell.disabled = true;
      }
    }
  }
}

//Initial matrix creation
generateMatrix();