# jurassic-file-navigator
* WebVR implementation of Jurassic Park's infamous 3D file system navigator display
* Online demo: http://jfn.herokuapp.com (this might break at anytime, free heroku dyno, no guarantees)

<a href = "https://www.youtube.com/watch?v=dxIPcbmo1_U">![Jurassic Park File System Navigator Scene](/public/images/jurassic-file-navigator.gif?raw=true "Jurassic Park File System Navigator Scene")</a>

* Remember Jurassic Park and its super rad 3D file system navigator? Did you know it was based on a real application? "<a href="https://en.wikipedia.org/wiki/Fsn">File System Navigator</a>" was created in the 80's and never really saw use beyond the '93 dino flick. 
* Now relive those memories in virtual reality with this WebVR experiment inspired by FSN and Jurassic Park

## how to use?
* clone and run `npm install`
* run `npm start`
* then load localhost:3000 in your browser
* Look around, purple boxes are directories, yellow boxes are files
* "gaze" at a purple box to navigate to the subdirectory
* That's about it

## TODO List - clone this repo and help make your retro dreams into (virtual) reality!
* multiple tree view on one page instead of mulitple pages
* use asynchronous filesystem walking instead of readdirsync
* button to move up a dir (../)
* change filename / dir text labels from polygonal to 2d texture
* ability to remotely lock and unlock raptor dino cages

## Resources:
* Built on aframe VR: https://aframe.io
* Ported over from other aframe experiments here: https://github.com/kfarr/aframe-playground
