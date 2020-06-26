# 增加：安装SDK时，需要使用者集成引入gson包
即，
    implementation 'com.google.code.gson:gson:2.8.2'

# 增加：安装SDK时，需要使用者集成引入leakcanary包
即，
    implementation 'com.squareup.leakcanary:leakcanary-android:1.5'

# CPU、内存信息 采集频率不可调。建议调整web端显示

# 上传卡顿信息的接口500（2.0版本的后台代码已改，1.0版本还没改）

#页面跳转路径 echarts画的图，点击保存，图片不完整
原因：ECharts本身控件的原因。
建议：将工具栏去掉，这样就不会有人保存图片了

H5监控页面的表格，横坐标换成时间不敏感的值（也就是把横坐标换成01234。。。。）