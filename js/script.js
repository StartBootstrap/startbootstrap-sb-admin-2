//creating a Filter class
function Filter(dataStream, minMaxValue, minMaxNormalization, northEastCoords, southWestCoords){
	this.dataStream = dataStream;
	this.minValue = minMaxValue[0];
	this.maxValue = minMaxValue[1];
	this.minNormalization = minMaxNormalization[0];
	this.maxNormalization = minMaxNormalization[1];
	this.northEastLong = northEastCoords[0];
	this.northEastLat = northEastCoords[1];
	this.southWestLong = southWestCoords[0];
	this.southWestLat = southWestCoords[1];
	this.getdataStream = function(){
		return this.dataStream;
	}
	this.getMinValue = function(){
		return this.minValue;
	}
	this.getMaxValue = function(){
		return this.maxValue;
	}
	this.getMinNormalization = function(){
		return this.minNormalization;
	}
	this.getMaxNormalization = function(){
		return this.maxNormalization;
	}
	this.getNorthEastLong = function(){
		return this.northEastLong;
	}
	this.getNorthEastLat = function(){
		return this.northEastLat;
	}
	this.getSouthWestLong = function(){
		return this.southWestLong;
	}
	this.getSouthWestLat = function(){
		return this.southWestLat;
	}
}

function isValidInput(input){
	return input !== "";
}



function validateFilterInput(){
	//check data stream
	if (!isValidInput(document.getElementById("filterDataStream").value)){
		document.getElementById("filterDataStreamDiv").className = "form-group has-error";
		var dataStream = document.getElementById("filterDataStream");
		$(dataStream).on("change", function(){
			if (isValidInput(dataStream.value)){
				dataStream.parentNode.parentNode.className = "form-group";	
				
			}
		})
	}


	//if the value checkbox is checked, inspect the min and max input boxes
	var valueCheck = document.getElementById("filterValue");
	var minValue = document.getElementById("inputFilterValueMin");
	var maxValue = document.getElementById("inputFilterValueMax");
	if (valueCheck.checked){

		if (!isValidInput(minValue.value)){
			minValue.parentNode.className = "control-label has-error";
			$(minValue).on("change", function(){
				if (isValidInput(minValue.value)){
					minValue.parentNode.className = "control-label";
				}
			})
		}

		if (!isValidInput(maxValue.value)){
			maxValue.parentNode.className = "control-label has-error";
			$(maxValue).on("change", function(){
				if (isValidInput(maxValue.value)){
					maxValue.parentNode.className = "control-label";
				}
			})
		}		
	} else{
		minValue.parentNode.className = "control-label";
		maxValue.parentNode.className = "control-label";
	}

	
	
	//if the norm checkbox is checked, inspect the norm min and max
	var normCheck = document.getElementById("filterNorm");
	var minNorm = document.getElementById("inputFilterNormMin");
	var maxNorm = document.getElementById("inputFilterNormMax");
	if (normCheck.checked){
		if (!isValidInput(minNorm).value){
			minNorm.parentNode.className = "control-label has-error";
			$(minNorm).on("change", function(){
				if (isValidInput(minNorm.value)){
					minNorm.parentNode.className = "control-label";
				}
			})
		}	
		if (!isValidInput(maxNorm).value){
			maxNorm.parentNode.className = "control-label has-error";
			$(maxNorm).on("change", function(){
				if (isValidInput(maxNorm.value)){
					maxNorm.parentNode.className = "control-label";
				}
			})
		}
	} else{
		minNorm.parentNode.className = "control-label";
		maxNorm.parentNode.className = "control-label";
	}

	
	

	

	//validate Location checkbox
	var locationCheck = document.getElementById("filterLocation")
	var neLong = document.getElementById("inputFilterNELong");
	var neLat = document.getElementById("inputFilterNELat");
	var swLong = document.getElementById("inputFilterSWLong");
	var swLat = document.getElementById("inputFilterSWLat");
	if (locationCheck.checked){

		if (!isValidInput(neLong).value){
			neLong.parentNode.className = "control-label has-error";
			$(neLong).on("change", function(){
				if (isValidInput(neLong.value)){
					neLong.parentNode.className = "control-label";
				}
			})
		}	

		if (!isValidInput(neLat).value){
			neLat.parentNode.className = "control-label has-error";
			$(neLat).on("change", function(){
				if (isValidInput(neLat.value)){
					neLat.parentNode.className = "control-label";
				}
			})
		}

		if (!isValidInput(swLong).value){
			swLong.parentNode.className = "control-label has-error";
			$(swLong).on("change", function(){
				if (isValidInput(swLong.value)){
					swLong.parentNode.className = "control-label";
				}
			})
		}

		if (!isValidInput(swLat).value){
			swLat.parentNode.className = "control-label has-error";
			$(swLat).on("change", function(){
				if (isValidInput(swLat.value)){
					swLat.parentNode.className = "control-label";
				}
			})
		}
	} 
	else{
		neLong.parentNode.className = "control-label";
		neLat.parentNode.className = "control-label";
		swLong.parentNode.className = "control-label";
		swLat.parentNode.className = "control-label";
	}
}

function filterHasErrors(){
	// function that scans through all of the tags and check if they have the class 'has-errors' attribute
	var dataStreamDiv = document.getElementById("filterDataStreamDiv"); 
	//if substring not found, indexOf will return -1
	if (dataStreamDiv.className.indexOf("has-error") > -1){
		return true;
	}

	var myArray = new Array();
		var minValue = document.getElementById("inputFilterValueMin"); 
		var maxValue = document.getElementById("inputFilterValueMax"); //.parentNode.className
		var minNorm = document.getElementById("inputFilterNormMin");
		var maxNorm = document.getElementById("inputFilterNormMax"); //.parentNode.className
		var neLong = document.getElementById("inputFilterNELong");
		var neLat = document.getElementById("inputFilterNELat");
		var swLong = document.getElementById("inputFilterSWLong");
		var swLat = document.getElementById("inputFilterSWLat"); //.parentNode.className
		myArray.push(minValue);
		myArray.push(maxValue);
		myArray.push(minNorm);
		myArray.push(maxNorm);
		myArray.push(neLong);
		myArray.push(neLat);
		myArray.push(swLong);
		myArray.push(swLat);
	
	for (i = 0; i < myArray.length; i++){
		if (myArray[i].parentNode.className.indexOf("has-error") > -1){
			return true;
		}
	}
	return false;
}

function processFilter(){
	if (!filterHasErrors()){
		document.getElementById("filterClose").click();
		$('canvas').drawArc({
		  strokeStyle: 'black',
		  strokeWidth: 2,
		  x: 150, y: 50,
		  radius: 30
		});
	} else{
		alert("There are still errors");
	}
}



function validate2DInput(){
	var dataStream1 = document.getElementById("2DdataStream1");
	var dataStream2 = document.getElementById("2DdataStream2");
	if (!isValidInput(dataStream1.value)){
		dataStream1.parentNode.parentNode.className = "form-group has-error";
		$(dataStream1).on("change", function(){
			if (isValidInput(dataStream1.value)){
				dataStream1.parentNode.parentNode.className = "form-group";
			}
		})
	}

	if (!isValidInput(dataStream2.value)){
		dataStream2.parentNode.parentNode.className = "form-group has-error";
		$(dataStream2).on("change", function(){
			if (isValidInput(dataStream2.value)){
				dataStream2.parentNode.parentNode.className = "form-group";
			}
		})
	}

	var timeLagValue = document.getElementById("timeLagValue");
	if (!isValidInput(timeLagValue.value)){
		timeLagValue.parentNode.className = "control-label has-error";
		$(timeLagValue).on("change", function(){
			if (isValidInput(timeLagValue.value)){
				timeLagValue.parentNode.className = "control-label";
			}
		})
	}

	var timeLagUnit = document.getElementById("timeLagUnit");
	if (!isValidInput(timeLagUnit.value)){
		timeLagUnit.parentNode.className = "control-label has-error";
		$(timeLagUnit).on("change", function(){
			if (isValidInput(timeLagUnit.value)){
				timeLagUnit.parentNode.className = "control-label";
			}
		})
	}
}


