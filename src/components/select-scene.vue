<!-- 选择场景模块-->
<template>
  <div class="xzcj">
    <el-card :bordered="false">
      <font color="#1e90ff" size="4">请选择场景</font>
      <el-select
        filterable
        v-model="sceneId"
        placeholder="请选择场景"
        style="margin-left: 10px"
        @change="selectscene"
      >
        <el-option
          v-for="item in sceneData"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <el-button
        type="primary"
        style="margin-left: 10px"
        @click="sepet()"
      >
        查询
      </el-button>
      <el-button
        type="primary"
        @click="dialogVisible = true"
        style="margin-left: 10px"
      >
        保存
      </el-button>
      <el-button
        type="primary"
        @click="empty()"
        style="margin-left: 10px"
      >
        清空
      </el-button>
      <el-dialog
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <div style="text-align: center">
          <el-button @click="save()">保存新场景</el-button>
          <el-button @click="cover()">覆盖原场景</el-button>
        </div>
      </el-dialog>
      <el-dialog
        :visible.sync="visible"
        width="30%"
        :before-close="handleClose"
      >
        <div style="text-align: center">
          <el-input
            placeholder="请输入场景名称"
            v-model="valueScene"
            style="width: 150px; margin-left: 10px"
          ></el-input>
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="newScene()">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog :visible.sync="dialog" width="30%" :before-close="handleClose">
        <div style="text-align: center">
          <el-select
            filterable
            v-model="sceneId"
            placeholder="请选择场景"
            style="margin-left: 10px"
            @change="selectscene"
          >
            <el-option
              v-for="item in sceneData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <el-button @click="dialog = false">取 消</el-button>
          <el-button type="primary" @click="oldScene()">确 定</el-button>
        </div>
      </el-dialog>
      <!-- <el-input placeholder="请输入场景名称" v-model="valueScene" style="width: 150px; margin-left: 10px"></el-input>
        <el-button type="primary" style="margin-left: 10px" @click="newScene()">
          新建场景
        </el-button> -->
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      sceneData: [], // 场景数据
      sceneId: '', // 场景id
      dialogVisible: false, // 弹框
      dialog: false,
      visible: false,
      valueScene: "", //新建场景
    }
  },
  mounted () {
    this.getScene() // 获取场景数据
  },
  methods: {
    async getScene() {
      try {
        const { data } = await this.$api.getListScene({})
        console.log(data, '场景数据')
        this.sceneData = data.list;
      } catch (error) {
        console.log(error)
      }
    },
    //场景下拉框获取数据
    // scene() {
    //   let params = {
    //     name: "getListScene",
    //     app_key: "sixteen",
    //     data: "",
    //     version: "",
    //     timestamp: this.timestamp,
    //     format: "json",
    //   };
    //   params.sign = this.buildSign(params);
    //   axios
    //     .post("http://streamwind.picp.vip:14028/api", {
    //       name: "getListScene",
    //       app_key: "sixteen",
    //       data: "",
    //       version: "",
    //       timestamp: this.timestamp,
    //       sign: params.sign,
    //       format: "json",
    //     })
    //     .then((res) => {
    //       // console.log(res.data.data);
    //       this.options = res.data.data;
    //       console.log(this.options);
    //     });
    // },
    //覆盖还是保留
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((res) => {
          console.log(res);
          done();
        })
        .catch((res) => {
          console.log(res);
        });
    },
    // 场景切换
    selectscene(val) {
      this.sceneId = val;
      console.log(this.sceneId);
    },
    //加载场景
    sepet() {
      let params = {
        name: "loadScene",
        app_key: "sixteen",
        data: "",
        version: "",
        timestamp: this.timestamp,
        format: "json",
      };
      params.sign = this.buildSign(params);
      axios
        .post("http://streamwind.picp.vip:14028/api", {
          name: "loadScene",
          app_key: "sixteen",
          data: "",
          version: "",
          timestamp: this.timestamp,
          sign: params.sign,
          format: "json",
        })
        .then((res) => {
          // console.log(res, "res");
          this.ganxinbi = res.data.data.param.limit;
          if (res.data.data.param.condition == "tinme") {
            this.DriveForms.value = "时间";
          } else {
            this.DriveForms.value = "位置";
          }
          this.num.value = res.data.data.param.number;
          // console.log(res.data.data.track);
          res.data.data.track.map((el) => {
            // console.log(el);
            this.coordinatesList.push(el.coordinates);
          });
          // console.log(this.coordinatesList);
          for (let i = 0; i < this.coordinatesList.length; i++) {
            this.coordinatesOne = this.coordinatesList[0];
            // console.log(this.coordinatesOne);
            this.coordinatesTwo = this.coordinatesList[1];
            this.coordinatesThree = this.coordinatesList[2];
            this.coordinatesFour = this.coordinatesList[3];
          }
          // console.log(this.coordinatesOne );
          // console.log(this.coordinates);
          // const mastetData = [...this.masterStation];
          // this.masterStation = res.data.data.param.cmd;
          res.data.data.param.cmd.map((item) => {
            if (item.frameType == 0) {
              // console.log("进来了");
              this.masterStation.push({
                grType: "压制干扰",
                id: 0,
                f1: "F1频段",
                tabs: this.filterStation(item.station_id),
                zai: "在",
                frequency1: item.f1.value[0][0],
                pattern1: item.f1.mode,
                power1: item.f1.power,
                InterfereTime: "", //时间或者位置
                standard1: item.f1.type, //点频干扰
                dpgrZbpl1: item.f1.value[0][1], //点频干扰(载波频1)
                tpgrZbpl1: "", //调频干扰(载波频1)
                tpgrTzpl1: "", //调频干扰(调制频1)
                tpgrZbpp1: "", //调频干扰(调制频偏)
                spgrQspl1: "", //扫频干扰(起始频1)
                spgrZzpl1: "", //扫频干扰(终止频1)
                spgrSpds1: "", //扫频干扰(扫频点数)
                spgrPdzlsj1: "", //扫频干扰(频点驻留时间)
                bzsgrZxpl1: "", //白噪声干扰(中心频1)
                bzsgrDk1: "", //白噪声干扰(带宽)
                bzsgrLbqxs1: "", //白噪声干扰(滤波器)
                bzsgrLbqaz1: "", //白噪声干扰(滤波器a值)
                txgrZbpl1: "", //调相干扰(载波频1)
                txgrTxxs: "", //调相干扰
                txgrFhsl1: "", //调相干扰(符号速率)
                txgrPNm1: "", //调相干扰
                txgrLbqxs1: "", //调相干扰
                txgrLbqaz1: "", //调相干扰(滤波器a值)
                mcgrMckd1: "", //脉冲干扰(脉冲宽度)
                mcgrZq1: "", //脉冲干扰(周期)
                //F2频段
                tabs1: this.filterStation(item.station_id),
                f2: "F2频段",
                zai1: "在",
                frequency2: item.f2.value[0][0], //
                pattern2: item.f2.mode,
                power2: item.f2.power,
                standard2: item.f2.type,
                dpgrZbpl2: item.f2.value[0][1], //点频干扰
                tpgrZbpl2: "", //调频干扰
                tpgrTzpl2: "", //调频干扰
                tpgrZbpp2: "", //调频干扰
                spgrQspl2: "", //扫频干扰
                spgrZzpl2: "", //扫频干扰
                spgrSpds2: "", //扫频干扰
                spgrPdzlsj2: "", //扫频干扰
                bzsgrZxpl2: "", //白噪声干扰
                bzsgrDk2: "", //白噪声干扰
                bzsgrLbqxs2: "", //白噪声干扰
                bzsgrLbqaz2: "", //白噪声干扰
                txgrZbpl2: "", //调相干扰
                txgrTxxs2: "", //调相干扰
                txgrFhsl2: "", //调相干扰
                txgrPNm2: "", //调相干扰
                txgrLbqxs2: "", //调相干扰
                txgrLbqaz2: "", //调相干扰
                mcgrMckd2: "", //脉冲干扰
                mcgrZq2: "", //脉冲干扰
                //F3频段
                tabs2: this.filterStation(item.station_id),
                f3: "F3频段",
                zai2: "在",
                frequency3: item.f3.value[0][0], //
                pattern3: item.f3.mode,
                power3: item.f3.power,
                standard3: item.f3.type,
                dpgrZbpl3: item.f3.value[0][1], //点频干扰
                tpgrZbpl3: "", //调频干扰
                tpgrTzpl3: "", //调频干扰
                tpgrZbpp3: "", //调频干扰
                spgrQspl3: "", //扫频干扰
                spgrZzpl3: "", //扫频干扰
                spgrSpds3: "", //扫频干扰
                spgrPdzlsj3: "", //扫频干扰
                bzsgrZxpl3: "", //白噪声干扰
                bzsgrDk3: "", //白噪声干扰
                bzsgrLbqxs3: "", //白噪声干扰
                bzsgrLbqaz3: "", //白噪声干扰
                txgrZbpl3: "", //调相干扰
                txgrTxxs3: "", //调相干扰
                txgrFhsl3: "", //调相干扰
                txgrPNm3: "", //调相干扰
                txgrLbqxs3: "", //调相干扰
                txgrLbqaz3: "", //调相干扰
                mcgrMckd3: "", //脉冲干扰
                mcgrZq3: "", //脉冲干扰
              });
            } else {
              this.masterStation.push({
                grType: "欺骗干扰",
                id: 0,
                f1: "F1频段",
                tab: this.filterStation(item.station_id),
                zai: "在",
                f1Bit0: item.f1.Bit0,
                f1Bit1: item.f1.Bit1,
                f1Bit2: item.f1.Bit2,
                f1Bit3: item.f1.Bit3,
                f2: "F2频段",
                f2Bit0: item.f2.Bit0,
                f2Bit1: item.f2.Bit1,
                f2Bit2: item.f2.Bit2,
                f2Bit3: item.f2.Bit3,
                f3: "F3频段",
                f3Bit0: item.f3.Bit0,
                f3Bit1: item.f3.Bit1,
                f3Bit2: item.f3.Bit2,
                f3Bit3: item.f3.Bit3,
              });
            }
            // console.log(this.masterStation, "this.masterStation");
            // this.masterStation.push(mastetData)
          });

          for (let i = 0; i < res.data.data.station.length; i++) {
            this.coordinates1 = res.data.data.station[0].coordinates;
            this.coordinates2 = res.data.data.station[1].coordinates;
            this.coordinates3 = res.data.data.station[2].coordinates;
            this.coordinates4 = res.data.data.station[3].coordinates;
          }
        });

      this.outTimer = setTimeout(() => {
        //设置延迟执行
        // console.log('outTimer===');
        this.setStations();
      }, 2000);
    },
    //清空数据
    empty() {
      this.masterStation = [];
      this.num.value = "";
      this.DriveForms.value = "";
      this.ganxinbi = "";
      this.tabItemData.map((el) => {
        console.log(el);
        if (el.grType == "欺骗干扰") {
          el.grType = "压制干扰";
        } else if (el.grType == "压制干扰") {
          el.grType = "欺骗干扰";
        }
      });
    },
    //新建场景
    newScene() {
      this.newscene = {
        name: this.valueScene,
      };
      let name = this.newscene;
      let id = "";
      let track = this.trackSplitList;
      let data = {
        param: this.tabItemData, //后端数据
        id: id,
        name: name,
        frequencyOne: this.frequencyOne.value,
        patternOne: this.patternOne.value,
        num: this.num.value,
        DriveForms: this.DriveForms.value,
        ganxinbi: this.ganxinbi,
      };
      console.log(track);
      console.log(data);
      this.options.push(this.newscene);

      this.visible = false;
      if (this.ok == "ok") {
        this.$message({
          message: "新建场景成功",
          type: "success",
        });
      }
    },
    //覆盖
    oldScene() {
      let id = this.id; //场景名称

      console.log(name);
      this.dialog = false;
      let track = this.trackSplitList;
      let data = {
        param: this.tabItemData, //后端数据
        id: id,
        frequencyOne: this.frequencyOne.value,
        patternOne: this.patternOne.value,
        num: this.num.value,
        DriveForms: this.DriveForms.value,
        ganxinbi: this.ganxinbi,
      };
      console.log(track);
      console.log(data);
      if (this.ok == "ok") {
        this.$message({
          message: "覆盖场景成功",
          type: "success",
        });
      }
    },
  }
};
</script>

<style scoped>
  .xzcj {
    margin-bottom: 13px;
    padding: 0px;
    height: 150px;
    width: 710px;
  }
</style>
