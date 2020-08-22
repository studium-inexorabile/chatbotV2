import React from 'react';
import './App.css';

let fs = require("fs");

let modelPromise = {};
let search;
let input;
let answerDiv;


const process = async function () {
  let text = await fs.readFile('./text.json')
  const passage = JSON.parse(text)
  const model = await modelPromise;
  const answers = await model.findAnswers(input.value, passage);
  console.log(answers)
  answerDiv.innerHTML = answers.map(answer => answer.text + ' (score =' + answer.score + ')').join('<br />')
}

window.onload = () => {

};

class App extends React.Component {
  componentDidMount() {
    modelPromise = qna.load();
    input = document.getElementById('question');
    search = document.getElementById('search');
    contextDiv = document.getElementById('context');
    answerDiv = document.getElementById('answer');
    search.onclick = process;

    input.addEventListener('keyup', async (event) => {
      if (event.key === 'Enter') {
        process();
      }
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <h3>Question</h3>
        <input type='text' id="question"/> <button id="search">Search</button>
          <h3>Answers</h3>
          <div id='answer'></div>
      </div>
    );
  }
}

export default App;
