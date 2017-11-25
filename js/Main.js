var preact = window.preact;
var h = preact.h;
var Component = preact.Component;
var render = preact.render;

class Main extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentDidMount() {
  }

  componentWillMount() {

  }

  render(props, state) {
    return (
      <div>
        <CommonExample />
      </div>
    );
  }
}


render(<Main />, document.getElementById("root"));