export const validateEmail = (email) => {
	if (empty(email))
		return {
			passed: false,
			message: "* Email is required",
		};
	const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	email = email.toLowerCase();
	if (!validEmail.test(email))
		return {
			passed: false,
			message: "Ooops! This is not a valid email",
		};
	return {
		passed: true,
	};
};

export const validatePassword = (password) => {
	if (empty(password))
		return {
			passed: false,
			message: "* Password is required",
		};
	if (password.length < 8)
		return {
			passed: false,
			message: "* Password must be 8 characters at least",
		};
	const validPassword = /[a-zA-Z]{2,}$/;
	if (!validPassword.test(password))
		return {
			passed: false,
			message: `The password must contain:
			* 2 or more uppercase letters
			* 2 or more lowercase letters
			* 2 or more of these special characters : $!*_:+¿? `,
		};
	return {
		passed: true,
	};
};

const empty = (value) => {
	if (value) return true;
	return false;
};
