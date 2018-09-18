class validate {
    static getSum(total, num) {
        return total + num;
    }
    static sumPrices (price)
    {
        return price.reduce(this.getSum)
    }
}

export default validate;