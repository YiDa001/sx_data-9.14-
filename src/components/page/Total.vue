<template>
    <div class="Total">
        <div class="select_section">
            <el-select v-model="value3" placeholder="请选择系统类型" @change="selectSystem">
                <el-option
                    v-for="item in options3"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :name="item.name"
                >
                </el-option>
            </el-select>
            <el-select v-model="value4" placeholder="请选择数据类型" multiple>
                <el-option
                    v-for="item in options4"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :name="item.name"
                >
                </el-option>
            </el-select>
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
            <!--<el-select v-model="value2" multiple placeholder="请选择序号" @change="multiSelect">-->
                <!--<el-option-->
                    <!--v-for="item in options2"-->
                    <!--:key="item.value"-->
                    <!--:label="item.label"-->
                    <!--:value="item.value"-->
                    <!--:disabled="item.disabled">-->
                <!--</el-option>-->
            <!--</el-select>-->
            <el-date-picker
                v-model="value5"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                >
            </el-date-picker>
            <el-button type="primary" round class="confirm" @click="confirmSelect">确认选择</el-button>
        </div>
        <div class="des_section">
            <!--<button class="remove" @click="removeDes">清空所有</button>-->
        </div>
        <div class="echarts_section">
            <div class="pie_charts"></div>
            <div class="bar_charts">
                <div id="bar"></div>
            </div>
            <div class="line_charts">
                <div id="line"></div>
            </div>
        </div>
    </div>
</template>

<script>
    // let chart_type =['line','bar'];
    let x_data = [];
    let y_data = [];
    for (let i=1;i<=7;i++){
        let data = '09'+'-'+ i;
        x_data.push(data);
        y_data.push(parseInt(Math.random()*100));
    }
    //折线图
    let line_data = [
        [43,21,22,37,24,23,57],[42,32,21,45,29,31,40],[25,30,23,45,23,40,57],[25,42,32,12,34,56,57],
        [25,23,29,45,23,56,57],[30,30,23,45,23,40,57],[25,32,65,45,11,24,31]
    ];
    let temp_yAxis_name = ['湿度(%)','','温度(℃)'];
    let line_option = {
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
            top: '13%',
            left: '4%',
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
            data: x_data
        },
        yAxis: [],
        series:[
        ]
    };

    //柱状图
    let all_rate = [98,98,97,96,98,95,92,90,96,91,90,89,88,89,85,95,96,94,92,93,91,95,94,96,95,96,96,94,95,94];
    let hall_rate = [1192,2288,3286,1285,1188,3295,1192,1195,3296,3292,1298,2291,1189,1190,1185,2395,1292,2197,
        1296,2193,1292,2194,1189,2193,2195,2294,2288,1195,2194,3196];
    let cabinet_rate = [88,95,96,94,95,95,93,96,95,97,99,95,95,91,92,93,92,90,94,90,90,95,88,95,94,93,90,94,92,94];
    let store_rate = [90,92,91,93,94,92,91,93,94,93,95,95,96,98,95,95,92,97,93,94,95,98,92,88,92,94,98,92,92,90];
    let bar_option = {

    };
    //饼状图
    let pie_value = [25564884,21583431,14634221,20246512,23654782];
    let pie_option = {
    };

    //选中图表信息计数
    let select_num = 1;

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
                options2:[],
                value2:[],
                options3:[
                    {
                        value: '1',
                        label: '藏品管理系统'
                    },
                    {
                        value: '2',
                        label: '观众服务管理子系统'
                    },
                    {
                        value: '3',
                        label: '文物保护修复管理系统'
                    },
                    {
                        value: '4',
                        label: '陈列展览管理系统'
                    },
                    {
                        value: '5',
                        label: '科研管理系统'
                    },
                    {
                        value: '6',
                        label: '社教管理系统'
                    },
                    {
                        value: '7',
                        label: '舆情系统'
                    },
                ],
                value3:'',
                label3:'',
                options4:[],
                value4:[],
                value5:'',
                options6:[],
                value6:[]
            }
        },
        mounted(){

        },
        methods:{
            changeType(value){

                //根据选中值判断图表类型，执行相应操作
                if(value==1){       //饼状图
                    //
                    this.options2 = [
                        {
                            value: '1',
                            label: '饼状图1'
                        },
                        {
                            value: '2',
                            label: '饼状图2'
                        },
                    ];

                }else if(value==2){ //柱状图
                    //
                    this.options2 = [
                        {
                            value: '1',
                            label: '柱状图1',
                        },
                        {
                            value: '2',
                            label: '柱状图2',
                        },
                    ];
                }else if(value==3){ //折线图
                    this.options2 = [
                        {
                            value: '1',
                            label: '折线图1',
                        },
                        {
                            value: '2',
                            label: '折线图2',
                        }
                    ];
                }
            },
            multiSelect(value){
                //初始化折线图容器
                let line = this.$echarts.init(document.getElementById('line'));
                //初始化折线图数据
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
                        data: x_data
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


                        let bar = this.$echarts.init(document.getElementById('bar'));
                        bar.setOption({
                            grid: {
                                top: '10%',
                                left: '3%',
                                right: '10%',
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
                                data: ['整馆', '人流量','展柜'],
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
                                top: '3%',
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
                                    data: x_data,
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
                                    name:'达标率',
                                    position:'left',
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
                                },
                                {
                                    type: 'value',
                                    name:'人流量',
                                    position: 'right',
                                    axisTick: {show: false},
                                    axisLine:{
                                        lineStyle:{
                                            color:'#a9acb1'
                                        }
                                    },
                                    axisLabel: {
                                        show: true,
                                        interval: 'auto',
                                        formatter: '{value}',
                                        textStyle:{
                                            color:'#666'
                                        }
                                    },
                                },
                                {
                                    type: 'value',
                                    name:'展柜',
                                    position:'right',
                                    offset: 40,
                                    axisTick: {show: false},
                                    axisLine:{
                                        lineStyle:{
                                            color:'#a9acb1'
                                        }
                                    },
                                    axisLabel: {
                                        show: true,
                                        interval: 'auto',
                                        formatter: '{value}',
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
                                    name: '人流量',
                                    type: 'bar',
                                    yAxisIndex: 1,
                                    data: hall_rate
                                },
                                {
                                    name: '展柜',
                                    type: chart_type[0],
                                    yAxisIndex: 2,
                                    data: cabinet_rate
                                },
                                // {
                                //     name: '库房',
                                //     type: 'bar',
                                //     data: store_rate
                                // }
                            ]
                        });
                    }

                else if(value[value.length-1]==5||value[value.length-1]==6){ //饼状图
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
            selectSystem(value){
                this.value4 = []; //重置二级选择栏
                if(value==1){
                    this.options4 = [
                        {
                            value:'1',
                            label:'藏品A'
                        },
                        {
                            value:'2',
                            label:'藏品B'
                        }
                    ];
                }else if(value==2){
                    this.options4 = [
                        {
                            value:'1',
                            label:'观众A'
                        },
                        {
                            value:'2',
                            label:'观众B'
                        },
                        {
                            value:'3',
                            label:'观众C'
                        }
                    ];
                }else if(value==3){
                    this.options4 = [
                        {
                            value:'1',
                            label:'文保A'
                        },
                        {
                            value:'2',
                            label:'文保B'
                        }
                    ];
                }else if(value==4){
                    this.options4 = [
                        {
                            value:'1',
                            label:'陈列A'
                        },
                        {
                            value:'2',
                            label:'陈列B'
                        }
                    ];
                }else if(value==5){
                    this.options4 = [
                        {
                            value:'1',
                            label:'科研A'
                        },
                        {
                            value:'2',
                            label:'科研B'
                        }
                    ];
                }else if(value==6){
                    this.options4 = [
                        {
                            value:'1',
                            label:'社教A'
                        },
                        {
                            value:'2',
                            label:'社教B'
                        }
                    ];
                }else if(value==7){
                    this.options4 = [
                        {
                            value:'1',
                            label:'舆情A'
                        },
                        {
                            value:'2',
                            label:'舆情B'
                        }
                    ];
                }
            },
            confirmSelect(){
                //将几个选择框的值存入对象，用于获取对应label
                let system = {};
                system = this.options3.find((item)=>{
                    return item.value == this.value3;
                });
                let chartData = [];
                for(let i in this.value4){ //循环选中数组值，对于其每一个值，再循环判断this.options4数组中的value，若相等，则将相应label存入
                   for(let j in this.options4){
                       if(this.value4[i]==this.options4[j].value){
                           chartData.push(this.options4[j].label)
                       }
                   }
                }
                let chartType = {};
                chartType = this.options1.find((item)=>{
                    return item.value == this.value1;
                });
                let systemLabel = system.label;         //系统名
                let chartTypeLabel = chartType.label;   //图表类型
                //动态添加选中信息
                let icon = '<i class="el-icon-delete" style="margin-left: 5px;"></i>';
                let select_info ='<div class="select_info" style="display: flex;\n' +
                                                            '        align-items: center;\n' +
                                                            '        margin: 5px;\n' +
                                                            '        padding: 5px;\n' +
                                                            '        border-radius: 5px;\n' +
                                                            '        background-color: #f0f2f5;\n' +
                                                            '        color: #909399;">\n'
                                         + select_num+'.'+
                    '                    <span>'+systemLabel+':'+'&nbsp;'+'</span>\n' +
                    '                </div>';
                $('.des_section').append(select_info);  //系统类型信息
                //二级数据选项
                for(let i in this.value4){
                    $('.select_info').eq(select_num-1).append('<p>'+chartData[i] +'</p>'+'&nbsp;');
                }
                $('.select_info').eq(select_num-1).append(icon);  //删除图标
                select_num++;
                if(chartTypeLabel=='折线图'){
                    //初始化相应容器
                    $('.charts_box').remove();
                    $('.line_charts').show().siblings().hide();
                    //加载echarts及相应数据
                    line_option.yAxis =[];  //清空Y轴
                    line_option.series=[];  //清空数据
                    let y_num = $('.des_section p').length;
                    let y_name = [];
                    let line_yAxis = {};
                    let line_series = {};
                    let line = this.$echarts.init(document.getElementById('line'));
                    for(let i=0;i<y_num;i++){
                        y_name.push($('.des_section p').eq(i).html());
                        line_yAxis ={
                            type: 'value',
                            name: y_name[i],
                            position:(i+1)% 2 == 0 ? 'right' : 'left',
                            offset: i<1 ? 0 : 35 * (Math.floor(i/ 2)),
                            axisLine:{
                                lineStyle:{
                                    color:'#a9acb1'
                                }
                            },
                            axisLabel: {
                                formatter: '{value}',
                                show: true,
                                textStyle: {
                                    color: '#666'
                                }
                            }
                        };
                        line_series= {
                                        name:y_name[i],
                                        type:'line',
                                        yAxisIndex:i,
                                        data:line_data[i]
                                    };
                        line_option.series.push(line_series);
                        line_option.yAxis.push(line_yAxis);
                    }
                    // console.log(line_option.yAxis);
                    line.setOption(line_option);

                }else if(chartTypeLabel=='柱状图'){
                    $('.charts_box').remove();
                    $('.bar_charts').show().siblings().hide();

                }else if(chartTypeLabel=='饼状图'){
                    $('.charts_box').remove();
                    $('.pie_charts').show().siblings().hide();

                }
            },
            // removeDes(){
            //     $('.des_section').empty();
            // }
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
    .select_section .confirm{
        border-radius: 5px;
        margin-left: 30px;
    }
    .des_section{
        width: 71%;
        display: flex;
        flex-wrap: wrap;
        background-color: #fff;
        box-shadow: -1px 1px 3px 1px #ccc;
        position: relative;
    }
    .remove{
        position: absolute;
        right: 10px;
        bottom: 10px;
    }
    .echarts_section{
        width: 100%;
        height: 650px;
        margin-bottom: 60px;
    }
    #line{
        width: 1353px;
        height: 650px;
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
        height: 100%;
        margin-top: 15px;
        box-shadow: -1px 1px 3px 1px #ccc;
        border-radius: 5px;
        background: #fff;
        display: none;
    }
    #bar{
        width: 1353px;
        height: 650px;
    }

</style>
