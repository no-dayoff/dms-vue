<!--
 * @Author: lihuazheng
 * @Date: 2020-12-22 13:00:54
 * @LastEditTime: 2020-12-26 19:09:03
 * @FilePath: \dms-vue\src\components\pages\DeviceManage\DeviceCheck.vue
-->
<template>
  <div>
    <h1>实验设备查看</h1>
    <el-table :data="tableData" style="width: 90%">
      <el-table-column label="基本信息" align="center">
      <el-table-column prop="Did" label="设备编号" width="150">
      </el-table-column>
        <el-table-column prop="Name" label="设备名" width="150">
        </el-table-column>

        <el-table-column prop="Dtype" label="设备类别" width="150">
        </el-table-column>
      </el-table-column>
      <el-table-column label="采购信息" align="center">
        <el-table-column prop="BuyDate" label="采购日期" width="150">
        </el-table-column>
        <el-table-column prop="Supplier" label="供应商" width="150">
        </el-table-column>
        <el-table-column prop="Price" label="价格" width="150">
        </el-table-column>
      </el-table-column>

      <el-table-column label="操作" align="center" >
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    
    <el-dialog title="设备信息编辑" :visible.sync="dialogFormVisible">
      <el-form :model="newform">
        <el-form-item label="设备名称" :label-width="formLabelWidth">
          <el-input v-model="newform.Name" autocomplete="off"></el-input>
        </el-form-item>
          <el-form-item label="设备类别" :label-width="formLabelWidth">
          <el-input v-model="newform.Dtype" autocomplete="off"></el-input>
        </el-form-item>
          <el-form-item label="采购日期" :label-width="formLabelWidth">
          <el-input v-model="newform.BuyDate" autocomplete="off"></el-input>
        </el-form-item>
          <el-form-item label="供应商" :label-width="formLabelWidth">
          <el-input v-model="newform.Supplier" autocomplete="off"></el-input>
        </el-form-item>
          <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="newform.Price" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="axiosDeviceUpdate">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import axios from "axios";
import url from "../../../serviceAPI.config";
export default {
  inject: ["reload"],
  data() {
    return {
      msg: "",
      tableData: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      newform: [{ Did: "", Name: "" }],
      deleteID: ""
    };
  },
  created() {
    this.checkAxios();
  },
  methods: {
    checkAxios() {
      axios({
        url: url.getDeviceCheck,
        method: "get"
      })
        .then(response => {
          this.msg = response.data.message;
          //*根据msg来获取返回的数组 然后全部加进表格
          for (let i = 0; i < this.msg.length; i++) {
            this.tableData.push(response.data.message[i]);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      //*获取原始数据对象 进行深拷贝
      this.newform = JSON.parse(JSON.stringify(row));
    },
    handleDelete(index, row) {
      this.deleteID = JSON.parse(JSON.stringify(row)).Did;
      this.deleteOpen();
    },
    axiosDeviceUpdate() {
      let params = {
        ID: this.newform.Did,
        Name: this.newform.Name,
        Dtype: this.newform.Dtype,
        BuyDate: this.newform.BuyDate,
        Supplier: this.newform.Supplier,
        Price: this.newform.Price,

      };
      axios({
        url: url.postDeviceUpdate,
        methods: "get",
        params
      })
        .then(response => {
          if (response.data.code == 200) {
            this.open2(response.data.message);
            this.dialogFormVisible = false;
          } else {
            this.open3();
          }
        })
        .catch(error => {
          this.open4();
          throw error;
        });
    },
    open2(num) {
      this.$message({
        message: "修改成功，已有" + num + "条数据被修改了",
        type: "success"
      });
      this.reload();
    },

    open3() {
      this.$message({
        message: "没有数据被修改",
        type: "warning"
      });
    },

    open4() {
      this.$message.error("出现错误，修改失败！");
    },
    deleteOpen() {
      this.$confirm("此操作将永久删除条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axiosDelete();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    axiosDelete(){
      let params={ID:this.deleteID}
      axios({
        url:url.deleteDeviceById,
        methods:'get',
        params
      }).then(response=>{
        this.reload();
      })
    }

  }
};
</script>

<style></style>
