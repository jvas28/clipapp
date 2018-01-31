export class TimeUtils {
    toTimeString(time_in_seconds){
      let hours = 0;
      let minutes = 0;
      let seconds = 0;
      let carry_on=parseInt(time_in_seconds,10);
      if(this.time_in_seconds>3600)
      {
        hours = Math.floor(carry_on/3600);
        carry_on = carry_on % 3600;
      }
      if(this.time_in_seconds>60)
      {
        minutes = Math.floor(carry_on/60);
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
