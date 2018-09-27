class validate {
	static hasWhiteSpace(str) {
		return (!str || str.length === 0 || /^\s*$/.test(str))
	}
	static getSum(total, num) {
		return total + num;
	}
	static sumPrices (price)
	{
		return price.reduce(this.getSum)
	}
	static validateEmail(email) {
		const re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return re.test(String(email).toLowerCase());
	}
	static validateInput(str,start,stop) {
		if (str.length > stop) {
			return false;
		}else if (str.length < start) {
			return false;
		}else{
			return true;
		}
	}
	static arrayContainsArray(superset, subset) {
		if (0 === subset.length) {
			return false;
		}
		return subset.every(function (value) {
			return (superset.indexOf(value) >= 0);
		});
	}
}

export default validate;
