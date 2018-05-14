var preact = window.preact;
var h = preact.h;
var Component = preact.Component;
var render = preact.render;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: null,
      zipCode: [824102, 700046, 560003, 411007, 400011, 110008]
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }
  makeAjaxCall(url, methodType) {
    var promiseObj = new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.open(methodType, url, true);
      xhr.send();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            // console.log("xhr done successfully");
            // debugger
            var resp = xhr.responseText;
            if (resp) {
              try {
                var respJson = JSON.parse(resp);
                resolve(respJson);
              } catch (e) {
                reject(xhr.status);
              }
            }
          } else {
            reject(xhr.status);
            // console.log("xhr failed");
          }
        } else {
          // console.log("xhr processing going on");
        }
      };
      // console.log("request sent succesfully");
    });
    return promiseObj;
  };
	componentDidMount() {
    let endPoint = "http://api.openweathermap.org/data/2.5/weather?zip=" + this.state.zipCode[0] + ",in&appid=d677437bdfcc77537e197a05bed652ab";
    this.makeAjaxCall(endPoint, "GET").then((data)=>{
      this.setState({weather: data});
    })
  }
	handleButtonClick() {
    let random = Math.floor(Math.random() * (5 - 1) + 1)
    let endPoint = "http://api.openweathermap.org/data/2.5/weather?zip=" + this.state.zipCode[random] + ",in&appid=d677437bdfcc77537e197a05bed652ab";
    this.makeAjaxCall(endPoint, "GET").then((data)=>{
      this.setState({weather: data});
    })
  }
	render() {
		if (!this.state.weather) {
      return (
        <div>Loading</div>
      )
    }
		let cityName = this.state.weather.name;
		console.log(cityName)
    return (
      <div>
				<div className={"blankHeight"}></div>
        <button onClick={this.handleButtonClick}>Change Value</button>
        <CityNameComp propName={cityName} label = "Citi name"/>
        <CityNameComp propName={this.state.weather.base} label="Base" />
        <CityNameComp propName={this.state.weather.clouds.all} label="Clouds" />
        <CityNameComp propName={this.state.weather.main.temp} label="Temp(F)" />
        <CityNameComp propName={this.state.weather.visibility} label="Visibility" />
        <CityNameComp propName={this.state.weather.weather[0].main} label="Desc" />
      </div>
    );
  }
}

class CityNameComp extends Component {
  constructor(props) {
		super(props);
		// console.log(props, this.props, "constructor")
		this.state = {
			propName : this.props.propName
		};
	}
	shouldComponentUpdate(nextProps, nextState) {
		if(nextProps.propName == nextState.propName) {
			return false;
		}
	}
	render() {
		console.log(this.props.propName)
		this.state.propName = this.props.propName;
		return (
			<div className= {"blanPadding"}>
				<div>
					<span>{this.props.label}: </span>
					<span>{this.props.propName}</span>
				</div>
			</div>
		);
	}
}


render(<Main />, document.getElementById("root"));