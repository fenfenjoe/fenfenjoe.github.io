
export const navs =
[ //导航栏配置
    // { text: '首页', link: '/' },
    // { text: 'Baidu', link: 'www.baidu.com', target:'_blank'},  //新窗口打开
    // { text: 'CSDN', link: 'blog.csdn.net', target:'_self'},  //当前窗口打开
    {
        text: '开发笔记',
        children: [
            {
                text: 'JAVA',
                children: [
                    {
                        text: '代码笔记',
                        link: '/java/实战/开发笔记.md' //默认跳转到READMD.md
                    },
                     {
                         text: 'Java8实战',
                         link: '/java/实战/Java8实战.md'
                     },
                   {
                       text: '分布式事务实战（Seata）',
                       link: '/java/常用框架/seata.md'
                   },
                   {
                      text: '模板引擎（FreeMarker）',
                      link: '/java/常用框架/freemarker.md'
                   },
                   {
                      text: 'SpringSecurity',
                      link: '/java/spring/springSecurity.md'
                   },
                   {
                      text: 'Maven',
                      link: '/java/maven/README.md'
                   }
                ]
            },
            {
                text: 'PYTHON',
                children: [
                    {
                        text: '概述',
                        link: '/python/' //默认跳转到READMD.md
                    },
                    {
                        text: 'python3',
                        link: '/python/python3.md' //默认跳转到READMD.md
                    },
                     {
                         text: 'python3(菜鸟教程)',
                         link: '/python/python3(菜鸟教程).md'
                     },
                   {
                       text: 'pandas',
                       link: '/python/pandas.md'
                   },
                   {
                      text: 'numpy',
                      link: '/python/numpy.md'
                   },
                   {
                      text: 'matplotlib',
                      link: '/python/matplotlib.md'
                   }
                ]
            },
            {
                text: '中间件',
                children: [
                    {
                        text: 'Kafka',
                        link: '/mq/kafka/' //默认跳转到READMD.md
                    },
                    {
                        text: 'RocketMQ',
                        link: '/mq/rocketMq/' //默认跳转到READMD.md
                    },
                    {
                        text: 'Redis',
                        link: '/database/redis/'
                    },
                    {
                        text: 'MongoDB',
                        link: '/database/mongoDB/'
                    },
                     {
                         text: 'Elastic Search',
                         link: '/database/elasticSearch/'
                     }
                ]
            },
            {
                text: '数据库',
                children: [
                    {
                        text: 'Mysql',
                        link: '/database/mysql/' //默认跳转到READMD.md
                    }
                ]
            },
            {
                text: '设计模式',
                link: '/designPattern/' //默认跳转到READMD.md
            },
             {
                text: '大数据',
                children: [
                    {
                         text: '概览',
                         link: '/bigdata/概览.md'
                    },
                    {
                         text: 'Hadoop',
                         link: '/bigdata/Hadoop学习笔记.md'
                    },
                    {
                         text: 'Hive',
                         link: '/bigdata/Hive学习笔记.md'
                     },
                ]
             },
             {
                 text: '机器学习',
                 children: [
                     {
                          text: '机器学习概览',
                          link: '/machineLearning/README.md'
                     }
                 ]
             }
        ]
    },
    {
        text: '运维',
        children: [
        {
            text: 'linux命令速查',
            link: '/devops/linux/linux命令速查宝典.md'
        },
        {
            text: 'windows命令速查',
            link: '/devops/windows/windows命令速查宝典.md'
        },
        {
            text: 'Docker笔记',
            link: '/devops/docker/Docker笔记.md'
        },
        {
            text: 'kubernetes学习笔记',
            link: '/devops/kubernetes/kubernetes学习笔记.md'
        },
        {
            text: 'kubernetes实操笔记',
            link: '/devops/kubernetes/kubernetes实操笔记.md'
        },
        {
            text: '运维工具大全',
            link: '/devops/运维工具大全.md'
        },
        {
            text: 'git操作宝典',
            link: '/devops/git/git操作宝典.md'
        }
        ]
    },
    {
        text: '数学',
        children: [
            {
                text: '概率论',
                link: '/math/概率论/'
            },
            {
                text: '线性代数',
                link: '/math/xsds/'
            },
            {
                text: '统计学',
                link: '/math/统计学/'
            }
        ]
    },
    {
        text: '量化',
        children: [
            {
                text: '金融知识学习',
                link: '/quant/金融知识学习.md' //默认跳转到READMD.md
            },
            {
                text: '聚宽',
                link: '/quant/聚宽.md'
            },
             {
                 text: '因子分析',
                 link: '/quant/因子分析.md'
             }
        ]
    },
    {
        text: '其他',
        children: [
            {
                  text: '健身',
                  children:[
                    {
                         text: '笔记',
                         link: '/gym/README.md' //默认跳转到READMD.md
                     },
                    {
                         text: '训练计划',
                         link: '/gym/训练日/'
                     },
                  ]
              },
              {
                 text: '读书笔记',
                 children:[
                   {
                      text: '《深度学习》',
                      link: '/book/《深度学习》读书笔记.md'
                   }
                 ]
              },
              {
                 text: '其他',
                 children:[
                   {
                    text: 'RSS',
                    link: '/other/datasource/RSS' //默认跳转到READMD.md
                    },
                    {
                        text: '资源导航',
                        link: '/other/datasource/资源汇总' //默认跳转到READMD.md
                    },
                    {
                        text: '医保',
                        link: '/other/医保.md'
                    },
                    {
                        text: '装修攻略',
                        link: '/decorate/' //默认跳转到READMD.md
                    }
                 ]
              }
        ]
    },
    {
        text: '我也想搭建这样的博客！',
        link: '/azilnote/' //默认跳转到READMD.md
    },
   { text: '🚋开往', link: 'https://www.travellings.cn/go.html' }
];

// module.exports = navs;  //CommonJS

