"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var possibleCombinationSum = function possibleCombinationSum(arr, n) {
  if (arr.indexOf(n) >= 0) {
    return true;
  }
  if (arr[0] > n) {
    return false;
  }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length,
      combinationsCount = 1 << listSize;
  for (var i = 1; i < combinationsCount; i++) {
    var combinationSum = 0;
    for (var j = 0; j < listSize; j++) {
      if (i & 1 << j) {
        combinationSum += arr[j];
      }
    }
    if (n === combinationSum) {
      return true;
    }
  }
  return false;
};

var Stars = function Stars(props) {
  // const numberOfStars= 1+Math.floor(Math.random()*9);
  return React.createElement(
    "div",
    { className: "col-5" },
    _.range(props.numberOfStars).map(function (i) {
      return React.createElement("i", { id: i, className: "fa fa-star" });
    })
  );
};

var Button = function Button(props) {
  var button = undefined;
  switch (props.isAnswerCorrect) {
    case true:
      button = React.createElement(
        "button",
        { className: "btn btn-success", onClick: function onClick() {
            props.acceptAnswer();props.updateDoneStatus();
          } },
        React.createElement("i", { className: "fa fa-check" })
      );
      break;
    case false:
      button = React.createElement(
        "button",
        { className: "btn btn-danger" },
        " ",
        React.createElement("i", { className: "fa fa-times" })
      );
      break;
    default:
      button = React.createElement(
        "button",
        {
          className: "btn",
          disabled: props.selectedNumbers.length === 0,
          onClick: props.checkAnswer
        },
        " ",
        "="
      );
      break;
  }
  return React.createElement(
    "div",
    { className: "col-2 text-center" },
    button,
    React.createElement("br", null),
    React.createElement("br", null),
    React.createElement(
      "button",
      { className: "btn btn-warning btn-sm", onClick: function onClick() {
          props.redraw(props.redraws);props.updateDoneStatus();
        }, disabled: props.redraws === 0 },
      " ",
      React.createElement(
        "i",
        { className: "fa fa-refresh" },
        props.redraws
      )
    )
  );
};

var Answer = function Answer(props) {
  return React.createElement(
    "div",
    { className: "col-5" },
    props.selectedNumbers.map(function (number, i) {
      return React.createElement(
        "span",
        { id: i, onClick: function onClick() {
            return props.unSelectNumber(number);
          } },
        number,
        " "
      );
    })
  );
};

var Number = function Number(props) {
  var numberClassName = function numberClassName(number) {
    if (props.usedNumbers.indexOf(number) >= 0) {
      return "used";
    }
    if (props.selectedNumbers.indexOf(number) >= 0) {
      return "selected";
    }
  };
  return React.createElement(
    "div",
    { className: "card text-center" },
    React.createElement(
      "div",
      null,
      Number.list.map(function (number, i) {
        return React.createElement(
          "span",
          {
            id: i,
            className: numberClassName(number),
            onClick: function onClick() {
              props.selectNumber(number);
            }
          },
          number
        );
      })
    )
  );
};
Number.list = _.range(1, 10);

var DoneFrame = function DoneFrame(props) {
  return React.createElement(
    "div",
    { className: "text-center" },
    React.createElement("br", null),
    React.createElement(
      "h1",
      null,
      " ",
      props.doneStatus
    ),
    React.createElement(
      "button",
      { className: "btn btn-secondary", onClick: function onClick() {
          props.resetGame();
        } },
      "Play Again"
    )
  );
};

var Game = function (_React$Component) {
  _inherits(Game, _React$Component);

  Game.randomNumber = function randomNumber() {
    return 1 + Math.floor(Math.random() * 9);
  };

  Game.initialState = function initialState() {
    return { selectedNumbers: [],
      numberOfStars: Game.randomNumber(),
      answerIsCorrect: null,
      usedNumbers: [],
      redraw: 7,
      doneStatus: null };
  };

  function Game(props) {
    _classCallCheck(this, Game);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = Game.initialState();
    return _this;
  }

  Game.prototype.resetGame = function resetGame() {
    this.setState(Game.initialState());
  };

  Game.prototype.updateDoneStatus = function updateDoneStatus() {
    var _this2 = this;

    console.log('updatefunction');
    this.setState(function (prevState) {
      if (prevState.usedNumbers.length === 9) {
        return { doneStatus: 'You Won!' };
      }
      console.log(prevState.redraw);
      console.log(prevState.usedNumbers + prevState.numberOfStars + 'passed to possible Solutions');
      if (prevState.redraw === 0 && !_this2.possibleSolutions(prevState)) {
        return { doneStatus: 'Game Over!' };
      }
    });
  };

  Game.prototype.possibleSolutions = function possibleSolutions(_ref) {
    var numberOfStars = _ref.numberOfStars;
    var usedNumbers = _ref.usedNumbers;

    console.log('possibleSolution');
    var possibleNumbers = _.range(1, 10).filter(function (number) {
      return usedNumbers.indexOf(number) === -1;
    });
    var k = possibleCombinationSum(possibleNumbers, numberOfStars);
    console.log(k, possibleNumbers, numberOfStars);
    return k;
  };

  Game.prototype.checkAnswer = function checkAnswer() {
    this.setState(function (prevState) {
      return {
        answerIsCorrect: prevState.numberOfStars === prevState.selectedNumbers.reduce(function (acc, num) {
          return acc + num;
        }, 0)
      };
    });
  };

  Game.prototype.acceptAnswer = function acceptAnswer() {

    this.setState(function (prevState) {
      return { usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers), selectedNumbers: [],
        numberOfStars: Game.randomNumber(),
        answerIsCorrect: null };
    });
  };

  Game.prototype.selectNumber = function selectNumber(clickedNumber) {
    if (this.state.usedNumbers.indexOf(clickedNumber) >= 0) {
      return;
    }
    if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) {
      return;
    }

    console.log("here");
    this.setState(function (prevState) {
      return {
        selectedNumbers: prevState.selectedNumbers.concat(clickedNumber),
        answerIsCorrect: null
      };
    });
  };
  // unselectNumber(k){}

  Game.prototype.unSelectNumber = function unSelectNumber(clickedNumber) {
    console.log(clickedNumber);
    this.setState(function (prevState) {
      return {
        selectedNumbers: prevState.selectedNumbers.filter(function (number) {
          return number !== clickedNumber;
        }),
        answerIsCorrect: null
      };
    });
  };

  Game.prototype.redraw = function redraw(_redraw) {
    if (_redraw > 0) {
      this.setState(function (prevState) {
        return {
          selectedNumbers: [],
          numberOfStars: Game.randomNumber(),
          answerIsCorrect: null,
          redraw: prevState.redraw - 1
        };
      });
    }
  };

  Game.prototype.render = function render() {
    var _state = this.state;
    var selectedNumbers = _state.selectedNumbers;
    var numberOfStars = _state.numberOfStars;
    var answerIsCorrect = _state.answerIsCorrect;
    var usedNumbers = _state.usedNumbers;
    var redraw = _state.redraw;
    var doneStatus = _state.doneStatus;

    return React.createElement(
      "div",
      { className: "container" },
      React.createElement(
        "h3",
        null,
        "Counting Stars"
      ),
      React.createElement("hr", null),
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(Stars, { numberOfStars: numberOfStars }),
        React.createElement(Button, {
          selectedNumbers: selectedNumbers,
          checkAnswer: this.checkAnswer.bind(this),
          isAnswerCorrect: answerIsCorrect,
          acceptAnswer: this.acceptAnswer.bind(this),
          redraw: this.redraw.bind(this),
          redraws: redraw,
          updateDoneStatus: this.updateDoneStatus.bind(this)
        }),
        React.createElement(Answer, {
          unSelectNumber: this.unSelectNumber.bind(this),
          selectedNumbers: selectedNumbers
        })
      ),
      React.createElement("br", null),
      doneStatus ? React.createElement(DoneFrame, { doneStatus: doneStatus, resetGame: this.resetGame.bind(this) }) : React.createElement(Number, {
        selectedNumbers: selectedNumbers,
        selectNumber: this.selectNumber.bind(this),
        usedNumbers: usedNumbers
      })
    );
  };

  return Game;
}(React.Component);

var App = function (_React$Component2) {
  _inherits(App, _React$Component2);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  App.prototype.render = function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(Game, null)
    );
  };

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById("App"));