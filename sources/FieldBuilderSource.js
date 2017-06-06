import FieldBuilderActions from '../actions/FieldBuilderActions';

const ajaxFetch = (url, init, resolve, reject) => {
	const checkStatusGetJson = (response) => {
		if (response.status >= 200 && response.status < 300) {
			return response.json();
		} else {
			var error = new Error(response.statusText)
			error.status = response.status;
			error.statusText = response.statusText;
			throw error;
		}
	};

	const handleSuccess = (data) => {
		if (typeof data == 'string') {
			data = JSON.parse(data);
		}
		resolve(data);
	};

	const handleError = (error) => {
		if (typeof error == 'string') {
			error = JSON.parse(error);
		}
		reject(error);
	};

	fetch(url, init)
	.then(checkStatusGetJson)
	.then(handleSuccess)
    .catch(handleError);
};


const FieldBuilderSource = {
	getField: {
		remote(state) {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve({
								"label": "Sales region",
								"required": false,
								"choices": [
									"Asia",
									"Australia New Zealand and the Pacific Islands",
									"Western Europe",
									"North America",
									"Eastern Europe",
									"Latin America",
									"Middle East and Africa"
								],
								"displayAlpha": true,
								"default": "North America"
							})
				}, 250);
			})
		},
		loading: FieldBuilderActions.getFieldLoading,
		success: FieldBuilderActions.getFieldSuccess,
		error: FieldBuilderActions.getFieldError
	},

	saveField: {
		remote(state, data) {
			let headers = new Headers({
			    'Access-Control-Allow-Origin':'*',
			    'Content-Type': 'application/json'
			});
			let init = { method: 'POST',
            	headers: headers,
                mode: 'cors',
                cache: 'default',
                body: data
           	};
			return new Promise((resolve, reject) => {
				ajaxFetch('http://www.mocky.io/v2/566061f21200008e3aabd919',
					init,
					resolve,
					reject);
			})
		},
		loading: FieldBuilderActions.saveFieldLoading,
		success: FieldBuilderActions.saveFieldSuccess,
		error: FieldBuilderActions.saveFieldError
	}
}

module.exports = FieldBuilderSource;
