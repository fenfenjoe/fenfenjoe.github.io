import{_ as d,c as r,e,o as a}from"./app-BNNcboHM.js";const o={};function i(n,t){return a(),r("div",null,t[0]||(t[0]=[e('<h1 id="消息中间件概述" tabindex="-1"><a class="header-anchor" href="#消息中间件概述"><span>消息中间件概述</span></a></h1><p>常用MQ实现：</p><ul><li>RocketMQ</li><li>Kafka</li><li>RabbitMQ</li></ul><p>对比维度：</p><table><thead><tr><th>功能项</th><th>功能说明</th><th>Kafka</th><th>RocketMQ</th><th>RabbitMQ</th><th>Redis</th></tr></thead><tbody><tr><td>吞吐量</td><td>每秒处理多少条消息</td><td>每秒几十万</td><td>每秒几十万</td><td>每秒几万</td><td></td></tr><tr><td>发布订阅的实现</td><td></td><td>消费者直接到日志文件中获得消息</td><td>为每个消费者维护一个队列，广播时复制消息到这些队列里</td><td></td><td></td></tr><tr><td>消费结果</td><td>消费完后如何对消息进行处理。</td><td>消费成功：消息仍记录在日志文件中<br>消费失败：不会重新入队</td><td>消费成功：消费完即删除<br>消费失败：同步消息消费失败，重新入队；异步消息消费失败，重试；</td><td></td><td></td></tr><tr><td>消息匹配</td><td>可以为消息自定义分配规则，根据规则选择不同的消息队列。</td><td>不支持</td><td>支持，通过routing_key或者自定义消息头，然后通过特殊的Exchange实现</td><td></td><td></td></tr><tr><td>优先级队列</td><td>消息分优先级。优先级高的消息会先被消费，即使是后入队。</td><td>不支持</td><td>支持，优先级大小建议设置在0~10之间</td><td></td><td></td></tr><tr><td>延迟队列</td><td>等待指定时间后，才把消息放到消息队列中。</td><td>不支持</td><td>支持，可通过设置消息的TTL字段实现。</td><td></td><td></td></tr><tr><td>死信队列</td><td>死信：<br>1.队列达到最大长度<br>2.消息被拒绝<br>3.消息过期<br>满足任一条件，消息便会被放到死信队列。</td><td>不支持</td><td>支持。Topic为%DLC%+ConsumerGroup名称</td><td></td><td></td></tr><tr><td>重试队列</td><td></td><td>不支持</td><td>支持。Topic为%RETRY%+ConsumerGroup名称</td><td></td><td></td></tr><tr><td>消费模式</td><td>推模式：Broker将消息推给Consumer or 拉模式：Consumer向Broker获取消息</td><td>拉模式</td><td>拉模式</td><td>都支持</td><td></td></tr><tr><td>广播消费</td><td></td><td>支持，且相对正统</td><td>支持，但力度较弱</td><td></td><td></td></tr><tr><td>消息回溯</td><td></td><td>支持两种维度的消息回溯：offset和timestamp</td><td>不支持，只要被确认消费就会被标记删除</td><td></td><td></td></tr><tr><td>消息堆积</td><td></td><td>支持</td><td>支持，但kafka堆积效率要更高</td><td></td><td></td></tr><tr><td>持久化</td><td></td><td>支持</td><td>支持</td><td></td><td></td></tr><tr><td>消息追踪</td><td></td><td>不支持</td><td>支持，需要配合Firehose</td><td></td><td></td></tr><tr><td>消息过滤</td><td></td><td>客户端级别的支持</td><td>不支持，但可以通过二次封装</td><td></td><td></td></tr><tr><td>多租户</td><td></td><td>不支持</td><td>支持</td><td></td><td></td></tr><tr><td>多协议</td><td></td><td></td><td>本身就是AMQP的实现，即支持MQTT、STOMP等协议</td><td></td><td></td></tr><tr><td>跨语言</td><td></td><td>由Scala+Java实现，支持多语言的客户端</td><td>由Erlang实现，支持多语言客户端</td><td></td><td></td></tr><tr><td>流量控制</td><td></td><td>支持client级别和user级别，流控可作用于生产者和消费者</td><td>基于credit-based算法，作用于生产者</td><td></td><td></td></tr><tr><td>消息顺序性</td><td></td><td>支持单分区级别的顺序性</td><td>支持，但条件比较苛刻。需要单线程发送、单线程消费，且不采用延迟队列、优先队列等高级功能。（某种意义来说，不支持）</td><td></td><td></td></tr><tr><td>安全机制</td><td></td><td>支持身份认证、权限控制</td><td>与kafka相似</td><td></td><td></td></tr><tr><td>幂等性</td><td></td><td>支持单个生产者单分区会话的幂等性</td><td>不支持</td><td></td><td></td></tr><tr><td>事务性</td><td></td><td>支持</td><td>支持</td><td></td><td></td></tr></tbody></table>',5)]))}const l=d(o,[["render",i],["__file","index.html.vue"]]),c=JSON.parse('{"path":"/mq/","title":"消息中间件概述","lang":"en-US","frontmatter":{"0":"t","1":"i","2":"t","3":"l","4":"e","5":":","6":"概","7":"述"},"headers":[],"git":{"updatedTime":1735622789000,"contributors":[{"name":"dongyz8","email":"dongyz8@gdii-yueyun.com","commits":1}]},"filePathRelative":"mq/README.md"}');export{l as comp,c as data};