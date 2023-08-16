declare namespace nasl.core {
    export type Any = any;
    export type Boolean = boolean;
    export type Integer = number;
    export type Decimal = number;
    export type String = string;

    export class Binary {
        accept: 'Binary';
    }

    export class Date {
        accept: 'Date';
    }

    export class Time {
        accept: 'Time';
    }

    export class DateTime {
        accept: 'DateTime';
    }
}
