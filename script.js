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
	var node = document.createElement("DIV") ;
	var inputdiv = document.createElement("span");
	var delete_div = document.createElement("span");
	node.className = 'history_row';
	inputdiv.className = 'history_input';
	delete_div.className = 'history_delete';
	var inputtext = document.createTextNode(input);
	inputdiv.appendChild(inputtext);
	var outputdiv = document.createTextNode("="+output);
	var deletetext = document.createTextNode("x");
	delete_div.appendChild(deletetext);	
	node.appendChild(inputdiv);
	node.appendChild(outputdiv);
	node.appendChild(delete_div);
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
	    if(target.className=="history_delete")
	    {
	    	target.parentNode.style.display = "None";
	    }
	}, false);
