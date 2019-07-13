	var progressbar_data = "";	
	function getNewValue ( old, btn ) {
		return parseInt(Math.max((parseInt(btn,0) + parseInt(old,0)), 0)) ;
	}
	function getPercent ( old, btn ) {
		return parseInt(getNewValue(old,btn)*100/progressbar_data.limit);
	}
	function updateProgress(btn){
	
		var e = document.getElementById("selectprogess"); 
		var selectedprogess = e.options[e.selectedIndex].value;	
		var old = document.getElementById("percent-"+selectedprogess).title ;
		document.getElementById("percent-"+selectedprogess).title = "" + getNewValue(old,btn) ;
		btn = getPercent(old, btn) ;
		ele = document.getElementById(selectedprogess) ;
		if (btn > 100){
			ele.style="background-color: red;width:"+100+"%; visibility: visible;transition: width 0.25s";
		} else if (btn > 0 ){		
			ele.style="width:"+btn+"%; visibility: visible;transition: width 0.25s";
		} else {
			ele.style="width:"+btn+"%; visibility: hidden;";
		}
		document.getElementById("percent-"+selectedprogess).innerHTML = btn+"%";
	}
	
	function processresponse(){
		var btnselector = "";
		var n = progressbar_data.buttons.length ;
		for (var i = 0; i < n; i++) {
			btnselector += "<button class='btncontrols' onclick='updateProgress("+progressbar_data.buttons[i]+","+progressbar_data.limit+")' value='"+progressbar_data.buttons[i]+"'>"+ progressbar_data.buttons[i] +"</button>";
	  }
		
		document.getElementById("btnctrls").innerHTML = btnselector;
		
		var barselector = "<select id='selectprogess'>";
		var progressUI = "";
		
		n = progressbar_data.bars.length ;
		for (var j = 1; j <= n; j++){
			barselector = barselector+ "<option value='progress"+j+"'>#progress"+ j +"</option>";
			iPercent = getPercent(0,progressbar_data.bars[j-1]) ;
			progressUI = progressUI + "<div class='pb-border'><div id='progress"+j+"' class='pb-container pb-gray' style='width:"+ iPercent+"%'></div><div class='percent' title='"+progressbar_data.bars[j-1]+"' id='percent-progress"+j+"'>"+iPercent+"%</div></div>";
		}
		barselector = barselector + "</select>";
		
		document.getElementById("barctrls").innerHTML = barselector;
		document.getElementById("pb").innerHTML = progressUI;
	}

	fetch('http://pb-api.herokuapp.com/bars')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Error Status Code: ' +
          response.status);
        return;
      }
      response.json().then(function(data) {
				progressbar_data = data;			
				console.log(progressbar_data) ;
				processresponse() ;
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
