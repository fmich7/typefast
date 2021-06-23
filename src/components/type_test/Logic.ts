import { finished } from "stream";

export function getRandomTextFromApi() {
    return "jak nie ma fuchy to se gramy w fifke na mieście nie jeden wykonał kiwke";
}

export function getListOfWordsFromText(text: string) {
    return text.split(" ");
}

type returnDictType = {
    userWord: string,
    allWords: string[],
    index: number,
    good_part: string,
    finished: boolean,
    mistake: number
}

export function onLetterTyped(userWord: string, allWords: string[], index: number, good_part: string, newCharTyped: boolean){
    //sprawdza czy nowy znak jest błędny
    let mistake = 0;
    if(index <= allWords.length && userWord[userWord.length - 1] !== allWords[index][userWord.length - 1] && newCharTyped === true && userWord.length <= allWords[index].length)
        mistake = 1;
    //po ukończeniu słowa i naciśnięciu spacji, przechodzi do następnego
    if(userWord === allWords[index] + " " || userWord === allWords[index] && index === allWords.length - 1){
        good_part += allWords[index] + " ";
        index++;
        userWord = "";
    }
    
    const dict: returnDictType = {
        userWord: userWord,
        allWords: allWords,
        index: index,
        good_part: good_part,
        finished: index >= allWords.length,
        mistake: mistake
    };
    return dict;
}