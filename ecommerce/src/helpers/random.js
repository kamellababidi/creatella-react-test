
export function randomNumberExcept(arrayOfNum) {
    let num = Math.floor(Math.random()*1000)
    for(var i = 0; i < arrayOfNum.length; i++){
        if (arrayOfNum[i] == num) {
            randomNumberExcept(arrayOfNum)
        }
    }
    return num
}