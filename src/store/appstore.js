import {observable,action} from 'mobx';

class AppStore {
    constructor(){
        var next_sent = false;
        this.player = observable.map();
        this.clips = observable(JSON.parse(localStorage.getItem('playlist'))||[]);
        this.video = observable({});
        this.videoloading = observable(false);
        this.duration = observable(0);
        this.setDuration = action((video)=>{
          this.video=video;
          this.video.addEventListener('pause',()=>{
            if(!next_sent)
            {
              next_sent=true;
              let playingElements = this.clips.filter((clip)=>clip.playing)
              if(playingElements.length>0)
              {
                var fragmentEndTime = playingElements[0].end;
                  if (Math.floor(this.currentTime), Math.floor(fragmentEndTime)) {
                    this.playNext(true);
                  }
              }


            }


          },false);
          this.video.addEventListener('loadstart',()=>{
                this.videoloading.set(true);
          });
          this.video.addEventListener('loadeddata',()=>{
                this.videoloading.set(false);
          });
          this.duration.set(video.duration);
          if(this.clips.length<1)
          this.clips.push({name:"Main Video",start:0,end:video.duration,main:true,playing:false});
        });
        this.play = action(()=>{
          this.video.play();
        });
        this.addClip = action((clip)=>{
          clip.playing=false;
          clip.id = Date.now();
          clip.main = false;
          this.clips.push(clip);
        });
        this.updateClip = action((clip)=>{
          clip.playing=false;
          this.clips.replace(this.clips.map((c)=>{
            if(c.id == clip.id)
            {
              return clip;
            }
            return c;
          }));
        });
        this.playNext = (delay)=>{

          var playingIndex = 0;
          this.clips.map((item, index)=>{
            if(item.playing)
            {
              playingIndex = index;
            }
          });
          if(playingIndex<(this.clips.length-1)){
            this.clips.map((clip,index)=>{
              if(index==playingIndex+1)
              clip.playing=true;
              else
              clip.playing=false;
            })
            if(delay){
              setTimeout(()=>{
                this.video.load();
                this.video.play();
                next_sent=false;

              },3000)
            }else{
              setTimeout(()=>{
                this.video.load();
                this.video.play();
                next_sent=false;

              },200);
            }


          }
}
        this.savePlayList = action(()=>{
              localStorage.setItem("playlist",JSON.stringify(this.clips.toJS()));
        })

        this.playClip = action((id)=>{
            next_sent=false;
              this.clips.map((clip)=>{
                if(clip.id == id)
                {
                  clip.playing=true;
                  this.video.load();
                  this.video.play();
                }else{
                  clip.playing=false;
                }

              })
        })
      this.removeClip = action((clip)=>{
        this.clips.remove(clip);
      })
      this.playPrevious = action(()=>{
        var playingIndex = 0;
        this.clips.map((item, index)=>{
          if(item.playing)
          {
            playingIndex = index;
          }
        });
        if(playingIndex>0){
          this.clips.map((clip,index)=>{
            if(index==playingIndex-1)
            clip.playing=true;
            else
            clip.playing=false;
          })

          setTimeout(()=>{
            this.video.load();
            this.video.play();

          },200);
        }

      })
      document.body.onkeypress = (e)=>{
        if(e.charCode==100)
        {
          this.playNext(false);
        }
        if(e.charCode==97)
        {
          this.playPrevious();
        }
      }

    }
}

export default new AppStore();
