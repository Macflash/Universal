import { ROUND } from "./stuff/universe";

export class Setter {
    constructor(private value: number, private icon_ = '') { }

    onChange = (newValue: number) => { }

    Register(onChange: (newValue: number) => void) {
        this.onChange = onChange;
    }

    get current() {
        return this.value;
    }

    get icon(){
        return this.icon_;
    }

    Display():string {
        return ROUND(this.value) + this.icon;
    }

    Set(v: number) {
        this.value = v;
        this.onChange(this.value);
    }

    Add(v: number) {
        this.value += v;
        this.onChange(this.value);
    }

    Subtract(v: number) { 
        this.value -= v;
        this.onChange(this.value);
    }
}

export const MONTH = 1/12;
export class DateSetter extends Setter {
    static Months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];

    AsDate(){
       return AsDate(this.current, this.icon);
    }

    get date(){
        return this.AsDate();
    }

    AddMonth(){
        this.Add(MONTH);
    }
    AddYear(){
        this.Add(1);
    }

    constructor(value = 1980, icon = '📅'){
        super(value, icon);
    }
}

export function AsDate(year: number, icon = '📅'){
    const whole = Math.floor(year);
    const fraction = year - whole;
    const month = Math.floor(fraction * 12);
    const name = DateSetter.Months[month];
    return `${whole}-${EnsureDigits(month+1)} ${icon}`;
}

export function EnsureDigits(n: number){
    if(n < 10){
        return '0' + n;
    }
    return '' + n;
}