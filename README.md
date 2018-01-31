# ClipApp
React Application for clipping videos and making playlists
![Admin](https://raw.githubusercontent.com/jvas28/clipapp/master/screenshots/admin.PNG)
## Applied Technologies
- React JS 
- Mobx
- Semantic UI
## Main Functionalities
- Manage clips, based on provided video URL
- Play Clips
- Navigate over the Clips using the player buttons and Shortcuts
- Read Only Player
# How to
## Run it
```
git clone https://github.com/jvas28/clipapp.git
cd clipapp
npm install
npm start
```

## Try the read-only player

![Share](https://raw.githubusercontent.com/jvas28/clipapp/master/screenshots/Share.PNG)
You can use the Admin Interface to generate a readonly component html yo use it wherever you need 
![Read-Only Player](https://raw.githubusercontent.com/jvas28/clipapp/master/screenshots/onlyreadplayer.PNG)
Just three steps:
- Click on Share button at top bar
- Copy the html generated code
- Paste the code in an html file where the component bundle file is imported
## Responsiveness
The player interface is responsive to have a good experience no matter the size of your screen
![Responsive Player](https://raw.githubusercontent.com/jvas28/clipapp/master/screenshots/responsive.PNG)
## Shortcuts
- Press Ctrl + M to play next clip
- Press Ctrl + Z to play previous clip

## Deploy it 
- Run 
``` 
npm run build

```
- Import the static files the build folder of the project
- Add 
```html
  <div id="react-clipper" video-url="YOUR_VIDEO_URL"></div>
```

Enjoy!
