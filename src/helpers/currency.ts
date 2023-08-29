export const formatCurrency = (amount: number, currency: string): string => {
    const formatter = new Intl.NumberFormat("en", {
        style: "currency",
        currency,
    });
    return formatter.format(amount);
};

