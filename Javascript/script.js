/**-----------------------------------------------------------------------------------------------------------------------
 **                                                     XOR Operations
 *-----------------------------------------------------------------------------------------------------------------------**/
//Initialize xor neural network
const xorNet = new brain.NeuralNetwork();

//Train neural network for xor operations
xorNet.train([
  {
    input: [0, 0],
    output: [0],
  },
  {
    input: [1, 0],
    output: [1],
  },
  {
    input: [0, 1],
    output: [1],
  },
  {
    input: [1, 1],
    output: [0],
  },
]);

//Display neural network
const diagram = document.getElementById("diagram");
diagram.innerHTML = brain.utilities.toSVG(xorNet);

//Output neural network result from sample data
console.log(xorNet.run([0, 0]));

/**-----------------------------------------------------------------------------------------------------------------------
 **                          Determine whether text should be white or black on given background
 *-----------------------------------------------------------------------------------------------------------------------**/
//Initialize neural network (1 = white text 0 = black text) (RGB on a scale of 0-1 rather than 0-255)
const textNet = new brain.NeuralNetwork();

//Initialize training data (results from previous tests to enhance accuracy)
const data = [
  { input: { r: 0, g: 0, b: 0 }, output: [1] },
  { input: { r: 1, g: 1, b: 1 }, output: [0] },
  {
    input: {
      r: 0.774955555379979,
      g: 0.9644619407813073,
      b: 0.14355338561737074,
    },
    output: [0],
  },
  {
    input: {
      r: 0.6517845934761486,
      g: 0.06475038219567586,
      b: 0.27776383670423166,
    },
    output: [1],
  },
  {
    input: {
      r: 0.019086161355543307,
      g: 0.21139484173279977,
      b: 0.19080805878906815,
    },
    output: [1],
  },
  {
    input: {
      r: 0.5929716308779307,
      g: 0.8047206891175047,
      b: 0.8864091314122242,
    },
    output: [0],
  },
  {
    input: {
      r: 0.5331805518781794,
      g: 0.07454698975294338,
      b: 0.3553155370150274,
    },
    output: [1],
  },
  {
    input: {
      r: 0.10098937909449424,
      g: 0.07310263141970141,
      b: 0.8656390714280213,
    },
    output: [1],
  },
  {
    input: {
      r: 0.18916082347447594,
      g: 0.9142352379812355,
      b: 0.47827370469131636,
    },
    output: [0],
  },
  {
    input: {
      r: 0.37923597611123605,
      g: 0.7174937337551364,
      b: 0.7221775568777606,
    },
    output: [0],
  },
  {
    input: {
      r: 0.07945205043498205,
      g: 0.44448016467411144,
      b: 0.5297628501451797,
    },
    output: [1],
  },
  {
    input: {
      r: 0.5060692391603083,
      g: 0.7803842731883144,
      b: 0.3470896624794353,
    },
    output: [0],
  },
  {
    input: {
      r: 0.2780718618057958,
      g: 0.47520940300129166,
      b: 0.2732167818930038,
    },
    output: [1],
  },
  {
    input: {
      r: 0.5288002169867769,
      g: 0.5728919878740037,
      b: 0.27717642987588165,
    },
    output: [1],
  },
  {
    input: {
      r: 0.18294297991426944,
      g: 0.24159840772518848,
      b: 0.06878590704537224,
    },
    output: [1],
  },
  {
    input: {
      r: 0.9679848978109733,
      g: 0.43200797252631906,
      b: 0.10817057029013499,
    },
    output: [0],
  },
  {
    input: {
      r: 0.6933423002917112,
      g: 0.5082133006469687,
      b: 0.39425460600138873,
    },
    output: [1],
  },
  {
    input: {
      r: 0.957724938101135,
      g: 0.7710365451098864,
      b: 0.7377035080388303,
    },
    output: [0],
  },
];

textNet.train(data);

//Initialize elements
const colorE1 = document.getElementById("color");
const guessE1 = document.getElementById("guess");
const whiteButton = document.getElementById("white-button");
const blackButton = document.getElementById("black-button");
const printButton = document.getElementById("print-button");
let color;
setRandomColor();

//Events to choose whether or not white or black is preferable to create training data
whiteButton.addEventListener("click", () => {
  chooseColor(1);
});

blackButton.addEventListener("click", () => {
  chooseColor(0);
});

printButton.addEventListener("click", () => {
  console.log(JSON.stringify(data));
});

function chooseColor(value) {
  data.push({
    input: color,
    output: [value],
  });
  setRandomColor();
}

//Set background to random color and use neural network to guess whether to make the 'guess text' white or black
function setRandomColor() {
  //Set background to random color
  color = {
    r: Math.random(),
    g: Math.random(),
    b: Math.random(),
  };
  //Guess whether or not to make the 'guess' text white or black based on RGB values
  const guess = textNet.run(color)[0];
  guessE1.style.color = guess > 0.5 ? "#FFF" : "#000";

  //Append randomly chosen RGB values to background style
  colorE1.style.backgroundColor = `rgba(${color.r * 255}, ${color.g * 255}, ${
    color.b * 255
  })`;
}

//Display neural network
const textDiagram = document.getElementById("text-diagram");
brain.utilities.toSVG(textNet);

textDiagram.innerHTML = brain.utilities.toSVG(textNet);

//Output neural network result from sample data
console.log(textNet.run({ r: 1, g: 1, b: 0 }));
