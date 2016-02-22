
const COMMON = require('./__snaprt.jsx');
const ARCCORE = COMMON.arccore;
const React = COMMON.react;

const ReactBootstrap = require('react-bootstrap');
var Button = ReactBootstrap.Button;
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var Navbar = ReactBootstrap.Navbar;

const ReactTheme = COMMON.reactTheme;

// const Sitemap = require('./sitemap.jsx');
// const Breadcrumbs = require('./breadcrumbs.jsx');

var rootComponent = React.createClass({
getInitialState: function() {
    return {
           charHistory: [],
           checktime: new Date().getTime()
           };
},

render: function() {
    var charHistory = this.state.charHistory;

    var date = new Date();
    var timestring = date.getTime();
    var datestring = date.toString();
    var irut = ARCCORE.identifier.irut.fromReference(datestring).result;
    var irut2 = ARCCORE.identifier.irut.fromReference(timestring).result;

    charHistory.push(irut2.charAt(irut.length - 8));
    if (charHistory.length > 60) {
        charHistory.shift();
    }
    this.state.charHistory = charHistory;

    var elapsed = timestring - this.state.checktime;
    this.state.checktime = timestring;

    var fps = Math.floor(1000/elapsed);

    var irutStyles = {
        fontFamily: "Courier"
        };

    var propsString = JSON.stringify(this.props, undefined, 4);

    var jsonStyles = {
        backgroundColor: '#DDEEFF',
        padding: '1em',
        margin: '1em',
        border: '1px solid #AABBCC'
    };

    return (<div>
            <p><strong>Not much eye candy yet but there's a whole lot going on in this little demo!</strong></p>
            <i>If the little ASCII spaceship launches, then the client app is working as expected!</i>
            <h2 style={irutStyles}>{irut}</h2>
            <div style={irutStyles}>{charHistory.join('')} >=[oooo]>-</div>
            <p>It's now {datestring} Epoch={timestring}(msec) period={elapsed}(msec) framerate={fps}(fps)</p>
            <h3>{this.props.generator.agent.name} {this.props.generator.agent.version} React JS data context</h3>
            <h2>Try out React Bootstrap</h2>
                <div>
                <ButtonToolbar>
                {/* Standard button */}
                <Button>Default</Button>
                {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
                <Button bsStyle="primary">Primary</Button>
                {/* Indicates a successful or positive action */}
                <Button bsStyle="success">Success</Button>
                {/* Contextual button for informational alert messages */}
                <Button bsStyle="info">Info</Button>
                {/* Indicates caution should be taken with this action */}
                <Button bsStyle="warning">Warning</Button>
                {/* Indicates a dangerous or potentially negative action */}
                <Button bsStyle="danger">Danger</Button>
                {/* Deemphasize a button by making it look like a link while maintaining button behavior */}
                <Button bsStyle="link">Link</Button>
                </ButtonToolbar>

                </div>

            <i>Every ReactJS page generated by {this.props.generator.agent.name} is passed a JSON document to render that looks like this:</i>
            <div style={jsonStyles}><pre>{propsString}</pre></div>
            </div>
    )}
});

module.exports = rootComponent;
