import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
const prohibitedWords = ['fuck', 'your moda', 'negga']

export function checkProfaneWordsValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        const value = control.value;

        if (!value || typeof value !== 'string') {
            return null;
        }

        const normalizedValue = value.toLowerCase();

        const foundWord = prohibitedWords.find(word =>
            normalizedValue.includes(word)
        );

        if (foundWord) {
            return { profaneWord: { word: foundWord } };
        }

        return null;
    }
}