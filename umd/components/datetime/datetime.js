var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@angular/core", "@angular/forms", "../../config/config", "../picker/picker-controller", "../../util/form", "../../util/base-input", "../item/item", "../../util/util", "../../util/datetime-util"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core_1 = require("@angular/core");
    var forms_1 = require("@angular/forms");
    var config_1 = require("../../config/config");
    var picker_controller_1 = require("../picker/picker-controller");
    var form_1 = require("../../util/form");
    var base_input_1 = require("../../util/base-input");
    var item_1 = require("../item/item");
    var util_1 = require("../../util/util");
    var datetime_util_1 = require("../../util/datetime-util");
    /**
     * @name DateTime
     * @description
     * The DateTime component is used to present an interface which makes it easy for
     * users to select dates and times. Tapping on `<ion-datetime>` will display a picker
     * interface that slides up from the bottom of the page. The picker then displays
     * scrollable columns that can be used to individually select years, months, days,
     * hours and minute values. The DateTime component is similar to the native
     * `<input type="datetime-local">` element, however, Ionic's DateTime component makes
     * it easy to display the date and time in a preferred format, and manage the datetime
     * values.
     *
     * ```html
     * <ion-item>
     *   <ion-label>Date</ion-label>
     *   <ion-datetime displayFormat="MM/DD/YYYY" [(ngModel)]="myDate"></ion-datetime>
     * </ion-item>
     * ```
     *
     *
     * ## Display and Picker Formats
     *
     * The DateTime component displays the values in two places: in the `<ion-datetime>`
     * component, and in the interface that is presented from the bottom of the screen.
     * The following chart lists all of the formats that can be used.
     *
     * | Format  | Description                    | Example                 |
     * |---------|--------------------------------|-------------------------|
     * | `YYYY`  | Year, 4 digits                 | `2018`                  |
     * | `YY`    | Year, 2 digits                 | `18`                    |
     * | `M`     | Month                          | `1` ... `12`            |
     * | `MM`    | Month, leading zero            | `01` ... `12`           |
     * | `MMM`   | Month, short name              | `Jan`                   |
     * | `MMMM`  | Month, full name               | `January`               |
     * | `D`     | Day                            | `1` ... `31`            |
     * | `DD`    | Day, leading zero              | `01` ... `31`           |
     * | `DDD`   | Day, short name                | `Fri`                   |
     * | `DDDD`  | Day, full name                 | `Friday`                |
     * | `H`     | Hour, 24-hour                  | `0` ... `23`            |
     * | `HH`    | Hour, 24-hour, leading zero    | `00` ... `23`           |
     * | `h`     | Hour, 12-hour                  | `1` ... `12`            |
     * | `hh`    | Hour, 12-hour, leading zero    | `01` ... `12`           |
     * | `a`     | 12-hour time period, lowercase | `am` `pm`               |
     * | `A`     | 12-hour time period, uppercase | `AM` `PM`               |
     * | `m`     | Minute                         | `1` ... `59`            |
     * | `mm`    | Minute, leading zero           | `01` ... `59`           |
     * | `s`     | Second                         | `1` ... `59`            |
     * | `ss`    | Second, leading zero           | `01` ... `59`           |
     * | `Z`     | UTC Timezone Offset            | `Z or +HH:mm or -HH:mm` |
     *
     * **Important**: See the [Month Names and Day of the Week Names](#month-names-and-day-of-the-week-names)
     * section below on how to use different names for the month and day.
     *
     * ### Display Format
     *
     * The `displayFormat` input property specifies how a datetime's value should be
     * printed, as formatted text, within the `ion-datetime` component.
     *
     * In the following example, the display in the `<ion-datetime>` will use the
     * month's short name, the numerical day with a leading zero, a comma and the
     * four-digit year. In addition to the date, it will display the time with the hours
     * in the 24-hour format and the minutes. Any character can be used as a separator.
     * An example display using this format is: `Jun 17, 2005 11:06`.
     *
     * ```html
     * <ion-item>
     *   <ion-label>Date</ion-label>
     *   <ion-datetime displayFormat="MMM DD, YYYY HH:mm" [(ngModel)]="myDate"></ion-datetime>
     * </ion-item>
     * ```
     *
     * ### Picker Format
     *
     * The `pickerFormat` input property determines which columns should be shown in the
     * interface, the order of the columns, and which format to use within each column.
     * If the `pickerFormat` input is not provided then it will default to the `displayFormat`.
     *
     * In the following example, the display in the `<ion-datetime>` will use the
     * `MM/YYYY` format, such as `06/2020`. However, the picker interface
     * will display two columns with the month's long name, and the four-digit year.
     *
     * ```html
     * <ion-item>
     *   <ion-label>Date</ion-label>
     *   <ion-datetime displayFormat="MM/YYYY" pickerFormat="MMMM YYYY" [(ngModel)]="myDate"></ion-datetime>
     * </ion-item>
     * ```
     *
     * ### Datetime Data
     *
     * Historically, handling datetime values within JavaScript, or even within HTML
     * inputs, has always been a challenge. Specifically, JavaScript's `Date` object is
     * notoriously difficult to correctly parse apart datetime strings or to format
     * datetime values. Even worse is how different browsers and JavaScript versions
     * parse various datetime strings differently, especially per locale.
     *
     * But no worries, all is not lost! Ionic's datetime input has been designed so
     * developers can avoid the common pitfalls, allowing developers to easily format
     * datetime values within the input, and give the user a simple datetime picker for a
     * great user experience.
     *
     * ##### ISO 8601 Datetime Format: YYYY-MM-DDTHH:mmZ
     *
     * Ionic uses the [ISO 8601 datetime format](https://www.w3.org/TR/NOTE-datetime)
     * for its value. The value is simply a string, rather than using JavaScript's `Date`
     * object. Additionally, when using the ISO datetime format, it makes it easier
     * to serialize and pass within JSON objects, and sending databases a standardized
     * format which it can be easily parsed if need be.
     *
     * To create an ISO datetime string for the current date and time, e.g. use `const currentDate = (new Date()).toISOString();`.
     *
     * An ISO format can be used as a simple year, or just the hour and minute, or get more
     * detailed down to the millisecond and timezone. Any of the ISO formats below can be used,
     * and after a user selects a new value, Ionic will continue to use the same ISO format
     * which datetime value was originally given as.
     *
     * | Description          | Format                 | Datetime Value Example       |
     * |----------------------|------------------------|------------------------------|
     * | Year                 | YYYY                   | 1994                         |
     * | Year and Month       | YYYY-MM                | 1994-12                      |
     * | Complete Date        | YYYY-MM-DD             | 1994-12-15                   |
     * | Date and Time        | YYYY-MM-DDTHH:mm       | 1994-12-15T13:47             |
     * | UTC Timezone         | YYYY-MM-DDTHH:mm:ssTZD | 1994-12-15T13:47:20.789Z     |
     * | Timezone Offset      | YYYY-MM-DDTHH:mm:ssTZD | 1994-12-15T13:47:20.789+5:00 |
     * | Hour and Minute      | HH:mm                  | 13:47                        |
     * | Hour, Minute, Second | HH:mm:ss               | 13:47:20                     |
     *
     * Note that the year is always four-digits, milliseconds (if it's added) is always
     * three-digits, and all others are always two-digits. So the number representing
     * January always has a leading zero, such as `01`. Additionally, the hour is always
     * in the 24-hour format, so `00` is `12am` on a 12-hour clock, `13` means `1pm`,
     * and `23` means `11pm`.
     *
     * It's also important to note that neither the `displayFormat` or `pickerFormat` can
     * set the datetime value's output, which is the value that is set by the component's
     * `ngModel`. The format's are merely for displaying the value as text and the picker's
     * interface, but the datetime's value is always persisted as a valid ISO 8601 datetime
     * string.
     *
     *
     * ## Min and Max Datetimes
     *
     * Dates are infinite in either direction, so for a user's selection there should be at
     * least some form of restricting the dates that can be selected. By default, the maximum
     * date is to the end of the current year, and the minimum date is from the beginning
     * of the year that was 100 years ago.
     *
     * To customize the minimum and maximum datetime values, the `min` and `max` component
     * inputs can be provided which may make more sense for the app's use-case, rather
     * than the default of the last 100 years. Following the same IS0 8601 format listed
     * in the table above, each component can restrict which dates can be selected by the
     * user. Below is an example of restricting the date selection between the beginning
     * of 2016, and October 31st of 2020:
     *
     * ```html
     * <ion-item>
     *   <ion-label>Date</ion-label>
     *   <ion-datetime displayFormat="MMMM YYYY" min="2016" max="2020-10-31" [(ngModel)]="myDate">
     *   </ion-datetime>
     * </ion-item>
     * ```
     *
     *
     * ## Month Names and Day of the Week Names
     *
     * At this time, there is no one-size-fits-all standard to automatically choose the correct
     * language/spelling for a month name, or day of the week name, depending on the language
     * or locale. Good news is that there is an
     * [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat)
     * standard which *most* browsers have adopted. However, at this time the standard has not
     * been fully implemented by all popular browsers so Ionic is unavailable to take advantage
     * of it *yet*. Additionally, Angular also provides an internationalization service, but it
     * is still under heavy development so Ionic does not depend on it at this time.
     *
     * All things considered, the by far easiest solution is to just provide an array of names
     * if the app needs to use names other than the default English version of month and day
     * names. The month names and day names can be either configured at the app level, or
     * individual `ion-datetime` level.
     *
     * ### App Config Level
     *
     * ```ts
     * //app.module.ts
     * @NgModule({
     * ...,
     * imports: [
     *   IonicModule.forRoot(MyApp, {
     *   monthNames: ['janeiro', 'fevereiro', 'mar\u00e7o', ... ],
     *   monthShortNames: ['jan', 'fev', 'mar', ... ],
     *   dayNames: ['domingo', 'segunda-feira', 'ter\u00e7a-feira', ... ],
     *   dayShortNames: ['dom', 'seg', 'ter', ... ],
     * })
     * ],
     * ...
     * })
     * ```
     *
     * ### Component Input Level
     *
     * ```html
     * <ion-item>
     *   <ion-label>Per??odo</ion-label>
     *   <ion-datetime displayFormat="DDDD MMM D, YYYY" [(ngModel)]="myDate"
     *     monthNames="janeiro, fevereiro, mar\u00e7o, ..."
     *     monthShortNames="jan, fev, mar, ..."
     *     dayNames="domingo, segunda-feira, ter\u00e7a-feira, ..."
     *     dayShortNames="dom, seg, ter, ..."></ion-datetime>
     * </ion-item>
     * ```
     *
     *
     * ### Advanced Datetime Validation and Manipulation
     *
     * The datetime picker provides the simplicity of selecting an exact format, and persists
     * the datetime values as a string using the standardized
     * [ISO 8601 datetime format](https://www.w3.org/TR/NOTE-datetime).
     * However, it's important to note that `ion-datetime` does not attempt to solve all
     * situtations when validating and manipulating datetime values. If datetime values need
     * to be parsed from a certain format, or manipulated (such as adding 5 days to a date,
     * subtracting 30 minutes, etc.), or even formatting data to a specific locale, then we highly
     * recommend using [moment.js](http://momentjs.com/) to "Parse, validate, manipulate, and
     * display dates in JavaScript". [Moment.js](http://momentjs.com/) has quickly become
     * our goto standard when dealing with datetimes within JavaScript, but Ionic does not
     * prepackage this dependency since most apps will not require it, and its locale
     * configuration should be decided by the end-developer.
     *
     *
     * @usage
     * ```html
     * <ion-item>
     *   <ion-label>Date</ion-label>
     *   <ion-datetime displayFormat="MM/DD/YYYY" [(ngModel)]="myDate">
     *   </ion-datetime>
     * </ion-item>
     * ```
     *
     *
     * @demo /docs/demos/src/datetime/
     */
    var DateTime = (function (_super) {
        __extends(DateTime, _super);
        function DateTime(form, config, elementRef, renderer, item, _pickerCtrl) {
            var _this = _super.call(this, config, elementRef, renderer, 'datetime', {}, form, item, null) || this;
            _this._pickerCtrl = _pickerCtrl;
            _this._text = '';
            _this._locale = {};
            /**
             * @input {string} The text to display on the picker's cancel button. Default: `Cancel`.
             */
            _this.cancelText = 'Cancel';
            /**
             * @input {string} The text to display on the picker's "Done" button. Default: `Done`.
             */
            _this.doneText = 'Done';
            /**
             * @input {any} Any additional options that the picker interface can accept.
             * See the [Picker API docs](../../picker/Picker) for the picker options.
             */
            _this.pickerOptions = {};
            /**
             * @input {string} The text to display when there's no date selected yet.
             * Using lowercase to match the input attribute
             */
            _this.placeholder = '';
            /**
             * @output {any} Emitted when the datetime selection was cancelled.
             */
            _this.ionCancel = new core_1.EventEmitter();
            return _this;
        }
        /**
         * @hidden
         */
        DateTime.prototype.ngAfterContentInit = function () {
            var _this = this;
            // first see if locale names were provided in the inputs
            // then check to see if they're in the config
            // if neither were provided then it will use default English names
            ['monthNames', 'monthShortNames', 'dayNames', 'dayShortNames'].forEach(function (type) {
                _this._locale[type] = convertToArrayOfStrings(util_1.isPresent(_this[type]) ? _this[type] : _this._config.get(type), type);
            });
            this._initialize();
        };
        /**
         * @hidden
         */
        DateTime.prototype._inputNormalize = function (val) {
            datetime_util_1.updateDate(this._value, val);
            return this._value;
        };
        /**
         * @hidden
         */
        DateTime.prototype._inputUpdated = function () {
            _super.prototype._inputUpdated.call(this);
            this.updateText();
        };
        /**
         * @hidden
         */
        DateTime.prototype._inputShouldChange = function () {
            return true;
        };
        /**
         * TODO: REMOVE THIS
         * @hidden
         */
        DateTime.prototype._inputChangeEvent = function () {
            return this.value;
        };
        /**
         * @hidden
         */
        DateTime.prototype._inputNgModelEvent = function () {
            return datetime_util_1.convertDataToISO(this.value);
        };
        DateTime.prototype._click = function (ev) {
            ev.preventDefault();
            ev.stopPropagation();
            this.open();
        };
        DateTime.prototype._keyup = function () {
            this.open();
        };
        /**
         * @hidden
         */
        DateTime.prototype.open = function () {
            var _this = this;
            if (this.isFocus() || this._disabled) {
                return;
            }
            (void 0) /* console.debug */;
            // the user may have assigned some options specifically for the picker
            var pickerOptions = __assign({}, this.pickerOptions);
            // Add a cancel and done button by default to the picker
            var defaultButtons = [{
                    text: this.cancelText,
                    role: 'cancel',
                    handler: function () { return _this.ionCancel.emit(_this); }
                }, {
                    text: this.doneText,
                    handler: function (data) { return _this.value = data; },
                }];
            pickerOptions.buttons = (pickerOptions.buttons || []).concat(defaultButtons);
            // Configure picker under the hood
            var picker = this._picker = this._pickerCtrl.create(pickerOptions);
            picker.ionChange.subscribe(function () {
                _this.validate();
                picker.refresh();
            });
            // Update picker status before presenting
            this.generate();
            this.validate();
            // Present picker
            this._fireFocus();
            picker.present(pickerOptions);
            picker.onDidDismiss(function () {
                _this._fireBlur();
            });
        };
        /**
         * @hidden
         */
        DateTime.prototype.generate = function () {
            var _this = this;
            var picker = this._picker;
            // if a picker format wasn't provided, then fallback
            // to use the display format
            var template = this.pickerFormat || this.displayFormat || DEFAULT_FORMAT;
            if (util_1.isPresent(template)) {
                // make sure we've got up to date sizing information
                this.calcMinMax();
                // does not support selecting by day name
                // automaticallly remove any day name formats
                template = template.replace('DDDD', '{~}').replace('DDD', '{~}');
                if (template.indexOf('D') === -1) {
                    // there is not a day in the template
                    // replace the day name with a numeric one if it exists
                    template = template.replace('{~}', 'D');
                }
                // make sure no day name replacer is left in the string
                template = template.replace(/{~}/g, '');
                // parse apart the given template into an array of "formats"
                datetime_util_1.parseTemplate(template).forEach(function (format) {
                    // loop through each format in the template
                    // create a new picker column to build up with data
                    var key = datetime_util_1.convertFormatToKey(format);
                    var values;
                    // first see if they have exact values to use for this input
                    if (util_1.isPresent(_this[key + 'Values'])) {
                        // user provide exact values for this date part
                        values = convertToArrayOfNumbers(_this[key + 'Values'], key);
                    }
                    else {
                        // use the default date part values
                        values = datetime_util_1.dateValueRange(format, _this._min, _this._max);
                    }
                    var column = {
                        name: key,
                        selectedIndex: 0,
                        options: values.map(function (val) {
                            return {
                                value: val,
                                text: datetime_util_1.renderTextFormat(format, val, null, _this._locale),
                            };
                        })
                    };
                    // cool, we've loaded up the columns with options
                    // preselect the option for this column
                    var optValue = datetime_util_1.getValueFromFormat(_this.getValueOrDefault(), format);
                    var selectedIndex = column.options.findIndex(function (opt) { return opt.value === optValue; });
                    if (selectedIndex >= 0) {
                        // set the select index for this column's options
                        column.selectedIndex = selectedIndex;
                    }
                    // add our newly created column to the picker
                    picker.addColumn(column);
                });
                // Normalize min/max
                var min_1 = this._min;
                var max_1 = this._max;
                var columns_1 = this._picker.getColumns();
                ['month', 'day', 'hour', 'minute']
                    .filter(function (name) { return !columns_1.find(function (column) { return column.name === name; }); })
                    .forEach(function (name) {
                    min_1[name] = 0;
                    max_1[name] = 0;
                });
                this.divyColumns();
            }
        };
        /**
         * @hidden
         */
        DateTime.prototype.validateColumn = function (name, index, min, max, lowerBounds, upperBounds) {
            (void 0) /* assert */;
            (void 0) /* assert */;
            var column = this._picker.getColumn(name);
            if (!column) {
                return 0;
            }
            var lb = lowerBounds.slice();
            var ub = upperBounds.slice();
            var options = column.options;
            var indexMin = options.length - 1;
            var indexMax = 0;
            for (var i = 0; i < options.length; i++) {
                var opt = options[i];
                var value = opt.value;
                lb[index] = opt.value;
                ub[index] = opt.value;
                var disabled = opt.disabled = (value < lowerBounds[index] ||
                    value > upperBounds[index] ||
                    datetime_util_1.dateSortValue(ub[0], ub[1], ub[2], ub[3], ub[4]) < min ||
                    datetime_util_1.dateSortValue(lb[0], lb[1], lb[2], lb[3], lb[4]) > max);
                if (!disabled) {
                    indexMin = Math.min(indexMin, i);
                    indexMax = Math.max(indexMax, i);
                }
            }
            var selectedIndex = column.selectedIndex = util_1.clamp(indexMin, column.selectedIndex, indexMax);
            opt = column.options[selectedIndex];
            if (opt) {
                return opt.value;
            }
            return 0;
        };
        /**
         * @private
         */
        DateTime.prototype.validate = function () {
            var today = new Date();
            var minCompareVal = datetime_util_1.dateDataSortValue(this._min);
            var maxCompareVal = datetime_util_1.dateDataSortValue(this._max);
            var yearCol = this._picker.getColumn('year');
            (void 0) /* assert */;
            var selectedYear = today.getFullYear();
            if (yearCol) {
                // default to the first value if the current year doesn't exist in the options
                if (!yearCol.options.find(function (col) { return col.value === today.getFullYear(); })) {
                    selectedYear = yearCol.options[0].value;
                }
                var yearOpt = yearCol.options[yearCol.selectedIndex];
                if (yearOpt) {
                    // they have a selected year value
                    selectedYear = yearOpt.value;
                }
            }
            var selectedMonth = this.validateColumn('month', 1, minCompareVal, maxCompareVal, [selectedYear, 0, 0, 0, 0], [selectedYear, 12, 31, 23, 59]);
            var numDaysInMonth = datetime_util_1.daysInMonth(selectedMonth, selectedYear);
            var selectedDay = this.validateColumn('day', 2, minCompareVal, maxCompareVal, [selectedYear, selectedMonth, 0, 0, 0], [selectedYear, selectedMonth, numDaysInMonth, 23, 59]);
            var selectedHour = this.validateColumn('hour', 3, minCompareVal, maxCompareVal, [selectedYear, selectedMonth, selectedDay, 0, 0], [selectedYear, selectedMonth, selectedDay, 23, 59]);
            this.validateColumn('minute', 4, minCompareVal, maxCompareVal, [selectedYear, selectedMonth, selectedDay, selectedHour, 0], [selectedYear, selectedMonth, selectedDay, selectedHour, 59]);
        };
        /**
         * @hidden
         */
        DateTime.prototype.divyColumns = function () {
            var pickerColumns = this._picker.getColumns();
            var columnsWidth = [];
            var col;
            var width;
            for (var i = 0; i < pickerColumns.length; i++) {
                col = pickerColumns[i];
                columnsWidth.push(0);
                for (var j = 0; j < col.options.length; j++) {
                    width = col.options[j].text.length;
                    if (width > columnsWidth[i]) {
                        columnsWidth[i] = width;
                    }
                }
            }
            if (columnsWidth.length === 2) {
                width = Math.max(columnsWidth[0], columnsWidth[1]);
                pickerColumns[0].align = 'right';
                pickerColumns[1].align = 'left';
                pickerColumns[0].optionsWidth = pickerColumns[1].optionsWidth = width * 17 + "px";
            }
            else if (columnsWidth.length === 3) {
                width = Math.max(columnsWidth[0], columnsWidth[2]);
                pickerColumns[0].align = 'right';
                pickerColumns[1].columnWidth = columnsWidth[1] * 17 + "px";
                pickerColumns[0].optionsWidth = pickerColumns[2].optionsWidth = width * 17 + "px";
                pickerColumns[2].align = 'left';
            }
        };
        /**
         * @hidden
         */
        DateTime.prototype.updateText = function () {
            // create the text of the formatted data
            var template = this.displayFormat || this.pickerFormat || DEFAULT_FORMAT;
            this._text = datetime_util_1.renderDateTime(template, this.getValue(), this._locale);
        };
        /**
         * @hidden
         */
        DateTime.prototype.getValue = function () {
            return this._value;
        };
        /**
         * @hidden
         */
        DateTime.prototype.getValueOrDefault = function () {
            if (this.hasValue()) {
                return this._value;
            }
            var initialDateString = this.getDefaultValueDateString();
            var _default = {};
            datetime_util_1.updateDate(_default, initialDateString);
            return _default;
        };
        /**
         * Get the default value as a date string
         * @hidden
         */
        DateTime.prototype.getDefaultValueDateString = function () {
            if (this.initialValue) {
                return this.initialValue;
            }
            var nowString = (new Date).toISOString();
            if (this.max) {
                var now = datetime_util_1.parseDate(nowString);
                var max = datetime_util_1.parseDate(this.max);
                var v = void 0;
                for (var i in max) {
                    v = max[i];
                    if (v === null) {
                        max[i] = now[i];
                    }
                }
                var diff = datetime_util_1.compareDates(now, max);
                // If max is before current time, return max
                if (diff > 0) {
                    return this.max;
                }
            }
            return nowString;
        };
        /**
         * @hidden
         */
        DateTime.prototype.hasValue = function () {
            var val = this._value;
            return util_1.isPresent(val)
                && util_1.isObject(val)
                && Object.keys(val).length > 0;
        };
        /**
         * @hidden
         */
        DateTime.prototype.calcMinMax = function (now) {
            var todaysYear = (now || new Date()).getFullYear();
            if (util_1.isPresent(this.yearValues)) {
                var years = convertToArrayOfNumbers(this.yearValues, 'year');
                if (util_1.isBlank(this.min)) {
                    this.min = Math.min.apply(Math, years);
                }
                if (util_1.isBlank(this.max)) {
                    this.max = Math.max.apply(Math, years);
                }
            }
            else {
                if (util_1.isBlank(this.min)) {
                    this.min = (todaysYear - 100).toString();
                }
                if (util_1.isBlank(this.max)) {
                    this.max = todaysYear.toString();
                }
            }
            var min = this._min = datetime_util_1.parseDate(this.min);
            var max = this._max = datetime_util_1.parseDate(this.max);
            min.year = min.year || todaysYear;
            max.year = max.year || todaysYear;
            min.month = min.month || 1;
            max.month = max.month || 12;
            min.day = min.day || 1;
            max.day = max.day || 31;
            min.hour = min.hour || 0;
            max.hour = max.hour || 23;
            min.minute = min.minute || 0;
            max.minute = max.minute || 59;
            min.second = min.second || 0;
            max.second = max.second || 59;
            // Ensure min/max constraits
            if (min.year > max.year) {
                console.error('min.year > max.year');
                min.year = max.year - 100;
            }
            if (min.year === max.year) {
                if (min.month > max.month) {
                    console.error('min.month > max.month');
                    min.month = 1;
                }
                else if (min.month === max.month && min.day > max.day) {
                    console.error('min.day > max.day');
                    min.day = 1;
                }
            }
        };
        DateTime.decorators = [
            { type: core_1.Component, args: [{
                        selector: 'ion-datetime',
                        template: '<div *ngIf="!_text" class="datetime-text datetime-placeholder">{{placeholder}}</div>' +
                            '<div *ngIf="_text" class="datetime-text">{{_text}}</div>' +
                            '<button aria-haspopup="true" ' +
                            'type="button" ' +
                            '[id]="id" ' +
                            'ion-button="item-cover" ' +
                            '[attr.aria-labelledby]="_labelId" ' +
                            '[attr.aria-disabled]="_disabled" ' +
                            'class="item-cover">' +
                            '</button>',
                        host: {
                            '[class.datetime-disabled]': '_disabled'
                        },
                        providers: [{ provide: forms_1.NG_VALUE_ACCESSOR, useExisting: DateTime, multi: true }],
                        encapsulation: core_1.ViewEncapsulation.None,
                    },] },
        ];
        /** @nocollapse */
        DateTime.ctorParameters = function () { return [
            { type: form_1.Form, },
            { type: config_1.Config, },
            { type: core_1.ElementRef, },
            { type: core_1.Renderer, },
            { type: item_1.Item, decorators: [{ type: core_1.Optional },] },
            { type: picker_controller_1.PickerController, decorators: [{ type: core_1.Optional },] },
        ]; };
        DateTime.propDecorators = {
            'min': [{ type: core_1.Input },],
            'max': [{ type: core_1.Input },],
            'displayFormat': [{ type: core_1.Input },],
            'initialValue': [{ type: core_1.Input },],
            'pickerFormat': [{ type: core_1.Input },],
            'cancelText': [{ type: core_1.Input },],
            'doneText': [{ type: core_1.Input },],
            'yearValues': [{ type: core_1.Input },],
            'monthValues': [{ type: core_1.Input },],
            'dayValues': [{ type: core_1.Input },],
            'hourValues': [{ type: core_1.Input },],
            'minuteValues': [{ type: core_1.Input },],
            'monthNames': [{ type: core_1.Input },],
            'monthShortNames': [{ type: core_1.Input },],
            'dayNames': [{ type: core_1.Input },],
            'dayShortNames': [{ type: core_1.Input },],
            'pickerOptions': [{ type: core_1.Input },],
            'placeholder': [{ type: core_1.Input },],
            'ionCancel': [{ type: core_1.Output },],
            '_click': [{ type: core_1.HostListener, args: ['click', ['$event'],] },],
            '_keyup': [{ type: core_1.HostListener, args: ['keyup.space',] },],
        };
        return DateTime;
    }(base_input_1.BaseInput));
    exports.DateTime = DateTime;
    /**
     * @hidden
     * Use to convert a string of comma separated numbers or
     * an array of numbers, and clean up any user input
     */
    function convertToArrayOfNumbers(input, type) {
        if (util_1.isString(input)) {
            // convert the string to an array of strings
            // auto remove any whitespace and [] characters
            input = input.replace(/\[|\]|\s/g, '').split(',');
        }
        var values;
        if (util_1.isArray(input)) {
            // ensure each value is an actual number in the returned array
            values = input
                .map(function (num) { return parseInt(num, 10); })
                .filter(isFinite);
        }
        if (!values || !values.length) {
            console.warn("Invalid \"" + type + "Values\". Must be an array of numbers, or a comma separated string of numbers.");
        }
        return values;
    }
    /**
     * @hidden
     * Use to convert a string of comma separated strings or
     * an array of strings, and clean up any user input
     */
    function convertToArrayOfStrings(input, type) {
        if (util_1.isPresent(input)) {
            if (util_1.isString(input)) {
                // convert the string to an array of strings
                // auto remove any [] characters
                input = input.replace(/\[|\]/g, '').split(',');
            }
            var values;
            if (util_1.isArray(input)) {
                // trim up each string value
                values = input.map(function (val) { return val.trim(); });
            }
            if (!values || !values.length) {
                console.warn("Invalid \"" + type + "Names\". Must be an array of strings, or a comma separated string.");
            }
            return values;
        }
    }
    var DEFAULT_FORMAT = 'MMM D, YYYY';
});
//# sourceMappingURL=datetime.js.map