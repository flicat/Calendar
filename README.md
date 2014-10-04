####调用方法

    $('#star_date, #end_date').DSCalendar({
        size: 2,
        defaultDate: true,
        icon: true
    });

###参数

    defaultDate: false,         // 默认日期
    size: 2,                    // 日历个数，默认为双日历
    icon: false,                // 是否显示日历图标节点，默认不显示
    minDate: '',                // 日历可选的最小日期: $('#start_date') | new Date | '2013-01-01'
    maxDate: '',                // 日历可选的最大日期: $('#start_date') | new Date | '2013-01-01'
    filter: null,               // 在 minDate 与 maxDate 之间筛选可选日期  @filter
    dateFormat: 'y-m-d w',      // 日期格式: y:年 m: 月 d: 日 w: 星期
    startDateTarget: null,      // 开始日期节点，用于开始/结束日期表单
    interval: 1,                // 开始日期与结束日期的间隔时间
    endDateTarget: null,        // 结束日期节点，用于开始/结束日期表单
    onClose: function (){}      // 日期点击事件回调函数

    filter: [                   // 筛选规则，可以有多条，多条规则取交集
        {
            "period_type": "0", // 有效日期 0 / 排除日期 1
            "period": "1",      // 周期 一次性  0 每年 1  每月 2 每周 3
            "start": "6-1",     // 开始日期  格式：一次性(2014-01-01);每年(01-01);每月(31);每周(6);
            "end": "6-7"        // 结束日期  格式：一次性(2014-01-01);每年(01-01);每月(31);每周(6);
        },
        {
            "period_type": "0", // 有效日期 0 / 排除日期 1
            "period": "2",      // 周期 一次性  0 每年 1  每月 2 每周 3
            "start": 10,        // 开始日期  格式：一次性(2014-01-01);每年(01-01);每月(31);每周(6);
            "end": 20           // 结束日期  格式：一次性(2014-01-01);每年(01-01);每月(31);每周(6);
        }
    ]
