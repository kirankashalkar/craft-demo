import alt from '../alt.js';

class FieldBuilderActions {
	constructor() {
		this.generateActions(
			'getFieldSuccess',
			'getFieldError',
			'getFieldLoading',
			'saveFieldSuccess',
			'saveFieldError',
			'saveFieldLoading'
		);
	}
}

export default alt.createActions(FieldBuilderActions);