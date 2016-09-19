res = document.getElementById("result") ;

var addVal = function(val) {
	var res = document.getElementById("result") ;
	res.value += val;
}

var calculate = function() {
	var input = res.value;
	var output= eval(input) ;
	res.value = output;    			
	addHistory(input , output) ;
	event.preventDefault();
	return false;
}

var addHistory = function(input , output) {
	var history = document.getElementById("history") ;
	var node = document.createElement("DIV");
	var inputdiv = document.createElement("span");
	inputdiv.className = 'history_input';
	var inputtext = document.createTextNode(input);
	var outputdiv = document.createTextNode("="+output);
	inputdiv.appendChild(inputtext);
	node.appendChild(inputdiv);
	node.appendChild(outputdiv);
	history.appendChild(node) ;   			
}

var loadHistory = function() {
	var history = document.getElementById("history") ;
}

document.addEventListener('click', function(e) {
	    e = e || window.event;
	    var target = e.target ;
	    if(target.className=="history_input")
	    {
	    	res.value = target.textContent;
	    }
	}, false);
