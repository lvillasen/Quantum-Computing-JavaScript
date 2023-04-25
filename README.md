# Quantum-Computing-JavaScript
Simulator of an ideal quantum computer in JavaScript. The unitary operations are optimized with matrix-free algorithms.
This project is a direct conversion to JavaScript of the QCSim written in Python: https://github.com/lvillasen/Quantum-Computer-Simulator where you can find more examples.


# Usage 

    Clone the repository
    Open index.html with any browser
  
# Live Demo 

https://ciiec.buap.mx/QCSim


# Brief description

This is an ideal simulator. 

The maximum number of qubits it can handle is limited, in a natural way, by the resources available on the system used to run the programs. 

The gates and commands implemented so far are the following:


*	**h q[i];** Hadamard gate H applied to qubit i

*	**x q[i];** X Pauli gate applied to qubit i

*	**y q[i];** Y Pauli gate applied to qubit i

*	**z q[i];** Z Pauli gate applied to qubit i

*	**cx q[i], q[j];** CNOT gate applied to control qubit i and target qubit j

*	**verbose 0(1);** verbose mode off(on)

*	**sign i;** flips sign of states with index i in the standard basis

Lines that do not terminate with a semicolon are treated as comments,
they can be merged with code after the ; terminator or in new lines

The code implements an automatic extension of the range of qubits for the commands X, Y, Z and H, for instance
	
	h q[0:4];
	
is equivalent to

	h q[0];
	h q[1];
	h q[2];
	h q[3];
	h q[4];



The initial state is 
	|000...00>

As usual, qubits are ordered from right to left on the quantum states |psi>

The code

    Bell state
    verbose 1;
    h q[0];
    cx q[0], q[1];
    
    
 produces
 
    Number of Qubits = 2
     Scanning .....
     Hadamard gate applied to qubit 0
     resulted in state |psi> =0.707|00> + 0.707|01> 
     CX gate applied to control qubit 0 and target qubit 1
     resulted in state |psi> =0.707|00> + 0.707|11> 
    Final State |psi> =0.707|00> + 0.707|11> 
