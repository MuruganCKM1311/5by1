export interface Unit {
    id?: string;
    name: string;
    code: string;
    // Parent unit if any
    baseUnit?: Unit;
    // How many parent unit is this unit. Eg - One kilogram is 1000 millie gram
    times?: number;
    // How many decimal places are allowed - It depends on times
    decimalPlaces: number;
    description?: string;
}
