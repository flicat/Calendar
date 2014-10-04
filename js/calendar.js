/*!
 * @作者: liyuelong1020@gmail.com
 * @日期: 2014/05/08
 * @备注: 日历插件 v2.0
 *
 * @param
 * defaultDate: false,       // 默认日期
 * size: 2,                  // 日历个数，默认为双日历
 * icon: false,              // 是否显示日历图标节点，默认不显示
 * minDate: '',              // 日历可选的最小日期: $('#start_date') | new Date | '2013-01-01'
 * maxDate: '',              // 日历可选的最大日期: $('#start_date') | new Date | '2013-01-01'
 * filter: null,         // 在 minDate 与 maxDate 之间筛选可选日期  @filter
 * dateFormat: 'y-m-d w',    // 日期格式: y:年 m: 月 d: 日 w: 星期
 * startDateTarget: null,    // 开始日期节点，用于开始/结束日期表单
 * interval: 1,              // 开始日期与结束日期的间隔时间
 * endDateTarget: null,      // 结束日期节点，用于开始/结束日期表单
 * onClose: function (){}    // 日期点击事件回调函数
 *
 * @filter
 * filter: [              // 筛选规则，可以有多条，多条规则取交集
 *     {
 *         "period_type": "0",     // 有效日期 0 / 排除日期 1
 *         "period": "1",          // 周期 一次性  0 每年 1  每月 2 每周 3
 *         "start": "6-1",         // 开始日期  格式：一次性(2014-01-01);每年(01-01);每月(31);每周(6);
 *         "end": "6-7"            // 结束日期  格式：一次性(2014-01-01);每年(01-01);每月(31);每周(6);
 *     },
 *     {
 *         "period_type": "0",     // 有效日期 0 / 排除日期 1
 *         "period": "2",          // 周期 一次性  0 每年 1  每月 2 每周 3
 *         "start": 10,            // 开始日期  格式：一次性(2014-01-01);每年(01-01);每月(31);每周(6);
 *         "end": 20               // 结束日期  格式：一次性(2014-01-01);每年(01-01);每月(31);每周(6);
 *     }
 * ]
 *
 */

(function() {

    /**
     * 日历生成对象 timetable
     */
    var Public = {
        // 判断是否为空对象
        isEmpty: function(obj) {
            if(obj && Object.prototype.toString.call(obj) === "[object Object]"){
                for(var i in obj){
                    return false;
                }
            }
            return true;
        },
        // 判断是否是对象
        isObject: function (obj) {
            return Object.prototype.toString.call(obj) === "[object Object]"
        },
        // 判断是否是字符串
        isString: function (obj) {
            return Object.prototype.toString.call(obj) === "[object String]"
        },
        // 判断是否是数字
        isNumber: function (obj) {
            return Object.prototype.toString.call(obj) === "[object Number]"
        },
        // 判断是否是日期
        isDate: function (obj) {
            return Object.prototype.toString.call(obj) === "[object Date]"
        },
        // 判断是否是数组
        isArray: function (obj) {
            return Object.prototype.toString.call(obj) === "[object Array]"
        },
        // 判断是否是boolean值
        isBoolean: function (obj) {
            return Object.prototype.toString.call(obj) === "[object Boolean]"
        },
        // 判断是否是函数
        isFunction: function (obj) {
            return Object.prototype.toString.call(obj) === "[object Function]"
        },
        // 根据传入参数返回当前日期的前几天或后几天
        plusDate: function(n, format, isStamp) {
            var Public = this;
            var uom = new Date();
            uom.setDate(uom.getDate() + n);
            return Public.getDateString(uom, format, isStamp);
        },
        // 从字符串中获取日期对象
        getDateFromString: function(date) {
            var Public = this;
            if (date && (Public.isString(date) || Public.isNumber(date))) {

                var dataStr = date.toString().match(/\d{4}\W\d{1,2}\W\d{1,2}/g) || '';
                var _date;

                if(dataStr.length){

                    var _dataStr = dataStr[0].match(/\d{1,}/g);
                    _date = new Date(Number(_dataStr[0]), Number(_dataStr[1] - 1), Number(_dataStr[2]));
                    _date.setHours(0,0,0,0);
                    return _date;

                } else {
                    _date = new Date();
                    _date.setTime((Number(date) || 0) * 1000);
                    _date.setHours(0,0,0,0);
                    return _date;
                }

            } else if (date && Public.isDate(date)) {
                date.setHours(0,0,0,0);
                return date;
            } else {
                return null;
            }

        },
        // 获取特定格式日期字符串
        getDateString: function(date , format , isStamp) {
            var Public = this;
            var lang ='zh-cn';
            var dTemp = Public.getDateFromString(date);
            var weekFormat = {
                'zh-cn': ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
                'zh-tw': ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
                'en-us': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            };

            if(arguments.length == 2){
                !Public.isString(format) ? isStamp = format : null;
            }
            format = Public.isString(format) ? format : 'y-m-d w';

            if(dTemp){

                if(!!isStamp){
                    return Math.floor(dTemp.getTime() / 1000);
                } else {

                    var year = dTemp.getFullYear();
                    var mon = Number(dTemp.getMonth()) + 1;
                    var date = Number(dTemp.getDate());
                    var day = weekFormat[lang][dTemp.getDay()];
                    return format
                        .replace(/y+/ig, year)
                        .replace(/m+/g, mon)
                        .replace(/d+/g, date)
                        .replace(/M+/g, mon < 10 ? '0' + mon: mon)
                        .replace(/D+/g, date < 10 ? '0' + date: date)
                        .replace(/w+/ig, day);

                }

            } else {
                return '';
            }
        },
        // 获取一个月的天数
        getMonthDays: function(yy, mm) {
            yy = Number(yy), mm = Number(mm);
            var getCheckYear = function(yy) {
                if (yy % 4 !== 0) {
                    return false;
                }
                if (yy % 100 === 0 && yy % 400 !== 0) {
                    return false;
                }
                return true;
            };

            if (getCheckYear(yy) && mm === 2) {
                return 29;
            }

            if (!getCheckYear(yy) && mm === 2) {
                return 28;
            }

            if (mm === 4 || mm === 6 || mm === 9 || mm === 11) {
                return 30;
            }

            return 31;
        },
        // 获取日期相差天数
        getDaysNum: function (time1 , time2){

            var Public = this;
            var _times1 = Public.getDateFromString(time1);
            var _times2 = Public.getDateFromString(time2);

            if(_times1 && _times2){
                _times1.setHours(0,0,0,0);
                _times2.setHours(0,0,0,0);
                return parseInt((_times2.getTime() - _times1.getTime()) / 8.64E7);
            } else {
                return 0;
            }

        }
    };

    var timetable = (function() {

        // 日期对象
        var Days = function(year, month, date) {
            var nowDate = new Date();
            nowDate.setHours(0,0,0,0);

            if(arguments.length == 1 && Public.isDate(arguments[0])){
                this.stamp = arguments[0];
            } else {
                this.stamp = new Date(year, month - 1, date);      // 日期对象
            }

            this.stamp.setHours(0,0,0,0);

            this.year = this.stamp.getFullYear();              // 年
            this.month = this.stamp.getMonth() + 1;            // 月
            this.date = this.stamp.getDate();                  // 日
            this.day = this.stamp.getDay();                    // 星期
            this.outdate = this.stamp.getTime() - nowDate.getTime() < 0;     // 是否是过去时间
            this.isToday = !!(this.stamp.getTime() == nowDate.getTime());    // 是否是今天
        };
        Days.prototype = {
            constructor: Days,
            // 上一天
            prevDay: function() {
                return new Days(this.year, this.month, this.date - 1);
            },
            // 下一天
            nextDay: function() {
                return new Days(this.year, this.month, this.date + 1);
            },
            // 返回日期字符
            toString: function(format) {
                var _self = this;
                format = Public.isString(format) ? format : 'Y-M-D';
                return format
                    .replace(/y+/ig, _self.year)
                    .replace(/m+/g, _self.month)
                    .replace(/d+/g, _self.date)
                    .replace(/M+/g, _self.month < 10 ? '0' + _self.month: _self.month)
                    .replace(/D+/g, _self.date < 10 ? '0' + _self.date: _self.date);
            }
        };

        // 月份对象
        var Months = function(year, month) {
            // 默认为当前日期
            var date = new Date();
            date.setDate(1);
            Number(year) && date.setFullYear(year);
            date.setMonth(month - 1);

            this.month = date.getMonth() + 1;                               // 月份
            this.year = date.getFullYear();                                 // 月份
            this.daysNum = Public.getMonthDays(this.year, this.month);      // 月天数
            this.date = [];                                                 // 日期数组

            for(var i = 1; i <= this.daysNum; i++){
                var day = new Days(this.year, this.month, i);
                this.date.push(day);
                if(day.isToday){
                    this.today = day;
                }
            }
        };
        Months.prototype = {
            constructor: Months,
            // 按周返回月份日期 参数：设置每星期的第一天为星期几 0 - 6
            getWeek: function(startDay) {
                var week = [];                       // 星期数组
                var weekItem = [];                   // 每星期数组
                var date = this.date;                // 该月日期数组
                // 默认星期天为每周第一天
                startDay = Number(startDay) ? (startDay < 0 || startDay > 6) ? 0 : startDay : 0;
                week.push(weekItem);
                // 填补上一月日期
                if(date[0].day != startDay){
                    var addLength = startDay < date[0].day ? date[0].day - startDay : 7 - startDay + date[0].day;
                    var addDate = date[0];
                    while(addLength) {
                        addDate = addDate.prevDay();
                        weekItem.unshift(addDate);
                        addLength--;
                    }
                }
                // 将日期分组至每周
                for(var i = 0; i < date.length; i++){
                    weekItem.push(date[i]);
                    if(weekItem.length == 7 && i + 1 != date.length){
                        weekItem = [];
                        week.push(weekItem);
                    } else if(i + 1 == date.length){
                        // 填补下一月日期
                        addLength = 7 - weekItem.length;
                        addDate = date[i];
                        while(addLength) {
                            addDate = addDate.nextDay();
                            weekItem.push(addDate);
                            addLength--;
                        }
                    }
                }
                return week;
            },
            // 上一月
            prevMonth: function() {
                return new Months(this.year, this.month - 1);
            },
            // 下一月
            nextMonth: function() {
                return new Months(this.year, this.month + 1);
            }
        };

        return {
            // 获取日历对象
            getDate: function(year, month) {
                var monthObj = [];

                // 默认为当前月份
                month = Public.isArray(month) ? month : !isNaN(Number(month)) ? [month] : [(new Date()).getMonth() + 1];

                for(var i = 0; i < month.length; i++){
                    monthObj.push(new Months(year, month[i]));
                }

                return monthObj;
            }
        }
    })();

    /*
     * 语言包
     */
    var lang = {
        weekFormat: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        weekMin: ['日' , '一' , '二' , '三' , '四' , '五' , '六'],
        month: ['{yyyy}年 一月' , '{yyyy}年 二月' , '{yyyy}年 三月' , '{yyyy}年 四月' , '{yyyy}年 五月' , '{yyyy}年 六月' , '{yyyy}年 七月' , '{yyyy}年 八月' , '{yyyy}年 九月' , '{yyyy}年 十月' , '{yyyy}年 十一月' , '{yyyy}年 十二月']
    };

    /**
     * 日历对象
     */
    var Calendar = function(element, option) {
        this.element = element;    // 日历加载节点
        this.month = [];           // 当前显示的月份列表
        this.selectedDate = null;  // 当前选择日期
        this.showYear = null;      // 当前显示年份
        this.showMonth = null;     // 当前显示月份
        this.option = option;      // 设置参数
        this.minDate = this.getOptionDate(option.minDate);      // 最小日期
        this.maxDate = this.getOptionDate(option.maxDate);      // 最大日期
        this.interval = Number(option.interval) >= 0 ? Number(option.interval) : 1;      // 最小日期范围
        this.wrapId = 'ds-calendar-' + parseInt(Math.random() * 1E8);
        this.wrap = $('<div class="ds-calendar-wrapper">').attr('id', this.wrapId).hide().appendTo('body');    // 日历节点
        this.state = 'hide';
        this.init();
    };
    Calendar.prototype = {
        constructor: Calendar,

        // 获取设置最小/最大日期
        getOptionDate: function(optionDate) {
            var date = null;

            if(Public.isFunction(optionDate)){
                date = Public.getDateFromString(optionDate());
            } else if(Public.isDate(optionDate)) {
                optionDate.setHours(0, 0, 0, 0);
                date = optionDate;
            } else if(Public.isString(optionDate)) {
                date = Public.getDateFromString(optionDate);
            }  else if(optionDate.val) {
                date = Public.getDateFromString(optionDate.val());
            }

            return date;
        },

        // 获取显示的月份
        getDate: function() {
            var that = this;
            var defaultDate = $(that.element).val();      // 默认日期
            /\d{4}\W\d{1,2}\W\d{1,2}/.test(defaultDate) && (that.selectedDate = Public.getDateFromString(defaultDate));

            if(that.showYear == null || that.showMonth == null){
                that.showYear = (that.selectedDate || new Date()).getFullYear();
                that.showMonth = (that.selectedDate || new Date()).getMonth() + 1;
            }

            // 生成月份
            var month = timetable.getDate(that.showYear, that.showMonth)[0];

            that.month.length = 0;
            that.month.push(month);
            that.showYear = month.year;
            that.showMonth = month.month;
            while(that.month.length < that.option.size) {
                month = month.nextMonth();
                that.month.push(month);
            }

            // 筛选可选择日期
            $.each(that.month, function(i, month) {
                $.each(month.date, function(j, date) {
                    // 是否选中
                    date.selected = !!(that.selectedDate && date.stamp.getTime() == that.selectedDate.getTime());
                    // 是否可选
                    date.enabled = !!(that.filterDate(date.stamp) && that.isInRange(date.stamp));
                });
            });
        },

        // 判断日期是否符合筛选条件
        filterDate: function (stamp) {
            var that = this;
            var filter = that.option.filter;             // 筛选条件
            var year = stamp.getFullYear();              // 年
            var date = stamp.getDate();                  // 日
            var day = stamp.getDay();                    // 星期

            // 计算日期是否在范围内
            var checkDate = function(time, start, end) {
                if(start != null && end != null){
                    if(start <= end){
                        return time >= start && time <= end;
                    } else {
                        return time >= start || time <= end;
                    }
                } else if(start) {
                    return time >= start;
                } else if(end) {
                    return time <= end;
                } else {
                    return true;
                }
            };

            // 日期是否可用
            var enabled = checkDate(stamp, that.minDate, that.maxDate);

            // 日历筛选条件
            if(filter && filter.length){
                var isCheck = {
                    '0': [],                              // 有效
                    '1': []                               // 排除
                };
                $.each(filter, function(key, period) {
                    var start;
                    var end;
                    var time;

                    // 一次性 0  每年 1  每月 2  每周 3
                    switch(Number(period.period)) {
                        case 0:
                            time = stamp;
                            start = Public.getDateFromString(period.start) || null;
                            end = Public.getDateFromString(period.end) || null;
                            break;
                        case 1:
                            time = stamp;
                            start = Public.getDateFromString(year + '-' + period.start) || null;
                            end = Public.getDateFromString(year + '-' + period.end) || null;
                            break;
                        case 2:
                            time = date;
                            start = Number(period.start) || null;
                            end = Number(period.end) || null;
                            break;
                        case 3:
                            time = day;
                            start = Number(period.start) || 0;
                            end = Number(period.end) || 0;
                            break;
                    }
                    isCheck[String(period.period_type)].push(checkDate(time, start, end));
                });
                enabled = enabled && (!isCheck['0'].length || $.inArray(true, isCheck['0']) > -1) && (!isCheck['1'].length || $.inArray(true, isCheck['1']) == -1);
            }
            return enabled;
        },

        // 判断日期是否在可选范围内
        isInRange: function(stamp) {
            var that = this;
            var interval = that.interval;
            var prevDate = new Date(stamp);
            var nextDate = new Date(stamp);
            var range = 0;
            var flag = true;

            do {
                prevDate.setDate(prevDate.getDate() - 1);
                flag = that.filterDate(prevDate);
                range += Number(flag);
            } while (flag && range < interval);

            do {
                nextDate.setDate(nextDate.getDate() + 1);
                flag = that.filterDate(nextDate);
                range += Number(flag);
            } while (flag && range < interval);

            return range >= interval;
        },

        // 日历绘制函数
        renderCalendar: function() {
            var that = this;
            var calHtml = [];

            that.getDate();
            that.state = 'show';

            for(var i = 0, len = that.month.length; i < len; i++){
                var month = that.month[i];
                var week = month.getWeek(0);
                // 日历头
                if(i + 1 == len){
                    calHtml.push('<div class="ds-calendar-module ds-calendar-module-last">');
                } else {
                    calHtml.push('<div class="ds-calendar-module">');
                }
                calHtml.push('<table class="ds-table-calendar"><thead><tr class="ds-calendar-title">');
                // 上一月/上一年按钮
                if(i == 0){
                    calHtml.push('<th><a class="ds-btn-prev-year" href="javascript:;">&laquo;</a></th><th><a class="ds-btn-prev-month" href="javascript:;">&#8249;</a></th>');
                } else {
                    calHtml.push('<th>&nbsp;</th><th>&nbsp;</th>');
                }
                calHtml.push('<th colspan="3">'+ month.year + '/' + month.month  + '</th>');
                // 下一月/下一年按钮
                if(i + 1 == len){
                    calHtml.push('<th><a class="ds-btn-next-month" href="javascript:;">&#8250;</a></th><th><a class="ds-btn-next-year" href="javascript:;">&raquo;</a></th>');
                } else {
                    calHtml.push('<th>&nbsp;</th><th>&nbsp;</th>');
                }
                calHtml.push('</tr></tr><tr class="ds-calendar-weeks"><th>' + lang.weekMin[0] + '</th><th>' + lang.weekMin[1] + '</th><th>' + lang.weekMin[2] + '</th><th>' + lang.weekMin[3] + '</th><th>' + lang.weekMin[4] + '</th><th>' + lang.weekMin[5] + '</th><th>' + lang.weekMin[6] + '</th></tr></thead><tbody>');
                // 生成每周日期
                for(var j = 0; j < 6; j++){
                    calHtml.push('<tr>');
                    if(week[j]){
                        for(var k = 0; k < week[j].length; k++){
                            var date = week[j][k];
                            if(date.enabled && date.month == month.month) {
                                var a = '<a href="javascript:;" class="ds-state-default ' +
                                    (date.isToday ? 'ds-state-highlight ' : '') + (date.selected ? 'ds-state-active' : '') +
                                    '" data-date="' + date.toString() + '">' + date.date + '</a>';

                                calHtml.push('<td>' + a + '</td>');
                            } else {
                                calHtml.push('<td><span class="ds-state-disabled">' + date.date + '</span></td>');
                            }
                        }
                    } else {
                        calHtml.push('<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>');
                    }
                    calHtml.push('</tr>');
                }
                calHtml.push('</tbody></table></div>');
            }

            that.wrap.html(calHtml.join('')).show();
            that.getPosition();

            // IE6 下无法覆盖input问题
            if (window.ActiveXObject && (navigator.userAgent.indexOf('MSIE 6') > -1 && document.compatMode === 'CSS1Compat')) {
                var width = that.wrap.outerWidth();
                var height = that.wrap.outerHeight();
                var iframe = $('<iframe>');
                iframe.css({
                    'position': 'absolute',
                    'left': 0,
                    'top': 0,
                    'width': width,
                    'height': height,
                    'zIndex': -1
                }).appendTo(that.wrap);
            }

        },

        // 获取日历弹窗位置
        getPosition: function() {
            var that = this;
            var ele = that.element;
            var wrap = that.wrap;

            if(that.state == 'show'){
                wrap.css((function() {

                var width = Number(ele.outerWidth());
                var height = Number(ele.outerHeight());
                var left = Number(ele.offset().left);
                var top = Number(ele.offset().top);

                var calWidth = Number(wrap.width());
                var calHeight = Number(wrap.height());

                var pageWidth = Number($(document).scrollLeft() + $(window).width());
                var pageHeight = Number($(document).scrollTop() + $(window).height());

                var offsetLeft = left + calWidth > pageWidth ?
                    left + width - calWidth : left;
                var offsetTop = (top + height + calHeight > pageHeight) && (calHeight < top) ?
                    top - calHeight : top + height;

                return {
                    left: offsetLeft,
                    top: offsetTop,
                    position: 'absolute'
                };

                })());
            }

        },

        // 判断日期是否连续
        isContinuous: function(start, end) {
            var that = this;
            var isContinuous = true;
            var startStamp, endStamp;

            if(start.getTime() > end.getTime()){
                startStamp = new Date(end);
                endStamp = start.getTime();
            } else {
                startStamp = new Date(start);
                endStamp = end.getTime();
            }

            while(startStamp.getTime() <= endStamp) {
                if(!that.filterDate(startStamp)){
                    isContinuous = false;
                    break;
                }
                startStamp.setDate(startStamp.getDate() + 1);
            }

            return isContinuous;
        },

        // 设置关联日历日期
        setTargetDate: function(date) {
            var that = this;
            var startDateTarget = $(that.option.startDateTarget);
            var endDateTarget = $(that.option.endDateTarget);
            var interval = that.interval;

            // 设置关联节点的日期
            var setDate = function(target, gap) {
                var targetDate = new Date(date);
                var flag = (gap >= 0) ? -1 : 1;
                targetDate.setDate(targetDate.getDate() + gap);
                if(!(that.filterDate(targetDate) && that.isContinuous(targetDate, date))){
                    while(!(that.filterDate(targetDate) && that.isContinuous(targetDate, date))) {
                        targetDate.setDate(targetDate.getDate() + flag);
                        date.setDate(date.getDate() + flag);
                    }
                }
                target.val(Public.getDateString(targetDate, that.option.dateFormat)).trigger('change');
            };

            if(startDateTarget.size() && startDateTarget.get(0) != that.element.get(0)){
                // 开始日期节点
                var startDate = Public.getDateFromString(startDateTarget.val());
                (!startDate || startDate >= date || !that.isContinuous(startDate, date) || Public.getDaysNum(startDate, date) < interval)
                && setDate(startDateTarget, -interval);
            } else if(endDateTarget.size() && endDateTarget.get(0) != that.element.get(0)){
                // 结束日期节点
                var endDate = Public.getDateFromString(endDateTarget.val());
                (!endDate || endDate <= date || !that.isContinuous(date, endDate) || Public.getDaysNum(date, endDate) < interval)
                && setDate(endDateTarget, interval);
            }

            that.element.val(Public.getDateString(date, that.option.dateFormat)).trigger('change');
        },

        // 关闭日历
        hideCalendar: function() {
            this.state = 'hide';
            this.wrap.hide();
        },

        init: function() {
            var that = this;

            // 点击空白处关闭
            var closeCalender = function(e) {
                if (e.target != that.element.get(0) && !$(e.target).closest('#' + that.wrapId).size() && !$(e.target).hasClass('ds-icon-calendar')) {
                    that.hideCalendar();
                }
            };

            // 点击空白处关闭日历
            $(window.top.document).unbind('click.' + that.wrapId).bind('click.' + that.wrapId, closeCalender);
            $(document).unbind('click.' + that.wrapId).bind('click.' + that.wrapId, closeCalender);

            // resize 清除已保存的日历位置
            $(window).unbind('resize.' + that.wrapId + ' scroll.' + that.wrapId)
                .bind('resize.' + that.wrapId + ' scroll.' + that.wrapId, function() {
                    that.getPosition();
                });

            that.wrap
                // 日期点击事件
                .unbind('click.ds_cal_date')
                .on('click.ds_cal_date', '[data-date]', function() {
                    var date = Public.getDateFromString($(this).attr('data-date'));

                    that.selectedDate = date;
                    that.setTargetDate(date);
                    that.element.trigger('set_date');
                    that.hideCalendar();
                    that.option.onClose.call(that);
                })
                // 上一月
                .on('click.ds_cal_date', '.ds-btn-prev-month', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    that.showMonth--;
                    that.renderCalendar();
                })
                // 下一月
                .on('click.ds_cal_date', '.ds-btn-next-month', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    that.showMonth++;
                    that.renderCalendar();
                })
                // 上一年
                .on('click.ds_cal_date', '.ds-btn-prev-year', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    that.showYear--;
                    that.renderCalendar();
                })
                // 下一年
                .on('click.ds_cal_date', '.ds-btn-next-year', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    that.showYear++;
                    that.renderCalendar();
                });
        }
    };

    $.fn.DSCalendar = function (options){

        var option = $.extend({
            defaultDate: false,                 // 默认日期
            size: 2,                  // 日历个数，默认为双日历
            icon: true,               // 日历选择图标
            minDate: '',              // 最小日期: $('#start_date') | new Date | '2013-01-01'
            maxDate: '',              // 最大日期: $('#start_date') | new Date | '2013-01-01'
            filter: null,         // 在 minDate 与 maxDate 之间筛选可选日期
            dateFormat: 'Y-M-D w',    // 日期格式: y:年 m: 月 d: 日 w: 星期
            startDateTarget: null,    // 开始日期节点
            endDateTarget: null,      // 结束日期节点
            interval: 1,              // 开始日期与结束日期的间隔时间
            onClose: function (){}    // 选择日期回调函数
        }, options || {});

        return this.each(function() {
            var input = $(this);
            var cal = new Calendar(input, option);

            var showCalendar = function() {
                cal.showYear = null;
                cal.showMonth = null;
                cal.renderCalendar();
            };

            if (option.icon && input.siblings('i.ds-icon-calendar').size() == 0) {
                var icon = $('<i class="ds-icon ds-icon-calendar"></i>');
                input.after(icon);
                icon.unbind('click.render_cal').bind('click.render_cal', showCalendar);
            }
            input.unbind('click.render_cal').bind('click.render_cal', showCalendar);

            // 设置默认日期
            if(option.defaultDate){
                var date = new Date();
                var length = 365;
                var enable = false;
                date.setHours(0,0,0,0);
                while (!enable && --length) {
                    date.setDate(date.getDate() + 1);
                    enable = !!(cal.filterDate(date) && cal.isInRange(date));
                }
                if(enable){
                    cal.setTargetDate(date);
                }
            }
        });

    };
})();
