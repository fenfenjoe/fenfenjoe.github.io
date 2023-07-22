module.exports = {
  title: '粉粉蕉的笔记本',
  description: 'Just playing around',
  base: '/note/',  //基础路径
  themeConfig: {
      logo: '', //导航栏logo
      nav: [
        { text: '首页', link: '/' },
        // { text: 'Baidu', link: 'www.baidu.com', target:'_blank'},  //新窗口打开
        // { text: 'CSDN', link: 'blog.csdn.net', target:'_self'},  //当前窗口打开
        {
          text: '数据库',
          items:[
            {
              text: 'Mysql',
              link: '/database/mysql/' //默认跳转到READMD.md
            },
            {
              text: 'Redis',
              link: '/database/redis/' //默认跳转到READMD.md
            }
          ]
        },
        {
          text: '消息中间件',
          items:[
          {
            text: 'Kafka',
            link: '/mq/kafka/' //默认跳转到READMD.md
          },
          {
            text: 'RocketMQ',
            link: '/mq/rocketMq/' //默认跳转到READMD.md
          }
          ]
        },
        {
          text: 'Java',
          link: '/java/' //默认跳转到READMD.md
        },
        {
          text: '其他',
          items:[
            {
              text: '获取信息的渠道',
              items:[
                  {
                    text: 'RSS',
                    link: '/datasource/RSS' //默认跳转到READMD.md
                  },
                  {
                      text: '资源汇总',
                      link: '/datasource/资源汇总' //默认跳转到READMD.md
                    }
                ]
            }
          ]
        },
        {
          text: '我也想搭建这样的博客！',
          link: '/azilnote/' //默认跳转到READMD.md
        },
        { text: 'External', link: 'https://google.com' },
      ],
      sidebar: {
        '/database/redis/':[
          {
           title: '', //一级标题
           collapsable: false, //是否可折叠
           children:[
           '',   //README.md
           '安装&项目结构',
           'Redis_API',
           'Redis数据结构',
           'Redis使用场景',
           'Redis其他'
           ]
          }
        ],
        '/other/':[
            {
               title: '', //一级标题
               collapsable: false, //是否可折叠
               children:[
               '',   //README.md
               '个人提升',
               '个人创业'
               ]
            }
        ],
      },
      sidebarDepth: 0
  }
}