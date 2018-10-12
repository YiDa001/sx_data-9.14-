<template>
    <div class="Total">
        <div class="select_section">
            <el-select v-model="value1" placeholder="请选择系统类型" @change="selectSystem">
                <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :name="item.name"
                >
                </el-option>
            </el-select>
            <el-select v-model="value2" placeholder="请选择统计数据" multiple @change="changeCount">
                <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :name="item.name"
                >
                </el-option>
            </el-select>
            <el-select v-model="value3" placeholder="请选择图表类型">
                <el-option
                    v-for="item in options3"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :name="item.name"
                    :disabled="item.disabled"
                    >
                </el-option>
            </el-select>
            按：
            <el-select class="dataType" v-model="value4"  @change="selectDate">
                <el-option
                    v-for="item in options4"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :name="item.name"
                >
                </el-option>
            </el-select>
            统计
            <el-date-picker id="date_pick"
                v-model="value5"
                type="daterange"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :format="dateFormate"
                value-format="yyyy-MM"
            >
            </el-date-picker>
            <el-button type="primary" round class="confirm" @click="confirmSelect">确认选择</el-button>
        </div>
        <div class="des_section">
            <el-button type="primary" icon="el-icon-delete" class="delete" @click="deleteAll"></el-button>
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
    //x轴数据
    let x_data = [];
    for (let i=1;i<=7;i++){
        let data = '09'+'-'+ i;
        x_data.push(data);
    }
    //图表颜色库
    let colorList = ['#4381e6', '#61d675', '#ff1d5b', '#ffd822'];
    //折线图
    let line_data = [
        [43,21,22,37,24,23,57],[142,232,321,445,329,231,240],[25,30,23,45,23,40,57],[25,42,32,12,34,56,57],
        [25,23,29,45,23,56,57],[30,30,23,45,23,40,57],[25,32,65,45,11,24,31]
    ];
    let line_option = {
        color:colorList,
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:[]
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
        series:[]
    };

    //柱状图
    let bar_option = {
        color:colorList,
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            data:[]
        },
        grid: {
            top: '13%',
            left: '4%',
            right: '4%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: x_data,
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: [],
        series: []
    };
    //饼状图
    let pie_value = [25564884,21583431,14634221,20246512,23654782];

    //显示栏数据
    let select_info_data = [];

    export default {
        name: "total",
        data() {
            return {
                //系统类型
                options1:[
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
                value1:'',
                //数据类型
                options2:[],
                value2:[],
                //图表类型
                options3:[],
                value3:'',
                //日期类型
                options4:[
                    {
                        value: '1',
                        label: '年'
                    },
                    {
                        value: '2',
                        label: '月'
                    },
                    {
                        value: '3',
                        label: '日'
                    },
                ],
                value4:'',
                //起止日期
                value5:'',
                dateFormate:''
            }
        },
        mounted(){
        },
        methods:{
            selectSystem(value){
                this.value2 = []; //重置二级选择栏
                if(value==1){  //藏品管理系统
                    this.options2 = [
                        {
                            value:'1',
                            label:'征集计划统计'
                        },
                        {
                            value:'2',
                            label:'藏品统计'
                        }
                    ];
                }else if(value==2){ //观众服务管理子系统
                    this.options2 = [
                        {
                            value:'1',
                            label:'讲解统计'
                        },
                        {
                            value:'2',
                            label:'租赁统计'
                        },
                        {
                            value:'3',
                            label:'观众人数统计'
                        }
                    ];
                }else if(value==3){ //文物保护修复管理系统
                    this.options2 = [
                        {
                            value:'1',
                            label:'方案项目总数'
                        },
                        {
                            value:'2',
                            label:'修复项目总数'
                        },
                        {
                            value:'3',
                            label:'修复文物数量'
                        }
                    ];
                }else if(value==4){ //陈列展览管理系统
                    this.options2 = [
                        {
                            value:'1',
                            label:'展陈次数'
                        },
                        {
                            value:'2',
                            label:'展陈次数（按类型）'
                        }
                    ];
                }else if(value==5){ //科研管理系统
                    this.options2 = [
                        {
                            value:'1',
                            label:'科研项目数量'
                        },
                        {
                            value:'2',
                            label:'科研项目经费'
                        }
                    ];
                }else if(value==6){ //社教管理系统
                    this.options2 = [
                        {
                            value:'1',
                            label:'设计活动次数'
                        },
                        {
                            value:'2',
                            label:'设计资源利用数'
                        }
                    ];
                }else if(value==7){ //舆情系统
                    this.options2 = [
                        {
                            value:'1',
                            label:'舆情采集数量（按性质）'
                        },
                        {
                            value:'2',
                            label:'舆情采集数量（按渠道）'
                        },
                        {
                            value:'3',
                            label:'舆情采集数量（按媒体类型）'
                        }
                    ];
                }
            },
            changeCount(){
                let chartData = [];
                for(let i in this.value2){ //循环选中数组值，对于其每一个值，再循环判断this.options2数组中的value，若相等，则将相应label存入
                    for(let j in this.options2){
                        if(this.value2[i]==this.options2[j].value){
                            chartData.push(this.options2[j].label)
                        }
                    }
                }
                this.value3 = '';
                //藏品管理系统
               if(chartData.length==1&&chartData[0]=='征集计划统计'){
                   this.options3=[];
                   this.options3=[
                       {
                           value: '1',
                           label: '饼状图',
                           disabled: true
                       },
                       {
                           value: '2',
                           label: '柱状图'
                       },
                       {
                           value: '3',
                           label: '折线图'
                       },
                   ];
               }else if(chartData.length==1&&chartData[0]=='藏品统计'){
                   this.options3=[];
                   this.options3=[
                       {
                           value: '1',
                           label: '饼状图',
                       },
                       {
                           value: '2',
                           label: '柱状图'
                       },
                       {
                           value: '3',
                           label: '折线图',
                           disabled: true
                       },
                   ];
               }else if(chartData.indexOf('征集计划统计')!= -1&&chartData.indexOf('藏品统计')!= -1){
                   this.options3=[];
                   this.options3=[
                       {
                           value: '1',
                           label: '饼状图',
                           disabled: true
                       },
                       {
                           value: '2',
                           label: '柱状图'
                       },
                       {
                           value: '3',
                           label: '折线图',
                           disabled: true
                       },
                   ];
               }
               //观众服务管理子系统
                if(chartData.indexOf('讲解统计')!= -1||chartData.indexOf('租赁统计')!= -1||chartData.indexOf('观众人数统计')!= -1){
                    this.options3=[
                        {
                            value: '1',
                            label: '饼状图',
                            disabled: true
                        },
                        {
                            value: '2',
                            label: '柱状图'
                        },
                        {
                            value: '3',
                            label: '折线图',
                        },
                    ];
                }
                //文保修复管理系统
                if(chartData.indexOf('方案项目总数')!= -1||chartData.indexOf('修复项目总数')!= -1||chartData.indexOf('修复文物数量')!= -1){
                    this.options3=[
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
                            label: '折线图',
                            disabled: true
                        },
                    ];
                }
                //陈列展览管理系统
                if(chartData.length==1&&chartData[0]=='展陈次数'){
                    this.options3=[
                        {
                            value: '1',
                            label: '饼状图',
                            disabled: true
                        },
                        {
                            value: '2',
                            label: '柱状图'
                        },
                        {
                            value: '3',
                            label: '折线图',
                        },
                    ];
                }else if(chartData.length==1&&chartData[0]=='展陈次数（按类型）'){
                    this.options3=[
                        {
                            value: '1',
                            label: '饼状图',
                        },
                        {
                            value: '2',
                            label: '柱状图',
                            disabled: true
                        },
                        {
                            value: '3',
                            label: '折线图',
                            disabled: true
                        },
                    ];
                }else if(chartData.indexOf('展陈次数')!= -1&&chartData.indexOf('展陈次数（按类型）')!= -1){
                    this.options3=[
                        {
                            value: '1',
                            label: '饼状图',
                            disabled: true
                        },
                        {
                            value: '2',
                            label: '柱状图',
                            disabled: true
                        },
                        {
                            value: '3',
                            label: '折线图',
                            disabled: true
                        },
                    ];
                }
                //科研管理系统
                if(chartData.indexOf('科研项目数量')!= -1||chartData.indexOf('科研项目经费')!= -1){
                    this.options3=[
                        {
                            value: '1',
                            label: '饼状图',
                            disabled: true
                        },
                        {
                            value: '2',
                            label: '柱状图'
                        },
                        {
                            value: '3',
                            label: '折线图'
                        },
                    ];
                }
                //社教管理系统
                if(chartData.indexOf('设计活动次数')!= -1||chartData.indexOf('设计资源利用数')!= -1){
                    this.options3=[
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
                            label: '折线图',
                            disabled: true
                        },
                    ];
                }
                //舆情系统
                if(chartData.indexOf('舆情采集数量（按性质）')!= -1||chartData.indexOf('舆情采集数量（按渠道）')!= -1||chartData.indexOf('舆情采集数量（按媒体类型）')!= -1){
                    this.options3=[
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
                            label: '折线图',
                            disabled: true
                        },
                    ];
                }
            },
            selectDate(value){
                if(value==1){       //年
                    this.dateFormate = 'yyyy';
                }else if(value==2){ //月
                    this.dateFormate = 'yyyy-MM';
                }else if(value==3){ //日
                    this.dateFormate = 'yyyy-MM-dd';
                }
            },
            confirmSelect(){
                if(this.value1.length==0||this.value2.length==0||this.value3.length==0){
                    console.log('数据不全');
                }
                else{
                    //显示图表区域
                    $('.echarts_section').show();
                    //将显示栏显示
                    $('.des_section').css('display','flex');
                    //获取几个选择框的label
                    let system = {};
                    system = this.options1.find((item)=>{
                        return item.value == this.value1;
                    });
                    let chartData = [];
                    for(let i in this.value2){ //循环选中数组值，对于其每一个值，再循环判断this.options2数组中的value，若相等，则将相应label存入
                        for(let j in this.options2){
                            if(this.value2[i]==this.options2[j].value){
                                chartData.push(this.options2[j].label)
                            }
                        }
                    }
                    let chartType = {};
                    chartType = this.options3.find((item)=>{
                        return item.value == this.value3;
                    });
                    let systemLabel = system.label;         //系统名
                    let chartTypeLabel = chartType.label;   //图表类型
                    //整合所有选择数据，存入对象数组中
                    let one_info = {};
                    let info_status = false; //是否有重复系统名的状态值，避免重复存入相同数据
                    for(let i in select_info_data){
                        if(select_info_data[i]['name']==systemLabel){ //若当前系统名存在
                            if(select_info_data[i].type != chartTypeLabel){     //若当前选择图表类型与之前不一致，清空数组，重新填入当前对象
                                select_info_data.length = 0;
                                one_info['name'] = systemLabel;
                                one_info['data'] = chartData;
                                one_info['type'] = chartTypeLabel;
                                select_info_data.push(one_info);
                            }else{
                                select_info_data[i]['data'] = chartData;
                            }
                            info_status = true;
                        }
                    }
                    if(!info_status){
                        for(let i in select_info_data){
                            if(select_info_data[i].type != chartTypeLabel){
                                select_info_data.length = 0;
                            }
                        }
                        one_info['name'] = systemLabel;
                        one_info['data'] = chartData;
                        one_info['type'] = chartTypeLabel;
                        one_info['type'] = chartTypeLabel;
                        select_info_data.push(one_info);
                    }
                    //将整合的数据展示在显示栏中
                    $('.des_section .select_info').remove();
                    let info_length = select_info_data.length;
                    let data_length = '';
                    for(let i=0;i<info_length;i++){
                        $('.des_section').append('<div class="select_info" style="display: flex;\n' +
                            '               align-items: center;\n' +
                            '               margin: 5px;\n' +
                            '               padding: 5px;\n' +
                            '               border-radius: 5px;\n' +
                            '               background-color: #f0f2f5;\n' +
                            '               color: #909399;">\n'
                            +(i+1)+'.'+
                            '<span>'+select_info_data[i].name+'</span>\n'+':'+'&nbsp;'+
                            ' </div>');
                        data_length = select_info_data[i].data.length;
                        for(let j=0;j<data_length;j++){
                            $('.select_info').eq(i).append('<p>'+select_info_data[i].data[j] +'</p>'+'&nbsp;')
                        }
                    }
                    //根据显示栏数据渲染出图表
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
                                nameRotate:'45',
                                position:(i+1)% 2 == 0 ? 'right' : 'left',
                                offset: i<1 ? 0 : 35 * (Math.floor(i/ 2)),
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
                            line_option.legend.data.push(y_name[i]);
                            line_option.series.push(line_series);
                            line_option.yAxis.push(line_yAxis);
                        }
                        line.setOption(line_option,true);
                    }else if(chartTypeLabel=='柱状图'){
                        $('.charts_box').remove();
                        $('.bar_charts').show().siblings().hide();
                        bar_option.yAxis =[];  //清空Y轴
                        bar_option.series=[];  //清空数据
                        /*根据显示栏信息渲染出相应图表*/
                        let y_num = $('.des_section p').length;
                        let y_name = [];
                        let bar_yAxis = {};
                        let bar_series = {};
                        let bar = this.$echarts.init(document.getElementById('bar'));
                        for(let i=0;i<y_num;i++){
                            y_name.push($('.des_section p').eq(i).html());
                            bar_yAxis ={
                                type: 'value',
                                name: y_name[i],
                                nameRotate:'45',
                                position:(i+1)% 2 == 0 ? 'right' : 'left',
                                offset: i<1 ? 0 : 35 * (Math.floor(i/ 2)),
                                axisLabel: {
                                    formatter: '{value}',
                                    show: true,
                                    textStyle: {
                                        color: '#666'
                                    }
                                }
                            };
                            bar_series= {
                                name:y_name[i],
                                type:'bar',
                                yAxisIndex:i,
                                data:line_data[i]
                            };
                            bar_option.legend.data.push(y_name[i]);
                            bar_option.yAxis.push(bar_yAxis);
                            bar_option.series.push(bar_series);
                        }
                        bar.setOption(bar_option,true);
                    }else if(chartTypeLabel=='饼状图'){
                        $('.charts_box').remove();
                        $('.pie_charts').show().siblings().hide();
                        let pie_dom = '<div class="charts_box" style="width: 32%;\n' +
                            '        height: 350px;\n' +
                            '        box-shadow: -1px 1px 3px 1px #ccc;\n' +
                            '        border-radius: 5px;\n' +
                            '        background: #fff;\n' +
                            '        margin: 15px 15px 0 0;">'+'</div>';
                        let pie_num = $('.des_section span').length;
                        let data_num = '';
                        let pie_name = [];
                        for (let j=0;j<pie_num;j++){
                            let pie_data = [];
                            let legend_data = [];
                            $('.pie_charts').append(pie_dom);
                            let pieID = 'pie' + j;
                            $('.pie_charts .charts_box').eq(j).attr('id', pieID);
                            let pie = this.$echarts.init(document.getElementById(pieID));
                            pie_name.push($('.des_section span').eq(j).html());
                            data_num = $('.select_info').eq(j).find('p').length;
                            for(let i=0;i<data_num;i++) {
                                legend_data.push($('.select_info').eq(j).find('p').eq(i).html());
                                pie_data.push({value:pie_value[i+j],name:legend_data[i]});
                            }
                            pie.setOption({
                                color:colorList,
                                title : {
                                    text: pie_name[j],
                                    x:'center',
                                    top:'3%',
                                },
                                tooltip: {
                                    trigger: 'item',
                                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                                },
                                legend: {
                                    orient: 'vertical',
                                    data:legend_data,
                                    textStyle:{
                                        color:'#666'
                                    },
                                    top: '2%',
                                    left: '5%'
                                },
                                grid: {
                                    bottom: '19%',
                                    left: '3%',
                                    right: '4%',
                                    containLabel: true
                                },
                                series:[
                                    {
                                        name:pie_name[j],
                                        type:'pie',
                                        radius : '55%',
                                        center: ['50%', '60%'],
                                        avoidLabelOverlap: false,
                                        labelLine: {
                                            normal: {
                                                show: false
                                            }
                                        },
                                        data:pie_data
                                    }
                                ]
                            },true);
                        }

                    }
                }
            },
            deleteAll(){
                //清空选择框数据
                this.value1 = '';
                this.value2 = [];
                this.value3 = '';
                //清空显示栏存储数据
                select_info_data = [];
                //清空所有显示栏信息及图表信息
                $('.des_section .select_info').remove();
                $('.des_section').css('display','none');
                $('.echarts_section').hide();
            }
        }
    }


</script>

<style scoped>
    .el-select{
        margin-right: 5px;
    }
    .Total{
        width: 100%;
        height: 100%;
    }
    .select_section{
        width: 100%;
        color: #333;
        font-size: 14px;
    }
    .select_section .dataType{
        width: 110px;
    }
    .select_section .confirm{
        border-radius: 5px;
        float: right;
    }
    .des_section{
        width: 77%;
        display: none;
        flex-wrap: wrap;
        background-color: #fff;
        box-shadow: -1px 1px 3px 1px #ccc;
        position: relative;
        border-radius: 5px;
        margin-top: 15px;
    }
    .delete{
        position: absolute;
        right: 5px;
        bottom: 5px;
    }
    .echarts_section{
        width: 100%;
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
