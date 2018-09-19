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
}

export default validate;