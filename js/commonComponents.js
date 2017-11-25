// Signin Modal Overlay
const CommonExample = ({ props }) => {
	return (
		<div>
			CommonExample
		</div>
	);
};
function Connectors(props) {
  return (
    <div className={`line-container ${props.type}`}>
      <div className='arrow right'></div>
      <div className='border-line'></div>
    </div>
  );
}
function Nodes(props) {
  return (
    <div className={`node-container ${props.type}`}>
      <div className="node-title">{props.title}</div>
      <div className="node-desc">{props.description}</div>
    </div>
  );
}