# ClipApp
React Application for clipping videos and making playlists. 

## Run it
```
git clone https://github.com/jvas28/clipapp.git
cd clipapp
npm install
npm start
```

## Try the read-only player
![Admin](https://raw.githubusercontent.com/jvas28/clipapp/master/screenshots/admin.PNG)

At public/index.html:
- Commet line 28
- Uncomment the line 29 

![Read-Only Player](https://raw.githubusercontent.com/jvas28/clipapp/master/screenshots/onlyreadplayer.PNG)

## Shortcuts
- Press D to play next clip
- Press A to play previous clip

## Deploy it 
- Run 
``` 
npm run build

```
- Import the static files the build folder of the project
- Add 
```html
  <div id=root video-url="YOUR_VIDEO_URL"></div>
```
if you want the admin
- Add 
```html
  <div id="readonlyplayer" video-url="YOUR_VIDEO_URL" data-playlist='[{"name":"Main Video","start":0,"end":52.209,"main":true,"playing":false},{"name":"Clip 1","start":0,"end":10,"main":false,"playing":false},{"name":"Clip 2","start":10,"end":20,"main":false,"playing":false}]'></div>
```
if you want the read-only player, you can customize the data-playlist JSON-String

