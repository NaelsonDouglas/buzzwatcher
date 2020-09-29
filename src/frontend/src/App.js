import React from 'react';
import './App.css';
import Frame from './frame'

const single_tweet = {
  "Tweets": "Precisa desenhar? Bolsonaro quer eleger Russomano e acionou a PF pra tentar me intimidar. O medo deles do nosso crescimento só mostra que estamos no caminho certo. São Paulo vai ser a capital da resistência! https://t.co/GlFUkWraOI",
  "Likes": 19535,
  "sentiment": "pos"
}
const sample = [single_tweet, single_tweet]

function App() {
  return (
    <div className="App">
      <Frame>
      </Frame>
    </div>
  );
}

export default App;
