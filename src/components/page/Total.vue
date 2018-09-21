<template>
    <div class="Total">
        <div class="select_section">
            <el-date-picker
                v-model="month"
                type="month"
                placeholder="这里选择月份"
                >
            </el-date-picker>
            <el-select v-model="value1" placeholder="请选择图表类型" @change="changeType">
                <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :name="item.name"
                    >
                </el-option>
            </el-select>
            <el-select v-model="value2" multiple placeholder="请选择序号" @change="multiSelect">
                <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled">
                </el-option>
            </el-select>
        </div>
        <div class="echarts_section">
            <div class="pie_charts"></div>
            <div class="bar_charts"></div>
            <div class="line_charts">
                <div id="line" style="width: 100%;height: 100%;"></div>
            </div>
        </div>
    </div>
</template>

<script>

    //折线图
    // let hall_humi = [];
    // let cabinet_humi = [];
    // let hall_temp = [];
    // let cabinet_temp = [];

    let temp_series_name = ['展厅湿度','展柜湿度','展厅温度','展柜温度'];
    let one_month = [];
    for (let i=1;i<=30;i++){
        if(i<10){
            i='0'+i;
        }
        let month = '09'+'-'+ i;
        one_month.push(month);
    }
    let temp_yAxis_name = ['湿度(%)','','温度(℃)'];

    //柱状图
    let all_rate = [98,98,97,96,98,95,92,90,96,91,90,89,88,89,85,95,96,94,92,93,91,95,94,96,95,96,96,94,95,94];
    let hall_rate = [92,88,86,85,88,95,92,95,96,92,98,91,89,90,85,95,92,97,96,93,92,94,89,93,95,94,88,95,94,96];
    let cabinet_rate = [88,95,96,94,95,95,93,96,95,97,99,95,95,91,92,93,92,90,94,90,90,95,88,95,94,93,90,94,92,94];
    let store_rate = [90,92,91,93,94,92,91,93,94,93,95,95,96,98,95,95,92,97,93,94,95,98,92,88,92,94,98,92,92,90];
    let bar_option = {

    };
    //饼状图
    let pie_value = [25564884,21583431,14634221,20246512,23654782];
    let pie_option = {
    };

    export default {
        name: "total",
        data() {
            return {
                month:'',
                options1:[
                    {
                        value: '1',
                        label: '饼状图'
                    },
                    {
                        value: '2',
                        label: '柱状图'
                    },
                    {
                        value: '3',
                        label: '折线图'
                    },
                ],
                value1:'',
                options2:[
                    {
                        value: '1',
                        label: '折线图1',
                        disabled: true
                    },
                    {
                        value: '2',
                        label: '柱状图1',
                        disabled: true
                    },
                    {
                        value: '3',
                        label: '折线图2',
                        disabled: true
                    },
                    {
                        value: '4',
                        label: '柱状图2',
                        disabled: true
                    },
                    {
                        value: '5',
                        label: '饼状图1',
                        disabled: true
                    },
                    {
                        value: '6',
                        label: '饼状图2',
                        disabled: true
                    },
                ],
                value2:[]
            }
        },
        mounted(){

        },
        methods:{
            changeType(value){
                //清空第三个下拉框中的数据
                this.value2 =[];
                //根据选中值判断图表类型，执行相应操作
                if(value==1){       //饼状图
                    $('.charts_box').remove();
                    $('.pie_charts').show().siblings().hide();
                    //
                    this.options2 = [
                        {
                            value: '1',
                            label: '折线图1',
                            disabled: true
                        },
                        {
                            value: '2',
                            label: '柱状图1',
                            disabled: true
                        },
                        {
                            value: '3',
                            label: '折线图2',
                            disabled: true
                        },
                        {
                            value: '4',
                            label: '柱状图2',
                            disabled: true
                        },
                        {
                            value: '5',
                            label: '饼状图1'
                        },
                        {
                            value: '6',
                            label: '饼状图2'
                        },
                    ];

                }else if(value==2){ //柱状图
                    $('.charts_box').remove();
                    $('.bar_charts').show().siblings().hide();
                    //
                    this.options2 = [
                        {
                            value: '1',
                            label: '折线图1',
                            disabled: true
                        },
                        {
                            value: '2',
                            label: '柱状图1',
                        },
                        {
                            value: '3',
                            label: '折线图2',
                            disabled: true
                        },
                        {
                            value: '4',
                            label: '柱状图2',
                        },
                        {
                            value: '5',
                            label: '饼状图1',
                            disabled: true

                        },
                        {
                            value: '6',
                            label: '饼状图2',
                            disabled: true
                        },
                    ];
                }else if(value==3){ //折线图
                    $('.charts_box').remove();
                    $('.line_charts').show().siblings().hide();
                    this.options2 = [
                        {
                            value: '1',
                            label: '折线图1',
                            name:'line1'
                        },
                        {
                            value: '2',
                            label: '柱状图1',
                            disabled: true
                        },
                        {
                            value: '3',
                            label: '折线图2',
                            name:'line2'
                        },
                        {
                            value: '4',
                            label: '柱状图2',
                            disabled: true
                        },
                        {
                            value: '5',
                            label: '饼状图1',
                            disabled: true

                        },
                        {
                            value: '6',
                            label: '饼状图2',
                            disabled: true
                        },
                    ];
                }
            },
            multiSelect(value){
                //初始化折线图容器
                let line = this.$echarts.init(document.getElementById('line'));
                //清除折线图数据
                let hall_humi = [];
                let cabinet_humi = [];
                let hall_temp = [];
                let cabinet_temp = [];
                let temp_option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:[],
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
                    yAxis: [],
                    series:[
                        {
                            name:'展厅湿度',
                            type:'line',
                            data:hall_humi
                        },
                        {
                            name:'展柜湿度',
                            type:'line',
                            data:cabinet_humi
                        },
                        {
                            name:'展厅温度',
                            type:'line',
                            data:hall_temp
                        },
                        {
                            name:'展柜温度',
                            type:'line',
                            data:cabinet_temp
                        },
                    ]
                };
                //默认清除柱状图和饼状图，后面根据要添加
                $('.charts_box').remove();

                if(value[value.length-1]==1||value[value.length-1]==3){ //折线图

                    for(let i=0;i<value.length;i++){
                        let temp_yAxis ={
                            type: 'value',
                            name:temp_yAxis_name[value[i]-1],
                            boundaryGap: false,
                            axisTick: {
                                show: false
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
                        };
                        temp_option.yAxis.push(temp_yAxis);
                        if(value==1){
                            temp_option.legend.data=['展厅湿度','展柜湿度'];
                            temp_option.series[0].data = [62,64,66,64,62,60,63,68,70,61,70,72,74,60,65,
                                68,65,67,60,62,71,75,73,71,68,66,68,65,67,66];
                            temp_option.series[1].data = [54,55,54,55,54,54,54,56,56,55,55,54,56,55,55,
                                55,55,54,54,57,54,56,55,54,57,55,55,56,54,56];
                        }else if(value==3){
                            temp_option.legend.data=['展厅温度','展柜温度'];
                            temp_option.series[2].data = [23,25,22,26,34,34,25,38,34,30,29,25,24,23,25,
                                28,29,34,31,30,23,21,26,28,24,30,29,28,26,31];
                            temp_option.series[3].data = [22,23,22,23,24,21,23,22,22,22,24,22,21,23,25,
                                24,25,24,22,23,23,24,25,23,24,25,22,24,23,21];
                        }else if(value.length==2){
                            temp_option.legend.data=['展厅湿度','展柜湿度','展厅温度','展柜温度'];
                            temp_option.series[0].data = [62,64,66,64,62,60,63,68,70,61,70,72,74,60,65,
                                68,65,67,60,62,71,75,73,71,68,66,68,65,67,66];
                            temp_option.series[1].data = [54,55,54,55,54,54,54,56,56,55,55,54,56,55,55,
                                55,55,54,54,57,54,56,55,54,57,55,55,56,54,56];
                            temp_option.series[2].data = [23,25,22,26,34,34,25,38,34,30,29,25,24,23,25,
                                28,29,34,31,30,23,21,26,28,24,30,29,28,26,31];
                            temp_option.series[3].data = [22,23,22,23,24,21,23,22,22,22,24,22,21,23,25,
                                24,25,24,22,23,23,24,25,23,24,25,22,24,23,21];
                        }
                        line.setOption(temp_option,true);
                    }
                }
                else if(value[value.length-1]==2||value[value.length-1]==4){ //柱状图

                    let bar_dom = '<div class="charts_box" style="width: 32%;\n' +
                        '        height: 350px;\n' +
                        '        box-shadow: -1px 1px 3px 1px #ccc;\n' +
                        '        border-radius: 5px;\n' +
                        '        background: #fff;\n' +
                        '        margin: 15px 15px 0 0;">'+'</div>';
                    for(let i=0;i<value.length;i++){
                        $('.bar_charts').append(bar_dom);
                        let barID = 'bar'+i;
                        $('.bar_charts .charts_box').eq(i).attr('id',barID);
                        let bar = this.$echarts.init(document.getElementById(barID));
                        bar.setOption({
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
                    }

                }
                else if(value[value.length-1]==5||value[value.length-1]==6){
                    let pie_dom = '<div class="charts_box" style="width: 32%;\n' +
                        '        height: 350px;\n' +
                        '        box-shadow: -1px 1px 3px 1px #ccc;\n' +
                        '        border-radius: 5px;\n' +
                        '        background: #fff;\n' +
                        '        margin: 15px 15px 0 0;">'+'</div>';
                    for(let i=0;i<value.length;i++){
                        $('.pie_charts').append(pie_dom);
                        let pieID = 'pie'+i;
                        $('.pie_charts .charts_box').eq(i).attr('id',pieID);
                        let pie = this.$echarts.init(document.getElementById(pieID));
                        pie.setOption({
                            tooltip: {
                                trigger: 'item',
                                formatter: "{a} <br/>{b}: {c}"
                            },
                            legend: {
                                data:['采集总数'],
                                textStyle:{
                                    color:'#666'
                                },
                                top: '2%',
                                left: '5%'
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
                                        {value:pie_value[i], name:'采集总数'}
                                    ]
                                }
                            ]
                        });
                    }
                }
                else if(value.length==0){
                    line.clear();
                }

            },

        }
    }
</script>

<style scoped>
    .Total{
        width: 100%;
        height: 100%;
    }
    .select_section{
        width: 100%;
    }
    .echarts_section{
        width: 100%;
        height: 720px;
    }
    .line_charts{
        width: 100%;
        height: 100%;
        margin-top: 15px;
        box-shadow: -1px 1px 3px 1px #ccc;
        border-radius: 5px;
        background: #fff;
        display: none;
    }
    .pie_charts{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
    }
    .bar_charts{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
    }

</style>
