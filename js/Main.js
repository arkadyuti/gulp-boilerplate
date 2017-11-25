var preact = window.preact;
var h = preact.h;
var Component = preact.Component;
var render = preact.render;

class Main extends Component {
  constructor() {
    super();
    this.state = {
      jsonData: null
    };
  }

  componentDidMount() {
    global.makeAjaxCall("/api/data.json", "GET").then((chartData) => {
      this.setState({ jsonData: chartData })
    })
  }

  componentWillMount() {

  }

  render(props, state) {
    if (!this.state.jsonData) {
      return (
        <div>Loading</div>
      )
    }
    const jsonData = this.state.jsonData;
    let itemsArrayOfObjects = Object.values(jsonData.items);
    var streamsArrayOfObjects = Object.values(jsonData.streams);
    console.log(itemsArrayOfObjects, streamsArrayOfObjects);
    let blankLeft = 0;
    let blankFlag = false;
    return (
      <div>
        {streamsArrayOfObjects.map((stream, index) => {
          blankLeft = 0;
          blankFlag = true;
          return (
            <div key={index} className="streams-container">
              <div className="stream-title">
                {stream.title}
              </div>
              {
                itemsArrayOfObjects.map((item, iIndex) => {
                  if (item.stream === stream.id) {
                    blankLeft++;
                    {/* console.log(blankLeft); */ }
                    let connectors = Object.values(item.connectors);
                    console.log(connectors)
                    return (
                      <div key={iIndex} style={{ display: "inline-block" }}>
                        {/* {<div className="node-wrapper"></div>} */}
                        <div className="node-wrapper">
                          <Nodes type={item.type} title={item.title} description={item.description} />
                          {
                            connectors.map((con, cIndex) => {
                              return (
                                <Connectors key={cIndex} type={con.type} />
                              )
                            })
                          }
                        </div>
                      </div>
                    )
                  }
                })
              }

            </div>
          )
        })}
        {/* <Connectors type="dotted" /> */}
        {/* <Nodes type="delay" title="Node 1 Title" description="description" /> */}
      </div>
    )
  }
}


render(<Main />, document.getElementById("root"));