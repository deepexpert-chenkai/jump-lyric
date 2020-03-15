// import Lyric from 'lyric-parser'

// const lyricStr = "[00:04.630]I won't just survive\n[00:09.500]Oh, you will see me thrive\n[00:14.300]Can't write my story\n[00:18.770]I'm beyond the archetype\n[00:23.710]I won't just conform\n[00:27.950]No matter how you shake my core\n[00:32.980]Cause my roots, they run deep, oh\n[00:39.190]Oh ye of so little faith\n[00:41.660]Don't doubt it, don't doubt it\n[00:43.630]Victory is in my veins\n[00:46.120]I know it, I know it\n[00:48.640]And I will not negotiate\n[00:50.880]I'll fight it, I'll fight it\n[00:53.600]I will transform\n[00:59.470]When, when the fire's at my feet again\n[01:06.420]And the vultures all start circling\n[01:10.900]They're whispering, \"you're out of time.\"\n[01:16.450]But still, I rise\n[01:20.200]This is no mistake, no accident\n[01:25.100]When you think the final end is in, think again\n[01:32.610]Don't be surprised, I will still rise\n[01:39.170]I must stay conscious\n[01:43.580]Through the menace and chaos\n[01:48.300]So I call on my angels\n[01:53.180]They say...\n[01:54.780]Oh ye of so little faith\n[01:57.460]Don't doubt it, don't doubt it\n[01:59.420]Victory is in your veins\n[02:01.890]You know it, you know it\n[02:04.400]And you will not negotiate\n[02:06.720]Just fight it, just fight it\n[02:09.080]And be transformed\n[02:14.640]Cause when, when the fire's at my feet again\n[02:21.640]And the vultures all start circling\n[02:25.970]They're whispering, \"you're out of time.\"\n[02:31.530]But still, I rise\n[02:35.750]This is no mistake, no accident\n[02:40.750]When you think the final end is in, think again\n[02:48.010]Don't be surprised, I will still rise\n[02:53.950]Don't doubt it, don't doubt it\n[02:56.420]Oh oh, oh oh\n[02:58.290]You know it, you know it\n[03:01.000]Still rise\n[03:03.360]Just fight it, just fight it\n[03:07.440]Don't be surprised, I will still rise"
// let lyric = new Lyric(lyricStr, handler)

// function handler({lineNum, txt}){
//   console.log(txt);
//   // this hanlder called when lineNum change
// }

// lyric.play();

import React from 'react';
import { render } from 'react-dom';
import App from './src/index';

render(
  <App />,
  document.getElementById('main')
)