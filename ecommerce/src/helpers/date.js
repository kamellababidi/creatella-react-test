
export function dateFormater(date) {
    var oneDay = 24*60*60*1000;
    var now = new Date();
    var itemDate = new Date(date);
    var diffDays = Math.round(Math.abs((now.getTime() - itemDate.getTime())/(oneDay)));
    // handle hours case
    if (diffDays === 0)
      return Math.round(Math.abs((now.getTime() - itemDate.getTime())/(oneDay)) * 10) + " hours"
    // handle weeks case
    else if (diffDays / 7 >= 1)
      return Math.round(diffDays / 7) + " weeks"
    // handle days case
    else
      return diffDays + " days"
}