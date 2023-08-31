// import { comparePokerHands, Ranks } from "../dist/poker";

const { describe, expect, it } = require("@jest/globals");
const poker = require("../poker");

const {
	Ranks,
	cardValues,
	cardSuites,
	getHandValue,
	comparePokerHands,
	isValidSuite,
	isValidValue,
	isValidInitialData,
	isValidCard,
	isValidHand,
	isValidPair,
	convertStringToHand,
	isHighCard,
	isPair,
	isTwoPair,
	isFlush,
	findXofAKind,
	isStraight,
	sortByValue,
	Card,
	isStraightFlush,
	isFourOfAKind,
	isFullHouse,
	isThreeOfAKing
} = poker;

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

const mock = [
{pair: { a: "2H 3H 4H 5H 6H", b: "KS AS TS QS JS" }, result: -1},
{pair: { a: "2H 3H 4H 5H 6H", b: "AS AD AC AH JD" }, result: 1},
{pair: { a: "AS AH 2H AD AC", b: "JS JD JC JH 3D" }, result: 1},
{pair: { a: "2S AH 2H AS AC", b: "JS JD JC JH AD" }, result: -1},
{pair: { a: "2S AH 2H AS AC", b: "2H 3H 5H 6H 7H" }, result: 1},
{pair: { a: "AS 3S 4S 8S 2S", b: "2H 3H 5H 6H 7H" }, result: 1},
{pair: { a: "2H 3H 5H 6H 7H", b: "2S 3H 4H 5S 6C" }, result: 1},
{pair: { a: "2S 3H 4H 5S 6C", b: "3D 4C 5H 6H 2S" }, result: 0},
{pair: { a: "2S 3H 4H 5S 6C", b: "AH AC 5H 6H AS" }, result: 1},
{pair: { a: "2S 2H 4H 5S 4C", b: "AH AC 5H 6H AS" }, result: -1},
{pair: { a: "2S 2H 4H 5S 4C", b: "AH AC 5H 6H 7S" }, result: 1},
{pair: { a: "6S AD 7H 4S AS", b: "AH AC 5H 6H 7S" }, result: -1},
{pair: { a: "2S AH 4H 5S KC", b: "AH AC 5H 6H 7S" }, result: -1},
{pair: { a: "2S 3H 6H 7S 9C", b: "7H 3C TH 6H 9S" }, result: -1},
{pair: { a: "4S 5H 6H TS AC", b: "3S 5H 6H TS AC" }, result: 1},
{pair: { a: "2S AH 4H 5S 6C", b: "AD 4C 5H 6H 2C" }, result: 0}
]

const invalidHandPairs = [
	{ a: "2H 3H 4H 5H 6H BB", b: "KS AS TS QS JS" },
	{ a: "2H 3H 4H 5H 6B", b: "KS AS TS QS JS" },
];

describe("validate initial data", () => {
	it("should have valid cards", () => {
		expect(isValidCard("AH")).toBe(true);
		expect(isValidCard("AHH")).toBe(false);
	});
	it("should only have valid hands", () => {
		expect(isValidHand("2H 3H 4H 5H 6H")).toBe(true);
		expect(isValidHand("AHH")).toBe(false);
		expect(isValidHand("2H 3H 4H 5H 6B")).toBe(false);
	});
	it("should only have valid pairs", () => {
		expect(isValidPair(handPairs[0])).toBe(true);
		expect(isValidPair(invalidHandPairs[0])).toBe(false);
		expect(isValidPair(invalidHandPairs[1])).toBe(false);
	});
	it("should be valid", () => {
		expect(isValidInitialData(handPairs)).toBe(true);
		expect(isValidInitialData(invalidHandPairs)).toBe(false);
	});
});

describe("parse card", () => {
	it("should have valid suite", () => {
		expect(isValidSuite("H")).toBe(true);
		expect(isValidSuite("M")).toBe(false);
	});
	it("should have valid suite", () => {
		expect(isValidValue("2")).toBe(true);
		expect(isValidValue("g")).toBe(false);
	});
});

describe.only("evaluate hand", () => {
	it("should recognise HIGH CARD", () => {
		expect(isHighCard(handPairs[0].a)).toBe(true);
		expect(isHighCard(handPairs[1].b)).toBe(false);
	});

	it("should recognise STRAIGHT FLUSH", () => {
		expect(isStraightFlush("2H 3H 4H 5H 6H")).toBe(true)
		expect(isStraightFlush("2H 3H 4H 5H 6S")).toBe(false)
		expect(isStraightFlush("2H 3H 4H 5H 7H")).toBe(false)
	})
	it("should recognise FOUR OF A KIND", () => {
		expect(isFourOfAKind("2H 2H 2H 2H 6H")).toBe(true)
		expect(isFourOfAKind("2H 3H 4H 5H 6S")).toBe(false)
	})
	it("should recognise FULL HOUSE", () => {
		expect(isFullHouse("2H 2H 2H 5H 5H")).toBe(true)
		expect(isFullHouse("2H 2H 4H 4H 6S")).toBe(false)
		expect(isFullHouse("2H 5H 3H 4H 6S")).toBe(false)
	})
	it("should recognise FLUSH", () => {
		expect(isFlush("AH AH KH KH QH")).toBe(true);
		expect(isFlush("AH QH 5H 5H 5S")).toBe(false);
		expect(isFlush("2H 3H 4H 5H 6H")).toBe(false);
	});
	it("should recognise STRAIGHT", () => {
		expect(isStraight("2H 3H 4H 5H 6S")).toBe(true)
		expect(isStraight("AH 2H 3H 4H 5H")).toBe(true)
		expect(isStraight("2H 3H 4H 5H 7S")).toBe(false)
		expect(isStraight("2H 3H 3H 5H 7S")).toBe(false)
	})
	it("should recognise THREE OF A KINF", () => {
		expect(isThreeOfAKing("2H 3H 2H 5H 2S")).toBe(true)
		expect(isThreeOfAKing("2H 3H 4H 5H 7S")).toBe(false)
	})
	it("should recognise TWO PAIR", () => {
		expect(isTwoPair("AH AC KH KH QS")).toBe(true);
		expect(isTwoPair("AH QC 5H 5H 5S")).toBe(false);
	});	
	it("should recognise PAIR", () => {
		expect(isPair("AH AC 5H 6H AS")).toBe(false);
		expect(isPair("AH AC 5H 5H 5S")).toBe(true);
	});
});

describe("helpers", () => {
	const handData = "2S AH 4H 5S 6C"
	const hand = convertStringToHand(handData)
	it("two arrays are equal", () => {
		expect([1,2]).toEqual([1,2])
	})
	it("should correctly convert string to array of cards", () => {
		expect((convertStringToHand(handData))).toEqual(([
			new Card("2", "S"),
			new Card("A", "H"),
			new Card("4", "H"),
			new Card("5", "S"),
			new Card("6", "C")
		]));
	});
	it("should correctly sort hand", () => {
		const expected = [
			new Card("2", "S"),
			new Card("4", "H"),
			new Card("5", "S"),
			new Card("6", "C"),
			new Card("A", "H")
		]
		const sorted = sortByValue(hand)
		expect((sorted)).toEqual((expected));
	})
	it("should recognise be able to find x cards of the same value", () => {
		expect(!!findXofAKind(convertStringToHand("AH AC KH KH QS"), 2)).toBe(true);
		expect(!!findXofAKind(convertStringToHand("AH AC AH KH QS"), 2)).toBe(
			false
		);
		expect(!!findXofAKind(convertStringToHand("AH AC AH 5H 5S"), 3)).toBe(true);
		expect(!!findXofAKind(convertStringToHand("AH AC AH AH 5S"), 3)).toBe(
			false
		);
		expect(!!findXofAKind(convertStringToHand("AH AC AH AH 5S"), 4)).toBe(true);
	});
})

describe.only("compare 2 hands", () => {
	mock.forEach(scenario => {
		it("should return correct result", () => {
			expect(comparePokerHands(scenario.pair.a, scenario.pair.b)).toBe(scenario.result);
		});
	})
});

module.exports.handPairs = handPairs;
