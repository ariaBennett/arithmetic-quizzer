import Equation from "equations"

const question = generateQuestion();
const solution = generateSolution(question)

const Question = () => {
    return (
    <div className="container"> 
        {question}
    </div>
    )
};

function generateQuestion() {
    // Define how many operands to use, as well as lowest and highest allowed integers.
    const numberOfOperands = 2 + Math.floor(Math.random() * 3);
    const min = 0;
    const max = 20;
    let operands = [];
    let operators = [];

    // Generate a random integer and an operator.
    const operatorTable = {
        0 : '+',
        1 : '-',
        2 : '*',
        3 : '/',
    };
    for (let i = 0; i < numberOfOperands; i++) {
        operands.push(Math.floor(Math.random() * (max - min + 1) + min));
        operators.push(operatorTable[(Math.floor(Math.random() * 4))]);
    };
    operators.pop();

    const question = operands.map(function(operand, index) {
        return operand + ' ' + (operators[index] || '');
    });

    return question.join(' ');
}

function generateSolution(question) {
    return Math.round(Equation.solve(question));
}

export default Question;
