export const isLoggedIn = (req, res, next) => {
	try {
		const {
			session: { user },
		} = req;
		if (!user) {
			return res.redirect("/");
		}
		next();
	} catch (error) {
		console.log(error.message);
	}
};

export const isLoggedOut = (req, res, next) => {
	try {
		const {
			session: { user },
		} = req;
		if (user) {
			return res.redirect("/dashboard");
		}
		next();
	} catch (error) {
		console.log(error.message);
	}
};
