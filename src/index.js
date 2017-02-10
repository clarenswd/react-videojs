var assign = require('object-assign');
var cx = require('classnames');
var blacklist = require('blacklist');
var React = require('react');

module.exports = React.createClass({
  displayName: 'VideoJS',

  componentDidMount() {
    var self = this;
    var player = videojs(this.refs.video, this.props.options).ready(function() {
      self.player = this
      self.player.on('play', self.handlePlay);
    });

    //LOAD VideoJS markers 
    player.markers({
      onMarkerReached: function(marker, index) {
                marker.destination = 'chat';
                console.log(marker);
      },
      markers: [
         {time: 1.5, text: "this"},
         {time: 3,  text: "is"},
         {time: 4.6,text: "so"},
         {time: 6,  text: "cool"}
      ]
    });
      
    if(this.props.onPlayerInit) this.props.onPlayerInit(player);
  },

  handlePlay: function() {
    if(this.props.onPlay) this.props.onPlay(this.player);
  },

  render() {
    var props = blacklist(this.props, 'children', 'className', 'src', 'type', 'onPlay', 'onPlayerInit');
    props.className = cx(this.props.className, 'videojs', 'video-js vjs-default-skin');

    assign(props, {
      ref: 'video',
      controls: true
    });

    return (
      <div>
        <video {... props}>
          <source src={this.props.src} type={this.props.type}/>
        </video>
      </div>
    )
  }
});
