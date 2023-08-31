enum Ranks {
	HIGH_CARD = "HIGH_CARD",
	PAIR = "PAIR",
	TWO_PAIR = "TWO_PAIR",
	THREE_OF_A_KIND = "THREE_OF_A_KIND",
	STRAIGHT = "STRAIGHT",
	FLUSH = "FLUSH",
	FULL_HOUSE = "FULL_HOUSE",
	FOUR_OF_A_KIND = "FOUR_OF_A_KIND",
	STRAIGHT_FLUSH = "STRAIGHT_FLUSH",
}

const rankValues =  {
	[Ranks.HIGH_CARD]: 0,
	[Ranks.PAIR]: 1,
	[Ranks.TWO_PAIR]: 2,
	[Ranks.THREE_OF_A_KIND]: 3,
	[Ranks.STRAIGHT]: 4,
	[Ranks.FLUSH]: 5,
	[Ranks.FULL_HOUSE]: 6,
	[Ranks.FOUR_OF_A_KIND]: 7,
	[Ranks.STRAIGHT_FLUSH]: 8,
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

const getHandRank = (data: string):Ranks => {
	if(isStraightFlush(data)){
		return Ranks.STRAIGHT_FLUSH
	}
	if(isStraight(data)){
		return Ranks.STRAIGHT
	}
	if(isFlush(data)){
		return Ranks.FLUSH
	}
	if(isPair(data)){
		if(isFourOfAKind(data)){
			return Ranks.FOUR_OF_A_KIND
		}
		if(isFullHouse(data)){
			return Ranks.FULL_HOUSE
		}
		if(isThreeOfAKing(data)){
			return Ranks.THREE_OF_A_KIND
		}
		if(isTwoPair(data)){
			return Ranks.TWO_PAIR
		}
		return Ranks.PAIR
	}
	return Ranks.HIGH_CARD
}

const getHandValue = (data: string):number => {
	const rankValue = rankValues[getHandRank(data)]
	const hand = convertStringToHand(data)
	const values = hand.map(card => getCardValue(card.value))
	const accumulatedCardValue = values.reduce((acc, currentValue) => acc + currentValue)
	return (rankValue ) + accumulatedCardValue
}

// Return value:
// 1  - hand a has higher rank
// -1 - hand b has higher rank
// 0  - hands have same rank
const comparePokerHands = (a: string, b: string): number => {
	const handValues = [getHandValue(a), getHandValue(b)]
	if(handValues[0] > handValues[1]){
		return 1
	}
	if(handValues[0] < handValues[1]){
		return -1
	}
	return 0;
};

const convertStringToHand = (handString: string): Card[] => {
	const splitHand = handString.split(" ");
	return splitHand.map((card) => {
		return new Card(card[0], card[1]);
	});
};

const groupByValue = (unsortedHand: Card[]): Card[][] => {
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
	return !!findXofAKind(hand, 2);
};

const findXofAKind = (data: Card[], x: number): Card[] | undefined => {
	const sorted = groupByValue(data);
	return sorted.find((cardGroup) => cardGroup.length === x);
};

const isTwoPair = (data: string): boolean => {
	const hand = convertStringToHand(data);
	const firstPair = findXofAKind(hand, 2);
	if (firstPair) {
		const filtered = hand.filter((card) => card.value != firstPair[0].value);
		return !!findXofAKind(filtered, 2);
	}
	return false;
};

const isOfSameSuite = (data:string):boolean => {
	const hand = convertStringToHand(data);
	return hand.every((card) => card.suite === hand[0].suite);
}

const isFlush = (data: string): boolean => {
	if(!isStraight(data)){
		return isOfSameSuite(data)
	}
	return false
};

const sortByValue = (hand: Card[]):Card[] => {
	const sorted = [...hand].sort((a,b) => {
		const valueA = cardValues.indexOf(a.value)
		const valueB = cardValues.indexOf(b.value)
		if (valueA < valueB) {
			return -1;
		  } else if (valueA > valueB) {
			return 1;
		  }
		  return 0;
	})
	return sorted
}

const getCardValue = (cardValue:string):number => {
	return cardValues.indexOf(cardValue)
}

const isStraight = (data: string): boolean => {
	const hand = convertStringToHand(data);
	const sorted = sortByValue(hand)
	//if highest is ace
	const highestValueCard = sorted[sorted.length-1]
	if(getCardValue(highestValueCard.value) === getCardValue(cardValues[cardValues.length-1])){
		//, and lowest is 2
		if(getCardValue(sorted[0].value) === getCardValue(cardValues[0])){
			//check that cards 0-3 are straight
			if(isStraight( data.slice(0, data.length-3) )){
				return true
			}
		}
	}
	
	const values = sorted.map(card => card.value)
	const res = values.slice(0, values.length-1).reduce((acc, currentValue, index) => {
		return acc && (getCardValue(values[index+1]) - getCardValue(currentValue) == 1)
	}, true)
	return res
}

const isStraightFlush = (data:string):boolean => {
	if(isStraight(data)){
		const hand = convertStringToHand(data);
		const suite = hand[0].suite
		return hand.every(card => card.suite === suite)
	}
	return false
}

const isFourOfAKind = (data:string):boolean => {
	const hand = convertStringToHand(data);
	return !!findXofAKind(hand, 4)
}

const isFullHouse = (data:string):boolean => {
	const hand = convertStringToHand(data);
	const pair = findXofAKind(hand, 2)
	if(!!pair){
		const handWithoutPair = hand.filter(card => card.value !== pair[0].value)
		return !!findXofAKind(handWithoutPair, 3)
	}
	return false
}

const isThreeOfAKing = (data:string):boolean => {
	const hand = convertStringToHand(data)
	return !!findXofAKind(hand, 3)
}

module.exports.Ranks = Ranks;
module.exports.cardValues = cardValues;
module.exports.cardSuites = cardSuites;
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
module.exports.isFlush = isFlush;
module.exports.findXofAKind = findXofAKind;
module.exports.isStraight = isStraight;
module.exports.sortByValue = sortByValue;
module.exports.Card = Card
module.exports.isStraightFlush = isStraightFlush
module.exports.isFourOfAKind = isFourOfAKind
module.exports.isFullHouse = isFullHouse
module.exports.isThreeOfAKing = isThreeOfAKing

