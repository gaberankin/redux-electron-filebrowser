import * as types from '../constants/ActionTypes';

const initialState = {
	items: (() => {
		let names = ['Necole Neumann', 'Ngoc Newton', 'Jerry Jeske', 'Jayna Janz', 'Elvera Ewan', 'Zoraida Zoll', 'Meridith Marciano', 'Tammie Thorington', 'Brett Boedeker', 'Dena Dahl', 'Antonetta Armer', 'Felisa Fletcher', 'Ruthie Rainer', 'Kimberlee Kreitzer', 'Sudie Scholl', 'Kayla Kaul', 'Mana Muncie', 'Lavon Loyola',
					'Marita Moody', 'Loriann Lomas', 'Leeann Laymon', 'Audie Almazan', 'Tracie Thorton', 'Hildegarde Heffernan', 'Tori Talty', 'Joie Jordison', 'Cheyenne Carithers', 'Verla Vasques', 'Gilberto Guenther', 'Staci Selph', 'Russ Ridgley', 'Kaitlin Kuntz', 'Angelo Albaugh', 'Terresa Triche', 'Inocencia Izzi',
					'Carlie Craghead', 'Chadwick Courtois', 'Lajuana Lacroix', 'Tereasa Tabb', 'Zonia Zehnder', 'Shirleen Selders', 'Malinda Mattinson', 'Chara Carreno', 'Chrystal Cumbee', 'Ahmad Audia', 'Luana Landi', 'Frankie Faulcon', 'Lee Luthy', 'Mariel Mcelravy', 'Refugio Rigney', 'Madelyn Militello', 'Edgar Ervin',
					'Katharina Kopecky', 'Williemae Waldrip', 'Tomiko Tunison', 'Winnie Wageman', 'Pearline Pokorny', 'Earleen Edenfield', 'Margy Mcdowell', 'Lawerence Lemke', 'Soraya Slade', 'Marisela Munz', 'Theda Takahashi', 'Dionna Didomenico', 'Lavonia Levario', 'Colton Cardoza', 'Lianne Llanas', 'Kerstin Krupp', 'Chan Cripps',
					'Leticia Larmon', 'Delcie Dugan', 'Belle Barlett', 'Otilia Okamura', 'Tabitha Tolleson', 'Marlo Mee', 'Floy Fleury', 'Dorcas Ding', 'Adriana Alleman', 'Eddie Evans', 'Shanika Schwebach', 'Berenice Basil', 'Dale Denardo', 'Robyn Randol', 'Luanne Loop', 'Brunilda Barra', 'Boyce Besse', 'Isidro Ingwersen',
					'Rosamaria Randell', 'Howard Hesser', 'Tawnya Trice', 'Burt Bichrest', 'Chaya Chandler', 'Renetta Rhine', 'Kristofer Kratzer', 'Karie Kamen', 'Genie Griffen', 'Ma Marcin', 'Genna Ganley', 'Guillermo Gonzalas', 'Bethany Brasfield'
				];


		let items = [];
		for(var i = 0, len = names.length; i < len; i++) {
			items.push({id: i + 1, name: names[i]});
		}
		return items;
	})(),
	filter: '',
	lastFilter: '',
	matches: 0
};
initialState.matches = initialState.items.length;

function runFilter(state) {
	let timerVal = state.filter;
	console.time(timerVal);
	let matches = 0,
		theFilter = state.filter,
		runFilterClosure = null;
	if(theFilter.indexOf('*') !== -1 || theFilter.indexOf('?') !== -1) {	//set up a regex?
		//first, escape periods so they don't become wildcards
		theFilter = theFilter.replace(/\./g, '\\.');
		//next, clean the filter of double **
		theFilter = theFilter.replace(/\*\*/g, '');
		theFilter = theFilter.replace(/\*/g, '.+');
		//finally, we want to support the single-character find, so convert '?' to '.'
		theFilter = theFilter.replace(/\?/g, '.');

		theFilter = new RegExp(theFilter, 'i');

		runFilterClosure = (str) => {
			return !!theFilter.exec(str);
		};
	} else {	//no regex
		theFilter = theFilter.toUpperCase();
		runFilterClosure = (str) => {
			return str.toUpperCase().indexOf(theFilter) !== -1;
		};
	}
	state.items = state.items.map((item) => {

		item.filterMatch = (() => {
			if(item.id == state.filter) {
				return true;
			}
			return runFilterClosure(item.name);
		})();
		if(item.filterMatch) {
			matches++;
		}
		return item;
	});
	console.timeEnd(timerVal);

	return state;
}

export default function items(state, action) {
	if(!state) {
		state = {...initialState};
	}
	switch (action.type) {
		case types.ADD_ITEM:
			const newId = state.items.reduce((val, item, i) => {
				return item.id > val ? item.id : val;
			}, 0) + 1;
			state.items.push({id: newId, name: action.name});
			return {...state};
		case types.DELETE_ITEM:
			state.items = state.items.filter((item) => {
				return item.id != action.id;
			});
			return {...state};
		case types.FILTER_ITEMS:
			if(state.lastFilter == action.filter) {
				return state;	//no change.  do nothing!
			}
			state.lastFilter = state.filter;
			state.filter = action.filter;
			state = runFilter(state);
			return {...state};
		default:
			return {...state};
	}
}
