import React from 'react';
import axios from 'axios';
import classnames from 'classnames';
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
    this.state = {
      time: 0,
      currentIndex: 0,
      play: false,
      audioSrc: null,
      darkmode: true,
      currentLines: this.lyric.lines,
      arranges: this.arrangeAnimationForLyric(this.lyric.lines)
    }
  }

  componentDidMount() {
    // this.getMusic();
    this.audioRef.addEventListener('canplay', () => {
      console.log('can play');
    });
    this.audioRef.addEventListener('ended', this.resetState)
  }

  resetState = () => {
    this.setState({
      play: false,
      time: 0
    }, () => {
      this.tiktok.pause();
      this.audioRef.pause();
    })
  }

  timeHandler = (passTime) => {
    if(passTime > 0) {
      this.setState({
        time: this.state.time + passTime
      })
    }
  }

  arrangeAnimationForLyric = (lines) => {
    const arrangeResult = [];
    let group = [];
    if(lines[0] && lines[0].time > 0) {
      arrangeResult.push({
        animation: 'song-name',
        lines: [{time: 0, txt: '50 Feet'}],
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
    const {currentArrange, currentIndex} = this.getCurrentArrange();
    const CurrentAnimation = animations[currentArrange.animation];
    return (
      <div className={ classnames("app", {'app--dark': this.state.darkmode})}>
        <div className="app__controller">
          <If condition={this.state.time !== 0}>
            <span className="app__time">{ this.state.time }</span>
          </If>
          <div 
            className={ classnames("app__btn", {'app__btn--ini': this.state.time === 0}) }
            onClick={this.toggleMusic} 
            role="presentation"
          >
            <Choose>
              <When condition={this.state.play}>
                <svg t="1584543747726" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2514" width="200" height="200"><path d="M512 0C230.4 0 0 230.4 0 512c0 281.6 230.4 512 512 512 117.76 0 227.84-38.4 320-110.08 10.24-7.68 12.8-23.04 5.12-35.84-7.68-10.24-23.04-12.8-35.84-5.12C719.36 939.52 616.96 972.8 512 972.8 256 972.8 51.2 768 51.2 512 51.2 256 256 51.2 512 51.2 768 51.2 972.8 256 972.8 512c0 87.04-25.6 171.52-69.12 243.2-7.68 12.8-2.56 28.16 7.68 33.28 12.8 7.68 28.16 2.56 33.28-7.68 51.2-79.36 76.8-174.08 76.8-271.36C1024 230.4 793.6 0 512 0z" p-id="2515"></path><path d="M686.08 307.2 337.92 307.2c-17.92 0-30.72 12.8-30.72 30.72l0 348.16c0 17.92 12.8 30.72 30.72 30.72l348.16 0c17.92 0 30.72-12.8 30.72-30.72L716.8 337.92C716.8 320 704 307.2 686.08 307.2zM665.6 657.92c0 5.12-2.56 7.68-7.68 7.68L366.08 665.6c-5.12 0-7.68-2.56-7.68-7.68L358.4 366.08c0-5.12 2.56-7.68 7.68-7.68l291.84 0c5.12 0 7.68 2.56 7.68 7.68L665.6 657.92z" p-id="2516"></path></svg>
              </When>
              <Otherwise>
                <svg t="1584543632169" class="icon" viewBox="0 0 1026 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1775" width="200" height="200"><path d="M768 880c-86.4 60.8-192 89.6-307.2 76.8C246.4 931.2 80 755.2 64 540.8 48 262.4 288 32 569.6 67.2c195.2 25.6 352 176 384 368 19.2 115.2-6.4 224-60.8 310.4-9.6 12.8-6.4 28.8 3.2 41.6 16 16 38.4 12.8 51.2-6.4 64-105.6 96-233.6 70.4-368C976 211.2 812.8 48 611.2 9.6c-348.8-64-649.6 224-604.8 569.6 28.8 230.4 217.6 416 451.2 441.6 131.2 12.8 252.8-19.2 348.8-89.6 16-12.8 19.2-35.2 6.4-48-16-12.8-32-12.8-44.8-3.2z" p-id="1776"></path><path d="M438.4 758.4c-16 0-28.8-12.8-28.8-28.8V294.4c0-16 12.8-28.8 28.8-28.8s28.8 12.8 28.8 28.8v435.2c0 16-12.8 28.8-28.8 28.8z" p-id="1777"></path><path d="M675.2 531.2c-9.6 9.6-28.8 9.6-38.4 0L419.2 313.6c-9.6-9.6-9.6-28.8 0-38.4 9.6-9.6 28.8-9.6 38.4 0l217.6 217.6c9.6 9.6 9.6 28.8 0 38.4z" p-id="1778"></path><path d="M419.2 748.8c-9.6-9.6-9.6-28.8 0-38.4l217.6-217.6c9.6-9.6 28.8-9.6 38.4 0 9.6 9.6 9.6 28.8 0 38.4L457.6 748.8c-9.6 9.6-28.8 9.6-38.4 0z" p-id="1779"></path></svg>
              </Otherwise>
            </Choose>
          </div>
        </div>
        <audio
          ref={(a) => {this.audioRef = a}}
          src='./50feet.mp3'
        />
        <CurrentAnimation lines={currentArrange.lines} time={this.state.time} key={currentIndex}/>
      </div>
    )
  }
}