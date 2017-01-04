import {List, Map} from 'immutable';

export const INITIAL_STATE = Map();

export function setEntries(state, entries) {
	// pass the given entries into the List constructor 
	// so that input entries to be a regular JavaScript 
	// array (or actually anything iterable)
  return state.set('entries', List(entries));
}

function getWinners(vote) {
  if (!vote) return [];
  const [a, b] = vote.get('pair');
  const aVotes = vote.getIn(['tally', a], 0);
  const bVotes = vote.getIn(['tally', b], 0);
  if      (aVotes > bVotes)  return [a];
  else if (aVotes < bVotes)  return [b];
  else                       return [a, b];
}

export function next(state) {
  const entries = state.get('entries')
                       .concat(getWinners(state.get('vote')));

  if (entries.size === 1)                        {
  	return state.remove('vote')
  				.remove('entries')
  				.set('winner', entries.first());
  } else {
	  return state.merge({
	    vote: Map({pair: entries.take(2)}),
	    entries: entries.skip(2)
	  });
  }
}

//reach into the nested data structure path 
//['vote', 'tally', 'Trainspotting'], and apply 
//this function there. If there are keys missing 
//along the path, create new Maps in their place. 
//If the value at the end is missing, initialize it with 0
export function vote(state, entry) {
	return state.updateIn(
			['tally',entry],
			0,
			tally => tally + 1
		);
}

