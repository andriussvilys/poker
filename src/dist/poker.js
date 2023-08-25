"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
var HandValues;
(function (HandValues) {
    HandValues[HandValues["HIGH_CARD"] = 0] = "HIGH_CARD";
    HandValues[HandValues["PAIR"] = 1] = "PAIR";
    HandValues[HandValues["TWO_PAIRS"] = 2] = "TWO_PAIRS";
    HandValues[HandValues["THREE_OF_A_KIND"] = 3] = "THREE_OF_A_KIND";
    HandValues[HandValues["STRAIGHT"] = 4] = "STRAIGHT";
    HandValues[HandValues["FLUSH"] = 5] = "FLUSH";
    HandValues[HandValues["FULL_HOUSE"] = 6] = "FULL_HOUSE";
    HandValues[HandValues["FOUR_OF_A_KIND"] = 7] = "FOUR_OF_A_KIND";
    HandValues[HandValues["STRAIGHT_FLUSH"] = 8] = "STRAIGHT_FLUSH";
})(HandValues || (HandValues = {}));
const handPairs = [
    { a: "2H 3H 4H 5H 6H", b: "KS AS TS QS JS" },
    { a: "2H 3H 4H 5H 6H", b: "AS AD AC AH JD" },
    { a: "AS AH 2H AD AC", b: "JS JD JC JH 3D" },
    { a: "2S AH 2H AS AC", b: "JS JD JC JH AD" },
    { a: "2S AH 2H AS AC", b: "2H 3H 5H 6H 7H" },
    { a: "AS 3S 4S 8S 2S", b: "2H 3H 5H 6H 7H" },
    { a: "2H 3H 5H 6H 7H", b: "2S 3H 4H 5S 6C" },
    { a: "2S 3H 4H 5S 6C", b: "3D 4C 5H 6H 2S" },
    { a: "2S 3H 4H 5S 6C", b: "AH AC 5H 6H AS" },
    { a: "2S 2H 4H 5S 4C", b: "AH AC 5H 6H AS" },
    { a: "2S 2H 4H 5S 4C", b: "AH AC 5H 6H 7S" },
    { a: "6S AD 7H 4S AS", b: "AH AC 5H 6H 7S" },
    { a: "2S AH 4H 5S KC", b: "AH AC 5H 6H 7S" },
    { a: "2S 3H 6H 7S 9C", b: "7H 3C TH 6H 9S" },
    { a: "4S 5H 6H TS AC", b: "3S 5H 6H TS AC" },
    { a: "2S AH 4H 5S 6C", b: "AD 4C 5H 6H 2C" },
];
class Card {
    constructor(value, suite) {
        this.value = value;
        this.suite = suite;
    }
}
exports.Card = Card;
const cardValues = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "T",
    "J",
    "Q",
    "K",
    "A",
];
const cardSuites = ["S", "H", "D", "C"];
const isValidValue = (suiteString) => {
    return cardValues.includes(suiteString);
};
const isValidSuite = (suiteString) => {
    return cardSuites.includes(suiteString);
};
const isValidCard = (card) => {
    if (card.length === 2) {
        return isValidValue(card[0]) && isValidSuite(card[1]);
    }
    return false;
};
const isValidHand = (hand) => {
    const splitHand = hand.split(" ");
    if (splitHand.length === 5) {
        return splitHand.every((card) => isValidCard(card));
    }
    return false;
};
const isValidPair = (pair) => {
    return isValidHand(pair.a) && isValidHand(pair.b);
};
const isValidInitialData = (data) => {
    return data.every((pair) => isValidPair(pair));
};
const isStraightFlush = (hand) => {
    return false;
};
const getHandType = (hand) => {
    return HandValues.HIGH_CARD;
};
const getHandValue = (hand) => {
    return 0;
};
const comparePokerHands = (a, b) => {
    return 0;
};
const convertStringToHand = (handString) => {
    const splitHand = handString.split(" ");
    return splitHand.map((card) => {
        return new Card(card[0], card[1]);
    });
};
const sortByValue = (unsortedHand) => {
    const resultMap = new Map();
    // const hand = convertStringToHand(handString);
    unsortedHand.forEach((card) => {
        const key = card.value;
        if (resultMap.has(key)) {
            resultMap.set(key, [...resultMap.get(key), card]);
        }
        else {
            resultMap.set(key, [card]);
        }
    });
    return Array.from(resultMap.values());
};
const isHighCard = (data) => {
    const hand = convertStringToHand(data);
    const valueSet = new Set(hand.map((card) => card.value));
    return valueSet.size === 5;
};
const isPair = (data) => {
    const hand = convertStringToHand(data);
    const sorted = sortByValue(hand);
    return !!sorted.find((cardGroup) => cardGroup.length === 2);
};
const findPair = (cardArray) => {
    return cardArray.find((cardGroup) => cardGroup.length === 2);
};
const isTwoPair = (data) => {
    const hand = convertStringToHand(data);
    const sorted = sortByValue(hand);
    const firstPair = findPair(sorted);
    if (firstPair) {
        const spliced = [...sorted].splice(hand.indexOf(firstPair), 1);
    }
    return false;
};
module.exports.HandValues = HandValues;
module.exports.cardValues = cardValues;
module.exports.cardSuites = cardSuites;
module.exports.getHandType = getHandType;
module.exports.getHandValue = getHandValue;
module.exports.comparePokerHands = comparePokerHands;
module.exports.isValidSuite = isValidSuite;
module.exports.isValidValue = isValidValue;
module.exports.isValidInitialData = isValidInitialData;
module.exports.isValidCard = isValidCard;
module.exports.isValidHand = isValidHand;
module.exports.isValidPair = isValidPair;
module.exports.convertStringToHand = convertStringToHand;
module.exports.isHighCard = isHighCard;
module.exports.isPair = isPair;
module.exports.isTwoPair = isTwoPair;
module.exports.findPair = findPair;
