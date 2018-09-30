class validate {
	static hasWhiteSpace(str) {
		return (!str || str.length === 0 || /^\s*$/.test(str))
	}
	static sumPrices (price)
	{
		return price.reduce((total,num)=> total+num);
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
		return subset.every(function (value) {
			return (superset.indexOf(value) >= 0);
		});
	}
	static retSubstr () {
		return Math.floor(Math.random() * 100000) + 10000;
	}
}

export default validate;
