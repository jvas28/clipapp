import {observable,action,reaction} from 'mobx';

class AppStore {
    constructor(){
        this.next_sent = false;
        // Player related state
        this.playerState = observable.map();
        this.playerState.set('playing',false);
        this.playerState.set('toggle_requested',false);
        this.playerState.set('new_play_requested',false);
        this.playerState.set('playing',false);
        this.playerState.set('loading',false);
        this.playerState.set('title',false);
        this.playerState.set('current_duration',0);
        this.playerState.set('current_time',0);
        this.playerState.set('current_clip_index',0);
        this.readonly = observable(false);
        // Playlist related state (For saving)
        this.playlistState = observable.map();
        this.playlistState.set('changed',false);
        // Initialize playlist (If exist in localstorage it will use the persistent list)
        this.clips = observable(JSON.parse(localStorage.getItem('playlist'))||[]);
        this.video = observable({});
        this.videoloading = observable(false);
        this.duration = observable(0);

        //Video Player actions
        this.playClip = action(this.playClip)
        this.playPrevious = action(this.playPrevious);
        this.playNext = action(this.playNext);
        this.setPlayerProperties = action(this.setPlayerProperties);
        this.videoLoadingStarted = action(this.videoLoadingStarted);
        this.videoLoadingFinished = action(this.videoLoadingFinished);
        this.updatePlayerCurrentTime = action(this.updatePlayerCurrentTime);
        this.requestTogglePlayer = action(this.requestTogglePlayer);
        // Clip related actions
        this.addClip = action(this.addClip);
        this.removeClip = action(this.removeClip);
        this.updateClip = action(this.updateClip);
        this.savePlayList = action(this.savePlayList);
        this.playListChanged = this.playListChanged.bind(this);
        this.playListChanged = reaction(()=>this.clips.map((clip)=>clip.name),this.playListChanged)


    }
    addClip(clip){
        clip.playing=false;
        clip.id = Date.now();
        clip.main = false;
        this.clips.push(clip);
    }
    updateClip(clip){
        clip.playing=false;
        this.clips.replace(this.clips.map((c)=>{
            if(c.id === clip.id)
            {
                return clip;
            }
            return c;
        }));
    }
    removeClip(clip){
        this.clips.remove(clip);
    }
    playListChanged(){
        this.playlistState.set("changed",true);
    }
    playClip(i){
        this.clips.map((clip,index)=>{
            if(i === index)
            {
                this.playerState.set('current_clip_index',index);
                this.playerState.set('title',clip.name);
                this.playerState.set('current_duration',clip.end-clip.start);
                this.playerState.set('current_time',0);
                this.playerState.set('new_play_requested',true);
                clip.playing=true;

            }else{
                clip.playing=false;
            }
            return clip;
        })
    }
    playPrevious(){
        let previous_index = this.playerState.get('current_clip_index') - 1;
        if(previous_index>=0)
        {
            this.playClip(previous_index);
        }else{
            this.playClip(this.clips.length-1);
        }

    }
    playNext(){
            let count = this.clips.length;
            let next_index = this.playerState.get('current_clip_index') + 1;
            if(next_index<count)
            {
                this.playClip(next_index);
            }else{
                this.playClip(0);
            }

    }
    setPlayerProperties(video){
        this.video=video;
        this.playerState.set('current_duration',video.duration)
        this.duration.set(video.duration);
        if(this.clips.length<1)
        this.clips.push({name:"Main Video",start:0,end:video.duration,main:true,playing:false});
    }
    videoLoadingStarted(){
        if(!this.playerState.get('loading'))
        this.playerState.set('loading',true);
    }
    videoLoadingFinished(){
        this.playerState.set('loading',false);
    }
    savePlayList(){
        localStorage.setItem("playlist",JSON.stringify(this.clips.toJS()));
        this.playlistState.set('changed',false);
    }
    updatePlayerCurrentTime(time){
        let current_clip_start_time = this.clips[this.playerState.get('current_clip_index')].start;
        if(time - current_clip_start_time > 0)
        this.playerState.set('current_time',time - current_clip_start_time);
        else
        this.playerState.set('current_time',0);
    }
    requestTogglePlayer(){
        this.playerState.set('toggle_requested',true);
    }
    setReadOnly(){
        this.readonly.set(true);
    }
    setPlayList(playlist){
        this.clips.replace(playlist.map((item)=>{
             return item;
        }))
    }
}

export default new AppStore();
