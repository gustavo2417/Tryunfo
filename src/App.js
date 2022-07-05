import React from 'react';
import Card from './components/Card';
import Form from './components/Form';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: '',
      cardTrunfo: 'false',
      cardsSaveds: [],
      hasTrunfo: false,
      isSaveButtonDisabled: 'true',
    };
  }

  SaveButtonDisabled = () => {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
    } = this.state;

    const maxAttr = 90;
    const sum = (Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3));
    const total = 210;

    if (
      cardName !== '' && cardDescription !== '' && cardImage !== ''
      && cardAttr1 >= 0 && cardAttr1 <= maxAttr
      && cardAttr2 >= 0 && cardAttr2 <= maxAttr
      && cardAttr3 >= 0 && cardAttr3 <= maxAttr
      && sum <= total) {
      this.setState({ isSaveButtonDisabled: false });
    } else {
      this.setState({ isSaveButtonDisabled: true });
    }
  }

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    }, () => this.SaveButtonDisabled(), () => this.onSaveButtonClick());
  }

  onSaveButtonClick = () => {
    const cardsSaveds = this.state;
    this.setState((a) => ({
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardName: '',
      cardDescription: '',
      cardImage: '',
      cardRare: 'normal',
      cardsSaveds: [...a.cardsSaveds, cardsSaveds],
    }));
    this.isTrunfo();
  }

  isTrunfo = () => {
    this.setState({ hasTrunfo: true });
  }

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      isSaveButtonDisabled,
      hasTrunfo,
      cardsSaveds,
    } = this.state;

    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          onInputChange={ this.onInputChange }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onSaveButtonClick={ this.onSaveButtonClick }
          hasTrunfo={ hasTrunfo }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />
        {cardsSaveds.map((element) => (
          <Card
            key={ element.cardName }
            cardName={ element.cardName }
            cardDescription={ element.cardDescription }
            cardAttr1={ element.cardAttr1 }
            cardImage={ element.cardImage }
            cardAttr2={ element.cardAttr2 }
            cardAttr3={ element.cardAttr3 }
            cardTrunfo={ element.cardTrunfo }
            cardRare={ element.cardRare }
          />
        ))}
      </div>
    );
  }
}

export default App;
