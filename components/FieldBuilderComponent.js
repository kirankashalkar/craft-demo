import React, { PropTypes } from 'react';
import FieldBuilderStore from '../stores/FieldBuilderStore';
import LoadingIndicator from './LoadingIndicator';
import ContentEditable from './ContentEditable';
import Crouton from 'react-crouton';
import _ from 'lodash';
import '../styles/FieldBuilderComponent.scss';

export default class FieldBuilderComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = FieldBuilderStore.getState();
		this.onChange = this.onChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		FieldBuilderStore.listen(this.onChange);
		FieldBuilderStore.getField();
	}

	componentWillUnmount() {
		FieldBuilderStore.unlisten(this.onChange);
		FieldBuilderStore.resetState();
	}

	onChange = (state) => {
		this.setState(state);
	}

	handleClick = (event) => {
		event.preventDefault();
		FieldBuilderStore.validateAndSaveField(this.state.field);
	}

	handleChange = (event) => {
		event.target.type !== 'checkbox' && event.preventDefault();
		FieldBuilderStore.handleChange(event);
	}

	handleChoiceChange = (event) => {
		FieldBuilderStore.handleChoiceChange(event);
	}

	handleDismiss() {
		FieldBuilderStore.handleDismiss();
	}

    render() {
    	let choicesHtml = '';
    	let choiceLengthError = false;

    	this.state.field && this.state.field.choices && this.state.field.choices.map((choice) => {

    		let allowedPart = choice.substr(0, 40);
    		let disallowedPart = '';
    		if (allowedPart !== choice) {
    			// There were extra characters
    			disallowedPart = choice.substr(40);
    			choiceLengthError = true;
    		}
			
    		choicesHtml = choicesHtml.concat('<div><span class="allowed">' + allowedPart + '</span>' + '<span class="disallowed">' + disallowedPart + '</span>' + '</div>');

    	})

    	let test = this.state.field && this.state.field.required;

    	return !this.state.loading ? (
	        <div className='responsive'>
	        	<Crouton
                    id={Date.now()}
                    message={this.state.errorMessages && this.state.errorMessages}
                    type={'error'}
                    timeout={3000}
                    autoMiss={true}
                    hidden={!this.state.displayErrors}
                    onDismiss={this.handleDismiss}
                />
	        	<form onSubmit={this.handleClick} className='fbform'>
	        		<div className='fbform-flexed-container'>

		        		<div>
					        <label>
					          	Label
					        </label>
					        <input name='label' type='text' value={this.state.field.label} onChange={this.handleChange} />
					    </div>

					    <div>
					        <label>
					          	Type
					        </label>
					        <span>
					          	Multi-select Text
					        </span>
					        <div>
					    	<input name='required' type='checkbox' checked={test} onChange={this.handleChange} />
					    	<label>
					          	A value is required
					        </label>
					    </div>
					    </div>

					    <div>
					    	
					    </div>

					    <div>
					        <label>
					          	Default Value
					        </label>
					        
					        <input name='default' type='text' value={this.state.field.default} onChange={this.handleChange} />
					    </div>

					    <div>
					        <label>
					          <div>
					          	Choices
					          </div>
					          <div className='choicetoolong'>
					          	{choiceLengthError ? 'Choices cannot be longer than 40 characters' : null}
					          </div>
					        </label>
					        <ContentEditable
					        	html={choicesHtml} 
					        	onChange={this.handleChoiceChange} 
					        />
					    </div>

					    <div>
					        <label>
					          	Order
					        </label>
							<select name='displayAlpha' value={this.state.field.displayAlpha} onChange={this.handleChange}>
								<option value={true}> Display choices in alphabetical order</option>
							 	<option value={false}> Do not display choices in alphabetical order</option>
							</select>
					    </div>

						<div>
							<button type='submit' value='Submit'>Submit</button>
						</div>
					</div>
		      </form>
		    </div>
	    ) : 
	    (
	    	<LoadingIndicator size={10} show={true} color={'grey'}/>
	    );
    }
}

FieldBuilderComponent.propTypes = {
    user: PropTypes.string
};

FieldBuilderComponent.defaultProps = {
    user: 'KiKas'
};