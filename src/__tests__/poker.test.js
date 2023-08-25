// import { comparePokerHands, HandValues } from "../dist/poker";

const poker = require("../dist/poker");

const {
	HandValues,
	cardValues,
	cardSuites,
	getHandType,
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
	findPair,
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

// describe("read hand string", () => {
// 	it("should return correct hand type", () => {
// 		expect(getHandType(handPairs[0].a)).toBe(HandValues.FLUSH);
// 	});
// });

describe("convert string to card array", () => {
	it("should correctly convert string to array of cards", () => {
		expect(convertStringToHand("2S AH 4H 5S 6C")).toEqual([
			{ value: "2", suite: "S" },
			{ value: "A", suite: "H" },
			{ value: "4", suite: "H" },
			{ value: "5", suite: "S" },
			{ value: "6", suite: "C" },
		]);
	});
});

describe.only("evaluate hand", () => {
	it("should recognise HIGH CARD", () => {
		expect(isHighCard(handPairs[0].a)).toBe(true);
		expect(isHighCard(handPairs[1].b)).toBe(false);
	});
	it("should recognise PAIR", () => {
		expect(isPair(handPairs[1].b)).toBe(true);
		expect(isPair(handPairs[0].a)).toBe(false);
	});
	it("should be able to find two cards of the same value", () => {
		expect(findPair("AH AC 5H 6H AS")).toBe(false);
		expect(findPair("AH AC 5H 5H 5S")).toBe(true);
	});
	// it("should recognise TWO PAIR", () => {
	// 	expect(isTwoPair(handPairs[1].b)).toBe(true);
	// 	expect(isTwoPair(handPairs[0].a)).toBe(false);
	// });
});

describe("compare 2 hands", () => {
	it("should return correct result", () => {
		expect(comparePokerHands(handPairs[0].a, handPairs[0].b)).toBe(-1);
	});
});

module.exports.handPairs = handPairs;
