export class TimeUtils {
    constructor(){
    }
    toTimeString(time_in_seconds){
      let hours = 0;
      let minutes = 0;
      let seconds = 0;
      let carry_on=time_in_seconds;
      if(this.time_in_seconds>3600)
      {
        let hours = Math.floor(carry_on/3600);
        carry_on = carry_on % 3600;
      }
      if(this.time_in_seconds>60)
      {
        let minutes = Math.floor(carry_on/60);
        carry_on = carry_on % 60;
      }
      seconds = Math.round(carry_on);
      return this.digits(hours)+":"+this.digits(minutes)+":"+this.digits(seconds);
    }
    digits(number){
        if(number !== undefined)
        return (number>9)? number.toString() : "0"+number.toString()
        else
        return "";
    }

}
