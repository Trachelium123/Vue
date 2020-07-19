<!-- ECharts图表测试 -->
<template>
  <!-- 图表 -->
    <div class="charts" style="width: 100%;height: 50%">
      <div id="myChart"  :style="{width:'100%',height:'250px'}">
        {{this.chartOption.series.data}}
        {{this.chartOption.yAxis.min}}
        {{this.chartOption.yAxis.max}}
      </div>
    </div>
</template>

<script>
      import echarts from 'echarts'
      import {globalBus} from "./globalBus";
      export default {
        name: 'anode',
        data() {
          return {
            chartOption:{
              xAxis: {
                type: 'category',
                data: [],
                name:"时间",
                splitLine:{
                  show:false
                },
              },
              yAxis: {
                type: 'value',
                name:"电流/kA",
                min:0,
                max:8000,
                splitLine:{
                  show:false
                },
              },
              series: {
                  type:'line',
                  data:[],
                  smooth:true,
                  symbol:'none',
                }
            },
          }
        },
        created() {
          this.clickck();
        },
        updated () {
          /*ECharts图表*/
          var myChart = echarts.init(document.getElementById("myChart"));
          myChart.setOption(this.chartOption,true);
          this.clickck()
        },
        methods:{
          arrayMin(arrs){
            let min = arrs[0];
            for(let i = 1;i < arrs.length;i++){
              if(arrs[i]<min)
                min = arrs[i];
            }
            return min
          },
          arrayMax(arrs){
            let max = arrs[0];
            for(let i = 1;i < arrs.length;i++){
              if(arrs[i]>max)
                max = arrs[i];
            }
            return max
          },
          clickck:function () {
            globalBus.$on('clickEvent',(anode)=>{
                this.chartOption.series.data = anode;
            })
            for (let i =0; i< 100; i++){
              this.chartOption.xAxis.data[i]=(i.toString());
            }
            this.chartOption.yAxis.min=this.arrayMin(this.chartOption.series.data)-10
            this.chartOption.yAxis.max=this.arrayMax(this.chartOption.series.data)+10
          }
        },
      }
    </script>

<style scoped>

</style>
