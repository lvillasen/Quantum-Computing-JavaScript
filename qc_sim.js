

window.onload = function() {
  auto_height();
};
var my_element = document.getElementById("my_element");
my_element.scrollIntoView({
  behavior: "smooth",
  block: "start",
  inline: "nearest"
});
//var text_out = document.getElementById("p");
var text_out = document.getElementById("results");



textArea = document.getElementById("text_area");
textArea.cols = "100";
function auto_height() {  /* javascript */
    textArea.style.height = "1px";
    textArea.style.height = (textArea.scrollHeight)+"px";
}



var line;
var n_qbits = 0;
var qbit = -1;
var qbit_2 = -1 
var arrayOfLines;
var verbose = 0;
var index =-1;
var message='';

function get_n_qbits(){
n_qbits = -1;
qbit_2 = -1
var qbit1 = -1;
var qbit2 = -1;
arrayOfLines = textArea.value.split("\n"); 
//console.log(arrayOfLines)
// Get number of qubits
for (var i=0;i<arrayOfLines.length;i++){
	line = arrayOfLines[i];
	if (line.split(";").length >1){
		
		qbit1,qbit2 = get_qbits(line);
//console.log(arrayOfLines[i].split(";")[0]);
		//console.log(g)
		//console.log(line)
		//console.log(get_qbits(line))
} 
n_qbits = Math.max(n_qbits,Math.max(qbit1,qbit2)+1)
//console.log("qbit = "+qbit)
}
console.log("n_qbits = "+n_qbits)
}


function get_qbits_new(line){
var qbit_c_i=-1,qbit_c_f=-1,qbit_t_i=-1,qbit_t_f=-1
const array_line = line.split(":");
// No :s
if (array_line.length ==1){
	if (line.split("[").length == 2){
		qbit_c_i=line.split("[")[1].split("]")[0]
		qbit_c_f = qbit_c_i ;
	}
	if (line.split("[").length == 3){
		qbit_c_i=line.split("[")[1].split("]")[0]
		qbit_c_f = qbit_c_i ;
		qbit_t_i=line.split("[")[2].split("]")[0]
		qbit_t_f = qbit_t_i ;
	}
	//text_out.textContent += "\n"+ line +" No Hay :s " +  qbit_c_i + " "+ qbit_c_f +" "+qbit_t_i+ " "+ qbit_t_f;
}


// Only first :
if (array_line.length ==2){
if (array_line[0].split("]").length == 1){
	if (line.split("[").length == 2){
		qbit_c_i=line.split("[")[1].split(":")[0]
		qbit_c_f=line.split(":")[1].split("]")[0]
	}
	if (line.split("[").length == 3){
		qbit_c_i=line.split("[")[1].split(":")[0]
		qbit_c_f=line.split(":")[1].split("]")[0]
		qbit_t_i=line.split("[")[2].split("]")[0]
	}

	//text_out.textContent += "\n"+ line +"  Hay primer :" + + qbit_c_i + " "+ qbit_c_f +" "+qbit_t_i+ " "+ qbit_t_f;
}
}

// Only second :
if (array_line.length ==2){
	if (array_line[0].split("]").length == 2){
		qbit_c_i=line.split("[")[1].split("]")[0]
		qbit_t_i=line.split("[")[2].split(":")[0]
		qbit_t_f=line.split(":")[1].split("]")[0]
	
	//text_out.textContent += "\n"+ line +"  Hay segundo :" + qbit_c_i + " "+ qbit_c_f +" "+qbit_t_i+ " "+ qbit_t_f;
	}
}

// 2 :s
if (array_line.length ==3){
		qbit_c_i=line.split("[")[1].split(":")[0]
		qbit_c_f=line.split(":")[1].split("]")[0]
		qbit_t_i=line.split("[")[2].split(":")[0]
		qbit_t_f=line.split(":")[2].split("]")[0]
	//text_out.textContent += "\n"+ line +"  Hay segundo :" + qbit_c_i + " "+ qbit_c_f +" "+qbit_t_i+ " "+ qbit_t_f;


}
return qbit_c_i + " "+ qbit_c_f +" "+qbit_t_i+ " "+ qbit_t_f;
}




var A; // = new Array(n_qbits**2).fill(0);
var C;

var M = new Array(n_qbits).fill(0);
  
function scan_file_n_qbits(){
	//console.log("Scanning .....")
	n_qbits = 0
	arrayOfLines = textArea.value.split("\n"); 
	text_out.textContent = "";
	//text_out.textContent += "\nScanning .....";
	for (var i=0;i<arrayOfLines.length;i++){
		line = arrayOfLines[i];
		line = line.trimStart();
		var s = get_qbits_new(line).split(" ");
		array_qbits = s.map(toNumber)
		//text_out.textContent += "\n"+line+" "+array_qbits + " "+math.max(array_qbits);
		n_qbits =  math.max(n_qbits,math.max(array_qbits)+1)
	}
	text_out.textContent += "Number of Qubits = "+n_qbits;
}

function scan_file_operators(){
	text_out.textContent += "\nScanning .....";
	A = new Array(2**n_qbits).fill(math.complex(0,0));
	A[0]=math.complex(1,0);
	for (var i=0;i<arrayOfLines.length;i++){
		line = arrayOfLines[i];
		line = line.trimStart();
		var s = get_qbits_new(line).split(" ");
		array_qbits = s.map(toNumber)
	if (line.split(";").length >1){
		g=line.split(";")[0].split(" ")[0]
		if (g == 'verbose'){
		verbose = parseInt(line.replace(/^\D+/g, '')); // Replace all leading non-digits with nothing
		console.log(g +" " + verbose)
		}else if (g == 'sign'){
		index = parseInt(line.replace(/^\D+/g, '')); // Replace all leading non-digits with nothing
		console.log(g +" " + index)

			B = SIGN(n_qbits,index,A)
			A = B
			C = B
			A,C = print_state(g,n_qbits,verbose,B)

		}else if (g == 'x'){
		for (var j=array_qbits[0];j<array_qbits[1]+1;j++){
			B = X(n_qbits,j,A)
			A = B
			C = B
			A,C = print_state(g,n_qbits,verbose,B);
		}
		}else if (g == 'y'){
			for (var j=array_qbits[0];j<array_qbits[1]+1;j++){
			B = Y(n_qbits,j,A)
			A = B
			C = B
			A,C = print_state(g,n_qbits,verbose,B);
		}
		}else if (g == 'z'){
			for (var j=array_qbits[0];j<array_qbits[1]+1;j++){
			B = Z(n_qbits,j,A)
			A = B
			C = B
			A,C = print_state(g,n_qbits,verbose,B)
		}
		}else if (g == 'h'){
			for (var j=array_qbits[0];j<array_qbits[1]+1;j++){
			B = H(n_qbits,j,A)
			A = B
			C = B
			A,C = print_state(g,n_qbits,verbose,B)
		}
		}else if (g == 'cx'){
			B = CX(n_qbits,array_qbits[0],array_qbits[2],A)
			A = B
			C = B
			A,C = print_state(g,n_qbits,verbose,B)
		}
		

		
} 

}

}


function start(){
	//arrayOfLines = textArea.value.split("\n"); 
	scan_file_n_qbits();
	scan_file_operators();
	A,C = print_state("Final",n_qbits,verbose,B);
	make_plot();
}

function X(n_qbits,qbit,A){
	console.log('X gate applied to qubit '+ qbit  )
	text_out.textContent += "\n X gate applied to qubit "+ qbit;
	//B = np.zeros(2**n_qbits,dtype=np.complex_)
	var B = new Array(2**n_qbits).fill(math.complex(0,0));
for (var j =0;j<2**n_qbits;j++){
if (A[j] != 0){

	var bit_parity=(j>>qbit)%2
	//console.log("j bit_parity " + j+" "+bit_parity)
	if (bit_parity == 0){
				B[set_bit(j,qbit)] = math.add(B[set_bit(j,qbit)], A[j]);
				//console.log("j A[j] set_bit(j,qbit) "+ j+" " +A[j] +" "+set_bit(j,qbit))
	}
	if (bit_parity == 1){
				B[clear_bit(j,qbit)] =math.add(B[clear_bit(j,qbit)],A[j]);
				//console.log("j A[j] bit_parity " + j+" "+A[j]+" "+bit_parity)
}

}
}

return B
}


function Y(n_qbits,qbit,A){
	console.log('Y gate applied to qubit '+ qbit)
	text_out.textContent += "\n Y gate applied to qubit "+ qbit ;
	var B = new Array(2**n_qbits).fill(math.complex(0,0));
for (var j =0;j<2**n_qbits;j++){
if (A[j] != 0){
	var bit_parity=(j>>qbit)%2
	if (bit_parity == 0){
		B[set_bit(j,qbit)] = math.add(B[set_bit(j,qbit)] ,math.multiply( A[j], math.i)); 
	}
	if (bit_parity == 1){
	B[clear_bit(j,qbit)] = math.subtract(B[clear_bit(j,qbit)] ,math.multiply( A[j], math.i));  
}
}
}

return B
}

function Z(n_qbits,qbit,A){
	console.log('Z gate applied to qubit '+ qbit)
	text_out.textContent += "\n Z gate applied to qubit "+ qbit ;
	var B = new Array(2**n_qbits).fill(math.complex(0,0));
for (var j =0;j<2**n_qbits;j++){
if (A[j] != 0){
	var bit_parity=(j>>qbit)%2
	if (bit_parity == 0){
		B[j] = math.add(B[j],A[j]); 
	}
	if (bit_parity == 1){
		B[j] = math.add(B[j],-A[j]); 
}
}
}

return B
}


function H(n_qbits,qbit,A){
	console.log('Hadamard gate applied to qubit '+ qbit)
	text_out.textContent += "\n Hadamard gate applied to qubit "+ qbit ;

	var B = new Array(2**n_qbits).fill(math.complex(0,0));
	const isq2 = 1/math.sqrt(2)
for (var j =0;j<2**n_qbits;j++){
if (A[j] != math.complex(0,0)){
	var a_j = math.multiply(isq2,A[j])
	var bit_parity=(j>>qbit)%2
	if (bit_parity == 0){
		B[j] = math.add(B[j],a_j)
		B[set_bit(j,qbit)] = math.add(B[set_bit(j,qbit)] ,  a_j); 
	}
	if (bit_parity == 1){
	B[clear_bit(j,qbit)] = math.add(B[clear_bit(j,qbit)] , a_j); 
	B[j] = math.subtract(B[j],a_j) 
}
}
}

return B
}

function CX(n_qbits,qbit_c,qbit_t,A){
	text_out.textContent += "\n CX gate applied to control qubit "+ qbit_c + " and target qubit " + qbit_t;

	var B = new Array(2**n_qbits).fill(math.complex(0,0));
for (var j =0;j<2**n_qbits;j++){
if (A[j] != 0){
	var bit_parity_c=(j>>qbit_c)%2
	var bit_parity_t=(j>>qbit_t)%2
	if (bit_parity_c == 0){
		B[j] = math.add(B[j],A[j])
	}else if (bit_parity_t== 0) {
		B[set_bit(j,qbit_t)] = math.add(B[set_bit(j,qbit_t)] ,  A[j]); 
	} else {
B[clear_bit(j,qbit_t)] = math.add(B[clear_bit(j,qbit_t)] ,A[j]); 

	}
	
}
}
return B
}

function SIGN(n_qbits,index,A){
	console.log("function sign "+index)
	B = A
	B[index] = -A[index];
	text_out.textContent += "\n Sign flip on index "+ index + " resulted in state ";
	return B
}





function set_bit(value, bit){
    return value | (1<<bit)
}

function clear_bit(value, bit){
    return value & ~(1<<bit)
}

function print_state(g,n_qbits,verbose,B){
//console.log("verbose = "+verbose)
	
		console.log('  resulted in state |psi> = ');
		//text_out.textContent += "\n  |psi> = ";
		var k1=0;
		var psi=''
for (var k =0;k<2**n_qbits;k++){
			var s_i=dec2bin(k);
			if (s_i.length < n_qbits) s_i = Array(n_qbits - s_i.length + 1).join("0")+s_i
			if (B[k] != 0){ 
				//console.log(B[k])
				k1+=1
				if (k1 == 1){ psi += math.round(B[k],3) + '|'+s_i+'> '

				}else{
					psi += '+ '+ math.round(B[k],3)  + '|'+s_i+'> '
				}
			}
		psi=psi.replace('+ -', '- ')
			}
		console.log(psi)
		if (verbose == 1){
	//text_out.textContent += "\n  resulted in state |psi> =" +  psi;
	if (g !== "Final"){text_out.textContent += "\n  resulted in state |psi> =" +  psi;}
}
if (g == "Final"){text_out.textContent += "\n\nFinal State |psi> =" +  psi;}

	C = B
	A = B
	return A,C
}

function dec2bin(dec) {
  return (dec >>> 0).toString(2);
}

function toNumber(value) {
   return Number(value);
}
function make_plot(){
var X_data = [];var Y_data =[];
for (var i = 0; i < 2**n_qbits; i++) {
	console.log(A[i] + math.multiply(A[i],math.conj(A[i])));
    X_data.push(i);
    var y_prob = math.multiply(A[i],math.conj(A[i]))
    Y_data.push(y_prob.re);
    console.log(y_prob)
}

      var layout = {
          xaxis: {
              //   range: [0, N],
              title: "Computational Basis States"
          },
          yaxis: {
              //    range: [-1, 1],
              title: "Probabilities"
          },
          title: "Probabilities for Each State of the Computational Basis"
      };
      var data = [{
          x: X_data,
          y: Y_data,
          //mode: "lines+markers"
          type: 'bar',
            marker: {
    color: 'rgb(158,202,225)',
    opacity: 0.6,
    line: {
      color: 'rgb(8,48,107)',
      width: 1.5
    }
  }

    
      }];
console.log(Y_data);

Plotly.newPlot("plot1", data, layout);
}