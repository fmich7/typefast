import axios from 'axios';

type getRandomTextFromApiResponse = {
    content: string,
    author: string,
    word_count: number,
};

export async function getRandomTextFromApi(): Promise<getRandomTextFromApiResponse> {
    const response = await axios.get('http://127.0.0.1:5000/get_rand_text');

    return Promise.resolve(response.data["texts"]);
}

export function getListOfWordsFromText(text: string) {
    return text.split(" ");
}

interface wordInParts {
    word_good: string;
    word_bad: string;
    word_normal: string;
}

type returnDictType = {
    userWord: string,
    allWords: string[],
    index: number,
    good_part: string,
    finished: boolean,
    mistake: boolean,
    currentWordInParts: wordInParts
};

export function onLetterTyped(userWord: string, allWords: string[], index: number, good_part: string, newCharTyped: boolean) {

    //sprawdza czy nowy znak jest błędny
    let mistake = false;
    if (index <= allWords.length && userWord[userWord.length - 1] !== allWords[index][userWord.length - 1] && newCharTyped === true && userWord.length <= allWords[index].length)
        mistake = true;

    //po ukończeniu słowa i naciśnięciu spacji, przechodzi do następnego
    if (userWord === allWords[index] + " " || (userWord === allWords[index] && index === allWords.length - 1)) {
        good_part += allWords[index] + " ";
        userWord = "";
        index++;
    }

    // dobre i złe części słowa; [sł][ow]o
    let word_good = "", word_bad = "", word_normal = "";
    if (index < allWords.length) {
        for (var i = 0; i < allWords[index].length; i++) {
            const word_mark = allWords[index][i];
            if (i >= userWord.length || userWord === "")
                word_normal += word_mark;
            else if (userWord[i] === word_mark && word_bad === "")
                word_good += word_mark;
            else
                word_bad += word_mark;
        }
    }

    const currentWordInParts: Required<wordInParts> = {
        word_good: word_good,
        word_bad: word_bad,
        word_normal: word_normal
    };

    const dict: returnDictType = {
        userWord: userWord,
        allWords: allWords,
        index: index,
        good_part: good_part,
        finished: index >= allWords.length,
        mistake: mistake,
        currentWordInParts: currentWordInParts
    };
    return dict;
}
