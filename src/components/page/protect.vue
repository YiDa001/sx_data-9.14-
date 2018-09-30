<template>
    <div class="protect">
        <div class="top">
            <span class="title">预防性保护</span>
            <div class="date">
                <el-date-picker
                    v-model="month"
                    type="month"
                    placeholder="这里选择月份"
                    :change="changeMonth(month)">
                </el-date-picker>
            </div>
        </div>
        <el-row :gutter="25" class="oneHeight">
            <el-col :span="8" class="part">
                <el-select v-model="value1" placeholder="请选择" @change="changeHall">
                    <el-option
                        v-for="item in options1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <div class="echarts_title">湿度调控对比图</div>
                <hr class="title_hr"/>
                <div class="grid-content bg-purple" id="temp"></div>
                <div class="enlarge" @click="enlarge"></div>
                <div class="narrow" @click="narrow"></div>
            </el-col>
            <el-col :span="8" class="part">
                <div class="echarts_title">本月环境参数报警</div>
                <hr class="title_hr"/>
                <div class="grid-content bg-purple" id="alarm"></div>
                <div class="enlarge" @click="enlarge"></div>
                <div class="narrow" @click="narrow"></div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple small_echarts" >
                    <el-row :gutter="20">
                        <el-col :span="12" class="part small_item">
                            <div class="small_ets_title">设备状态统计</div>
                            <div class="grid-content bg-purple" id="equip_status"></div>
                            <div class="enlarge" @click="enlarge"></div>
                            <div class="narrow" @click="narrow"></div>
                        </el-col>
                        <el-col :span="12" class="part small_item">
                            <div class="small_ets_title">设备数量统计</div>
                            <div class="grid-content bg-purple" id="equip_num"></div>
                            <div class="enlarge" @click="enlarge"></div>
                            <div class="narrow" @click="narrow"></div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12" class="part small_item">
                            <div class="small_ets_title">采集总数</div>
                            <div class="grid-content bg-purple" id="collect_num"></div>
                            <div class="enlarge" @click="enlarge"></div>
                            <div class="narrow" @click="narrow"></div>
                        </el-col>
                        <el-col :span="12" class="part small_item">
                            <div class="small_ets_title">下发总数</div>
                            <div class="grid-content bg-purple" id="hand_out"></div>
                            <div class="enlarge" @click="enlarge"></div>
                            <div class="narrow" @click="narrow"></div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="25" class="oneHeight">
            <el-col :span="8" class="part">
                <div class="echarts_title">环境达标率</div>
                <hr class="title_hr"/>
                <div class="grid-content bg-purple" id="environment"></div>
                <div class="enlarge" @click="enlarge"></div>
                <div class="narrow" @click="narrow"></div>
            </el-col>
            <el-col :span="8" class="part">
                <div class="echarts_title">温湿度极值</div>
                <div class="tab_btn">
                    <div class="tab_left"  @click="selected">温度</div>
                    <div class="tab_right" @click="selected">湿度</div>
                </div>
                <hr class="title_hr"/>
                <div class="grid-content bg-purple" id="extreme"></div>
                <div class="enlarge" @click="enlarge"></div>
                <div class="narrow" @click="narrow"></div>
            </el-col>
            <el-col :span="8" class="part">
                <el-select v-model="value2" placeholder="请选择" @change="changeCO2">
                    <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <div class="echarts_title">展厅CO2统计</div>
                <hr class="title_hr"/>
                <div class="grid-content bg-purple" id="CO2"></div>
                <div class="enlarge" @click="enlarge"></div>
                <div class="narrow" @click="narrow"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    //展厅展柜湿度数据
    var hall_humi = [62,64,66,64,62,60,63,68,70,61,70,72,74,60,65,
        68,65,67,60,62,71,75,73,71,68,66,68,65,67,66];
    var cabinet_humi = [54,55,54,55,54,54,54,56,56,55,55,54,56,55,55,
        55,55,54,54,57,54,56,55,54,57,55,55,56,54,56];
    var one_month = [];
    for (let i=1;i<=30;i++){
        if(i<10){
            i='0'+i;
        }
        let month = '09'+'-'+ i;
        one_month.push(month);
    }
    //报警数据
    var dataList = [
        ['2018-1-1'],['2018-1-2'],['2018-1-3'],['2018-1-4'],['2018-1-5'], ['2018-1-6'], ['2018-1-7'],['2018-1-8'],
        ['2018-1-9'],['2018-1-10'],['2018-1-11'],['2018-1-12'],['2018-1-13'],['2018-1-14'],['2018-1-15'],
        ['2018-1-16'],['2018-1-17'],['2018-1-18'],['2018-1-19'],['2018-1-20'],['2018-1-21'],['2018-1-22'],
        ['2018-1-23'],['2018-1-24'],['2018-1-25'],['2018-1-26'],['2018-1-27'],['2018-1-28'],['2018-1-29'],
        ['2018-1-30'],['2018-1-31'],['2018-2-1'],['2018-2-2'],['2018-2-3'],['2018-2-4'],['2018-2-5'],['2018-2-6'],
        ['2018-2-7'],['2018-2-8'],['2018-2-9'],['2018-2-10'],['2018-2-11'],['2018-2-12'],['2018-2-13'],
        ['2018-2-14'],['2018-2-15'],['2018-2-16'],['2018-2-17'],['2018-2-18',],['2018-2-19'],['2018-2-20'],
        ['2018-2-21'],['2018-2-22'],['2018-2-23'],['2018-2-24'],['2018-2-25'],['2018-2-26'],['2018-2-27'],
        ['2018-2-28'],['2018-3-1'],['2018-3-2'],['2018-3-3'],['2018-3-4'],['2018-3-5'],['2018-3-6'],['2018-3-7'],
        ['2018-3-8'],['2018-3-9'],['2018-3-10'],['2018-3-11'],['2018-3-12'],['2018-3-13'],['2018-3-14'],['2018-3-15'],
        ['2018-3-16'],['2018-3-17'],['2018-3-18'],['2018-3-19'],['2018-3-20'],['2018-3-21'],['2018-3-22'],
        ['2018-3-23'],['2018-3-24'],['2018-3-25'],['2018-3-26'],['2018-3-27'],['2018-3-28'],['2018-3-29'],
        ['2018-3-30'],['2018-3-31'],['2018-4-1'],['2018-4-2'],['2018-4-3'],['2018-4-4'],['2018-4-5'],['2018-4-6'],
        ['2018-4-7'],['2018-4-8'],['2018-4-9'],['2018-4-10'],['2018-4-11'],['2018-4-12'],['2018-4-13'],['2018-4-14'],
        ['2018-4-15'],['2018-4-16'],['2018-4-17'],['2018-4-18'],['2018-4-19'],['2018-4-20'],['2018-4-21'],
        ['2018-4-22'],['2018-4-23'],['2018-4-24'],['2018-4-25'],['2018-4-26'],['2018-4-27'],['2018-4-28'],
        ['2018-4-29'],['2018-4-30'],['2018-5-1'],['2018-5-2'],['2018-5-3'],['2018-5-4'],['2018-5-5'],['2018-5-6'],
        ['2018-5-7'],['2018-5-8'],['2018-5-9'],['2018-5-10'],['2018-5-11'],['2018-5-12'],['2018-5-13'],
        ['2018-5-14'],['2018-5-15'],['2018-5-16'],['2018-5-17'],['2018-5-18'],['2018-5-19'],['2018-5-20'],
        ['2018-5-21'],['2018-5-22'],['2018-5-23'],['2018-5-24'],['2018-5-25'],['2018-5-26'],['2018-5-27'],
        ['2018-5-28'],['2018-5-29'],['2018-5-30'],['2018-5-31'],['2018-6-1'],['2018-6-2'],['2018-6-3'],
        ['2018-6-4'],['2018-6-5'],['2018-6-6'],['2018-6-7'],['2018-6-8'],['2018-6-9'],['2018-6-10'],
        ['2018-6-11'],['2018-6-12'],['2018-6-13'],['2018-6-14'],['2018-6-15'],['2018-6-16'],['2018-6-17'],
        ['2018-6-18'],['2018-6-19'],['2018-6-20'],['2018-6-21'],['2018-6-22'],['2018-6-23'],['2018-6-24'],
        ['2018-6-25'],['2018-6-26'],['2018-6-27'],['2018-6-28'],['2018-6-29'],['2018-6-30'],['2018-7-1',],
        ['2018-7-2'],['2018-7-3'],['2018-7-4'],['2018-7-5'],['2018-7-6'],['2018-7-7'],['2018-7-8'],
        ['2018-7-9'],['2018-7-10'],['2018-7-11'],['2018-7-12'],['2018-7-13'],['2018-7-14'],['2018-7-15'],['2018-7-16'],
        ['2018-7-17'],['2018-7-18'],['2018-7-19'],['2018-7-20'],['2018-7-21'],['2018-7-22'],['2018-7-23'],['2018-7-24'],
        ['2018-7-25'],['2018-7-26'],['2018-7-27'],['2018-7-28'],['2018-7-29'],['2018-7-30'],['2018-7-31'],
        ['2018-8-1'],['2018-8-2'],['2018-8-3'],['2018-8-4'],['2018-8-5'],['2018-8-6'],['2018-8-7'],
        ['2018-8-8'],['2018-8-9'],['2018-8-10'],['2018-8-11'],['2018-8-12'],['2018-8-13'],['2018-8-14'],
        ['2018-8-15'],['2018-8-16'],['2018-8-17'],['2018-8-18'],['2018-8-19'],['2018-8-20'],['2018-8-21'],
        ['2018-8-22'],['2018-8-23'],['2018-8-24'],['2018-8-25'],['2018-8-26'],['2018-8-27'],['2018-8-28'],
        ['2018-8-29'],['2018-8-30'],['2018-8-31'],['2018-9-1'],['2018-9-2'],['2018-9-3'],['2018-9-4'],
        ['2018-9-5'],['2018-9-6'],['2018-9-7'],['2018-9-8'],['2018-9-9'],['2018-9-10'], ['2018-9-11'],
        ['2018-9-12'],['2018-9-13'],['2018-9-14'],['2018-9-15'],['2018-9-16'],['2018-9-17'],['2018-9-18'],
        ['2018-9-19'],['2018-9-20'],['2018-9-21'],['2018-9-22'],['2018-9-23'],['2018-9-24'],['2018-9-25'],
        ['2018-9-26'],['2018-9-27'],['2018-9-28'],['2018-9-29'],['2018-9-30'],['2018-10-1'],['2018-10-2'],
        ['2018-10-3'],['2018-10-4'],['2018-10-5'],['2018-10-6'],['2018-10-7'],['2018-10-8'],['2018-10-9'],
        ['2018-10-10'],['2018-10-11'],['2018-10-12'],['2018-10-13'],['2018-10-14'],['2018-10-15'],
        ['2018-10-16'],['2018-10-17'],['2018-10-18'],['2018-10-19'],['2018-10-20'],['2018-10-21'],
        ['2018-10-22'],['2018-10-23'],['2018-10-24'],['2018-10-25'],['2018-10-26'],['2018-10-27'],
        ['2018-10-28'],['2018-10-29'],['2018-10-30'],['2018-10-31'],['2018-11-1'],['2018-11-2'],
        ['2018-11-3'],['2018-11-4'],['2018-11-5'],['2018-11-6'],['2018-11-7'],['2018-11-8'],
        ['2018-11-9'],['2018-11-10'],['2018-11-11'],['2018-11-12'],['2018-11-13'],['2018-11-14'],
        ['2018-11-15'],['2018-11-16'],['2018-11-17'],['2018-11-18'],['2018-11-19'],['2018-11-20'],
        ['2018-11-21'],['2018-11-22'],['2018-11-23'],['2018-11-24'],['2018-11-25'],['2018-11-26'],
        ['2018-11-27'],['2018-11-28'],['2018-11-29'],['2018-11-30'],['2018-12-1'],['2018-12-2'],
        ['2018-12-3'],['2018-12-4'],['2018-12-5'],['2018-12-6'],['2018-12-7'],['2018-12-8'],
        ['2018-12-9'],['2018-12-10'],['2018-12-11'],['2018-12-12'],['2018-12-13'],['2018-12-14'],
        ['2018-12-15'],['2018-12-16'],['2018-12-17'],['2018-12-18'],['2018-12-19'],['2018-12-20'],
        ['2018-12-21'],['2018-12-22'],['2018-12-23'],['2018-12-24'],['2018-12-25'],['2018-12-26'],['2018-12-27'],
        ['2018-12-28'],['2018-12-29'],['2018-12-30'],['2018-12-31']
    ];
    var alarm_num =[3599,2300,1260,4300,4100,4123,2603,1230,1482,1000,1302,300,500,600,132,4000,1000,132,321,2360,
                    132,510,4100,4231,4000,1560,1563,1200,1300,1400,100,822,644,463,2314,2364,120,140,300,895,
                    321,4200,421,4330,1234,1326,1234,1546,2356,2463,2100,2310,231,2148,525,520,120,300,3460,2100,
                    132,510,4100,4231,4000,1560,1563,1200,1300,1400,100,822,644,463,2314,2364,120,140,300,895,
                    568,4520,4300,1230,654,340,120,510,4320,3800,364,3522,1234,1654,2100,3241,4652,120,321,4560,
                    321,4200,421,4330,1234,1326,1234,1546,2356,2463,2100,2310,231,2148,525,520,120,300,3460,2100,
                    132,510,4100,4231,4000,1560,1563,1200,1300,1400,100,822,644,463,2314,2364,120,140,300,895,
                    321,4200,421,4330,1234,1326,1234,1546,2356,2463,2100,2310,231,2148,525,520,120,300,3460,2100,
                    3599,2300,1260,4300,4100,4123,2603,1230,1482,1000,1302,300,500,600,132,4000,1000,132,321,2360,
                    132,510,4100,4231,4000,1560,1563,1200,1300,1400,100,822,644,463,2314,2364,120,140,300,895,
                    3599,2300,1260,4300,4100,4123,2603,1230,1482,1000,1302,300,500,600,132,4000,1000,132,321,2360,
                    321,4200,421,4330,1234,1326,1234,1546,2356,2463,2100,2310,231,2148,525,520,120,300,3460,2100,
                    132,510,4100,4231,4000,1560,1563,1200,1300,1400,100,822,644,463,2314,2364,120,140,300,895,
                    321,4200,421,4330,1234,1326,1234,1546,2356,2463,2100,2310,231,2148,525,520,120,300,3460,2100,
                    132,510,4100,4231,4000,1560,1563,1200,1300,1400,100,822,644,463,2314,2364,120,140,300,895,
                    321,4200,421,4330,1234,1326,1234,1546,2356,2463,2100,2310,231,2148,525,520,120,300,3460,2100,
                    568,4520,4300,1230,654,340,120,510,4320,3800,364,3522,1234,1654,2100,3241,4652,120,321,4560,
                    321,4200,421,4330,1234,1326,1234,1546,2356,2463,2100,2310,231,2148,525,520,120,300,3460,2100,
                    4510,360,120,780,3210
    ];
    var heatmapData = [];
    let lunarData = [];
    for (let i=0;i<365;i++){
        heatmapData.push([
            dataList[i][0],
            alarm_num[i]
        ]);
        lunarData.push([
            dataList[i][0],
            1
        ]);
    }


    //环境达标率数据
    var all_rate = [98,98,97,96,98,95,92,90,96,91,90,89,88,89,85,95,96,94,92,93,91,95,94,96,95,96,96,94,95,94];
    var hall_rate = [92,88,86,85,88,95,92,95,96,92,98,91,89,90,85,95,92,97,96,93,92,94,89,93,95,94,88,95,94,96];
    var cabinet_rate = [88,95,96,94,95,95,93,96,95,97,99,95,95,91,92,93,92,90,94,90,90,95,88,95,94,93,90,94,92,94];
    var store_rate = [90,92,91,93,94,92,91,93,94,93,95,95,96,98,95,95,92,97,93,94,95,98,92,88,92,94,98,92,92,90];
    //温湿度极值数据
    var extreme_month = [];
    var extreme_type ='温度';
    for (let i=1;i<=30;i++){
        if(i<10){
            i='0'+i;
        }
        let extreme_month_string = '2018'+'-'+'09'+'-'+ i;
        extreme_month.push(extreme_month_string);
    }
    var extreme_data = [
        [35, 29, 25, 37],[39, 30, 28, 38],[33, 38, 29, 39],[36, 30, 29, 38],[32, 21, 31, 20],
        [33, 38, 33, 40],[32, 23, 30, 38],[24, 28, 32, 38],[32, 34, 36, 22],[32, 21, 31, 20],
        [20, 30, 18, 35],[22, 35, 30, 38],[33, 20, 33, 37],[30, 20, 32, 31],[32, 21, 31, 20],
        [20, 30, 19, 35],[33, 26, 33, 21],[33, 38, 33, 38],[26, 34, 31, 38],[28, 26, 20, 22],
        [33, 24, 35, 22],[36, 35, 30, 37],[26, 34, 25, 33],[25, 36, 32, 38],[32, 21, 31, 20],
        [20, 30, 19, 35],[30, 38, 30, 39],[24, 20, 30, 22],[33, 38, 33, 36],[32, 21, 31, 20],
        [22, 30, 20, 35],[28, 35, 20, 37],[26, 24, 33, 29],[23, 35, 22, 37],[32, 21, 31, 20],
    ];
    var volumes =[8,9,8,6,5,3,2,9,5,6,4,3,5,4,6,5,6,5,3,8,5,4,6,4,5,3,5,6,2,3];

    //CO2数据
    var CO2_data = [
    [555, 850, 940, 980, 1070],[666, 800, 845, 885, 960],[777, 840, 855, 880, 940],[888, 767.5, 815, 865, 920],[756, 800, 845, 885, 960],
    [756, 740, 807.5, 810, 870, 950],[776, 800, 845, 885, 960],[856, 767.5, 815, 865, 920],[700, 840, 855, 880, 940],[762, 767.5, 815, 865, 920],
    [688, 850, 940, 980, 1070],[692, 740, 807.5, 810, 870, 950],[720, 767.5, 815, 865, 920],[713, 740, 807.5, 810, 870, 950],[689, 800, 845, 885, 960],
    [688, 740, 807.5, 810, 870, 950],[692, 800, 845, 885, 960],[634, 740, 807.5, 810, 870, 950],[762, 800, 845, 885, 960],[654, 740, 807.5, 810, 870, 950],
    [720, 767.5, 815, 865, 920],[746, 800, 845, 885, 960],[820, 840, 855, 880, 940],[766, 800, 845, 885, 960],[743, 767.5, 815, 865, 920],
    [652, 800, 845, 885, 960],[666, 767.5, 815, 865, 920],[820, 850, 940, 980, 1070],[764, 800, 845, 885, 960],[735, 767.5, 815, 865, 920],
    ];

    export default {
        name: 'protect',
        data() {
            return {
                options1: [
                    {
                        value: '1',
                        label: '壮丽三峡厅—001柜'
                    },
                    {
                        value: '2',
                        label: '壮丽三峡厅—002柜'
                    }],
                value1:'',
                options2: [
                    {
                        value: '1',
                        label: '壮丽三峡厅'
                    },
                    {
                        value: '2',
                        label: '远古巴渝厅'
                    }],
                value2:'',
                month:''
            }
        },
        mounted(){
            this.drawLine();
        },
        methods: {
            drawLine(){
                let This = this;

                //湿度调控对比
                let temp = this.$echarts.init(document.getElementById('temp'));
                temp.setOption({
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['展厅湿度','展柜湿度'],
                        textStyle:{
                            color:'#666'
                        },
                        bottom: '2%'
                    },
                    grid: {
                        top: '19%',
                        left: '3%',
                        right: '4%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        axisTick: {show: false},//去掉刻度线
                        axisLine:{
                            lineStyle:{
                                color:'#a9acb1'
                            }
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#666'
                            }
                        },
                        data: one_month
                    },
                    yAxis: {
                        type: 'value',
                        boundaryGap: false,
                        axisTick: {
                            show: false     //去掉刻度
                        },
                        axisLine:{
                            lineStyle:{
                                color:'#a9acb1'
                            }
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#666'
                            }
                        }
                    },
                    series: [
                        {
                            name:'展厅湿度',
                            type:'line',
                            color:'#4381e6',
                            data:hall_humi
                        },
                        {
                            name:'展柜湿度',
                            type:'line',
                            color:'#ff1d5b',
                            data:cabinet_humi
                        },

                    ]
                });

                //环境参数报警
                let alarm = this.$echarts.init(document.getElementById('alarm'));
                alarm.setOption({
                    tooltip: {
                        formatter: function (params) {
                            return '报警次数: ' + params.value[1].toFixed(0);
                        }
                    },
                    visualMap: {
                        show: false,
                        min: 0,
                        max: 5000,
                        calculable: true,
                        seriesIndex: [2],
                        orient: 'horizontal',
                        left: 'center',
                        bottom: 20,
                        inRange: {
                            color: ['#fff', '#ff1d5b'],
                            opacity: 1
                        },
                        // controller: {
                        //     inRange: {
                        //         opacity: 1
                        //     }
                        // }
                    },
                    calendar: [{
                        left: '5%',
                        right:'5%',
                        top: '29%',
                        bottom:'5%',
                        itemStyle:{
                            borderWidth:0    //方格线
                        },
                        splitLine:{         //外边框线
                          show:false,
                        },
                        cellSize: [60,60],
                        yearLabel: {show: false},
                        orient: 'vertical',
                        dayLabel: {
                            firstDay: 1,
                            nameMap: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                            color:'#666'
                        },
                        monthLabel: {
                            show: false
                        },
                        range: '2018-01'
                    }],

                    series: [{
                        type: 'scatter',
                        coordinateSystem: 'calendar',
                        symbolSize: 1,
                        label: {
                            normal: {
                                show: true,
                                formatter: function (params) {
                                    var d = This.$echarts.number.parseDate(params.value[0]);
                                    return d.getDate();
                                },
                                textStyle: {
                                    color: '#666',
                                    // fontWeight:'bold'
                                }
                            }
                        },
                        data: lunarData
                    }, {
                        type: 'scatter',
                        coordinateSystem: 'calendar',
                        symbolSize: 1,
                        label: {
                            normal: {
                                show: false,
                                formatter: function (params) {
                                    return '\n\n\n' + (params.value[3] || '');
                                },
                                textStyle: {
                                    fontSize: 12,
                                    fontWeight: 700,
                                    color: '#a00'
                                }
                            }
                        },
                        data: dataList
                    }, {
                        name: '报警次数',
                        type: 'heatmap',
                        coordinateSystem: 'calendar',
                        data: heatmapData
                    }
                    ]
                });

                //环境达标率
                let environment = this.$echarts.init(document.getElementById('environment'));
                environment.setOption({
                    grid: {
                        top: '29%',
                        left: 0,
                        right: '4%',
                        containLabel: true
                    },
                    color: ['#4381e6', '#61d675', '#ff1d5b', '#ffd822'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: ['整馆', '展厅', '展柜', '库房'],
                        textStyle:{
                            color:'#666'
                        },
                        bottom: '2%'
                    },
                    toolbox: {
                        show: true,
                        orient: 'vertical',
                        left: 'right',
                        top: 'center',

                    },
                    dataZoom: [{
                        type: 'slider',
                        xAxisIndex: 0,
                        realtime: false,
                        start: 50,
                        end: 70,
                        top: '19%',
                        height: 20,
                        handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                        handleSize: '120%'
                    },{
                            type: 'inside',
                            xAxisIndex: 0,
                            start: 50,
                            end: 70,
                            top: 30,
                            height: 20
                        }
                    ],
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            axisTick: {show: false},
                            data: one_month,
                            axisLine:{
                                lineStyle:{
                                    color:'#a9acb1'
                                }
                            },
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: '#666'
                                }
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            axisTick: {show: false},
                            axisLine:{
                                lineStyle:{
                                    color:'#a9acb1'
                                }
                            },
                            axisLabel: {
                                show: true,
                                interval: 'auto',
                                formatter: '{value} %',
                                textStyle:{
                                    color:'#666'
                                }
                            },
                        }
                    ],
                    series: [
                        {
                            name: '整馆',
                            type: 'bar',
                            data: all_rate
                        },
                        {
                            name: '展厅',
                            type: 'bar',
                            data: hall_rate
                        },
                        {
                            name: '展柜',
                            type: 'bar',
                            data: cabinet_rate
                        },
                        {
                            name: '库房',
                            type: 'bar',
                            data: store_rate
                        }
                    ]
                });

                //温湿度极值
                let extreme = this.$echarts.init(document.getElementById('extreme'));
                extreme.setOption({
                    animation: false,
                    // color: colorList,
                    // legend: {
                    //     data: extreme_type,
                    //     textStyle:{
                    //         color:'#666'
                    //     },
                    //     bottom: '2%'
                    // },
                    tooltip: {
                        triggerOn: 'none',
                        transitionDuration: 0,
                        confine: true,
                        bordeRadius: 4,
                        borderWidth: 1,
                        borderColor: '#333',
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        textStyle: {
                            fontSize: 12,
                            color: '#333'
                        },
                        // position: function (pos, params, el, elRect, size) {
                        //     let obj = {
                        //         top: 60
                        //     };
                        //     obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                        //     return obj;
                        // }
                    },
                    axisPointer: {
                        link: [{
                            xAxisIndex: [0, 1]
                        }]
                    },
                    dataZoom: [{
                        type: 'slider',
                        xAxisIndex: [0, 1],
                        realtime: false,
                        start: 20,
                        end: 70,
                        top: '19%',
                        height: 20,
                        handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                        handleSize: '120%'
                    }, {
                        type: 'inside',
                        xAxisIndex: [0, 1],
                        start: 40,
                        end: 70,
                        top: 30,
                        height: 20
                    }],
                    xAxis: [{
                        type: 'category',
                        data: extreme_month,
                        boundaryGap : false,
                        axisLine:{
                            lineStyle:{
                                color:'#a9acb1'
                            }
                        },
                        axisTick: {show: false},
                        axisLabel: {
                            formatter: function (value) {
                                return This.$echarts.format.formatTime('MM-dd', value);
                            },
                            textStyle: {
                                color: '#666'
                            }
                        },
                        min: 'dataMin',
                        max: 'dataMax',
                        axisPointer: {
                            show: true
                        }
                    }, {
                        type: 'category',
                        gridIndex: 1,
                        data: extreme_month,
                        scale: true,
                        boundaryGap : false,
                        splitLine: {show: false},
                        axisLabel: {show: false},
                        axisTick: {show: false},
                        axisLine:{
                            lineStyle:{
                                color:'#a9acb1'
                            }
                        },
                        splitNumber: 20,
                        min: 'dataMin',
                        max: 'dataMax',
                        axisPointer: {
                            type: 'shadow',
                            label: {show: false},
                            triggerTooltip: true,
                            handle: {
                                show: true,
                                size:25,
                                margin: 15,
                                color: '#ff1d5b',
                            }
                        }
                    }],
                    yAxis: [{
                        scale: true,
                        splitNumber: 2,
                        axisLine:{
                            lineStyle:{
                                color:'#a9acb1'
                            }
                        },
                        splitLine: { show: true },
                        axisTick: { show: false },
                        axisLabel: {
                            inside: true,
                            formatter: '{value}\n',
                            verticalAlign:'middle',
                            textStyle: {
                                color: '#666'
                            }
                        }
                    }, {
                        scale: true,
                        gridIndex: 1,
                        splitNumber: 2,
                        axisLabel: {show: false},
                        axisLine: {show: false},
                        axisTick: {show: false},
                        splitLine: {show: false}
                    }],
                    grid: [{
                        top: '30%',
                        left: '3%',
                        right: '4%',
                        height: '45%'
                    }, {
                        bottom:'9%',
                        left: '3%',
                        right: '4%',
                        height: '10%',
                    }],
                    graphic: [{
                        type: 'group',
                        left: 'center',
                        top: 70,
                        width: 300,
                        bounding: 'raw',
                    }],
                    series: [{
                        name: '波动量',
                        type: 'bar',
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        itemStyle: {
                            normal: {
                                color: '#7fbe9e'
                            }
                        },
                        data: volumes
                    }, {
                        type: 'candlestick',
                        name: extreme_type,
                        data: extreme_data,
                        itemStyle: {
                            normal: {
                                color: '#ff1d5b',
                                color0: '#4381e6',
                            }
                        }
                    }]
                });

                //展厅CO2统计
                let CO2 = this.$echarts.init(document.getElementById('CO2'));
                CO2.setOption({
                    color:['#ff1d5b'],
                    tooltip: {
                        trigger: 'item',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: ['CO2'],
                        textStyle:{
                            color:'#666'
                        },
                        bottom: '2%'
                    },
                    grid: {
                        top: '19%',
                        left: '3%',
                        right: '4%',
                        height:'70%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        data: one_month,
                        boundaryGap: true,
                        axisTick: {show: false},
                        axisLine:{
                            lineStyle:{
                                color:'#a9acb1'
                            }
                        },
                        nameGap: 30,
                        splitArea: {
                            show: false
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#666'
                            }
                        },
                        splitLine: {
                            show: false
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisTick: {show: false},
                        axisLine:{
                            lineStyle:{
                                color:'#a9acb1'
                            }
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#666'
                            }
                        },
                        splitArea: {
                            show: true
                        }
                    },
                    series: [
                        {
                            name: 'CO2',
                            type: 'boxplot',
                            data: CO2_data,
                            tooltip: {
                                formatter: function (param) {
                                    return [
                                        param.name + ': ',
                                        '上边缘: ' + param.data[5],
                                        '上四分位数: ' + param.data[4],
                                        '中位数: ' + param.data[3],
                                        '下四分位数: ' + param.data[2],
                                        // '异常值: ' + param.data[1]
                                    ].join('<br/>')
                                }
                            },
                        },
                    ]
                });

                //设备状态
                let equip_status = this.$echarts.init(document.getElementById('equip_status'));
                equip_status.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    color:['#ff1d5b','#50d166'],
                    grid: {
                        top: '19%',
                        left: '3%',
                        right: '4%',
                        // bottom:'18%',
                        containLabel: true
                    },
                    legend: {
                        data:['异常','正常'],
                        textStyle:{
                            color:'#666'
                        },
                        bottom: '2%'
                    },
                    series: [
                        {
                            name:'设备状态',
                            type:'pie',
                            radius: ['38%', '58%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    formatter:'{c}',
                                    textStyle: {
                                        fontSize: '16',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {
                                    value:20,
                                    name:'异常',
                                    color:'#ff1d5b'
                                },
                                {
                                    value:401,
                                    name:'正常',
                                    color:'#50d166'
                                }
                            ]
                        }
                    ]
                });

                //设备数量
                let equip_num = this.$echarts.init(document.getElementById('equip_num'));
                equip_num.setOption({
                    tooltip: {
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        top: '19%',
                        left: '3%',
                        right: '18%',
                        bottom:'4%',
                        containLabel: true
                    },
                    xAxis: {
                        splitLine:{
                            show: false
                        },
                        type: 'value',
                        axisLabel: {
                            show: false
                        },
                        axisLine:{
                            show: false
                        },
                        axisTick:{
                            show:false
                        },
                    },
                    yAxis: {
                        splitLine:{show: false},
                        type: 'category',
                        data: ['主动调控','仅监测','网络设备'],
                        axisLine:{
                            show:false
                        },
                        axisTick:{       //y轴刻度线
                            show:false
                        },
                        axisLabel: {
                            color: "#666",
                            textStyle: {
                                fontSize:12,
                                color: '#666'
                            },
                            interval: 0,
                            formatter: function(value) {
                                if (value.length > 4) {
                                    return value.substring(0, 4) + "...";
                                } else {
                                    return value;
                                }
                            }
                        }
                    },
                    series: [
                        {
                            type: 'bar',
                            data: [31,283,107],
                            // barWidth: 16,
                            textStyle:{
                                fontSize:18
                            },
                            itemStyle: {
                                normal: {
                                    color: '#4381e6',
                                    label: {
                                        show: true,
                                        position: 'right',
                                        textStyle: {
                                            fontSize:15,
                                            color: '#4381e6'
                                        }
                                    }
                                }
                            }
                        }
                    ]
                });

                //采集数量
                let collect_num = this.$echarts.init(document.getElementById('collect_num'));
                collect_num.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c}"
                    },
                    grid: {
                        top: '19%',
                        left: '3%',
                        right: '4%',
                        containLabel: true
                    },
                    series: [
                        {
                            name:'传感器数据',
                            type:'pie',
                            color:'#4381e6',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    formatter:'{c}',
                                    show: true,
                                    position: 'center',
                                    textStyle: {
                                        fontSize: '15',
                                        fontWeight: 'bold'
                                    }
                                },
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {value:25564884, name:'采集总数'}
                            ]
                        }
                    ]
                });

                //下发数量
                let hand_out = this.$echarts.init(document.getElementById('hand_out'));
                hand_out.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c}"
                    },
                    series: [
                        {
                            name:'传感器数据',
                            type:'pie',
                            color:'#50d166',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    formatter:'{c}',
                                    show: true,
                                    position: 'center',
                                    textStyle: {
                                        fontSize: '15',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {value:122, name:'下发总数'}
                            ]
                        }
                    ]
                });

                let chartArray = [temp,alarm,environment,extreme,CO2,equip_status,
                    equip_num, collect_num,hand_out];
                window.onresize=function(){
                    for(let i=0;i<chartArray.length;i++){
                        chartArray[i].resize();
                    }
                };

            },
            enlarge(e){
                let full_width = $('.oneHeight').width();
                let full_height = $('.oneHeight').height();
                let margin = parseInt($('.oneHeight').css('marginBottom'));
                let $nowEcharts = $(e.currentTarget).siblings('.grid-content');    //当前echarts
                let $container =$(e.currentTarget).parent('.part');             //当前echarts容器
                let $smallEcharts = $(e.currentTarget).parents('.small_echarts'); //当前小型echarts（由于.grid-content隐藏使得小echarts被隐藏）
                //将当前echarts宽高存入缓存,便于后面恢复宽高
                let now_width = $container.width();
                let now_height = $container.height();
                sessionStorage.setItem('now_width',now_width);
                sessionStorage.setItem('now_height',now_height);
                $(e.currentTarget).hide();                       //隐藏当前放大图标
                $('.grid-content').hide();                       //隐藏所有echarts
                $('.part').hide();                               //隐藏所有echarts容器
                $container.show();                               //显示当前echarts容器
                $nowEcharts.show();                              //显示当前echarts
                $smallEcharts.show();                           //显示当前小echarts
                $(e.currentTarget).siblings('.narrow').show();  //显示当前缩小图标
                //设置当前echarts容器的宽高
                $container.width(full_width);
                $container.height(full_height*2+margin);
                $nowEcharts.resize();                           //重置当前echarts
                $smallEcharts.resize();
            },
            narrow(e){
                let $container =$(e.currentTarget).parent('.part');                 //当前echarts容器
                let $nowEcharts = $(e.currentTarget).siblings('.grid-content');    //当前echarts
                $(e.currentTarget).hide();                              //隐藏当前缩小图标
                $container.hide();                                      //隐藏当前echarts容器
                $nowEcharts.hide();                                     //隐藏当前echarts
                $('.part').show();                                      //显示所有echarts容器
                $('.grid-content').show();                              //显示所有echarts
                $(e.currentTarget).siblings('.enlarge').show();         //恢复当前放大图标display属性
                //恢复当前echarts容器的宽高
                let now_width = sessionStorage.getItem('now_width');
                let now_height = sessionStorage.getItem('now_height');
                $container.width(now_width);
                $container.height(now_height);
                $nowEcharts.resize();                           //重置当前echarts
            },
            changeHall:function (value) {
                if(value==1){
                    hall_humi = [62,64,66,64,62,60,63,68,70,61,70,72,74,60,65,
                        68,65,67,60,62,71,75,73,71,68,66,68,65,67,66];
                    cabinet_humi = [54,55,54,55,54,54,54,56,56,55,55,54,56,55,55,
                        55,55,54,54,57,54,56,55,54,57,55,55,56,54,56];
                    this.drawLine();
                }else if(value==2){
                    hall_humi = [66,68,60,72,71,74,75,63,60,62,61,65,66,60,65,
                        72,70,63,66,64,62,70,75,74,74,62,65,65,64,66];
                    cabinet_humi = [55,54,56,55,54,55,55,55,56,57,56,55,54,54,56,
                        54,55,54,56,54,55,56,55,56,54,56,56,54,55,56];
                    this.drawLine();
                }else {
                    return false;
                }
            },
            changeCO2:function (value) {
                if(value==1){
                    CO2_data = [
                        [555, 850, 940, 980, 1070],[666, 800, 845, 885, 960],[777, 840, 855, 880, 940],[888, 767.5, 815, 865, 920],[756, 800, 845, 885, 960],
                        [756, 740, 807.5, 810, 870, 950],[776, 800, 845, 885, 960],[856, 767.5, 815, 865, 920],[700, 840, 855, 880, 940],[762, 767.5, 815, 865, 920],
                        [688, 850, 940, 980, 1070],[692, 740, 807.5, 810, 870, 950],[720, 767.5, 815, 865, 920],[713, 740, 807.5, 810, 870, 950],[689, 800, 845, 885, 960],
                        [688, 740, 807.5, 810, 870, 950],[692, 800, 845, 885, 960],[634, 740, 807.5, 810, 870, 950],[762, 800, 845, 885, 960],[654, 740, 807.5, 810, 870, 950],
                        [720, 767.5, 815, 865, 920],[746, 800, 845, 885, 960],[820, 840, 855, 880, 940],[766, 800, 845, 885, 960],[743, 767.5, 815, 865, 920],
                        [652, 800, 845, 885, 960],[666, 767.5, 815, 865, 920],[820, 850, 940, 980, 1070],[764, 800, 845, 885, 960],[735, 767.5, 815, 865, 920],
                    ];
                    this.drawLine();
                }else if(value==2){
                    CO2_data = [
                        [666, 800, 845, 885, 960],[820, 850, 940, 980, 1070],[777, 840, 855, 880, 940],[888, 767.5, 815, 865, 920],[756, 800, 845, 885, 960],
                        [756, 740, 807.5, 810, 870, 950],[820, 850, 940, 980, 1070],[689, 800, 845, 885, 960],[700, 840, 855, 880, 940],[762, 767.5, 815, 865, 920],
                        [688, 850, 940, 980, 1070],[666, 800, 845, 885, 960],[720, 767.5, 815, 865, 920],[820, 850, 940, 980, 1070],[689, 800, 845, 885, 960],
                        [688, 740, 807.5, 810, 870, 950],[692, 800, 845, 885, 960],[666, 800, 845, 885, 960],[762, 800, 845, 885, 960],[654, 740, 807.5, 810, 870, 950],
                        [720, 767.5, 815, 865, 920],[666, 800, 845, 885, 960],[820, 840, 855, 880, 940],[766, 800, 845, 885, 960],[820, 850, 940, 980, 1070],
                        [666, 800, 845, 885, 960],[666, 767.5, 815, 865, 920],[820, 850, 940, 980, 1070],[689, 800, 845, 885, 960],[735, 767.5, 815, 865, 920],
                    ];
                    this.drawLine();
                }
            },
            selected(e){
                $(e.currentTarget).siblings().css({backgroundColor:'#f0f3fa',color:'#666'});
                $(e.currentTarget).css({backgroundColor:'#4381e6',color:'#fff'});
                if($(e.currentTarget).index()==0){
                    extreme_data = [
                        [35, 29, 25, 37],[39, 30, 28, 38],[33, 38, 29, 39],[36, 30, 29, 38],[32, 21, 31, 20],
                        [33, 38, 33, 40],[32, 23, 30, 38],[24, 28, 32, 38],[32, 34, 36, 22],[32, 21, 31, 20],
                        [20, 30, 18, 35],[22, 35, 30, 38],[33, 20, 33, 37],[30, 20, 32, 31],[32, 21, 31, 20],
                        [20, 30, 19, 35],[33, 26, 33, 21],[33, 38, 33, 38],[26, 34, 31, 38],[28, 26, 20, 22],
                        [33, 24, 35, 22],[36, 35, 30, 37],[26, 34, 25, 33],[25, 36, 32, 38],[32, 21, 31, 20],
                        [20, 30, 19, 35],[30, 38, 30, 39],[24, 20, 30, 22],[33, 38, 33, 36],[32, 21, 31, 20],
                        [22, 30, 20, 35],[28, 35, 20, 37],[26, 24, 33, 29],[23, 35, 22, 37],[32, 21, 31, 20],
                    ];
                    this.drawLine();
                }else if($(e.currentTarget).index()==1){
                    extreme_data = [
                        [20, 30, 10, 35],[32, 30, 28, 44],[33, 38, 33, 40],[40, 40, 32, 42],[32, 21, 31, 20],
                        [33, 38, 33, 40],[40, 35, 30, 55],[24, 28, 32, 40],[41, 34, 36, 22],[32, 21, 31, 20],
                        [20, 30, 10, 35],[40, 35, 30, 55],[33, 20, 33, 40],[40, 40, 32, 42],[32, 21, 31, 20],
                        [20, 30, 10, 35],[33, 26, 33, 21],[33, 38, 33, 40],[26, 34, 31, 46],[28, 26, 43, 22],
                        [42, 30, 33, 40],[40, 35, 30, 55],[26, 34, 25, 33],[40, 40, 32, 42],[32, 21, 31, 20],
                        [20, 30, 10, 35],[33, 38, 33, 40],[24, 20, 30, 22],[33, 38, 33, 40],[32, 21, 31, 20],
                        [20, 30, 10, 35],[40, 35, 30, 55],[26, 24, 33, 29],[40, 40, 32, 42],[32, 21, 31, 20],
                    ];
                    this.drawLine();
                }
            },
            changeMonth(month){
                console.log(month);
            }
        }
    }
</script>


<style scoped>
    .protect{
        width: 100%;
        height: 100%;
    }
    .top{
        height: 40px;
    }
    .top .title{
        font-size: 24px;
        color: #666;
        float: left;
    }
    .top .date{
        width: 142px;
        float: right;
    }
    .el-menu-item{
        font-size: 18px;
        padding-left: 0;
        width: 196px;
        height: 36px;
        background-color: #f0f3fa !important;
        margin: 20px 36px;
        text-align: center;
        border: none;
        border-radius: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .el-row {
        margin-bottom: 20px;
    }
    .el-row:last-child {
         margin-bottom: 0;
     }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        min-height: 36px;
        width: 100%;
        height: 100%;
        box-shadow: -1px 1px 3px 1px #ccc;
        border-radius: 5px;
        background: #fff;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
    .small_echarts{
        box-shadow: none;
        background: none;
    }
    .small_echarts .small_item{
        height: 165px;
    }
    .small_echarts .small_item .small_ets_title{
        position: absolute;
        top: 3%;
        left: 9%;
        font-size: 14px;
        color: #666;
        z-index: 10;
    }
    .part{
        height: 350px;
        position: relative;
    }
    .part .echarts_title{
        position: absolute;
        top: 3%;
        left: 5%;
        font-size: 18px;
        color: #666;
        z-index: 10;
    }
    .part .tab_btn{
        position: absolute;
        z-index: 10;
        top: 2%;
        right: 5%;
        font-size: 14px;
        cursor: pointer;
    }
    .part .tab_btn .tab_left{
        width: 62px;
        height: 30px;
        background-color: #4381e6;
        color: #fff;
        border-radius: 8px 0 0 8px;
        float: left;
        text-align: center;
        line-height: 30px;
    }
    .part .tab_btn .tab_right{
        width: 62px;
        height: 30px;
        background-color: #f0f3fa;
        color: #666;
        border-radius: 0 8px 8px 0;
        float: left;
        text-align: center;
        line-height: 30px;
    }
    .part .title_hr{
        width: 89%;
        height: 1px;
        background-color: #e4e5e9;
        /*color: #666;*/
        border: 0;
        position: absolute;
        z-index: 99;
        top: 12%;
        left: 5%;
    }
    .part .enlarge{
        width: 38px;
        height: 38px;
        background: url("../../../static/img/enlarge.png");
        background-size: 100% 100%;
        position: absolute;
        right: 3%;
        bottom: 2%;
        cursor: pointer;
        display: none;
        transform: scale(1);
        transition: 0.5s;
    }
    .part:hover .enlarge{
        display: block;
    }
    .part .enlarge:hover{
        transform: scale(1.3);
        transition: 0.5s;
    }
    .part .narrow{
        width: 48px;
        height: 48px;
        background: url("../../../static/img/narrow.png");
        background-size: 100% 100%;
        position: absolute;
        right: 5%;
        bottom: 2%;
        cursor: pointer;
        display: none;
        transform: scale(1);
        transition: 0.5s;
    }
    .part .narrow:hover{
        transform: scale(0.8);
        transition: 0.5s;
    }
    /*select*/
    .el-select{
        position: absolute;
        z-index: 10;
        top: 3%;
        right: 5%;
        width: 162px;
    }
    /*date*/
    .el-date-editor.el-input{
        width: 192px;
        right: 35%;
    }

</style>
