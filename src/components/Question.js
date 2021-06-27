import { useState } from "react";
import Equation from "equations"

import Card from 'react-bootstrap/Card';

const question = generateQuestion();
const solution = generateSolution(question)

const Question = () => {
    const [userSolution, setUserSolution] = useState("");
    const [userIsCorrect, setUserIsCorrect] = useState(false);
    const [solutionSubmitted, setSolutionSubmitted] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setSolutionSubmitted(true);
        setUserIsCorrect(checkSolution(userSolution, solution));
    }

    function reset() {
        // Generates a new question.
        setUserSolution("");
        setUserIsCorrect(false);
        setSolutionSubmitted(false);
    }

    return (
        <Card style={{ width: '30rem' }}>
            <Card.Body>
                <Card.Title>
                    Question
                </Card.Title>
                <div>
                    <form onSubmit={handleSubmit}>
                        What is the solution, rounded to the nearest whole number?:
                        <br />
                        <br />
                        {`${question} = `}
                        <input 
                        type="text"
                        value={userSolution}
                        onChange={e => setUserSolution(e.target.value)} />
                        <input type="submit" value="Submit" />
                        <br />
                        <br />
                    </form>
                </div>
                {solutionSubmitted ?
                    <div> 
                        <div class="alert alert-info">Answer: <b>{solution}</b></div>
                        { userIsCorrect ? 
                        <div class="alert alert-success">
                            Correct!: your answer <b>{userSolution}</b>
                        </div>  : 
                        <div class="alert alert-danger">
                            Incorrect, your answer: <b>{userSolution}</b>
                        </div> }
                        <input 
                        type="button" 
                        value="New Question" 
                        onClick={reset}/>
                    </div> : null
                }
            </Card.Body>
        </Card>
    )
};

function generateQuestion() {
    // This function builds a randomly generated arithmetic question as a string.
    const numberOfOperands = 2 + Math.floor(Math.random() * 3);
    const min = 0;
    const max = 20;
    let operands = [];
    let operators = [];

    // Generate the random integers and an operators.
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

    // Build the string.
    let question = operands.map(function(operand, index) {
        return operand + ' ' + (operators[index] || '');
    }).join(' ');

    // Check for unwanted cases: NaN & Infinity
    if (isNaN(generateSolution(question)) || generateSolution(question) === Infinity) {
        question = generateQuestion();
    }

    return question
}

function generateSolution(question) {
    // The node module "Equation" takes in a string of operands
    // and operators and returns the solution. We could create
    // a solution by hand here but this works well and keeps
    // the code cleaner.
    return Math.round(Equation.solve(question));
}

function checkSolution(userSolution, solution) {
    // Checks if the user's solution is the same as the correct
    // solution.
    solution = solution.toString();
    return userSolution === solution;
}

export default Question;
