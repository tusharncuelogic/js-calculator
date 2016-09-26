function Calculator() {

	var calc_html = '<form class="frm_calc"><div class="history"></div><table border=2> <tr> <td colspan=4> <input type=text Name="display" class="calc_result_box"> </td></tr><tr> <td> <input type=button value="0" class="add_val"> </td><td> <input type=button value="1" class="add_val"> </td><td> <input type=button value="2" class="add_val"> </td><td> <input type=button value="+" class="add_val"> </td></tr><tr> <td> <input type=button value="3" class="add_val"> </td><td> <input type=button value="4" class="add_val"> </td><td> <input type=button value="5" class="add_val"> </td><td> <input type=button value="-" class="add_val"> </td></tr><tr> <td> <input type=button value="6" class="add_val"> </td><td> <input type=button value="7" class="add_val"> </td><td> <input type=button value="8" class="add_val"> </td><td> <input type=button value="*" class="add_val"> </td></tr><tr> <td> <input type=button value="9" class="add_val"> </td><td> <input type=button value="C" class="add_val"> </td><td> <input type="submit" value="=" class="calc_result"> </td><td> <input type=button value="/" class="add_val"> </td></tr></table> </form>';

	var result  = '' ;
	var result_box = '' ;

	document.addEventListener('click', function(e) {

	    e = e || window.event;
	    var target = e.target;
	    if(target.className=="history_input" || target.className=="history_delete"  || target.className=='calc_result' || target.className=='add_val') 
	    {
	    	var parent_form = getParentForm(target) ;
	    	var parent_div =  parent_form.parentNode;
	    	if(parent_form)
	    	{
	    		result_box=parent_form.getElementsByClassName('calc_result_box');
	    	}

	    	cls = target.className ;

	    	if(cls=="history_input")
		    {
		    	inputdiv.value = target.textContent ;
		    }
		    else if(cls=="history_delete")
		    {
		    	target.parentNode.parentNode.removeChild(target.parentNode);
		    	//localStorage.setItem("histories",historydiv.innerHTML);
		    	delete_history(parent_div);
		    }
		    else if(cls=="add_val")
		    {
		    	result_box.display.value=result_box.display.value + target.value;
		    }
		    else if(cls=="calc_result")
		    {
		    	var calc_input = result_box.display.value ;
		    	result_box.display.value = calculate(calc_input);		    	
		    	add_history(parent_div , calc_input,result_box.display.value );
		    }

		    e.preventDefault();

	    }    
	}, false) ;


	var getParentForm =  function(ele) {
		var cnt  =  1 ;
		while(ele && cnt < 15) {
			calc_frm =  ele.parentNode;
			if(calc_frm.tagName == 'FORM') {
				return calc_frm ;
			}
			else {
				cnt++;
				ele = calc_frm;
			}
		}
		return null;
	}

	var operations = {
		add: function(a,b){return a + b; } ,
		substract: function(a,b){return a - b; } ,
		multiply: function(a,b){return a * b; } ,
		divide: function(a,b){return a / b; }
	}

	var calculate = function(str) {
		var inputstr = str;
		var result = '';
		if(parseInt(str))
		{
			result = parseInt(str) ;
			str = str.replace(result,"") ;
			var ops = ['+','-','*','/']  ;
			var do_ops = ['add','substract','multiply','divide'] ;
			while(str != '')
			{
				if(ops.indexOf(str[0]) >= 0)
				{
					var op = do_ops[ops.indexOf(str[0])];
					str =  str.replace(str[0],"");
					var tmp = parseInt(str)   ;
					result = operations[op](result,tmp)  ;
					str = str.replace(tmp,"");
				} else {
					alert("Invalid expression") ;
				}
			}
		}
		else {
			alert("Invalid expression") ;
		}
		return result;
	}

	var delete_history =  function(parent_div) {
		var history_div = parent_div.getElementsByClassName('history') ;
		localStorage.setItem("history_"+parent_div.id ,history_div[0].innerHTML) ;
	}

	var add_history = function(parent_div,h_input,h_output) {
		var history_div = parent_div.getElementsByClassName('history') ;
		console.log(history_div) ;
		var node = document.createElement("DIV") ;
		var inputdiv = document.createElement("span");
		var delete_div = document.createElement("span");
		node.className = 'history_row';
		inputdiv.className = 'history_input';
		delete_div.className = 'history_delete';
		var inputtext = document.createTextNode(h_input);
		inputdiv.appendChild(inputtext);
		var outputdiv = document.createTextNode("="+h_output);
		var deletetext = document.createTextNode("x");
		delete_div.appendChild(deletetext);	
		node.appendChild(inputdiv);
		node.appendChild(outputdiv);
		node.appendChild(delete_div);
		history_div[0].appendChild(node) ;
		localStorage.setItem("history_"+parent_div.id ,history_div[0].innerHTML) ;
	}

	var load_history = function(id) {
		var history_parent =  document.getElementById(id);
		var history_div = history_parent.getElementsByClassName('history');
		var history_txt = localStorage.getItem("history_"+id) ;
		history_div[0].innerHTML = history_txt;
		console.log("Loading history");
		console.log(history_txt);		
	}

	var init =  function(id) {
		var calc  = document.getElementById(id) ;
		if(calc) {
			calc.innerHTML = calc_html;
		}
		var frm =  calc.getElementsByTagName("form");
		frm.id =  'frm_'+id;
		load_history(id);
	}

	return init;
}


/*Initialise calculator*/
var calculator = Calculator() ;
calculator("calc1");
calculator("calc2");
calculator("calc3");
calculator("calc4");
