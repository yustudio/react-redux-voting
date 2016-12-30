import {List} from 'immutable';

export function setEntries(state, entries) {
	// pass the given entries into the List constructor 
	// so that input entries to be a regular JavaScript 
	// array (or actually anything iterable)
  return state.set('entries', List(entries));
}