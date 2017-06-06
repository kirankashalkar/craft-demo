import alt from '../alt';
import FieldBuilderActions from '../actions/FieldBuilderActions';
import FieldBuilderSource from '../sources/FieldBuilderSource';
import _ from 'lodash';

class FieldBuilderStore {
	constructor() {
		this.state = {
			loading: true,
			errorMessages: [],
			displayErrors: false
		};
		this.bindActions(FieldBuilderActions);
		this.registerAsync(FieldBuilderSource);
		this.exportPublicMethods({
			resetState: this.resetState,
			validateAndSaveField: this.validateAndSaveField,
			handleChange: this.handleChange,
			handleChoiceChange: this.handleChoiceChange,
			handleDismiss: this.handleDismiss
		})
	}

	resetState = () => {
		this.setState({});
	}

	sanitizeList = (list) => {
		_.remove(list, (entry) => {
			if (_.isEmpty(entry)) {
				return true;
			}
			if (entry.indexOf('<br>') != -1) {
				return true;
			}
		});
	}

	handleChange = (event) => {
		let fieldCopy = this.state.field;
		let name = event.target.name;

		fieldCopy[name] = event.target.type === 'checkbox' ? JSON.parse(event.target.checked) : event.target.value;

		this.setState({
			field: fieldCopy
		})
	}

	handleChoiceChange = (event) => {
		let fieldCopy = this.state.field;
		let newListString = event.target.value;

		newListString = newListString.split('<div>').filter((elem) => {
			return elem.length != 0
		}).join('');

		let newListArray = newListString.split('</div>').filter((elem) => {
			return elem.length != 0
		});

		
		newListArray.map((entry, index) => {
			newListArray[index] = entry.replace('<span class="allowed">', '');
			newListArray[index] = newListArray[index].replace('</span>', '');
			newListArray[index] = newListArray[index].replace('<span class="disallowed">', '');
			newListArray[index] = newListArray[index].replace('</span>', '');
		})

		fieldCopy['choices'] = newListArray;

		this.setState({
			field: fieldCopy
		})
		
	}

	handleDismiss = () => {
		this.setState({
			displayErrors: false
		})
	}

	getFieldSuccess = (success) => {
		this.setState({
			field: success,
			loading: false
		})
	}

	getFieldError = (error) => {
		this.setState({
			field: error,
			loading: false
		})
	}

	getFieldLoading = () => {
		this.setState({
			loading: true
		})
	}

	validateAndSaveField = () => {
		// validate data before saving.
		// on failure, show error

		let errors = [];
		let warnings = [];

		if (_.isEmpty(this.state.field['label'])) {
			errors.push({
				field: 'label',
				message: 'A label is required!'
			})
		}

		this.sanitizeList(this.state.field['choices']);

		if (_.indexOf(this.state.field['choices'], this.state.field['default']) == -1) {
			this.state.field['choices'].push(this.state.field['default']);

			let warnMessage = 'The default value was not part of the choices list and was added to the list';

			console.warn(warnMessage);

			warnings.push({
				field: 'default',
				message: warnMessage
			});
		}

		if (this.state.field['choices'].length > 50) {
			errors.push({
				field: 'choices',
				message: 'Only 50 total choices are supported'
			})
		}

		if (errors.length == 0) {
			this.getInstance().saveField(this.state.field);
		} else {
			let errorMessages = [];

			errors.map((err) => {
				errorMessages.push('Field ' + err.field + ' had an error. Error: ' + err.message);
			})
			this.setState({
				displayErrors: true,
				errorMessages: errorMessages
			})
		}
	}

	saveFieldSuccess = (success) => {
		this.setState({
			loading: false
		});
	}

	saveFieldError = (error) => {
		this.setState({
			loading: false,
			field: this.state.field,
			displayErrors: true,
			errorMessages: [
				'Something went wrong when saving the field' + error
			]
		})
	}

	saveFieldLoading = () => {
		this.setState({
			loading: true
		});
	}

}

export default alt.createStore(FieldBuilderStore);