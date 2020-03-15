import React from 'react';
import axios from 'axios';
import animations from '~animations';
import Lyric from '~helpers/lyric-parser';
import Tiktok from '~helpers/tik-tok';
import './index.scss';

const lyricStr = "[00:00.81]50, 50 Feet up underground\n[00:04.60]You know I keep my feet on the sound\n[00:08.42]50, 50 Feet up underground\n[00:12.11]You know I keep my feet on the sound\n[00:15.73]I'm around, baby I'm around\n[00:19.38]Underground, but you know I'm around\n[00:23.10]I was down, lately I've been down\n[00:26.93]Ran around, now I'm back I'm found\n[00:30.68]Pour the wine up\n[00:33.17]You're silent\n[00:35.20]Why though?\n[00:36.76]You know you like\n[00:38.75]This style of\n[00:40.51]This side of\n[00:42.51]I know you like it\n[00:44.95]I ****** you right, I did\n[00:47.08]I loved you every single night\n[00:48.67]You know you like, that dear\n[00:50.62]You know you like it when I ride\n[00:52.45]You owe me all of it\n[00:54.12]You told me every single time\n[00:56.30]I'm holding on to it\n[00:58.40]I'm holding everything that's mine\n[01:00.50]I ****** you right, I did\n[01:01.85]I loved you every single night\n[01:03.89]You know you like, that dear\n[01:05.76]You know you like when I ride\n[01:07.77]You owe me all of it\n[01:09.74]You told me every single time\n[01:11.54]I'm holding on to it\n[01:14.11]I'm holding everything that's mine\n[01:15.50]You know it\n[01:16.64]Popped a pill\n[01:17.45]What's the deal\n[01:18.27]I don't feel it anymore\n[01:20.22]Popped, popped a pill\n[01:21.18]What's that?\n[01:22.13]You know I've been down on the floor\n[01:23.96]I cried everyday\n[01:25.22]You know this ain't real anymore\n[01:27.83]It's a dream on the door\n[01:29.71]It's a dream on the board\n[01:31.71]It's the life you warned me\n[01:33.79]Hold tighter\n[01:35.56]Reminiscing on old times\n[01:37.40]With my red lighter\n[01:39.25]Said you'd feel it in your throat\n[01:41.30]When I sing\n[01:42.75]You know what I mean\n[01:44.56]You know what I mean\n[01:45.93]I ****** you right, I did\n[01:47.64]I loved you every single night\n[01:49.48]You know you like, that dear\n[01:51.53]You know you like it when I ride\n[01:53.15]You owe me all of it\n[01:56.43]You told me every single time\n[01:57.18]I'm holding on to it\n[01:59.22]I'm holding everything that's mine\n[02:01.15]I ****** you right, I did\n[02:02.79]I loved you every single night\n[02:04.70]You know you like, that dear\n[02:06.68]You know I like it when I ride\n[02:08.69]You owe me all of it\n[02:10.69]You told me every single time\n[02:12.40]I'm holding on to it\n[02:14.36]I'm holding everything that's mine\n[02:16.28]You know it\n[02:17.84]50, 50 Feet up underground\n[02:21.59]You know I keep my feet on the sound\n[02:25.36]50, 50 Feet up underground\n[02:29.29]You know I keep my feet on the sound\n[02:32.23]"
function handler({lineNum, txt}){
  console.log(txt);
  // this hanlder called when lineNum change
}

const framePerSecond = 60;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.lyric = new Lyric(lyricStr, this.lyricHandler);
    this.tiktok = new Tiktok(this.timeHandler);
    console.log('this.lyric: ', this.lyric);
    this.lyric.play();
    this.state = {
      time: 0,
      currentIndex: 0,
      play: false,
      audioSrc: null,
      currentLines: this.lyric.lines,
      arranges: this.arrangeAnimationForLyric(this.lyric.lines)
    }
  }

  componentDidMount() {
    this.lyric = new Lyric(lyricStr, this.lyricHandler);
    console.log('this.lyric: ', this.lyric);

    this.getMusic();
  }

  timeHandler = (passTime) => {
    if(passTime > 0) {
      this.setState({
        time: this.state.time + passTime
      })
    }
  }

  getMusic = () => {
    axios.get('')
    .then((res) => {
      this.setState((res) => {
        this.setState({
          audioSrc: res.data,
          play: true,
        },() => {
          this.audioRef.play();
          this.lyric.play();
          this.tiktok.play();
        })
      })
    })
  }

  arrangeAnimationForLyric = (lines) => {
    const arrangeResult = [];
    let group = [];
    if(lines[0] && lines[0].time > 0) {
      arrangeResult.push({
        animation: 'song-name',
        lines: {time: 0, txt: '50 Feet'},
        startTime: 0,
        endTime: lines[0].time,
      })
    }
    lines.forEach((line, index) => {
      group.push(line);
      if(index % 3 === 0 || index === lines.length - 1) {
        const startTime = group[0].time;
        const endTime = index + 1 >= lines.length ? null: lines[index + 1].time;

        arrangeResult.push({
          animation: 'star-war',
          lines: group,
          startTime,
          endTime
        });

        group = [];
      }
    });
    return arrangeResult;
  }

  lyricHandler = (lineNum, txt) => {
    console.log('lineNum: ', lineNum);
    this.setState({
      currentIndex: lineNum,
    })
  }

  getCurrentArrange = () => {
    const { time, arranges }  = this.state;
    let currentArrange = null;
    let i = arranges.length-1;
    for(; i>= 0; i--) {
      const arrange = arranges[i];
      if(arrange.startTime <= time) {
        currentArrange = arrange;
        break;
      }
    }
    return { currentArrange, currentIndex: i};
  }

  toggleMusic = () => {
    if(this.state.play) {
      this.audioRef.pause();
      this.tiktok.pause();
      this.lyric.pause();
      this.setState({
        play: false
      })
    } else {
      this.audioRef.play();
      this.tiktok.play();
      this.setState({
        play: true
      });
    }
  }

  render() {
    console.log(this.state);
    const {currentArrange, currentIndex} = this.getCurrentArrange();
    console.log('currentArrange: ', currentArrange);
    console.log('currentIndex: ', currentIndex);
    const CurrentAnimation = animations[currentArrange.animation];
    return (
      <div className="app">
        {/* <StarWar lines={this.state.currentLines} index={this.state.currentIndex} /> */}
        { this.state.time}
        <button onClick={this.toggleMusic}>
          play/stop
        </button>
        <audio
          ref={(a) => {this.audioRef = a}}
          src='/50feet.mp3'
        />
        <CurrentAnimation lines={currentArrange.lines} time={this.state.time} key={currentIndex}/>
      </div>
    )
  }
}