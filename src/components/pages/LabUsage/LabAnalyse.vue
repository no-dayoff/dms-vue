<!--
 * @Author: lihuazheng
 * @Date: 2020-12-23 23:14:21
 * @LastEditTime: 2020-12-24 19:20:14
 * @FilePath: \dms-vue\src\components\pages\LabUsage\LabAnalyse.vue
-->
<template>
  <div>
  <h1>实验室使用统计</h1>
   <el-select v-model="value" placeholder="请选择一个实验室">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
   <el-button type="primary" icon="el-icon-search" @click="axiosQueryLab">查询</el-button>

   <div class="intables">
        <!-- 折线图 -->
        <div id="chartmainline" style="width:600px; height:400px;"></div>
        <!-- 柱状图 -->
        <div id="chartmainbar" style="width:600px; height:400px;"></div>
    </div>
  </div>
</template>

<script>
 import * as echarts from 'echarts'
 import axios from 'axios'
 import url from '../../../serviceAPI.config'
export default {
  //  mounted(){
  //   this.drawLine();
  // },
data() {
  return { 
    options: [{
          value: '化学实验室',
          label: '化学实验室'
        }, {
          value: '物理实验室',
          label: '物理实验室'
        }, {
          value: '生物实验室',
          label: '生物实验室'
        }, {
          value: '科技实验室',
          label: '科技实验室'
        }],
      value: '',
      chartsDate:[],
      optionline:{
                title:{
                    text:'折线图'
                },
                tooltip:{},
                legend:{
                    data:['使用次数']
                },
                xAxis:{
                    data:["2020年秋","2021年春","2021年秋","2022年春"]
                },
                yAxis:{
 
                },
                series:[{
                    name:'使用次数',
                    type:'line', //设置图表主题
                    data:''
                }]
            },
            optionbar:{
                title:{
                    text:'柱状图'
                },
                tooltip:{},
                legend:{
                    data:['使用次数']

                },
                xAxis:{
                    data:["2020年秋","2021年春","2021年秋","2022年春"]
                    

                },
                yAxis:{
 
                },
                series:[{
                    name:'使用次数',
                    type:'bar', //设置图表主题
                    data:''
                }]
            }

  }
},
methods:{
  drawLine: function(){
      //如果之前生成的echarts表已经存在，先销毁他
      var oldChart = this.$echarts.getInstanceByDom(document.getElementById("chartmainline"));
      var oldChart2 =this.$echarts.getInstanceByDom(document.getElementById("chartmainbar"));
      if (oldChart && oldChart2) {
          oldChart.dispose();
          oldChart2.dispose();

      }

        //基于准本好的DOM，初始化echarts实例
        let chartmainline = this.$echarts.init(document.getElementById("chartmainline"));
        let chartmainbar = this.$echarts.init(document.getElementById("chartmainbar"));
        //绘制图表
        chartmainline.setOption(this.optionline);
        chartmainbar.setOption(this.optionbar);
    
      },
      axiosQueryLab(){
        axios({
          url:url.queryLab,
          method:"post",
          data:{Room:this.value}
        }).then(response=>{
          this.optionline.series[0].data=response.data.message
          this.optionbar.series[0].data=response.data.message
          this.drawLine();
          
        }).catch(error=>{
          console.log(error)
        })
      }
}}

</script>

<style>
.intables{
  margin-top:30px ;
  display: flex;
}
</style>