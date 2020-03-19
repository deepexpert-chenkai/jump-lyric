import React from 'react';
import axios from 'axios';
import classnames from 'classnames';
import animations from '~animations';
import Lyric from '~helpers/lyric-parser';
import Tiktok from '~helpers/tik-tok';
import './index.scss';

const lyricStr = "[00:00.81]50, 50 Feet up underground\n[00:04.60]You know I keep my feet on the sound\n[00:08.42]50, 50 Feet up underground\n[00:12.11]You know I keep my feet on the sound\n[00:15.73]I'm around, baby I'm around\n[00:19.38]Underground, but you know I'm around\n[00:23.10]I was down, lately I've been down\n[00:26.93]Ran around, now I'm back I'm found\n[00:30.68]Pour the wine up\n[00:33.17]You're silent\n[00:35.20]Why though?\n[00:36.76]You know you like\n[00:38.75]This style of\n[00:40.51]This side of\n[00:42.51]I know you like it\n[00:44.95]I ****** you right, I did\n[00:47.08]I loved you every single night\n[00:48.67]You know you like, that dear\n[00:50.62]You know you like it when I ride\n[00:52.45]You owe me all of it\n[00:54.12]You told me every single time\n[00:56.30]I'm holding on to it\n[00:58.40]I'm holding everything that's mine\n[01:00.50]I ****** you right, I did\n[01:01.85]I loved you every single night\n[01:03.89]You know you like, that dear\n[01:05.76]You know you like when I ride\n[01:07.77]You owe me all of it\n[01:09.74]You told me every single time\n[01:11.54]I'm holding on to it\n[01:14.11]I'm holding everything that's mine\n[01:15.50]You know it\n[01:16.64]Popped a pill\n[01:17.45]What's the deal\n[01:18.27]I don't feel it anymore\n[01:20.22]Popped, popped a pill\n[01:21.18]What's that?\n[01:22.13]You know I've been down on the floor\n[01:23.96]I cried everyday\n[01:25.22]You know this ain't real anymore\n[01:27.83]It's a dream on the door\n[01:29.71]It's a dream on the board\n[01:31.71]It's the life you warned me\n[01:33.79]Hold tighter\n[01:35.56]Reminiscing on old times\n[01:37.40]With my red lighter\n[01:39.25]Said you'd feel it in your throat\n[01:41.30]When I sing\n[01:42.75]You know what I mean\n[01:44.56]You know what I mean\n[01:45.93]I ****** you right, I did\n[01:47.64]I loved you every single night\n[01:49.48]You know you like, that dear\n[01:51.53]You know you like it when I ride\n[01:53.15]You owe me all of it\n[01:56.43]You told me every single time\n[01:57.18]I'm holding on to it\n[01:59.22]I'm holding everything that's mine\n[02:01.15]I ****** you right, I did\n[02:02.79]I loved you every single night\n[02:04.70]You know you like, that dear\n[02:06.68]You know I like it when I ride\n[02:08.69]You owe me all of it\n[02:10.69]You told me every single time\n[02:12.40]I'm holding on to it\n[02:14.36]I'm holding everything that's mine\n[02:16.28]You know it\n[02:17.84]50, 50 Feet up underground\n[02:21.59]You know I keep my feet on the sound\n[02:25.36]50, 50 Feet up underground\n[02:29.29]You know I keep my feet on the sound\n[02:32.23]"
console.log('lyricStr: ', JSON.stringify(lyricStr));
const songs = ['50 Feet', '我是一只鱼'];
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.tiktok = new Tiktok(this.timeHandler);
    this.isPlayingBefore = false;
    this.state = {
      showNextButton: false,
      time: 0,
      play: false,
      audioId: 0,
      loading: true,
      darkmode: true,
      arranges: [],
    }
  }

  componentDidMount() {
    this.audioRef.addEventListener('canplay', () => {
      console.log('can play');
      this.getLyric();
    });
    this.audioRef.addEventListener('ended', this.resetState)
  }

  getLyric = () => {
    axios(`./songs/${this.state.audioId}.Irc`).then((res) => {
      const lyric = new Lyric(res.data.replace(/\\n/g, '\n'));
      console.log('res.data: ', res.data);
      this.setState({
        arranges: this.arrangeAnimationForLyric(lyric.lines),
        loading: false,
      });
      if(this.isPlayingBefore) {
        this.play();
      }
    })
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
        lines: [{time: 0, txt: songs[this.state.audioId]}],
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

  pause = () => {
    this.audioRef.pause();
    this.tiktok.pause();
    this.setState({
      play: false,
      showNextButton: true,
    })
  }

  play = () => {
    this.setState({
      play: true,
      showNextButton: true,
    },() => {
      this.audioRef.play();
      this.tiktok.play();
    });
  }

  toggleMusic = () => {
    if(this.state.play) {
      this.pause();
    } else {
      if(!this.state.loading) {
        this.play();
      }
    }
  }

  handleNextSong = () => {
    if(!this.state.loading) {
      this.isPlayingBefore = this.state.play;
      this.pause();
      this.setState({
        time: 0,
        loading: true,
        audioId: 1
      })
    }
  }

  render() {
    const {currentArrange, currentIndex} = this.getCurrentArrange();
    const CurrentAnimation = currentArrange ? animations[currentArrange.animation] : null;
    return (
      <div className={ classnames("app", {'app--dark': this.state.darkmode})}>
        <div className="app__controller">
          <If condition={this.state.time !== 0}>
            <span className="app__time">{ this.state.time }</span>
          </If>
          <div 
            className={ classnames("app__btn", {'app__btn--ini': this.state.time === 0 && !this.state.play}) }
          >
            <div 
              className="app__icon-start"
              onClick={this.toggleMusic} 
              role="presentation"
            >
              <Choose>
                <When condition={this.state.play}>
                  <svg t="1584543747726" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2514" width="200" height="200"><path d="M512 0C230.4 0 0 230.4 0 512c0 281.6 230.4 512 512 512 117.76 0 227.84-38.4 320-110.08 10.24-7.68 12.8-23.04 5.12-35.84-7.68-10.24-23.04-12.8-35.84-5.12C719.36 939.52 616.96 972.8 512 972.8 256 972.8 51.2 768 51.2 512 51.2 256 256 51.2 512 51.2 768 51.2 972.8 256 972.8 512c0 87.04-25.6 171.52-69.12 243.2-7.68 12.8-2.56 28.16 7.68 33.28 12.8 7.68 28.16 2.56 33.28-7.68 51.2-79.36 76.8-174.08 76.8-271.36C1024 230.4 793.6 0 512 0z" p-id="2515"></path><path d="M686.08 307.2 337.92 307.2c-17.92 0-30.72 12.8-30.72 30.72l0 348.16c0 17.92 12.8 30.72 30.72 30.72l348.16 0c17.92 0 30.72-12.8 30.72-30.72L716.8 337.92C716.8 320 704 307.2 686.08 307.2zM665.6 657.92c0 5.12-2.56 7.68-7.68 7.68L366.08 665.6c-5.12 0-7.68-2.56-7.68-7.68L358.4 366.08c0-5.12 2.56-7.68 7.68-7.68l291.84 0c5.12 0 7.68 2.56 7.68 7.68L665.6 657.92z" p-id="2516"></path></svg>
                </When>
                <Otherwise>
                  <svg t="1584543632169" className="icon" viewBox="0 0 1026 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1775" width="200" height="200"><path d="M768 880c-86.4 60.8-192 89.6-307.2 76.8C246.4 931.2 80 755.2 64 540.8 48 262.4 288 32 569.6 67.2c195.2 25.6 352 176 384 368 19.2 115.2-6.4 224-60.8 310.4-9.6 12.8-6.4 28.8 3.2 41.6 16 16 38.4 12.8 51.2-6.4 64-105.6 96-233.6 70.4-368C976 211.2 812.8 48 611.2 9.6c-348.8-64-649.6 224-604.8 569.6 28.8 230.4 217.6 416 451.2 441.6 131.2 12.8 252.8-19.2 348.8-89.6 16-12.8 19.2-35.2 6.4-48-16-12.8-32-12.8-44.8-3.2z" p-id="1776"></path><path d="M438.4 758.4c-16 0-28.8-12.8-28.8-28.8V294.4c0-16 12.8-28.8 28.8-28.8s28.8 12.8 28.8 28.8v435.2c0 16-12.8 28.8-28.8 28.8z" p-id="1777"></path><path d="M675.2 531.2c-9.6 9.6-28.8 9.6-38.4 0L419.2 313.6c-9.6-9.6-9.6-28.8 0-38.4 9.6-9.6 28.8-9.6 38.4 0l217.6 217.6c9.6 9.6 9.6 28.8 0 38.4z" p-id="1778"></path><path d="M419.2 748.8c-9.6-9.6-9.6-28.8 0-38.4l217.6-217.6c9.6-9.6 28.8-9.6 38.4 0 9.6 9.6 9.6 28.8 0 38.4L457.6 748.8c-9.6 9.6-28.8 9.6-38.4 0z" p-id="1779"></path></svg>
                </Otherwise>
              </Choose>
            </div>
            <If condition={this.state.showNextButton}>
              <svg t="1584629467314" className="app__icon-next" onClick={this.handleNextSong} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="39169" width="32" height="32"><path d="M1024 512C1024 229.23 794.77 0 512 0S0 229.23 0 512s229.23 512 512 512c117.41 0 228.826-39.669 318.768-111.313 10.79-8.595 12.569-24.308 3.975-35.097-8.594-10.789-24.308-12.568-35.097-3.974C718.47 938.277 618.002 974.049 512 974.049 256.818 974.049 49.951 767.182 49.951 512S256.818 49.951 512 49.951 974.049 256.818 974.049 512c0 87.493-24.334 171.337-69.578 243.96-7.294 11.708-3.716 27.112 7.992 34.405 11.707 7.294 27.11 3.716 34.405-7.991C997.014 701.88 1024 608.898 1024 512z" fill="" p-id="39170"></path><path d="M337.17 499.512c34.485 0 62.44-27.955 62.44-62.439s-27.955-62.439-62.44-62.439c-34.483 0-62.438 27.955-62.438 62.44 0 34.483 27.955 62.438 62.439 62.438z m374.635 0c34.484 0 62.439-27.955 62.439-62.439s-27.955-62.439-62.44-62.439c-34.483 0-62.438 27.955-62.438 62.44 0 34.483 27.955 62.438 62.439 62.438zM352.788 768.771c43.377 34.702 100.364 55.424 171.7 55.424 71.336 0 128.322-20.722 171.7-55.424 26.513-21.21 42.695-42.786 50.444-58.284 6.168-12.338 1.168-27.34-11.17-33.509-12.337-6.168-27.34-1.168-33.508 11.17-0.918 1.835-3.462 6.025-7.788 11.793-7.564 10.085-17.239 20.27-29.183 29.825-34.671 27.737-80.71 44.478-140.495 44.478-59.786 0-105.824-16.741-140.496-44.478-11.944-9.556-21.619-19.74-29.182-29.825-4.327-5.768-6.87-9.958-7.788-11.793-6.169-12.338-21.171-17.338-33.509-11.17-12.337 6.169-17.338 21.171-11.169 33.509 7.75 15.498 23.931 37.074 50.444 58.284z" fill="" p-id="39171"></path></svg>
            </If>
          </div>
        </div>
        <audio
          ref={(a) => {this.audioRef = a}}
          src={`./songs/${this.state.audioId}.mp3`}
        />
        <If condition={CurrentAnimation}>
          <CurrentAnimation lines={currentArrange.lines} time={this.state.time} key={currentIndex}/>
        </If>
      </div>
    )
  }
}