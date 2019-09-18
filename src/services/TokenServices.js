import config from '../config';

const TokenServices = {
	//save JWT to session storage
	saveAuthToken(token) {
		window.sessionStorage.setItem(config.TOKEN_KEY, token);
	},
	//retreive JWT from session storage
	getAuthToken() {
		return window.sessionStorage.getItem(config.TOKEN_KEY);
	},
	//remove JWT from session storage
	clearAuthToken() {
		window.sessionStorage.removeItem(config.TOKEN_KEY);
	}
};

export default TokenServices;
