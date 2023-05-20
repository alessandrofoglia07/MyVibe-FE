/**
 * Abbreviates a number with a specified maximum number of decimal places and adds an abbreviation letter.
 * @param number - The number to abbreviate.
 * @param maxPlaces - The maximum number of decimal places to include in the result. Set to `false` to not round.
 * @param forcePlaces - The exact number of decimal places to include in the result, overriding `maxPlaces`.
 * @param forceLetter - Forces a specific abbreviation letter to be appended to the result. Set to `false` to use the default abbreviation.
 * @returns The abbreviated and annotated number as a string.
 */
function abbreviate(number: number, maxPlaces: number | false, forcePlaces: number | false, forceLetter: string | false): string {
    number = Number(number);
    forceLetter = forceLetter || false;

    if (forceLetter !== false) {
        return annotate(number, maxPlaces, forcePlaces, forceLetter);
    }

    let abbr: string;

    if (number >= 1e12) {
        abbr = 'T';
    } else if (number >= 1e9) {
        abbr = 'B';
    } else if (number >= 1e6) {
        abbr = 'M';
    } else if (number >= 1e3) {
        abbr = 'K';
    } else {
        abbr = '';
    }

    return annotate(number, maxPlaces, forcePlaces, abbr);
}

/**
 * Annotates a number with the appropriate abbreviation and formats it based on the specified decimal places.
 * @param number - The number to annotate.
 * @param maxPlaces - The maximum number of decimal places to include in the result. Set to `false` to not round.
 * @param forcePlaces - The exact number of decimal places to include in the result, overriding `maxPlaces`.
 * @param abbr - The abbreviation letter to append to the result.
 * @returns The annotated and formatted number as a string.
 */
function annotate(number: number, maxPlaces: number | false, forcePlaces: number | false, abbr: string): string {
    let rounded = 0;

    switch (abbr) {
        case 'T':
            rounded = number / 1e12;
            break;
        case 'B':
            rounded = number / 1e9;
            break;
        case 'M':
            rounded = number / 1e6;
            break;
        case 'K':
            rounded = number / 1e3;
            break;
        case '':
            rounded = number;
            break;
    }

    if (maxPlaces !== false) {
        const test = new RegExp(`\\.\\d{${maxPlaces + 1},}$`);
        if (test.test('' + rounded)) {
            rounded = Number(rounded.toFixed(maxPlaces));
        }
    }

    if (forcePlaces !== false) {
        rounded = Number(rounded.toFixed(forcePlaces));
    }

    return rounded + abbr;
}

export default abbreviate;