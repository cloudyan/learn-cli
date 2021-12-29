# learn-cli

学习 cli

参考

- https://blog.ymfe.org/command-line-with-node/
- https://github.com/luoquanquan/learn-cli

[js-plugin-cli](https://juejin.cn/post/6879265583205089287) 功能列表

- upgrade 检查更新
- mirror 切换镜像链接
  - 判断 config.json 配置文件是否存在
    - 是 将镜像链接写入 config.json 中
    - 否 先创建 config.json 配置文件，然后更新镜像链接
- template 更新模板
  - download 下载/更新模板
    - 清空模板文件夹 tpl
    - 读取 config.json 的镜像链接
    - 执行下载文件并解压到模板文件夹 tpl
- init 初始化模板
  - 判断项目是否存在
    - 是 提示项目已存在
    - 否
      - 提示全局函数名
      - 判断模板文件夹是否存在
        - 是
          - 拷贝模板到对应路径
          - 替换模板字符
        - 否
          - 下载模板文件，然后走是流程
