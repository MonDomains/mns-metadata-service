import avaTest, { ExecutionContext, TestFn } from 'ava';
import { TestContext } from '../../mock/interface';
import { characterSet } from '../base';
import { findCharacterSet, isASCII } from './characterSet';

const test = avaTest as TestFn<TestContext>;

const getLabel = (name: string) => name.substring(0, name.indexOf('.'));

test('should retrieve letter character set for nick.mon', (t: ExecutionContext<TestContext>) => {
  const MNS = 'nick.mon';
  const result = findCharacterSet(getLabel(MNS));
  t.is(result, characterSet.LETTER);
});

test('should retrieve digit character set for 9898.mon', (t: ExecutionContext<TestContext>) => {
  const MNS = '9898.mon';
  const result = findCharacterSet(getLabel(MNS));
  t.is(result, characterSet.DIGIT);
});

test('should retrieve alphanumeric character set for 0xmatoken.mon', (t: ExecutionContext<TestContext>) => {
  const MNS = '0xmatoken.mon';
  const result = findCharacterSet(getLabel(MNS));
  t.is(result, characterSet.ALPHANUMERIC);
});

test('should retrieve emoji character set for 👨🏻‍🚀👨🏻‍🚀👨🏻‍🚀.mon', (t: ExecutionContext<TestContext>) => {
  const MNS = '👨🏻‍🚀👨🏻‍🚀👨🏻‍🚀.mon';
  const result = findCharacterSet(getLabel(MNS));
  t.is(result, characterSet.EMOJI);
});

test('should retrieve alphanumeric character set for Japanese', (t: ExecutionContext<TestContext>) => {
  const MNS = '太陽.mon';
  const result = findCharacterSet(getLabel(MNS));
  t.is(result, characterSet.ALPHANUMERIC);
});

test('should retrieve alphanumeric character set for Turkish', (t: ExecutionContext<TestContext>) => {
  const MNS = 'güneş.mon';
  const result = findCharacterSet(getLabel(MNS));
  t.is(result, characterSet.ALPHANUMERIC);
});

test('should retrieve alphanumeric character set for Russian', (t: ExecutionContext<TestContext>) => {
  const MNS = 'солнце.mon';
  const result = findCharacterSet(getLabel(MNS));
  t.is(result, characterSet.ALPHANUMERIC);
});

test('should retrieve alphanumeric character set for Hebrew', (t: ExecutionContext<TestContext>) => {
  const MNS = 'שמש.mon';
  const result = findCharacterSet(getLabel(MNS));
  t.is(result, characterSet.ALPHANUMERIC);
});

test('should retrieve alphanumeric character set for Arabic', (t: ExecutionContext<TestContext>) => {
  const MNS = 'الشمس.mon';
  const result = findCharacterSet(getLabel(MNS));
  t.is(result, characterSet.ALPHANUMERIC);
});

test('should retrieve alphanumeric character set for Korean', (t: ExecutionContext<TestContext>) => {
  const MNS = '태양.mon';
  const result = findCharacterSet(getLabel(MNS));
  t.is(result, characterSet.ALPHANUMERIC);
});

test('should retrieve alphanumeric character set for Chinese', (t: ExecutionContext<TestContext>) => {
  const MNS = '太陽.mon';
  const result = findCharacterSet(getLabel(MNS));
  t.is(result, characterSet.ALPHANUMERIC);
});

test('should retrieve alphanumeric character set for emoji + letters', (t: ExecutionContext<TestContext>) => {
  const MNS = '🥛shake.mon';
  const result = findCharacterSet(getLabel(MNS));
  t.is(result, characterSet.MIXED);
});

test('should retrieve emoji character set for given emojis', (t: ExecutionContext<TestContext>) => {
  const emojis = "🧑🏻‍❤️‍💋‍🧑🏼🧑🏻‍❤️‍💋‍🧑🏽🧑🏻‍❤️‍💋‍🧑🏾🧑🏻‍❤️‍💋‍🧑🏿🧑🏼‍❤️‍💋‍🧑🏻🧑🏼‍❤️‍💋‍🧑🏽🧑🏼‍❤️‍💋‍🧑🏾🧑🏼‍❤️‍💋‍🧑🏿🧑🏽‍❤️‍💋‍🧑🏻🧑🏽‍❤️‍💋‍🧑🏼🧑🏽‍❤️‍💋‍🧑🏾🧑🏽‍❤️‍💋‍🧑🏿🧑🏾‍❤️‍💋‍🧑🏻🧑🏾‍❤️‍💋‍🧑🏼🧑🏾‍❤️‍💋‍🧑🏽🧑🏾‍❤️‍💋‍🧑🏿🧑🏿‍❤️‍💋‍🧑🏻🧑🏿‍❤️‍💋‍🧑🏼🧑🏿‍❤️‍💋‍🧑🏽🧑🏿‍❤️‍💋‍🧑🏾👩🏻‍❤️‍💋‍👨🏻👩🏻‍❤️‍💋‍👨🏼👩🏻‍❤️‍💋‍👨🏽👩🏻‍❤️‍💋‍👨🏾👩🏻‍❤️‍💋‍👨🏿👩🏼‍❤️‍💋‍👨🏻👩🏼‍❤️‍💋‍👨🏼👩🏼‍❤️‍💋‍👨🏽👩🏼‍❤️‍💋‍👨🏾👩🏼‍❤️‍💋‍👨🏿👩🏽‍❤️‍💋‍👨🏻👩🏽‍❤️‍💋‍👨🏼👩🏽‍❤️‍💋‍👨🏽👩🏽‍❤️‍💋‍👨🏾👩🏽‍❤️‍💋‍👨🏿👩🏾‍❤️‍💋‍👨🏻👩🏾‍❤️‍💋‍👨🏼👩🏾‍❤️‍💋‍👨🏽👩🏾‍❤️‍💋‍👨🏾👩🏾‍❤️‍💋‍👨🏿👩🏿‍❤️‍💋‍👨🏻👩🏿‍❤️‍💋‍👨🏼👩🏿‍❤️‍💋‍👨🏽👩🏿‍❤️‍💋‍👨🏾👩🏿‍❤️‍💋‍👨🏿👨🏻‍❤️‍💋‍👨🏻👨🏻‍❤️‍💋‍👨🏼👨🏻‍❤️‍💋‍👨🏽👨🏻‍❤️‍💋‍👨🏾👨🏻‍❤️‍💋‍👨🏿👨🏼‍❤️‍💋‍👨🏻👨🏼‍❤️‍💋‍👨🏼👨🏼‍❤️‍💋‍👨🏽👨🏼‍❤️‍💋‍👨🏾👨🏼‍❤️‍💋‍👨🏿👨🏽‍❤️‍💋‍👨🏻👨🏽‍❤️‍💋‍👨🏼👨🏽‍❤️‍💋‍👨🏽👨🏽‍❤️‍💋‍👨🏾👨🏽‍❤️‍💋‍👨🏿👨🏾‍❤️‍💋‍👨🏻👨🏾‍❤️‍💋‍👨🏼👨🏾‍❤️‍💋‍👨🏽👨🏾‍❤️‍💋‍👨🏾👨🏾‍❤️‍💋‍👨🏿👨🏿‍❤️‍💋‍👨🏻👨🏿‍❤️‍💋‍👨🏼👨🏿‍❤️‍💋‍👨🏽👨🏿‍❤️‍💋‍👨🏾👨🏿‍❤️‍💋‍👨🏿👩🏻‍❤️‍💋‍👩🏻👩🏻‍❤️‍💋‍👩🏼👩🏻‍❤️‍💋‍👩🏽👩🏻‍❤️‍💋‍👩🏾👩🏻‍❤️‍💋‍👩🏿👩🏼‍❤️‍💋‍👩🏻👩🏼‍❤️‍💋‍👩🏼👩🏼‍❤️‍💋‍👩🏽👩🏼‍❤️‍💋‍👩🏾👩🏼‍❤️‍💋‍👩🏿👩🏽‍❤️‍💋‍👩🏻👩🏽‍❤️‍💋‍👩🏼👩🏽‍❤️‍💋‍👩🏽👩🏽‍❤️‍💋‍👩🏾👩🏽‍❤️‍💋‍👩🏿👩🏾‍❤️‍💋‍👩🏻👩🏾‍❤️‍💋‍👩🏼👩🏾‍❤️‍💋‍👩🏽👩🏾‍❤️‍💋‍👩🏾👩🏾‍❤️‍💋‍👩🏿👩🏿‍❤️‍💋‍👩🏻👩🏿‍❤️‍💋‍👩🏼👩🏿‍❤️‍💋‍👩🏽👩🏿‍❤️‍💋‍👩🏾👩🏿‍❤️‍💋‍👩🏿🏴󠁧󠁢󠁥󠁮󠁧󠁿🏴󠁧󠁢󠁳󠁣󠁴󠁿🏴󠁧󠁢󠁷󠁬󠁳󠁿🧑🏻‍🤝‍🧑🏻🧑🏻‍🤝‍🧑🏼🧑🏻‍🤝‍🧑🏽🧑🏻‍🤝‍🧑🏾🧑🏻‍🤝‍🧑🏿🧑🏼‍🤝‍🧑🏻🧑🏼‍🤝‍🧑🏼🧑🏼‍🤝‍🧑🏽🧑🏼‍🤝‍🧑🏾🧑🏼‍🤝‍🧑🏿🧑🏽‍🤝‍🧑🏻🧑🏽‍🤝‍🧑🏼🧑🏽‍🤝‍🧑🏽🧑🏽‍🤝‍🧑🏾🧑🏽‍🤝‍🧑🏿🧑🏾‍🤝‍🧑🏻🧑🏾‍🤝‍🧑🏼🧑🏾‍🤝‍🧑🏽🧑🏾‍🤝‍🧑🏾🧑🏾‍🤝‍🧑🏿🧑🏿‍🤝‍🧑🏻🧑🏿‍🤝‍🧑🏼🧑🏿‍🤝‍🧑🏽🧑🏿‍🤝‍🧑🏾🧑🏿‍🤝‍🧑🏿👩🏻‍🤝‍👩🏼👩🏻‍🤝‍👩🏽👩🏻‍🤝‍👩🏾👩🏻‍🤝‍👩🏿👩🏼‍🤝‍👩🏻👩🏼‍🤝‍👩🏽👩🏼‍🤝‍👩🏾👩🏼‍🤝‍👩🏿👩🏽‍🤝‍👩🏻👩🏽‍🤝‍👩🏼👩🏽‍🤝‍👩🏾👩🏽‍🤝‍👩🏿👩🏾‍🤝‍👩🏻👩🏾‍🤝‍👩🏼👩🏾‍🤝‍👩🏽👩🏾‍🤝‍👩🏿👩🏿‍🤝‍👩🏻👩🏿‍🤝‍👩🏼👩🏿‍🤝‍👩🏽👩🏿‍🤝‍👩🏾👩🏻‍🤝‍👨🏼👩🏻‍🤝‍👨🏽👩🏻‍🤝‍👨🏾👩🏻‍🤝‍👨🏿👩🏼‍🤝‍👨🏻👩🏼‍🤝‍👨🏽👩🏼‍🤝‍👨🏾👩🏼‍🤝‍👨🏿👩🏽‍🤝‍👨🏻👩🏽‍🤝‍👨🏼👩🏽‍🤝‍👨🏾👩🏽‍🤝‍👨🏿👩🏾‍🤝‍👨🏻👩🏾‍🤝‍👨🏼👩🏾‍🤝‍👨🏽👩🏾‍🤝‍👨🏿👩🏿‍🤝‍👨🏻👩🏿‍🤝‍👨🏼👩🏿‍🤝‍👨🏽👩🏿‍🤝‍👨🏾👨🏻‍🤝‍👨🏼👨🏻‍🤝‍👨🏽👨🏻‍🤝‍👨🏾👨🏻‍🤝‍👨🏿👨🏼‍🤝‍👨🏻👨🏼‍🤝‍👨🏽👨🏼‍🤝‍👨🏾👨🏼‍🤝‍👨🏿👨🏽‍🤝‍👨🏻👨🏽‍🤝‍👨🏼👨🏽‍🤝‍👨🏾👨🏽‍🤝‍👨🏿👨🏾‍🤝‍👨🏻👨🏾‍🤝‍👨🏼👨🏾‍🤝‍👨🏽👨🏾‍🤝‍👨🏿👨🏿‍🤝‍👨🏻👨🏿‍🤝‍👨🏼👨🏿‍🤝‍👨🏽👨🏿‍🤝‍👨🏾🧑🏻‍❤️‍🧑🏼🧑🏻‍❤️‍🧑🏽🧑🏻‍❤️‍🧑🏾🧑🏻‍❤️‍🧑🏿🧑🏼‍❤️‍🧑🏻🧑🏼‍❤️‍🧑🏽🧑🏼‍❤️‍🧑🏾🧑🏼‍❤️‍🧑🏿🧑🏽‍❤️‍🧑🏻🧑🏽‍❤️‍🧑🏼🧑🏽‍❤️‍🧑🏾🧑🏽‍❤️‍🧑🏿🧑🏾‍❤️‍🧑🏻🧑🏾‍❤️‍🧑🏼🧑🏾‍❤️‍🧑🏽🧑🏾‍❤️‍🧑🏿🧑🏿‍❤️‍🧑🏻🧑🏿‍❤️‍🧑🏼🧑🏿‍❤️‍🧑🏽🧑🏿‍❤️‍🧑🏾👩🏻‍❤️‍👨🏻👩🏻‍❤️‍👨🏼👩🏻‍❤️‍👨🏽👩🏻‍❤️‍👨🏾👩🏻‍❤️‍👨🏿👩🏼‍❤️‍👨🏻👩🏼‍❤️‍👨🏼👩🏼‍❤️‍👨🏽👩🏼‍❤️‍👨🏾👩🏼‍❤️‍👨🏿👩🏽‍❤️‍👨🏻👩🏽‍❤️‍👨🏼👩🏽‍❤️‍👨🏽👩🏽‍❤️‍👨🏾👩🏽‍❤️‍👨🏿👩🏾‍❤️‍👨🏻👩🏾‍❤️‍👨🏼👩🏾‍❤️‍👨🏽👩🏾‍❤️‍👨🏾👩🏾‍❤️‍👨🏿👩🏿‍❤️‍👨🏻👩🏿‍❤️‍👨🏼👩🏿‍❤️‍👨🏽👩🏿‍❤️‍👨🏾👩🏿‍❤️‍👨🏿👨🏻‍❤️‍👨🏻👨🏻‍❤️‍👨🏼👨🏻‍❤️‍👨🏽👨🏻‍❤️‍👨🏾👨🏻‍❤️‍👨🏿👨🏼‍❤️‍👨🏻👨🏼‍❤️‍👨🏼👨🏼‍❤️‍👨🏽👨🏼‍❤️‍👨🏾👨🏼‍❤️‍👨🏿👨🏽‍❤️‍👨🏻👨🏽‍❤️‍👨🏼👨🏽‍❤️‍👨🏽👨🏽‍❤️‍👨🏾👨🏽‍❤️‍👨🏿👨🏾‍❤️‍👨🏻👨🏾‍❤️‍👨🏼👨🏾‍❤️‍👨🏽👨🏾‍❤️‍👨🏾👨🏾‍❤️‍👨🏿👨🏿‍❤️‍👨🏻👨🏿‍❤️‍👨🏼👨🏿‍❤️‍👨🏽👨🏿‍❤️‍👨🏾👨🏿‍❤️‍👨🏿👩🏻‍❤️‍👩🏻👩🏻‍❤️‍👩🏼👩🏻‍❤️‍👩🏽👩🏻‍❤️‍👩🏾👩🏻‍❤️‍👩🏿👩🏼‍❤️‍👩🏻👩🏼‍❤️‍👩🏼👩🏼‍❤️‍👩🏽👩🏼‍❤️‍👩🏾👩🏼‍❤️‍👩🏿👩🏽‍❤️‍👩🏻👩🏽‍❤️‍👩🏼👩🏽‍❤️‍👩🏽👩🏽‍❤️‍👩🏾👩🏽‍❤️‍👩🏿👩🏾‍❤️‍👩🏻👩🏾‍❤️‍👩🏼👩🏾‍❤️‍👩🏽👩🏾‍❤️‍👩🏾👩🏾‍❤️‍👩🏿👩🏿‍❤️‍👩🏻👩🏿‍❤️‍👩🏼👩🏿‍❤️‍👩🏽👩🏿‍❤️‍👩🏾👩🏿‍❤️‍👩🏿👩‍❤️‍💋‍👨👨‍❤️‍💋‍👨👩‍❤️‍💋‍👩👨‍👩‍👧‍👦👨‍👩‍👦‍👦👨‍👩‍👧‍👧👨‍👨‍👧‍👦👨‍👨‍👦‍👦👨‍👨‍👧‍👧👩‍👩‍👧‍👦👩‍👩‍👦‍👦👩‍👩‍👧‍👧🧑‍🤝‍🧑👩‍❤️‍👨👨‍❤️‍👨👩‍❤️‍👩👨‍👩‍👦👨‍👩‍👧👨‍👨‍👦👨‍👨‍👧👩‍👩‍👦👩‍👩‍👧👨‍👦‍👦👨‍👧‍👦👨‍👧‍👧👩‍👦‍👦👩‍👧‍👦👩‍👧‍👧👁️‍🗨️🧔🏻‍♂️🧔🏼‍♂️🧔🏽‍♂️🧔🏾‍♂️🧔🏿‍♂️🧔🏻‍♀️🧔🏼‍♀️🧔🏽‍♀️🧔🏾‍♀️🧔🏿‍♀️👨🏻‍🦰👨🏼‍🦰👨🏽‍🦰👨🏾‍🦰👨🏿‍🦰👨🏻‍🦱👨🏼‍🦱👨🏽‍🦱👨🏾‍🦱👨🏿‍🦱👨🏻‍🦳👨🏼‍🦳👨🏽‍🦳👨🏾‍🦳👨🏿‍🦳👨🏻‍🦲👨🏼‍🦲👨🏽‍🦲👨🏾‍🦲👨🏿‍🦲👩🏻‍🦰👩🏼‍🦰👩🏽‍🦰👩🏾‍🦰👩🏿‍🦰🧑🏻‍🦰🧑🏼‍🦰🧑🏽‍🦰🧑🏾‍🦰🧑🏿‍🦰👩🏻‍🦱👩🏼‍🦱👩🏽‍🦱👩🏾‍🦱👩🏿‍🦱🧑🏻‍🦱🧑🏼‍🦱🧑🏽‍🦱🧑🏾‍🦱🧑🏿‍🦱👩🏻‍🦳👩🏼‍🦳👩🏽‍🦳👩🏾‍🦳👩🏿‍🦳🧑🏻‍🦳🧑🏼‍🦳🧑🏽‍🦳🧑🏾‍🦳🧑🏿‍🦳👩🏻‍🦲👩🏼‍🦲👩🏽‍🦲👩🏾‍🦲👩🏿‍🦲🧑🏻‍🦲🧑🏼‍🦲🧑🏽‍🦲🧑🏾‍🦲🧑🏿‍🦲👱🏻‍♀️👱🏼‍♀️👱🏽‍♀️👱🏾‍♀️👱🏿‍♀️👱🏻‍♂️👱🏼‍♂️👱🏽‍♂️👱🏾‍♂️👱🏿‍♂️🙍🏻‍♂️🙍🏼‍♂️🙍🏽‍♂️🙍🏾‍♂️🙍🏿‍♂️🙍🏻‍♀️🙍🏼‍♀️🙍🏽‍♀️🙍🏾‍♀️🙍🏿‍♀️🙎🏻‍♂️🙎🏼‍♂️🙎🏽‍♂️🙎🏾‍♂️🙎🏿‍♂️🙎🏻‍♀️🙎🏼‍♀️🙎🏽‍♀️🙎🏾‍♀️🙎🏿‍♀️🙅🏻‍♂️🙅🏼‍♂️🙅🏽‍♂️🙅🏾‍♂️🙅🏿‍♂️🙅🏻‍♀️🙅🏼‍♀️🙅🏽‍♀️🙅🏾‍♀️🙅🏿‍♀️🙆🏻‍♂️🙆🏼‍♂️🙆🏽‍♂️🙆🏾‍♂️🙆🏿‍♂️🙆🏻‍♀️🙆🏼‍♀️🙆🏽‍♀️🙆🏾‍♀️🙆🏿‍♀️💁🏻‍♂️💁🏼‍♂️💁🏽‍♂️💁🏾‍♂️💁🏿‍♂️💁🏻‍♀️💁🏼‍♀️💁🏽‍♀️💁🏾‍♀️💁🏿‍♀️🙋🏻‍♂️🙋🏼‍♂️🙋🏽‍♂️🙋🏾‍♂️🙋🏿‍♂️🙋🏻‍♀️🙋🏼‍♀️🙋🏽‍♀️🙋🏾‍♀️🙋🏿‍♀️🧏🏻‍♂️🧏🏼‍♂️🧏🏽‍♂️🧏🏾‍♂️🧏🏿‍♂️🧏🏻‍♀️🧏🏼‍♀️🧏🏽‍♀️🧏🏾‍♀️🧏🏿‍♀️🙇🏻‍♂️🙇🏼‍♂️🙇🏽‍♂️🙇🏾‍♂️🙇🏿‍♂️🙇🏻‍♀️🙇🏼‍♀️🙇🏽‍♀️🙇🏾‍♀️🙇🏿‍♀️🤦🏻‍♂️🤦🏼‍♂️🤦🏽‍♂️🤦🏾‍♂️🤦🏿‍♂️🤦🏻‍♀️🤦🏼‍♀️🤦🏽‍♀️🤦🏾‍♀️🤦🏿‍♀️🤷🏻‍♂️🤷🏼‍♂️🤷🏽‍♂️🤷🏾‍♂️🤷🏿‍♂️🤷🏻‍♀️🤷🏼‍♀️🤷🏽‍♀️🤷🏾‍♀️🤷🏿‍♀️🧑🏻‍⚕️🧑🏼‍⚕️🧑🏽‍⚕️🧑🏾‍⚕️🧑🏿‍⚕️👨🏻‍⚕️👨🏼‍⚕️👨🏽‍⚕️👨🏾‍⚕️👨🏿‍⚕️👩🏻‍⚕️👩🏼‍⚕️👩🏽‍⚕️👩🏾‍⚕️👩🏿‍⚕️🧑🏻‍🎓🧑🏼‍🎓🧑🏽‍🎓🧑🏾‍🎓🧑🏿‍🎓👨🏻‍🎓👨🏼‍🎓👨🏽‍🎓👨🏾‍🎓👨🏿‍🎓👩🏻‍🎓👩🏼‍🎓👩🏽‍🎓👩🏾‍🎓👩🏿‍🎓🧑🏻‍🏫🧑🏼‍🏫🧑🏽‍🏫🧑🏾‍🏫🧑🏿‍🏫👨🏻‍🏫👨🏼‍🏫👨🏽‍🏫👨🏾‍🏫👨🏿‍🏫👩🏻‍🏫👩🏼‍🏫👩🏽‍🏫👩🏾‍🏫👩🏿‍🏫🧑🏻‍⚖️🧑🏼‍⚖️🧑🏽‍⚖️🧑🏾‍⚖️🧑🏿‍⚖️👨🏻‍⚖️👨🏼‍⚖️👨🏽‍⚖️👨🏾‍⚖️👨🏿‍⚖️👩🏻‍⚖️👩🏼‍⚖️👩🏽‍⚖️👩🏾‍⚖️👩🏿‍⚖️🧑🏻‍🌾🧑🏼‍🌾🧑🏽‍🌾🧑🏾‍🌾🧑🏿‍🌾👨🏻‍🌾👨🏼‍🌾👨🏽‍🌾👨🏾‍🌾👨🏿‍🌾👩🏻‍🌾👩🏼‍🌾👩🏽‍🌾👩🏾‍🌾👩🏿‍🌾🧑🏻‍🍳🧑🏼‍🍳🧑🏽‍🍳🧑🏾‍🍳🧑🏿‍🍳👨🏻‍🍳👨🏼‍🍳👨🏽‍🍳👨🏾‍🍳👨🏿‍🍳👩🏻‍🍳👩🏼‍🍳👩🏽‍🍳👩🏾‍🍳👩🏿‍🍳🧑🏻‍🔧🧑🏼‍🔧🧑🏽‍🔧🧑🏾‍🔧🧑🏿‍🔧👨🏻‍🔧👨🏼‍🔧👨🏽‍🔧👨🏾‍🔧👨🏿‍🔧👩🏻‍🔧👩🏼‍🔧👩🏽‍🔧👩🏾‍🔧👩🏿‍🔧🧑🏻‍🏭🧑🏼‍🏭🧑🏽‍🏭🧑🏾‍🏭🧑🏿‍🏭👨🏻‍🏭👨🏼‍🏭👨🏽‍🏭👨🏾‍🏭👨🏿‍🏭👩🏻‍🏭👩🏼‍🏭👩🏽‍🏭👩🏾‍🏭👩🏿‍🏭🧑🏻‍💼🧑🏼‍💼🧑🏽‍💼🧑🏾‍💼🧑🏿‍💼👨🏻‍💼👨🏼‍💼👨🏽‍💼👨🏾‍💼👨🏿‍💼👩🏻‍💼👩🏼‍💼👩🏽‍💼👩🏾‍💼👩🏿‍💼🧑🏻‍🔬🧑🏼‍🔬🧑🏽‍🔬🧑🏾‍🔬🧑🏿‍🔬👨🏻‍🔬👨🏼‍🔬👨🏽‍🔬👨🏾‍🔬👨🏿‍🔬👩🏻‍🔬👩🏼‍🔬👩🏽‍🔬👩🏾‍🔬👩🏿‍🔬🧑🏻‍💻🧑🏼‍💻🧑🏽‍💻🧑🏾‍💻🧑🏿‍💻👨🏻‍💻👨🏼‍💻👨🏽‍💻👨🏾‍💻👨🏿‍💻👩🏻‍💻👩🏼‍💻👩🏽‍💻👩🏾‍💻👩🏿‍💻🧑🏻‍🎤🧑🏼‍🎤🧑🏽‍🎤🧑🏾‍🎤🧑🏿‍🎤👨🏻‍🎤👨🏼‍🎤👨🏽‍🎤👨🏾‍🎤👨🏿‍🎤👩🏻‍🎤👩🏼‍🎤👩🏽‍🎤👩🏾‍🎤👩🏿‍🎤🧑🏻‍🎨🧑🏼‍🎨🧑🏽‍🎨🧑🏾‍🎨🧑🏿‍🎨👨🏻‍🎨👨🏼‍🎨👨🏽‍🎨👨🏾‍🎨👨🏿‍🎨👩🏻‍🎨👩🏼‍🎨👩🏽‍🎨👩🏾‍🎨👩🏿‍🎨🧑🏻‍✈️🧑🏼‍✈️🧑🏽‍✈️🧑🏾‍✈️🧑🏿‍✈️👨🏻‍✈️👨🏼‍✈️👨🏽‍✈️👨🏾‍✈️👨🏿‍✈️👩🏻‍✈️👩🏼‍✈️👩🏽‍✈️👩🏾‍✈️👩🏿‍✈️🧑🏻‍🚀🧑🏼‍🚀🧑🏽‍🚀🧑🏾‍🚀🧑🏿‍🚀👨🏻‍🚀👨🏼‍🚀👨🏽‍🚀👨🏾‍🚀👨🏿‍🚀👩🏻‍🚀👩🏼‍🚀👩🏽‍🚀👩🏾‍🚀👩🏿‍🚀🧑🏻‍🚒🧑🏼‍🚒🧑🏽‍🚒🧑🏾‍🚒🧑🏿‍🚒👨🏻‍🚒👨🏼‍🚒👨🏽‍🚒👨🏾‍🚒👨🏿‍🚒👩🏻‍🚒👩🏼‍🚒👩🏽‍🚒👩🏾‍🚒👩🏿‍🚒👮🏻‍♂️👮🏼‍♂️👮🏽‍♂️👮🏾‍♂️👮🏿‍♂️👮🏻‍♀️👮🏼‍♀️👮🏽‍♀️👮🏾‍♀️👮🏿‍♀️🕵🏻‍♂️🕵🏼‍♂️🕵🏽‍♂️🕵🏾‍♂️🕵🏿‍♂️🕵🏻‍♀️🕵🏼‍♀️🕵🏽‍♀️🕵🏾‍♀️🕵🏿‍♀️💂🏻‍♂️💂🏼‍♂️💂🏽‍♂️💂🏾‍♂️💂🏿‍♂️💂🏻‍♀️💂🏼‍♀️💂🏽‍♀️💂🏾‍♀️💂🏿‍♀️👷🏻‍♂️👷🏼‍♂️👷🏽‍♂️👷🏾‍♂️👷🏿‍♂️👷🏻‍♀️👷🏼‍♀️👷🏽‍♀️👷🏾‍♀️👷🏿‍♀️👳🏻‍♂️👳🏼‍♂️👳🏽‍♂️👳🏾‍♂️👳🏿‍♂️👳🏻‍♀️👳🏼‍♀️👳🏽‍♀️👳🏾‍♀️👳🏿‍♀️🤵🏻‍♂️🤵🏼‍♂️🤵🏽‍♂️🤵🏾‍♂️🤵🏿‍♂️🤵🏻‍♀️🤵🏼‍♀️🤵🏽‍♀️🤵🏾‍♀️🤵🏿‍♀️👰🏻‍♂️👰🏼‍♂️👰🏽‍♂️👰🏾‍♂️👰🏿‍♂️👰🏻‍♀️👰🏼‍♀️👰🏽‍♀️👰🏾‍♀️👰🏿‍♀️👩🏻‍🍼👩🏼‍🍼👩🏽‍🍼👩🏾‍🍼👩🏿‍🍼👨🏻‍🍼👨🏼‍🍼👨🏽‍🍼👨🏾‍🍼👨🏿‍🍼🧑🏻‍🍼🧑🏼‍🍼🧑🏽‍🍼🧑🏾‍🍼🧑🏿‍🍼🧑🏻‍🎄🧑🏼‍🎄🧑🏽‍🎄🧑🏾‍🎄🧑🏿‍🎄🦸🏻‍♂️🦸🏼‍♂️🦸🏽‍♂️🦸🏾‍♂️🦸🏿‍♂️🦸🏻‍♀️🦸🏼‍♀️🦸🏽‍♀️🦸🏾‍♀️🦸🏿‍♀️🦹🏻‍♂️🦹🏼‍♂️🦹🏽‍♂️🦹🏾‍♂️🦹🏿‍♂️🦹🏻‍♀️🦹🏼‍♀️🦹🏽‍♀️🦹🏾‍♀️🦹🏿‍♀️🧙🏻‍♂️🧙🏼‍♂️🧙🏽‍♂️🧙🏾‍♂️🧙🏿‍♂️🧙🏻‍♀️🧙🏼‍♀️🧙🏽‍♀️🧙🏾‍♀️🧙🏿‍♀️🧚🏻‍♂️🧚🏼‍♂️🧚🏽‍♂️🧚🏾‍♂️🧚🏿‍♂️🧚🏻‍♀️🧚🏼‍♀️🧚🏽‍♀️🧚🏾‍♀️🧚🏿‍♀️🧛🏻‍♂️🧛🏼‍♂️🧛🏽‍♂️🧛🏾‍♂️🧛🏿‍♂️🧛🏻‍♀️🧛🏼‍♀️🧛🏽‍♀️🧛🏾‍♀️🧛🏿‍♀️🧜🏻‍♂️🧜🏼‍♂️🧜🏽‍♂️🧜🏾‍♂️🧜🏿‍♂️🧜🏻‍♀️🧜🏼‍♀️🧜🏽‍♀️🧜🏾‍♀️🧜🏿‍♀️🧝🏻‍♂️🧝🏼‍♂️🧝🏽‍♂️🧝🏾‍♂️🧝🏿‍♂️🧝🏻‍♀️🧝🏼‍♀️🧝🏽‍♀️🧝🏾‍♀️🧝🏿‍♀️💆🏻‍♂️💆🏼‍♂️💆🏽‍♂️💆🏾‍♂️💆🏿‍♂️💆🏻‍♀️💆🏼‍♀️💆🏽‍♀️💆🏾‍♀️💆🏿‍♀️💇🏻‍♂️💇🏼‍♂️💇🏽‍♂️💇🏾‍♂️💇🏿‍♂️💇🏻‍♀️💇🏼‍♀️💇🏽‍♀️💇🏾‍♀️💇🏿‍♀️🚶🏻‍♂️🚶🏼‍♂️🚶🏽‍♂️🚶🏾‍♂️🚶🏿‍♂️🚶🏻‍♀️🚶🏼‍♀️🚶🏽‍♀️🚶🏾‍♀️🚶🏿‍♀️🧍🏻‍♂️🧍🏼‍♂️🧍🏽‍♂️🧍🏾‍♂️🧍🏿‍♂️🧍🏻‍♀️🧍🏼‍♀️🧍🏽‍♀️🧍🏾‍♀️🧍🏿‍♀️🧎🏻‍♂️🧎🏼‍♂️🧎🏽‍♂️🧎🏾‍♂️🧎🏿‍♂️🧎🏻‍♀️🧎🏼‍♀️🧎🏽‍♀️🧎🏾‍♀️🧎🏿‍♀️🧑🏻‍🦯🧑🏼‍🦯🧑🏽‍🦯🧑🏾‍🦯🧑🏿‍🦯👨🏻‍🦯👨🏼‍🦯👨🏽‍🦯👨🏾‍🦯👨🏿‍🦯👩🏻‍🦯👩🏼‍🦯👩🏽‍🦯👩🏾‍🦯👩🏿‍🦯🧑🏻‍🦼🧑🏼‍🦼🧑🏽‍🦼🧑🏾‍🦼🧑🏿‍🦼👨🏻‍🦼👨🏼‍🦼👨🏽‍🦼👨🏾‍🦼👨🏿‍🦼👩🏻‍🦼👩🏼‍🦼👩🏽‍🦼👩🏾‍🦼👩🏿‍🦼🧑🏻‍🦽🧑🏼‍🦽🧑🏽‍🦽🧑🏾‍🦽🧑🏿‍🦽👨🏻‍🦽👨🏼‍🦽👨🏽‍🦽👨🏾‍🦽👨🏿‍🦽👩🏻‍🦽👩🏼‍🦽👩🏽‍🦽👩🏾‍🦽👩🏿‍🦽🏃🏻‍♂️🏃🏼‍♂️🏃🏽‍♂️🏃🏾‍♂️🏃🏿‍♂️🏃🏻‍♀️🏃🏼‍♀️🏃🏽‍♀️🏃🏾‍♀️🏃🏿‍♀️🧖🏻‍♂️🧖🏼‍♂️🧖🏽‍♂️🧖🏾‍♂️🧖🏿‍♂️🧖🏻‍♀️🧖🏼‍♀️🧖🏽‍♀️🧖🏾‍♀️🧖🏿‍♀️🧗🏻‍♂️🧗🏼‍♂️🧗🏽‍♂️🧗🏾‍♂️🧗🏿‍♂️🧗🏻‍♀️🧗🏼‍♀️🧗🏽‍♀️🧗🏾‍♀️🧗🏿‍♀️🏌🏻‍♂️🏌🏼‍♂️🏌🏽‍♂️🏌🏾‍♂️🏌🏿‍♂️🏌🏻‍♀️🏌🏼‍♀️🏌🏽‍♀️🏌🏾‍♀️🏌🏿‍♀️🏄🏻‍♂️🏄🏼‍♂️🏄🏽‍♂️🏄🏾‍♂️🏄🏿‍♂️🏄🏻‍♀️🏄🏼‍♀️🏄🏽‍♀️🏄🏾‍♀️🏄🏿‍♀️🚣🏻‍♂️🚣🏼‍♂️🚣🏽‍♂️🚣🏾‍♂️🚣🏿‍♂️🚣🏻‍♀️🚣🏼‍♀️🚣🏽‍♀️🚣🏾‍♀️🚣🏿‍♀️🏊🏻‍♂️🏊🏼‍♂️🏊🏽‍♂️🏊🏾‍♂️🏊🏿‍♂️🏊🏻‍♀️🏊🏼‍♀️🏊🏽‍♀️🏊🏾‍♀️🏊🏿‍♀️🏋🏻‍♂️🏋🏼‍♂️🏋🏽‍♂️🏋🏾‍♂️🏋🏿‍♂️🏋🏻‍♀️🏋🏼‍♀️🏋🏽‍♀️🏋🏾‍♀️🏋🏿‍♀️🚴🏻‍♂️🚴🏼‍♂️🚴🏽‍♂️🚴🏾‍♂️🚴🏿‍♂️🚴🏻‍♀️🚴🏼‍♀️🚴🏽‍♀️🚴🏾‍♀️🚴🏿‍♀️🚵🏻‍♂️🚵🏼‍♂️🚵🏽‍♂️🚵🏾‍♂️🚵🏿‍♂️🚵🏻‍♀️🚵🏼‍♀️🚵🏽‍♀️🚵🏾‍♀️🚵🏿‍♀️🤸🏻‍♂️🤸🏼‍♂️🤸🏽‍♂️🤸🏾‍♂️🤸🏿‍♂️🤸🏻‍♀️🤸🏼‍♀️🤸🏽‍♀️🤸🏾‍♀️🤸🏿‍♀️🤽🏻‍♂️🤽🏼‍♂️🤽🏽‍♂️🤽🏾‍♂️🤽🏿‍♂️🤽🏻‍♀️🤽🏼‍♀️🤽🏽‍♀️🤽🏾‍♀️🤽🏿‍♀️🤾🏻‍♂️🤾🏼‍♂️🤾🏽‍♂️🤾🏾‍♂️🤾🏿‍♂️🤾🏻‍♀️🤾🏼‍♀️🤾🏽‍♀️🤾🏾‍♀️🤾🏿‍♀️🤹🏻‍♂️🤹🏼‍♂️🤹🏽‍♂️🤹🏾‍♂️🤹🏿‍♂️🤹🏻‍♀️🤹🏼‍♀️🤹🏽‍♀️🤹🏾‍♀️🤹🏿‍♀️🧘🏻‍♂️🧘🏼‍♂️🧘🏽‍♂️🧘🏾‍♂️🧘🏿‍♂️🧘🏻‍♀️🧘🏼‍♀️🧘🏽‍♀️🧘🏾‍♀️🧘🏿‍♀️😶‍🌫️🕵️‍♂️🕵️‍♀️🏌️‍♂️🏌️‍♀️🏋️‍♂️🏋️‍♀️🏳️‍🌈🏳️‍⚧️⛹🏻‍♂️⛹🏼‍♂️⛹🏽‍♂️⛹🏾‍♂️⛹🏿‍♂️⛹🏻‍♀️⛹🏼‍♀️⛹🏽‍♀️⛹🏾‍♀️⛹🏿‍♀️😮‍💨😵‍💫❤️‍🔥❤️‍🩹🧔‍♂️🧔‍♀️👨‍🦰👨‍🦱👨‍🦳👨‍🦲👩‍🦰🧑‍🦰👩‍🦱🧑‍🦱👩‍🦳🧑‍🦳👩‍🦲🧑‍🦲👱‍♀️👱‍♂️🙍‍♂️🙍‍♀️🙎‍♂️🙎‍♀️🙅‍♂️🙅‍♀️🙆‍♂️🙆‍♀️💁‍♂️💁‍♀️🙋‍♂️🙋‍♀️🧏‍♂️🧏‍♀️🙇‍♂️🙇‍♀️🤦‍♂️🤦‍♀️🤷‍♂️🤷‍♀️🧑‍⚕️👨‍⚕️👩‍⚕️🧑‍🎓👨‍🎓👩‍🎓🧑‍🏫👨‍🏫👩‍🏫🧑‍⚖️👨‍⚖️👩‍⚖️🧑‍🌾👨‍🌾👩‍🌾🧑‍🍳👨‍🍳👩‍🍳🧑‍🔧👨‍🔧👩‍🔧🧑‍🏭👨‍🏭👩‍🏭🧑‍💼👨‍💼👩‍💼🧑‍🔬👨‍🔬👩‍🔬🧑‍💻👨‍💻👩‍💻🧑‍🎤👨‍🎤👩‍🎤🧑‍🎨👨‍🎨👩‍🎨🧑‍✈️👨‍✈️👩‍✈️🧑‍🚀👨‍🚀👩‍🚀🧑‍🚒👨‍🚒👩‍🚒👮‍♂️👮‍♀️💂‍♂️💂‍♀️👷‍♂️👷‍♀️👳‍♂️👳‍♀️🤵‍♂️🤵‍♀️👰‍♂️👰‍♀️👩‍🍼👨‍🍼🧑‍🍼🧑‍🎄🦸‍♂️🦸‍♀️🦹‍♂️🦹‍♀️🧙‍♂️🧙‍♀️🧚‍♂️🧚‍♀️🧛‍♂️🧛‍♀️🧜‍♂️🧜‍♀️🧝‍♂️🧝‍♀️🧞‍♂️🧞‍♀️🧟‍♂️🧟‍♀️💆‍♂️💆‍♀️💇‍♂️💇‍♀️🚶‍♂️🚶‍♀️🧍‍♂️🧍‍♀️🧎‍♂️🧎‍♀️🧑‍🦯👨‍🦯👩‍🦯🧑‍🦼👨‍🦼👩‍🦼🧑‍🦽👨‍🦽👩‍🦽🏃‍♂️🏃‍♀️👯‍♂️👯‍♀️🧖‍♂️🧖‍♀️🧗‍♂️🧗‍♀️🏄‍♂️🏄‍♀️🚣‍♂️🚣‍♀️🏊‍♂️🏊‍♀️⛹️‍♂️⛹️‍♀️🚴‍♂️🚴‍♀️🚵‍♂️🚵‍♀️🤸‍♂️🤸‍♀️🤼‍♂️🤼‍♀️🤽‍♂️🤽‍♀️🤾‍♂️🤾‍♀️🤹‍♂️🤹‍♀️🧘‍♂️🧘‍♀️👨‍👦👨‍👧👩‍👦👩‍👧🐕‍🦺🐻‍❄️🏴‍☠️🐈‍⬛🇦🇨🇦🇩🇦🇪🇦🇫🇦🇬🇦🇮🇦🇱🇦🇲🇦🇴🇦🇶🇦🇷🇦🇸🇦🇹🇦🇺🇦🇼🇦🇽🇦🇿🇧🇦🇧🇧🇧🇩🇧🇪🇧🇫🇧🇬🇧🇭🇧🇮🇧🇯🇧🇱🇧🇲🇧🇳🇧🇴🇧🇶🇧🇷🇧🇸🇧🇹🇧🇻🇧🇼🇧🇾🇧🇿🇨🇦🇨🇨🇨🇩🇨🇫🇨🇬🇨🇭🇨🇮🇨🇰🇨🇱🇨🇲🇨🇳🇨🇴🇨🇵🇨🇷🇨🇺🇨🇻🇨🇼🇨🇽🇨🇾🇨🇿🇩🇪🇩🇬🇩🇯🇩🇰🇩🇲🇩🇴🇩🇿🇪🇦🇪🇨🇪🇪🇪🇬🇪🇭🇪🇷🇪🇸🇪🇹🇪🇺🇫🇮🇫🇯🇫🇰🇫🇲🇫🇴🇫🇷🇬🇦🇬🇧🇬🇩🇬🇪🇬🇫🇬🇬🇬🇭🇬🇮🇬🇱🇬🇲🇬🇳🇬🇵🇬🇶🇬🇷🇬🇸🇬🇹🇬🇺🇬🇼🇬🇾🇭🇰🇭🇲🇭🇳🇭🇷🇭🇹🇭🇺🇮🇨🇮🇩🇮🇪🇮🇱🇮🇲🇮🇳🇮🇴🇮🇶🇮🇷🇮🇸🇮🇹🇯🇪🇯🇲🇯🇴🇯🇵🇰🇪🇰🇬🇰🇭🇰🇮🇰🇲🇰🇳🇰🇵🇰🇷🇰🇼🇰🇾🇰🇿🇱🇦🇱🇧🇱🇨🇱🇮🇱🇰🇱🇷🇱🇸🇱🇹🇱🇺🇱🇻🇱🇾🇲🇦🇲🇨🇲🇩🇲🇪🇲🇫🇲🇬🇲🇭🇲🇰🇲🇱🇲🇲🇲🇳🇲🇴🇲🇵🇲🇶🇲🇷🇲🇸🇲🇹🇲🇺🇲🇻🇲🇼🇲🇽🇲🇾🇲🇿🇳🇦🇳🇨🇳🇪🇳🇫🇳🇬🇳🇮🇳🇱🇳🇴🇳🇵🇳🇷🇳🇺🇳🇿🇴🇲🇵🇦🇵🇪🇵🇫🇵🇬🇵🇭🇵🇰🇵🇱🇵🇲🇵🇳🇵🇷🇵🇸🇵🇹🇵🇼🇵🇾🇶🇦🇷🇪🇷🇴🇷🇸🇷🇺🇷🇼🇸🇦🇸🇧🇸🇨🇸🇩🇸🇪🇸🇬🇸🇭🇸🇮🇸🇯🇸🇰🇸🇱🇸🇲🇸🇳🇸🇴🇸🇷🇸🇸🇸🇹🇸🇻🇸🇽🇸🇾🇸🇿🇹🇦🇹🇨🇹🇩🇹🇫🇹🇬🇹🇭🇹🇯🇹🇰🇹🇱🇹🇲🇹🇳🇹🇴🇹🇷🇹🇹🇹🇻🇹🇼🇹🇿🇺🇦🇺🇬🇺🇲🇺🇳🇺🇸🇺🇾🇺🇿🇻🇦🇻🇨🇻🇪🇻🇬🇻🇮🇻🇳🇻🇺🇼🇫🇼🇸🇽🇰🇾🇪🇾🇹🇿🇦🇿🇲🇿🇼👋🏻👋🏼👋🏽👋🏾👋🏿🤚🏻🤚🏼🤚🏽🤚🏾🤚🏿🖐🏻🖐🏼🖐🏽🖐🏾🖐🏿🖖🏻🖖🏼🖖🏽🖖🏾🖖🏿👌🏻👌🏼👌🏽👌🏾👌🏿🤌🏻🤌🏼🤌🏽🤌🏾🤌🏿🤏🏻🤏🏼🤏🏽🤏🏾🤏🏿🤞🏻🤞🏼🤞🏽🤞🏾🤞🏿🤟🏻🤟🏼🤟🏽🤟🏾🤟🏿🤘🏻🤘🏼🤘🏽🤘🏾🤘🏿🤙🏻🤙🏼🤙🏽🤙🏾🤙🏿👈🏻👈🏼👈🏽👈🏾👈🏿👉🏻👉🏼👉🏽👉🏾👉🏿👆🏻👆🏼👆🏽👆🏾👆🏿🖕🏻🖕🏼🖕🏽🖕🏾🖕🏿👇🏻👇🏼👇🏽👇🏾👇🏿👍🏻👍🏼👍🏽👍🏾👍🏿👎🏻👎🏼👎🏽👎🏾👎🏿👊🏻👊🏼👊🏽👊🏾👊🏿🤛🏻🤛🏼🤛🏽🤛🏾🤛🏿🤜🏻🤜🏼🤜🏽🤜🏾🤜🏿👏🏻👏🏼👏🏽👏🏾👏🏿🙌🏻🙌🏼🙌🏽🙌🏾🙌🏿👐🏻👐🏼👐🏽👐🏾👐🏿🤲🏻🤲🏼🤲🏽🤲🏾🤲🏿🙏🏻🙏🏼🙏🏽🙏🏾🙏🏿💅🏻💅🏼💅🏽💅🏾💅🏿🤳🏻🤳🏼🤳🏽🤳🏾🤳🏿💪🏻💪🏼💪🏽💪🏾💪🏿🦵🏻🦵🏼🦵🏽🦵🏾🦵🏿🦶🏻🦶🏼🦶🏽🦶🏾🦶🏿👂🏻👂🏼👂🏽👂🏾👂🏿🦻🏻🦻🏼🦻🏽🦻🏾🦻🏿👃🏻👃🏼👃🏽👃🏾👃🏿👶🏻👶🏼👶🏽👶🏾👶🏿🧒🏻🧒🏼🧒🏽🧒🏾🧒🏿👦🏻👦🏼👦🏽👦🏾👦🏿👧🏻👧🏼👧🏽👧🏾👧🏿🧑🏻🧑🏼🧑🏽🧑🏾🧑🏿👱🏻👱🏼👱🏽👱🏾👱🏿👨🏻👨🏼👨🏽👨🏾👨🏿🧔🏻🧔🏼🧔🏽🧔🏾🧔🏿👩🏻👩🏼👩🏽👩🏾👩🏿🧓🏻🧓🏼🧓🏽🧓🏾🧓🏿👴🏻👴🏼👴🏽👴🏾👴🏿👵🏻👵🏼👵🏽👵🏾👵🏿🙍🏻🙍🏼🙍🏽🙍🏾🙍🏿🙎🏻🙎🏼🙎🏽🙎🏾🙎🏿🙅🏻🙅🏼🙅🏽🙅🏾🙅🏿🙆🏻🙆🏼🙆🏽🙆🏾🙆🏿💁🏻💁🏼💁🏽💁🏾💁🏿🙋🏻🙋🏼🙋🏽🙋🏾🙋🏿🧏🏻🧏🏼🧏🏽🧏🏾🧏🏿🙇🏻🙇🏼🙇🏽🙇🏾🙇🏿🤦🏻🤦🏼🤦🏽🤦🏾🤦🏿🤷🏻🤷🏼🤷🏽🤷🏾🤷🏿👮🏻👮🏼👮🏽👮🏾👮🏿🕵🏻🕵🏼🕵🏽🕵🏾🕵🏿💂🏻💂🏼💂🏽💂🏾💂🏿🥷🏻🥷🏼🥷🏽🥷🏾🥷🏿👷🏻👷🏼👷🏽👷🏾👷🏿🤴🏻🤴🏼🤴🏽🤴🏾🤴🏿👸🏻👸🏼👸🏽👸🏾👸🏿👳🏻👳🏼👳🏽👳🏾👳🏿👲🏻👲🏼👲🏽👲🏾👲🏿🧕🏻🧕🏼🧕🏽🧕🏾🧕🏿🤵🏻🤵🏼🤵🏽🤵🏾🤵🏿👰🏻👰🏼👰🏽👰🏾👰🏿🤰🏻🤰🏼🤰🏽🤰🏾🤰🏿🤱🏻🤱🏼🤱🏽🤱🏾🤱🏿👼🏻👼🏼👼🏽👼🏾👼🏿🎅🏻🎅🏼🎅🏽🎅🏾🎅🏿🤶🏻🤶🏼🤶🏽🤶🏾🤶🏿🦸🏻🦸🏼🦸🏽🦸🏾🦸🏿🦹🏻🦹🏼🦹🏽🦹🏾🦹🏿🧙🏻🧙🏼🧙🏽🧙🏾🧙🏿🧚🏻🧚🏼🧚🏽🧚🏾🧚🏿🧛🏻🧛🏼🧛🏽🧛🏾🧛🏿🧜🏻🧜🏼🧜🏽🧜🏾🧜🏿🧝🏻🧝🏼🧝🏽🧝🏾🧝🏿💆🏻💆🏼💆🏽💆🏾💆🏿💇🏻💇🏼💇🏽💇🏾💇🏿🚶🏻🚶🏼🚶🏽🚶🏾🚶🏿🧍🏻🧍🏼🧍🏽🧍🏾🧍🏿🧎🏻🧎🏼🧎🏽🧎🏾🧎🏿🏃🏻🏃🏼🏃🏽🏃🏾🏃🏿💃🏻💃🏼💃🏽💃🏾💃🏿🕺🏻🕺🏼🕺🏽🕺🏾🕺🏿🕴🏻🕴🏼🕴🏽🕴🏾🕴🏿🧖🏻🧖🏼🧖🏽🧖🏾🧖🏿🧗🏻🧗🏼🧗🏽🧗🏾🧗🏿🏇🏻🏇🏼🏇🏽🏇🏾🏇🏿🏂🏻🏂🏼🏂🏽🏂🏾🏂🏿🏌🏻🏌🏼🏌🏽🏌🏾🏌🏿🏄🏻🏄🏼🏄🏽🏄🏾🏄🏿🚣🏻🚣🏼🚣🏽🚣🏾🚣🏿🏊🏻🏊🏼🏊🏽🏊🏾🏊🏿🏋🏻🏋🏼🏋🏽🏋🏾🏋🏿🚴🏻🚴🏼🚴🏽🚴🏾🚴🏿🚵🏻🚵🏼🚵🏽🚵🏾🚵🏿🤸🏻🤸🏼🤸🏽🤸🏾🤸🏿🤽🏻🤽🏼🤽🏽🤽🏾🤽🏿🤾🏻🤾🏼🤾🏽🤾🏾🤾🏿🤹🏻🤹🏼🤹🏽🤹🏾🤹🏿🧘🏻🧘🏼🧘🏽🧘🏾🧘🏿🛀🏻🛀🏼🛀🏽🛀🏾🛀🏿🛌🏻🛌🏼🛌🏽🛌🏾🛌🏿👭🏻👭🏼👭🏽👭🏾👭🏿👫🏻👫🏼👫🏽👫🏾👫🏿👬🏻👬🏼👬🏽👬🏾👬🏿💏🏻💏🏼💏🏽💏🏾💏🏿💑🏻💑🏼💑🏽💑🏾💑🏿#️⃣0️⃣1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣8️⃣9️⃣✋🏻✋🏼✋🏽✋🏾✋🏿✌🏻✌🏼✌🏽✌🏾✌🏿☝🏻☝🏼☝🏽☝🏾☝🏿✊🏻✊🏼✊🏽✊🏾✊🏿✍🏻✍🏼✍🏽✍🏾✍🏿⛹🏻⛹🏼⛹🏽⛹🏾⛹🏿😀😃😄😁😆😅🤣😂🙂🙃😉😊😇🥰😍🤩😘😗😚😙🥲😋😛😜🤪😝🤑🤗🤭🤫🤔🤐🤨😐😑😶😏😒🙄😬🤥😌😔😪🤤😴😷🤒🤕🤢🤮🤧🥵🥶🥴😵🤯🤠🥳🥸😎🤓🧐😕😟🙁😮😯😲😳🥺😦😧😨😰😥😢😭😱😖😣😞😓😩😫🥱😤😡😠🤬😈👿💀💩🤡👹👺👻👽👾🤖😺😸😹😻😼😽🙀😿😾🙈🙉🙊💋💌💘💝💖💗💓💞💕💟💔🧡💛💚💙💜🤎🖤🤍💯💢💥💫💦💨🕳💣💬🗨🗯💭💤👋🤚🖐🖖👌🤌🤏🤞🤟🤘🤙👈👉👆🖕👇👍👎👊🤛🤜👏🙌👐🤲🤝🙏💅🤳💪🦾🦿🦵🦶👂🦻👃🧠🫀🫁🦷🦴👀👁👅👄👶🧒👦👧🧑👱👨🧔👩🧓👴👵🙍🙎🙅🙆💁🙋🧏🙇🤦🤷👮🕵💂🥷👷🤴👸👳👲🧕🤵👰🤰🤱👼🎅🤶🦸🦹🧙🧚🧛🧜🧝🧞🧟💆💇🚶🧍🧎🏃💃🕺🕴👯🧖🧗🤺🏇🏂🏌🏄🚣🏊🏋🚴🚵🤸🤼🤽🤾🤹🧘🛀🛌👭👫👬💏💑👪🗣👤👥🫂👣🦰🦱🦳🦲🐵🐒🦍🦧🐶🐕🦮🐩🐺🦊🦝🐱🐈🦁🐯🐅🐆🐴🐎🦄🦓🦌🦬🐮🐂🐃🐄🐷🐖🐗🐽🐏🐑🐐🐪🐫🦙🦒🐘🦣🦏🦛🐭🐁🐀🐹🐰🐇🐿🦫🦔🦇🐻🐨🐼🦥🦦🦨🦘🦡🐾🦃🐔🐓🐣🐤🐥🐦🐧🕊🦅🦆🦢🦉🦤🪶🦩🦚🦜🐸🐊🐢🦎🐍🐲🐉🦕🦖🐳🐋🐬🦭🐟🐠🐡🦈🐙🐚🐌🦋🐛🐜🐝🪲🐞🦗🪳🕷🕸🦂🦟🪰🪱🦠💐🌸💮🏵🌹🥀🌺🌻🌼🌷🌱🪴🌲🌳🌴🌵🌾🌿🍀🍁🍂🍃🍇🍈🍉🍊🍋🍌🍍🥭🍎🍏🍐🍑🍒🍓🫐🥝🍅🫒🥥🥑🍆🥔🥕🌽🌶🫑🥒🥬🥦🧄🧅🍄🥜🌰🍞🥐🥖🫓🥨🥯🥞🧇🧀🍖🍗🥩🥓🍔🍟🍕🌭🥪🌮🌯🫔🥙🧆🥚🍳🥘🍲🫕🥣🥗🍿🧈🧂🥫🍱🍘🍙🍚🍛🍜🍝🍠🍢🍣🍤🍥🥮🍡🥟🥠🥡🦀🦞🦐🦑🦪🍦🍧🍨🍩🍪🎂🍰🧁🥧🍫🍬🍭🍮🍯🍼🥛🫖🍵🍶🍾🍷🍸🍹🍺🍻🥂🥃🥤🧋🧃🧉🧊🥢🍽🍴🥄🔪🏺🌍🌎🌏🌐🗺🗾🧭🏔🌋🗻🏕🏖🏜🏝🏞🏟🏛🏗🧱🪨🪵🛖🏘🏚🏠🏡🏢🏣🏤🏥🏦🏨🏩🏪🏫🏬🏭🏯🏰💒🗼🗽🕌🛕🕍🕋🌁🌃🏙🌄🌅🌆🌇🌉🎠🎡🎢💈🎪🚂🚃🚄🚅🚆🚇🚈🚉🚊🚝🚞🚋🚌🚍🚎🚐🚑🚒🚓🚔🚕🚖🚗🚘🚙🛻🚚🚛🚜🏎🏍🛵🦽🦼🛺🚲🛴🛹🛼🚏🛣🛤🛢🚨🚥🚦🛑🚧🛶🚤🛳🛥🚢🛩🛫🛬🪂💺🚁🚟🚠🚡🛰🚀🛸🛎🧳🕰🕛🕧🕐🕜🕑🕝🕒🕞🕓🕟🕔🕠🕕🕡🕖🕢🕗🕣🕘🕤🕙🕥🕚🕦🌑🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌡🌝🌞🪐🌟🌠🌌🌤🌥🌦🌧🌨🌩🌪🌫🌬🌀🌈🌂🔥💧🌊🎃🎄🎆🎇🧨🎈🎉🎊🎋🎍🎎🎏🎐🎑🧧🎀🎁🎗🎟🎫🎖🏆🏅🥇🥈🥉🥎🏀🏐🏈🏉🎾🥏🎳🏏🏑🏒🥍🏓🏸🥊🥋🥅🎣🤿🎽🎿🛷🥌🎯🪀🪁🎱🔮🪄🧿🎮🕹🎰🎲🧩🧸🪅🪆🃏🀄🎴🎭🖼🎨🧵🪡🧶🪢👓🕶🥽🥼🦺👔👕👖🧣🧤🧥🧦👗👘🥻🩱🩲🩳👙👚👛👜👝🛍🎒🩴👞👟🥾🥿👠👡🩰👢👑👒🎩🎓🧢🪖📿💄💍💎🔇🔈🔉🔊📢📣📯🔔🔕🎼🎵🎶🎙🎚🎛🎤🎧📻🎷🪗🎸🎹🎺🎻🪕🥁🪘📱📲📞📟📠🔋🔌💻🖥🖨🖱🖲💽💾💿📀🧮🎥🎞📽🎬📺📷📸📹📼🔍🔎🕯💡🔦🏮🪔📔📕📖📗📘📙📚📓📒📃📜📄📰🗞📑🔖🏷💰🪙💴💵💶💷💸💳🧾💹📧📨📩📤📥📦📫📪📬📭📮🗳🖋🖊🖌🖍📝💼📁📂🗂📅📆🗒🗓📇📈📉📊📋📌📍📎🖇📏📐🗃🗄🗑🔒🔓🔏🔐🔑🗝🔨🪓🛠🗡🔫🪃🏹🛡🪚🔧🪛🔩🗜🦯🔗🪝🧰🧲🪜🧪🧫🧬🔬🔭📡💉🩸💊🩹🩺🚪🛗🪞🪟🛏🛋🪑🚽🪠🚿🛁🪤🪒🧴🧷🧹🧺🧻🪣🧼🪥🧽🧯🛒🚬🪦🗿🪧🏧🚮🚰🚹🚺🚻🚼🚾🛂🛃🛄🛅🚸🚫🚳🚭🚯🚱🚷📵🔞🔃🔄🔙🔚🔛🔜🔝🛐🕉🕎🔯🔀🔁🔂🔼🔽🎦🔅🔆📶📳📴💱💲🔱📛🔰🔟🔠🔡🔢🔣🔤🅰🆎🅱🆑🆒🆓🆔🆕🆖🅾🆗🅿🆘🆙🆚🈁🈂🈷🈶🈯🉐🈹🈚🈲🉑🈸🈴🈳🈺🈵🔴🟠🟡🟢🔵🟣🟤🟥🟧🟨🟩🟦🟪🟫🔶🔷🔸🔹🔺🔻💠🔘🔳🔲🏁🚩🎌🏴🏳🏻🏼🏽🏾🏿☺☹☠❣❤✋✌☝✊✍⛷⛹☘☕⛰⛪⛩⛲⛺♨⛽⚓⛵⛴✈⌛⏳⌚⏰⏱⏲☀⭐☁⛅⛈☂☔⛱⚡❄☃⛄☄✨⚽⚾⛳⛸♠♥♦♣♟⛑☎⌨✉✏✒✂⛏⚒⚔⚙⚖⛓⚗⚰⚱♿⚠⛔☢☣⬆↗➡↘⬇↙⬅↖↕↔↩↪⤴⤵⚛✡☸☯✝☦☪☮♈♉♊♋♌♍♎♏♐♑♒♓⛎▶⏩⏭⏯◀⏪⏮⏫⏬⏸⏹⏺⏏♀♂⚧✖➕➖➗♾‼⁉❓❔❕❗〰⚕♻⚜⭕✅☑✔❌❎➰➿〽✳✴❇©®™ℹⓂ㊗㊙⚫⚪⬛⬜◼◻◾◽▪▫.mon";
  const result = findCharacterSet(getLabel(emojis));
  t.is(result, characterSet.EMOJI);
})

test('should not hang getting character set of long compound emoji mixed name', (t: ExecutionContext<TestContext>) => {
  const MNS = `👇🏿👇🏿👇🏿👇🏿👇🏿👇🏿👇🏿👇🏿👇🏿👇🏿👇🏿👇🏿👇🏿👇🏿👉🏿👇🏾👇🏾👇🏾👇🏾👇🏾👇🏾👇🏾👇🏾👇🏾👇🏾👇🏾👇🏾👈🏿👉🏿👉🏾👇🏽👇🏽👇🏽👇🏽👇🏽👇🏽👇🏽👇🏽👇🏽👇🏽👈🏾👈🏿👉🏿👉🏾👉🏽👇🏼👇🏼👇🏼👇🏼👇🏼👇🏼👇🏼👇🏼👈🏽👈🏾👈🏿👉🏿👉🏾👉🏽👉🏼👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👈🏼👈🏽👈🏾👈🏿👉🏿👉🏾👉🏽👉🏼👉🏻👉🏻ens👈🏻👈🏻👈🏼👈🏽👈🏾👈🏿👉🏿👉🏾👉🏽👉🏼👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👈🏼👈🏽👈🏾👈🏿👉🏿👉🏾👉🏽👆🏼👆🏼👆🏼👆🏼👆🏼👆🏼👆🏼👆🏼👈🏽👈🏾👈🏿👉🏿👉🏾👆🏽👆🏽👆🏽👆🏽👆🏽👆🏽👆🏽👆🏽👆🏽👆🏽👈🏾👈🏿👉🏿👆🏾👆🏾👆🏾👆🏾👆🏾👆🏾👆🏾👆🏾👆🏾👆🏾👆🏾👆🏾👈🏿👉🏿👆🏿👆🏿👆🏿👆🏿👆🏿👆🏿👆🏿👆🏿👆🏿👆🏿👆🏿👆🏿👈🏿👉🏿👆🏿👆🏿👆🏿👆🏿👆🏿👆🏿👆🏿ensart.eth`;
  const result = findCharacterSet(getLabel(MNS));
  t.is(result, characterSet.MIXED);
})

test('should detect name with ascii chars', (t: ExecutionContext<TestContext>) => {
  const MNS = 'shake.mon';
  const result = isASCII(getLabel(MNS));
  t.is(result, true);
});

test('should detect name with non-ascii chars', (t: ExecutionContext<TestContext>) => {
  const MNS = 'ˢhake.mon';
  const result = isASCII(getLabel(MNS));
  t.is(result, false);
});

test('should detect name with ascii chars + emoji', (t: ExecutionContext<TestContext>) => {
  const MNS = '🥛shake.mon';
  const result = isASCII(getLabel(MNS));
  t.is(result, true);
});

test('should detect name with non-ascii chars + emoji', (t: ExecutionContext<TestContext>) => {
  const MNS = '🥛ˢhake.mon';
  const result = isASCII(getLabel(MNS));
  t.is(result, false);
});

test('should detect name with ascii chars + compound emoji', (t: ExecutionContext<TestContext>) => {
  const MNS = `👇🏿👇🏿👇🏿👇🏿👇🏿👇🏿👇🏿👇🏿👇🏿👇🏿👇🏿👇🏿👇🏿👇🏿👉🏿👇🏾👇🏾👇🏾👇🏾👇🏾👇🏾👇🏾👇🏾👇🏾👇🏾👇🏾👇🏾👈🏿👉🏿👉🏾👇🏽👇🏽👇🏽👇🏽👇🏽👇🏽👇🏽👇🏽👇🏽👇🏽👈🏾👈🏿👉🏿👉🏾👉🏽👇🏼👇🏼👇🏼👇🏼👇🏼👇🏼👇🏼👇🏼👈🏽👈🏾👈🏿👉🏿👉🏾👉🏽👉🏼👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👈🏼👈🏽👈🏾👈🏿👉🏿👉🏾👉🏽👉🏼👉🏻👉🏻ens👈🏻👈🏻👈🏼👈🏽👈🏾👈🏿👉🏿👉🏾👉🏽👉🏼👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👈🏼👈🏽👈🏾👈🏿👉🏿👉🏾👉🏽👆🏼👆🏼👆🏼👆🏼👆🏼👆🏼👆🏼👆🏼👈🏽👈🏾👈🏿👉🏿👉🏾👆🏽👆🏽👆🏽👆🏽👆🏽👆🏽👆🏽👆🏽👆🏽👆🏽👈🏾👈🏿👉🏿👆🏾👆🏾👆🏾👆🏾👆🏾👆🏾👆🏾👆🏾👆🏾👆🏾👆🏾👆🏾👈🏿👉🏿👆🏿👆🏿👆🏿👆🏿👆🏿👆🏿👆🏿👆🏿👆🏿👆🏿👆🏿👆🏿👈🏿👉🏿👆🏿👆🏿👆🏿👆🏿👆🏿👆🏿👆🏿ensart.eth`;
  const result = isASCII(getLabel(MNS));
  t.is(result, true);
})
