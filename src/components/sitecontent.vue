<template>
  <div></div>
</template>

<script>
export default {
  name: "SiteContent",
  data() {
    return {
      //tabItemData[0].form
      tabItemIndex: null,
      tabItemData: [

        { 
          name: "从站1",
          id: 1,
          InterfereTime: "", //时间
          grType: "欺骗干扰", //类型
          grpattern: "", //模式
          homePower: "", //功率
          form: {
            state1: false,    //f1禁用
            state2: false,    //f1禁用
            state3: false,    //f1禁用
            pattern1: "",     //干扰模式值
            power1: "",       //功率值
            standard1: "",    //选择制式值
            frequency1: "",   //点频模式   ->  点频值
            dpgrZbpl1: "",    //点频模式  ->  载波频值
            tpgrZbpl1: "",    //调频模式  ->  载波频值
            tpgrTzpl1: "",    //调频模式  ->  调制频值
            tpgrZbpp1: "",    //调频模式  ->  调制频偏值
            spgrQspl1: "",    //扫频模式  ->  起始频值
            spgrZzpl1: "",    //扫频模式  ->  终止频值
            spgrSpds1: "",    //扫频模式  ->  扫频点数值
            spgrPdzlsj1: "",  //扫频模式  ->  频点驻留时间值
            bzsgrZxpl1: "",   //白噪声模式  ->  中心频值
            bzsgrDk1: "",     //白噪声模式  ->  带宽值
            bzsgrLbqxs1: "",  //白噪声模式  ->  滤波器值
            bzsgrLbqaz1: "",  //白噪声模式  ->  滤波器值
            txgrZbpl1: "",    //调相模式  ->  载波频值
            txgrTxxs1: "",    //调相模式  ->  值
            txgrFhsl1: "",    //调相模式  ->  符号速率值
            txgrPNm1: "",     //调相模式  ->  值
            txgrLbqxs1: "",   //调相模式  ->  值
            txgrLbqaz1: "",   //调相模式  ->  滤波器值
            mcgrMckd1: "",    //脉冲模式  ->  脉冲宽度值
            mcgrZq1: "",      //脉冲模式  ->  周期值
            pattern2: "",
            power2: "",
            standard2: "", //form12
            frequency2: "",
            dpgrZbpl2: "",
            tpgrZbpl2: "",
            tpgrTzpl2: "",
            tpgrZbpp2: "",
            spgrQspl2: "",
            spgrZzpl2: "",
            spgrSpds2: "",
            spgrPdzlsj2: "",
            bzsgrZxpl2: "",
            bzsgrDk2: "",
            bzsgrLbqxs2: "",
            bzsgrLbqaz2: "",
            txgrZbpl2: "",
            txgrTxxs2: "",
            txgrFhsl2: "",
            txgrPNm2: "",
            txgrLbqxs2: "",
            txgrLbqaz2: "",
            mcgrMckd2: "",
            mcgrZq2: "",
            pattern3: "",
            power3: "",
            standard3: "", //form13
            frequency3: "",
            dpgrZbpl3: "",
            tpgrZbpl3: "",
            tpgrTzpl3: "",
            tpgrZbpp3: "",
            spgrQspl3: "",
            spgrZzpl3: "",
            spgrSpds3: "",
            spgrPdzlsj3: "",
            bzsgrZxpl3: "",
            bzsgrDk3: "",
            bzsgrLbqxs3: "",
            bzsgrLbqaz3: "",
            txgrZbpl3: "",
            txgrTxxs3: "",
            txgrFhsl3: "",
            txgrPNm3: "",
            txgrLbqxs3: "",
            txgrLbqaz3: "",
            mcgrMckd3: "",
            mcgrZq3: "",
          },
          form1: {
            f1Bit0: "",
            f1Bit1: "",
            f1Bit2: "",
            f1Bit3: "",
            f2Bit0: "",
            f2Bit1: "",
            f2Bit2: "",
            f2Bit3: "",
            f3Bit0: "",
            f3Bit1: "",
            f3Bit2: "",
            f3Bit3: "",
          },
        },
        
      ],
    };
  },
  methods: {
    onTab(item, index) {
      this.tabItemIndex = index;
    },
  },
};
</script>

<style scoped>

</style>