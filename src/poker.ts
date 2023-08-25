enum HandValues {
	HIGH_CARD,
	PAIR,
	TWO_PAIRS,
	THREE_OF_A_KIND,
	STRAIGHT,
	FLUSH,
	FULL_HOUSE,
	FOUR_OF_A_KIND,
	STRAIGHT_FLUSH,
}

export const handPairs = [
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

type HandPair = { a: string; b: string };
type InitialData = HandPair[];

export class Card {
	constructor(value: string, suite: string) {
		this.value = value;
		this.suite = suite;
	}
	value: string;
	suite: string;
}

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

const isValidValue = (suiteString: string): boolean => {
	return cardValues.includes(suiteString);
};

const isValidSuite = (suiteString: string): boolean => {
	return cardSuites.includes(suiteString);
};

const isValidCard = (card: string): boolean => {
	if (card.length === 2) {
		return isValidValue(card[0]) && isValidSuite(card[1]);
	}
	return false;
};

const isValidHand = (hand: string): boolean => {
	const splitHand = hand.split(" ");
	if (splitHand.length === 5) {
		return splitHand.every((card) => isValidCard(card));
	}
	return false;
};

const isValidPair = (pair: HandPair): boolean => {
	return isValidHand(pair.a) && isValidHand(pair.b);
};

const isValidInitialData = (data: InitialData): boolean => {
	return data.every((pair) => isValidPair(pair));
};

const isStraightFlush = (hand: string): boolean => {
	return false;
};

const getHandType = (hand: string): HandValues => {
	return HandValues.HIGH_CARD;
};

const getHandValue = (hand: string): number => {
	return 0;
};

const comparePokerHands = (a: string, b: string): number => {
	return 0;
};

const convertStringToHand = (handString: string): Card[] => {
	const splitHand = handString.split(" ");
	return splitHand.map((card) => {
		return new Card(card[0], card[1]);
	});
};

const sortByValue = (unsortedHand: Card[]): Card[][] => {
	const resultMap = new Map();
	unsortedHand.forEach((card) => {
		const key: string = card.value;
		if (resultMap.has(key)) {
			resultMap.set(key, [...resultMap.get(key), card]);
		} else {
			resultMap.set(key, [card]);
		}
	});

	return Array.from(resultMap.values());
};

const isHighCard = (data: string): boolean => {
	const hand = convertStringToHand(data);
	const valueSet = new Set(hand.map((card) => card.value));
	return valueSet.size === 5;
};

const isPair = (data: string): boolean => {
	const hand = convertStringToHand(data);
	const sorted = sortByValue(hand);
	return !!sorted.find((cardGroup) => cardGroup.length === 2);
};

const findXofAKind = (data: string, x: number): Card[] | undefined => {
	const hand = convertStringToHand(data);
	const sorted = sortByValue(hand);
	return sorted.find((cardGroup) => cardGroup.length === x);
};

const findPair = (cardArray: Card[]): Card[] | undefined => {
	const sorted = sortByValue(cardArray);
	return sorted.find((cardGroup) => cardGroup.length === 2);
};

const isTwoPair = (data: string): boolean => {
	const hand = convertStringToHand(data);
	const firstPair = findPair(hand);
	if (firstPair) {
		const filtered = hand.filter((card) => card.value != firstPair[0].value);
		return !!findPair(filtered);
	}
	return false;
};

const isFlush = (data: string): boolean => {
	const hand = convertStringToHand(data);
	return hand.every((card) => card.suite === hand[0].suite);
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
module.exports.isFlush = isFlush;
module.exports.findXofAKind = findXofAKind;
