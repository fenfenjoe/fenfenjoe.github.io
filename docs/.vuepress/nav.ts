
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
                        link: '/python/'
                    },
                    {
                        text: 'Python3 基础',
                        link: '/python/python3.md'
                    },
                    {
                        text: 'Pandas',
                        link: '/python/pandas.md'
                    },
                    {
                       text: 'Numpy',
                       link: '/python/numpy.md'
                    },
                    {
                       text: 'Matplotlib',
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
                text: '前端',
                children: [
                    {
                        text: 'HTML',
                        link: '/frontend/html5.md' 
                    },
                    {
                        text: 'CSS',
                        link: '/frontend/CSS/README.md' 
                    },
                    {
                        text: 'Javascript',
                        link: '/frontend/javascript.md' 
                    },
                    
                    {
                        text: 'Vue2学习笔记',
                        link: '/frontend/VUE2/README.md' 
                    },
                    {
                        text: 'Vue3学习笔记',
                        link: '/frontend/VUE3/Vue3学习笔记.md' 
                    },
                    {
                        text: 'React学习笔记',
                        link: '/frontend/React/README.md' 
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
        text: 'AI',
        children: [
            {
                text: 'openclaw实战',
                link: '/AI/openclaw/openclaw实战.md'
            },
            {
                text: 'claudecode实战',
                link: '/AI/claudecode实战.md'
            },
            {
                text: 'RAG',
                link: '/AI/RAG.md'
            },
            {
                text: '拟人类Agent',
                link: '/AI/拟人类Agent.md'
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
        text: '面试',
        children: [
            {
                text: '后端',
                children: [
                    {
                        text: 'JAVA基础',
                        link: '/interview/JAVASE.md' 
                    },
                    {
                        text: 'JAVA多线程',
                        link: '/interview/JAVA并发.md'
                    },
                    {
                        text: 'JVM',
                        link: '/interview/JVM.md'
                    },
                    {
                        text: '分布式相关',
                        link: '/interview/分布式相关.md'
                    },
                    {
                        text: '数据库',
                        link: '/interview/数据库.md'
                    }
                ]
            },
            {
                text: '前端',
                children: [
                    {
                        text: 'HTML',
                        link: '/interview/html.md'
                    },
                    {
                        text: 'CSS',
                        link: '/interview/css.md'
                    },
                    {
                        text: 'JAVASCRIPT',
                        link: '/interview/javascript.md'
                    },
                    {
                        text: 'VUE3',
                        link: '/interview/vue3.md'
                    },
                    {
                        text: '网络',
                        link: '/interview/网络.md'
                    },
                    {
                        text: '前端工程化',
                        link: '/interview/前端工程化.md'
                    },
                    {
                        text: 'nodejs',
                        link: '/interview/nodejs.md'
                    },
                ]
            },
            {
                text: 'AI',
                children: [
                    {
                        text: 'RAG',
                        link: '/interview/RAG.md'
                    }
                ]
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

